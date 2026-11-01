// İlerleme kuralları (araştırma notu 01, Ek U6):
// - Bant: 1–4. hafta ±35 cent, 5–12. hafta ±25, sonrası ±15; pes sapmada bant 5 cent daha dar.
// - Ritim: ±80 ms → ±60 (2. ay) → ±40 (3. aydan sonra).
// - Ders geçişi aynı gün bir sonrakini açmaz (uyku pekiştirmesi); ustalık = 3 farklı günde geçiş.
// - Aralıklı tekrar: ilk geçişten 2, 5, 12, 30 gün sonra.
import { depo, kaydet, bugun } from "./depo.js";

export function baslangicGunu() {
  const d = depo();
  if (!d.baslangic) { d.baslangic = bugun(); kaydet(); }
  return d.baslangic;
}
export function gunFarki(a, b) { return Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 86400000); }
export const hafta = () => Math.floor(gunFarki(baslangicGunu(), bugun()) / 7) + 1;

export function perdeBandi() { const w = hafta(); return w <= 4 ? 35 : w <= 12 ? 25 : 15; }
export function bantIcinde(cent, bant) { return cent >= 0 ? cent <= bant : -cent <= Math.max(5, bant - 5); }
export function ritimBandi() { const w = hafta(); return w <= 4 ? 0.08 : w <= 8 ? 0.06 : 0.04; }
export const ilkAy = () => hafta() <= 4;

const TEKRAR_ARALIK = [2, 5, 12, 30];
const SESLI = new Set(["uzun-ses", "nota-dizisi", "ritim", "eser", "kulak", "sureli"]);

export function dersBilgisi(id, ders) {
  const d = depo().dersler[id] || null;
  if (!d || !d.gecti) return { durum: "yeni", gunSayisi: 0 };
  // Çalgısız bilgi dersleri bir kez geçilince tamamdır; tekrar ve ustalık günleri yalnız pratik derslerinde
  if (ders && !(ders.adimlar || []).some((a) => SESLI.has(a.tur))) return { durum: "ustalasti", gunSayisi: 3, gecti: d.gecti, bilgi: true };
  const gunSayisi = d.gecisGunleri.length;
  const idx = d.tekrarIdx || 0;
  const vade = idx < TEKRAR_ARALIK.length ? tarihEkle(d.gecti, TEKRAR_ARALIK[idx]) : null;
  const tekrarVakti = vade && vade <= bugun() && !d.gecisGunleri.includes(bugun());
  return { durum: gunSayisi >= 3 ? "ustalasti" : "gecti", gunSayisi, gecti: d.gecti, tekrarVakti, vade };
}
export function tarihEkle(g, n) { const t = new Date(g + "T12:00"); t.setDate(t.getDate() + n); return bugun(t); }

// Geçişte tekrar sırasını ilerlet
export function tekrarIsle(id) {
  const d = depo().dersler[id]; if (!d || !d.gecti) return;
  const idx = d.tekrarIdx || 0;
  if (idx < TEKRAR_ARALIK.length && tarihEkle(d.gecti, TEKRAR_ARALIK[idx]) <= bugun()) { d.tekrarIdx = idx + 1; kaydet(); }
}

// Ders açık mı? Önceki ders geçilmiş ve o gün bugün değilse (ya da kullanıcı erken açtıysa)
export function dersAcikMi(dersler, i) {
  if (i === 0) return { acik: true };
  const onceki = depo().dersler[dersler[i - 1].id];
  if (depo().acilanlar && depo().acilanlar[dersler[i].id]) return { acik: true };
  if (!onceki || !onceki.gecti) return { acik: false, neden: "onceki" };
  // Uyku beklemesi yalnızca çalgıyla pratik yapılan derslerden sonra (bilgi derslerinde gerekmez)
  const pratikli = (dersler[i - 1].adimlar || []).some((a) => SESLI.has(a.tur));
  if (pratikli && onceki.gecti === bugun() && (onceki.gecisGunleri || []).length < 2) return { acik: false, neden: "yarin" };
  return { acik: true };
}
export function erkenAc(id) { const d = depo(); d.acilanlar = d.acilanlar || {}; d.acilanlar[id] = bugun(); kaydet(); }

// Kulak puanı (öz-tahmin doğruluğu)
export function tahminKaydet(dogru) {
  const d = depo(); d.kulak = d.kulak || { toplam: 0, dogru: 0, gecmis: [] };
  d.kulak.toplam++; if (dogru) d.kulak.dogru++;
  d.kulak.gecmis.push(dogru ? 1 : 0); if (d.kulak.gecmis.length > 40) d.kulak.gecmis.shift();
  kaydet();
}
export function kulakPuani() {
  const k = depo().kulak; if (!k || k.gecmis.length < 3) return null;
  return Math.round((k.gecmis.reduce((a, b) => a + b, 0) / k.gecmis.length) * 100);
}
export function haftaGunSayisi() {
  let n = 0; const t = new Date();
  for (let i = 0; i < 7; i++) { if (((depo().gunler[bugun(t)] || {}).saniye || 0) >= 180) n++; t.setDate(t.getDate() - 1); }
  return n;
}
// Haftalık ses süresi artış freni: bu hafta / geçen hafta
export function yukOrani() {
  const t = new Date(); let bu = 0, gecen = 0;
  for (let i = 0; i < 14; i++) { const s = (depo().gunler[bugun(t)] || {}).saniye || 0; if (i < 7) bu += s; else gecen += s; t.setDate(t.getDate() - 1); }
  return gecen > 600 ? bu / gecen : null;
}
