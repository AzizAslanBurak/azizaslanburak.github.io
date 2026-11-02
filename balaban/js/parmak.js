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

// Canlı parmak şeması: yatay çalgı (kamış solda), nota kâğıdıyla eşzamanlı.
// Tek SVG kalır, yalnızca deliklerin durumu değişir; değişen delik bir an halkayla işaretlenir
// ki öğrenci hangi parmağın kalkıp indiğini görsün.
export function parmakCanli() {
  const kok = document.createElement("div");
  kok.className = "parmak-canli";
  const yazi = document.createElement("div"); yazi.className = "pc-yazi";
  const ad = document.createElement("b"); const alt = document.createElement("span"); const not = document.createElement("span"); not.className = "pc-not";
  yazi.append(ad, alt, not);
  const W = 246, H = 96, govdeY = 34, govdeH = 26, x1 = 60, ara = 21, el = 14;
  const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "pc-sema", role: "img", "aria-label": "Parmak pozisyonu" });
  s("path", { d: `M4 ${govdeY + 8} L34 ${govdeY + 4} L34 ${govdeY + govdeH - 4} L4 ${govdeY + govdeH - 8} Z`, fill: "var(--reed-soft)", stroke: "var(--reed)", "stroke-width": "1.2" }, svg);
  s("rect", { x: "18", y: govdeY + 3, width: "4", height: govdeH - 6, rx: "1", fill: "var(--reed)" }, svg);
  s("rect", { x: "34", y: govdeY, width: W - 38, height: govdeH, rx: "9", fill: "var(--wood-soft)", stroke: "var(--wood)", "stroke-width": "1.5" }, svg);
  const cx = (i) => x1 + i * ara + (i >= ELLER_ARASI ? el : 0);
  const etiket = (x, y, metin) => { const t = s("text", { x, y, "text-anchor": "middle", class: "pc-etiket" }, svg); t.textContent = metin; };
  etiket((cx(0) + cx(3)) / 2, 22, "sol el");
  etiket((cx(4) + cx(7)) / 2, 22, "sağ el");
  for (let i = 0; i < 8; i++) { const t = s("text", { x: cx(i), y: govdeY + govdeH + 13, "text-anchor": "middle", class: "pc-no" }, svg); t.textContent = String(i + 1); }
  // arka (baş parmak) deliği: gövdenin altında, 1. deliğin solunda; kesik çizgiyle gövdeye bağlı
  const ax = x1 - 16, ay = govdeY + govdeH + 22;
  s("line", { x1: ax, y1: govdeY + govdeH, x2: ax, y2: ay - 7, stroke: "var(--line)", "stroke-dasharray": "2 2" }, svg);
  etiket(ax - 24, ay + 2, "baş p.");
  function delik(x, y, r) {
    const g = s("g", { class: "pc-delik" }, svg);
    s("circle", { cx: x, cy: y, r: r + 4.5, class: "pc-halka" }, g);
    s("circle", { cx: x, cy: y, r, fill: "var(--hole-open)", stroke: "var(--ink)", "stroke-width": "1.4" }, g);
    const tam = s("circle", { cx: x, cy: y, r, class: "pc-dolu" }, g);
    const yarim = s("path", { d: `M${x - r} ${y} A${r} ${r} 0 0 0 ${x + r} ${y} Z`, class: "pc-dolu" }, g);
    tam.style.transformOrigin = yarim.style.transformOrigin = `${x}px ${y}px`;
    return { g, tam, yarim, d: null };
  }
  const arka = delik(ax, ay - 2, 5.5);
  const on = Array.from({ length: 8 }, (_, i) => delik(cx(i), govdeY + govdeH / 2, 7));
  kok.append(yazi, svg);

  function ayarla(dl, d, ilk) {
    dl.tam.classList.toggle("acik", d === "●");
    dl.yarim.classList.toggle("acik", d === "◐");
    if (!ilk && dl.d !== d) { dl.g.classList.remove("degisti"); void dl.g.getBBox(); dl.g.classList.add("degisti"); }
    dl.d = d;
  }
  let ilk = true;
  return {
    kok,
    // yazılı MIDI (kesirli olabilir: koma sesleri)
    goster(midi) {
      const g = parmakBul(midi);
      const a = midiAdi(midi);
      ad.textContent = a.ad;
      kok.classList.toggle("yok", !g);
      if (!g) { alt.textContent = "tabloda yok"; not.textContent = ""; return; }
      const [ar, onD] = g.delikler.split("|");
      ayarla(arka, ar, ilk); Array.from(onD).forEach((d, i) => ayarla(on[i], d, ilk)); ilk = false;
      svg.setAttribute("aria-label", `${a.ad}: ${g.delikler}`);
      alt.textContent = g.etiket || a.ad + a.oktav;
      const koma = Math.round((midi - Math.round(midi)) * 100);
      not.textContent = Math.abs(koma) >= 10 ? (koma < 0 ? `koma pes: ${a.ad} parmağı, dudağı gevşet` : `koma tiz: ${a.ad} parmağı, biraz sık`) : (g.not || "");
    },
  };
}
