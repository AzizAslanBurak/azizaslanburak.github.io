// Ses motoru: kamış benzeri sentez, dem, metronom, Türkçe sayma.
import { midiHz } from "./perde.js";

let AC = null, ANA = null;
export function ac() {
  if (!AC) {
    const C = window.AudioContext || window.webkitAudioContext;
    AC = new C({ latencyHint: "interactive" });
    ANA = AC.createDynamicsCompressor();
    ANA.connect(AC.destination);
    modelYukle(AC);
    ornekleriYukle(AC);
  }
  if (AC.state === "suspended") AC.resume();
  return AC;
}
export const cikis = () => { ac(); return ANA; };

// ---- Fiziksel model (kamis-model.js): varsayılan ses motoru; yüklenemezse basit sentez ----
let modelHazir = false, modelYukleniyor = null;
function modelYukle(c) {
  if (!c.audioWorklet || modelYukleniyor) return;
  modelYukleniyor = c.audioWorklet.addModule(new URL("./kamis-model.js", import.meta.url)).then(() => { modelHazir = true; }).catch(() => {});
}
export const modelYuklendi = () => (ac(), modelYukleniyor || Promise.resolve());
export function sesMotoru() { try { return localStorage.getItem("bu:sesMotoru") || "kayit"; } catch (e) { return "kayit"; } }
export function sesMotoruAyarla(m) { try { localStorage.setItem("bu:sesMotoru", m); } catch (e) {} }
// "kayit" seçiliyken kayıtlar yüklenmemişse ya da nota kayıt aralığının dışındaysa model çalar
export const modelKullan = (motor) => modelHazir && ["model", "kayit"].includes(motor || sesMotoru());

// ---- Gerçek düdük kayıtları (ses/duduk): nota örnekleri, en yakın kayıttan perde düzeltmesiyle ----
// Kaynak: arakedikian (Freesound) "escala1", "escala3" — CC BY 3.0. Atıf: Ayarlar › Kaynaklar.
let ornekler = null, ornekYukleniyor = null;
function ornekleriYukle(c) {
  if (ornekYukleniyor) return;
  ornekYukleniyor = (async () => {
    try {
      const yol = new URL("../ses/duduk/", import.meta.url);
      const m = await (await fetch(new URL("ornekler.json", yol))).json();
      const liste = await Promise.all(m.ornekler.map(async (o) => ({ ...o, tampon: await c.decodeAudioData(await (await fetch(new URL(o.dosya, yol))).arrayBuffer()) })));
      ornekler = liste.sort((a, b) => a.midi - b.midi);
    } catch (e) { ornekler = null; }
  })();
}
export const ornekYuklendi = () => (ac(), Promise.all([ornekYukleniyor, modelYukleniyor].map((p) => p || Promise.resolve())));
function enYakinOrnek(midi) {
  if (!ornekler) return null;
  let en = null; for (const o of ornekler) if (!en || Math.abs(o.midi - midi) < Math.abs(en.midi - midi)) en = o;
  return en && Math.abs(en.midi - midi) <= 3.2 ? en : null; // 3 yarım sesten fazla kaydırma tınıyı bozar
}
export const kayitKullan = (motor, midiler) => (motor || sesMotoru()) === "kayit" && ornekler && midiler.every((m) => enYakinOrnek(m));

export function ornekSesi(olaylar, { guc = 0.2, sonsuz = false, titresim = true, hedef = null } = {}) {
  const c = ac();
  const cikis = c.createGain(); cikis.gain.value = guc * 4.6; cikis.connect(hedef || ANA);
  const kaynaklar = [];
  let onceki = null;
  olaylar.forEach((ev, i) => {
    const o = enYakinOrnek(ev.midi); if (!o) return;
    const bagli = onceki && ev.bas - onceki.bit < 0.03;
    const src = c.createBufferSource(); src.buffer = o.tampon;
    src.playbackRate.value = Math.pow(2, (ev.midi - o.midi) / 12);
    src.loop = true; src.loopStart = o.donguBas; src.loopEnd = o.donguSon;
    const g = c.createGain(); g.gain.value = 0;
    src.connect(g); g.connect(cikis);
    const bit = sonsuz && i === olaylar.length - 1 ? Infinity : ev.bit;
    src.start(ev.bas, bagli ? Math.max(0, o.donguBas - 0.05) : 0);
    // bağlı notada atak atlanır (parmak değişimi), 40 ms çapraz geçiş; yeni nefeste kaydın kendi atağı çalar
    const gecis = bagli ? 0.04 : 0.012;
    g.gain.setValueAtTime(0, ev.bas); g.gain.linearRampToValueAtTime(1, ev.bas + gecis);
    if (isFinite(bit)) {
      const sonraki = olaylar[i + 1]; const sonrakiBagli = sonraki && sonraki.bas - ev.bit < 0.03;
      const birak = sonrakiBagli ? 0.04 : 0.09;
      g.gain.setValueAtTime(1, Math.max(ev.bas + gecis, bit - (sonrakiBagli ? 0 : birak)));
      g.gain.linearRampToValueAtTime(0, bit + (sonrakiBagli ? birak : 0));
      src.stop(bit + birak + 0.05);
    }
    if (titresim && (!isFinite(bit) || bit - ev.bas > 0.8)) {
      const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 5.2; lg.gain.value = 0;
      lfo.connect(lg); lg.connect(src.detune);
      lg.gain.setValueAtTime(0, ev.bas + 0.45); lg.gain.linearRampToValueAtTime(9, ev.bas + 0.9);
      lfo.start(ev.bas); if (isFinite(bit)) lfo.stop(bit + 0.2);
      kaynaklar.push(lfo);
    }
    kaynaklar.push(src);
    onceki = ev;
  });
  return {
    dur() { const t = c.currentTime; cikis.gain.cancelScheduledValues(t); cikis.gain.setValueAtTime(cikis.gain.value, t); cikis.gain.linearRampToValueAtTime(0, t + 0.12); setTimeout(() => { kaynaklar.forEach((k) => { try { k.stop(); } catch (e) {} }); try { cikis.disconnect(); } catch (e) {} }, 250); },
    perde(m) { const o = enYakinOrnek(m); kaynaklar.forEach((k) => { if (k.playbackRate && o) k.playbackRate.setTargetAtTime(Math.pow(2, (m - o.midi) / 12), c.currentTime, 0.02); }); },
  };
}

// Seçili motora göre bir nefeslik ses: kayıt → model → basit
export function nefesSesi(olaylar, secenek = {}) {
  if (kayitKullan(secenek.motor, olaylar.map((o) => o.midi))) return ornekSesi(olaylar, secenek);
  if (modelKullan(secenek.motor)) return modelSesi(olaylar, secenek);
  const sesler = olaylar.map((o) => kamisSesi(o.midi, o.bas, isFinite(o.bit) && !secenek.sonsuz ? o.bit - o.bas : Infinity, { ...secenek, motor: "basit" }));
  return { dur: () => sesler.forEach((x) => x.dur()), perde: (m) => sesler.forEach((x) => x.perde(m)) };
}

// Bir nefeste çalınan ses ya da ezgi: olaylar [{ midi, bas, bit }] (bağlam saati). Aralarında <30 ms boşluk olan
// notalar bağlı (parmakla) geçer; daha uzun boşlukta nefes yeniden başlar.
export function modelSesi(olaylar, { guc = 0.2, titresim = true, sonsuz = false, hedef = null } = {}) {
  const c = ac();
  const dugum = new AudioWorkletNode(c, "kamis-model", {
    numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [1],
    processorOptions: { olaylar: olaylar.map((o) => ({ bas: o.bas, bit: o.bit, frekans: midiHz(o.midi) })), guc: 0.7, titresim, sonsuz, duzeltme: 0.7 },
  });
  const renk = c.createBiquadFilter(); renk.type = "peaking"; renk.frequency.value = 1300; renk.gain.value = 3; renk.Q.value = 1;
  const yumusat = c.createBiquadFilter(); yumusat.type = "lowpass"; yumusat.frequency.value = 4200; yumusat.Q.value = 0.5;
  const kazanc = c.createGain(); kazanc.gain.value = guc * 4.2;
  dugum.connect(renk); renk.connect(yumusat); yumusat.connect(kazanc); kazanc.connect(hedef || ANA);
  return {
    dur() { dugum.port.postMessage({ tur: "dur" }); setTimeout(() => { try { kazanc.disconnect(); } catch (e) {} }, 500); },
    perde(m) { dugum.port.postMessage({ tur: "perde", frekans: midiHz(m) }); },
  };
}

// Çift kamışa benzeyen buğulu ses (basit sentez; model yoksa ya da ayarda seçilirse): testere + kare dalga, alçak geçiren süzgeç, 1,1 kHz civarında tını tepesi,
// uzun seslerde gecikmeli hafif titreşim. sure = Infinity → durdurulana kadar çalar.
export function kamisSesi(midi, t0, sure, { guc = 0.2, titresim = true, hedef = null, motor = null } = {}) {
  const c = ac();
  const tek = [{ midi, bas: t0, bit: isFinite(sure) ? t0 + sure : 1e9 }];
  if (kayitKullan(motor, [midi])) return ornekSesi(tek, { guc, titresim, sonsuz: !isFinite(sure), hedef });
  if (modelKullan(motor)) return modelSesi(tek, { guc, titresim, sonsuz: !isFinite(sure), hedef });
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
export function diziCal(notalar, { motor = null } = {}) {
  const c = ac(); const t0 = c.currentTime + 0.1;
  const n = notalar.filter((x) => x.midi != null);
  const sesler = [nefesSesi(n.map((x) => ({ midi: x.midi, bas: t0 + x.bas, bit: t0 + x.bas + x.sure })), { motor })];
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
