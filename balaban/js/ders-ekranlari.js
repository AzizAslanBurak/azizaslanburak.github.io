// Bugün, Dersler listesi ve ders oynatıcı.
import { h, calgiAdi } from "./ortak.js";
import { UNITELER, TUM_DERSLER } from "./dersler/index.js";
import { adimCiz, DENETIMLI } from "./ders-motoru.js";
import { depo, bugun, bugunDakika, haftaDakika, ayar, adimSonucu, dersGecti, kaydet } from "./depo.js";
import { dersBilgisi, dersAcikMi, erkenAc, tekrarIsle, hafta, ilkAy, kulakPuani, haftaGunSayisi, yukOrani, perdeBandi } from "./ilerleme.js";
import { demDurdur } from "./ses.js";

function siradakiDers() {
  for (let i = 0; i < TUM_DERSLER.length; i++) {
    const b = dersBilgisi(TUM_DERSLER[i].id, TUM_DERSLER[i]);
    if (b.durum === "yeni") return { ders: TUM_DERSLER[i], i, acik: dersAcikMi(TUM_DERSLER, i) };
  }
  return null;
}

// ---------------- BUGÜN ----------------
export function bugunEkrani(kok) {
  const w = hafta();
  const hedefDk = ilkAy() ? 12 : ayar("gunlukHedefDk") || 20;
  const dk = bugunDakika();
  const gunler = haftaGunSayisi();
  const kp = kulakPuani();
  const tarih = new Date().toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });

  kok.append(h("div", { class: "yigin" },
    h("div", { class: "selam" }, h("div", { class: "ust-yazi" }, `${tarih} · ${w}. hafta`), h("h1", null, "Bugün")),
    h("div", { class: "seri" },
      h("div", null, h("b", null, `${dk}`), h("span", null, `dk çaldın (oturum hedefi ${hedefDk})`)),
      h("div", null, h("b", null, `${gunler}/7`), h("span", null, "bu hafta çalışılan gün")),
      h("div", null, h("b", null, kp == null ? "–" : `%${kp}`), h("span", null, "kulak puanı"))),
  ));

  if (!ayar("tanitildi")) kok.append(h("div", { class: "kart sonraki-ders", style: "margin-top:14px" },
    h("div", { class: "ust-yazi" }, "İlk iş"), h("h3", null, "Çalgını bana dinlet"),
    h("p", { class: "soluk", style: "margin:0 0 10px" }, "Balaban mı düdük mü, hangi akortta? İki kısa sesle anlarım; akort göstergesi ve parmak tablosu senin çalgına göre ayarlanır. Henüz ses çıkaramıyorsan önce ilk dersleri yap, sonra buraya dön."),
    h("div", { class: "satir" }, h("a", { class: "dugme vurgu", href: "#araclar-tanit" }, "Çalgını tanıt"), h("a", { class: "dugme ikincil", href: "#ders-" + (TUM_DERSLER[0] && TUM_DERSLER[0].id) }, "Önce derslere başla"))));

  const oran = yukOrani();
  if (oran && oran > 1.2) kok.append(h("aside", { class: "not dikkat", style: "margin-top:14px" }, h("span", { class: "etiket" }, "Dudakların için"), h("p", null, `Bu hafta geçen haftadan %${Math.round((oran - 1) * 100)} fazla çaldın. Yükü haftada en fazla %20 artırmak dudak ve kamış yorgunluğunu önler. Bugün kısa tut.`)));

  const s = siradakiDers();
  const tekrarlar = TUM_DERSLER.filter((d) => dersBilgisi(d.id, d).tekrarVakti);
  const plan = h("div", { class: "yigin", style: "margin-top:18px" });
  kok.append(plan);

  if (s) {
    const kart = h("div", { class: "kart sonraki-ders" },
      h("div", { class: "ust-yazi" }, `${s.ders.unite.baslik} · Ders ${s.ders.sira}`),
      h("h3", null, s.ders.baslik), h("p", { class: "soluk", style: "margin:0 0 10px" }, s.ders.ozet || ""));
    if (s.acik.acik) kart.append(h("a", { class: "dugme vurgu", href: "#ders-" + s.ders.id }, "Derse başla"));
    else if (s.acik.neden === "yarin") kart.append(h("p", { class: "kucuk" }, "Bugün bir ders geçtin. Yeni ders yarın açılır: uyku, bugün öğrendiğini kalıcı hale getirir. Bugün tekrar ve uzun ses çalış."),
      h("button", { class: "ikincil", onclick: () => { erkenAc(s.ders.id); location.hash = "#ders-" + s.ders.id; } }, "Yine de şimdi aç"));
    plan.append(kart);
  } else plan.append(h("div", { class: "kart" }, h("h3", null, "Tüm dersleri geçtin"), h("p", { class: "soluk", style: "margin:0" }, "Tekrarlarla ustalığını koru; repertuvarını kaydet.")));

  if (tekrarlar.length) plan.append(h("div", { class: "kart cerceve yigin" },
    h("h3", null, "Bugünün tekrarları"),
    h("p", { class: "kucuk soluk", style: "margin:0" }, "Aralıklı tekrar, öğrendiğini unutmanı önler. Bu dersleri kısa bir sınavla tekrar geç."),
    ...tekrarlar.slice(0, 3).map((d) => h("a", { href: "#ders-" + d.id, class: "ders-satiri" }, h("span", { class: "rozet" }, "↻"), h("span", null, h("div", { class: "ad" }, d.baslik), h("div", { class: "ozet" }, d.unite.baslik)), h("span", { class: "sure" }, `${d.sure || 10} dk`)))));

  const dk1 = ilkAy() ? [2, 4, 4, 1, 1] : [2, 4, 8, 3, 3];
  plan.append(h("div", { class: "kart gunluk-plan" },
    h("h3", null, "Bir oturum nasıl geçer"),
    h("ol", null,
      h("li", null, h("b", null, `Planla (${dk1[0]} dk). `), "Bugünkü tek hedefini seç: örneğin \"Si notasını sabit tutmak\"."),
      h("li", null, h("b", null, `Kalibrasyon (${dk1[1]} dk). `), h("a", { href: "#akort" }, "Akort"), " ekranında demi aç, 3 uzun ses çal. Önce kulağınla oturt, sonra göstergeye bak."),
      h("li", null, h("b", null, `Ders ya da tekrar (${dk1[2]} dk). `), "Egzersizleri sırayla değil karışık çalış: A, B, C, sonra yine A, B, C. Zor gelir ama kalıcıdır."),
      h("li", null, h("b", null, `Kayıt (${dk1[3]} dk). `), "Çalıştığın ezgiyi bir kez baştan sona kaydet; yargılamadan çal."),
      h("li", null, h("b", null, `Yansıt (${dk1[4]} dk). `), "Kaydı dinle: ses temiz mi, perde yerinde mi, zaman oturuyor mu? Yarın için tek düzeltme seç.")),
    h("p", { class: "kucuk soluk", style: "margin:.6rem 0 0" }, ilkAy()
      ? "İlk ay: oturum başına en fazla 10 dakika ses çıkar, her 3 dakikada bir 45 saniye dudak molası ver. Günde 2 kısa oturum, aralarında en az 4 saat."
      : "Günde 2 oturum, aralarında en az 4 saat. Haftada 1 gün tam dinlenme. Oturum sonunda kamışı kurut.")));

  plan.append(h("div", { class: "satir" },
    h("a", { class: "dugme ikincil", href: "#akort" }, "Akort"),
    h("a", { class: "dugme ikincil", href: "#ritim" }, "Ritim"),
    h("a", { class: "dugme ikincil", href: "#araclar-parmak" }, "Parmak tablosu"),
    h("a", { class: "dugme ikincil", href: "#araclar-kayit" }, "Kaydet")));
  plan.append(h("p", { class: "kucuk soluk" }, `Çalgın: ${calgiAdi()} · perde bandın şu an ±${perdeBandi()} cent.`));
}

// ---------------- DERSLER ----------------
export function derslerEkrani(kok) {
  kok.append(h("div", { class: "yigin" }, h("div", null, h("div", { class: "ust-yazi" }, `${TUM_DERSLER.length} ders`), h("h1", null, "Dersler")),
    h("p", { class: "soluk" }, "Her ders bir öncekinin üstüne kurulur. Bir dersi geçince ertesi gün yenisi açılır. Aynı dersi 3 farklı günde geçince o derste ustalaşmış olursun.")));
  let siradakiBulundu = false;
  UNITELER.forEach((u) => {
    const liste = h("div", { class: "unite" }, h("h3", null, u.baslik), u.ozet ? h("p", { class: "kucuk soluk", style: "margin:0" }, u.ozet) : null);
    u.dersler.forEach((d) => {
      const i = TUM_DERSLER.indexOf(d);
      const b = dersBilgisi(d.id, d), a = dersAcikMi(TUM_DERSLER, i);
      let sinif = "ders-satiri", rozet = String(d.sira), alt = d.ozet || "";
      if (b.durum === "ustalasti") { sinif += " bitti"; rozet = "★"; alt = "Ustalaştın"; }
      else if (b.bilgi) { sinif += " bitti"; rozet = "✓"; alt = "Okundu"; }
      else if (b.durum === "gecti") { sinif += " bitti"; rozet = "✓"; alt = `Geçtin · ustalık ${b.gunSayisi}/3 gün` + (b.tekrarVakti ? " · tekrar vakti" : ""); }
      else if (a.acik && !siradakiBulundu) { sinif += " siradaki"; siradakiBulundu = true; }
      else if (!a.acik) { sinif += " kilitli"; if (a.neden === "yarin") alt = "Yarın açılır"; }
      const satir = a.acik || b.durum !== "yeni"
        ? h("a", { class: sinif, href: "#ders-" + d.id }, h("span", { class: "rozet" }, rozet), h("span", null, h("div", { class: "ad" }, d.baslik), h("div", { class: "ozet" }, alt)), h("span", { class: "sure" }, `${d.sure || 10} dk`))
        : h("div", { class: sinif, "aria-disabled": "true" }, h("span", { class: "rozet" }, rozet), h("span", null, h("div", { class: "ad" }, d.baslik), h("div", { class: "ozet" }, alt)), h("span", { class: "sure" }, `${d.sure || 10} dk`));
      liste.append(satir);
    });
    kok.append(liste);
  });
}

// ---------------- DERS OYNATICI ----------------
export function dersEkrani(kok, id) {
  const ders = TUM_DERSLER.find((d) => d.id === id);
  if (!ders) { kok.append(h("p", null, "Ders bulunamadı."), h("a", { href: "#dersler" }, "Derslere dön")); return; }
  const adimlar = [{ tur: "_giris" }, ...ders.adimlar, { tur: "_son" }];
  const gecilen = new Set();
  let i = 0, aktif = null;
  const ust = h("div", { class: "ders-ust" },
    h("a", { href: "#dersler", class: "kucuk" }, "‹ Dersler"),
    h("div", { class: "ust-yazi" }, `${ders.unite.baslik} · Ders ${ders.sira}`),
    h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" })));
  const govde = h("div");
  const geri = h("button", { class: "ikincil" }, "Geri");
  const ileri = h("button", { class: "vurgu" }, "İleri");
  const alt = h("div", { class: "ders-alt" }, geri, ileri);
  kok.append(ust, govde, alt);

  function bildirFn(sira) {
    return (puan, gecti) => {
      adimSonucu(ders.id, sira, puan, gecti);
      if (gecti) { gecilen.add(sira); dugmeler(); }
    };
  }
  function dugmeler() {
    const a = adimlar[i];
    geri.disabled = i === 0;
    if (a.tur === "_son") { ileri.textContent = "Derslere dön"; return; }
    const denetimli = DENETIMLI.has(a.tur);
    if (denetimli && !gecilen.has(i)) { ileri.textContent = "Şimdilik atla"; ileri.className = "ikincil"; }
    else { ileri.textContent = i === adimlar.length - 2 ? "Dersi bitir" : "İleri"; ileri.className = "vurgu"; }
  }
  function goster() {
    if (aktif) aktif.temizle(); demDurdur();
    govde.replaceChildren();
    ust.querySelector(".ilerleme-cubugu i").style.width = `${(i / (adimlar.length - 1)) * 100}%`;
    const a = adimlar[i];
    if (a.tur === "_giris") { aktif = null; govde.append(giris(ders)); }
    else if (a.tur === "_son") { aktif = null; govde.append(son()); }
    else { aktif = adimCiz(a, bildirFn(i)); govde.append(aktif.kok); }
    dugmeler();
    window.scrollTo({ top: 0 });
  }
  function son() {
    const denetimliler = adimlar.map((a, j) => (DENETIMLI.has(a.tur) ? j : -1)).filter((j) => j >= 0);
    const hepsi = denetimliler.every((j) => gecilen.has(j));
    const k = h("div", { class: "adim" });
    if (hepsi) {
      dersGecti(ders.id); tekrarIsle(ders.id);
      const b = dersBilgisi(ders.id, ders);
      k.append(h("div", { class: "degerlendirme iyi" }, h("div", { class: "baslik" }, b.bilgi ? "Bölümü tamamladın" : "Dersi geçtin"),
        h("p", { style: "margin:0" }, b.bilgi ? "Sıradaki ders açıldı." : b.durum === "ustalasti" ? "Bu derste ustalaştın: 3 farklı günde geçtin." : `Ustalık: ${b.gunSayisi}/3 gün. Bu dersi başka günlerde de geç ki kalıcı olsun. Yeni ders yarın açılır.`)));
      if (ders.kapanis) k.append(h("div", { class: "metin", html: ders.kapanis }));
      if (!b.bilgi) k.append(h("aside", { class: "not ipucu" }, h("span", { class: "etiket" }, "Bitirmeden"), h("p", null, "Kamışı çalgıdan çıkar, içindeki nemi hafifçe üfle, kapağını açık bırakarak kurumaya koy. Islak kamışı kapalı kutuda bırakmak küf ve bakteri üretir.")));
    } else {
      const eksik = denetimliler.filter((j) => !gecilen.has(j)).length;
      k.append(h("div", { class: "degerlendirme orta" }, h("div", { class: "baslik" }, "Neredeyse"),
        h("p", { style: "margin:0" }, `${eksik} denetimli adımı henüz geçmedin. Atladığın adımlara geri dönüp geçince ders tamamlanır. Acele etme; bugün yapamadığını yarın çok daha kolay yaparsın.`)));
    }
    return k;
  }
  geri.addEventListener("click", () => { if (i > 0) { i--; goster(); } });
  ileri.addEventListener("click", () => {
    if (adimlar[i].tur === "_son") { location.hash = "#dersler"; return; }
    i++; goster();
  });
  goster();
  return () => { if (aktif) aktif.temizle(); demDurdur(); };
}

function giris(ders) {
  const k = h("div", { class: "adim" }, h("h1", null, ders.baslik));
  if (ders.ozet) k.append(h("p", { class: "soluk", style: "font-size:1.1rem" }, ders.ozet));
  if (ders.hedefler && ders.hedefler.length) k.append(h("div", { class: "kart" }, h("h3", null, "Bu derste"), h("ul", null, ders.hedefler.map((x) => h("li", null, x)))));
  k.append(h("p", { class: "kucuk soluk" }, `Yaklaşık ${ders.sure || 10} dakika. ${ders.adimlar.filter((a) => DENETIMLI.has(a.tur)).length} adımda seni dinleyip değerlendireceğim.`));
  if (ders.giris) k.append(h("div", { class: "metin", html: ders.giris }));
  return k;
}
