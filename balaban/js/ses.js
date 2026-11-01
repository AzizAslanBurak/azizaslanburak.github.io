// Ses motoru: kamış benzeri sentez, dem, metronom, Türkçe sayma.
import { midiHz } from "./perde.js";

let AC = null, ANA = null;
export function ac() {
  if (!AC) {
    const C = window.AudioContext || window.webkitAudioContext;
    AC = new C({ latencyHint: "interactive" });
    ANA = AC.createDynamicsCompressor();
    ANA.connect(AC.destination);
  }
  if (AC.state === "suspended") AC.resume();
  return AC;
}
export const cikis = () => { ac(); return ANA; };

// Çift kamışa benzeyen buğulu ses: testere + kare dalga, alçak geçiren süzgeç, 1,1 kHz civarında tını tepesi,
// uzun seslerde gecikmeli hafif titreşim. sure = Infinity → durdurulana kadar çalar.
export function kamisSesi(midi, t0, sure, { guc = 0.2, titresim = true, hedef = null } = {}) {
  const c = ac();
  const frek = midiHz(midi);
  const o1 = c.createOscillator(), o2 = c.createOscillator(), g2 = c.createGain();
  o1.type = "sawtooth"; o2.type = "square";
  o1.frequency.value = frek; o2.frequency.value = frek * 1.003; g2.gain.value = 0.25;
  const sz = c.createBiquadFilter(); sz.type = "lowpass"; sz.frequency.value = Math.min(frek * 4.5, 3200); sz.Q.value = 0.9;
  const tepe = c.createBiquadFilter(); tepe.type = "peaking"; tepe.frequency.value = 1100; tepe.gain.value = 5; tepe.Q.value = 1.2;
  const amp = c.createGain(); amp.gain.value = 0;
  o1.connect(sz); o2.connect(g2); g2.connect(sz); sz.connect(tepe); tepe.connect(amp); amp.connect(hedef || ANA);
  const sonlu = isFinite(sure);
  const atak = sonlu ? Math.min(0.07, sure * 0.3) : 0.08, birak = sonlu ? Math.min(0.09, sure * 0.3) : 0.1;
  amp.gain.setValueAtTime(0, t0);
  amp.gain.linearRampToValueAtTime(guc, t0 + atak);
  if (sonlu) {
    amp.gain.setValueAtTime(guc, Math.max(t0 + atak, t0 + sure - birak));
    amp.gain.linearRampToValueAtTime(0, t0 + sure);
  }
  let lfo = null;
  if (titresim && (!sonlu || sure > 0.45)) {
    lfo = c.createOscillator(); const lg = c.createGain();
    lfo.frequency.value = 5.2; lg.gain.value = 0; lfo.connect(lg); lg.connect(o1.frequency); lg.connect(o2.frequency);
    lg.gain.setValueAtTime(0, t0 + 0.3); lg.gain.linearRampToValueAtTime(frek * 0.006, t0 + 0.6);
    lfo.start(t0); if (sonlu) lfo.stop(t0 + sure + 0.05);
  }
  o1.start(t0); o2.start(t0);
  if (sonlu) { o1.stop(t0 + sure + 0.05); o2.stop(t0 + sure + 0.05); }
  return {
    dur() {
      const t = c.currentTime;
      amp.gain.cancelScheduledValues(t); amp.gain.setValueAtTime(amp.gain.value, t); amp.gain.linearRampToValueAtTime(0, t + 0.1);
      [o1, o2, lfo].forEach((o) => { if (o) try { o.stop(t + 0.15); } catch (e) {} });
    },
    perde(m) { const f = midiHz(m); o1.frequency.setTargetAtTime(f, c.currentTime, 0.02); o2.frequency.setTargetAtTime(f * 1.003, c.currentTime, 0.02); },
  };
}

// Tek nota çal (örnek dinletme)
export function notaCal(midi, sure = 1.2) { const c = ac(); return kamisSesi(midi, c.currentTime + 0.03, sure); }

// Bir nota dizisini çal: [{midi, bas (s), sure (s)}]
export function diziCal(notalar) {
  const c = ac(); const t0 = c.currentTime + 0.1;
  const sesler = notalar.filter((n) => n.midi != null).map((n) => kamisSesi(n.midi, t0 + n.bas, n.sure));
  return { t0, dur: () => sesler.forEach((s) => s.dur()) };
}

// ---- Dem (sabit eşlik sesi) ----
let dem = null;
export function demBaslat(midi) {
  demDurdur();
  const c = ac();
  const g = c.createGain(); g.gain.value = 0.5; g.connect(ANA);
  dem = { midi, a: kamisSesi(midi, c.currentTime + 0.02, Infinity, { guc: 0.12, titresim: false, hedef: g }), b: kamisSesi(midi + 7, c.currentTime + 0.02, Infinity, { guc: 0.035, titresim: false, hedef: g }) };
  return dem;
}
export function demDurdur() { if (dem) { dem.a.dur(); dem.b.dur(); dem = null; } }
export const demAcik = () => dem;

// ---- Türkçe sayma sesleri ----
const SAYI = {};
let saymaYuklendi = null;
export function saymaYukle() {
  if (saymaYuklendi) return saymaYuklendi;
  const c = ac();
  const adlar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "ve", "hazir"];
  saymaYuklendi = Promise.all(adlar.map(async (ad) => {
    try {
      const r = await fetch("ses/say-" + ad + ".m4a");
      const tam = await c.decodeAudioData(await r.arrayBuffer());
      // baştaki sessizliği at, sayı vuruşun tam üstüne düşsün
      const v = tam.getChannelData(0); let i = 0;
      while (i < v.length && Math.abs(v[i]) < 0.02) i++;
      SAYI[ad] = { tampon: tam, bas: Math.max(0, i / tam.sampleRate - 0.01) };
    } catch (e) { /* ses yüklenemezse yalnızca tık çalar */ }
  }));
  return saymaYuklendi;
}
function sayiCal(ad, t, guc = 0.9) {
  const s = SAYI[ad]; if (!s) return false;
  const c = ac(); const k = c.createBufferSource(); k.buffer = s.tampon;
  const g = c.createGain(); g.gain.value = guc; k.connect(g); g.connect(ANA);
  k.start(t, s.bas);
  return true;
}

function tik(t, vurgu, guc = 1) {
  const c = ac();
  const o = c.createOscillator(), g = c.createGain();
  o.frequency.value = vurgu ? 3400 : 2600; // balaban aralığının dışında: mikrofon notayla karıştırmasın
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime((vurgu ? 0.55 : 0.32) * guc, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
  o.connect(g); g.connect(ANA); o.start(t); o.stop(t + 0.06);
}

// ---- Metronom ----
// secenek: { bpm, olcu, sayma (sesli say), tik (tık çal), vurusta(fn(i, t)) }
export function metronom(secenek) {
  const c = ac();
  const m = { bpm: secenek.bpm || 60, olcu: secenek.olcu || 4, sayma: !!secenek.sayma, tikAcik: secenek.tik !== false, i: 0, sonraki: c.currentTime + 0.12, zam: 0, durdu: false, bas: 0 };
  m.bas = m.sonraki;
  function dongu() {
    while (m.sonraki < c.currentTime + 0.15) {
      const vurgu = m.olcu > 1 && (secenek.vurgular ? secenek.vurgular.includes(m.i % m.olcu) : m.i % m.olcu === 0);
      const sira = (m.i % m.olcu) + 1;
      if (m.sayma) { if (!sayiCal(String(sira), m.sonraki)) tik(m.sonraki, vurgu); else if (m.tikAcik) tik(m.sonraki, vurgu, 0.35); }
      else if (m.tikAcik) tik(m.sonraki, vurgu);
      if (secenek.vurusta) { const t = m.sonraki, i = m.i; setTimeout(() => !m.durdu && secenek.vurusta(i, t), Math.max(0, (t - c.currentTime) * 1000)); }
      m.sonraki += 60 / m.bpm; m.i++;
    }
  }
  m.zam = setInterval(dongu, 25); dongu();
  m.durdur = () => { m.durdu = true; clearInterval(m.zam); };
  m.ayarla = (bpm, olcu) => { if (bpm) m.bpm = bpm; if (olcu) m.olcu = olcu; };
  return m;
}

// Belirli zamanlarda sayma/tık planla (ritim alıştırmalarında ön sayım için)
export function onSayim(t0, bpm, vurus, { sesli = true } = {}) {
  const aralik = 60 / bpm;
  for (let i = 0; i < vurus; i++) {
    const t = t0 + i * aralik;
    if (!(sesli && sayiCal(String(i + 1), t))) tik(t, i === 0);
  }
  return t0 + vurus * aralik;
}
export function tikPlanla(t, vurgu, guc) { tik(t, vurgu, guc); }
export function onSayimTek(t, sayi, sesli = true) { if (!(sesli && sayiCal(String(sayi), t))) tik(t, sayi === 1); }
