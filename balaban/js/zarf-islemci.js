// AudioWorklet: her 128 örneklik blok için ses şiddeti (RMS) ve blok başlangıç zamanı.
// Nota başlangıçlarını ekran yenilemesinden bağımsız, ~3 ms çözünürlükle bulmak için.
class ZarfIslemci extends AudioWorkletProcessor {
  constructor() { super(); this.tampon = []; }
  process(girisler) {
    const kanal = girisler[0] && girisler[0][0];
    if (kanal) {
      let s = 0;
      for (let i = 0; i < kanal.length; i++) s += kanal[i] * kanal[i];
      this.tampon.push(currentTime, Math.sqrt(s / kanal.length));
      if (this.tampon.length >= 16) { this.port.postMessage(this.tampon); this.tampon = []; }
    }
    return true;
  }
}
registerProcessor("zarf-islemci", ZarfIslemci);
