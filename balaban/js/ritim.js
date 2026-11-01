// Ritim: desen gösterimi (ABC), ritim testi (mikrofonla nota başlangıçlarını yakalayıp zamanlamayı puanlar), gecikme ayarı.
import * as mik from "./mikrofon.js";
import { ac, onSayim, onSayimTek, tikPlanla, kamisSesi } from "./ses.js";
import { notaMidi } from "./perde.js";
import { h, kaydirma } from "./ortak.js";

// x/8 ölçülerin sekizlik grupları (aksak usuller dahil)
export const OLCU_GRUPLARI = { "5/8": [2, 3], "6/8": [3, 3], "7/8": [2, 2, 3], "9/8": [2, 2, 2, 3], "10/8": [3, 2, 2, 3], "12/8": [3, 3, 3, 3] };

// Desen: dörtlük cinsinden süreler, '-' ile başlayan es, '|' ölçü çizgisi. Örn: "1 1 2 | .5 .5 1 -1 1"
export function desenCoz(desen) {
  const olaylar = []; let t = 0;
  for (const p of desen.trim().split(/\s+/)) {
    if (p === "|") continue;
    const es = p.startsWith("-");
    const sure = parseFloat(es ? p.slice(1) : p);
    if (!isFinite(sure) || sure <= 0) continue;
    olaylar.push({ bas: t, sure, es }); t += sure;
  }
  return { olaylar, toplam: t };
}

function abcSure(sekizlik) {
  if (sekizlik === 1) return "";
  if (Number.isInteger(sekizlik)) return String(sekizlik);
  if (sekizlik === 0.5) return "/";
  if (sekizlik === 1.5) return "3/2";
  if (sekizlik === 0.75) return "3/4";
  return String(sekizlik);
}
// Desenin tek çizgili ritim notası (ABC)
export function desenAbc(desen, olcu = "4/4", notaHarf = "B") {
  const parcalar = desen.trim().split(/\s+/).map((p) => {
    if (p === "|") return "|";
    const es = p.startsWith("-"); const s = parseFloat(es ? p.slice(1) : p) * 2;
    return (es ? "z" : notaHarf) + abcSure(s);
  });
  return `X:1\nM:${olcu}\nL:1/8\nK:C clef=perc stafflines=1\n${parcalar.join(" ")} |]`;
}

// Ritim testi. secenek: { desen, bpm, olcuVurus, notaYazili (MIDI, örnek çalım için), modelCal (önce örneği çal), onSayimSesli }
// Döner: Promise<{ notlar:[{beklenen, olculen, hata}], fazla, puan, ortalama, sapma }>
export function ritimTesti(secenek, { durumda } = {}) {
  const c = ac();
  const { olaylar, toplam } = desenCoz(secenek.desen);
  const vurusSn = 60 / secenek.bpm;
  const olcu = secenek.olcuVurus || 4;
  const gruplar = OLCU_GRUPLARI[secenek.olcu];
  let t0 = c.currentTime + 0.3;
  let basla;
  if (gruplar) {
    // x/8 ölçüler: tıklar sekizlik grup başlarında (ör. 7/8 = 2+2+3), ön sayım bir ölçü, grup grup sayılır
    const sekizlik = vurusSn / 2;
    const olcuSn = gruplar.reduce((a, b) => a + b, 0) * sekizlik;
    let t = 0;
    gruplar.forEach((g, i) => { onSayimTek(t0 + t, i + 1, secenek.onSayimSesli !== false); t += g * sekizlik; });
    basla = t0 + olcuSn;
    const olcuSayisi = Math.ceil(toplam * vurusSn / olcuSn - 1e-6);
    for (let o = 0; o < olcuSayisi; o++) { let u = 0; gruplar.forEach((g, i) => { tikPlanla(basla + o * olcuSn + u, i === 0, 0.45); u += g * sekizlik; }); }
  } else {
    basla = onSayim(t0, secenek.bpm, olcu, { sesli: secenek.onSayimSesli !== false });
    // desen boyunca hafif tık (her vuruşta)
    for (let i = 0; i < Math.ceil(toplam - 1e-6); i++) tikPlanla(basla + i * vurusSn, i % olcu === 0, 0.45);
  }
  const bitis = basla + toplam * vurusSn;
  const beklenen = olaylar.filter((o) => !o.es).map((o) => basla + o.bas * vurusSn);
  const onsetler = [];
  const altHz = 140, ustHz = 1100;
  const erken = basla - Math.min(0.25, vurusSn / 2); // ön sayım sırasında duyulanlar sayılmaz
  const bitir = mik.zarfVar()
    ? mik.onsetAbone((o) => { if (o.zaman >= erken) onsetler.push(o.zaman); })
    : mik.abone((o) => {
        if (!o.onset || o.hz == null || o.hz < altHz || o.hz > ustHz) return;
        if (o.onsetZamani >= erken) onsetler.push(o.onsetZamani);
      });
  if (durumda) {
    const zam = setInterval(() => {
      const t = c.currentTime;
      if (t < basla) durumda({ evre: "sayim", vurus: Math.floor((t - t0) / vurusSn) + 1 });
      else if (t < bitis) durumda({ evre: "cal", vurus: Math.floor((t - basla) / vurusSn) % olcu + 1, ilerleme: (t - basla) / (bitis - basla) });
      else clearInterval(zam);
    }, 30);
  }
  return new Promise((coz) => {
    setTimeout(() => {
      bitir();
      coz(degerlendir(beklenen, onsetler, vurusSn, secenek.bant || 0.08));
    }, (bitis - c.currentTime + Math.min(0.4, vurusSn)) * 1000);
  });
}

export function degerlendir(beklenen, onsetler, vurusSn, bant = 0.08) {
  const kullanildi = new Set();
  const pencere = Math.min(Math.max(0.2, bant * 2.5), vurusSn * 0.45);
  const notlar = beklenen.map((b) => {
    let enIyi = -1, enIyiFark = Infinity;
    onsetler.forEach((o, i) => { if (kullanildi.has(i)) return; const f = Math.abs(o - b); if (f < enIyiFark) { enIyiFark = f; enIyi = i; } });
    if (enIyi >= 0 && enIyiFark <= pencere) { kullanildi.add(enIyi); return { beklenen: b, olculen: onsetler[enIyi], hata: onsetler[enIyi] - b }; }
    return { beklenen: b, olculen: null, hata: null };
  });
  const fazla = onsetler.length - kullanildi.size;
  const vurulan = notlar.filter((n) => n.hata !== null);
  const iyi = vurulan.filter((n) => Math.abs(n.hata) <= bant).length;
  const orta = vurulan.filter((n) => Math.abs(n.hata) > bant && Math.abs(n.hata) <= bant * 2).length;
  const puan = Math.max(0, Math.min(100, Math.round(((iyi + 0.5 * orta) / Math.max(1, notlar.length) - 0.05 * fazla) * 100)));
  const ort = vurulan.length ? vurulan.reduce((s, n) => s + n.hata, 0) / vurulan.length : 0;
  const sd = vurulan.length > 1 ? Math.sqrt(vurulan.reduce((s, n) => s + (n.hata - ort) ** 2, 0) / (vurulan.length - 1)) : 0;
  return { notlar, fazla, puan, ortalama: ort, sapma: sd, iyi, orta, kacan: notlar.length - vurulan.length, bant };
}

// Sonuç grafiği: her nota için ms cinsinden erken/geç
export function sonucGrafigi(sonuc) {
  const t = h("canvas", { width: "600", height: "150", role: "img", "aria-label": "Her notanın zamanlama sapması" });
  requestAnimationFrame(() => {
    const c = t.getContext("2d"); const cs = getComputedStyle(document.documentElement);
    const W = t.width, H = t.height, n = sonuc.notlar.length;
    const y = (ms) => H / 2 + (Math.max(-200, Math.min(200, ms)) / 200) * (H / 2 - 12);
    const b = (sonuc.bant || 0.08) * 1000; c.fillStyle = cs.getPropertyValue("--good-soft"); c.fillRect(0, y(-b), W, y(b) - y(-b));
    c.strokeStyle = cs.getPropertyValue("--line"); c.beginPath(); c.moveTo(0, H / 2); c.lineTo(W, H / 2); c.stroke();
    c.font = "12px IBM Plex Mono, monospace"; c.fillStyle = cs.getPropertyValue("--ink-soft");
    c.fillText("erken", 6, 14); c.fillText("geç", 6, H - 6);
    sonuc.notlar.forEach((nt, i) => {
      const x = ((i + 0.5) / n) * W;
      if (nt.hata === null) { c.strokeStyle = cs.getPropertyValue("--warn"); c.lineWidth = 2; c.beginPath(); c.moveTo(x - 5, H / 2 - 5); c.lineTo(x + 5, H / 2 + 5); c.moveTo(x + 5, H / 2 - 5); c.lineTo(x - 5, H / 2 + 5); c.stroke(); return; }
      const ms = nt.hata * 1000, a = Math.abs(ms);
      c.fillStyle = cs.getPropertyValue(a <= b ? "--good" : a <= 2 * b ? "--mid" : "--warn");
      c.beginPath(); c.arc(x, y(ms), 6, 0, Math.PI * 2); c.fill();
    });
  });
  return t;
}

export function sonucYazisi(s) {
  const ms = Math.round(s.ortalama * 1000);
  const egilim = Math.abs(ms) < 25 ? "Zamanlaman dengeli." : ms < 0 ? `Genelde ${-ms} ms erken giriyorsun, biraz bekle.` : `Genelde ${ms} ms geç kalıyorsun, sayımı içinden önceden hazırla.`;
  const istikrar = s.sapma < 0.04 ? "Vuruşların çok düzenli." : s.sapma < 0.08 ? "Düzenin iyi, biraz daha oturtabilirsin." : "Vuruşların dalgalı; tempoyu düşürüp tekrar dene.";
  return `${egilim} ${istikrar}` + (s.kacan ? ` ${s.kacan} notayı duyamadım.` : "") + (s.fazla ? ` ${s.fazla} fazladan başlangıç duydum.` : "");
}

// Örnek ritmi çal (çalgı sesiyle)
export function desenCal(desen, bpm, yaziliNota = "A4") {
  const c = ac(); const { olaylar } = desenCoz(desen); const v = 60 / bpm; const t0 = c.currentTime + 0.15;
  const m = notaMidi(yaziliNota) + kaydirma();
  const sesler = olaylar.filter((o) => !o.es).map((o) => kamisSesi(m, t0 + o.bas * v, Math.max(0.1, o.sure * v * 0.85), { titresim: false }));
  return { dur: () => sesler.forEach((s) => s.dur()) };
}

// Gecikme ayarı: 8 vuruşta kısa notalar çal, ortalama sapmayı gecikmeye ekle
export async function gecikmeOlc(durumda) {
  const sonuc = await ritimTesti({ desen: "1 1 1 1 1 1 1 1", bpm: 80, olcuVurus: 4 }, { durumda });
  const vurulan = sonuc.notlar.filter((n) => n.hata !== null);
  if (vurulan.length < 5) return { tamam: false, sonuc };
  const hatalar = vurulan.map((n) => n.hata).sort((a, b) => a - b);
  const medyan = hatalar[hatalar.length >> 1];
  mik.gecikmeKaydet(mik.durum.gecikme + medyan);
  return { tamam: true, sonuc, yeni: mik.durum.gecikme };
}
