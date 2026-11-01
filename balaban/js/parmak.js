// Parmak şeması çizici ve parmak tablosu.
// Delik dizgisi: "●|●●●●●●●●" — '|' öncesi arka (baş parmak) delik(ler)i, sonrası ön delikler yukarıdan aşağı.
// ● kapalı, ○ açık, ◐ yarım kapalı.
import { notaMidi, midiAdi } from "./perde.js";
import { TABLO, ELLER_ARASI } from "./parmak-tablosu.js";

const NS = "http://www.w3.org/2000/svg";
function s(tag, a, ebeveyn) { const n = document.createElementNS(NS, tag); for (const k in a) n.setAttribute(k, a[k]); if (ebeveyn) ebeveyn.appendChild(n); return n; }

export function semaCiz(dizgi, { grup = ELLER_ARASI, vurgu = null } = {}) {
  const [arka, on] = dizgi.includes("|") ? dizgi.split("|") : ["", dizgi];
  const arkaD = Array.from(arka), onD = Array.from(on);
  const adim = 19, bosluk = 10, ustY = 40;
  const h = ustY + onD.length * adim + bosluk + 18;
  const svg = s("svg", { viewBox: `0 0 64 ${h}`, role: "img", "aria-label": "Parmak pozisyonu " + dizgi, class: "sema" });
  s("path", { d: "M27 4 L37 4 L35 24 L29 24 Z", fill: "var(--reed-soft)", stroke: "var(--reed)", "stroke-width": "1.2" }, svg);
  s("rect", { x: "26.5", y: "13", width: "11", height: "3.2", rx: "1", fill: "var(--reed)" }, svg);
  s("rect", { x: "22", y: "24", width: "20", height: h - 28, rx: "6", fill: "var(--wood-soft)", stroke: "var(--wood)", "stroke-width": "1.5" }, svg);
  function delik(cx, cy, d, r, i) {
    const vurgulu = vurgu && vurgu.includes(i);
    const kalem = vurgulu ? "var(--wood)" : "var(--ink)";
    if (d === "●") s("circle", { cx, cy, r, fill: kalem }, svg);
    else if (d === "◐") {
      s("circle", { cx, cy, r, fill: "var(--hole-open)", stroke: kalem, "stroke-width": "1.4" }, svg);
      s("path", { d: `M${cx - r} ${cy} A${r} ${r} 0 0 0 ${cx + r} ${cy} Z`, fill: kalem }, svg);
    } else s("circle", { cx, cy, r, fill: "var(--hole-open)", stroke: kalem, "stroke-width": vurgulu ? "2.4" : "1.4" }, svg);
  }
  arkaD.forEach((d, i) => {
    const cy = 32 + i * 14;
    s("line", { x1: "13", y1: cy, x2: "22", y2: cy, stroke: "var(--line)", "stroke-width": "1", "stroke-dasharray": "2 2" }, svg);
    delik(8, cy, d, 5, "B" + i);
  });
  onD.forEach((d, i) => delik(32, ustY + i * adim + (grup && i >= grup ? bosluk : 0), d, 6, i + 1));
  return svg;
}

// Yazılı nota için tablodaki girişi bul ("A4" ya da MIDI)
export function parmakBul(nota) {
  const m = typeof nota === "number" ? Math.round(nota) : Math.round(notaMidi(nota));
  return TABLO.find((g) => Math.round(notaMidi(g.nota)) === m) || null;
}

// Bir notanın parmak kartı (şema + ad)
export function parmakKarti(nota, { buyuk = false, aciklama = true } = {}) {
  const k = document.createElement("div");
  k.className = "parmak" + (buyuk ? " buyuk" : "");
  const g = parmakBul(nota);
  const m = typeof nota === "number" ? nota : notaMidi(nota);
  const ad = midiAdi(m);
  if (g) k.appendChild(semaCiz(g.delikler));
  else { const yok = document.createElement("div"); yok.className = "sema-yok"; yok.textContent = "?"; k.appendChild(yok); }
  const a = document.createElement("span"); a.className = "ad"; a.textContent = ad.ad; k.appendChild(a);
  const o = document.createElement("span"); o.className = "alt"; o.textContent = (g && g.etiket) || ad.ad + ad.oktav; k.appendChild(o);
  if (aciklama && g && g.not) { const n = document.createElement("span"); n.className = "not"; n.textContent = g.not; k.appendChild(n); }
  return k;
}
