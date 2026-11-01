// Uygulama girişi: yönlendirme, dudak molası, servis çalışanı.
import * as mik from "./mikrofon.js";
import { h, calismaSuresiTut } from "./ortak.js";
import { bugunEkrani, derslerEkrani, dersEkrani } from "./ders-ekranlari.js";
import { akortEkrani, ritimEkrani, araclarEkrani } from "./ekranlar.js";
import { hepsiniDurdur } from "./nota.js";
import { demDurdur } from "./ses.js";
import { baslangicGunu, ilkAy } from "./ilerleme.js";

const ekran = document.getElementById("ekran");
let temizle = null;

function yonlendir() {
  const iz = (location.hash || "#bugun").slice(1);
  const [ana, ...kalan] = iz.split("-");
  const alt = kalan.join("-");
  if (temizle) { try { temizle(); } catch (e) { console.error(e); } temizle = null; }
  hepsiniDurdur(); demDurdur();
  mik.durdur(); // mikrofon yalnızca ona ihtiyaç duyan ekranda açık kalır
  ekran.replaceChildren();
  let sonuc;
  switch (ana) {
    case "dersler": sonuc = derslerEkrani(ekran); break;
    case "ders": sonuc = dersEkrani(ekran, alt); break;
    case "akort": sonuc = akortEkrani(ekran); break;
    case "ritim": sonuc = ritimEkrani(ekran); break;
    case "araclar": sonuc = araclarEkrani(ekran, alt); break;
    default: sonuc = bugunEkrani(ekran);
  }
  temizle = typeof sonuc === "function" ? sonuc : null;
  const sekme = ana === "ders" ? "dersler" : ["dersler", "akort", "ritim", "araclar"].includes(ana) ? ana : "bugun";
  document.querySelectorAll("nav.sekmeler a").forEach((a) => (a.dataset.sekme === sekme ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
  window.scrollTo({ top: 0 });
}

// ---- Dudak molası (ilk ay: her 3 dk ses sonrası 45 sn) ----
let sesliSure = 0, sonZ = null, molada = false;
const KATMAN = h("div", { class: "mola", role: "dialog", "aria-modal": "true", hidden: true });
document.body.append(KATMAN);
function molaGoster() {
  molada = true;
  let kalan = 45;
  const sayac = h("div", { class: "bpm-buyuk" }, "0:45");
  KATMAN.replaceChildren(h("div", { class: "kart yigin", style: "max-width:28rem" },
    h("div", { class: "ust-yazi" }, "Dudak molası"),
    h("h2", null, "Kamışı dudaktan ayır"),
    h("p", null, "3 dakikadır çalıyorsun. İlk haftalarda dudak kasları çabuk yorulur; yorgun dudakla çalmak sesi bozar ve yanlış alışkanlık bırakır. Bu sürede çalıştığın ezgiyi içinden söyle ya da parmaklarını sessizce gezdir."),
    sayac,
    h("button", { class: "ikincil", onclick: kapat }, "Molayı geç")));
  KATMAN.hidden = false;
  const z = setInterval(() => { kalan--; sayac.textContent = `0:${String(Math.max(0, kalan)).padStart(2, "0")}`; if (kalan <= 0) kapat(); }, 1000);
  function kapat() { clearInterval(z); KATMAN.hidden = true; molada = false; sesliSure = 0; }
}
mik.abone((o) => {
  const dt = sonZ == null ? 0 : Math.min(0.1, o.zaman - sonZ); sonZ = o.zaman;
  if (molada) return;
  if (o.sesli && o.midi != null) sesliSure += dt;
  if (ilkAy() && sesliSure >= 180) molaGoster();
});
calismaSuresiTut();

const stil = document.createElement("style");
stil.textContent = `.mola{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:24px max(16px,env(safe-area-inset-left,0px));background:color-mix(in srgb,var(--paper) 88%,transparent);backdrop-filter:blur(4px)}`;
document.head.append(stil);

// Arka plana geçince mikrofonu ve sesleri kapat; dönünce açık olan mikrofonu yeniden aç
let arkaPlandaKapandi = false;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { arkaPlandaKapandi = mik.acikMi(); mik.durdur(); demDurdur(); hepsiniDurdur(); }
  else if (arkaPlandaKapandi) { arkaPlandaKapandi = false; mik.baslat(); }
});

baslangicGunu();
window.addEventListener("hashchange", yonlendir);
yonlendir();

// Geliştirici testi için
window.__balaban = { mik };

// Çevrimdışı çalışma (geliştirme sırasında localhost'ta kapalı, eski dosya göstermesin)
const yerel = ["localhost", "127.0.0.1"].includes(location.hostname);
if ("serviceWorker" in navigator && location.protocol === "https:" && !yerel) navigator.serviceWorker.register("sw.js").catch(() => {});
