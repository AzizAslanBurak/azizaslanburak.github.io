// Parmak şeması çizici ve parmak tablosu.
// Delik dizgisi: "●|●●●●●●●●" — '|' öncesi arka (baş parmak) delik(ler)i, sonrası ön delikler yukarıdan aşağı.
// ● kapalı, ○ açık, ◐ yarım kapalı.
import { notaMidi, midiAdi } from "./perde.js";
import { TABLO, ELLER_ARASI } from "./parmak-tablosu.js";
import { h } from "./ortak.js";
import { ayar, ayarla } from "./depo.js";

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

// Canlı parmak şeması: dik çalgı (kamış üstte, elde tutulduğu gibi), nota kâğıdıyla eşzamanlı.
// Tek SVG kalır, yalnızca deliklerin durumu değişir; değişen delik bir an halkayla işaretlenir
// ki öğrenci hangi parmağın kalkıp indiğini görsün. Ad ve ipucu ayrı öğelerdir (notaYaninda yerleştirir).
export function parmakCanli() {
  const kok = document.createElement("div");
  kok.className = "parmak-canli";
  const ad = document.createElement("b"); ad.className = "pc-ad";
  const alt = document.createElement("span"); alt.className = "pc-alt";
  const notEl = document.createElement("div"); notEl.className = "pc-not";
  const W = 88, govdeX = 34, govdeW = 24, cx = govdeX + govdeW / 2, y1 = 50, ara = 20, el = 12;
  const cy = (i) => y1 + i * ara + (i >= ELLER_ARASI ? el : 0);
  const H = cy(7) + 18;
  const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, class: "pc-sema", role: "img", "aria-label": "Parmak pozisyonu" });
  s("path", { d: `M${cx - 4} 3 L${cx + 4} 3 L${cx + 7} 28 L${cx - 7} 28 Z`, fill: "var(--reed-soft)", stroke: "var(--reed)", "stroke-width": "1.2" }, svg);
  s("rect", { x: cx - 6, y: "14", width: "12", height: "3.2", rx: "1", fill: "var(--reed)" }, svg);
  s("rect", { x: govdeX, y: "28", width: govdeW, height: H - 32, rx: "9", fill: "var(--wood-soft)", stroke: "var(--wood)", "stroke-width": "1.5" }, svg);
  const yazi = (x, y, metin, sinif, ek = {}) => { const t = s("text", { x, y, "text-anchor": "middle", class: sinif, ...ek }, svg); t.textContent = metin; };
  for (let i = 0; i < 8; i++) yazi(govdeX + govdeW + 8, cy(i) + 3.5, String(i + 1), "pc-no");
  // el grupları: sağda ince köşeli çizgi + dik yazı
  const grup = (a, b, metin) => {
    const x = W - 13, ya = cy(a) - 8, yb = cy(b) + 8;
    s("path", { d: `M${x - 3} ${ya} L${x} ${ya} L${x} ${yb} L${x - 3} ${yb}`, fill: "none", stroke: "var(--line)", "stroke-width": "1" }, svg);
    const ym = (ya + yb) / 2; yazi(x + 6, ym, metin, "pc-etiket", { transform: `rotate(90 ${x + 6} ${ym})` });
  };
  grup(0, 3, "sol el"); grup(4, 7, "sağ el");
  // arka (baş parmak) deliği: solda, 1. deliğin hizasında; kesik çizgiyle gövdeye bağlı
  const ax = 15, ay = cy(0) + 4;
  s("line", { x1: ax + 7, y1: ay, x2: govdeX, y2: ay, stroke: "var(--line)", "stroke-dasharray": "2 2" }, svg);
  yazi(ax, ay + 17, "baş", "pc-kucuk"); yazi(ax, ay + 26, "parmak", "pc-kucuk");
  function delik(x, y, r) {
    const g = s("g", { class: "pc-delik" }, svg);
    s("circle", { cx: x, cy: y, r: r + 4.5, class: "pc-halka" }, g);
    s("circle", { cx: x, cy: y, r, fill: "var(--hole-open)", stroke: "var(--ink)", "stroke-width": "1.4" }, g);
    const tam = s("circle", { cx: x, cy: y, r, class: "pc-dolu" }, g);
    const yarim = s("path", { d: `M${x - r} ${y} A${r} ${r} 0 0 0 ${x + r} ${y} Z`, class: "pc-dolu" }, g);
    tam.style.transformOrigin = yarim.style.transformOrigin = `${x}px ${y}px`;
    return { g, tam, yarim, d: null };
  }
  const arka = delik(ax, ay, 5.5);
  const on = Array.from({ length: 8 }, (_, i) => delik(cx, cy(i), 7));
  kok.append(ad, alt, svg);

  function ayarla(dl, d, ilk) {
    dl.tam.classList.toggle("acik", d === "●");
    dl.yarim.classList.toggle("acik", d === "◐");
    if (!ilk && dl.d !== d) { dl.g.classList.remove("degisti"); void dl.g.getBBox(); dl.g.classList.add("degisti"); }
    dl.d = d;
  }
  let ilk = true;
  return {
    kok, notEl,
    // yazılı MIDI (kesirli olabilir: koma sesleri)
    goster(midi) {
      const g = parmakBul(midi);
      const a = midiAdi(midi);
      ad.textContent = a.ad;
      kok.classList.toggle("yok", !g);
      if (!g) { alt.textContent = "tabloda yok"; notEl.textContent = ""; return; }
      const [ar, onD] = g.delikler.split("|");
      ayarla(arka, ar, ilk); Array.from(onD).forEach((d, i) => ayarla(on[i], d, ilk)); ilk = false;
      svg.setAttribute("aria-label", `${a.ad}: ${g.delikler}`);
      alt.textContent = g.etiket || a.ad + a.oktav;
      const koma = Math.round((midi - Math.round(midi)) * 100);
      notEl.textContent = Math.abs(koma) >= 10 ? (koma < 0 ? `${a.ad} koma pes: ${a.ad} parmağı, dudağı gevşet` : `${a.ad} koma tiz: ${a.ad} parmağı, biraz sık`) : g.not ? `${a.ad}: ${g.not}` : "";
    },
  };
}

// Nota kâğıdının soluna dik çalgıyı koyar; ipucu satırı altta tam genişlikte.
// "Parmaklar" düğmesi için gizle/göster durumu ayarlarda tutulur.
export function notaYaninda(parmak, kagit) {
  return h("div", { class: "nota-govde" + (ayar("parmakSim") === false ? " parmaksiz" : "") }, parmak.kok, kagit, parmak.notEl);
}
export function parmakDugmesi(govde) {
  const b = h("button", { class: "ikincil", "aria-pressed": String(ayar("parmakSim") !== false) }, "Parmaklar");
  b.addEventListener("click", () => { const acik = govde.classList.toggle("parmaksiz") === false; b.setAttribute("aria-pressed", String(acik)); ayarla("parmakSim", acik); });
  return b;
}
