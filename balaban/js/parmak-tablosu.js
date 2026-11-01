// Parmak tabloları. Dizgi: "A|12345678" — '|' öncesi arka baş parmak deliği (A), sonrası ön delikler
// yukarıdan (kamışa en yakın) aşağı 1–8. ● kapalı, ◐ yarım, ○ açık. Sol el 1–4, sağ el 5–8.
// Nota adları THM yazımıyla verilir: bütün delikler kapalı = La4 (portede 2. aralık; Eren'in "1. oktav La"sı).
// La balabanda gerçek ses bir oktav pestir. Duyulan ses = yazılı + kaydırma (ölçülür).
//
// Kaynaklar (araştırma notu 02, §2.3–2.5):
//  - Balaban: Eren, Z. (2020) "Balaban Çalgısı İçin Bir Etüt Önerisi", idil 9(67), Resim 11.
//  - Düdük: duduk.com SSS, ru/en.wikipedia, Bleth; Do-duduk yazımı. Yeniden kurulmuş tablo.
// İki çalgı Do5–La5 arasında aynı parmakları kullanır; fark en alt deliklerde ve en üst notalardadır.
import { depo } from "./depo.js";

export const ELLER_ARASI = 4;

const BALABAN = [
  { nota: "A4", delikler: "●|●●●●●●●●", not: "8 parmak kapalı" },
  { nota: "Bb4", delikler: "●|●●●●●●●○" },
  { nota: "B4", delikler: "●|●●●●●●◐○", not: "7. delik yarım" },
  { nota: "C5", delikler: "●|●●●●●●○○" },
  { nota: "C#5", delikler: "●|●●●●●◐○○", not: "6. delik yarım" },
  { nota: "D5", delikler: "●|●●●●●○○○" },
  { nota: "Eb5", delikler: "●|●●●●◐○○○", not: "5. delik yarım" },
  { nota: "E5", delikler: "●|●●●●○○○○", not: "sol el kapalı" },
  { nota: "F5", delikler: "●|●●●○○○○○", not: "ilk ses" },
  { nota: "F#5", delikler: "●|●●◐○○○○○", not: "3. delik yarım" },
  { nota: "G5", delikler: "●|●●○○○○○○" },
  { nota: "G#5", delikler: "●|●◐○○○○○○", not: "2. delik yarım" },
  { nota: "A5", delikler: "●|●○○○○○○○" },
  { nota: "Bb5", delikler: "◐|○○○○○○○○", not: "baş parmak yarım; kamışa göre değişir" },
  { nota: "B5", delikler: "●|○●●●●○○○", not: "çatal parmak; dudakla düzelt" },
  { nota: "C6", delikler: "○|○○○○○○○○", not: "hepsi açık, dudakla" },
];

const DUDUK = [
  { nota: "A4", delikler: "●|●●●●●●●●", not: "8 parmak kapalı" },
  { nota: "Bb4", delikler: "●|●●●●●●●◐", not: "8. delik yarım" },
  { nota: "B4", delikler: "●|●●●●●●●○" },
  { nota: "C5", delikler: "●|●●●●●●○○" },
  { nota: "C#5", delikler: "●|●●●●●◐○○", not: "6. delik yarım" },
  { nota: "D5", delikler: "●|●●●●●○○○" },
  { nota: "Eb5", delikler: "●|●●●●◐○○○", not: "5. delik yarım" },
  { nota: "E5", delikler: "●|●●●●○○○○", not: "sol el kapalı" },
  { nota: "F5", delikler: "●|●●●○○○○○", not: "ilk ses" },
  { nota: "F#5", delikler: "●|●●◐○○○○○", not: "3. delik yarım" },
  { nota: "G5", delikler: "●|●●○○○○○○" },
  { nota: "G#5", delikler: "●|●◐○○○○○○", not: "2. delik yarım" },
  { nota: "A5", delikler: "●|●○○○○○○○" },
  { nota: "Bb5", delikler: "●|◐○○○○○○○", not: "1. delik yarım" },
  { nota: "B5", delikler: "●|○○○○○○○○", not: "yalnız baş parmak" },
  { nota: "C6", delikler: "○|○○○○○○○○", not: "hepsi açık" },
  { nota: "D6", delikler: "○|○○○○○○○○", not: "hepsi açık, dudak sıkarak" },
];

export const CALGILAR = {
  balaban: { ad: "Balaban", aciklama: "Türk / Azerbaycan balabanı: en alttaki delik yarım ses verir.", tablo: BALABAN, varsayilanKaydirma: -12 },
  duduk: { ad: "Düdük (duduk)", aciklama: "Ermeni düdüğü: en alttaki delik tam ses verir.", tablo: DUDUK, varsayilanKaydirma: -15 },
};

// Canlı görünüm: ayar değişince güncel tabloyu verir
export const TABLO = new Proxy([], {
  get(_, k) {
    const tur = (depo().ayarlar && depo().ayarlar.calgi) || "balaban";
    const t = CALGILAR[tur].tablo;
    const v = t[k];
    return typeof v === "function" ? v.bind(t) : v;
  },
});
