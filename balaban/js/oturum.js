// Bugünün oturumu: Isın · Ders · Kaydet (Bugün ekranındaki kart). Gün değişince sıfırlanır.
import { depo, kaydet, bugun } from "./depo.js";

function kayit() {
  const d = depo();
  if (!d.oturum || d.oturum.gun !== bugun()) d.oturum = { gun: bugun(), isinma: false, kayit: false };
  return d.oturum;
}
export function oturumIsaretle(alan) { const o = kayit(); if (!o[alan]) { o[alan] = true; kaydet(); } }
export function oturumDurumu() {
  const o = kayit();
  const ders = Object.values(depo().dersler).some((x) => (x.gecisGunleri || []).includes(bugun()));
  return { isinma: o.isinma, ders, kayit: o.kayit };
}
