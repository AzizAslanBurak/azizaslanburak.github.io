// AudioWorklet: çift kamışlı silindirik gövde için fiziksel model (dalga kılavuzu + kamış eğrisi).
// Temel yapı: Smith/Cook dalga kılavuzu klarnet modeli (STK Clarinet); balaban rengi için
// daha koyu yansıma süzgeci, yumuşak nefes atağı, hava sesi ve hafif asimetrik kamış (çift harmonikler).
//
// processorOptions:
//   olaylar: [{ bas, bit, frekans }]  bağlam saatiyle (sn); ardışık olaylar tek nefeste, parmak değişimiyle bağlanır
//   guc: 0–1 nefes gücü, titresim: bool, sonsuz: bool (dem: "dur" mesajına kadar)
// port mesajları: { tur: "dur" } yumuşakça susar; { tur: "perde", frekans } anında perde değiştirir
const BOYUT = 8192;

class KamisModel extends AudioWorkletProcessor {
  constructor(secenek) {
    super();
    const o = secenek.processorOptions || {};
    this.olaylar = (o.olaylar || []).slice().sort((a, b) => a.bas - b.bas);
    this.guc = o.guc == null ? 0.7 : o.guc;
    this.titresim = o.titresim !== false;
    this.sonsuz = !!o.sonsuz;
    this.duzeltme = o.duzeltme || 0;          // gecikme düzeltmesi (örnek), ölçümle ayarlanır
    this.hat = new Float32Array(BOYUT);
    this.yaz = 0;
    this.suzgec = 0;                          // yansıma süzgeci durumu
    this.nefes = 0;                           // anlık nefes basıncı
    this.gecikme = 0; this.hedefGecikme = 0;  // örnek cinsinden gövde gecikmesi
    this.lfo = Math.random() * 6.28;
    this.gurultu = 0;
    this.dc = 0; this.dcOnceki = 0;
    this.bitti = false; this.duruyor = false;
    this.sesBasladi = 0;                      // nota başından beri geçen süre (vibrato gecikmesi için)
    this.port.onmessage = (e) => {
      const m = e.data;
      if (m.tur === "dur") { this.duruyor = true; this.sonsuz = false; this.olaylar = []; }
      if (m.tur === "perde") this.hedefGecikme = this.gecikmeHesapla(m.frekans);
    };
  }

  gecikmeHesapla(f) {
    // kapalı-açık silindir: tur gidiş-dönüş yarım dalga; süzgeç ve kamışın getirdiği gecikme düşülür
    return Math.max(4, Math.min(BOYUT - 4, sampleRate / f * 0.5 - 1.5 + this.duzeltme));
  }

  oku(gecikme) {
    // doğrusal aradeğerleme ile kesirli gecikme
    let r = this.yaz - gecikme;
    while (r < 0) r += BOYUT;
    const i = Math.floor(r), k = r - i;
    const a = this.hat[i % BOYUT], b = this.hat[(i + 1) % BOYUT];
    return a + (b - a) * k;
  }

  process(_, cikislar) {
    const cik = cikislar[0][0];
    if (!cik) return !this.bitti;
    const t0 = currentTime;
    for (let n = 0; n < cik.length; n++) {
      const t = t0 + n / sampleRate;
      // hangi olaydayız?
      let hedefNefes = 0;
      while (this.olaylar.length && t >= this.olaylar[0].bit) {
        const biten = this.olaylar.shift();
        const sonraki = this.olaylar[0];
        // bağlı nota yoksa sonraki olaya kadar nefes kesilir
        if (!sonraki || sonraki.bas - biten.bit > 0.03) this.sesBasladi = -1;
      }
      const ev = this.olaylar[0];
      if ((ev && t >= ev.bas) || (this.sonsuz && !this.duruyor)) {
        if (ev) {
          const g = this.gecikmeHesapla(ev.frekans);
          if (this.sesBasladi < 0 || this.hedefGecikme === 0) { this.gecikme = g; this.sesBasladi = 0; }
          this.hedefGecikme = g;
        }
        hedefNefes = 0.42 + 0.3 * this.guc;
        // bağlı notalarda parmak değişiminde küçük basınç oyuğu (doğal ayrım)
        if (ev && t - ev.bas < 0.025 && this.sesBasladi > 0.05) hedefNefes *= 0.85;
        this.sesBasladi += 1 / sampleRate;
      }
      // nefes zarfı: atak ~45 ms, bırakma ~70 ms
      const katsayi = hedefNefes > this.nefes ? 1 / (0.045 * sampleRate) : 1 / (0.07 * sampleRate);
      this.nefes += (hedefNefes - this.nefes) * katsayi * 4;
      // parmak değişimi: ~12 ms kayma
      this.gecikme += (this.hedefGecikme - this.gecikme) * (1 / (0.012 * sampleRate)) * 4;

      // nefes: hava sesi + gecikmeli titreşim (vibrato) — 0,35 sn sonra yavaşça girer
      this.gurultu = this.gurultu * 0.6 + (Math.random() * 2 - 1) * 0.4;
      let p = this.nefes;
      p += p * 0.035 * this.gurultu;
      let vib = 0;
      if (this.titresim && this.sesBasladi > 0.35) {
        this.lfo += 2 * Math.PI * 5.1 / sampleRate;
        const derinlik = Math.min(1, (this.sesBasladi - 0.35) / 0.5);
        vib = Math.sin(this.lfo) * derinlik;
        p += p * 0.025 * vib;
      }

      // gövde: yansıma (koyu tek kutuplu alçak geçiren) ve kamış eğrisi
      const gelen = this.oku(this.gecikme * (1 + 0.0018 * vib));
      this.suzgec = 0.55 * gelen + 0.45 * this.suzgec;
      let fark = -0.96 * this.suzgec - p;
      let yansima = 0.74 + -0.32 * fark;            // kamış: basınç farkı arttıkça kapanır
      if (yansima > 1) yansima = 1; else if (yansima < -1) yansima = -1;
      const giden = p + fark * yansima;
      this.hat[this.yaz] = giden;
      this.yaz = (this.yaz + 1) % BOYUT;

      // çıkış: hafif asimetri (çift kamışın çift harmonikleri), DC süzgeci
      let y = gelen + 1.6 * gelen * gelen;           // yumuşak çalışta azalır, güçlü çalışta artar (gerçekçi)
      const dcCik = y - this.dcOnceki + 0.995 * this.dc; this.dcOnceki = y; this.dc = dcCik;
      cik[n] = dcCik * 0.55;
    }
    // tamamen sustuysa ve iş kalmadıysa düğümü bırak
    if (!this.olaylar.length && !this.sonsuz && this.nefes < 1e-4) {
      let enerji = 0; for (let i = 0; i < 64; i++) enerji += Math.abs(this.hat[(this.yaz - i - 1 + BOYUT) % BOYUT]);
      if (enerji < 1e-4) { this.bitti = true; return false; }
    }
    return true;
  }
}
registerProcessor("kamis-model", KamisModel);
