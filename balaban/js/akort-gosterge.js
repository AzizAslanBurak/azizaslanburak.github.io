// Canlı akort göstergesi (tasarım sistemi §2.8): nota adı, yatay cent şeridi + hedef bandı,
// renk + şekil + kelime durum satırı, isteğe bağlı perde izi ve parmak şeması.
// Yatay şerit: doğrusal konum <300 ms'de okunur, açısal ibre >1,7 sn (Blascheck vd.).
import * as mik from "./mikrofon.js";
import { midiAdi, midiHz, midiYazi } from "./perde.js";
import { h, kaydirma, sapmaSinifi } from "./ortak.js";
import { parmakKarti } from "./parmak.js";
import { durumEl } from "./arayuz.js";

export class AkortGostergesi {
  // secenek: { hedef: yazılı MIDI | null, tolerans: cent, parmak: bool, iz: bool, sahne: bool, olayda: fn(olay, hesap) }
  constructor(secenek = {}) {
    this.s = Object.assign({ hedef: null, tolerans: 15, parmak: true, iz: true, sahne: false }, secenek);
    this.kok = h("div", { class: "akort" });
    this.notaEl = h("div", { class: this.s.sahne ? "sahne-nota" : "nota-buyuk", "aria-live": "off" }, "–");
    this.bant = h("i", { class: "bant" });
    this.imlec = h("i", { class: "imlec" });
    const serit = h("div", { class: "serit", role: "img", "aria-label": "Perde şeridi: solda pes, sağda tiz" }, this.bant, h("i", { class: "sifir" }), this.imlec);
    this.durum = durumEl();
    this.hzEl = h("span", { class: "hz" }, "");
    this.kok.append(this.notaEl,
      h("div", { class: "serit-kap" }, h("span", { class: "uc" }, "pes"), serit, h("span", { class: "uc" }, "tiz")),
      this.s.sahne ? h("div", { class: "durum-satir", style: "justify-content:center" }, this.durum) : h("div", { class: "durum-satir" }, this.durum, this.hzEl));
    if (this.s.sahne) this.kok.append(h("div", { class: "alt-bilgi" }, this.hzEl));
    this.bantAyarla();
    if (this.s.iz) {
      this.tuval = h("canvas", { width: "600", height: "120" });
      this.izVeri = [];
      this.kok.append(h("details", { class: "katlanir" }, h("summary", null, "Perde izi (son 8 sn)"), h("div", { class: "iz" }, this.tuval)));
    }
    if (this.s.parmak) { this.parmakYer = h("div", { style: "justify-self:center" }); this.kok.append(this.parmakYer); this.sonParmak = null; }
    this.sonCiz = 0;
  }
  bantAyarla() { const g = Math.min(100, this.s.tolerans); this.bant.style.left = `${50 - g}%`; this.bant.style.width = `${2 * g}%`; }
  hedefAyarla(m) { this.s.hedef = m; this.sonParmak = null; }
  toleransAyarla(t) { this.s.tolerans = t; this.bantAyarla(); }
  baslat() { this.bitir = mik.abone((o) => this.olay(o)); return this; }
  durdur() { if (this.bitir) this.bitir(); this.bitir = null; }

  olay(o) {
    const k = kaydirma();
    let hesap = null;
    if (o.midi !== null) {
      const yaziliMidi = o.midi - k;
      const referans = this.s.hedef != null ? this.s.hedef : Math.round(yaziliMidi);
      let cent = (yaziliMidi - referans) * 100;
      const oktavFark = Math.round(cent / 1200);
      if (this.s.hedef != null && Math.abs(cent) > 600) cent -= oktavFark * 1200;
      hesap = { yaziliMidi, referans, cent, oktavFark: this.s.hedef != null ? oktavFark : 0, sinif: sapmaSinifi(cent, this.s.tolerans) };
    }
    if (this.s.olayda) this.s.olayda(o, hesap);
    if (this.izVeri) { this.izVeri.push({ t: o.zaman, c: hesap ? hesap.cent : null }); while (this.izVeri.length && o.zaman - this.izVeri[0].t > 8) this.izVeri.shift(); }
    const simdi = performance.now();
    if (simdi - this.sonCiz < 45) return;
    this.sonCiz = simdi;
    this.ciz(o, hesap);
  }

  ciz(o, hesap) {
    if (!hesap) {
      this.imlec.className = "imlec"; this.imlec.style.transform = "translateX(0)";
      this.durum.ayarla("bos", o.sesli ? "Ses var, perdesi net değil" : "Dinliyorum");
      this.notaEl.style.opacity = ".3";
      if (this.s.hedef != null) { const a = midiAdi(this.s.hedef); this.notaEl.innerHTML = `${a.ad}<sub>${a.oktav}</sub>`; }
      this.hzEl.textContent = "";
    } else {
      const a = midiAdi(this.s.hedef != null ? this.s.hedef : hesap.referans);
      const calinan = midiAdi(Math.round(hesap.yaziliMidi));
      this.notaEl.innerHTML = `${a.ad}<sub>${a.oktav}</sub>`;
      this.notaEl.style.opacity = "1";
      const c = Math.round(hesap.cent);
      const konum = Math.max(-50, Math.min(50, hesap.cent));
      this.imlec.style.transform = `translateX(${(konum / 50) * (this.imlec.parentNode.clientWidth / 2)}px)`;
      const yanlisNota = this.s.hedef != null && !hesap.oktavFark && Math.abs(hesap.cent) > 60;
      let tur = hesap.oktavFark ? "kotu" : hesap.sinif, kelime, yon = c > 0 ? "tiz" : "pes";
      if (hesap.oktavFark) kelime = hesap.oktavFark > 0 ? "Bir oktav tiz" : "Bir oktav pes";
      else if (yanlisNota) { kelime = `Hedef ${a.ad}, sen ${calinan.ad} çalıyorsun`; yon = null; tur = "kotu"; }
      else if (tur === "iyi") kelime = "Yerinde";
      else kelime = c > 0 ? `${c} cent tiz · gevşet` : `${-c} cent pes · biraz sık`;
      this.imlec.className = "imlec " + tur;
      this.durum.ayarla(tur, kelime, yon);
      const k = kaydirma();
      this.hzEl.textContent = `${o.hz.toFixed(1)} Hz` + (k ? ` · duyulan ${midiYazi(o.midi)}` : "");
      if (this.parmakYer) {
        const p = this.s.hedef != null ? Math.round(this.s.hedef) : Math.round(hesap.yaziliMidi);
        if (p !== this.sonParmak) { this.sonParmak = p; this.parmakYer.replaceChildren(parmakKarti(p, { buyuk: true })); }
      }
    }
    if (this.tuval && this.tuval.closest("details") && this.tuval.closest("details").open) this.izCiz();
  }

  izCiz() {
    const t = this.tuval, c = t.getContext("2d");
    const cs = getComputedStyle(document.documentElement);
    const W = t.width, H = t.height;
    c.clearRect(0, 0, W, H);
    const y = (cent) => H / 2 - (Math.max(-60, Math.min(60, cent)) / 60) * (H / 2 - 8);
    c.fillStyle = cs.getPropertyValue("--iyi-soluk"); c.fillRect(0, y(this.s.tolerans), W, y(-this.s.tolerans) - y(this.s.tolerans));
    c.strokeStyle = cs.getPropertyValue("--cizgi"); c.lineWidth = 1; c.beginPath(); c.moveTo(0, H / 2); c.lineTo(W, H / 2); c.stroke();
    if (!this.izVeri.length) return;
    const son = this.izVeri[this.izVeri.length - 1].t;
    c.strokeStyle = cs.getPropertyValue("--civit"); c.lineWidth = 2.5; c.lineJoin = "round"; c.beginPath();
    let acik = false;
    for (const n of this.izVeri) {
      const x = W - ((son - n.t) / 8) * W;
      if (n.c == null) { acik = false; continue; }
      if (!acik) { c.moveTo(x, y(n.c)); acik = true; } else c.lineTo(x, y(n.c));
    }
    c.stroke();
  }
}

export const hedefHz = (yaziliMidi) => midiHz(yaziliMidi + kaydirma());
