// Perde (pitch) yardımcıları: frekans ↔ MIDI, cent sapması, Türkçe nota adları, çalgı akordu.

export const SOLFEJ = ["Do", "Do♯", "Re", "Mi♭", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "Si♭", "Si"];
const HARF = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export const hzMidi = (hz) => 69 + 12 * Math.log2(hz / 440);
export const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);

// "A4", "Bb4", "F#4", "Bb4@-50" (cent sapmalı, makam perdeleri için)  →  kesirli MIDI
export function notaMidi(ad) {
  const m = /^([A-G])([#b]?)(-?\d)(?:@([+-]?\d+))?$/.exec(String(ad).trim());
  if (!m) throw new Error("Nota adı anlaşılamadı: " + ad);
  let n = (parseInt(m[3], 10) + 1) * 12 + HARF[m[1]];
  if (m[2] === "#") n += 1;
  if (m[2] === "b") n -= 1;
  return n + (m[4] ? parseInt(m[4], 10) / 100 : 0);
}

export function midiAdi(midi) {
  const yuvarlak = Math.round(midi);
  return { ad: SOLFEJ[((yuvarlak % 12) + 12) % 12], oktav: Math.floor(yuvarlak / 12) - 1, midi: yuvarlak };
}
export const midiYazi = (midi) => { const a = midiAdi(midi); return a.ad + a.oktav; };

// Çalgı akordu: dersler "La balaban" için yazılır. Başka akortta çalgı, aynı parmakla farklı ses verir.
// kaydirma = çalgının akordunun La'dan farkı (yarım ses). Örn. Si♭ balaban: +1, Sol balaban: -2.
export const AKORTLAR = [
  { id: "C", ad: "Do", kaydirma: 3 },
  { id: "B", ad: "Si", kaydirma: 2 },
  { id: "Bb", ad: "Si♭", kaydirma: 1 },
  { id: "A", ad: "La", kaydirma: 0 },
  { id: "Ab", ad: "Sol♯", kaydirma: -1 },
  { id: "G", ad: "Sol", kaydirma: -2 },
  { id: "F#", ad: "Fa♯", kaydirma: -3 },
  { id: "F", ad: "Fa", kaydirma: -4 },
  { id: "E", ad: "Mi", kaydirma: -5 },
  { id: "D", ad: "Re", kaydirma: 5 },
];

// Yazılı (parmak) perdesi → duyulan perde, ve tersi.
export const duyulan = (yaziliMidi, kaydirma) => yaziliMidi + kaydirma;
export const yazili = (duyulanMidi, kaydirma) => duyulanMidi - kaydirma;

// Hedefe göre cent sapması (oktav hatası ayrıca raporlanır)
export function sapma(olculenMidi, hedefMidi) {
  const fark = (olculenMidi - hedefMidi) * 100;
  return { cent: fark, oktavHatasi: Math.abs(fark) > 600 && Math.abs(((fark % 1200) + 1800) % 1200 - 600) < 60 };
}
