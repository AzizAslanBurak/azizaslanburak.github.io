// Akort, Ritim, Kitaplık ve Ayarlar ekranları (tasarım sistemi §4.4–4.7).
import * as mik from "./mikrofon.js";
import { metronom, saymaYukle, demBaslat, demDurdur, demAcik, notaCal, diziCal, sesMotoru, sesMotoruAyarla, ornekYuklendi } from "./ses.js";
import { notaMidi, midiAdi } from "./perde.js";
import { h, mikrofonGerekli, calismaSuresiTut, kaydirma, notaYazisi, calgiAdi, calgiTuru, gorunumUygula } from "./ortak.js";
import { kayitEkrani } from "./kayit.js";
import { ritimBandi, perdeBandi } from "./ilerleme.js";
import { CALGILAR, TABLO } from "./parmak-tablosu.js";
import { AkortGostergesi } from "./akort-gosterge.js";
import { ritimTesti, desenAbc, sonucGrafigi, desenCal, gecikmeOlc, OLCU_GRUPLARI } from "./ritim.js";
import { parmakKarti, parmakBul } from "./parmak.js";
import { ayar, ayarla, sifirla as hepsiniSifirla } from "./depo.js";
import { ikon, ustCubuk, ayarDugmesi, listeSatiri, segment, chipler, altSayfa, sahneAc, durumEl } from "./arayuz.js";
import { oturumIsaretle } from "./oturum.js";

const nasil = (baslik, ...icerik) => h("button", { class: "metin-dugme", onclick: () => altSayfa(h("h2", null, baslik), ...icerik) }, "Nasıl?");

// ---------------- AKORT ----------------
const BANTLAR = [["25", "Başlangıç ±25"], ["15", "Orta ±15"], ["8", "İleri ±8"]];

export function akortEkrani(kok) {
  const temizlik = [];
  let hedef = null;
  let tol = +(ayar("akortTol") || perdeBandi());
  kok.append(ustCubuk({ ustYazi: calgiAdi(), baslik: "Akort", sag: nasil("Akort nasıl kullanılır",
    h("p", null, "Bir nota çal; en yakın notayı ve ne kadar pes ya da tiz olduğunu gösteririm. Şeritte ortadaki yeşil bant hedef aralıktır."),
    h("p", null, "Bir hedef seçersen yalnız o notaya göre ölçerim. Dem, karar sesini (bütün delikler kapalı La) sürekli çalar; iki ses tam oturunca aradaki titreşim kaybolur."),
    h("p", { style: "margin:0" }, "Çalarken telefona bakmak zorsa \"Sahneye al\": nota ve şerit uzaktan okunacak kadar büyür.")) }));

  const alan = h("div", { class: "yigin" });
  kok.append(alan);
  const parmakYer = h("div");
  let gosterge = null;
  mikrofonGerekli(alan, () => {
    let sesli = 0, sonZ = null, isinmaYazildi = false;
    gosterge = new AkortGostergesi({ tolerans: tol, parmak: false, iz: true, olayda: (o, hs) => {
      const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
      if (o.midi != null) { sesli += dt; if (sesli > 60 && !isinmaYazildi) { isinmaYazildi = true; oturumIsaretle("isinma"); } }
      if (hedef == null && hs) parmakGoster(Math.round(hs.yaziliMidi));
    } });
    gosterge.baslat(); temizlik.push(() => gosterge.durdur(), calismaSuresiTut());
    alan.prepend(gosterge.kok);
  });

  let sonParmak = null;
  // Yalnız çalgının parmak tablosundaki sesler için şema göster (ortam sesi ya da aralık dışı sesler son şemayı bozmasın)
  function parmakGoster(m) { if (m === sonParmak || !parmakBul(m)) return; sonParmak = m; parmakYer.replaceChildren(parmakKarti(m, { buyuk: true, aciklama: false })); }
  parmakGoster(notaMidi("A4"));

  const hedefler = [[null, "Serbest"], ...TABLO.filter((g) => !/[#b]/.test(g.nota) || ["Bb4", "Bb5"].includes(g.nota)).map((g) => [g.nota, notaYazisi(g.nota)])];
  const dinleB = h("button", { class: "ikincil", disabled: true }, ikon("oynat"), "Hedefi dinle");
  const demB = h("button", { class: "ikincil", "aria-pressed": demAcik() ? "true" : "false" }, ikon("dem"), demAcik() ? "Dem · açık" : "Dem · kapalı");
  const bantS = h("select", { "aria-label": "Bant" }, BANTLAR.map(([v, ad]) => h("option", { value: v }, ad)));
  bantS.value = String(tol);
  if (!BANTLAR.some(([v]) => +v === tol)) bantS.value = "15";
  alan.append(
    h("div", { class: "yigin-s" }, h("span", { class: "etiket-yazi" }, "Hedef"),
      chipler(hedefler, null, (n) => { hedef = n ? notaMidi(n) : null; if (gosterge) gosterge.hedefAyarla(hedef); dinleB.disabled = !n; if (n) parmakGoster(hedef); })),
    h("div", { class: "hazirlik" }, parmakYer,
      h("div", { class: "bilgi" }, h("div", { class: "dugmeler" }, dinleB, demB),
        h("label", { class: "yigin-s" }, h("span", { class: "etiket-yazi" }, "Bant"), bantS))),
    h("button", { class: "birincil genis", onclick: sahneyeAl }, ikon("mikrofon"), "Sahneye al"));

  dinleB.addEventListener("click", () => { if (hedef != null) notaCal(hedef + kaydirma(), 1.5); });
  demB.addEventListener("click", () => {
    if (demAcik()) { demDurdur(); demB.setAttribute("aria-pressed", "false"); demB.lastChild.textContent = "Dem · kapalı"; }
    else { demBaslat(notaMidi("A4") + kaydirma()); demB.setAttribute("aria-pressed", "true"); demB.lastChild.textContent = "Dem · açık"; }
  });
  bantS.addEventListener("change", () => { tol = +bantS.value; ayarla("akortTol", bantS.value); if (gosterge) gosterge.toleransAyarla(tol); });

  function sahneyeAl() {
    mikrofonGerekli(alan, () => {
      const g = new AkortGostergesi({ hedef, tolerans: tol, parmak: false, iz: false, sahne: true });
      const s = sahneAc({ ust: "Akort · Sahne", sagUst: h("span", null, hedef != null ? `Hedef: ${midiAdi(hedef).ad}` : ""), icerik: [g.kok], bitince: () => g.durdur() });
      g.baslat(); temizlik.push(() => s.kapat());
    });
  }
  return () => temizlik.forEach((f) => f());
}

// ---------------- RİTİM ----------------
const OLCULER = [
  { id: "2/4", vurus: 2 }, { id: "3/4", vurus: 3 }, { id: "4/4", vurus: 4 },
  { id: "6/8", vurus: 6 }, { id: "5/8", vurus: 5 }, { id: "7/8", vurus: 7 }, { id: "9/8", vurus: 9 },
];
export const RITIM_DESENLERI = [
  { ad: "Dörtlükler", desen: "1 1 1 1 | 1 1 1 1", olcu: "4/4", seviye: 1 },
  { ad: "İkilik ve dörtlük", desen: "2 2 | 1 1 2 | 2 1 1 | 4", olcu: "4/4", seviye: 1 },
  { ad: "Esli dörtlükler", desen: "1 -1 1 -1 | 1 1 -1 1", olcu: "4/4", seviye: 2 },
  { ad: "Sekizlikler", desen: ".5 .5 1 .5 .5 1 | .5 .5 .5 .5 2", olcu: "4/4", seviye: 2 },
  { ad: "Noktalı dörtlük", desen: "1.5 .5 1 1 | 1.5 .5 2", olcu: "4/4", seviye: 3 },
  { ad: "Halay adımı", desen: ".5 .5 1 | .5 .5 1 | 1 .5 .5 | 2", olcu: "2/4", seviye: 3 },
  { ad: "Aksak 7/8", desen: "1 1 1.5 | 1 1 1.5", olcu: "7/8", seviye: 4 },
];
// Vuruş lambaları: x/8'de gruplar (2+2+3) arasında boşluk, grup başı vurgulu
function lambalar(olcuId, vurus) {
  const k = h("div", { class: "lambalar", "aria-hidden": "true" });
  const gr = OLCU_GRUPLARI[olcuId];
  const gruplar = gr ? gr : [vurus];
  let n = 0; const tum = [];
  gruplar.forEach((g) => { const grup = h("span", { class: "grup" }); for (let i = 0; i < g; i++) { const l = h("i", { class: i === 0 ? "vurgu" : "" }); grup.append(l); tum.push(l); n++; } k.append(grup); });
  if (!gr && vurus > 1) { tum.forEach((l, i) => l.classList.toggle("vurgu", i === 0)); }
  k.yak = (i) => tum.forEach((l, j) => l.classList.toggle("on", j === i % tum.length));
  k.sondur = () => tum.forEach((l) => l.classList.remove("on"));
  return k;
}

export function ritimEkrani(kok) {
  const temizlik = [];
  saymaYukle();
  kok.append(ustCubuk({ ustYazi: "Metronom ve ritim testi", baslik: "Ritim", sag: nasil("Ritim nasıl çalışılır",
    h("p", null, "Metronom: tempoyu seç, ölçüyü seç, Başlat. \"Sesli say\" açıkken sayıları Türkçe söylerim. Aksak usullerde (5/8, 7/8, 9/8) vurgu grup başlarına düşer."),
    h("p", { style: "margin:0" }, "Ritim testi: bir desen seç, önce dinle, sonra sayımdan sonra herhangi bir notada çal. Her notanın başlangıcını dinleyip zamanında mı, erken mi, geç mi olduğunu gösteririm. Kulaklıkla ölçüm daha temizdir.")) }));
  const panel = h("div", { class: "yigin" });
  kok.append(segment([["metronom", "Metronom"], ["test", "Ritim testi"]], ayar("ritimSekme") || "metronom", (d) => { ayarla("ritimSekme", d); ciz(d); }), panel);
  let kapatPanel = null;
  function ciz(d) { if (kapatPanel) kapatPanel(); panel.replaceChildren(); kapatPanel = d === "test" ? testPaneli(panel) : metronomPaneli(panel); }
  ciz(ayar("ritimSekme") || "metronom");
  temizlik.push(() => kapatPanel && kapatPanel());
  return () => temizlik.forEach((f) => f());
}

function metronomPaneli(panel) {
  let met = null;
  const bpm = { deger: +(ayar("bpm") || 70) };
  let olcu = OLCULER.find((o) => o.id === (ayar("olcu") || "4/4")) || OLCULER[2];
  const bpmEl = h("div", { class: "bpm-buyuk", "aria-live": "polite" });
  const kaydir = h("input", { type: "range", min: "30", max: "200", value: String(bpm.deger), "aria-label": "Tempo" });
  let lamba = lambalar(olcu.id, olcu.vurus);
  const lambaYer = h("div", null, lamba);
  const sesliB = h("button", { class: "ikincil", "aria-pressed": ayar("sesliSayma") ? "true" : "false" }, "Sesli say");
  const tapB = h("button", { class: "ikincil" }, "Tempoyu vur");
  function bpmYaz() { bpmEl.replaceChildren(String(bpm.deger), h("small", null, "vuruş / dk")); kaydir.value = String(bpm.deger); ayarla("bpm", bpm.deger); if (met) met.ayarla(bpm.deger); }
  function degistir(d) { bpm.deger = Math.max(30, Math.min(200, bpm.deger + d)); bpmYaz(); }
  // basılı tutunca hızlanır (uzun basış)
  function tutucu(d) {
    const b = h("button", { type: "button", "aria-label": d > 0 ? "Tempoyu artır" : "Tempoyu azalt" }, d > 0 ? "+" : "−");
    let z1 = 0, z2 = 0;
    const birak = () => { clearTimeout(z1); clearInterval(z2); };
    b.addEventListener("pointerdown", () => { degistir(d); z1 = setTimeout(() => { z2 = setInterval(() => degistir(d * 5), 160); }, 450); });
    ["pointerup", "pointerleave", "pointercancel"].forEach((e) => b.addEventListener(e, birak));
    return b;
  }
  kaydir.addEventListener("input", () => { bpm.deger = +kaydir.value; bpmYaz(); });
  sesliB.addEventListener("click", () => { const v = sesliB.getAttribute("aria-pressed") !== "true"; sesliB.setAttribute("aria-pressed", String(v)); ayarla("sesliSayma", v); if (met) met.sayma = v; });
  let vuruslar = [];
  tapB.addEventListener("click", () => {
    const t = performance.now(); vuruslar = vuruslar.filter((x) => t - x < 3000); vuruslar.push(t);
    if (vuruslar.length >= 3) { const a = (vuruslar[vuruslar.length - 1] - vuruslar[0]) / (vuruslar.length - 1); bpm.deger = Math.round(60000 / a); bpmYaz(); }
  });
  const olcuChip = chipler(OLCULER.map((o) => [o.id, o.id]), olcu.id, (id) => { olcu = OLCULER.find((o) => o.id === id); ayarla("olcu", id); lamba = lambalar(olcu.id, olcu.vurus); lambaYer.replaceChildren(lamba); });

  function baslat() {
    const gr = OLCU_GRUPLARI[olcu.id];
    const vurgular = gr ? gr.reduce((a, g, i) => (a.push(i ? a[i - 1] + gr[i - 1] : 0), a), []) : [0];
    const sahneLamba = lambalar(olcu.id, olcu.vurus);
    const sayi = h("div", { class: "sayim" }, "1");
    const s = sahneAc({ ust: `${bpm.deger} vuruş/dk · ${olcu.id}`, icerik: [sayi, sahneLamba], bitirAdi: "Durdur", bitince: () => { if (met) met.durdur(); met = null; lamba.sondur(); } });
    met = metronom({ bpm: bpm.deger, olcu: olcu.vurus, vurgular, sayma: ayar("sesliSayma"), vurusta: (i) => { lamba.yak(i); sahneLamba.yak(i); sayi.textContent = String((i % olcu.vurus) + 1); } });
  }
  bpmYaz();
  panel.append(
    h("div", { class: "bpm-satir" }, tutucu(-1), bpmEl, tutucu(1)),
    kaydir, lambaYer,
    h("div", { class: "yigin-s" }, h("span", { class: "etiket-yazi" }, "Ölçü"), olcuChip),
    h("div", { class: "satir" }, sesliB, tapB),
    h("button", { class: "birincil genis", onclick: baslat }, ikon("oynat"), "Başlat"));
  return () => { if (met) met.durdur(); };
}

function testPaneli(panel) {
  let secili = +(ayar("ritimDesen") || 0);
  const bpm = +(ayar("bpm") || 70);
  const kagit = h("div", { class: "kagit" });
  const sonucAlan = h("div", { class: "yigin" });
  function desenGoster() { const d = RITIM_DESENLERI[secili]; kagit.replaceChildren(); window.ABCJS.renderAbc(kagit, desenAbc(d.desen, d.olcu), { responsive: "resize", add_classes: true, staffwidth: 500, paddingtop: 0, paddingbottom: 0 }); }
  const desenChip = chipler(RITIM_DESENLERI.map((d, i) => [i, `${d.seviye} · ${d.ad}`]), secili, (i) => { secili = i; ayarla("ritimDesen", i); desenGoster(); sonucAlan.replaceChildren(); });
  const dinleB = h("button", { class: "ikincil" }, ikon("oynat"), "Dinle");
  dinleB.addEventListener("click", () => { const d = RITIM_DESENLERI[secili]; desenCal(d.desen, bpm, "A4", kagit); });
  const testB = h("button", { class: "cal-dugme" }, h("span", { class: "sol" }, ikon("mikrofon"), "Testi başlat"), h("span", { class: "sure" }, `${bpm} vuruş/dk`));
  testB.addEventListener("click", () => mikrofonGerekli(sonucAlan, async () => {
    const d = RITIM_DESENLERI[secili]; const o = OLCULER.find((x) => x.id === d.olcu);
    sonucAlan.replaceChildren(); await saymaYukle();
    const buyuk = h("div", { class: "sayim" }, "");
    const durum = durumEl(); durum.ayarla("bos", "Sayımı dinle");
    const s = sahneAc({ ust: `${d.ad} · ${bpm} vuruş/dk`, icerik: [buyuk, durum], bitirAdi: "Vazgeç" });
    const vurusBirim = d.olcu.endsWith("/8") ? 2 : 1;
    const sonuc = await ritimTesti({ desen: d.desen, bpm, olcuVurus: Math.round(o.vurus / vurusBirim) || 2, olcu: d.olcu, bant: ritimBandi() }, {
      durumda: (x) => { if (x.evre === "sayim") { buyuk.textContent = String(x.vurus); } else { buyuk.textContent = "Çal"; durum.ayarla("bos", "Dinliyorum"); } },
    });
    s.kapat("bitti");
    sonucAlan.append(sonucKutusu(sonuc));
  }));
  panel.append(
    h("div", { class: "yigin-s" }, h("span", { class: "etiket-yazi" }, "Desen"), desenChip),
    h("div", { class: "nota" }, kagit),
    h("div", { class: "satir" }, dinleB),
    testB, sonucAlan);
  desenGoster();
  return () => {};
}

// Değerlendirme kartı (§2.10): önce en iyi, sonra tek düzeltme, sonra ölçümler
export function sonucKutusu(sonuc) {
  const n = sonuc.notlar.length;
  const sinif = sonuc.puan >= 80 ? "iyi" : sonuc.puan >= 55 ? "orta" : "kotu";
  const baslik = sinif === "iyi" ? "Zamanında" : sinif === "orta" ? "Az kaldı" : "Bir daha";
  const ms = Math.round(sonuc.ortalama * 1000);
  const enIyi = sonuc.iyi === n ? "Bütün notalar zamanındaydı." : sonuc.iyi > 0 ? `${sonuc.iyi}/${n} nota tam zamanındaydı.` : "Desenin sonuna kadar çaldın.";
  let duzeltme;
  if (sonuc.kacan) duzeltme = `${sonuc.kacan} notayı duyamadım; her notayı nefesle ("hu") yeniden başlat.`;
  else if (Math.abs(ms) >= 25) duzeltme = ms < 0 ? `Genelde ${-ms} ms erken giriyorsun; vuruşu bekle.` : `Genelde ${ms} ms geç kalıyorsun; sayımı içinden önceden hazırla.`;
  else if (sonuc.sapma >= 0.06) duzeltme = "Vuruşların dalgalı; tempoyu düşürüp tekrar dene.";
  else if (sonuc.fazla) duzeltme = `${sonuc.fazla} fazladan başlangıç duydum; notaları birbirine bağla.`;
  else duzeltme = "Böyle devam; tempoyu biraz artırabilirsin.";
  return h("div", { class: "degerlendirme " + sinif },
    h("div", { class: "baslik" }, sinif === "iyi" ? ikon("onay") : null, `${baslik} · ${sonuc.puan}/100`),
    h("div", { class: "satir-bilgi" }, h("b", null, "En iyi"), h("span", null, enIyi)),
    h("div", { class: "satir-bilgi" }, h("b", null, "Tek düzeltme"), h("span", null, duzeltme)),
    h("div", { class: "olcum" },
      h("div", null, h("b", null, `${sonuc.iyi}/${n}`), h("span", null, "zamanında")),
      h("div", null, h("b", null, `${ms > 0 ? "+" : ""}${ms} ms`), h("span", null, "ortalama")),
      h("div", null, h("b", null, `±${Math.round(sonuc.sapma * 1000)} ms`), h("span", null, "dalgalanma"))),
    h("div", { class: "ritim-sonuc" }, sonucGrafigi(sonuc)));
}

// ---------------- KİTAPLIK ----------------
export function kitaplikEkrani(kok, alt) {
  if (alt === "parmak") return parmakTablosuEkrani(kok);
  if (alt === "kayit") return kayitEkrani(kok);
  if (alt === "ustalar") return ustalarEkrani(kok);
  if (alt === "kaynaklar") return kaynaklarEkrani(kok);
  kok.append(ustCubuk({ ustYazi: "Başvuru ve kayıtlar", baslik: "Kitaplık", sag: ayarDugmesi() }),
    h("div", { class: "liste" },
      listeSatiri({ simge: "el", ad: "Parmak tablosu", alt: "Delikler ve sesler; dokun, dinle", href: "#kitaplik-parmak" }),
      listeSatiri({ simge: "kayit", ad: "Kayıtlarım", alt: "Tarihe göre; haftalar arası kıyasla", href: "#kitaplik-kayit" }),
      listeSatiri({ simge: "nota", ad: "Ustaları dinle", alt: "Gerçek çalışlar: ton, nefes, süsleme", sag: String(USTA_KAYITLARI.length), href: "#kitaplik-ustalar" }),
      listeSatiri({ simge: "kitap", ad: "Kaynaklar ve lisanslar", alt: "Ses kayıtları, yazı tipleri, araştırma", href: "#kitaplik-kaynaklar" })));
}

function parmakTablosuEkrani(kok) {
  kok.append(ustCubuk({ geri: { href: "#kitaplik", ad: "Kitaplık" }, baslik: "Parmak tablosu" }),
    h("p", { class: "soluk kucuk" }, `${calgiAdi()} · dolu delik kapalı, boş delik açık, yarısı dolu delik yarım. Soldaki küçük delik baş parmak deliğidir. Dokun, sesini dinle.`));
  const izgara = h("div", { class: "parmaklar", style: "margin-top:8px" });
  TABLO.forEach((g) => {
    const b = h("button", { class: "parmak", "aria-pressed": "false", "aria-label": notaYazisi(g.nota) + " sesini çal" });
    const kart = parmakKarti(g.nota);
    while (kart.firstChild) b.appendChild(kart.firstChild);
    b.addEventListener("click", () => { izgara.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); notaCal(notaMidi(g.nota) + kaydirma(), 1.4); });
    izgara.append(b);
  });
  kok.append(izgara);
}

// Gerçek düdük kayıtları (açık lisanslı). Atıf her kaydın altında.
const USTA_KAYITLARI = [
  { dosya: "verunka.m4a", baslik: "Verunka · Ermeni ezgisi", aciklama: "Notaların nefesle nasıl bağlandığına ve uzun seslerin yumuşak bitişine kulak ver.",
    atif: "arakedikian, “verunka” (Freesound)", lisans: "CC BY 3.0", lisansUrl: "https://creativecommons.org/licenses/by/3.0/", url: "https://freesound.org/people/arakedikian/sounds/380476/" },
  { dosya: "juskiddink-c-duduk.m4a", baslik: "Do düdük ile çalış", aciklama: "Uzun seslerdeki sabitliği ve hafif vibratoyu dinle.",
    atif: "juskiddink, “Duduk” (Freesound)", lisans: "CC BY 4.0", lisansUrl: "https://creativecommons.org/licenses/by/4.0/", url: "https://freesound.org/people/juskiddink/sounds/180004/" },
  { dosya: "juskiddink-bb-duduk.m4a", baslik: "Si♭ düdük ile kısa çalış", aciklama: "Aynı çalgının farklı akordunda ton nasıl değişiyor?",
    atif: "juskiddink, “Duduk 3” (Freesound)", lisans: "CC BY 4.0", lisansUrl: "https://creativecommons.org/licenses/by/4.0/", url: "https://freesound.org/people/juskiddink/sounds/184267/" },
];
function ustalarEkrani(kok) {
  kok.append(ustCubuk({ geri: { href: "#kitaplik", ad: "Kitaplık" }, baslik: "Ustaları dinle" }),
    h("p", { class: "soluk kucuk" }, "Açık lisanslı gerçek düdük çalışları; balabanla aynı aileden. Her dinleyişte tek şeye odaklan: bugün nefes yerleri, yarın notaların bitişi."),
    h("div", { class: "yigin" }, ...USTA_KAYITLARI.map((k) => h("div", { class: "kart yigin-s" },
      h("h3", null, k.baslik),
      h("p", { class: "soluk kucuk", style: "margin:0" }, k.aciklama),
      h("audio", { controls: true, preload: "none", src: "ses/ustalar/" + k.dosya, style: "width:100%" }),
      h("p", { class: "kucuk soluk", style: "margin:0", html: `<a href="${k.url}" target="_blank" rel="noopener">${k.atif}</a> · <a href="${k.lisansUrl}" target="_blank" rel="noopener">${k.lisans}</a>. Biçim ve ses düzeyi değiştirildi.` })))),
    h("p", { class: "kucuk soluk", style: "margin-top:16px" }, "Daha fazlası: Djivan Gasparyan, Gevorg Dabağyan (düdük); Alihan Samedov, Şirzad Fətəliyev (balaban)."));
}

function kaynaklarEkrani(kok) {
  kok.append(ustCubuk({ geri: { href: "#kitaplik", ad: "Kitaplık" }, baslik: "Kaynaklar ve lisanslar" }),
    h("div", { class: "kart kucuk", html:
      "<p><b>Düdük sesleri:</b> arakedikian, “escala1” ve “escala3” (Freesound), <a href=\"https://creativecommons.org/licenses/by/3.0/\" target=\"_blank\" rel=\"noopener\">CC BY 3.0</a>. Notalar kesildi, seviyesi eşitlendi, döngü eklendi; çalarken perdesi ayarlanır.</p>" +
      "<p><b>Ustaları dinle:</b> arakedikian “verunka” (CC BY 3.0); juskiddink “Duduk” ve “Duduk 3” (CC BY 4.0), Freesound. Biçim ve ses düzeyi değiştirildi.</p>" +
      "<p><b>Yazı tipleri:</b> Bricolage Grotesque, Instrument Sans, IBM Plex Mono — SIL Open Font License.</p>" +
      "<p><b>Nota çizimi:</b> abcjs (MIT lisansı). <b>Sayma sesi:</b> macOS Türkçe ses sentezi.</p>" +
      "<p style=\"margin:0\"><b>Parmak tablosu ve ilk ses sırası:</b> Eren, Z. (2020). Balaban Çalgısı İçin Bir Etüt Önerisi. <i>idil</i>, 9(67), 450–470.</p>" }));
}

// ---------------- AYARLAR ----------------
function ayarSatiri(ad, alt, sag, href) {
  return h(href ? "a" : "div", { class: "ayar-satir", href }, h("span", null, h("div", { class: "ad" }, ad), alt ? h("div", { class: "alt" }, alt) : null), sag);
}
function anahtar(acik, degisince, etiket) {
  const b = h("button", { class: "anahtar", role: "switch", "aria-checked": String(!!acik), "aria-label": etiket, type: "button" });
  b.addEventListener("click", () => { const v = b.getAttribute("aria-checked") !== "true"; b.setAttribute("aria-checked", String(v)); degisince(v); });
  return b;
}

export function ayarlarEkrani(kok) {
  const turS = h("select", { "aria-label": "Çalgı türü" }, Object.entries(CALGILAR).map(([k, v]) => h("option", { value: k }, v.ad)));
  turS.value = calgiTuru();
  turS.addEventListener("change", () => { ayarla("calgi", turS.value); ayarla("kaydirma", null); location.reload(); });
  const kaymaS = h("select", { "aria-label": "Akort" }, Array.from({ length: 15 }, (_, i) => i - 19).map((k) => h("option", { value: String(k) }, `${notaYazisi(69 + k, { oktav: true })} (duyulan)`)));
  kaymaS.value = String(kaydirma());
  kaymaS.addEventListener("change", () => { ayarla("kaydirma", +kaymaS.value); ayarla("kaydirmaTahmini", false); });
  const gecikmeEl = h("span", { class: "mono" }, `${Math.round(mik.durum.gecikme * 1000)} ms`);
  const olcAlan = h("div");
  const olcB = h("button", { class: "ikincil dugme-kucuk" }, "Ölç");
  olcB.addEventListener("click", () => mikrofonGerekli(olcAlan, async () => {
    olcB.disabled = true; await saymaYukle();
    const r = await gecikmeOlc(() => {});
    olcB.disabled = false;
    olcAlan.replaceChildren(h("p", { class: "kucuk soluk", style: "margin:8px 0" }, r.tamam ? "Kaydedildi." : "Yeterli nota duyamadım. Tıklarla birlikte kısa, net notalar çal."));
    gecikmeEl.textContent = `${Math.round(mik.durum.gecikme * 1000)} ms`;
  }));
  const sesS = h("select", { "aria-label": "Örnek ses" }, h("option", { value: "kayit" }, "Gerçek kayıt"), h("option", { value: "model" }, "Fiziksel model"), h("option", { value: "basit" }, "Basit sentez"));
  sesS.value = sesMotoru();
  sesS.addEventListener("change", () => sesMotoruAyarla(sesS.value));
  const sesDinle = h("button", { class: "ikincil dugme-kucuk", "aria-label": "Örnek sesi dinle" }, ikon("oynat"));
  sesDinle.addEventListener("click", () => {
    const k = kaydirma(); let t = 0;
    const notalar = [["F5", 0.5], ["G5", 0.5], ["A5", 0.9], ["G5", 0.45], ["F5", 0.45], ["E5", 0.6], ["F5", 1.8]].map(([n, d]) => { const x = { midi: notaMidi(n) + k, bas: t, sure: d - 0.012 }; t += d; return x; });
    ornekYuklendi().then(() => diziCal(notalar, { motor: sesS.value }));
  });
  const haftaS = h("select", { "aria-label": "Haftalık hedef" }, [3, 4, 5, 6].map((n) => h("option", { value: String(n) }, `${n} gün`)));
  haftaS.value = String(ayar("haftaHedef") || 5);
  haftaS.addEventListener("change", () => ayarla("haftaHedef", +haftaS.value));
  const tema = segment([["sistem", "Sistem"], ["acik", "Açık"], ["koyu", "Koyu"]], ayar("tema") || "sistem", (d) => { ayarla("tema", d); gorunumUygula(); });
  const onay = h("div", { class: "satir", hidden: true, style: "padding:12px 0" }, h("span", { class: "kucuk" }, "Emin misin? Geri alınamaz."),
    h("button", { class: "tehlikeli dugme-kucuk", onclick: () => { hepsiniSifirla(); location.hash = "#bugun"; location.reload(); } }, "Evet, sil"),
    h("button", { class: "ikincil dugme-kucuk", onclick: () => { onay.hidden = true; } }, "Vazgeç"));

  kok.append(ustCubuk({ geri: { href: "#bugun", ad: "Geri" }, baslik: "Ayarlar" }),
    h("div", { class: "bolum-baslik" }, "Çalgı"),
    h("div", { class: "ayar-grup" },
      ayarSatiri(`Çalgın: ${calgiAdi()}`, ayar("tanitildi") ? "Ölçülmüş" : ayar("kaydirmaTahmini") ? "İlk sesinden tahmin edildi" : "Henüz ölçülmedi", h("span", { class: "metin-dugme" }, "Yeniden ölç", ikon("ileri")), "#tanit"),
      ayarSatiri("Çalgı türü", null, turS),
      ayarSatiri("Akort (elle)", "Bütün delikler kapalıyken çıkan ses", kaymaS)),
    h("div", { class: "bolum-baslik" }, "Dinleme"),
    h("div", { class: "ayar-grup" },
      ayarSatiri("Mikrofon gecikmesi", "Kulaklık ya da hoparlör değişince yeniden ölç", h("span", { class: "satir" }, gecikmeEl, olcB)),
      olcAlan,
      ayarSatiri("Örnek ses", "Dersler ve dem için", h("span", { class: "satir" }, sesS, sesDinle))),
    h("div", { class: "bolum-baslik" }, "Görünüm"),
    h("div", { class: "ayar-grup" },
      h("div", { class: "ayar-satir" }, h("span", { class: "ad" }, "Tema"), h("div", { style: "min-width:14rem" }, tema)),
      ayarSatiri("Büyük yazı", "Bütün yazılar %12 büyür", anahtar(ayar("yaziBuyuk"), (v) => { ayarla("yaziBuyuk", v); gorunumUygula(); }, "Büyük yazı"))),
    h("div", { class: "bolum-baslik" }, "Çalışma"),
    h("div", { class: "ayar-grup" },
      ayarSatiri("Haftalık hedef", null, haftaS),
      ayarSatiri("Deneme modu", "Bütün dersler açık, ilerleme kuralları kapalı", anahtar(ayar("denemeModu"), (v) => ayarla("denemeModu", v), "Deneme modu")),
      ayarSatiri("Kaynaklar ve lisanslar", null, ikon("ileri"), "#kitaplik-kaynaklar")),
    h("div", { class: "ayar-grup", style: "margin-top:18px" },
      h("button", { class: "metin-dugme", style: "color:var(--kotu)", onclick: () => { onay.hidden = false; } }, "Tüm ilerlemeyi sil"), onay));
}
