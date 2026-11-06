// Uzun ses çözümlemesi: perde (cent), gürlük (dB) ve başlangıç ölçüleri.
// Girdi: tutuş boyunca ses duyulan anlar [{ t (sn), c (cent, hedefe göre), db }].
// Saf işlev; ekrana bağlı değildir (araclar/ altında sınanabilir).
import { bantIcinde } from "./ilerleme.js";

const KUTU = 0.1; // gürlük eğrisi için 100 ms'lik kutular
const OTURMA_PENCERE = 0.25; // ses bu kadar süre kesintisiz bantta kalınca "oturdu" sayılır

const ortalama = (d) => d.reduce((a, b) => a + b, 0) / Math.max(1, d.length);
const sapma = (d) => { const o = ortalama(d); return Math.sqrt(d.reduce((a, b) => a + (b - o) ** 2, 0) / Math.max(1, d.length)); };
const ortanca = (d) => { const s = d.slice().sort((a, b) => a - b); return s.length ? s[s.length >> 1] : 0; };

// 100 ms kutularda ortalama dB (çerçeve titreşimini süzer)
export function gurlukEgrisi(ornekler) {
  if (!ornekler.length) return [];
  const t0 = ornekler[0].t, kutular = [];
  for (const o of ornekler) {
    const i = Math.floor((o.t - t0) / KUTU);
    (kutular[i] ||= []).push(o.db);
  }
  return kutular.map((k, i) => ({ t: i * KUTU, db: k ? ortalama(k) : null })).filter((k) => k.db != null);
}

// Sesin banda oturduğu an (tutuş başına göre sn); hiç oturmadıysa null
function oturmaAni(ornekler, bant) {
  if (!ornekler.length) return null;
  const t0 = ornekler[0].t;
  for (let i = 0; i < ornekler.length; i++) {
    if (!bantIcinde(ornekler[i].c, bant)) continue;
    let j = i, tamam = true;
    while (j < ornekler.length && ornekler[j].t - ornekler[i].t < OTURMA_PENCERE) {
      if (!bantIcinde(ornekler[j].c, bant)) { tamam = false; break; }
      j++;
    }
    if (tamam) return { an: ornekler[i].t - t0, i }; // pencere tutuşun sonuna taşsa da oturmuş say
  }
  return null;
}

export function uzunSesAnaliz(ornekler, { bant, gurluk } = {}) {
  const centler = ornekler.map((o) => o.c);
  const oran = centler.filter((c) => bantIcinde(c, bant)).length / Math.max(1, centler.length);
  const otur = oturmaAni(ornekler, bant);
  // Kararlılık ve ortalama oturduktan sonrasına bakar: başlangıçtaki kayma ayrıca ölçülür.
  const govde = otur ? ornekler.slice(otur.i) : ornekler;
  const gc = govde.map((o) => o.c);
  const ort = ortalama(gc), sd = sapma(gc);
  const bas = otur && otur.i > 0 ? ornekler.slice(0, otur.i).map((o) => o.c) : [];
  const basSapma = bas.length ? ortalama(bas) : 0;

  const egri = gurlukEgrisi(ornekler);
  const t1 = ornekler.length ? ornekler[ornekler.length - 1].t - ornekler[0].t : 0;
  const oturmaT = otur ? otur.an : 0;
  // Gürlük sabitliği: oturduktan sonra, son kutu hariç (tutuş biterken kesilir)
  const govdeEgri = egri.filter((k) => k.t >= oturmaT && k.t < t1 - KUTU);
  const gucDizi = (govdeEgri.length >= 3 ? govdeEgri : egri).map((k) => k.db);
  const gucSd = sapma(gucDizi);
  const gucOrt = ortanca(gucDizi);
  const uc = Math.max(1, Math.floor(gucDizi.length / 3));
  const gucDusus = gucDizi.length >= 6 ? ortalama(gucDizi.slice(-uc)) - ortalama(gucDizi.slice(0, uc)) : 0;

  const sonuc = { centler, oran, ort, sd, oturma: otur ? otur.an : null, basSapma, egri, gucSd, gucOrt, gucDusus, sure: t1 };

  if (gurluk === "kis-ac" && egri.length >= 6) {
    // 3 kutuluk kayan ortalamayla tepe ara
    const yumusak = egri.map((k, i) => ortalama(egri.slice(Math.max(0, i - 1), i + 2).map((x) => x.db)));
    let tepe = 0;
    yumusak.forEach((v, i) => { if (v > yumusak[tepe]) tepe = i; });
    const kenar = Math.max(1, Math.round(egri.length * 0.15));
    const basDb = ortalama(yumusak.slice(0, kenar)), sonDb = ortalama(yumusak.slice(-kenar));
    const tepeT = egri[tepe].t;
    // Perde kayması: gür bölgede (tepe ±%15) ortalama cent − kısık uçlarda ortalama cent
    const genis = t1 * 0.15;
    const gurC = ornekler.filter((o) => Math.abs(o.t - ornekler[0].t - tepeT) <= genis).map((o) => o.c);
    const kisikC = ornekler.filter((o) => { const t = o.t - ornekler[0].t; return t <= t1 * 0.15 || t >= t1 * 0.85; }).map((o) => o.c);
    sonuc.kisAc = {
      tepeYeri: t1 > 0 ? tepeT / t1 : 0.5,
      acma: yumusak[tepe] - basDb,
      kisma: yumusak[tepe] - sonDb,
      perdeKaymasi: gurC.length && kisikC.length ? ortalama(gurC) - ortalama(kisikC) : 0,
    };
  }
  return sonuc;
}
