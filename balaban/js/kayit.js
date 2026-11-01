// Kendini kaydet: MediaRecorder ile kayıt, IndexedDB'de saklama, dinleme ve silme.
import { h } from "./ortak.js";

const DB_AD = "balaban-kayit", MAGAZA = "kayitlar";
function dbAc() {
  return new Promise((coz, red) => {
    const r = indexedDB.open(DB_AD, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(MAGAZA, { keyPath: "id" });
    r.onsuccess = () => coz(r.result); r.onerror = () => red(r.error);
  });
}
async function islem(kip, fn) { const db = await dbAc(); return new Promise((coz, red) => { const t = db.transaction(MAGAZA, kip); const s = t.objectStore(MAGAZA); const r = fn(s); t.oncomplete = () => coz(r && r.result); t.onerror = () => red(t.error); }); }
export const kayitlariGetir = () => islem("readonly", (s) => s.getAll());
export const kayitEkle = (k) => islem("readwrite", (s) => s.put(k));
export const kayitSil = (id) => islem("readwrite", (s) => s.delete(id));

// Kaydedici bileşeni (derslerde de kullanılır). etiket: kaydın adı
export function kaydedici(etiket, { kaydedince } = {}) {
  const kok = h("div", { class: "yigin" });
  const b = h("button", { class: "vurgu" }, "● Kaydı başlat");
  const sure = h("span", { class: "kucuk soluk", style: "font-family:var(--font-mono)" });
  const oynat = h("div");
  let kaydedici = null, akis = null, parcalar = [], bas = 0, zam = 0;
  b.addEventListener("click", async () => {
    if (kaydedici) { kaydedici.stop(); return; }
    try { akis = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } }); }
    catch (e) { sure.textContent = "Mikrofon izni gerekli."; return; }
    parcalar = [];
    const tur = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"].find((t) => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || "";
    kaydedici = new MediaRecorder(akis, tur ? { mimeType: tur } : undefined);
    kaydedici.ondataavailable = (e) => e.data.size && parcalar.push(e.data);
    kaydedici.onstop = async () => {
      clearInterval(zam); akis.getTracks().forEach((t) => t.stop());
      const blob = new Blob(parcalar, { type: kaydedici.mimeType || "audio/webm" });
      const kayit = { id: Date.now().toString(36), etiket, tarih: new Date().toISOString(), sure: Math.round((performance.now() - bas) / 1000), blob };
      kaydedici = null; b.textContent = "● Yeniden kaydet";
      try { await kayitEkle(kayit); } catch (e) {}
      oynat.replaceChildren(h("audio", { controls: true, src: URL.createObjectURL(blob), style: "width:100%" }));
      if (kaydedince) kaydedince(kayit);
    };
    kaydedici.start(); bas = performance.now(); b.textContent = "■ Kaydı bitir";
    zam = setInterval(() => { sure.textContent = Math.round((performance.now() - bas) / 1000) + " sn"; }, 250);
  });
  kok.append(h("div", { class: "satir" }, b, sure), oynat);
  return kok;
}

export function kayitEkrani(kok) {
  const liste = h("div");
  async function yenile() {
    let hepsi = [];
    try { hepsi = (await kayitlariGetir()).sort((a, b) => b.tarih.localeCompare(a.tarih)); } catch (e) {}
    liste.replaceChildren();
    if (!hepsi.length) { liste.append(h("p", { class: "soluk" }, "Henüz kaydın yok. Derslerdeki kayıt adımları ve buradaki düğme kayıtlarını burada toplar.")); return; }
    hepsi.forEach((k) => {
      const t = new Date(k.tarih);
      liste.append(h("div", { class: "kayit-satiri" },
        h("div", { class: "yigin", style: "gap:4px" }, h("b", null, k.etiket), h("span", { class: "kucuk soluk" }, `${t.toLocaleDateString("tr-TR")} ${t.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })} · ${k.sure} sn`), h("audio", { controls: true, src: URL.createObjectURL(k.blob) })),
        h("button", { class: "ikincil", "aria-label": "Kaydı sil", onclick: async () => { await kayitSil(k.id); yenile(); } }, "Sil")));
    });
  }
  kok.append(h("div", { class: "yigin" },
    h("a", { href: "#araclar", class: "kucuk" }, "‹ Araçlar"),
    h("h1", null, "Kendini kaydet"),
    h("p", { class: "soluk" }, "Çalarken kendini tam duyamazsın; kayıt dinlerken duyarsın. Haftada bir aynı parçayı kaydet ve önceki haftayla karşılaştır: ses temiz mi, notalar akortlu mu, nefes yerleri doğru mu?"),
    h("div", { class: "kart" }, kaydedici("Serbest kayıt", { kaydedince: yenile })),
    h("h2", null, "Kayıtların"), liste));
  yenile();
}
