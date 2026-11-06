// Ders motoru: ders adımlarını çizer ve dinleyerek denetler.
// Adım türleri ve alanları için DERS_YAZIM_KILAVUZU.md dosyasına bak.
import * as mik from "./mikrofon.js";
import { ac, notaCal, demBaslat, demDurdur, saymaYukle } from "./ses.js";
import { notaMidi, midiAdi } from "./perde.js";
import { h, mikrofonGerekli, kaydirma, kaydirmaKatla, notaYazisi, calgiAdi } from "./ortak.js";
import { ayar, ayarla } from "./depo.js";
import { AkortGostergesi } from "./akort-gosterge.js";
import { parmakKarti, parmakCanli, notaYaninda, parmakDugmesi } from "./parmak.js";
import { notaKagidi, hepsiniDurdur } from "./nota.js";
import { ritimTesti, desenCiz, desenCal } from "./ritim.js";
import { sonucKutusu } from "./ekranlar.js";
import { kaydedici } from "./kayit.js";
import { CIZIMLER } from "./cizimler.js";
import { ikon, segment, sahneAc, durumEl, halka } from "./arayuz.js";
import { perdeBandi, bantIcinde, ritimBandi, tahminKaydet, gucBandi } from "./ilerleme.js";
import { uzunSesAnaliz } from "./uzun-ses-analiz.js";

export const DENETIMLI = new Set(["uzun-ses", "nota-dizisi", "ritim", "eser", "kulak", "kontrol", "sureli", "kayit"]);

// Her adım: { kok, temizle(), gecti (bool) } döner. bildir(puan, gecti) sonucu kaydeder.
export function adimCiz(adim, bildir) {
  const kok = h("div", { class: "adim" });
  const temizlik = [];
  if (adim.baslik) kok.append(h("h2", null, adim.baslik));
  const metin = (html) => html && kok.append(h("div", { class: "metin", html }));
  const sonra = adim.sonra ? () => kok.append(h("div", { class: "metin", html: adim.sonra })) : () => {};

  switch (adim.tur) {
    case "metin": metin(adim.html); break;

    case "cizim": {
      metin(adim.ust);
      const c = CIZIMLER[adim.cizim];
      kok.append(h("figure", { class: "cizim", html: (c ? c.svg : `<p>Çizim bulunamadı: ${adim.cizim}</p>`) + (c && c.yazi ? `<figcaption>${c.yazi}</figcaption>` : "") }));
      metin(adim.html);
      break;
    }

    case "parmak": {
      metin(adim.html);
      const izgara = h("div", { class: "parmaklar" });
      adim.notalar.forEach((n) => {
        const b = h("button", { class: "parmak", "aria-label": notaYazisi(n) + " sesini dinle" });
        const k = parmakKarti(n, { buyuk: adim.notalar.length <= 2 });
        while (k.firstChild) b.appendChild(k.firstChild);
        b.addEventListener("click", () => notaCal(notaMidi(n) + kaydirma(), 1.4));
        izgara.append(b);
      });
      kok.append(izgara, h("p", { class: "kucuk soluk" }, "Bir şemaya dokunursan o notanın sesini duyarsın."));
      sonra();
      break;
    }

    case "dinle": {
      metin(adim.html);
      if (adim.abc) kok.append(notaKagidi(adim.abc, { baslik: adim.notaBaslik || "", dem: adim.dem, takip: false }));
      else if (adim.notalar) {
        const b = h("button", { class: "ikincil genis" }, ikon("oynat"), "Dinle");
        const parmak = parmakCanli(); parmak.goster(notaMidi(adim.notalar[0]));
        const dizi = h("div", { class: "nota-dizi" }, ...adim.notalar.map((n) => h("span", null, notaYazisi(n))));
        b.addEventListener("click", () => {
          const c = ac(); let t = 0; const sure = adim.notaSure || 1.2;
          adim.notalar.forEach((n, i) => { setTimeout(() => { notaCal(notaMidi(n) + kaydirma(), sure * 0.95); parmak.goster(notaMidi(n)); [...dizi.children].forEach((e, j) => e.classList.toggle("calan", j === i)); }, t * 1000); t += sure; });
          setTimeout(() => [...dizi.children].forEach((e) => e.classList.remove("calan")), t * 1000);
        });
        kok.append(h("div", { class: "nota" }, notaYaninda(parmak, dizi)), b);
      }
      sonra();
      break;
    }

    case "uzun-ses": {
      metin(adim.html);
      const us = uzunSes(adim, bildir, temizlik);
      kok.append(us); kok.eylem = us.eylem;
      sonra();
      break;
    }

    case "nota-dizisi": {
      metin(adim.html);
      const abc = `X:1\nM:none\nL:1/4\nK:C\n${adim.dizi.map(abcNota).map((n) => n + "2").join(" ")} |]`;
      const alan = h("div", { class: "yigin" });
      kok.append(alan);
      mikrofonGerekli(alan, () => {
        alan.append(notaKagidi(abc, { baslik: "Sırayla çal", takip: true, sonucta: (s) => bildir(s.puan, s.puan >= (adim.gecme || 60)) }));
        alan.append(h("p", { class: "kucuk soluk" }, "\"Notayla ilerle\"ye bas. Turuncu nota sıradaki notadır; doğru çaldığında yeşile döner ve sıradakine geçer. Acele yok, ben seni beklerim."));
      });
      sonra();
      break;
    }

    case "ritim": {
      metin(adim.html);
      const d = { desen: adim.desen, olcu: adim.olcu || "4/4", bpm: adim.bpm || 60 };
      const kagit = h("div", { class: "kagit" });
      desenCiz(kagit, d.desen, d.olcu);
      const durumEl = h("div", { class: "kucuk soluk", "aria-live": "polite" });
      const sonucAlan = h("div");
      const dinle = h("button", { class: "ikincil", onclick: () => desenCal(d.desen, d.bpm, adim.nota || "A4", kagit) }, ikon("oynat"), "Dinle");
      const test = h("button", { class: "cal-dugme" }, h("span", { class: "sol" }, ikon("mikrofon"), "Ritmi çal"), h("span", { class: "sure" }, `${d.bpm} vuruş/dk`));
      test.addEventListener("click", () => mikrofonGerekli(sonucAlan, async () => {
        test.disabled = true; sonucAlan.replaceChildren(); await saymaYukle();
        const olcuVurus = d.olcu.endsWith("/8") ? Math.max(2, Math.round(parseInt(d.olcu) / 2)) : parseInt(d.olcu);
        const buyuk = h("div", { class: "sayim" }, ""); const dur = durumEl(); dur.ayarla("bos", "Sayımı dinle");
        const sahne = sahneAc({ ust: `${d.olcu} · ${d.bpm} vuruş/dk`, icerik: [buyuk, dur], bitirAdi: "Vazgeç" });
        const s = await ritimTesti({ desen: d.desen, bpm: d.bpm, olcuVurus, olcu: d.olcu, bant: adim.bant || ritimBandi() }, { durumda: (x) => { if (x.evre === "sayim") buyuk.textContent = String(x.vurus); else { buyuk.textContent = "Çal"; dur.ayarla("bos", "Dinliyorum"); } } });
        sahne.kapat("bitti");
        test.disabled = false; durumEl.textContent = "";
        sonucAlan.append(sonucKutusu(s));
        bildir(s.puan, s.puan >= (adim.gecme || 70));
      }));
      test.hidden = true;
      const parmak = parmakCanli(); parmak.goster(notaMidi(adim.nota || "A4"));
      const govde = notaYaninda(parmak, kagit);
      kok.append(h("div", { class: "nota" }, govde), h("div", { class: "satir" }, dinle, parmakDugmesi(govde)), test, durumEl, sonucAlan);
      kok.eylem = { etiket: () => "Ritmi çal", alt: () => `${d.bpm} vuruş/dk`, tikla: () => test.click() };
      sonra();
      break;
    }

    case "eser": {
      metin(adim.html);
      const alan = h("div", { class: "yigin" }); kok.append(alan);
      const k = notaKagidi(adim.abc, { baslik: adim.notaBaslik || "", dem: adim.dem, bpm: adim.bpm, takip: adim.takip !== false, birlikte: adim.birlikte !== false, eslikSesi: !!adim.eslikSesi,
        sonucta: (s) => bildir(s.puan, s.puan >= (adim.gecme || 70) && (s.tur === "birlikte" || adim.birlikte === false)) });
      alan.append(k);
      if (!mik.acikMi()) mikrofonGerekli(alan, () => {});
      alan.append(h("p", { class: "kucuk soluk" }, adim.birlikte === false
        ? "\"Notayla ilerle\" ile notaları kendi hızında öğren."
        : "Önce \"Notayla ilerle\" ile notaları kendi hızında öğren. Hazır olunca \"Tempoda çal\" ile sayımdan sonra tempoda çal; adımı geçmek için tempoda çalman gerekir. Hızı düşürerek başlayabilirsin."));
      sonra();
      break;
    }

    case "kulak": {
      metin(adim.html);
      const soru = adim.soru || 5, notalar = adim.notalar;
      let sira = 0, dogru = 0, hedef = null, tut = 0, sonZ = null, bekliyor = false, zamanAsimi = 0;
      const durumEl = h("p", { "aria-live": "polite" }, `Ben bir nota çalacağım, sen aynısını çal. ${soru} soru.`);
      const basB = h("button", { class: "cal-dugme" }, h("span", { class: "sol" }, ikon("mikrofon"), "Başla"), h("span", { class: "sure" }, `${soru} soru`));
      const tekrarB = h("button", { class: "ikincil", disabled: true }, "Tekrar dinle");
      const alan = h("div");
      basB.hidden = true;
      kok.append(durumEl, h("div", { class: "satir" }, basB, tekrarB), alan);
      kok.eylem = { etiket: () => (sira > 0 && sira < soru ? "Dinliyorum…" : sira >= soru ? "Yeniden başla" : "Başla"), alt: () => `${soru} soru`, tikla: () => basB.click() };
      function yeniSoru() {
        if (sira >= soru) { const puan = Math.round((dogru / soru) * 100); durumEl.textContent = `Bitti: ${dogru}/${soru} doğru.`; bekliyor = false; basB.disabled = false; basB.textContent = "Yeniden başla"; tekrarB.disabled = true; bildir(puan, puan >= (adim.gecme || 80)); return; }
        let yeni; do { yeni = notalar[Math.floor(Math.random() * notalar.length)]; } while (notalar.length > 1 && yeni === hedef);
        hedef = yeni; sira++; tut = 0; bekliyor = false;
        durumEl.textContent = `${sira}. soru: dinle…`;
        notaCal(notaMidi(hedef) + kaydirma(), 1.3);
        setTimeout(() => { bekliyor = true; durumEl.textContent = `${sira}. soru: şimdi sen çal.`; clearTimeout(zamanAsimi); zamanAsimi = setTimeout(() => { if (bekliyor) { bekliyor = false; durumEl.textContent = `Süre doldu. Doğrusu ${notaYazisi(hedef)} idi.`; setTimeout(yeniSoru, 1500); } }, 9000); }, 1500);
      }
      tekrarB.addEventListener("click", () => hedef && notaCal(notaMidi(hedef) + kaydirma(), 1.3));
      basB.addEventListener("click", () => mikrofonGerekli(alan, () => {
        sira = 0; dogru = 0; basB.disabled = true; tekrarB.disabled = false;
        if (!temizlik.kulak) {
          temizlik.kulak = true;
          temizlik.push(mik.abone((o) => {
            const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
            if (!bekliyor || o.midi == null) { tut = 0; return; }
            const fark = Math.abs(o.midi - kaydirma() - notaMidi(hedef)) * 100;
            if (fark <= 40) { tut += dt; if (tut >= 0.35) { bekliyor = false; clearTimeout(zamanAsimi); dogru++; durumEl.textContent = `Doğru, ${notaYazisi(hedef)}!`; setTimeout(yeniSoru, 1100); } }
            else tut = 0;
          }));
        }
        yeniSoru();
      }));
      temizlik.push(() => clearTimeout(zamanAsimi));
      sonra();
      break;
    }

    case "kayit": {
      metin(adim.html);
      if (adim.abc) kok.append(notaKagidi(adim.abc, { baslik: adim.notaBaslik || "Örnek", dem: adim.dem, takip: false }),
        h("p", { class: "kucuk soluk" }, "Önce örneği dinle, sonra kendini kaydet ve ikisini art arda dinle. Öz değerlendirme ancak bir örnekle karşılaştırınca işe yarar."));
      const kontrol = adim.kontrol ? kontrolListesi(adim.kontrol, () => bildir(100, true)) : null;
      kok.append(h("div", { class: "kart" }, kaydedici(adim.etiket || adim.baslik || "Ders kaydı", { kaydedince: () => { if (!kontrol) bildir(100, true); } })));
      if (kontrol) kok.append(h("p", { class: "kucuk soluk" }, "Kaydını dinle ve dürüstçe işaretle:"), kontrol);
      sonra();
      break;
    }

    case "kontrol": {
      metin(adim.html);
      kok.append(kontrolListesi(adim.maddeler, () => bildir(100, true)));
      sonra();
      break;
    }

    case "sureli": {
      metin(adim.html);
      const hedefSn = (adim.dakika || 3) * 60;
      let sesli = 0, sonZ = null, basladi = false;
      const sayacEl = h("div", { class: "bpm-buyuk" }, sureYaz(hedefSn));
      const cubuk = h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" }));
      const alan = h("div");
      const b = h("button", { class: "cal-dugme" }, h("span", { class: "sol" }, ikon("mikrofon"), "Başla"), h("span", { class: "sure" }, `${adim.dakika || 3} dk`));
      b.hidden = true;
      kok.append(sayacEl, cubuk, h("p", { class: "kucuk soluk" }, "Süre yalnızca sen çalarken (ben ses duyarken) ilerler."), b, alan);
      kok.eylem = { etiket: () => (basladi ? "Çalıyorsun…" : "Başla"), alt: () => `${adim.dakika || 3} dk`, tikla: () => b.click() };
      b.addEventListener("click", () => mikrofonGerekli(alan, () => {
        if (basladi) return; basladi = true;
        temizlik.push(mik.abone((o) => {
          const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
          if (o.sesli && o.midi != null) sesli += dt;
          const kalan = Math.max(0, hedefSn - sesli);
          sayacEl.textContent = sureYaz(kalan);
          cubuk.firstChild.style.width = Math.min(100, (sesli / hedefSn) * 100) + "%";
          if (kalan === 0 && !sayacEl.dataset.bitti) { sayacEl.dataset.bitti = "1"; bildir(100, true); }
        }));
      }));
      sonra();
      break;
    }

    default: kok.append(h("p", null, "Bilinmeyen adım türü: " + adim.tur));
  }

  if (adim.not) kok.append(h("aside", { class: "not " + (adim.notTuru || "") }, h("span", { class: "etiket" }, adim.notTuru === "dikkat" ? "Dikkat" : adim.notTuru === "ipucu" ? "İpucu" : "Araştırma ne diyor"), h("div", { html: adim.not })));
  return { kok, temizle: () => { hepsiniDurdur(); temizlik.forEach((f) => typeof f === "function" && f()); } };
}

// Uzun ses (tasarım sistemi §4.3): hazırlık kartı → Sahne (çalarken, uzaktan okunur) → sonuç kartı.
// "Sınav (kör)": çalarken perde gösterilmez; sonunda önce öz-tahmin, sonra bilgi. "Alıştırma": Sahne'de şerit.
// Geçiş: tutuşun ≥%80'i bantta, istenen sayıda tekrar (araştırma notu 01, U6).
function uzunSes(adim, bildir, temizlik) {
  const kok = h("div", { class: "yigin" });
  const hedef = notaMidi(adim.nota), saniye = adim.saniye || 4, tekrar = adim.tekrar || 3;
  const bant = adim.tolerans || perdeBandi();
  const korMu = adim.kor !== false;
  const kisAc = adim.gurluk === "kis-ac";
  const sikiOlcum = adim.kor !== false; // "garanti başarı" adımlarında yalnız perde puanlanır
  const sdSinir = Math.max(8, Math.round(bant * 0.6)); // bant içinde yalpalama sınırı (cent); ±15 bantta 9, araştırma hedefi 8–12
  const gucSinir = adim.gucSinir || gucBandi();
  const gurlukFarki = adim.gurlukFarki || 6, kisAcFarki = adim.gurlukFarki || 5; // dB
  let kip = korMu ? "sinav" : "alistirma", gecenTekrar = 0, deneme = 0, aktifSahne = null;
  temizlik.push(() => { if (aktifSahne) aktifSahne.kapat("temizlik"); });

  const dinleB = h("button", { class: "ikincil", onclick: () => notaCal(hedef + kaydirma(), Math.min(saniye, 3)) }, ikon("oynat"), "Hedefi dinle");
  const dugmeler = h("div", { class: "dugmeler" }, dinleB);
  let demNota = null;
  if (adim.dem) {
    demNota = adim.dem === true ? hedef - 12 : notaMidi(adim.dem);
    const demB = h("button", { class: "ikincil", "aria-pressed": "false" }, ikon("dem"), "Dem · kapalı");
    demB.addEventListener("click", () => { const a = demB.getAttribute("aria-pressed") === "true"; demB.setAttribute("aria-pressed", String(!a)); demB.lastChild.textContent = a ? "Dem · kapalı" : "Dem · açık"; if (a) demDurdur(); else demBaslat(demNota + kaydirma()); });
    dugmeler.append(demB); temizlik.push(() => demDurdur());
  }
  kok.append(h("div", { class: "hazirlik" }, parmakKarti(adim.nota, { aciklama: false }),
    h("div", { class: "bilgi" },
      h("div", { class: "hedef" }, h("b", null, notaYazisi(adim.nota)), ` notasını ${saniye} sn tut, ${tekrar} kez.`),
      h("div", { class: "kucuk soluk" }, kisAc ? `Aç–kıs: en az +${kisAcFarki} dB, perde ±${bant} cent` : adim.gurluk === "f" ? `Bant ±${bant} cent · fısıltıdan en az +${gurlukFarki} dB` : `Bant ±${bant} cent · gürlük ±${String(gucSinir).replace(".", ",")} dB`),
      dugmeler)));

  const ipucu = h("span", null);
  const sayac = h("b", null, `0/${tekrar}`);
  function ipucuYaz() { ipucu.textContent = kip === "sinav" ? "Göstergeyi kapatırım; kulağına ve deme güven." : korMu ? "Şeride bakarak oturt; bu kısım puanlanmaz." : "Şeride bakarak tut."; }
  if (korMu) kok.append(segment([["alistirma", "Alıştırma (göstergeli)"], ["sinav", "Sınav (kör)"]], kip, (d) => { kip = d; ipucuYaz(); calB.lastChild.textContent = `${saniye} sn × ${tekrar}`; }));
  ipucuYaz();
  kok.append(h("div", { class: "sayac-satir" }, ipucu, h("span", null, sayac, " geçti")));
  const calB = h("button", { class: "cal-dugme" }, h("span", { class: "sol" }, ikon("mikrofon"), "Çal"), h("span", { class: "sure" }, `${saniye} sn × ${tekrar}`));
  const sonuc = h("div", { class: "yigin" });
  calB.hidden = true; // asıl eylem ders oynatıcının alt çubuğunda (başparmak altında, kaydırmadan görünür)
  kok.append(calB, sonuc);
  calB.addEventListener("click", () => mikrofonGerekli(sonuc, () => calmaBaslat()));
  kok.eylem = { etiket: () => calB.querySelector(".sol").lastChild.textContent, alt: () => calB.querySelector(".sure").textContent, tikla: () => calB.click() };

  function calmaBaslat() {
    sonuc.replaceChildren();
    deneme++;
    const halkaEl = halka(); halkaEl.ayarla(0, String(saniye));
    const durum = durumEl(); durum.ayarla("bos", "Dinliyorum");
    let gosterge = null, serit = null;
    const yonEl = kisAc ? h("div", { class: "sahne-yon" }, "Aç ↗") : null;
    const icerik = [];
    if (kip === "sinav") icerik.push(h("div", { class: "sahne-nota" }, notaYazisi(adim.nota)), halkaEl, durum);
    else {
      gosterge = new AkortGostergesi({ hedef: akortBiliniyor() ? hedef : null, tolerans: bant, parmak: false, iz: false, sahne: true });
      serit = gurlukSeridi(kisAc ? null : gucSinir);
      icerik.push(gosterge.kok, serit.kok, halkaEl);
    }
    if (yonEl) icerik.push(yonEl);
    let bitti = false;
    const s = sahneAc({ ust: `Tekrar ${Math.min(gecenTekrar + 1, tekrar)} / ${tekrar}`, sagUst: h("span", { class: "kayit" }, "DİNLİYORUM"), icerik, bitince: () => { if (!bitti) bitir(); } });
    aktifSahne = s;
    let sure = 0, kopma = 0, sonZ = null; const hamlar = [], ornekler = [];
    const dinle = mik.abone((o) => {
      const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
      const biliniyor = akortBiliniyor();
      const yakin = o.midi != null && (biliniyor ? Math.abs(o.midi - kaydirma() - hedef) < 1.5 : (!hamlar.length || Math.abs(o.midi - ortanca(hamlar)) < 1.5));
      if (yakin) { sure += dt; kopma = 0; hamlar.push(o.midi); ornekler.push({ t: o.zaman, m: o.midi, db: o.db }); if (serit) serit.guncelle(o.db, sure); }
      else if (sure > 0) { kopma += dt; if (kopma > 0.5 && sure < saniye) { sure = 0; hamlar.length = 0; ornekler.length = 0; if (serit) serit.sifirla(); } }
      if (kip === "sinav") durum.ayarla("bos", o.midi != null ? "Ses geliyor" : o.sesli ? "Ses var, perdesi net değil" : "Dinliyorum");
      if (yonEl) yonEl.textContent = sure / saniye < 0.5 ? "Aç ↗" : "Kıs ↘";
      halkaEl.ayarla(sure / saniye, String(Math.max(0, Math.ceil(saniye - sure))));
      if (sure >= saniye && !bitti) { bitti = true; s.kapat("tamam"); bitir(true); }
    });
    if (gosterge) gosterge.baslat();
    function bitir(tamam) {
      dinle(); if (gosterge) gosterge.durdur(); aktifSahne = null;
      if (!tamam) { sonuc.replaceChildren(h("p", { class: "kucuk soluk", style: "margin:0" }, "Durdurdun. Hazır olunca yeniden \"Çal\"a dokun.")); return; }
      let not = null;
      if (!akortBiliniyor()) not = akortOgren(ortanca(hamlar), hedef);
      const k = kaydirma();
      const a = uzunSesAnaliz(ornekler.map((o) => ({ t: o.t, c: (o.m - k - hedef) * 100, db: o.db })), { bant, gurluk: adim.gurluk });
      if (kip === "sinav") tahminSor(a, not); else goster(a, null, not);
    }
  }

  function tahminSor(a, not) {
    sonuc.replaceChildren(h("div", { class: "kart yigin-s" },
      h("h3", null, "Sence nasıldı?"),
      h("p", { class: "kucuk soluk", style: "margin:0" }, "Önce sen söyle, sonra ben göstereyim. Tahminlerin kulak puanına yazılır."),
      h("div", { class: "segment" }, ...[["pes", "Pes kaldı"], ["tam", "Tam yerinde"], ["tiz", "Tiz kaçtı"]].map(([k, ad]) => h("button", { onclick: () => goster(a, k, not) }, ad)))));
  }

  // Geçişi engelleyen sorunlar, önem sırasıyla: perde → kararlılık → gürlük → dinamik
  function sorunlar(a, pKayit) {
    const l = [], cent = (x) => `${x > 0 ? "+" : ""}${Math.round(x)} c`;
    if (kisAc) {
      const ka = a.kisAc;
      if (!ka) l.push("Ses çok kısa kesildi; aç–kıs eğrisini çizemedim. Sesi baştan sona tut.");
      else {
        if (a.oran < 0.7) l.push(ka.perdeKaymasi > 10 ? `Gür yerde ses tizleşti (${cent(ka.perdeKaymasi)}): açarken dudağı birazcık gevşet.` : ka.perdeKaymasi < -10 ? `Kısık uçlarda ses pesleşti (${cent(-ka.perdeKaymasi)} fark): kısarken karın desteğini bırakma, dudağı birazcık sık.` : "Perde bantta kalmadı: gürlük değişirken dudakla perdeyi yerinde tut.");
        if (ka.acma < kisAcFarki) l.push(`Sesi yeterince açmadın (+${ondalik(ka.acma)} dB): ortaya doğru havayı hızlandır, en az +${kisAcFarki} dB.`);
        if (ka.kisma < kisAcFarki) l.push(`Sonda yeterince kısmadın (−${ondalik(Math.max(0, ka.kisma))} dB): sona doğru havayı yavaşça azalt, desteği bırakmadan.`);
        if (ka.tepeYeri < 0.3) l.push("Tepeye çok erken vardın: açmayı sürenin yarısına yay.");
        else if (ka.tepeYeri > 0.7) l.push("Tepeye geç vardın: yarıda en gür ol, sonra kıs.");
      }
      return l;
    }
    if (a.oran < 0.8) l.push(a.sd > 20 ? "Ses dalgalanıyor: nefesi eşit akıt, dudak basıncını değiştirme." : a.ort > 0 ? "Ses tiz kaldı: kamışı daha az sık, dudakları gevşet." : "Ses pes kaldı: nefes desteğini artır, kamışı çok az daha sık.");
    if (!sikiOlcum) return l; // ilk derslerin göstergeli adımları: kararlılık ve gürlük yalnız bilgi
    if (a.sd > sdSinir) l.push(`Ses bantta ama yalpalıyor (±${Math.round(a.sd)} c, sınır ±${sdSinir}): dudak basıncını sabit tut, nefesi karından eşit ver.`);
    if (a.gucSd > gucSinir) l.push(a.gucDusus < -4 ? `Sona doğru ses zayıfladı (${ondalik(a.gucDusus)} dB): nefes azaldıkça karın desteğini artır.` : `Gürlük dalgalandı (±${ondalik(a.gucSd)} dB, sınır ±${String(gucSinir).replace(".", ",")}): havayı sabit hızda ver, karnı yavaş ve eşit içeri çek.`);
    if (adim.gurluk === "f" && pKayit && a.gucOrt - pKayit.db < gurlukFarki) l.push(`Forte fısıltıdan yalnız ${isaretli(a.gucOrt - pKayit.db)} dB gür: en az +${gurlukFarki} dB hedefle. Sesi odanın dışına gönder, karın daha çok itsin.`);
    return l;
  }

  // Geçtiyse bir sonraki küçük adım
  function oneri(a, pKayit) {
    if (kisAc) return Math.abs(a.kisAc.perdeKaymasi) > 10 ? (a.kisAc.perdeKaymasi > 0 ? "Gür yerde ses hafif tizleşiyor; açarken dudağı birazcık daha bırak." : "Kısık uçlarda ses hafif pesleşiyor; kısarken desteği koru.") : "Böyle devam; bir dahakine eğriyi daha geniş çiz.";
    if (adim.gurluk === "f" && pKayit && Math.abs(a.ort - pKayit.ort) > 10) return a.ort > pKayit.ort ? `Forte'de ses fısıltıdan ${Math.round(a.ort - pKayit.ort)} cent tiz: dudağı birazcık gevşet.` : `Forte'de ses fısıltıdan ${Math.round(pKayit.ort - a.ort)} cent pes: dudağı birazcık sık.`;
    if (a.oturma != null && a.oturma >= 0.4) return a.basSapma < 0 ? `Ses alttan kayarak oturdu (${Math.round(a.oturma * 1000)} ms): "hu"dan önce dudağı ve karın desteğini hazırla, havayı ilk anda tam hızıyla bırak.` : `Ses tiz başlayıp indi (${Math.round(a.oturma * 1000)} ms): başta dudağı sıkma, "hu"yu yumuşak bırak.`;
    if (a.gucDusus < -4) return "Sona doğru ses biraz zayıflıyor; son saniyelerde karın desteğini artır.";
    if (a.gucSd > gucSinir * 0.7) return "Gürlük hafif dalgalanıyor; havayı sabit hızda ver.";
    if (Math.abs(a.ort) > bant / 2) return a.ort > 0 ? "Ses hafif tiz; kamışı biraz daha az sık." : "Ses hafif pes; nefes desteğini biraz artır.";
    if (a.sd > sdSinir * 0.7) return "Nefesi karından eşit ver; ses daha da sabitlenir.";
    return "Böyle devam.";
  }

  function goster(a, tahmin, not) {
    const gercek = Math.abs(a.ort) <= bant / 2 ? "tam" : a.ort > 0 ? "tiz" : "pes";
    if (tahmin) tahminKaydet(tahmin === gercek);
    const pKayit = adim.gurluk === "f" ? fisiltiKaydi.get(adim.nota) : null;
    if (adim.gurluk === "p") fisiltiKaydi.set(adim.nota, { db: a.gucOrt, ort: a.ort });
    const puanli = kip === "sinav" || !korMu;
    const engeller = sorunlar(a, pKayit);
    const gecti = puanli && !engeller.length;
    if (gecti) gecenTekrar++;
    sayac.textContent = `${gecenTekrar}/${tekrar}`;
    const enIyi = kisAc && a.kisAc && a.kisAc.acma >= kisAcFarki ? `Sesi +${ondalik(a.kisAc.acma)} dB açtın.`
      : a.sd < 10 ? `Perde çok sabitti (±${Math.round(a.sd)} cent).`
      : !kisAc && a.gucSd < 2 ? `Gürlük çok düzgündü (±${ondalik(a.gucSd)} dB).`
      : a.oturma != null && a.oturma <= 0.25 ? "Ses ilk anda yerine oturdu."
      : a.oran >= 0.8 ? `Sürenin %${Math.round(a.oran * 100)}'i bantta kaldı.` : "Sesi sonuna kadar götürdün.";
    const duzeltme = !puanli ? (engeller[0] || oneri(a, pKayit)) : gecti ? oneri(a, pKayit) : engeller[0];
    const kutu = (b, s) => h("div", null, h("b", null, b), h("span", null, s));
    const olcumler = [
      kutu(`%${Math.round(a.oran * 100)}`, `bantta (±${bant})`),
      kutu(`±${Math.round(a.sd)} c`, `kararlılık (≤${sdSinir})`),
      kutu(`${a.ort > 0 ? "+" : ""}${Math.round(a.ort)} c`, "ortalama"),
      kisAc && a.kisAc ? kutu(`+${Math.round(a.kisAc.acma)} / −${Math.max(0, Math.round(a.kisAc.kisma))}`, `aç / kıs dB (≥${kisAcFarki})`)
        : adim.gurluk === "f" && pKayit ? kutu(`${isaretli(a.gucOrt - pKayit.db)} dB`, `fısıltıya göre (≥${gurlukFarki})`)
        : kutu(`±${ondalik(a.gucSd)} dB`, `gürlük (≤${String(gucSinir).replace(".", ",")})`),
      kutu(a.oturma == null ? "—" : `${Math.round(a.oturma * 1000)} ms`, "başlangıç"),
    ];
    const kart = h("div", { class: "degerlendirme " + (gecti ? "iyi" : !puanli ? "" : a.oran >= 0.5 ? "orta" : "kotu") },
      h("div", { class: "baslik" }, gecti ? ikon("onay") : null, !puanli ? "Alıştırma bitti" : gecti ? `Geçtin · ${gecenTekrar}/${tekrar}` : "Bir daha"),
      tahmin ? h("p", { style: "margin:0" }, `Tahminin ${tahmin === gercek ? "doğru" : "yanlış"}: ses ${gercek === "tam" ? "tam yerindeydi" : gercek === "tiz" ? "tizdi" : "pesti"}.`) : null,
      h("div", { class: "satir-bilgi" }, h("b", null, "En iyi"), h("span", null, enIyi)),
      h("div", { class: "satir-bilgi" }, h("b", null, "Tek düzeltme"), h("span", null, duzeltme)),
      h("div", { class: "olcum" }, ...olcumler),
      h("div", { class: "harita-ad" }, "Perde"), perdeHaritasi(a),
      h("div", { class: "harita-ad" }, "Gürlük"), gurlukHaritasi(a.egri, kisAc ? null : { orta: a.gucOrt, sinir: gucSinir }));
    if (adim.gurluk === "f" && !pKayit) kart.append(h("p", { class: "kucuk soluk", style: "margin:0" }, "Gürlük farkını ölçmem için önce bir önceki adımda fısıltıyı çal."));
    if (not) kart.append(h("p", { class: "kucuk", style: "margin:0" }, not));
    sonuc.replaceChildren(kart);
    if (puanli && gecenTekrar >= tekrar) { sonuc.append(h("p", { class: "kucuk soluk", style: "margin:0" }, "Adımı geçtin. Kamışı dudaktan ayır, biraz dinlen.")); bildir(100, true); }
    else { calB.firstChild.lastChild.textContent = puanli ? "Sonraki tekrar" : "Yeniden çal"; if (puanli) bildir(Math.round((gecenTekrar / tekrar) * 100), false); else bildir(0, false); }
  }

  function perdeHaritasi(a) {
    const harita = h("div", { class: "harita", "aria-hidden": "true" });
    const c = a.centler;
    const parca = Math.max(1, Math.floor(c.length / 24));
    for (let i = 0; i < c.length; i += parca) {
      const v = c.slice(i, i + parca).reduce((x, y) => x + y, 0) / Math.min(parca, c.length - i);
      const m = Math.abs(v);
      harita.append(h("i", { style: `height:${Math.min(100, 20 + m * 1.6)}%;background:var(--${bantIcinde(v, bant) ? "iyi" : m <= bant * 2 ? "orta" : "kotu"})` }));
    }
    return harita;
  }

  return kok;
}

const ondalik = (x) => x.toFixed(1).replace(".", ",").replace("-", "−");
const isaretli = (x) => (x >= 0 ? "+" : "") + ondalik(x);

// Fısıltı (p) adımında ölçülen gürlük ve perde; hemen ardından gelen forte (f) adımı buna göre ölçülür.
const fisiltiKaydi = new Map();

// Alıştırma kipinde canlı gürlük şeridi. sinir verilirse ilk 1 sn'nin ortalaması merkez olur ve
// ±sinir dB bölgesi gösterilir (nokta bölgeden çıkarsa uyarı rengi); verilmezse mutlak düzey.
function gurlukSeridi(sinir) {
  const bolge = h("span", { class: "gs-bolge" }), nokta = h("i", { class: "gs-nokta" });
  const kok = h("div", { class: "gurluk-serit", "aria-hidden": "true" }, h("span", { class: "gs-ad" }, "Gürlük"), h("div", { class: "gs-iz" }, bolge, nokta));
  const olcek = sinir ? sinir * 2.5 : 0; // şeridin yarı genişliği (dB)
  if (sinir) { bolge.style.left = `${50 - (sinir / olcek) * 50}%`; bolge.style.width = `${(sinir / olcek) * 100}%`; } else bolge.hidden = true;
  let yum = null, ref = null, refT = [], son = 0;
  return {
    kok,
    guncelle(db, sure) {
      yum = yum == null ? db : yum * 0.8 + db * 0.2;
      if (sinir && ref == null) { refT.push(yum); if (sure >= 1) ref = refT.reduce((a, b) => a + b, 0) / refT.length; }
      const t = performance.now(); if (t - son < 50) return; son = t;
      let x;
      if (!sinir) x = ((yum + 60) / 50) * 100;
      else if (ref == null) x = 50;
      else x = 50 + ((yum - ref) / olcek) * 50;
      nokta.style.left = `${Math.max(0, Math.min(100, x))}%`;
      nokta.classList.toggle("disarida", !!sinir && ref != null && Math.abs(yum - ref) > sinir);
    },
    sifirla() { yum = null; ref = null; refT = []; },
  };
}

// Sonuç kartında gürlük eğrisi; bant verilirse ortanca ±sinir dB bölgesi taranır.
function gurlukHaritasi(egri, bant) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 100 36"); svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("class", "gurluk-harita"); svg.setAttribute("aria-hidden", "true");
  if (egri.length < 2) return svg;
  const dbler = egri.map((k) => k.db);
  let alt = Math.min(...dbler), ust = Math.max(...dbler);
  if (bant) { alt = Math.min(alt, bant.orta - bant.sinir * 1.6); ust = Math.max(ust, bant.orta + bant.sinir * 1.6); }
  if (ust - alt < 6) { const o = (ust + alt) / 2; alt = o - 3; ust = o + 3; }
  const y = (db) => 34 - ((db - alt) / (ust - alt)) * 32;
  const son = egri[egri.length - 1].t || 1;
  if (bant) {
    const r = document.createElementNS(NS, "rect");
    r.setAttribute("x", "0"); r.setAttribute("width", "100");
    r.setAttribute("y", String(y(bant.orta + bant.sinir))); r.setAttribute("height", String(y(bant.orta - bant.sinir) - y(bant.orta + bant.sinir)));
    r.setAttribute("class", "gh-bolge"); svg.append(r);
  }
  const cizgi = document.createElementNS(NS, "polyline");
  cizgi.setAttribute("points", egri.map((k) => `${((k.t / son) * 100).toFixed(2)},${y(k.db).toFixed(2)}`).join(" "));
  cizgi.setAttribute("class", "gh-cizgi"); cizgi.setAttribute("vector-effect", "non-scaling-stroke");
  svg.append(cizgi);
  return svg;
}

// Akort bilgisi: "Çalgını tanıt" ölçümü ya da ilk derslerde öğrenilen tahmin
function akortBiliniyor() { return !!ayar("tanitildi") || !!ayar("kaydirmaTahmini"); }
function ortanca(d) { const s = d.slice().sort((a, b) => a - b); return s[s.length >> 1]; }
function akortOgren(duyulanMidi, hedefYazili) {
  const k = kaydirmaKatla(Math.round(duyulanMidi) - Math.round(hedefYazili));
  duyulanMidi = Math.round(hedefYazili) + k + (duyulanMidi - Math.round(duyulanMidi)); // oktav hatası düzeltilmiş hâli
  ayarla("kaydirma", k); ayarla("kaydirmaTahmini", true);
  const sapma = Math.round((duyulanMidi - Math.round(duyulanMidi)) * 100);
  return `Sesin geldi! ${notaYazisi(hedefYazili)} parmağıyla çaldığın ses ${midiAdi(duyulanMidi).ad}${midiAdi(duyulanMidi).oktav} olarak duyuldu; çalgını buna göre ayarladım (${calgiAdi()}).` +
    (Math.abs(sapma) > 25 ? ` Ses ${sapma > 0 ? "biraz tiz" : "biraz pes"} (${sapma > 0 ? "+" : ""}${sapma} cent); şimdilik sorun değil.` : "") +
    " Kesin ölçüm için sonra Araçlar › Çalgını tanıt'ı yap.";
}
// Ne duyduğumu gösteren satır: ses seviyesi ve (göstergeli kipte) nota. Sorun ararken yardımcı olur.
function taniSatiri() {
  const kok = h("div", { class: "kucuk soluk", style: "font-family:var(--font-mono);display:flex;gap:10px;align-items:center;flex-wrap:wrap", "aria-live": "off" });
  const cubuk = h("span", { style: "display:inline-block;width:70px;height:8px;border-radius:4px;background:var(--paper-3);overflow:hidden" }, h("i", { style: "display:block;height:100%;width:0;background:var(--reed)" }));
  const yazi = h("span", null, "Duyduğum: sessizlik");
  kok.append(h("span", null, "Ses"), cubuk, yazi);
  let son = 0;
  return { kok, guncelle(o, perdeGoster) {
    const t = performance.now(); if (t - son < 120) return; son = t;
    cubuk.firstChild.style.width = Math.min(100, Math.max(0, (o.db + 60) / 50) * 100) + "%";
    if (!o.sesli) yazi.textContent = "Duyduğum: sessizlik";
    else if (o.midi == null) yazi.textContent = "Duyduğum: ses var ama perdesi net değil (hava sesi?)";
    else if (!perdeGoster) yazi.textContent = "Duyduğum: net bir ses";
    else { const a = midiAdi(o.midi - kaydirma()); const c = Math.round((o.midi - Math.round(o.midi)) * 100); yazi.textContent = `Duyduğum: ${a.ad}${a.oktav} ${c >= 0 ? "+" : ""}${c} cent`; }
  } };
}

function kontrolListesi(maddeler, tamam) {
  const k = h("div", { class: "kontrol-listesi" });
  const kutular = maddeler.map((m) => {
    const i = h("input", { type: "checkbox" });
    i.addEventListener("change", () => { if (kutular.every((x) => x.checked)) tamam(); });
    k.append(h("label", null, i, h("span", { html: m })));
    return i;
  });
  return k;
}
function sureYaz(sn) { sn = Math.ceil(sn); return `${Math.floor(sn / 60)}:${String(sn % 60).padStart(2, "0")}`; }

// "A4" → ABC (K:C, oktav: C4 = "C", C5 = "c")
export function abcNota(ad) {
  const m = /^([A-G])([#b]?)(-?\d)/.exec(ad);
  const ark = m[2] === "#" ? "^" : m[2] === "b" ? "_" : "";
  const okt = parseInt(m[3], 10);
  let harf = okt >= 5 ? m[1].toLowerCase() : m[1];
  if (okt > 5) harf += "'".repeat(okt - 5);
  if (okt < 4) harf += ",".repeat(4 - okt);
  return ark + harf;
}
