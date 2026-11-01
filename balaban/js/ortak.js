// Ekranların ortak parçaları.
import * as mik from "./mikrofon.js";
import { sureEkle, ayar } from "./depo.js";
import { notaMidi, midiAdi } from "./perde.js";
import { CALGILAR } from "./parmak-tablosu.js";

export function h(tag, ozellik, ...cocuklar) {
  const n = document.createElement(tag);
  if (ozellik) for (const k in ozellik) {
    const v = ozellik[k];
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of cocuklar.flat()) if (c != null && c !== false) n.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  return n;
}

// Yazılı → duyulan kayma (yarım ses). "Çalgını tanıt" adımında ölçülür; ölçülmemişse çalgı türünün varsayılanı.
export const kaydirma = () => { const k = ayar("kaydirma"); return typeof k === "number" ? k : CALGILAR[calgiTuru()].varsayilanKaydirma; };
export const calgiTuru = () => (ayar("calgi") in CALGILAR ? ayar("calgi") : "balaban");
// Geleneksel ad: düdükte yazılı Do'nun duyulan sesi (A duduk), balabanda yazılı La'nın duyulan sesi (THM: "Re balaban")
export function akortAdi() {
  const k = kaydirma();
  const temel = calgiTuru() === "duduk" ? 72 : 69;
  return midiAdi(temel + k).ad;
}
export const calgiAdi = () => `${akortAdi()} ${calgiTuru() === "duduk" ? "düdük" : "balaban"}`;

// Yazılı nota adını Türkçe göster: "A4" → "La"
export function notaYazisi(nota, { oktav = false } = {}) {
  const a = midiAdi(typeof nota === "number" ? nota : notaMidi(nota));
  return oktav ? a.ad + a.oktav : a.ad;
}

// Mikrofon gerektiren bir alan: izin yoksa izin kutusu gösterir, açılınca hazir() çağrılır.
export function mikrofonGerekli(kutu, hazir, { aciklama } = {}) {
  if (mik.acikMi()) { hazir(); return; }
  const k = h("div", { class: "izin-kutusu kart cerceve" },
    h("svg", { viewBox: "0 0 24 24", width: "40", height: "40", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "aria-hidden": "true", html: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/>' }),
    h("p", null, aciklama || "Seni dinleyebilmem için mikrofon iznine ihtiyacım var. Ses kaydedilmez, yalnızca bu cihazda anlık olarak işlenir."),
  );
  const hata = h("p", { class: "kucuk", style: "color:var(--warn)", hidden: true });
  const dugme = h("button", { class: "vurgu", onclick: async () => {
    dugme.disabled = true; dugme.textContent = "Açılıyor…";
    const ok = await mik.baslat();
    if (ok) { k.remove(); hazir(); }
    else {
      dugme.disabled = false; dugme.textContent = "Tekrar dene";
      hata.hidden = false;
      hata.textContent = mik.durum.izin === "desteklenmiyor"
        ? "Bu tarayıcı mikrofonu desteklemiyor. Uygulamayı Safari ya da Chrome ile, https adresinden aç."
        : "Mikrofon izni verilmedi. Tarayıcının adres çubuğundaki izin simgesinden mikrofona izin verip tekrar dene.";
    }
  } }, "Mikrofonu aç");
  k.append(dugme, hata);
  kutu.appendChild(k);
}

// Mikrofonun ses duyduğu süreyi günlük çalışma süresine ekler. Ekran kapanınca dönen fonksiyonla durdurulur.
export function calismaSuresiTut() {
  let son = null, biriken = 0;
  const bitir = mik.abone((o) => {
    if (son !== null && o.sesli && o.midi !== null) biriken += Math.min(0.1, o.zaman - son);
    son = o.zaman;
    if (biriken >= 5) { sureEkle(biriken); biriken = 0; }
  });
  return () => { bitir(); if (biriken > 0) sureEkle(biriken); };
}

// Cent sapmasına göre sınıf
export function sapmaSinifi(cent, tolerans = 15) {
  const a = Math.abs(cent);
  if (a <= tolerans) return "iyi";
  if (a <= tolerans * 2) return "orta";
  return "kotu";
}
