// Ders motoru: ders adımlarını çizer ve dinleyerek denetler.
// Adım türleri ve alanları için DERS_YAZIM_KILAVUZU.md dosyasına bak.
import * as mik from "./mikrofon.js";
import { ac, notaCal, demBaslat, demDurdur, saymaYukle } from "./ses.js";
import { notaMidi, midiAdi } from "./perde.js";
import { h, mikrofonGerekli, kaydirma, kaydirmaKatla, notaYazisi, calgiAdi } from "./ortak.js";
import { ayar, ayarla } from "./depo.js";
import { AkortGostergesi } from "./akort-gosterge.js";
import { parmakKarti } from "./parmak.js";
import { notaKagidi, hepsiniDurdur } from "./nota.js";
import { ritimTesti, desenAbc, desenCal } from "./ritim.js";
import { sonucKutusu } from "./ekranlar.js";
import { kaydedici } from "./kayit.js";
import { CIZIMLER } from "./cizimler.js";
import { ikon, segment, sahneAc, durumEl, halka } from "./arayuz.js";
import { perdeBandi, bantIcinde, ritimBandi, tahminKaydet } from "./ilerleme.js";

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
        b.addEventListener("click", () => {
          const c = ac(); let t = 0; const sure = adim.notaSure || 1.2;
          adim.notalar.forEach((n) => { setTimeout(() => notaCal(notaMidi(n) + kaydirma(), sure * 0.95), t * 1000); t += sure; });
        });
        kok.append(b);
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
      window.ABCJS.renderAbc(kagit, desenAbc(d.desen, d.olcu), { responsive: "resize", add_classes: true, staffwidth: 500, paddingtop: 0, paddingbottom: 0 });
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
      kok.append(h("div", { class: "nota" }, kagit), dinle, test, durumEl, sonucAlan);
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
      h("div", { class: "kucuk soluk" }, `Bant ±${bant} cent`),
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
    let gosterge = null;
    const icerik = [];
    if (kip === "sinav") icerik.push(h("div", { class: "sahne-nota" }, notaYazisi(adim.nota)), halkaEl, durum);
    else { gosterge = new AkortGostergesi({ hedef: akortBiliniyor() ? hedef : null, tolerans: bant, parmak: false, iz: false, sahne: true }); icerik.push(gosterge.kok, halkaEl); }
    let bitti = false;
    const s = sahneAc({ ust: `Tekrar ${Math.min(gecenTekrar + 1, tekrar)} / ${tekrar}`, sagUst: h("span", { class: "kayit" }, "DİNLİYORUM"), icerik, bitince: () => { if (!bitti) bitir(); } });
    aktifSahne = s;
    let sure = 0, kopma = 0, sonZ = null; const centler = [], hamlar = [];
    const tum = [];
    const dinle = mik.abone((o) => {
      const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
      const biliniyor = akortBiliniyor();
      const yakin = o.midi != null && (biliniyor ? Math.abs(o.midi - kaydirma() - hedef) < 1.5 : (!hamlar.length || Math.abs(o.midi - ortanca(hamlar)) < 1.5));
      if (yakin) { sure += dt; kopma = 0; hamlar.push(o.midi); if (biliniyor) centler.push((o.midi - kaydirma() - hedef) * 100); }
      else if (sure > 0) { kopma += dt; if (kopma > 0.5 && sure < saniye) { sure = 0; centler.length = 0; hamlar.length = 0; } }
      if (kip === "sinav") durum.ayarla("bos", o.midi != null ? "Ses geliyor" : o.sesli ? "Ses var, perdesi net değil" : "Dinliyorum");
      halkaEl.ayarla(sure / saniye, String(Math.max(0, Math.ceil(saniye - sure))));
      if (sure >= saniye && !bitti) { bitti = true; s.kapat("tamam"); bitir(true); }
    });
    if (gosterge) gosterge.baslat();
    function bitir(tamam) {
      dinle(); if (gosterge) gosterge.durdur(); aktifSahne = null;
      if (!tamam) { sonuc.replaceChildren(h("p", { class: "kucuk soluk", style: "margin:0" }, "Durdurdun. Hazır olunca yeniden \"Çal\"a dokun.")); return; }
      let not = null;
      if (!akortBiliniyor()) { not = akortOgren(ortanca(hamlar), hedef); hamlar.forEach((m) => centler.push((m - kaydirma() - hedef) * 100)); }
      if (kip === "sinav") tahminSor(centler, not); else goster(centler, null, not);
    }
  }

  function tahminSor(centler, not) {
    sonuc.replaceChildren(h("div", { class: "kart yigin-s" },
      h("h3", null, "Sence nasıldı?"),
      h("p", { class: "kucuk soluk", style: "margin:0" }, "Önce sen söyle, sonra ben göstereyim. Tahminlerin kulak puanına yazılır."),
      h("div", { class: "segment" }, ...[["pes", "Pes kaldı"], ["tam", "Tam yerinde"], ["tiz", "Tiz kaçtı"]].map(([k, ad]) => h("button", { onclick: () => goster(centler, k, not) }, ad)))));
  }

  function goster(centler, tahmin, not) {
    const ort = centler.reduce((a, b) => a + b, 0) / Math.max(1, centler.length);
    const sd = Math.sqrt(centler.reduce((a, b) => a + (b - ort) ** 2, 0) / Math.max(1, centler.length));
    const oran = centler.filter((c) => bantIcinde(c, bant)).length / Math.max(1, centler.length);
    const gercek = Math.abs(ort) <= bant / 2 ? "tam" : ort > 0 ? "tiz" : "pes";
    if (tahmin) tahminKaydet(tahmin === gercek);
    const puanli = kip === "sinav" || !korMu;
    const gecti = puanli && oran >= 0.8;
    if (gecti) gecenTekrar++;
    sayac.textContent = `${gecenTekrar}/${tekrar}`;
    const enIyi = sd < 10 ? `Ses çok sabitti (±${Math.round(sd)} cent).` : oran >= 0.8 ? `Sürenin %${Math.round(oran * 100)}'i bantta kaldı.` : "Sesi sonuna kadar götürdün.";
    const duzeltme = gecti
      ? (Math.abs(ort) > bant / 2 ? (ort > 0 ? "Ses hafif tiz; kamışı biraz daha az sık." : "Ses hafif pes; nefes desteğini biraz artır.") : sd > 15 ? "Nefesi karından eşit ver; ses daha da sabitlenir." : "Böyle devam.")
      : (sd > 20 ? "Ses dalgalanıyor: nefesi eşit akıt, dudak basıncını değiştirme." : ort > 0 ? "Ses tiz kaldı: kamışı daha az sık, dudakları gevşet." : "Ses pes kaldı: nefes desteğini artır, kamışı çok az daha sık.");
    const harita = h("div", { style: "display:flex;align-items:flex-end;gap:2px;height:36px", "aria-hidden": "true" });
    const parca = Math.max(1, Math.floor(centler.length / 24));
    for (let i = 0; i < centler.length; i += parca) {
      const c = centler.slice(i, i + parca).reduce((a, b) => a + b, 0) / Math.min(parca, centler.length - i);
      const a = Math.abs(c);
      harita.append(h("i", { style: `flex:1;border-radius:2px;height:${Math.min(100, 20 + a * 1.6)}%;background:var(--${bantIcinde(c, bant) ? "iyi" : a <= bant * 2 ? "orta" : "kotu"})` }));
    }
    const kart = h("div", { class: "degerlendirme " + (gecti ? "iyi" : !puanli ? "" : oran >= 0.5 ? "orta" : "kotu") },
      h("div", { class: "baslik" }, gecti ? ikon("onay") : null, !puanli ? "Alıştırma bitti" : gecti ? `Geçtin · ${gecenTekrar}/${tekrar}` : "Bir daha"),
      tahmin ? h("p", { style: "margin:0" }, `Tahminin ${tahmin === gercek ? "doğru" : "yanlış"}: ses ${gercek === "tam" ? "tam yerindeydi" : gercek === "tiz" ? "tizdi" : "pesti"}.`) : null,
      h("div", { class: "satir-bilgi" }, h("b", null, "En iyi"), h("span", null, enIyi)),
      h("div", { class: "satir-bilgi" }, h("b", null, "Tek düzeltme"), h("span", null, duzeltme)),
      h("div", { class: "olcum" },
        h("div", null, h("b", null, `%${Math.round(oran * 100)}`), h("span", null, `bantta (±${bant})`)),
        h("div", null, h("b", null, `±${Math.round(sd)} c`), h("span", null, "kararlılık")),
        h("div", null, h("b", null, `${ort > 0 ? "+" : ""}${Math.round(ort)} c`), h("span", null, "ortalama"))),
      harita);
    if (not) kart.append(h("p", { class: "kucuk", style: "margin:0" }, not));
    sonuc.replaceChildren(kart);
    if (puanli && gecenTekrar >= tekrar) { sonuc.append(h("p", { class: "kucuk soluk", style: "margin:0" }, "Adımı geçtin. Kamışı dudaktan ayır, biraz dinlen.")); bildir(100, true); }
    else { calB.firstChild.lastChild.textContent = puanli ? "Sonraki tekrar" : "Yeniden çal"; if (puanli) bildir(Math.round((gecenTekrar / tekrar) * 100), false); else bildir(0, false); }
  }
  return kok;
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
