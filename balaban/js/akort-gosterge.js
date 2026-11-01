// Canlı akort göstergesi: nota adı, cent ibresi, durum hapı, perde izi. Hem Akort ekranında hem derslerde kullanılır.
import * as mik from "./mikrofon.js";
import { midiAdi, midiHz, midiYazi } from "./perde.js";
import { h, kaydirma, sapmaSinifi } from "./ortak.js";
import { parmakKarti } from "./parmak.js";

const NS = "http://www.w3.org/2000/svg";

function ibreSvg() {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 300 150");
  svg.setAttribute("aria-hidden", "true");
  const yay = (a0, a1, renk, kalinlik) => {
    const r = 120, cx = 150, cy = 140;
    const p = (a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `<path d="M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}" stroke="${renk}" stroke-width="${kalinlik}" fill="none" stroke-linecap="round"/>`;
  };
  const A = (c) => (c / 50) * (Math.PI / 2.6);
  let ic = yay(A(-50), A(-25), "var(--warn-soft)", 14) + yay(A(-25), A(-10), "var(--mid-soft)", 14) + yay(A(-10), A(10), "var(--good-soft)", 14) + yay(A(10), A(25), "var(--mid-soft)", 14) + yay(A(25), A(50), "var(--warn-soft)", 14);
  for (let c = -50; c <= 50; c += 10) {
    const a = A(c), r1 = c === 0 ? 96 : 104, r2 = 112;
    ic += `<line x1="${150 + r1 * Math.sin(a)}" y1="${140 - r1 * Math.cos(a)}" x2="${150 + r2 * Math.sin(a)}" y2="${140 - r2 * Math.cos(a)}" stroke="var(--ink-soft)" stroke-width="${c === 0 ? 2.5 : 1.2}"/>`;
  }
  ic += `<text x="22" y="146" font-size="12" fill="var(--ink-soft)" font-family="IBM Plex Mono, monospace">pes</text><text x="256" y="146" font-size="12" fill="var(--ink-soft)" font-family="IBM Plex Mono, monospace">tiz</text>`;
  ic += `<g class="igne" style="transition: transform .08s linear; transform-origin: 150px 140px"><line x1="150" y1="140" x2="150" y2="38" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/></g><circle cx="150" cy="140" r="7" fill="var(--ink)"/>`;
  svg.innerHTML = ic;
  svg.ibre = (cent) => {
    const g = svg.querySelector(".igne");
    if (cent == null) { g.style.opacity = ".25"; g.style.transform = "rotate(0rad)"; return; }
    g.style.opacity = "1";
    g.style.transform = `rotate(${A(Math.max(-50, Math.min(50, cent)))}rad)`;
  };
  svg.ibre(null);
  return svg;
}

export class AkortGostergesi {
  // secenek: { hedef: yazılı MIDI (kesirli olabilir) | null, tolerans: cent, parmak: bool, iz: bool, olayda: fn(olay, hesap) }
  constructor(secenek = {}) {
    this.s = Object.assign({ hedef: null, tolerans: 15, parmak: true, iz: true }, secenek);
    this.kok = h("div", { class: "akort" });
    this.notaEl = h("div", { class: "nota-buyuk", "aria-live": "polite" }, "–");
    this.hzEl = h("div", { class: "hz" }, "Çal, dinliyorum");
    this.hapEl = h("span", { class: "durum-hap bos" }, "Ses yok");
    this.ibre = ibreSvg();
    this.kok.append(this.notaEl, h("div", { class: "ibre" }, this.ibre), this.hapEl, this.hzEl);
    if (this.s.iz) {
      this.tuval = h("canvas", { width: "600", height: "140" });
      this.kok.append(h("div", { class: "iz", title: "Son 8 saniyenin perde izi" }, this.tuval));
      this.izVeri = [];
    }
    if (this.s.parmak) { this.parmakYer = h("div"); this.kok.append(this.parmakYer); this.sonParmak = null; }
    this.sonCiz = 0;
  }
  hedefAyarla(m) { this.s.hedef = m; this.sonParmak = null; }
  baslat() {
    this.bitir = mik.abone((o) => this.olay(o));
    return this;
  }
  durdur() { if (this.bitir) this.bitir(); this.bitir = null; }

  olay(o) {
    const k = kaydirma();
    let hesap = null;
    if (o.midi !== null) {
      const yaziliMidi = o.midi - k;
      const referans = this.s.hedef != null ? this.s.hedef : Math.round(yaziliMidi);
      let cent = (yaziliMidi - referans) * 100;
      const oktavFark = Math.round(cent / 1200);
      if (this.s.hedef != null && Math.abs(cent) > 600) cent -= oktavFark * 1200; // oktav hatası ayrıca bildirilir
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
      this.ibre.ibre(null);
      this.hapEl.className = "durum-hap bos"; this.hapEl.textContent = o.sesli ? "Ses net değil" : "Ses yok";
      if (this.s.hedef != null) { const a = midiAdi(this.s.hedef); this.notaEl.innerHTML = `${a.ad}<sub>${a.oktav}</sub>`; this.notaEl.style.opacity = ".35"; }
      else this.notaEl.style.opacity = ".35";
    } else {
      const gosterilen = this.s.hedef != null ? this.s.hedef : hesap.referans;
      const a = midiAdi(this.s.hedef != null ? Math.round(hesap.yaziliMidi) : gosterilen);
      this.notaEl.innerHTML = `${a.ad}<sub>${a.oktav}</sub>`;
      this.notaEl.style.opacity = "1";
      this.ibre.ibre(hesap.cent);
      const c = Math.round(hesap.cent);
      let yazi;
      if (hesap.oktavFark) yazi = hesap.oktavFark > 0 ? "Bir oktav tiz çıkıyor" : "Bir oktav pes çıkıyor";
      else if (Math.abs(c) <= this.s.tolerans) yazi = "Tam yerinde";
      else yazi = c > 0 ? `${c} cent tiz · gevşet` : `${-c} cent pes · biraz sık`;
      if (this.s.hedef != null && !hesap.oktavFark && Math.abs(hesap.cent) > 60) yazi = `Hedef ${midiAdi(this.s.hedef).ad}, sen ${a.ad} çalıyorsun`;
      this.hapEl.className = "durum-hap " + (hesap.oktavFark ? "kotu" : hesap.sinif);
      this.hapEl.textContent = yazi;
      const k = kaydirma();
      this.hzEl.textContent = `${o.hz.toFixed(1)} Hz` + (k ? ` · duyulan ${midiYazi(o.midi)}` : "");
      if (this.parmakYer) {
        const p = this.s.hedef != null ? Math.round(this.s.hedef) : Math.round(hesap.yaziliMidi);
        if (p !== this.sonParmak) { this.sonParmak = p; this.parmakYer.replaceChildren(parmakKarti(p, { buyuk: true })); }
      }
    }
    if (this.tuval) this.izCiz();
  }

  izCiz() {
    const t = this.tuval, c = t.getContext("2d");
    const cs = getComputedStyle(document.documentElement);
    const W = t.width, H = t.height;
    c.clearRect(0, 0, W, H);
    const y = (cent) => H / 2 - (Math.max(-60, Math.min(60, cent)) / 60) * (H / 2 - 8);
    c.fillStyle = cs.getPropertyValue("--good-soft"); c.fillRect(0, y(this.s.tolerans), W, y(-this.s.tolerans) - y(this.s.tolerans));
    c.strokeStyle = cs.getPropertyValue("--line"); c.lineWidth = 1; c.beginPath(); c.moveTo(0, H / 2); c.lineTo(W, H / 2); c.stroke();
    if (!this.izVeri.length) return;
    const son = this.izVeri[this.izVeri.length - 1].t;
    c.strokeStyle = cs.getPropertyValue("--wood"); c.lineWidth = 2.5; c.lineJoin = "round"; c.beginPath();
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
