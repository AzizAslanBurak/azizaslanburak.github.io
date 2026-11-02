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
        const b = h("button", { class: "vurgu" }, "▶︎ Dinle");
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
      kok.append(uzunSes(adim, bildir, temizlik));
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
      const kagit = h("div"); kok.append(kagit);
      window.ABCJS.renderAbc(kagit, desenAbc(d.desen, d.olcu), { responsive: "resize", staffwidth: 500, paddingtop: 0, paddingbottom: 0 });
      const durumEl = h("div", { class: "kucuk soluk", "aria-live": "polite" });
      const sonucAlan = h("div");
      const dinle = h("button", { class: "ikincil", onclick: () => desenCal(d.desen, d.bpm, adim.nota || "A4") }, "▶︎ Dinle");
      const test = h("button", { class: "vurgu" }, "Ritmi çal");
      test.addEventListener("click", () => mikrofonGerekli(sonucAlan, async () => {
        test.disabled = true; sonucAlan.replaceChildren(); await saymaYukle();
        const olcuVurus = d.olcu.endsWith("/8") ? Math.max(2, Math.round(parseInt(d.olcu) / 2)) : parseInt(d.olcu);
        const s = await ritimTesti({ desen: d.desen, bpm: d.bpm, olcuVurus, olcu: d.olcu, bant: adim.bant || ritimBandi() }, { durumda: (x) => (durumEl.textContent = x.evre === "sayim" ? `Sayım: ${x.vurus}` : "Çal!") });
        test.disabled = false; durumEl.textContent = "";
        sonucAlan.append(sonucKutusu(s));
        bildir(s.puan, s.puan >= (adim.gecme || 70));
      }));
      kok.append(h("div", { class: "satir" }, dinle, test, h("span", { class: "kucuk soluk" }, `${d.bpm} vuruş/dk`)), durumEl, sonucAlan);
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
      const basB = h("button", { class: "vurgu" }, "Başla");
      const tekrarB = h("button", { class: "ikincil", disabled: true }, "Tekrar dinle");
      const alan = h("div");
      kok.append(durumEl, h("div", { class: "satir" }, basB, tekrarB), alan);
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
      const b = h("button", { class: "vurgu" }, "Başla");
      kok.append(sayacEl, cubuk, h("p", { class: "kucuk soluk" }, "Süre yalnızca sen çalarken (ben ses duyarken) ilerler."), b, alan);
      b.addEventListener("click", () => mikrofonGerekli(alan, () => {
        if (basladi) return; basladi = true; b.hidden = true;
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

// Uzun ses: "Alıştırma" göstergeli ve puansız; "Sınav" kör (çalarken perde gösterilmez), sonunda önce
// öz-tahmin ister, sonra nota-nota bilgi verir. Geçiş: tutuşun ≥%80'i bantta, istenen sayıda tekrar.
function uzunSes(adim, bildir, temizlik) {
  const kok = h("div", { class: "yigin" });
  const hedef = notaMidi(adim.nota), saniye = adim.saniye || 4, tekrar = adim.tekrar || 3;
  const bant = adim.tolerans || perdeBandi();
  const korMu = adim.kor !== false;
  const ust = h("div", { class: "satir" },
    h("button", { class: "ikincil", onclick: () => notaCal(hedef + kaydirma(), Math.min(saniye, 3)) }, "Hedef sesi dinle"));
  if (adim.dem) {
    const demB = h("button", { class: "ikincil", "aria-pressed": "false" }, "Dem");
    const demNota = adim.dem === true ? hedef - 12 : notaMidi(adim.dem);
    demB.addEventListener("click", () => { const a = demB.getAttribute("aria-pressed") === "true"; demB.setAttribute("aria-pressed", String(!a)); if (a) demDurdur(); else demBaslat(demNota + kaydirma()); });
    ust.append(demB); temizlik.push(() => demDurdur());
  }
  const kart = parmakKarti(adim.nota, { aciklama: false });
  kok.append(h("div", { class: "satir", style: "align-items:flex-start" }, kart,
    h("div", { class: "ara yigin", style: "gap:8px" },
      h("p", { style: "margin:0" }, `${notaYazisi(adim.nota)} notasını ${saniye} saniye tut, ${tekrar} kez. Bant: ±${bant} cent.`), ust)));

  const sekmeler = h("div", { class: "satir" });
  const alistirB = h("button", { class: "ikincil", "aria-pressed": korMu ? "false" : "true" }, "Alıştırma (göstergeli)");
  const sinavB = korMu ? h("button", { class: "ikincil", "aria-pressed": "true" }, "Sınav (kör)") : null;
  sekmeler.append(alistirB, sinavB);
  const alan = h("div", { class: "yigin" });
  kok.append(sekmeler, alan);

  let gecenTekrar = 0, aktif = null;
  function kapat() { if (aktif) { aktif(); aktif = null; } }
  temizlik.push(kapat);

  function alistirma(puanli) {
    kapat(); alan.replaceChildren();
    alistirB.setAttribute("aria-pressed", "true"); if (sinavB) sinavB.setAttribute("aria-pressed", "false");
    const cubuk = h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" }));
    const bilgi = h("p", { class: "kucuk soluk", "aria-live": "polite" }, !akortBiliniyor()
      ? `Çalgının akordunu henüz bilmiyorum. Şimdilik yalnızca sesin ${saniye} saniye sabit kalmasına bakıyorum; göstergedeki nota adı yanlış olabilir, aldırma.`
      : puanli ? `Göstergeye bakarak tut. ${tekrar} kez.` : "Göstergeye bakarak sesi oturt. Bu kısım puanlanmaz; hazır hissedince Sınav'a geç.");
    let tutulan = 0, kopma = 0, sonZ = null, yapilan = 0, tutus = [];
    const tani = taniSatiri();
    const g = new AkortGostergesi({ hedef: akortBiliniyor() ? hedef : null, tolerans: bant, olayda: (o, hs) => {
      const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
      tani.guncelle(o, true);
      let icinde;
      if (akortBiliniyor()) icinde = hs && !hs.oktavFark && bantIcinde(hs.cent, bant);
      else {
        // Akort henüz bilinmiyor: hangi nota olduğuna değil, sesin sabit kalmasına bak
        icinde = o.midi != null && (!tutus.length || Math.abs(o.midi - ortanca(tutus)) * 100 <= bant);
        if (icinde) tutus.push(o.midi);
      }
      if (icinde) { tutulan += dt; kopma = 0; } else { kopma += dt; if (kopma > 0.5) { tutulan = 0; tutus = []; } }
      cubuk.firstChild.style.width = Math.min(100, (tutulan / saniye) * 100) + "%";
      if (tutulan >= saniye) {
        if (!akortBiliniyor() && tutus.length) { bilgi.textContent = akortOgren(ortanca(tutus), hedef); g.hedefAyarla(hedef); tutus = []; tutulan = 0; yapilan++; if (puanli && yapilan >= tekrar) bildir(100, true); return; }
        tutulan = 0; yapilan++;
        bilgi.textContent = puanli ? (yapilan >= tekrar ? "Tamam, bu adımı geçtin." : `${yapilan}/${tekrar}. Nefes al, sonra devam.`) : `${saniye} saniye bantta tuttun. Bir kez daha, ya da Sınav'a geç.`;
        if (puanli && yapilan >= tekrar) bildir(100, true);
      }
    } });
    mikrofonGerekli(alan, () => { g.baslat(); aktif = () => g.durdur(); alan.append(cubuk, tani.kok, bilgi, g.kok); });
  }

  function sinav() {
    kapat(); alan.replaceChildren();
    alistirB.setAttribute("aria-pressed", "false"); sinavB.setAttribute("aria-pressed", "true");
    const sayac = h("div", { class: "olcum" });
    const sayacCiz = () => sayac.replaceChildren(h("div", null, h("b", null, `${gecenTekrar}/${tekrar}`), h("span", null, "geçen tekrar")));
    sayacCiz();
    const yonerge = h("p", { "aria-live": "polite" }, "Göstergeyi kapattım; kulağına ve deme güven. Hazır olunca başla ve sesi tut.");
    const cubuk = h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" }));
    const basB = h("button", { class: "vurgu" }, "Başla");
    const sonuc = h("div");
    const tani = taniSatiri();
    alan.append(sayac, yonerge, cubuk, tani.kok, basB, sonuc);
    basB.addEventListener("click", () => mikrofonGerekli(sonuc, () => {
      basB.hidden = true; sonuc.replaceChildren();
      yonerge.textContent = `Çal ve ${saniye} saniye tut…`;
      let sure = 0, kopma = 0, sonZ = null; const centler = [], hamlar = [];
      const bitir = mik.abone((o) => {
        const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
        tani.guncelle(o, false);
        const biliniyor = akortBiliniyor();
        const yakin = o.midi != null && (biliniyor ? Math.abs(o.midi - kaydirma() - hedef) < 1.5 : (!hamlar.length || Math.abs(o.midi - ortanca(hamlar)) < 1.5));
        if (yakin) { sure += dt; kopma = 0; hamlar.push(o.midi); if (biliniyor) centler.push((o.midi - kaydirma() - hedef) * 100); }
        else if (sure > 0) { kopma += dt; if (kopma > 0.5 && sure < saniye) { sure = 0; centler.length = 0; hamlar.length = 0; } }
        cubuk.firstChild.style.width = Math.min(100, (sure / saniye) * 100) + "%";
        if (sure >= saniye) {
          bitir(); aktif = null;
          if (!biliniyor) { const not = akortOgren(ortanca(hamlar), hedef); hamlar.forEach((m) => centler.push((m - kaydirma() - hedef) * 100)); sonuc.append(h("p", { class: "kucuk" }, not)); }
          tahminSor(centler);
        }
      });
      aktif = bitir;
    }));
    function tahminSor(centler) {
      const ort = centler.reduce((a, b) => a + b, 0) / centler.length;
      const sd = Math.sqrt(centler.reduce((a, b) => a + (b - ort) ** 2, 0) / centler.length);
      const oran = centler.filter((c) => bantIcinde(c, bant)).length / centler.length;
      const gercek = Math.abs(ort) <= bant / 2 ? "tam" : ort > 0 ? "tiz" : "pes";
      yonerge.textContent = "Sence nasıldı? Önce sen söyle:";
      const secenekler = h("div", { class: "satir" });
      [["pes", "Pes kaldı"], ["tam", "Tam yerindeydi"], ["tiz", "Tiz kaçtı"]].forEach(([k, ad]) => secenekler.append(h("button", { class: "ikincil", onclick: () => goster(k) }, ad)));
      sonuc.append(secenekler);
      function goster(tahmin) {
        tahminKaydet(tahmin === gercek);
        const gecti = oran >= 0.8;
        if (gecti) gecenTekrar++;
        const iyi = sd < 10 ? "Sesin çok sabitti." : oran >= 0.8 ? "Sesi bantta tuttun." : centler.length ? "Sesi sonuna kadar götürdün." : "";
        const duzeltme = gecti ? (Math.abs(ort) > bant / 2 ? (ort > 0 ? "Bir sonrakinde kamışı biraz daha az sık; ses hafif tiz." : "Bir sonrakinde nefes desteğini artır; ses hafif pes.") : (sd > 15 ? "Sesi daha da sabitlemek için nefesi karından eşit ver." : "Böyle devam."))
          : (sd > 20 ? "Ses dalgalanıyor: nefesi karından, eşit akıt; dudak basıncını değiştirme." : ort > 0 ? "Ses tiz kaldı: kamışı daha az sık, dudakları gevşet." : "Ses pes kaldı: nefes desteğini artır, kamışı çok az daha sık.");
        sonuc.replaceChildren(h("div", { class: "degerlendirme " + (gecti ? "iyi" : oran >= 0.5 ? "orta" : "kotu") },
          h("div", { class: "baslik" }, gecti ? "Geçti" : "Bir daha"),
          h("div", { class: "olcum" },
            h("div", null, h("b", null, `${ort > 0 ? "+" : ""}${Math.round(ort)}`), h("span", null, "ortalama sapma (cent)")),
            h("div", null, h("b", null, `±${Math.round(sd)}`), h("span", null, "kararlılık (cent)")),
            h("div", null, h("b", null, `%${Math.round(oran * 100)}`), h("span", null, `bantta (±${bant})`))),
          h("p", { style: "margin:0" }, `Tahminin: ${tahmin === gercek ? "doğru" : "yanlış"} (ses ${gercek === "tam" ? "tam yerindeydi" : gercek === "tiz" ? "tizdi" : "pesti"}). ${iyi} ${duzeltme}`)));
        sayacCiz();
        if (gecenTekrar >= tekrar) { yonerge.textContent = "Sınavı geçtin. Kamışı dudaktan ayır, biraz dinlen."; bildir(100, true); }
        else { yonerge.textContent = "Nefes al, dudaklarını dinlendir, sonra tekrar."; basB.hidden = false; basB.textContent = "Sonraki tekrar"; }
        if (gecenTekrar < tekrar) bildir(Math.round((gecenTekrar / tekrar) * 100), false);
      }
    }
  }
  alistirB.addEventListener("click", () => alistirma(!korMu));
  if (sinavB) sinavB.addEventListener("click", sinav);
  if (korMu) sinav(); else alistirma(true);
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
