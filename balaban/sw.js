// Otomatik üretildi: araclar/sw-olustur.py — elle düzenleme.
const SURUM = "balaban-354d2d8e35";
const DOSYALAR = [
"./",
"index.html",
"manifest.webmanifest",
"css/app.css",
"css/yazi/BricolageGrotesque-600-latin-ext.woff2",
"css/yazi/BricolageGrotesque-600-latin.woff2",
"css/yazi/IBMPlexMono-500-latin-ext.woff2",
"css/yazi/IBMPlexMono-500-latin.woff2",
"css/yazi/IBMPlexMono-600-latin-ext.woff2",
"css/yazi/IBMPlexMono-600-latin.woff2",
"css/yazi/InstrumentSans-400-latin-ext.woff2",
"css/yazi/InstrumentSans-400-latin.woff2",
"css/yazi/InstrumentSans-400i-latin-ext.woff2",
"css/yazi/InstrumentSans-400i-latin.woff2",
"css/yazi.css",
"js/akort-gosterge.js",
"js/arayuz.js",
"js/cizimler.js",
"js/depo.js",
"js/ders-ekranlari.js",
"js/ders-motoru.js",
"js/dersler/index.js",
"js/dersler/u0-baslamadan.js",
"js/dersler/u1-ilk-ses.js",
"js/dersler/u10-usuller-turkuler.js",
"js/dersler/u11-dem-ve-acis.js",
"js/dersler/u2-uc-ses.js",
"js/dersler/u3-asagi-inmek.js",
"js/dersler/u4-baglar-ve-nefes.js",
"js/dersler/u5-alt-bolge.js",
"js/dersler/u6-nota-okuma.js",
"js/dersler/u7-ilk-makam.js",
"js/dersler/u8-hicaz-ve-sus.js",
"js/dersler/u9-ses-rengi.js",
"js/ekranlar.js",
"js/ilerleme.js",
"js/kamis-model.js",
"js/kayit.js",
"js/main.js",
"js/mikrofon.js",
"js/nota.js",
"js/ortak.js",
"js/oturum.js",
"js/parmak-tablosu.js",
"js/parmak.js",
"js/perde.js",
"js/ritim.js",
"js/ses.js",
"js/tanit.js",
"js/zarf-islemci.js",
"lib/abcjs-basic-min.js",
"ses/LISANSLAR.md",
"ses/duduk/Dod4.wav",
"ses/duduk/Fad3.wav",
"ses/duduk/Fad4.wav",
"ses/duduk/La4.wav",
"ses/duduk/Mi4.wav",
"ses/duduk/Re4.wav",
"ses/duduk/Si3.wav",
"ses/duduk/Sib3.wav",
"ses/duduk/Sold3.wav",
"ses/duduk/Sold4.wav",
"ses/duduk/ornekler.json",
"ses/say-1.m4a",
"ses/say-2.m4a",
"ses/say-3.m4a",
"ses/say-4.m4a",
"ses/say-5.m4a",
"ses/say-6.m4a",
"ses/say-7.m4a",
"ses/say-8.m4a",
"ses/say-9.m4a",
"ses/say-hazir.m4a",
"ses/say-ve.m4a",
"ses/ustalar/juskiddink-bb-duduk.m4a",
"ses/ustalar/juskiddink-c-duduk.m4a",
"ses/ustalar/verunka.m4a",
"ikon/ikon-180.png",
"ikon/ikon-192.png",
"ikon/ikon-512.png",
"ikon/ikon-kare.svg",
"ikon/ikon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SURUM).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== SURUM).map((x) => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.origin === location.origin) {
    // önce önbellek (çevrimdışı ve hızlı); yeni sürüm sw güncellemesiyle gelir
    e.respondWith(caches.match(r, { ignoreSearch: true }).then((m) => m || fetch(r)));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(SURUM + "-yazi").then(async (c) => {
      const m = await c.match(r); if (m) return m;
      const y = await fetch(r); if (y.ok || y.type === "opaque") c.put(r, y.clone()); return y;
    }));
  }
});
