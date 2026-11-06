// Mikrofon dinleyici: perde (YIN), ses şiddeti ve nota başlangıcı (onset) algılama.
// Tüm zamanlar AudioContext saatindedir (saniye), metronomla aynı saat.
import { ac } from "./ses.js";
import { hzMidi } from "./perde.js";

const ALT_HZ = 110, UST_HZ = 1800;      // balabanın tüm aralığı + payı
const PENCERE = 2048;

let kaynak = null, analiz = null, akis = null, testOsc = null, zarfDugum = null, zarfHazir = null;
let calisiyor = false, rafId = 0;
const dinleyiciler = new Set();
const tampon = new Float32Array(PENCERE);
let yinD = null;

export const durum = {
  izin: "bilinmiyor",        // bilinmiyor | verildi | reddedildi | desteklenmiyor
  gurultuTabani: 0.004,      // sessiz ortamın RMS'i (kalibrasyonla güncellenir)
  gecikme: Number(oku("gecikme") || 0.08), // mikrofon + hoparlör gecikmesi (s)
};
function oku(k) { try { return localStorage.getItem("bu:" + k); } catch (e) { return null; } }
function yaz(k, v) { try { localStorage.setItem("bu:" + k, String(v)); } catch (e) {} }

export const izinDahaOnceVerildi = () => oku("izin") === "1";

export function abone(fn) { dinleyiciler.add(fn); return () => dinleyiciler.delete(fn); }

export async function baslat() {
  const c = ac();
  if (calisiyor) return true;
  if (!testOsc) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { durum.izin = "desteklenmiyor"; return false; }
    try {
      akis = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false, channelCount: 1 },
      });
      durum.izin = "verildi"; yaz("izin", "1");
    } catch (e) {
      durum.izin = "reddedildi";
      return false;
    }
    kaynak = c.createMediaStreamSource(akis);
  }
  analiz = c.createAnalyser();
  analiz.fftSize = PENCERE;
  analiz.smoothingTimeConstant = 0;
  (testOsc || kaynak).connect(analiz);
  await zarfKur(c);
  calisiyor = true;
  sifirla();
  if (!zarfDugum) dongu(); // zarf işlemcisi varsa analiz onun mesajlarıyla (~20 ms'de bir) yürür
  return true;
}

export function durdur() {
  calisiyor = false;
  cancelAnimationFrame(rafId);
  try { (testOsc || kaynak) && (testOsc || kaynak).disconnect(analiz); } catch (e) {}
  try { zarfDugum && (testOsc || kaynak) && (testOsc || kaynak).disconnect(zarfDugum); } catch (e) {}
  if (akis) { akis.getTracks().forEach((t) => t.stop()); akis = null; kaynak = null; }
}
export const acikMi = () => calisiyor;

// Test için: mikrofon yerine sentetik ses (geliştirici konsolundan veya otomatik testten).
// testSes(440) → 440 Hz kamış benzeri ses; testSes(0) → sessizlik; testSes(null) → test kapalı.
// guc: kazanç (vars. 0,25); gürlük ölçümünü sınamak için.
export function testSes(hz, guc = 0.25) {
  const c = ac();
  if (hz === null) { if (testOsc) { testOsc.disconnect(); testOsc = null; } return; }
  if (!testOsc) {
    const o = c.createOscillator(); o.type = "sawtooth";
    const g = c.createGain(); g.gain.value = 0;
    o.connect(g); o.start();
    testOsc = g; testOsc._osc = o;
    if (calisiyor && analiz) testOsc.connect(analiz);
    if (calisiyor && zarfDugum) testOsc.connect(zarfDugum);
  }
  if (hz > 0) { testOsc._osc.frequency.setValueAtTime(hz, c.currentTime); testOsc.gain.setTargetAtTime(guc, c.currentTime, 0.01); }
  else testOsc.gain.setTargetAtTime(0, c.currentTime, 0.01);
}

// ---- YIN perde algılama ----
function yin(buf, sr) {
  const W = PENCERE >> 1;
  const tauMin = Math.floor(sr / UST_HZ), tauMax = Math.min(W - 1, Math.ceil(sr / ALT_HZ));
  if (!yinD || yinD.length !== tauMax + 1) yinD = new Float32Array(tauMax + 1);
  const d = yinD;
  d[0] = 1;
  let toplam = 0;
  for (let tau = 1; tau <= tauMax; tau++) {
    let s = 0;
    for (let i = 0; i < W; i++) { const f = buf[i] - buf[i + tau]; s += f * f; }
    toplam += s;
    d[tau] = toplam > 0 ? (s * tau) / toplam : 1;
  }
  const ESIK = 0.15;
  let tau = -1;
  for (let t = tauMin; t <= tauMax; t++) {
    if (d[t] < ESIK) { while (t + 1 <= tauMax && d[t + 1] < d[t]) t++; tau = t; break; }
  }
  if (tau < 0) {
    // eşik altı yoksa en derin çukur, ama güvenilirlik düşük
    let enIyi = tauMin;
    for (let t = tauMin; t <= tauMax; t++) if (d[t] < d[enIyi]) enIyi = t;
    if (d[enIyi] > 0.35) return null;
    tau = enIyi;
  }
  let kesin = tau;
  if (tau > 1 && tau < tauMax) {
    const a = d[tau - 1], b = d[tau], c2 = d[tau + 1];
    const pay = a + c2 - 2 * b;
    if (pay !== 0) kesin = tau + (a - c2) / (2 * pay);
  }
  return { hz: sr / kesin, netlik: 1 - d[tau] };
}

// ---- Başlangıç (onset) algılama durumu ----
let zarf = [], sonOnset = -1, sonKararliMidi = null, adayMidi = null, adayBas = 0, sesVardi = false;
let medyan = [];
function sifirla() { zarf = []; sonOnset = -1; sonKararliMidi = null; adayMidi = null; sesVardi = false; medyan = []; }

function dongu() {
  if (!calisiyor) return;
  rafId = requestAnimationFrame(dongu);
  analizAdimi();
}

function analizAdimi() {
  if (!calisiyor || !analiz) return;
  const c = ac();
  analiz.getFloatTimeDomainData(tampon);
  let kare = 0;
  for (let i = 0; i < PENCERE; i++) kare += tampon[i] * tampon[i];
  const rms = Math.sqrt(kare / PENCERE);
  // pencerenin ortası şu andan ~yarım pencere önce; gecikme ayrıca düşülür
  const zaman = c.currentTime - PENCERE / 2 / c.sampleRate - durum.gecikme;
  const db = 20 * Math.log10(rms + 1e-9);
  const sesli = rms > Math.max(durum.gurultuTabani * 3, 0.006);

  let p = null;
  if (sesli) p = yin(tampon, c.sampleRate);
  let midi = null, hz = null, netlik = 0;
  if (p && p.netlik > 0.6) {
    medyan.push(p.hz); if (medyan.length > 5) medyan.shift();
    const sirali = medyan.slice().sort((a, b) => a - b);
    hz = sirali[sirali.length >> 1];
    midi = hzMidi(hz); netlik = p.netlik;
  } else medyan = [];

  // onset: sessizlikten sese geçiş, ses içinde ani şiddet artışı, ya da kararlı yeni perde
  zarf.push({ zaman, db }); while (zarf.length && zaman - zarf[0].zaman > 0.12) zarf.shift();
  const minDb = zarf.reduce((m, z) => Math.min(m, z.db), 0);
  let onset = false;
  const serbest = zaman - sonOnset > 0.09;
  if (serbest && sesli && midi !== null) {
    if (!sesVardi) onset = true;
    else if (db - minDb > 7) onset = true;
    else if (sonKararliMidi !== null && Math.abs(midi - sonKararliMidi) > 0.7) {
      if (adayMidi === null || Math.abs(midi - adayMidi) > 0.5) { adayMidi = midi; adayBas = zaman; }
      else if (zaman - adayBas > 0.04) { onset = true; }
    } else adayMidi = null;
  }
  if (onset) { sonOnset = adayMidi !== null ? adayBas : zaman; sonKararliMidi = midi; adayMidi = null; }
  if (midi !== null && adayMidi === null) sonKararliMidi = sonKararliMidi === null ? midi : sonKararliMidi * 0.7 + midi * 0.3;
  if (!sesli) { sesVardi = false; sonKararliMidi = null; adayMidi = null; }
  else if (midi !== null) sesVardi = true;

  const olay = { zaman, rms, db, sesli, hz, midi, netlik, onset, onsetZamani: onset ? sonOnset : null };
  dinleyiciler.forEach((fn) => { try { fn(olay); } catch (e) { console.error(e); } });
}

// Sessiz ortamı ölç (kalibrasyon)
export function gurultuOlc(sure = 1.2) {
  return new Promise((coz) => {
    const olcumler = [];
    const bitir = abone((o) => olcumler.push(o.rms));
    setTimeout(() => {
      bitir();
      olcumler.sort((a, b) => a - b);
      const deger = olcumler.length ? olcumler[Math.floor(olcumler.length * 0.8)] : 0.004;
      durum.gurultuTabani = Math.min(Math.max(deger, 0.001), 0.05);
      coz(durum.gurultuTabani);
    }, sure * 1000);
  });
}
export function gecikmeKaydet(s) { durum.gecikme = Math.max(0, Math.min(0.5, s)); yaz("gecikme", durum.gecikme.toFixed(3)); }

// ---- Yüksek çözünürlüklü başlangıç algılama (AudioWorklet zarfı) ----
// Nefesle ya da yeniden atakla başlayan notaları ~3 ms çözünürlükle bulur. 70 ms'den kısa sesler
// (metronom tıkı, vuruntu) sayılmaz. Bağlam saatinde, gecikme düşülmüş zaman verir.
const onsetDinleyiciler = new Set();
export function onsetAbone(fn) { onsetDinleyiciler.add(fn); return () => onsetDinleyiciler.delete(fn); }
export const zarfVar = () => !!zarfDugum;

async function zarfKur(c) {
  if (!c.audioWorklet) return;
  try {
    if (!zarfHazir) zarfHazir = c.audioWorklet.addModule(new URL("./zarf-islemci.js", import.meta.url));
    await zarfHazir;
    if (!zarfDugum) {
      zarfDugum = new AudioWorkletNode(c, "zarf-islemci", { numberOfInputs: 1, numberOfOutputs: 1 });
      const sessiz = c.createGain(); sessiz.gain.value = 0;
      zarfDugum.connect(sessiz); sessiz.connect(c.destination);
      zarfDugum.port.onmessage = (e) => { const d = e.data; for (let i = 0; i < d.length; i += 2) zarfIsle(d[i], d[i + 1]); analizAdimi(); };
    }
    (testOsc || kaynak).connect(zarfDugum);
  } catch (e) { zarfDugum = null; }
}

const zGecmis = []; let zSon3 = [], zAday = null, zSonOnset = -1;
function zarfIsle(t, r) {
  zSon3.push(r); if (zSon3.length > 3) zSon3.shift();
  const rs = zSon3.reduce((a, b) => a + b, 0) / zSon3.length;
  zGecmis.push(t, rs);
  while (zGecmis.length > 2 && t - zGecmis[0] > 0.12) zGecmis.splice(0, 2);
  const esikAc = Math.max(durum.gurultuTabani * 4, 0.008), esikKapa = esikAc * 0.6;
  if (zAday) {
    if (rs < esikKapa) { zAday = null; return; }                      // çok kısa: tık ya da vuruntu
    if (t - zAday.t >= 0.07) {
      const zaman = zAday.t - durum.gecikme; zAday = null;
      onsetDinleyiciler.forEach((fn) => { try { fn({ zaman }); } catch (e) { console.error(e); } });
    }
    return;
  }
  if (t - zSonOnset < 0.09 || rs <= esikAc) return;
  let enAz = Infinity;
  for (let i = 0; i < zGecmis.length; i += 2) { const tt = zGecmis[i]; if (tt >= t - 0.06 && tt <= t - 0.012) enAz = Math.min(enAz, zGecmis[i + 1]); }
  if (enAz === Infinity) return;
  if (enAz < esikKapa || rs > enAz * 2.2) {
    // eşiği ilk aştığı bloğu bul
    let bas = t;
    for (let i = zGecmis.length - 2; i >= 0; i -= 2) { if (zGecmis[i + 1] > esikAc && zGecmis[i] > t - 0.03) bas = zGecmis[i]; else break; }
    zAday = { t: bas }; zSonOnset = t;
  }
}

// Test: bağlam saatinde tam zamanlı nota darbesi (otomatik ritim testi için)
export function testDarbe(zaman, sure = 0.35, hz = 440) {
  testSes(0);
  const g = testOsc;
  g._osc.frequency.setValueAtTime(hz, zaman);
  g.gain.setTargetAtTime(0.25, zaman, 0.008);
  g.gain.setTargetAtTime(0, zaman + sure, 0.01);
}
