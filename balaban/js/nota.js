// Nota kâğıdı: abcjs ile çizim, örnek çalma, "takip" (sen doğru notayı çalınca ilerler) ve "birlikte çal" (tempoda puanlama).
import * as mik from "./mikrofon.js";
import { ac, kamisSesi, nefesSesi, onSayim, demBaslat, demDurdur } from "./ses.js";
import { notaMidi } from "./perde.js";
import { h, kaydirma, notaYazisi } from "./ortak.js";
import { perdeBandi, bantIcinde } from "./ilerleme.js";

let calan = null;
export function hepsiniDurdur() { if (calan) calan(); calan = null; }

// abc: ABC metni. secenek: { baslik, dem: "A3" (yazılı), bpm, takip: true, birlikte: true, sonucta: fn(sonuc) }
export function notaKagidi(abc, secenek = {}) {
  const kok = h("div", { class: "nota" });
  const bas = h("div", { class: "bas" }, h("span", { class: "baslik" }, secenek.baslik || ""));
  const kagit = h("div", { class: "kagit" });
  const durumEl = h("div", { class: "kucuk soluk", style: "padding: 0 12px 10px", "aria-live": "polite" });
  kok.append(bas, kagit, durumEl);
  const tune = window.ABCJS.renderAbc(kagit, abc, { responsive: "resize", add_classes: true, paddingleft: 2, paddingright: 2, paddingtop: 4, paddingbottom: 4, staffwidth: 560 })[0];

  const hizG = h("input", { type: "range", min: "40", max: "130", step: "5", value: "100", "aria-label": "Hız" });
  const hizA = h("span", null, "%100");
  hizG.addEventListener("input", () => (hizA.textContent = "%" + hizG.value));
  const dinle = h("button", { class: "ikincil", "aria-pressed": "false" }, "▶︎ Dinle");
  const demB = secenek.dem ? h("button", { class: "ikincil", "aria-pressed": "false" }, "Dem") : null;
  const takipB = secenek.takip !== false ? h("button", { class: "ikincil", "aria-pressed": "false" }, "Notayla ilerle") : null;
  const birlikteB = secenek.birlikte ? h("button", { class: "vurgu", "aria-pressed": "false" }, "Tempoda çal") : null;
  bas.append(h("div", { class: "satir" }, dinle, demB, takipB, birlikteB, h("label", { class: "hiz" }, "Hız", hizG, hizA)));

  const baseBpm = () => (secenek.bpm || tune.getBpm() || 80);
  let sesHazir = false;
  function olaylar(bpm) {
    if (!sesHazir) { tune.setUpAudio({}); sesHazir = true; } // midiPitches alanını doldurur
    tune.setTiming(bpm);
    const olc = tune.getMeterFraction(); const olcuBirlik = olc.num && olc.den ? olc.num / olc.den : 1;
    return (tune.noteTimings || []).filter((e) => e.type === "event" && e.midiPitches && e.midiPitches.length)
      .map((e) => ({ ms: e.milliseconds, sureMs: (e.midiPitches[0].duration * (e.millisecondsPerMeasure || 240000 / bpm)) / olcuBirlik, pitch: e.midiPitches[0].pitch + (e.midiPitches[0].cents || 0) / 100, elemanlar: (e.elements || []).flat() }));
  }
  const temizle = () => kagit.querySelectorAll(".calan,.dogru,.bekliyor").forEach((n) => n.classList.remove("calan", "dogru", "bekliyor"));
  // Çalınan notayı boya; uzun ezgide kâğıdı yatayda ona kaydır.
  const isaretle = (ol, sinif) => {
    ol.elemanlar.forEach((n) => n.classList.add(sinif));
    const ilk = ol.elemanlar[0]; if (!ilk || kagit.scrollWidth <= kagit.clientWidth) return;
    const k = kagit.getBoundingClientRect(), n = ilk.getBoundingClientRect();
    if (n.left < k.left + 24 || n.right > k.right - 24) kagit.scrollTo({ left: kagit.scrollLeft + n.left - k.left - k.width / 3, behavior: "smooth" });
  };
  function birak() { hepsiniDurdur(); }
  function dugmeleriSifirla() { [dinle, takipB, birlikteB].forEach((b) => b && b.setAttribute("aria-pressed", "false")); dinle.textContent = "▶︎ Dinle"; }

  // --- Dinle ---
  dinle.addEventListener("click", () => {
    const acikti = dinle.getAttribute("aria-pressed") === "true";
    birak(); if (acikti) return;
    const bpm = baseBpm() * (+hizG.value / 100);
    const c = ac(); const t0 = c.currentTime + 0.15; const k = kaydirma();
    const ols = olaylar(bpm);
    // model: ezgi tek nefeste, notalar parmakla bağlanır; basit sentez: her nota ayrı
    const sesler = [nefesSesi(ols.map((o) => ({ midi: o.pitch + k, bas: t0 + o.ms / 1000, bit: t0 + (o.ms + o.sureMs) / 1000 - 0.012 })))];
    const zamanlar = ols.map((o) => setTimeout(() => { temizle(); isaretle(o, "calan"); }, 150 + o.ms));
    const son = ols.length ? ols[ols.length - 1].ms + ols[ols.length - 1].sureMs : 0;
    zamanlar.push(setTimeout(() => { birak(); }, son + 400));
    if (demB && demB.getAttribute("aria-pressed") === "true") demBaslat(notaMidi(secenek.dem) + k);
    dinle.setAttribute("aria-pressed", "true"); dinle.textContent = "■︎ Durdur";
    calan = () => { sesler.forEach((s) => s.dur()); zamanlar.forEach(clearTimeout); temizle(); dugmeleriSifirla(); demDurdur(); };
  });
  if (demB) demB.addEventListener("click", () => {
    const acik = demB.getAttribute("aria-pressed") === "true";
    demB.setAttribute("aria-pressed", acik ? "false" : "true");
    if (acik) demDurdur(); else demBaslat(notaMidi(secenek.dem) + kaydirma());
  });

  // --- Notayla ilerle (bekleme kipi) ---
  if (takipB) takipB.addEventListener("click", () => {
    const acikti = takipB.getAttribute("aria-pressed") === "true";
    birak(); if (acikti) return;
    if (!mik.acikMi()) { durumEl.textContent = "Önce mikrofonu aç (Akort sekmesi ya da ders adımındaki düğme)."; return; }
    const ols = olaylar(baseBpm());
    let i = 0, tutma = 0, sonZaman = null, serbest = true, yanlis = 0, yanlisSure = 0, basZaman = performance.now();
    temizle(); isaretle(ols[0], "bekliyor");
    durumEl.textContent = `Sıradaki: ${notaYazisi(ols[0].pitch)}`;
    takipB.setAttribute("aria-pressed", "true"); takipB.textContent = "■︎ Bitir";
    const bitir = mik.abone((o) => {
      const dt = sonZaman == null ? 0 : Math.min(0.1, o.zaman - sonZaman); sonZaman = o.zaman;
      if (i >= ols.length) return;
      const hedef = ols[i].pitch;
      if (!o.sesli || o.midi == null) { tutma = 0; serbest = true; yanlisSure = 0; return; }
      if (o.onset) serbest = true;
      const yazili = o.midi - kaydirma();
      const fark = Math.abs(yazili - hedef) * 100;
      if (fark <= 45 && serbest) {
        tutma += dt; yanlisSure = 0;
        if (tutma >= 0.22) {
          ols[i].elemanlar.forEach((n) => n.classList.remove("bekliyor")); isaretle(ols[i], "dogru");
          i++; tutma = 0;
          if (i < ols.length) { isaretle(ols[i], "bekliyor"); serbest = ols[i].pitch !== hedef; durumEl.textContent = `Sıradaki: ${notaYazisi(ols[i].pitch)}`; }
          else {
            const sure = Math.round((performance.now() - basZaman) / 1000);
            durumEl.textContent = `Bitti! ${ols.length} notayı ${sure} saniyede çaldın, ${yanlis} kez yanlış notada kaldın.`;
            const puan = Math.max(0, Math.round(100 - (yanlis / ols.length) * 100));
            if (secenek.sonucta) secenek.sonucta({ tur: "takip", puan, yanlis, sure });
            setTimeout(() => { bitir(); takipB.setAttribute("aria-pressed", "false"); takipB.textContent = "Notayla ilerle"; calan = null; }, 50);
          }
        }
      } else if (fark > 80) {
        tutma = 0; yanlisSure += dt;
        if (yanlisSure > 0.35 && yanlisSure - dt <= 0.35) { yanlis++; durumEl.textContent = `Bu ${notaYazisi(Math.round(yazili))}; sıradaki nota ${notaYazisi(hedef)}.`; }
      }
    });
    calan = () => { bitir(); temizle(); dugmeleriSifirla(); takipB.textContent = "Notayla ilerle"; };
  });

  // --- Tempoda çal (birlikte, puanlı) ---
  if (birlikteB) birlikteB.addEventListener("click", () => {
    const acikti = birlikteB.getAttribute("aria-pressed") === "true";
    birak(); if (acikti) return;
    if (!mik.acikMi()) { durumEl.textContent = "Önce mikrofonu aç."; return; }
    const bpm = baseBpm() * (+hizG.value / 100);
    const c = ac(); const olc = tune.getMeterFraction(); const sayi = Math.max(2, Math.round((olc.num / olc.den) * 4));
    const basla = onSayim(c.currentTime + 0.3, bpm, sayi > 6 ? sayi / 2 : sayi);
    const ols = olaylar(bpm);
    const k = kaydirma();
    // eşlik: örnek ezgiyi çok kısık çal (kulaklıkla), yoksa yalnızca vuruş
    const sesler = secenek.eslikSesi ? ols.map((o) => kamisSesi(o.pitch + k, basla + o.ms / 1000, Math.max(0.08, o.sureMs / 1000 - 0.02), { guc: 0.05 })) : [];
    const bant = perdeBandi();
    const kayit = ols.map(() => ({ toplam: 0, dogru: 0, perdeli: 0, centToplam: 0, ilkDogru: null }));
    const bitir = mik.abone((o) => {
      const t = (o.zaman - basla) * 1000;
      const j = ols.findIndex((x) => t >= x.ms + 60 && t < x.ms + x.sureMs - 30);
      if (j < 0) return;
      const r = kayit[j]; r.toplam++;
      if (o.midi == null) return;
      const cent = (o.midi - k - ols[j].pitch) * 100;
      if (Math.abs(cent) < 150) { r.perdeli++; r.centToplam += cent; }
      if (bantIcinde(cent, bant)) { r.dogru++; if (r.ilkDogru == null) r.ilkDogru = t - ols[j].ms; }
    });
    const zamanlar = ols.map((o) => setTimeout(() => { kagit.querySelectorAll(".calan").forEach((n) => n.classList.remove("calan")); isaretle(o, "calan"); }, (basla - c.currentTime) * 1000 + o.ms));
    const son = ols.length ? ols[ols.length - 1].ms + ols[ols.length - 1].sureMs : 0;
    zamanlar.push(setTimeout(() => {
      bitir();
      temizle();
      let toplamPuan = 0;
      kayit.forEach((r, j) => {
        const oran = r.toplam ? r.dogru / r.toplam : 0;
        toplamPuan += oran;
        isaretle(ols[j], oran >= 0.6 ? "dogru" : "bekliyor");
      });
      const puan = Math.round((toplamPuan / Math.max(1, ols.length)) * 100);
      durumEl.textContent = `Puan ${puan}/100. ` + geriBildirim(kayit, ols);
      dugmeleriSifirla(); birlikteB.textContent = "Tempoda çal";
      calan = null;
      if (secenek.sonucta) secenek.sonucta({ tur: "birlikte", puan });
    }, (basla - c.currentTime) * 1000 + son + 300));
    birlikteB.setAttribute("aria-pressed", "true"); birlikteB.textContent = "■︎ Durdur";
    durumEl.textContent = "Sayımdan sonra başla…";
    calan = () => { bitir(); sesler.forEach((s) => s.dur()); zamanlar.forEach(clearTimeout); temizle(); dugmeleriSifirla(); birlikteB.textContent = "Tempoda çal"; };
  });

  return kok;
}

// Önce iyi giden şey, sonra tek düzeltme (araştırma notu 01, U6-C "geri bildirim dili")
function geriBildirim(kayit, ols) {
  const iyi = kayit.map((r) => r.toplam && r.dogru / r.toplam >= 0.6);
  const sayi = iyi.filter(Boolean).length;
  let enUzun = 0, bas = 0, simdiki = 0, simdikiBas = 0;
  iyi.forEach((v, i) => { if (v) { if (!simdiki) simdikiBas = i; simdiki++; if (simdiki > enUzun) { enUzun = simdiki; bas = simdikiBas; } } else simdiki = 0; });
  let ovgu;
  if (sayi === ols.length) ovgu = "Bütün notalar yerinde ve zamanında. Çok iyi!";
  else if (enUzun >= 3) ovgu = `${bas + 1}–${bas + enUzun}. notalar arası çok temizdi (${sayi}/${ols.length} nota yerinde).`;
  else if (sayi > 0) ovgu = `${sayi}/${ols.length} nota yerindeydi; sesin her denemede oturuyor.`;
  else ovgu = "Sonuna kadar çalmaya devam ettin, bu önemli.";
  const j = iyi.indexOf(false);
  if (j < 0) return ovgu + " Bir sonraki denemede hızı biraz artır.";
  const r = kayit[j], ad = notaYazisi(Math.round(ols[j].pitch));
  let sorun;
  if (r.perdeli < r.toplam * 0.3) sorun = "burada sesi duyamadım; notaya zamanında gir ve nefesi kesme";
  else if (r.ilkDogru != null && r.ilkDogru > 150) sorun = "notaya geç oturdun; parmağı bir önceki notanın sonunda hazırla";
  else { const ort = r.centToplam / Math.max(1, r.perdeli); sorun = ort > 0 ? `ses tiz kaldı (+${Math.round(ort)} cent); dudağı gevşet` : `ses pes kaldı (${Math.round(ort)} cent); nefes desteğini artır`; }
  return `${ovgu} Tek düzeltme: ${j + 1}. nota (${ad}) — ${sorun}. Yalnız o geçişi 5 kez temiz çal, sonra baştan dene.`;
}
