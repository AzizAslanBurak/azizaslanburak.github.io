// Ders kataloğu: her ünite kendi dosyasında. Sıra burada belirlenir.
import u0 from "./u0-baslamadan.js";
import u1 from "./u1-ilk-ses.js";
import u2 from "./u2-uc-ses.js";
import u3 from "./u3-asagi-inmek.js";
import u4 from "./u4-baglar-ve-nefes.js";
import u5 from "./u5-alt-bolge.js";
import u6 from "./u6-nota-okuma.js";
import u7 from "./u7-ilk-makam.js";
import u8 from "./u8-hicaz-ve-sus.js";
import u9 from "./u9-ses-rengi.js";
import u10 from "./u10-usuller-turkuler.js";
import u11 from "./u11-dem-ve-acis.js";

export const UNITELER = [u0, u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11];
export const TUM_DERSLER = [];
UNITELER.forEach((u) => u.dersler.forEach((d) => { d.unite = u; d.sira = TUM_DERSLER.length + 1; TUM_DERSLER.push(d); }));
