// Ekranlar: Akort, Ritim, Araçlar. (Bugün ve Dersler ders-ekranlari.js içinde.)
import * as mik from "./mikrofon.js";
import { ac, metronom, saymaYukle, demBaslat, demDurdur, demAcik, notaCal, diziCal, sesMotoru, sesMotoruAyarla, modelYuklendi } from "./ses.js";
import { notaMidi } from "./perde.js";
import { h, mikrofonGerekli, calismaSuresiTut, kaydirma, notaYazisi, calgiAdi, calgiTuru } from "./ortak.js";
import { tanitEkrani } from "./tanit.js";
import { CALGILAR } from "./parmak-tablosu.js";
import { AkortGostergesi } from "./akort-gosterge.js";
import { ritimTesti, desenAbc, sonucGrafigi, sonucYazisi, desenCal, gecikmeOlc } from "./ritim.js";
import { parmakKarti } from "./parmak.js";
import { TABLO } from "./parmak-tablosu.js";
import { ayar, ayarla, sifirla as hepsiniSifirla } from "./depo.js";
import { kayitEkrani } from "./kayit.js";
import { ritimBandi } from "./ilerleme.js";

// ---------------- AKORT ----------------
export function akortEkrani(kok) {
  const temizlik = [];
  kok.append(
    h("div", { class: "yigin" },
      h("div", null, h("div", { class: "ust-yazi" }, calgiAdi()), h("h1", null, "Akort")),
      h("p", { class: "soluk" }, "Çaldığın sesi dinler, hangi nota olduğunu ve ne kadar pes ya da tiz kaldığını gösterir. İstersen bir hedef nota seç; o zaman sana hedefe göre yol gösterir."),
    ),
  );
  const alan = h("div", { class: "yigin", style: "margin-top:14px" });
  kok.append(alan);

  const hedefS = h("select", { id: "akort-hedef", "aria-label": "Hedef nota" }, h("option", { value: "" }, "Serbest (en yakın nota)"),
    TABLO.map((g) => h("option", { value: g.nota }, notaYazisi(g.nota) + (g.etiket ? ` (${g.etiket})` : ""))));
  const tolS = h("select", { id: "akort-tol", "aria-label": "Hassasiyet" },
    h("option", { value: "25" }, "Başlangıç ±25 cent"), h("option", { value: "15" }, "Orta ±15 cent"), h("option", { value: "8" }, "İleri ±8 cent"));
  tolS.value = ayar("akortTol") || "15";
  const dinleB = h("button", { class: "ikincil" }, "Hedefi dinle");
  const demB = h("button", { class: "ikincil", "aria-pressed": demAcik() ? "true" : "false" }, "Dem");

  mikrofonGerekli(alan, () => {
    const g = new AkortGostergesi({ tolerans: +tolS.value });
    g.baslat(); temizlik.push(() => g.durdur(), calismaSuresiTut());
    hedefS.addEventListener("change", () => g.hedefAyarla(hedefS.value ? notaMidi(hedefS.value) : null));
    tolS.addEventListener("change", () => { g.s.tolerans = +tolS.value; ayarla("akortTol", tolS.value); });
    alan.append(g.kok);
  });
  dinleB.addEventListener("click", () => { if (hedefS.value) notaCal(notaMidi(hedefS.value) + kaydirma(), 1.5); });
  demB.addEventListener("click", () => {
    if (demAcik()) { demDurdur(); demB.setAttribute("aria-pressed", "false"); }
    else { demBaslat(notaMidi("A4") + kaydirma()); /* dem: bütün delikler kapalı sesi */ demB.setAttribute("aria-pressed", "true"); }
  });
  kok.append(h("div", { class: "yigin kart", style: "margin-top:16px" },
    h("div", { class: "satir" }, h("label", { class: "ara" }, h("div", { class: "kucuk soluk" }, "Hedef"), hedefS), h("label", null, h("div", { class: "kucuk soluk" }, "Hassasiyet"), tolS)),
    h("div", { class: "satir" }, dinleB, demB),
    h("p", { class: "kucuk soluk" }, "Dem, karar sesini (bütün delikler kapalı La) sürekli çalar. Uzun ses çalışırken kulağını demle birleştirmeye çalış; iki ses tam oturunca titreşim (vuru) kaybolur."),
  ));
  return () => temizlik.forEach((f) => f());
}

// ---------------- RİTİM ----------------
const OLCULER = [
  { id: "2/4", vurus: 2, ad: "2/4" }, { id: "3/4", vurus: 3, ad: "3/4" }, { id: "4/4", vurus: 4, ad: "4/4" },
  { id: "6/8", vurus: 6, ad: "6/8 (3+3)" }, { id: "5/8", vurus: 5, ad: "5/8 aksak (2+3)" }, { id: "7/8", vurus: 7, ad: "7/8 aksak (2+2+3)" }, { id: "9/8", vurus: 9, ad: "9/8 aksak (2+2+2+3)" },
];
export const RITIM_DESENLERI = [
  { ad: "Dörtlükler", desen: "1 1 1 1 | 1 1 1 1", olcu: "4/4", seviye: 1 },
  { ad: "İkilik ve dörtlük", desen: "2 2 | 1 1 2 | 2 1 1 | 4", olcu: "4/4", seviye: 1 },
  { ad: "Esli dörtlükler", desen: "1 -1 1 -1 | 1 1 -1 1", olcu: "4/4", seviye: 2 },
  { ad: "Sekizlikler", desen: ".5 .5 1 .5 .5 1 | .5 .5 .5 .5 2", olcu: "4/4", seviye: 2 },
  { ad: "Noktalı dörtlük", desen: "1.5 .5 1 1 | 1.5 .5 2", olcu: "4/4", seviye: 3 },
  { ad: "Halay adımı (2/4)", desen: ".5 .5 1 | .5 .5 1 | 1 .5 .5 | 2", olcu: "2/4", seviye: 3 },
  { ad: "Aksak 7/8 (2+2+3)", desen: "1 1 1.5 | 1 1 1.5", olcu: "7/8", seviye: 4 },
];

export function ritimEkrani(kok) {
  const temizlik = [];
  saymaYukle();
  let met = null;
  const bpm = { deger: +(ayar("bpm") || 70) };
  const olcuS = h("select", { id: "ritim-olcu", "aria-label": "Ölçü" }, OLCULER.map((o) => h("option", { value: o.id }, o.ad)));
  olcuS.value = ayar("olcu") || "4/4";
  const bpmEl = h("div", { class: "bpm-buyuk", "aria-live": "polite" });
  const kaydir = h("input", { type: "range", min: "30", max: "200", value: String(bpm.deger), "aria-label": "Tempo", id: "ritim-bpm", style: "width:100%" });
  const noktalar = h("div", { class: "vurus-noktalari", "aria-hidden": "true" });
  const sesliB = h("button", { class: "ikincil", "aria-pressed": ayar("sesliSayma") ? "true" : "false" }, "Sesli say");
  const basB = h("button", { class: "vurgu genis" }, "Başlat");
  const tapB = h("button", { class: "ikincil" }, "Tempoyu vur");
  function olcuBilgi() { return OLCULER.find((o) => o.id === olcuS.value); }
  function noktaCiz() {
    const o = olcuBilgi(); noktalar.replaceChildren();
    const gruplar = { "5/8": [0, 2], "7/8": [0, 2, 4], "9/8": [0, 2, 4, 6], "6/8": [0, 3] }[o.id] || [0];
    for (let i = 0; i < o.vurus; i++) noktalar.append(h("i", { class: gruplar.includes(i) ? "vurgu" : "" }));
  }
  function bpmYaz() { bpmEl.replaceChildren(String(bpm.deger), h("small", null, " vuruş/dk")); kaydir.value = String(bpm.deger); ayarla("bpm", bpm.deger); if (met) met.ayarla(bpm.deger); }
  const artir = (d) => () => { bpm.deger = Math.max(30, Math.min(200, bpm.deger + d)); bpmYaz(); };
  kaydir.addEventListener("input", () => { bpm.deger = +kaydir.value; bpmYaz(); });
  olcuS.addEventListener("change", () => { ayarla("olcu", olcuS.value); noktaCiz(); if (met) { met.durdur(); met = null; baslat(); } });
  sesliB.addEventListener("click", () => { const v = sesliB.getAttribute("aria-pressed") !== "true"; sesliB.setAttribute("aria-pressed", String(v)); ayarla("sesliSayma", v); if (met) met.sayma = v; });
  function baslat() {
    const o = olcuBilgi();
    const vurgular = { "5/8": [0, 2], "7/8": [0, 2, 4], "9/8": [0, 2, 4, 6], "6/8": [0, 3] }[o.id];
    met = metronom({ bpm: bpm.deger, olcu: o.vurus, vurgular, sayma: ayar("sesliSayma"), vurusta: (i) => {
      const ns = noktalar.children; for (const n of ns) n.classList.remove("on");
      if (ns[i % o.vurus]) ns[i % o.vurus].classList.add("on");
    } });
    basB.textContent = "Durdur";
  }
  basB.addEventListener("click", () => { if (met) { met.durdur(); met = null; basB.textContent = "Başlat"; for (const n of noktalar.children) n.classList.remove("on"); } else baslat(); });
  let vuruslar = [];
  tapB.addEventListener("click", () => {
    const t = performance.now(); vuruslar = vuruslar.filter((x) => t - x < 3000); vuruslar.push(t);
    if (vuruslar.length >= 3) { const aralik = (vuruslar[vuruslar.length - 1] - vuruslar[0]) / (vuruslar.length - 1); bpm.deger = Math.round(60000 / aralik); bpmYaz(); }
  });
  temizlik.push(() => met && met.durdur());
  noktaCiz(); bpmYaz();

  kok.append(h("div", { class: "yigin" },
    h("div", null, h("div", { class: "ust-yazi" }, "Metronom ve ritim testi"), h("h1", null, "Ritim")),
    h("div", { class: "kart yigin" },
      bpmEl, noktalar, kaydir,
      h("div", { class: "satir", style: "justify-content:center" }, h("button", { class: "ikincil", onclick: artir(-5) }, "−5"), h("button", { class: "ikincil", onclick: artir(-1) }, "−1"), h("button", { class: "ikincil", onclick: artir(1) }, "+1"), h("button", { class: "ikincil", onclick: artir(5) }, "+5")),
      h("div", { class: "satir" }, olcuS, sesliB, tapB),
      basB,
    ),
  ));

  // Ritim testi
  const testAlan = h("div", { class: "yigin", style: "margin-top:22px" });
  kok.append(testAlan);
  testAlan.append(h("h2", null, "Ritim testi"), h("p", { class: "soluk" }, "Bir desen seç. Önce dinle, sonra sayımdan sonra herhangi bir notada çal. Her notanın başlangıcını dinleyip zamanında mı, erken mi, geç mi olduğunu gösteririm. Hoparlör yerine kulaklık kullanırsan ölçüm daha temiz olur."));
  const desenS = h("select", { id: "ritim-desen", "aria-label": "Desen" }, RITIM_DESENLERI.map((d, i) => h("option", { value: String(i) }, `${d.seviye}. seviye · ${d.ad}`)));
  const desenNota = h("div");
  const sonucAlan = h("div", { class: "yigin" });
  function desenGoster() { const d = RITIM_DESENLERI[+desenS.value]; desenNota.replaceChildren(); window.ABCJS.renderAbc(desenNota, desenAbc(d.desen, d.olcu), { responsive: "resize", staffwidth: 500, paddingtop: 0, paddingbottom: 0 }); }
  desenS.addEventListener("change", desenGoster);
  const dinleB = h("button", { class: "ikincil" }, "▶︎ Dinle");
  const testB = h("button", { class: "vurgu" }, "Testi başlat");
  const durumEl = h("div", { class: "kucuk soluk", "aria-live": "polite" });
  dinleB.addEventListener("click", () => { const d = RITIM_DESENLERI[+desenS.value]; desenCal(d.desen, bpm.deger); });
  testB.addEventListener("click", () => {
    mikrofonGerekli(sonucAlan, async () => {
      if (met) { met.durdur(); met = null; basB.textContent = "Başlat"; }
      const d = RITIM_DESENLERI[+desenS.value]; const o = OLCULER.find((x) => x.id === d.olcu);
      testB.disabled = true; sonucAlan.replaceChildren();
      await saymaYukle();
      const vurusBirim = d.olcu.endsWith("/8") ? 2 : 1; // x/8 ölçülerde dörtlük = 2 sekizlik
      const sonuc = await ritimTesti({ desen: d.desen, bpm: bpm.deger, olcuVurus: Math.round(o.vurus / vurusBirim) || 2, olcu: d.olcu, bant: ritimBandi() }, {
        durumda: (s) => { durumEl.textContent = s.evre === "sayim" ? `Sayım: ${s.vurus}` : `Çal! (${s.vurus})`; },
      });
      testB.disabled = false; durumEl.textContent = "";
      sonucAlan.append(sonucKutusu(sonuc));
    });
  });
  testAlan.append(h("div", { class: "kart yigin" }, desenS, desenNota, h("div", { class: "satir" }, dinleB, testB), durumEl), sonucAlan);
  desenGoster();
  return () => temizlik.forEach((f) => f());
}

export function sonucKutusu(sonuc) {
  const sinif = sonuc.puan >= 80 ? "iyi" : sonuc.puan >= 55 ? "orta" : "kotu";
  return h("div", { class: "degerlendirme " + sinif },
    h("div", { class: "baslik" }, `${sonuc.puan}/100`),
    h("div", { class: "olcum" },
      h("div", null, h("b", null, `${sonuc.iyi}`), h("span", null, "tam zamanında")),
      h("div", null, h("b", null, `${sonuc.orta}`), h("span", null, "az kaydı")),
      h("div", null, h("b", null, `${sonuc.kacan}`), h("span", null, "kaçan")),
      h("div", null, h("b", null, `${Math.round(sonuc.ortalama * 1000)} ms`), h("span", null, "ortalama sapma")),
    ),
    h("div", { class: "ritim-sonuc" }, sonucGrafigi(sonuc)),
    h("p", null, sonucYazisi(sonuc)),
  );
}

// ---------------- ARAÇLAR ----------------
export function araclarEkrani(kok, alt) {
  if (alt === "parmak") return parmakTablosuEkrani(kok);
  if (alt === "kayit") return kayitEkrani(kok);
  if (alt === "ayarlar") return ayarlarEkrani(kok);
  if (alt === "tanit") return tanitEkrani(kok);
  kok.append(h("div", { class: "yigin" },
    h("div", null, h("div", { class: "ust-yazi" }, "Yardımcılar"), h("h1", null, "Araçlar")),
    h("a", { class: "kart", href: "#araclar-parmak" }, h("h3", null, "Parmak tablosu"), h("p", { class: "soluk", style: "margin:0" }, "Her notanın hangi deliklerle çalındığı. Dokun, sesini dinle.")),
    h("a", { class: "kart", href: "#araclar-kayit" }, h("h3", null, "Kendini kaydet"), h("p", { class: "soluk", style: "margin:0" }, "Çal, kaydet, dinle. Hocanın yokluğunda en güçlü geri bildirim kendi kulağın.")),
    h("a", { class: "kart", href: "#akort" }, h("h3", null, "Dem ve akort"), h("p", { class: "soluk", style: "margin:0" }, "Sürekli eşlik sesiyle uzun ses ve perde çalışması.")),
    h("a", { class: "kart", href: "#araclar-ayarlar" }, h("h3", null, "Ayarlar"), h("p", { class: "soluk", style: "margin:0" }, `Çalgın (${calgiAdi()}), mikrofon gecikmesi, sıfırlama.`)),
  ));
}

function parmakTablosuEkrani(kok) {
  kok.append(h("div", { class: "yigin" },
    h("a", { href: "#araclar", class: "kucuk" }, "‹ Araçlar"),
    h("div", null, h("div", { class: "ust-yazi" }, calgiAdi()), h("h1", null, "Parmak tablosu")),
    h("p", { class: "soluk" }, "Siyah delik kapalı, beyaz delik açık, yarısı siyah delik yarım kapalı. Soldaki küçük delik arkadaki baş parmak deliğidir. Bir notaya dokunursan sesini duyarsın."),
  ));
  const izgara = h("div", { class: "parmaklar", style: "margin-top:12px" });
  TABLO.forEach((g) => {
    const b = h("button", { class: "parmak", "aria-pressed": "false", "aria-label": notaYazisi(g.nota) + " sesini çal" });
    const kart = parmakKarti(g.nota);
    while (kart.firstChild) b.appendChild(kart.firstChild);
    b.addEventListener("click", () => { izgara.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); notaCal(notaMidi(g.nota) + kaydirma(), 1.4); });
    izgara.append(b);
  });
  kok.append(izgara);
}

function ayarlarEkrani(kok) {
  const turS = h("select", { id: "ayar-calgi" }, Object.entries(CALGILAR).map(([k, v]) => h("option", { value: k }, v.ad)));
  turS.value = calgiTuru();
  turS.addEventListener("change", () => { ayarla("calgi", turS.value); ayarla("kaydirma", null); location.reload(); });
  const kaymaS = h("select", { id: "ayar-kayma" }, Array.from({ length: 15 }, (_, i) => i - 21).map((k) => h("option", { value: String(k) }, `Bütün delikler kapalı: ${notaYazisi(69 + k, { oktav: true })} (duyulan)`)));
  kaymaS.value = String(kaydirma());
  kaymaS.addEventListener("change", () => { ayarla("kaydirma", +kaymaS.value); });
  const gecikmeEl = h("b", null, `${Math.round(mik.durum.gecikme * 1000)} ms`);
  const olcB = h("button", { class: "ikincil" }, "Gecikmeyi ölç");
  const olcDurum = h("p", { class: "kucuk soluk", "aria-live": "polite" });
  const alan = h("div");
  olcB.addEventListener("click", () => mikrofonGerekli(alan, async () => {
    olcB.disabled = true; await saymaYukle();
    const r = await gecikmeOlc((s) => (olcDurum.textContent = s.evre === "sayim" ? `Sayım ${s.vurus}…` : "Her tıkla birlikte kısa bir nota çal"));
    olcB.disabled = false;
    olcDurum.textContent = r.tamam ? "Kaydedildi." : "Yeterli nota duyamadım. Tıklarla birlikte kısa ve net notalar çalarak tekrar dene.";
    gecikmeEl.textContent = `${Math.round(mik.durum.gecikme * 1000)} ms`;
  }));
  const sifirB = h("button", { class: "ikincil", style: "color:var(--warn)" }, "Tüm ilerlemeyi sil");
  const onay = h("div", { class: "satir", hidden: true }, h("span", { class: "kucuk" }, "Emin misin? Bu geri alınamaz."),
    h("button", { class: "vurgu", onclick: () => { hepsiniSifirla(); location.hash = "#bugun"; location.reload(); } }, "Evet, sil"),
    h("button", { class: "ikincil", onclick: () => { onay.hidden = true; } }, "Vazgeç"));
  sifirB.addEventListener("click", () => { onay.hidden = false; });

  kok.append(h("div", { class: "yigin" },
    h("a", { href: "#araclar", class: "kucuk" }, "‹ Araçlar"),
    h("h1", null, "Ayarlar"),
    h("div", { class: "kart yigin" }, h("h3", null, `Çalgın: ${calgiAdi()}`),
      h("p", { class: "soluk kucuk" }, "Dersler yazılı nota adlarıyla ilerler (bütün delikler kapalı = La). Çalgının akordu farklıysa parmak adları aynı kalır; ben duyduğum sesi ona göre çeviririm. En kolayı: çalgını bana dinlet."),
      h("a", { class: "dugme vurgu", href: "#araclar-tanit" }, "Çalgını tanıt (ölç)"),
      h("label", null, h("div", { class: "kucuk soluk" }, "Çalgı türü"), turS),
      h("label", null, h("div", { class: "kucuk soluk" }, "Ya da akordu elle seç"), kaymaS)),
    h("div", { class: "kart yigin" }, h("h3", null, "Mikrofon gecikmesi"),
      h("p", { class: "soluk kucuk" }, "Ritim testlerinin adil olması için cihazının ses gecikmesini ölçerim. Kulaklık ya da hoparlör değiştirirsen yeniden ölç."),
      h("div", { class: "satir" }, h("span", null, "Şu anki: "), gecikmeEl, olcB), olcDurum, alan),
    sesKarti(),
    h("div", { class: "kart yigin" }, h("h3", null, "Deneme modu"),
      h("p", { class: "soluk kucuk" }, "Uygulamayı hızlıca gezmek için: bütün dersler açılır, \"Şimdilik atla\" ile sonraki derse geçebilirsin. Gerçek çalışmada kapalı tut; ilerleme kuralları (ertesi gün açılma, 3 gün ustalık) öğrenmeyi kalıcı yapar."),
      (() => { const b = h("button", { class: "ikincil", "aria-pressed": ayar("denemeModu") ? "true" : "false" }, ayar("denemeModu") ? "Açık — kapat" : "Kapalı — aç");
        b.addEventListener("click", () => { const v = !ayar("denemeModu"); ayarla("denemeModu", v); b.setAttribute("aria-pressed", String(v)); b.textContent = v ? "Açık — kapat" : "Kapalı — aç"; });
        return b; })()),
    h("div", { class: "kart yigin" }, h("h3", null, "Sıfırla"), h("p", { class: "soluk kucuk" }, "Ders ilerlemen ve çalışma süren bu cihazda saklanır."), sifirB, onay),
  ));
}

// Örnek ses: fiziksel model ile eski basit sentezi aynı ezgiyle karşılaştır
function sesKarti() {
  const k = kaydirma();
  // Fa–Sol–La–Sol–Fa–Mi–Fa, son nota uzun (yazılı; çalgının akordunda duyulur)
  const ezgi = [["F5", 0.5], ["G5", 0.5], ["A5", 0.9], ["G5", 0.45], ["F5", 0.45], ["E5", 0.6], ["F5", 1.8]];
  function cal(motor) {
    let t = 0;
    const notalar = ezgi.map(([n, d]) => { const x = { midi: notaMidi(n) + k, bas: t, sure: d - 0.012 }; t += d; return x; });
    modelYuklendi().then(() => diziCal(notalar, { motor }));
  }
  const secim = h("select", { id: "ayar-ses" }, h("option", { value: "model" }, "Fiziksel model (önerilen)"), h("option", { value: "basit" }, "Basit sentez (eski)"));
  secim.value = sesMotoru();
  secim.addEventListener("change", () => sesMotoruAyarla(secim.value));
  return h("div", { class: "kart yigin" }, h("h3", null, "Örnek ses"),
    h("p", { class: "soluk kucuk" }, "Derslerdeki örnek sesler ve dem bilgisayarda üretilir. Fiziksel model, kamışın titreşimini ve gövdedeki ses dalgasını hesaplayarak nefesli bir ses verir; ezgilerde notalar tek nefeste bağlanır. Gerçek bir ustanın kaydı değildir."),
    h("div", { class: "satir" }, h("button", { class: "vurgu", onclick: () => cal("model") }, "▶︎ Yeni ses"), h("button", { class: "ikincil", onclick: () => cal("basit") }, "▶︎ Eski ses")),
    h("label", null, h("div", { class: "kucuk soluk" }, "Uygulamada kullanılacak"), secim));
}
