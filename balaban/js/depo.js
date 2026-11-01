// Kalıcı durum: ayarlar, ders ilerlemesi, günlük çalışma süreleri. Yalnızca bu cihazda (localStorage).
const ANAHTAR = "bu:durum";
const VARSAYILAN = {
  ayarlar: { akort: "A", gunlukHedefDk: 20, sesliSayma: true, kulaklik: false, adiSoruldu: false },
  dersler: {},     // id → { gecti: "2026-11-02", gecisGunleri: ["2026-11-02", ...], adimlar: { i: {puan, tarih} } }
  gunler: {},      // "2026-11-02" → { saniye: 0 }  (mikrofon ses duyduğu süre + ders süresi)
  kayitlar: [],    // kendi kayıtlarının üst verisi (ses verisi IndexedDB'de)
};

function kopya(o) { return JSON.parse(JSON.stringify(o)); }
function birlestir(a, b) { for (const k in b) { if (b[k] && typeof b[k] === "object" && !Array.isArray(b[k]) && a[k] && typeof a[k] === "object") birlestir(a[k], b[k]); else a[k] = b[k]; } return a; }

let durum;
try { durum = birlestir(kopya(VARSAYILAN), JSON.parse(localStorage.getItem(ANAHTAR) || "{}")); }
catch (e) { durum = kopya(VARSAYILAN); }

let yazZam = 0;
export function kaydet() {
  clearTimeout(yazZam);
  yazZam = setTimeout(() => { try { localStorage.setItem(ANAHTAR, JSON.stringify(durum)); } catch (e) {} }, 200);
}
export const depo = () => durum;
export const ayar = (k) => durum.ayarlar[k];
export function ayarla(k, v) { durum.ayarlar[k] = v; kaydet(); }

export function bugun(t = new Date()) {
  const y = t.getFullYear(), a = String(t.getMonth() + 1).padStart(2, "0"), g = String(t.getDate()).padStart(2, "0");
  return `${y}-${a}-${g}`;
}

// ---- Çalışma süresi ----
export function sureEkle(saniye) {
  const g = bugun();
  durum.gunler[g] = durum.gunler[g] || { saniye: 0 };
  durum.gunler[g].saniye += saniye;
  kaydet();
}
export const bugunDakika = () => Math.floor(((durum.gunler[bugun()] || {}).saniye || 0) / 60);
export function seri() {
  // art arda çalışılan gün sayısı (bugün henüz çalışılmadıysa dünden geriye sayar); 5 dakika altı gün sayılmaz
  let n = 0; const t = new Date();
  if (!((durum.gunler[bugun(t)] || {}).saniye >= 300)) t.setDate(t.getDate() - 1);
  while ((durum.gunler[bugun(t)] || {}).saniye >= 300) { n++; t.setDate(t.getDate() - 1); }
  return n;
}
export function haftaDakika() {
  let s = 0; const t = new Date();
  for (let i = 0; i < 7; i++) { s += (durum.gunler[bugun(t)] || {}).saniye || 0; t.setDate(t.getDate() - 1); }
  return Math.round(s / 60);
}

// ---- Ders ilerlemesi ----
export function dersDurumu(id) { return durum.dersler[id] || null; }
export function adimSonucu(dersId, adim, puan, gecti) {
  const d = (durum.dersler[dersId] = durum.dersler[dersId] || { gecisGunleri: [], adimlar: {} });
  const onceki = d.adimlar[adim];
  if (!onceki || puan >= onceki.puan || gecti) d.adimlar[adim] = { puan, gecti: !!gecti || !!(onceki && onceki.gecti), tarih: bugun() };
  kaydet();
}
export function dersGecti(dersId) {
  const d = (durum.dersler[dersId] = durum.dersler[dersId] || { gecisGunleri: [], adimlar: {} });
  const g = bugun();
  if (!d.gecti) d.gecti = g;
  if (!d.gecisGunleri.includes(g)) d.gecisGunleri.push(g);
  kaydet();
}
export function sifirla() { durum = kopya(VARSAYILAN); kaydet(); }
