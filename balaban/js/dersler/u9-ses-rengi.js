// Ünite 9 — Ses rengi. Hafta 20–26. Aralık: La4–Do6 (Si♭5 baş parmak yarım; Si5 çatal; Do6 hepsi açık + dudak).
// Kaynaklar: 02 §2.6 (dudak basıncı/üst genişleme +200–300 cent), §3.2–3.3 (kamış açıklığı, kıskaç yönü —
// kaynaklar çelişir, fizik: uca = tiz), §6 (vibrato yalnız alt dudak; glissando), §10.3 (vibrato 4–7 Hz,
// uzun ses 6. ay ≥ 20 sn); 03 §5 (dinleme listesi); 01 U6 (kör test, serpiştirme, dudak yükü).
// Ezgiler bu metot için yazıldı (geleneksel değildir).
export default {
  id: "u9",
  baslik: "Ses rengi",
  ozet: "Vibrato, glissando, üst bölge (Si♭5–Do6), 20 saniyelik uzun ses, kamış ve kıskaç ince ayarı, ton için model dinleme.",
  dersler: [
    // ------------------------------------------------------------------
    {
      id: "u9d1",
      baslik: "Vibrato: alt dudak, çene sabit",
      ozet: "Düz sesin üstüne yavaş, düzenli bir dalga; önce sayarak, sonra doğal.",
      sure: 18,
      hedefler: [
        "10 sn düz (vibratosuz) uzun sesi ±15 cent içinde tutmak",
        "Yalnız alt dudakla, saniyede 2 → 4 dalga, düzenli vibrato üretmek",
        "Bir cümlede düz başlayıp uzun notada vibratoya geçmek",
      ],
      giris: "<p>Balabanı 'ağlatan' şey vibratodur. Ama sır şu: vibrato süs değil, <b>düz sesin üstüne konan dalga</b>dır. Düz sesin yoksa vibraton titreme olur. Bugün önce düz, sonra dalga.</p>",
      adimlar: [
        {
          tur: "cizim", cizim: "vibrato", baslik: "Yalnız alt dudak",
          html: "<p>Çene sabit, dişler kamışa değmiyor, kamış 6–10 mm içeride. Oynayan tek şey <b>alt dudak</b>: hafifçe gevşer (ses biraz pesleşir), toparlanır (geri gelir). Çene oynarsa ses 'yutulur'; karın oynarsa (nefes vibratosu) ses pompalanır. İkisi de balaban üslubu değil.</p>",
          not: "<p>Vardanyan (duduk.com): vibrato 'yalnızca alt dudağı oynatarak, çeneyle değil'. Mey ustaları da aynı şeyi 'kamışı dudakta kısıp açma' diye anlatır (Şahin 2018). Ölçülen vibrato genelde saniyede 4–7 dalga, ±20–50 cent genliktedir.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Önce düz: 10 saniye",
          html: "<p>Vibratosuz, dümdüz. Sesi odanın karşı duvarına gönder, ortasında hiçbir şey değişmesin. Bu, vibratonun üstüne oturacağı zemin.</p>",
          nota: "D5", saniye: 10, tekrar: 2, dem: "A4", tolerans: 15,
        },
        {
          tur: "metin", baslik: "Dalgayı sayarak kur",
          html: "<p>Saat gibi düşün: metronom 60'ta her vuruşta alt dudağı bir gevşet-topla. Bu saniyede 1 dalga; <b>çok yavaş</b>, bilerek. Rahatlayınca her vuruşta iki dalga (2/sn), sonra üç, sonra dört. Dört-beş dalga doğal vibratonun hızıdır. Saymayı bırakıp sese bıraktığın gün vibrato senin olmuştur.</p>",
          not: "<p>Tempoyu zorlama: saniyede 2 dalga bir hafta sürerse normaldir. Hızlı ve bozuk dalga, yavaş ve düzgün dalgadan kötüdür.</p>", notTuru: "ipucu",
        },
        {
          tur: "sureli", baslik: "Dalga çalışması (serbest)",
          html: "<p>3 dakika: Re üstünde 1/sn → 2/sn → 3/sn → 4/sn. Her hızda 4 dalga düzgünse bir sonrakine geç. Uygulama burada perde ölçmez; sayaç yalnız ses duyulurken ilerler. Dudak ağrırsa dur.</p>",
          dakika: 3,
        },
        {
          tur: "dinle", baslik: "Düz → vibrato (model)",
          html: "<p>Sentez vibrato yapamaz; bu yüzden modelin uzun notalarında dalgayı <b>sen hayal et</b>: her uzun nota düz başlar, ikinci yarısında dalgalanır. Bu ezgi bu metot için yazıldı, Hüseynî renkte.</p>",
          abc: "X:1\nM:4/4\nL:1/8\nQ:1/4=60\nK:C\ne4 e2 d2 | c2 d2 e4 | d4 c2 _/B2 | A8 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Düz başla, dalgaya geç",
          notaBaslik: "Vibrato cümlesi (bu metot için yazıldı)",
          html: "<p>Her uzun notada (birlik ve son La) ilk yarı düz, ikinci yarı vibrato. Uygulama ortalama perdeyi ölçer; dalga dengeliyse ortalama bantta kalır. Eşik 60 puan. Üç tempo gerekmez; %80 yeterli.</p>",
          abc: "X:1\nM:4/4\nL:1/8\nQ:1/4=60\nK:C\ne4 e2 d2 | c2 d2 e4 | d4 c2 _/B2 | A8 |]",
          bpm: 60, dem: "A4", gecme: 60,
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: Hicaz dörtlüsü",
          html: "<p>Ünite 8'den. Vibrato çalışmasından sonra dudak yorgundur; yarım delikte (Do♯) dudakla düzeltmeye kalkma, parmağa güven.</p>",
          dizi: ["A4", "Bb4", "C#5", "D5", "C#5", "Bb4", "A4"],
        },
        {
          tur: "kayit", baslik: "Kaydet: dalgayı duy",
          html: "<p>Re üstünde 8 sn: 4 sn düz, 4 sn vibrato. Dinle ve dürüstçe cevapla.</p>",
          etiket: "Ünite 9 — ilk vibrato",
          kontrol: [
            "Ses: dalga düzenli mi, yoksa titreme gibi mi?",
            "Perde: vibratoya geçince ses ortalama olarak pesleşti mi?",
            "Zaman: dalgalar eşit aralıklı mı?",
          ],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "10 sn düz uzun seste en az 1 deneme bantta",
            "Saniyede 2 dalgayı düzenli yapabiliyorum (çene sabit)",
            "Kayıtta düz bölüm ile vibratolu bölüm açıkça ayrılıyor",
          ],
        },
      ],
      kapanis: "<p>Vibrato haftalar ister; her gün 2 dakika yeter. Yarın sesleri birbirine <b>akıtmayı</b> (glissando) ve nefesi 15 saniyeye uzatmayı çalışacağız.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u9d2",
      baslik: "Glissando ve uzun nefes (15 sn)",
      ozet: "Kaydırmayı dudak ve parmakla cümleye yerleştirmek; uzun sesi 10'dan 15 saniyeye çıkarmak.",
      sure: 18,
      hedefler: [
        "15 sn uzun sesi ±15 cent içinde tutmak",
        "Karar sesine glissando ile inmek (Re→La) basamaksız",
        "Glissandolu cümleyi tempoda ≥60 puanla çalmak",
      ],
      giris: "<p>Azerbaycan balabanının imzası, cümle sonunda karara <b>kayarak</b> inmektir. Bunun için iki şey gerekir: akan parmak ve yeten nefes. Bugün ikisi.</p>",
      adimlar: [
        {
          tur: "cizim", cizim: "nefes", baslik: "Nefesi uzatmak: daha çok değil, daha az",
          html: "<p>15 saniye için daha büyük nefes değil, daha <b>tutumlu</b> hava gerekir. Nefes alırken karın genişler; üflerken karın kasları havayı yavaş ve eşit bırakır. Ses sonunda kalan havayı 'boşaltma'; notayı temiz bitir, kalan nefes burundan çıkar.</p>",
          not: "<p>Araştırma protokolü: 3. ayda ≥12 sn, 6. ayda ≥20 sn kararlı uzun ses (sapma ≤8–12 cent). Bu ünite 12→20 köprüsüdür. Göz tansiyonun (glokom) varsa uzun ıkınmalı üflemeden önce doktoruna sor.</p>",
        },
        {
          tur: "uzun-ses", baslik: "15 saniye: La",
          html: "<p>Karar sesi, dem üstünde. İlk 5 sn kolay, 10'da nefes 'bitiyor' hisseder; o anda karın kaslarını biraz daha kat, perdeyi düşürme. Sonunda tahmin: sona doğru pesleştin mi?</p>",
          nota: "A4", saniye: 15, tekrar: 2, dem: true, tolerans: 15,
          sonra: "<p>1 dakika dinlen. Baş dönmesi olursa otur, normal nefes al.</p>",
        },
        {
          tur: "metin", baslik: "Glissando: iki araç",
          html: "<p><b>Dudak glissandosu</b>: yarım–bir ses içinde, 'O' dudağından (pes) 'İ' dudağına (tiz) kayarak. <b>Parmak glissandosu</b>: daha geniş aralıkta, parmakları delikten <i>sırayla ve yavaşça</i> kaydırarak; her delik kapanırken yarım delikten geçer, ses basamaksız iner. Karara iniş Re→La için: 6, 7, 8. parmaklar sırayla kayar, son anda dudak hafif gevşer ve La'ya 'oturur'.</p>",
        },
        {
          tur: "dinle", baslik: "Karara kayarak iniş (model)",
          html: "<p>Bu ezgi bu metot için yazıldı, Azerbaycan Şur üslubunda. Her cümle sonunda bağ altındaki Re→La inişi glissando ile. Sentez basamaklı çalar; sen akıtacaksın.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=63\nK:C\ne2 d c d2 e2 | d2 c _/B (d4 | A4) z4 |\ne2 f e d2 c2 | _/B2 c d (d4 | A4) z4 |]",
          dem: "A4",
        },
        {
          tur: "sureli", baslik: "Glissando çalışması (serbest)",
          html: "<p>2 dakika: Re→La parmak glissandosu, 6 kez yavaş; sonra Do→Si² dudak glissandosu, 6 kez. Her inişte son ses <b>oturmalı</b>, titrememeli.</p>",
          dakika: 2,
        },
        {
          tur: "eser", baslik: "Glissandolu cümleyi çal",
          notaBaslik: "Kayarak iniş (bu metot için yazıldı)",
          html: "<p>Önce Notayla ilerle (glissandosuz), sonra tempoda glissandolu. Kayma sırasında ölçüm 'ara sesler' görür; eşik 60 puan. Asıl ölçüt: iniş sonunda La bantta ve zamanında.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=63\nK:C\ne2 d c d2 e2 | d2 c _/B (d4 | A4) z4 |\ne2 f e d2 c2 | _/B2 c d (d4 | A4) z4 |]",
          bpm: 63, dem: "A4", gecme: 60,
          not: "<p>Hata avı: kayma La'ya varmadan duruyorsa 8. parmak geç kapanıyordur. Yalnız Si♭→La son adımını 5 kez; sonra tam inişe koy.</p>", notTuru: "ipucu",
        },
        {
          tur: "uzun-ses", baslik: "Serpiştirme: Si² 10 sn + vibrato",
          html: "<p>Koma sesi, dünkü vibrato ile: ilk 5 sn düz, sonra dalga. Ortalama bantta kalsın.</p>",
          nota: "B4@-50", saniye: 10, tekrar: 2, dem: "A4", tolerans: 25,
        },
        {
          tur: "ritim", baslik: "Serpiştirme: 6/8",
          html: "<p>Her notayı nefesle başlat; Sol'de çal. Uzun nefes çalışmasından sonra kısa notalar: karın hızlı tepki vermeli.</p>",
          desen: ".5 .5 .5 1.5 | 1 .5 1.5", olcu: "6/8", bpm: 80, nota: "G5",
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "15 sn La uzun sesinde en az 1 deneme bantta",
            "Re→La inişinde basamak duyulmuyor ve La'da oturuyorum",
            "Glissandolu cümleyi 60 puan üstünde çaldım",
          ],
        },
      ],
      kapanis: "<p>Nefesin uzadı, parmakların akıyor. Yarın yukarı çıkıyoruz: Si♭5, Si5 ve Do6 — balabanın tavan arası.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u9d3",
      baslik: "Üst bölge: Si♭5, Si5, Do6",
      ozet: "La5'in üstündeki üç ses dudakla alınır; kısa tutuşlar, zorlama yok.",
      sure: 16,
      hedefler: [
        "Si♭5'i (baş parmak yarım) 3 sn, ±35 cent içinde tutmak",
        "Si5 ve Do6'yı 2 sn, ±40 cent içinde çıkarmak",
        "Sol–La–Si♭ tepeli kısa ezgiyi tempoda ≥60 puanla çalmak",
      ],
      giris: "<p>Balabanda oktav perdesi yoktur; yukarı çıkmak için daha çok üflemek işe yaramaz. Üst sesler <b>dudak + hava hızı</b> ile alınır. Üç kural: kısa tut, zorlama, ağrıyorsa dur.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Zorlamadan yukarı",
          html: "<p><b>Si♭5</b>: baş parmak deliği yarım (düdükte 1. delik yarım); kamışa göre değişir, uygulama söyler. <b>Si5</b>: balabanda çatal parmak (1 açık, 2–5 kapalı) + dudak; düdükte yalnız baş parmak. <b>Do6</b>: hepsi açık + dudak sıkma. 'Sıkma' derken: hava <i>hızlanır</i>, basınç artmaz; 'İ' dudağı, dişler değmez. Bugün her sese en çok 3 saniye.</p>",
          not: "<p>Kaynaklar: açık pozisyondan dudakla +200–300 cent genişleme mümkün (Bleth; Eren: 2. oktav Do, Do♯, Re 'dudak ve nefesle ustalık gerektiren teknik'). Dudukhouse 'üst notalarda dudak tamamen gevşek' der, Bleth 'sıkarak' — çelişki; kastedilen 'ısırmadan, kontrollü sıkma'.</p>",
        },
        {
          tur: "parmak", baslik: "Üç şema",
          html: "<p>Dokun, dinle. Si♭5 ve Si5 şeması çalgına göre değişir; uygulama senin çalgını gösteriyor.</p>",
          notalar: ["A5", "Bb5", "B5", "C6"],
        },
        {
          tur: "uzun-ses", baslik: "Si♭5 — 3 saniye",
          html: "<p>La5'ten başla, baş parmağı yarıya kaydır, dudağı bir tık sık. Ses yarım yukarı çıksın. Tolerans geniş; yerini bulmak yeter.</p>",
          nota: "Bb5", saniye: 3, tekrar: 3, dem: "A4", tolerans: 35,
          sonra: "<p>30 sn dinlen.</p>",
        },
        {
          tur: "nota-dizisi", baslik: "Sol–La–Si♭–La–Sol",
          html: "<p>Tepeye dokunup geri in. Si♭5'te durma; dokun ve in. İki kez.</p>",
          dizi: ["G5", "A5", "Bb5", "A5", "G5", "G5", "A5", "Bb5", "A5", "G5"],
        },
        {
          tur: "uzun-ses", baslik: "Si5 — 2 saniye",
          html: "<p>Çatal parmak (ya da düdükte baş parmak) + dudak. Cılız çıkarsa normal; 2 sn, bantta, yeter.</p>",
          nota: "B5", saniye: 2, tekrar: 3, dem: "A4", tolerans: 40,
        },
        {
          tur: "uzun-ses", baslik: "Do6 — 2 saniye",
          html: "<p>Hepsi açık; 'İ' dudağı, hava hızlı. Kamış buna izin vermiyorsa bugün çıkmayabilir; bu bir hata değil, kamış ayarı (yarınki ders). Ağrı = dur.</p>",
          nota: "C6", saniye: 2, tekrar: 2, dem: "A4", tolerans: 40,
          sonra: "<p>1 dakika dinlen. Üst bölge dudağı en çok yoran şeydir.</p>",
        },
        {
          tur: "dinle", baslik: "Tepeli ezgi (model)",
          html: "<p>Bu ezgi bu metot için yazıldı. Bir kez Si♭5'e dokunup iniyor; Kürdî renkte, La karar. Tepe notayı 'bağırarak' değil, 'uzanarak' hayal et.</p>",
          abc: "X:3\nM:4/4\nL:1/8\nQ:1/4=72\nK:C\ne2 f g a2 g2 | a2 _b a g2 f2 | e2 f e d2 c2 | d4 z4 |\ne2 d c _B2 c2 | d2 c _B A2 _B2 | c2 _B A _B2 A2 | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Tepeli ezgiyi çal",
          notaBaslik: "Tepeli ezgi (bu metot için yazıldı)",
          html: "<p>%60 → %100 → %80. Si♭5 bir sekizlik; dokun, in. Eşik 60 puan. Üst nota kaçarsa bir alt ölçüde nefes al ve tekrar yukarı uzan.</p>",
          abc: "X:3\nM:4/4\nL:1/8\nQ:1/4=72\nK:C\ne2 f g a2 g2 | a2 _b a g2 f2 | e2 f e d2 c2 | d4 z4 |\ne2 d c _B2 c2 | d2 c _B A2 _B2 | c2 _B A _B2 A2 | A4 z4 |]",
          bpm: 72, dem: "A4", gecme: 60,
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: alt bölge",
          html: "<p>Tepeden sonra dibe: La–Si♭–Si²–Si–Do–Si–Si²–Si♭–La. Dudağı üst bölgenin sıkılığından <b>serbest bırak</b>; en altta dudak gevşek olmalı.</p>",
          dizi: ["A4", "Bb4", "B4@-50", "B4", "C5", "B4", "B4@-50", "Bb4", "A4"],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Si♭5'i 3 sn tutabiliyorum (en az 2 deneme bantta)",
            "Si5 ya da Do6'dan en az biri bantta çıktı",
            "Tepeli ezgiyi 60 puan üstünde çaldım; dudak ağrımadı",
          ],
        },
      ],
      kapanis: "<p>Tavan arasını gördün; sık gitme, ama yolunu bil. Yarın kamış ve kıskaçla ses rengini <b>ayarlamayı</b> ve ustaları nasıl dinleyeceğini öğreneceksin.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u9d4",
      baslik: "Kamış, kıskaç ve ustaları dinlemek",
      ozet: "Kıskacı 1 mm oynat, ölç; kamış açıklığını oku; ton rengini modellerden öğren.",
      sure: 18,
      hedefler: [
        "Kıskaç yönünü kendi çalgında ölçerek belirlemek (uca → tiz)",
        "Kalibrasyon uzun sesini ayar öncesi ve sonrası ±15 cent içinde tutmak",
        "Dinleme listesinden iki ustayı belirli bir soruyla dinlemek",
      ],
      giris: "<p>Aynı çalgı, aynı parmak, farklı kamış: bambaşka ses. Bugün elinin altındaki iki ayar düğmesini (kamış açıklığı, kıskaç) ve kulağının modelini kuruyoruz.</p>",
      adimlar: [
        {
          tur: "cizim", cizim: "kamis-acikligi", baslik: "Açıklığı oku",
          html: "<p>Uç açıklığı ~1–1,5 mm. <b>Çok kapalı/kuru</b>: ses cılız, tiz, üst notalar fazla tiz. <b>Çok açık/ıslak</b>: üflemesi sert, ses pes ve kararsız, üst notalar çıkmıyor, çok nefes gidiyor. Dünkü Do6 çıkmadıysa ilk bakacağın yer burası. Düzeltme: kapalıysa sıcak nefes ya da içine birkaç damla ılık su, çalkala, boşalt, kapağı tak, 5–15 dk dik bekle; açıksa kapağı takıp bekle. <b>Uzun süre suda bırakma.</b></p>",
          not: "<p>Kaynaklar ayrışıyor: Türk kaynakları yalnız nefesle nemlendirme (Eren), Ermeni kaynakları az su (Vardanyan, Bleth), Dudukhouse 'ıslatma'. Hepsi kamışın <i>içini</i> nemlendirmekte birleşiyor; önerimiz: az su ya da nefes, asla uzun ıslatma.</p>",
        },
        {
          tur: "cizim", cizim: "kiskac", baslik: "Kıskaç: fizik ne der",
          html: "<p>Kıskaç kamışın yassı kısmının ortasında durur. <b>Uca</b> (ağza giren tarafa) yaklaştıkça açıklık daralır, titreşen kısım kısalır: ses <b>tizleşir</b>. <b>Dibe</b> çekildikçe açıklık büyür: ses <b>pesleşir</b>, nefes tüketimi artar. Ayar aralığı ±50 cent kadar; yarım ses zorlamadır. Uzun çalışta kamış şişer, ses pesleşir; o zaman kıskacı bir tık uca.</p>",
          not: "<p>Kaynak ifadeleri birbirine uymuyor: Dudukhouse 'aşağı indirince tizleşir', Eren &amp; Tansever 'altına doğru çek' der ama 'aşağı/alt' hangi uca göre belirsiz. Fizik (Kalın'ın tarifiyle de uyumlu) açık: açıklığı daraltan yön tizleştirir. Bu yüzden kuralımız ölçmeye dayanır.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Kalibrasyon 1: ayar öncesi La",
          html: "<p>Hiçbir şeye dokunmadan La'yı tut. Sonuçtaki cent değerini aklında tut (örn. −12).</p>",
          nota: "A4", saniye: 6, tekrar: 1, dem: true, tolerans: 15,
        },
        {
          tur: "metin", baslik: "1 mm kuralı",
          html: "<p>Şimdi kıskacı <b>1 mm</b> uca doğru it; başka bir şey değiştirme. Bir sonraki adımda La'yı yine tut ve iki sayıyı karşılaştır. Sayı yukarı gittiyse (örn. −12 → −4) o yön senin çalgında 'tiz'dir; kuralı doğruladın. Yukarı gitmediyse kıskaç kaymış değil dönmüş olabilir; geri al, tekrar dene. Çalmayı bitirince kıskacı gevşet, kapağı tak.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Kalibrasyon 2: ayar sonrası La",
          html: "<p>Aynı La. Sonucu öncekiyle karşılaştır. Hedef: bantta ve öncekinden daha merkezde.</p>",
          nota: "A4", saniye: 6, tekrar: 2, dem: true, tolerans: 15,
        },
        {
          tur: "uzun-ses", baslik: "Üst kontrol: La5",
          html: "<p>Kıskaç üst bölgeyi daha çok etkiler. La5'i tut; alt La ile aynı yönde mi sapıyor? Değilse kamış değil, dudak ayarı gerekir (üstte biraz daha sık).</p>",
          nota: "A5", saniye: 6, tekrar: 2, dem: "A4", tolerans: 15,
        },
        {
          tur: "metin", baslik: "Ustaları nasıl dinlemeli",
          html: "<p>Ton rengi okuyarak öğrenilmez; <b>bir soruyla</b> dinlenerek öğrenilir. Bu adları kendi müzik uygulamanda ara (bağlantı vermiyoruz; adlar yeter):</p><ul><li><b>Djivan Gasparyan</b> — <i>I Will Not Be Sad in This World</i>: dem üstünde ton; nefes sesi nasıl 'şişiriyor', vibrato dudaktan.</li><li><b>Alihan Samedov</b> — <i>Balaban</i> albümleri: cümle sonunda glissando ile karara iniş; nefesli, geniş vibrato.</li><li><b>Gevorg Dabaghyan</b> — <i>Miniatures</i>: temiz entonasyon, az süsleme.</li><li><b>Kamil Cəlilov</b> — Voyager Altın Plak'taki muğam: tek nefeste perde perde tırmanış, mayəye (karara) dönüş.</li><li><b>Binali Selman</b> — TRT arşivi, mey: kısa, kesik üslup; Azeri üslubuyla fark.</li></ul>",
        },
        {
          tur: "metin", baslik: "Dinleme ödevi (bu hafta)",
          html: "<p>Gasparyan'dan bir parça: yalnız <b>uzun notaların sonlarını</b> dinle; ses nasıl bitiyor, vibrato ne zaman başlıyor? Samedov'dan bir parça: yalnız <b>karara inişleri</b> dinle; kaç tanesi glissando? Her birinde 3 örnek yer not et. Cevaplar yarınki kaydında işine yarayacak.</p>",
          not: "<p>Kayıt–model karşılaştırması, öz-değerlendirmeyi işe yarar kılan tek şeydir (Hewitt 2001). Usta kaydı, uygulamanın sentezinden daha iyi bir modeldir; bu yüzden ton için ustayı dinle.</p>",
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: Hicaz tam dizi",
          html: "<p>Yeni kıskaç ayarıyla iki yarım delikli diziyi dene: Do♯ ve Sol♯ hâlâ yerinde mi?</p>",
          dizi: ["A4", "Bb4", "C#5", "D5", "E5", "F5", "G#5", "A5", "G#5", "F5", "E5", "D5", "C#5", "Bb4", "A4"],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Kıskacı 1 mm oynatınca cent değerinin hangi yöne gittiğini ölçerek gördüm",
            "Ayar sonrası La4 ve La5 bantta",
            "Kamışımın bugün 'kapalı/doğru/açık' durumunu söyleyebiliyorum",
            "İki ustayı sorulu dinleme ödevini planladım (gün ve parça)",
          ],
        },
      ],
      kapanis: "<p>Artık sesin yalnızca dudağında değil, elinin altındaki iki küçük ayarda. Yarın ünite sınavı: 20 saniyelik nefes, vibrato, tepe ve kayıt.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u9d5",
      baslik: "Ünite sınavı: Ses rengi",
      ozet: "20 sn kör uzun ses, üst bölge, ritim, tepeli ezgi tempoda; model, kayıt ve ustayla karşılaştırma.",
      sure: 20,
      hedefler: [
        "20 sn kör uzun sesi bantta tutmak",
        "Üst bölge dizisini (Sol5–Si♭5) temiz çalmak",
        "Tepeli ezgiyi vibrato ve glissando ile tempoda ≥65 puanla çalmak; kaydı modelle değerlendirmek",
      ],
      giris: "<p>Altı aylık hedef bugün: 20 saniye. Sonra bu ünitede öğrendiğin her şeyi tek ezgiye koyup kaydedeceksin.</p>",
      adimlar: [
        {
          tur: "uzun-ses", baslik: "Kör 1: 20 saniye La",
          html: "<p>Gösterge yok, dem yok. Tutumlu hava; 15. saniyede karın kaslarını biraz daha kat. Bitince tahmin: sona doğru pes mi, tiz mi, tam mı?</p>",
          nota: "A4", saniye: 20, tekrar: 2, tolerans: 15,
          sonra: "<p>1 dakika dinlen.</p>",
        },
        {
          tur: "nota-dizisi", baslik: "Üst bölge: Sol–La–Si♭–La–Sol",
          html: "<p>Tepeye dokun, in. Zorlamadan.</p>",
          dizi: ["G5", "A5", "Bb5", "A5", "G5"],
        },
        {
          tur: "ritim", baslik: "Ritim: 4/4 sekizlikli",
          html: "<p>Her notayı nefesle başlat; Fa'da çal.</p>",
          desen: "1 .5 .5 1 1 | .5 .5 1 2", olcu: "4/4", bpm: 84, nota: "F5",
        },
        {
          tur: "uzun-ses", baslik: "Kör 2: Re, düz → vibrato",
          html: "<p>12 sn: ilk 6 düz, son 6 vibrato. Uygulama ortalamayı ölçer; dalga dengeliyse bantta kalırsın.</p>",
          nota: "D5", saniye: 12, tekrar: 2, tolerans: 20,
        },
        {
          tur: "uzun-ses", baslik: "Kör 3: Si♭5",
          html: "<p>3 sn, baş parmak yarım. Tahmin: Si♭'nin yerinde misin, La'ya mı düştün?</p>",
          nota: "Bb5", saniye: 3, tekrar: 2, tolerans: 35,
        },
        {
          tur: "dinle", baslik: "Model: sınav ezgisi",
          html: "<p>Bu ezgi bu metot için yazıldı; Hüseynî renkte, bir kez Si♭5'e uzanıyor, her cümle sonunda bağla karara iniyor. Çalarken: uzun notalarda vibrato, bağlı inişlerde glissando. Sentezde ikisi de yok; kafanda ekle.</p>",
          abc: "X:4\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\ne2 f g a2 g2 | a2 _b a g2 e2 | d2 e d c2 _/B2 | (d4 A4) |\ne2 e f e2 d2 | c2 d c _/B2 c2 | d2 c _/B (c2 A2) | A8 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Sınav ezgisi: tempoda",
          notaBaslik: "Ses rengi sınav ezgisi (bu metot için yazıldı)",
          html: "<p>%60 ile bir kez süssüz; sonra %100 ile vibrato ve glissando ekleyerek. Eşik 65 puan. Son La'yı 4 vuruş boyunca vibratolu ve temiz bitir.</p>",
          abc: "X:4\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\ne2 f g a2 g2 | a2 _b a g2 e2 | d2 e d c2 _/B2 | (d4 A4) |\ne2 e f e2 d2 | c2 d c _/B2 c2 | d2 c _/B (c2 A2) | A8 |]",
          bpm: 66, dem: "A4", gecme: 65,
        },
        {
          tur: "kayit", baslik: "Kaydet; modelle ve ustayla karşılaştır",
          html: "<p>Aynı ezgiyi dem ile, vibrato ve glissandolu kaydet. Önce uygulamanın modelini, sonra bu hafta dinlediğin ustadan bir cümleyi, sonra kendini dinle. Üç soru; 'iyiydi' cevap değildir.</p>",
          etiket: "Ünite 9 sınavı — Ses rengi",
          kontrol: [
            "Ses: vibratom ustanınkine göre çok mu hızlı, çok mu geniş? Uzun notaların sonu nasıl bitiyor?",
            "Perde: Si♭5 ve Si² yerinde mi; 20 saniyelik sesin sonu pesleşti mi?",
            "Zaman: glissandolar karar notasını geciktirdi mi?",
          ],
        },
        {
          tur: "kontrol", baslik: "Üniteyi bitirme ölçütü",
          maddeler: [
            "20 sn kör uzun seste en az 1 deneme bantta ve tahminim doğru",
            "Üst bölge dizisini temiz çaldım",
            "Sınav ezgisini tempoda 65 puan üstünde çaldım",
            "Kaydımı ustayla karşılaştırıp en az bir somut fark yazdım",
          ],
        },
      ],
      kapanis: "<p>Altı ay önce tek bir Fa tutamıyordun; bugün 20 saniye tutup üstüne dalga koyuyorsun. Ünite 10'da aksak usuller ve gerçek türküler geliyor: Havada Bulut Yok ve Ben Bir Avuç Darı Olup.</p>",
    },
  ],
};
