// Bugün, Dersler (ders yolu) ve ders oynatıcı — tasarım sistemi §4.1–4.3.
import { h, calgiAdi } from "./ortak.js";
import { UNITELER, TUM_DERSLER } from "./dersler/index.js";
import { adimCiz, DENETIMLI } from "./ders-motoru.js";
import { depo, bugun, ayar, adimSonucu, dersGecti } from "./depo.js";
import { dersBilgisi, dersAcikMi, erkenAc, tekrarIsle, hafta, ilkAy, kulakPuani, haftaGunSayisi, yukOrani } from "./ilerleme.js";
import { demDurdur } from "./ses.js";
import { ikon, ustCubuk, ayarDugmesi, listeSatiri, altSayfa } from "./arayuz.js";
import { oturumDurumu } from "./oturum.js";

const SESLI = new Set(["uzun-ses", "nota-dizisi", "ritim", "eser", "kulak", "sureli", "kayit"]);

function siradakiDers() {
  for (let i = 0; i < TUM_DERSLER.length; i++) {
    const b = dersBilgisi(TUM_DERSLER[i].id, TUM_DERSLER[i]);
    if (b.durum === "yeni") return { ders: TUM_DERSLER[i], i, acik: dersAcikMi(TUM_DERSLER, i) };
  }
  return null;
}

// ---------------- BUGÜN ----------------
function haftaSeridi() {
  const gunAd = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const simdi = new Date(); const haftaGunu = (simdi.getDay() + 6) % 7;
  const pzt = new Date(simdi); pzt.setDate(simdi.getDate() - haftaGunu);
  const k = h("div", { class: "hafta", role: "list", "aria-label": "Bu haftanın çalışma günleri" });
  let calisilan = 0;
  for (let i = 0; i < 7; i++) {
    const t = new Date(pzt); t.setDate(pzt.getDate() + i);
    const dolu = ((depo().gunler[bugun(t)] || {}).saniye || 0) >= 180;
    if (dolu) calisilan++;
    const n = h("span", { class: "nokta" + (dolu ? " dolu" : "") + (i === haftaGunu ? " bugun" : "") });
    if (dolu) n.append(ikon("onay"));
    k.append(h("div", { class: "gun", role: "listitem", "aria-label": `${gunAd[i]}: ${dolu ? "çalışıldı" : "çalışılmadı"}` }, n, gunAd[i]));
  }
  const dun = new Date(simdi); dun.setDate(simdi.getDate() - 1);
  const dunBos = !(((depo().gunler[bugun(dun)] || {}).saniye || 0) >= 180);
  const bugunBos = !(((depo().gunler[bugun(simdi)] || {}).saniye || 0) >= 180);
  const hedef = ayar("haftaHedef") || 5;
  let yazi = `Bu hafta ${calisilan}/7 gün · hedef ${hedef}.`;
  if (dunBos && bugunBos && Object.keys(depo().gunler).length) yazi += ` Dün ara verdin; bugün ${ilkAy() ? 10 : 12} dakika yeter.`;
  return h("div", { class: "yigin-s" }, k, h("p", { class: "kucuk soluk", style: "margin:4px 0 0" }, yazi));
}

export function bugunEkrani(kok) {
  const tarih = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
  kok.append(ustCubuk({ ustYazi: `${tarih} · ${hafta()}. hafta`, baslik: "Bugün", sag: ayarDugmesi() }));
  const govde = h("div", { class: "yigin" });
  kok.append(govde);
  govde.append(haftaSeridi());

  if (ayar("denemeModu")) govde.append(h("aside", { class: "not dikkat" }, h("span", { class: "etiket" }, "Deneme modu açık"), h("p", null, "Bütün dersler açık, ilerleme kuralları kapalı. Ayarlar'dan kapatabilirsin.")));
  const oran = yukOrani();
  if (oran && oran > 1.2) govde.append(h("aside", { class: "not dikkat" }, h("span", { class: "etiket" }, "Dudakların için"), h("p", null, `Bu hafta geçen haftadan %${Math.round((oran - 1) * 100)} fazla çaldın. Bugün kısa tut; yükü haftada en fazla %20 artırmak yorgunluğu önler.`)));

  // Bugünün oturumu: Isın · Ders · Kaydet
  const s = siradakiDers();
  const tekrarlar = TUM_DERSLER.filter((d) => dersBilgisi(d.id, d).tekrarVakti);
  const od = oturumDurumu();
  let dersAdim;
  if (s && s.acik.acik) dersAdim = { ad: `Ders ${s.ders.sira} · ${s.ders.baslik}`, alt: s.ders.ozet || "", dk: s.ders.sure || 10, href: "#ders-" + s.ders.id };
  else if (tekrarlar.length) dersAdim = { ad: `Tekrar · ${tekrarlar[0].baslik}`, alt: "Kısa kör sınavla tekrar geç", dk: 5, href: "#ders-" + tekrarlar[0].id };
  else if (s) dersAdim = { ad: "Yeni ders yarın açılır", alt: "Bugün öğrendiğini uyku pekiştirir; uzun ses çalış", dk: 5, href: "#akort" };
  else dersAdim = { ad: "Repertuvarını çal", alt: "Bütün dersleri geçtin", dk: 8, href: "#kitaplik" };
  const adimlar = [
    { ad: "Isın", alt: "Dem ile 3 uzun ses (Akort)", dk: 3, href: "#akort", bitti: od.isinma },
    { ...dersAdim, bitti: od.ders },
    { ad: "Kaydet ve dinle", alt: "Yargılamadan, bir kez", dk: 2, href: "#kitaplik-kayit", bitti: od.kayit },
  ];
  const simdiki = adimlar.findIndex((a) => !a.bitti);
  const toplam = adimlar.reduce((t, a) => t + a.dk, 0);
  const kart = h("section", { class: "oturum", "aria-label": "Bugünün oturumu" },
    h("div", { class: "oturum-bas" }, h("span", null, simdiki < 0 ? "Bugünün oturumu tamam" : "Bugünün oturumu"), h("span", { class: "mono" }, `${toplam} dk`)),
    ...adimlar.map((a, i) => h("a", { class: "oturum-adim" + (a.bitti ? " bitti" : i === simdiki ? " simdi" : ""), href: a.href },
      h("span", { class: "no" }, a.bitti ? ikon("onay") : String(i + 1)),
      h("span", null, h("div", { class: "ad" }, a.ad), h("div", { class: "alt" }, a.alt)),
      h("span", { class: "dk" }, `${a.dk} dk`))));
  if (simdiki >= 0) kart.append(h("a", { class: "dugme birincil genis", href: adimlar[simdiki].href }, ikon("oynat"), simdiki === 0 ? "Başla" : "Devam et"));
  else kart.append(h("p", { class: "kucuk", style: "margin:0" }, "Bugünlük yeterli. İstersen ikinci kısa oturumu en az 4 saat sonra yap. Kamışı kurutmayı unutma."));
  if (s && !s.acik.acik && s.acik.neden === "yarin") kart.append(h("button", { class: "metin-dugme", onclick: () => { erkenAc(s.ders.id); location.hash = "#ders-" + s.ders.id; } }, "Yeni dersi yine de şimdi aç"));
  govde.append(kart);

  // İkincil satırlar
  const liste = h("div", { class: "liste" });
  if (!ayar("tanitildi")) liste.append(listeSatiri({ simge: "mikrofon", ad: "Çalgını tanıt", alt: "Akordunu ve türünü iki sesle bulayım", href: "#tanit" }));
  tekrarlar.slice(dersAdim.ad.startsWith("Tekrar") ? 1 : 0, 3).forEach((d) => liste.append(listeSatiri({ simge: "tekrar", ad: `Tekrar · ${d.baslik}`, alt: "Aralıklı tekrar unutmayı önler", sag: `${Math.min(5, d.sure || 5)} dk`, href: "#ders-" + d.id })));
  const kp = kulakPuani();
  liste.append(listeSatiri({ simge: "kayit", ad: kp == null ? "Kulak puanı" : `Kulak puanı %${kp}`, alt: kp == null ? "Kör sınavlarda tahmin ettikçe oluşur" : "Pes mi tiz mi tahminlerinin doğruluğu", href: "#dersler" }));
  liste.append(listeSatiri({ simge: "bilgi", ad: "Nasıl çalışılır?", alt: `Günde 2 kısa oturum · ${calgiAdi()}`, onclick: () => nasilCalisilir() }));
  govde.append(liste);
}

function nasilCalisilir() {
  const dk = ilkAy() ? [2, 3, 5, 1, 1] : [2, 4, 8, 3, 3];
  altSayfa(h("h2", null, "Bir oturum nasıl geçer"),
    h("ol", { class: "kucuk", style: "margin:0;padding-left:1.2rem;display:grid;gap:8px" },
      h("li", null, h("b", null, `Planla (${dk[0]} dk). `), "Bugünkü tek hedefini seç: \"Si'yi sabit tutmak\" gibi."),
      h("li", null, h("b", null, `Isın (${dk[1]} dk). `), "Akort ekranında demi aç, 3 uzun ses çal. Önce kulağınla oturt."),
      h("li", null, h("b", null, `Ders ya da tekrar (${dk[2]} dk). `), "Egzersizleri karışık çalış: A, B, C, sonra yine A, B, C. Zor gelir ama kalıcıdır."),
      h("li", null, h("b", null, `Kaydet (${dk[3]} dk). `), "Çalıştığın ezgiyi bir kez kaydet; yargılamadan."),
      h("li", null, h("b", null, `Dinle (${dk[4]} dk). `), "Ses temiz mi, perde yerinde mi, zaman oturuyor mu? Yarın için tek düzeltme seç.")),
    h("aside", { class: "not" }, h("span", { class: "etiket" }, "Araştırma ne diyor"), h("p", null, ilkAy()
      ? "İlk ay oturum başına en fazla 10 dakika ses çıkar; her 3 dakikada 45 saniye dudak molası ver. Günde 2 kısa oturum, aralarında en az 4 saat."
      : "Günde 2 oturum, aralarında en az 4 saat; haftada 1 gün tam dinlenme. Uyku, öğrendiğini kalıcı hale getirir.")));
}

// ---------------- DERSLER (ders yolu) ----------------
export function derslerEkrani(kok) {
  const gecilen = TUM_DERSLER.filter((d) => dersBilgisi(d.id, d).durum !== "yeni").length;
  const simdiB = h("button", { class: "chip", "aria-pressed": "true" }, "Şimdiki ↓");
  kok.append(ustCubuk({ ustYazi: `${UNITELER.length} ünite · ${TUM_DERSLER.length} ders · ${gecilen} geçildi`, baslik: "Dersler", sag: simdiB }));
  let simdiEl = null, simdiBulundu = false;
  UNITELER.forEach((u) => {
    const uGecilen = u.dersler.filter((d) => dersBilgisi(d.id, d).durum !== "yeni").length;
    kok.append(h("div", { class: "unite-bas" },
      h("div", { class: "ust-satir" }, h("h2", null, u.baslik), h("span", { class: "sayac" }, `${uGecilen}/${u.dersler.length}`)),
      h("div", { class: "ilerleme-ince" }, h("i", { style: `width:${(uGecilen / u.dersler.length) * 100}%` })),
      u.ozet ? h("p", { class: "kucuk soluk", style: "margin:2px 0 0" }, u.ozet) : null));
    const yol = h("div", { class: "yol" });
    u.dersler.forEach((d) => {
      const i = TUM_DERSLER.indexOf(d);
      const b = dersBilgisi(d.id, d), a = dersAcikMi(TUM_DERSLER, i);
      let sinif = "yol-dugum", daire = h("span", { class: "daire" }, String(d.sira)), alt = h("div", { class: "alt" });
      if (b.durum !== "yeni") {
        sinif += " bitti"; daire = h("span", { class: "daire" }, ikon("onay"));
        if (b.bilgi) alt.append("Okundu");
        else {
          const c = h("span", { class: "centik", "aria-label": `ustalık ${b.gunSayisi}/3 gün` });
          for (let j = 0; j < 3; j++) c.append(h("i", { class: j < b.gunSayisi ? "dolu" : "" }));
          alt.append(c, b.durum === "ustalasti" ? "Ustalaştın" : b.tekrarVakti ? "Tekrar vakti" : `Ustalık ${b.gunSayisi}/3 gün`);
        }
      } else if (a.acik && !simdiBulundu) {
        sinif += " simdi"; simdiBulundu = true; alt.append(`${(d.adimlar || []).filter((x) => SESLI.has(x.tur)).length} adımda dinlerim`);
      } else if (!a.acik) {
        sinif += " kilitli"; daire = h("span", { class: "daire" }, ikon("kilit"));
        alt.append(a.neden === "yarin" ? "Yarın açılır" : `Önce ${i}. ders`);
      } else alt.append(d.ozet ? d.ozet.slice(0, 60) + (d.ozet.length > 60 ? "…" : "") : "");
      const sag = sinif.includes("simdi") ? h("span", { class: "dugme birincil dugme-kucuk", style: "min-height:40px" }, "Başla") : h("span", { class: "dk" }, `${d.sure || 10} dk`);
      const dugum = h("button", { class: sinif, type: "button" }, daire, h("span", null, h("div", { class: "ad" }, d.baslik), alt), sag);
      dugum.addEventListener("click", () => dersOzeti(d, i));
      if (sinif.includes("simdi")) simdiEl = dugum;
      yol.append(dugum);
    });
    kok.append(yol);
  });
  simdiB.addEventListener("click", () => simdiEl && simdiEl.scrollIntoView({ behavior: "smooth", block: "center" }));
  if (!simdiEl) simdiB.hidden = true;
}

function dersOzeti(d, i) {
  const a = dersAcikMi(TUM_DERSLER, i), b = dersBilgisi(d.id, d);
  const dinlenen = (d.adimlar || []).filter((x) => SESLI.has(x.tur)).length;
  const icerik = [
    h("div", { class: "ust-yazi" }, `${d.unite.baslik} · Ders ${d.sira}`),
    h("h2", null, d.baslik),
    d.ozet ? h("p", { class: "soluk", style: "margin:0" }, d.ozet) : null,
    d.hedefler && d.hedefler.length ? h("ul", { class: "kucuk", style: "margin:0;padding-left:1.2rem;display:grid;gap:4px" }, d.hedefler.map((x) => h("li", null, x))) : null,
    h("p", { class: "kucuk soluk mono", style: "margin:0" }, `${d.sure || 10} dk · ${dinlenen} dinlenen adım`),
  ];
  let kapat;
  if (a.acik || b.durum !== "yeni") icerik.push(h("a", { class: "dugme birincil genis", href: "#ders-" + d.id, onclick: () => kapat() }, ikon("oynat"), b.durum === "yeni" ? "Başla" : "Tekrar çalış"));
  else if (a.neden === "yarin") icerik.push(h("p", { class: "kucuk", style: "margin:0" }, "Bugün bir ders geçtin; yeni ders yarın açılır. Uyku, bugün öğrendiğini kalıcı yapar."),
    h("button", { class: "ikincil genis", onclick: () => { erkenAc(d.id); kapat(); location.hash = "#ders-" + d.id; } }, "Yine de şimdi aç"));
  else icerik.push(h("p", { class: "kucuk", style: "margin:0" }, `Bu ders, ${i}. dersi geçince açılır.`));
  kapat = altSayfa(...icerik.filter(Boolean));
}

// ---------------- DERS OYNATICI (tam ekran) ----------------
const TUR_ETIKET = {
  metin: ["Oku", "kitap"], cizim: ["Bak", "kitap"], parmak: ["Parmaklar", "el"], dinle: ["Dinle", "nota"],
  "uzun-ses": ["Çal · dinlerim", "mikrofon"], "nota-dizisi": ["Çal · dinlerim", "mikrofon"], ritim: ["Ritim · dinlerim", "mikrofon"],
  eser: ["Ezgi · dinlerim", "mikrofon"], kulak: ["Kulak · dinlerim", "mikrofon"], kayit: ["Kaydet", "kayit"], kontrol: ["Kendini değerlendir", "liste"], sureli: ["Serbest çalış · dinlerim", "mikrofon"],
};

export function dersEkrani(kok, id) {
  const ders = TUM_DERSLER.find((d) => d.id === id);
  if (!ders) { kok.append(h("p", null, "Ders bulunamadı."), h("a", { href: "#dersler" }, "Derslere dön")); return; }
  const adimlar = [{ tur: "_giris" }, ...ders.adimlar, { tur: "_son" }];
  const gecilen = new Set();
  let i = 0, aktif = null;

  const adimNo = h("span", { class: "adim-no" });
  const bolmeler = h("div", { class: "adimlar", "aria-hidden": "true" }, ...ders.adimlar.map((a) => h("i", { class: SESLI.has(a.tur) ? "dinler" : "" })));
  const ust = h("div", { class: "ders-ust" },
    h("div", { class: "ust-satir" },
      h("a", { class: "ikon-dugme", href: "#dersler", "aria-label": "Dersi kapat" }, ikon("kapat")),
      h("span", { class: "baslik-kucuk" }, `${ders.unite.baslik} · Ders ${ders.sira}`),
      adimNo),
    bolmeler);
  const govde = h("div");
  const geri = h("button", { class: "ikon-dugme", "aria-label": "Önceki adım" }, ikon("geri"));
  const atla = h("button", { class: "metin-dugme" }, "Şimdilik atla");
  const ileri = h("button", { class: "birincil" }, "İleri");
  const alt = h("div", { class: "ders-alt" }, geri, atla, ileri);
  kok.append(ust, govde, alt);

  function bildirFn(sira) {
    return (puan, gecti) => { adimSonucu(ders.id, sira, puan, gecti); if (gecti) gecilen.add(sira); dugmeler(); };
  }
  function dugmeler() {
    const a = adimlar[i];
    geri.disabled = i === 0; geri.style.visibility = i === 0 ? "hidden" : "visible";
    const n = ders.adimlar.length;
    adimNo.textContent = i === 0 ? "" : i > n ? "" : `${i}/${n}`;
    [...bolmeler.children].forEach((b, j) => { b.classList.toggle("gecti", j + 1 < i || gecilen.has(j + 1)); b.classList.toggle("simdi", j + 1 === i); });
    atla.hidden = true; ileri.disabled = false;
    if (a.tur === "_son") { ileri.textContent = "Derslere dön"; return; }
    if (a.tur === "_giris") { ileri.textContent = "Başla"; return; }
    const denetimli = DENETIMLI.has(a.tur);
    const eylem = aktif && aktif.kok.eylem;
    ileri.onclick = null;
    if (denetimli && !gecilen.has(i)) {
      atla.hidden = false;
      // dinleyen adımın asıl eylemi alt çubukta (başparmak altında); yoksa "İleri" pasif
      if (eylem) { ileri.replaceChildren(ikon("mikrofon"), eylem.etiket()); ileri.onclick = (e) => { e.stopImmediatePropagation(); eylem.tikla(); setTimeout(dugmeler, 50); }; }
      else { ileri.disabled = true; ileri.textContent = "Önce geç"; }
    } else ileri.textContent = i === adimlar.length - 2 ? "Dersi bitir" : "İleri";
  }
  function goster() {
    if (aktif) aktif.temizle(); demDurdur();
    govde.replaceChildren();
    const a = adimlar[i];
    if (a.tur === "_giris") { aktif = null; govde.append(giris(ders)); }
    else if (a.tur === "_son") { aktif = null; govde.append(son()); }
    else {
      aktif = adimCiz(a, bildirFn(i));
      const [ad, sim] = TUR_ETIKET[a.tur] || ["Adım", "bilgi"];
      aktif.kok.prepend(h("span", { class: "adim-tur" }, ikon(sim), ad));
      govde.append(aktif.kok);
    }
    dugmeler();
    window.scrollTo({ top: 0 });
  }
  function son() {
    const denetimliler = adimlar.map((a, j) => (DENETIMLI.has(a.tur) ? j : -1)).filter((j) => j >= 0);
    const hepsi = denetimliler.every((j) => gecilen.has(j));
    const k = h("div", { class: "adim" });
    const sira = TUM_DERSLER.indexOf(ders); const sonraki = TUM_DERSLER[sira + 1];
    if (hepsi) {
      dersGecti(ders.id); tekrarIsle(ders.id);
      const b = dersBilgisi(ders.id, ders);
      k.append(h("div", { class: "degerlendirme iyi" }, h("div", { class: "baslik" }, ikon("onay"), b.bilgi ? "Bölümü tamamladın" : "Dersi geçtin"),
        h("p", { style: "margin:0" }, b.bilgi ? "Sıradaki ders açıldı." : b.durum === "ustalasti" ? "Bu derste ustalaştın: 3 farklı günde geçtin." : `Ustalık ${b.gunSayisi}/3 gün. Başka günlerde de geç ki kalıcı olsun; yeni ders yarın açılır.`)));
      if (ders.kapanis) k.append(h("div", { class: "metin", html: ders.kapanis }));
      if (!b.bilgi) k.append(h("aside", { class: "not ipucu" }, h("span", { class: "etiket" }, "Bitirmeden"), h("p", null, "Kamışı çıkar, nemini hafifçe üfle, kapağı açık kurumaya bırak. Islak kamış kapalı kutuda küflenir.")));
    } else {
      const eksik = denetimliler.filter((j) => !gecilen.has(j)).length;
      k.append(h("div", { class: "degerlendirme orta" }, h("div", { class: "baslik" }, "Neredeyse"),
        h("p", { style: "margin:0" }, `${eksik} dinlenen adımı henüz geçmedin. Geri dönüp geçince ders tamamlanır. Bugün olmayan yarın çok daha kolay olur.`)));
      if (ayar("denemeModu")) k.append(h("p", { class: "kucuk soluk", style: "margin:0" }, "Deneme modu: ders geçilmiş sayılmadı ama sonraki derse geçebilirsin."));
    }
    if (sonraki && dersAcikMi(TUM_DERSLER, sira + 1).acik) k.append(h("a", { class: "dugme birincil genis", href: "#ders-" + sonraki.id }, `Sonraki ders: ${sonraki.baslik}`));
    return k;
  }
  geri.addEventListener("click", () => { if (i > 0) { i--; goster(); } });
  atla.addEventListener("click", () => { i++; goster(); });
  ileri.addEventListener("click", () => {
    if (ileri.onclick) return; // adım eylemi çalıştı
    if (adimlar[i].tur === "_son") { location.hash = "#dersler"; return; }
    i++; goster();
  });
  goster();
  return () => { if (aktif) aktif.temizle(); demDurdur(); };
}

function giris(ders) {
  const dinlenen = ders.adimlar.filter((a) => SESLI.has(a.tur)).length;
  const k = h("div", { class: "adim" },
    h("h1", null, ders.baslik),
    ders.ozet ? h("p", { class: "soluk", style: "font-size:1.1875rem;margin:0" }, ders.ozet) : null,
    h("p", { class: "kucuk soluk mono", style: "margin:0" }, `${ders.sure || 10} dk · ${ders.adimlar.length} adım · ${dinlenen} adımda dinlerim`));
  if (ders.hedefler && ders.hedefler.length) k.append(h("div", { class: "kart" }, h("h3", { style: "margin-bottom:8px" }, "Bu derste"), h("ul", { style: "margin:0;padding-left:1.2rem;display:grid;gap:6px" }, ders.hedefler.map((x) => h("li", null, x)))));
  if (ders.giris) k.append(h("div", { class: "metin", html: ders.giris }));
  return k;
}
