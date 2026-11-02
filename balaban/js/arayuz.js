// Ortak arayüz parçaları (tasarım sistemi §2): simgeler, üst çubuk, liste satırı, segment, chip,
// alt sayfa, Sahne kipi, durum göstergesi, süre halkası.
import { h } from "./ortak.js";

const yol = (d, ek = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ek}${d}</svg>`;
export const SIMGE = {
  bugun: yol('<circle cx="12" cy="12" r="4" class="dolgu"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  dersler: yol('<circle cx="6" cy="6" r="2.5" class="dolgu"/><circle cx="18" cy="12" r="2.5" class="dolgu"/><circle cx="6" cy="18" r="2.5" class="dolgu"/><path d="M8.3 7.2l7.4 3.6M15.7 13.2l-7.4 3.6"/>'),
  akort: yol('<path d="M3 15h18" /><path d="M12 6v13" /><path d="M9 6h6l-3 4z" class="dolgu"/>'),
  ritim: yol('<path d="M9 3h6l3.5 18h-13z" class="dolgu"/><path d="M12 15l5-8"/>'),
  kitaplik: yol('<rect x="4" y="4" width="4" height="16" rx="1" class="dolgu"/><rect x="10" y="4" width="4" height="16" rx="1" class="dolgu"/><path d="M16.5 5l3.5 14"/>'),
  ayar: yol('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  kapat: yol('<path d="M6 6l12 12M18 6L6 18"/>'),
  geri: yol('<path d="M15 18l-6-6 6-6"/>'),
  ileri: yol('<path d="M9 18l6-6-6-6"/>'),
  oynat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor"/></svg>',
  dur: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/></svg>',
  mikrofon: yol('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  dem: yol('<circle cx="12" cy="12" r="8"/><path d="M8 12h1M11 9v6M14 10v4M17 12h-1"/>'),
  el: yol('<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3.2 14a1.5 1.5 0 0 1 2.4-1.8L8 15"/>'),
  kayit: yol('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/>'),
  nota: yol('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  liste: yol('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
  kitap: yol('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>'),
  kilit: yol('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
  tekrar: yol('<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>'),
  ampul: yol('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>'),
  bilgi: yol('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
  onay: yol('<path d="M5 12.5l4.5 4.5L19 7"/>'),
};
export const ikon = (ad) => { const s = h("span", { style: "display:contents", html: SIMGE[ad] || "" }); return s.firstChild; };

// Durum: renk + şekil + kelime (WCAG 1.4.1). tur: iyi | orta | kotu | bos ; yon: "tiz" | "pes" | null
const SEKIL = {
  iyi: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M6.5 12.5l3.5 3.5 7.5-8" stroke="var(--yuzey)" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  yukari: '<svg viewBox="0 0 24 24"><path d="M12 5l9 14H3z" fill="currentColor"/></svg>',
  asagi: '<svg viewBox="0 0 24 24"><path d="M12 19L3 5h18z" fill="currentColor"/></svg>',
  yukari2: '<svg viewBox="0 0 24 24"><path d="M12 2l7 9H5zM12 12l7 9H5z" fill="currentColor"/></svg>',
  asagi2: '<svg viewBox="0 0 24 24"><path d="M12 12L5 3h14zM12 22l-7-9h14z" fill="currentColor"/></svg>',
  bos: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  carpi: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
};
export function durumEl() {
  const el = h("span", { class: "durum bos" }, h("span", { class: "sekil", html: SEKIL.bos }), h("span", { class: "kelime" }, "Dinliyorum"));
  el.ayarla = (tur, kelime, yon) => {
    el.className = "durum " + tur;
    const s = tur === "iyi" ? SEKIL.iyi : tur === "bos" ? SEKIL.bos : yon === "tiz" ? (tur === "kotu" ? SEKIL.yukari2 : SEKIL.yukari) : yon === "pes" ? (tur === "kotu" ? SEKIL.asagi2 : SEKIL.asagi) : SEKIL.carpi;
    if (el._s !== s) { el.firstChild.innerHTML = s; el._s = s; }
    el.lastChild.textContent = kelime;
  };
  return el;
}

// Üst çubuk: sol (geri bağlantısı ya da üst yazı), başlık, sağ eylem
export function ustCubuk({ ustYazi, baslik, geri, sag } = {}) {
  const ust = h("header", { class: "ust" });
  const satir = h("div", { class: "ust-satir" });
  if (geri) satir.append(h("a", { class: "geri-bag", href: geri.href }, ikon("geri"), geri.ad));
  else satir.append(h("span", { class: "ust-yazi" }, ustYazi || ""));
  if (sag) satir.append(sag);
  ust.append(satir);
  if (baslik) ust.append(h("h1", null, baslik));
  return ust;
}
export const ayarDugmesi = () => h("a", { class: "ikon-dugme", href: "#ayarlar", "aria-label": "Ayarlar" }, ikon("ayar"));

export function listeSatiri({ simge, ad, alt, sag, href, onclick }) {
  const s = h(href ? "a" : "button", { class: "liste-satiri", href, onclick, style: href ? null : "border-left:0;border-right:0;border-top:0;border-radius:0;background:none;text-align:left;width:100%;font:inherit;color:inherit;padding-inline:0" },
    h("span", { class: "ikon" }, ikon(simge || "bilgi")),
    h("span", null, h("div", { class: "ad" }, ad), alt ? h("div", { class: "alt" }, alt) : null),
    h("span", { class: "sag" }, sag || "", ikon("ileri")));
  return s;
}

// Segment: secenekler [[deger, ad]], secili, degisince(deger)
export function segment(secenekler, secili, degisince) {
  const k = h("div", { class: "segment", role: "tablist" });
  secenekler.forEach(([d, ad]) => {
    const b = h("button", { type: "button", role: "tab", "aria-pressed": String(d === secili) }, ad);
    b.addEventListener("click", () => { k.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); degisince(d); });
    k.append(b);
  });
  return k;
}
export function chipler(secenekler, secili, degisince) {
  const k = h("div", { class: "chipler", role: "group" });
  secenekler.forEach(([d, ad]) => {
    const b = h("button", { type: "button", class: "chip", "aria-pressed": String(d === secili) }, ad);
    b.addEventListener("click", () => { k.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); degisince(d); });
    k.append(b);
  });
  return k;
}

// Alt sayfa
export function altSayfa(...icerik) {
  const arka = h("div", { class: "perde-arka", role: "dialog", "aria-modal": "true" });
  const sayfa = h("div", { class: "alt-sayfa" }, h("div", { class: "tutamak" }), ...icerik);
  arka.append(sayfa);
  const kapat = () => { arka.remove(); document.removeEventListener("keydown", tus); };
  const tus = (e) => { if (e.key === "Escape") kapat(); };
  arka.addEventListener("click", (e) => { if (e.target === arka) kapat(); });
  document.addEventListener("keydown", tus);
  document.body.append(arka);
  return kapat;
}

// Sahne kipi: tam ekran, tek büyük öğe, tek durum, altta 72 px "Bitir"
export function sahneAc({ ust = "", sagUst = null, icerik = [], bitirAdi = "Bitir", bitince } = {}) {
  const ustEl = h("div", { class: "sahne-ust" }, h("span", { class: "ust-sol" }, ust), sagUst || h("span"));
  const orta = h("div", { class: "orta" }, ...icerik);
  const bitir = h("button", { class: "bitir", type: "button" }, bitirAdi);
  const s = h("div", { class: "sahne", role: "dialog", "aria-modal": "true" }, ustEl, orta, bitir);
  let kapali = false;
  const kapat = (neden) => { if (kapali) return; kapali = true; s.remove(); document.body.removeAttribute("data-sahne"); if (bitince) bitince(neden); };
  bitir.addEventListener("click", () => kapat("bitir"));
  document.body.append(s); document.body.setAttribute("data-sahne", "1");
  return { kok: s, orta, ust: ustEl.firstChild, bitir, kapat, ustYaz: (t) => (ustEl.firstChild.textContent = t), bitirYaz: (t) => (bitir.textContent = t) };
}

// Süre halkası (220 px), oran 0–1, ortada değer
export function halka() {
  const NS = "http://www.w3.org/2000/svg";
  const k = h("div", { class: "halka" });
  const svg = document.createElementNS(NS, "svg"); svg.setAttribute("viewBox", "0 0 120 120");
  const ray = document.createElementNS(NS, "circle"); ray.setAttribute("cx", 60); ray.setAttribute("cy", 60); ray.setAttribute("r", 52); ray.setAttribute("fill", "none"); ray.setAttribute("stroke", "var(--yuzey-2)"); ray.setAttribute("stroke-width", 7);
  const dol = document.createElementNS(NS, "circle"); dol.setAttribute("cx", 60); dol.setAttribute("cy", 60); dol.setAttribute("r", 52); dol.setAttribute("fill", "none"); dol.setAttribute("stroke", "var(--civit)"); dol.setAttribute("stroke-width", 7); dol.setAttribute("stroke-linecap", "round");
  const C = 2 * Math.PI * 52; dol.setAttribute("stroke-dasharray", C); dol.setAttribute("stroke-dashoffset", C);
  svg.append(ray, dol);
  const deger = h("div", { class: "deger" }, "");
  k.append(svg, deger);
  k.ayarla = (oran, yazi) => { dol.setAttribute("stroke-dashoffset", C * (1 - Math.max(0, Math.min(1, oran)))); if (yazi != null) deger.textContent = yazi; };
  return k;
}
