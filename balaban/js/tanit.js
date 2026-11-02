// "Çalgını tanıt": bütün delikler kapalı sesi ölçüp akordu, en alt deliğin aralığına bakıp çalgı türünü bulur.
import * as mik from "./mikrofon.js";
import { midiAdi } from "./perde.js";
import { h, mikrofonGerekli, calgiAdi, kaydirmaKatla } from "./ortak.js";
import { ayar, ayarla } from "./depo.js";
import { semaCiz } from "./parmak.js";
import { ustCubuk } from "./arayuz.js";
import { CALGILAR } from "./parmak-tablosu.js";

// Bir sesi dinleyip kararlı perdenin medyanını döndürür (sure saniye kararlı ses bekler)
function sesOlc(sure, durumda) {
  return new Promise((coz) => {
    const olcum = []; let sonZ = null, kararli = 0;
    const bitir = mik.abone((o) => {
      const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
      if (o.midi == null) { kararli = Math.max(0, kararli - dt); return; }
      olcum.push(o.midi); if (olcum.length > 200) olcum.shift();
      const son = olcum.slice(-10); const ort = son.reduce((a, b) => a + b, 0) / son.length;
      if (son.every((m) => Math.abs(m - ort) < 0.3)) kararli += dt; else kararli = 0;
      durumda && durumda(Math.min(1, kararli / sure));
      if (kararli >= sure) { bitir(); const s = olcum.slice(-40).sort((a, b) => a - b); coz(s[s.length >> 1]); }
    });
  });
}

export function tanitEkrani(kok) {
  const temizlik = [];
  const govde = h("div", { class: "yigin" });
  kok.append(ustCubuk({ geri: { href: "#ayarlar", ad: "Ayarlar" }, baslik: "Çalgını tanıt" }),
    h("div", { class: "yigin" },
      h("p", { class: "soluk", style: "margin:0" }, "Her balaban ve düdük farklı akortta yapılır. İki kısa sesle akordunu ve parmak düzenini bulayım; akort ve dersler senin çalgına göre çalışsın. Kamışın hazır olsun: nemli ve hafif açık."),
      govde));

  let tumKapali = null;
  function adim1() {
    govde.replaceChildren();
    const cubuk = h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" }));
    const yazi = h("p", { "aria-live": "polite" }, "Bütün delikleri kapat (arka delik dahil) ve rahat, sabit bir ses çal. 2 saniye tut.");
    govde.append(h("div", { class: "satir", style: "align-items:flex-start;gap:18px" }, h("div", { class: "parmak buyuk" }, semaCiz("●|●●●●●●●●")),
      h("div", { class: "ara yigin" }, h("h3", null, "1. Bütün delikler kapalı"), yazi, cubuk)));
    mikrofonGerekli(govde, async () => {
      const m = await sesOlc(2, (o) => (cubuk.firstChild.style.width = o * 100 + "%"));
      tumKapali = m;
      const a = midiAdi(m), cent = Math.round((m - Math.round(m)) * 100);
      yazi.textContent = `Duydum: ${a.ad}${a.oktav}${Math.abs(cent) > 5 ? ` (${cent > 0 ? "+" : ""}${cent} cent)` : ""}.`;
      setTimeout(adim2, 900);
    });
  }
  function adim2() {
    const cubuk = h("div", { class: "ilerleme-cubugu" }, h("i", { style: "width:0%" }));
    const yazi = h("p", { "aria-live": "polite" }, "Şimdi yalnızca en alttaki deliği (sağ serçe parmak, 8. delik) aç ve yine 2 saniye çal.");
    govde.append(h("div", { class: "satir", style: "align-items:flex-start;gap:18px" }, h("div", { class: "parmak buyuk" }, semaCiz("●|●●●●●●●○")),
      h("div", { class: "ara yigin" }, h("h3", null, "2. En alt delik açık"), yazi, cubuk)));
    sesOlc(2, (o) => (cubuk.firstChild.style.width = o * 100 + "%")).then((m) => {
      let aralik = (m - tumKapali) * 100;
      aralik = ((aralik % 1200) + 1800) % 1200 - 600; // ölçümlerden biri oktav şaşırdıysa aralığı katla
      yazi.textContent = `Aralık: ${Math.round(aralik)} cent.`;
      sonuc(aralik);
    });
  }
  function sonuc(aralik) {
    let tur = null;
    if (aralik > 50 && aralik < 150) tur = "balaban";
    else if (aralik >= 150 && aralik < 260) tur = "duduk";
    const kayma = kaydirmaKatla(Math.round(tumKapali) - 69); // yazılı La4 → duyulan; oktav hatasına karşı katlanır
    tumKapali = 69 + kayma + (tumKapali - Math.round(tumKapali));
    const sapma = Math.round((tumKapali - Math.round(tumKapali)) * 100);
    if (!tur) {
      govde.append(h("div", { class: "degerlendirme orta" }, h("div", { class: "baslik" }, "Emin olamadım"),
        h("p", { style: "margin:0" }, "İki ses arasındaki aralık beklediğim gibi değil. Deliklerin tam kapandığından emin ol (parmak uçlarıyla değil, parmağın etli yastığıyla) ve tekrar dene."),
        h("button", { class: "vurgu", onclick: adim1 }, "Tekrar dene")));
      return;
    }
    ayarla("calgi", tur); ayarla("kaydirma", kayma); ayarla("tanitildi", true); ayarla("kaydirmaTahmini", false);
    const kutu = h("div", { class: "degerlendirme iyi" }, h("div", { class: "baslik" }, `Senin çalgın: ${calgiAdi()}`),
      h("p", { style: "margin:0" }, `${CALGILAR[tur].aciklama} Bütün delikler kapalıyken ${midiAdi(tumKapali).ad} sesi çıkıyor. Parmak tablosu ve dersler artık buna göre.`));
    if (Math.abs(sapma) > 20) kutu.append(h("p", { style: "margin:0" }, `Not: çalgın eşit akorttan ${sapma > 0 ? "+" : ""}${sapma} cent sapıyor. Kıskacı kamışın ucuna doğru 1 mm itmek sesi tizleştirir, dibe doğru çekmek pesleştirir. İstersen ayarlayıp yeniden ölç.`));
    kutu.append(h("div", { class: "satir" }, h("a", { class: "dugme birincil", href: "#bugun" }, "Tamam"), h("button", { class: "ikincil", onclick: adim1 }, "Yeniden ölç")));
    govde.append(kutu);
  }
  adim1();
  return () => temizlik.forEach((f) => f());
}
