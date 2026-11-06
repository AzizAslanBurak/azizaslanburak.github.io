// Ünite 8 — Hicaz ve süs. Hafta 16–20. Aralık: La4–La5; Do♯5 (6. delik yarım), Sol♯5 (2. delik yarım).
// Kaynaklar: 03 §2.1 (Çahargah/Hümayun ≈ Hicaz), §2.3, §7.3 (Hicaz dörtlüsü alıştırması);
// 02 §2.6 (dudak/üfleme → perde), §6 (çarpma, tril, glissando; dinamik diyafram desteğiyle), §10.3.
// Ezgiler bu metot için yazıldı (geleneksel değildir).
export default {
  id: "u8",
  baslik: "Hicaz ve süs",
  ozet: "İkinci yarım delik Do♯ ile Hicaz rengi; çarpma, tril, kaydırma; p'den f'ye dinamik ve dudakla perde düzeltme.",
  dersler: [
    // ------------------------------------------------------------------
    {
      id: "u8d1",
      baslik: "Hicaz dörtlüsü: Do♯ yarım delik",
      ozet: "La–Si♭–Do♯–Re: ortadaki geniş adım Hicaz'ın imzasıdır. Do♯ için 6. delik yarım.",
      sure: 16,
      hedefler: [
        "Do♯5'i 6. delik yarım ile ±20 cent içinde 6 sn tutmak",
        "Hicaz dörtlüsünü inip çıkarken Si♭→Do♯ geçişini temiz yapmak",
        "Hicaz dörtlü ezgisini tempoda ≥70 puanla çalmak",
      ],
      giris: "<p>Kürdî'de La–Si♭–Do–Re çalıyordun. Do'yu yarım ses yukarı it: La–Si♭–<b>Do♯</b>–Re. Tek nota değişti; renk bambaşka. Buna <b>Hicaz</b> denir; Azerbaycan'da <i>Çahargah</i>'ın dörtlüsü aynıdır.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Geniş adım",
          html: "<p>Hicaz dörtlüsünün adımları: yarım (La→Si♭), <b>bir buçuk</b> (Si♭→Do♯), yarım (Do♯→Re). O bir buçukluk adım kulağa 'Doğu' diye kazınan sesin kendisidir. Teknik olarak iş Do♯'te: 6. deliği yarım açacaksın; Ünite 5'te öğrendiğin yarım delik hareketinin aynısı, bu kez 6. delikte.</p>",
          not: "<p>Erzurum oyun havalarının yaklaşık %10'u Hicaz; Azerbaycan'da Çahargah ve Hümayun ailesi düğün ve dans müziğinde yaygın. Kalın'ın mey tarifinde Do♯ 'kamışı sıkıp üflemeyi artırarak' da alınabilir; biz önce parmakla, dudak yalnız ince ayar.</p>",
        },
        {
          tur: "cizim", cizim: "yarim-delik", baslik: "Yarım delik: kaydır, yuvarlama",
          html: "<p>Parmağı deliğin üstünde <b>kaydırarak</b> yarısını aç; parmağı yuvarlayıp kenarını kaldırma, çünkü o zaman açıklık her seferinde farklı olur. Hedef: Do ile Re'nin tam ortası. Uygulama cent cinsinden söyleyecek: eksi çıkıyorsa biraz daha aç, artı çıkıyorsa biraz kapat.</p>",
        },
        {
          tur: "parmak", baslik: "Üç parmak şeması",
          html: "<p>Si♭ (balabanda 8 açık, düdükte 8 yarım), Do♯ (6 yarım), Re (6 açık). Dokun, dinle, sessizce parmakla.</p>",
          notalar: ["Bb4", "C#5", "D5"],
        },
        {
          tur: "uzun-ses", baslik: "Do♯ — yerini bul",
          html: "<p>Re'den başla (6 açık), sonra 6. parmağı yarıya kadar kaydır: ses yarım ses insin ve orada dursun. Sonunda tahmin: Do'ya mı yakın kaldın, Re'ye mi?</p>",
          nota: "C#5", saniye: 6, tekrar: 3, dem: "A4", tolerans: 20,
          sonra: "<p>30 sn dinlen. Yarım delik parmağı yorar; zorlama.</p>",
        },
        {
          tur: "nota-dizisi", baslik: "Hicaz dörtlüsü",
          html: "<p>La–Si♭–Do♯–Re ve geri; iki kez. Si♭'den Do♯'e giderken 7. ve 8. parmak kapanırken 6. yarım açılır: üç parmak <b>tek hareket</b>.</p>",
          dizi: ["A4", "Bb4", "C#5", "D5", "C#5", "Bb4", "A4", "A4", "Bb4", "C#5", "D5", "C#5", "Bb4", "A4"],
          not: "<p>Hata avı: takıldığın yer %90 Si♭→Do♯'tir. Yalnız o iki notayı 5 kez temiz çal (yavaş, bağlı), sonra dörtlüye geri koy.</p>", notTuru: "ipucu",
        },
        {
          tur: "dinle", baslik: "Kürdî mi Hicaz mı?",
          html: "<p>Aynı dörtlü iki kez: önce Do ile (Kürdî), sonra Do♯ ile (Hicaz). Üçüncü dinleyişte gözünü kapat ve değişen tek notayı yakala.</p>",
          abc: "X:1\nM:4/4\nL:1/4\nQ:1/4=60\nK:C\nA _B c d | d c _B A | A _B ^c d | d ^c _B A | A4 |]",
          dem: "A4",
        },
        {
          tur: "dinle", baslik: "Hicaz dörtlü ezgisi (model)",
          html: "<p>Bu ezgi bu metot için yazıldı, Doğu Anadolu üslubunda. Dört ses, iki cümle: soru Re'de, cevap La'da. Si♭ ile Do♯ hep yan yana; ikisinin arasındaki geniş adımı 'uzatarak' dinle.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\nA2 _B2 ^c2 d2 | ^c2 _B2 A4 | d2 ^c d _B2 ^c2 | d4 z4 |\nd2 ^c _B ^c2 d2 | ^c2 _B A _B2 ^c2 | ^c2 _B2 A2 _B2 | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Hicaz dörtlü ezgisini çal",
          notaBaslik: "Hicaz dörtlü ezgisi (bu metot için yazıldı)",
          html: "<p>%60 → %100 → %80. Nefes 4. ve 8. ölçü sonunda. Do♯ pes çıkıyorsa ('−30' gibi) 6. deliği birazcık daha aç; dudağı sıkarak düzeltme, yorar.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\nA2 _B2 ^c2 d2 | ^c2 _B2 A4 | d2 ^c d _B2 ^c2 | d4 z4 |\nd2 ^c _B ^c2 d2 | ^c2 _B A _B2 ^c2 | ^c2 _B2 A2 _B2 | A4 z4 |]",
          bpm: 66, dem: "A4", gecme: 70,
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: Uşşak beşlisi",
          html: "<p>Ünite 7'den koma geri geliyor: La–Si²–Do–Re–Mi. Hicaz'dan sonra Do'nun <i>natürel</i> ve Si'nin <i>komalı</i> olduğunu kulağın yeniden bulsun.</p>",
          dizi: ["A4", "B4@-50", "C5", "D5", "E5", "D5", "C5", "B4@-50", "A4"],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Do♯ uzun sesinde en az 2 deneme bantta (±20)",
            "Si♭→Do♯ geçişini bağlı ve temiz çalıyorum",
            "Kürdî ile Hicaz dörtlüsünü dinleyince farkı anında duyuyorum",
          ],
        },
      ],
      kapanis: "<p>Hicaz'ın çekirdeğini aldın. Yarın diziyi tepeye kadar tamamlayacak, Sol♯ ile Hicaz'ın 'ikinci katını' göreceksin.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u8d2",
      baslik: "Hicaz'ı kulağa yerleştir: tam dizi ve Sol♯",
      ozet: "Hicaz dizisinin üst yarısı; Sol♯ (2. delik yarım) ile Zirgüleli Hicaz / Çahargah tadı.",
      sure: 18,
      hedefler: [
        "Hicaz dizisini La4'ten La5'e inip çıkmak",
        "Sol♯5'i 2. delik yarım ile ±20 cent içinde tutmak",
        "Hicaz cümleyi tempoda ≥70 puanla çalmak; kulak adımında Do/Do♯'i %80 doğrulukla ayırmak",
      ],
      giris: "<p>Dün dört ses; bugün sekiz. Hicaz'ın üst yarısı tanıdık (Re–Mi–Fa–Sol–La), ama bazen Sol'ün yerine <b>Sol♯</b> gelir ve üstte de bir 'Hicaz' doğar.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "İki Hicaz",
          html: "<p>Sade Hicaz: La–Si♭–Do♯–Re | Re–Mi–Fa–Sol–La. Üst yarıda yarım delik yok; güçlü <b>Re</b>. Üst yarıda Mi–Fa–<b>Sol♯</b>–La çalınırsa iki Hicaz dörtlüsü üst üste gelir: Türk müziğinde <i>Zirgüleli Hicaz</i>, Azerbaycan'da <i>Çahargah</i> buna çok yakındır. Hangisi doğru? İkisi de; ezgiye göre. Bugün ikisini de kulağına koyuyoruz.</p>",
          not: "<p>Hacıbəyli sisteminde Çahargah tetrakordu ½–1½–½ formülüdür; La'ya taşınırsa tam olarak La–Si♭–Do♯–Re olur. Sol♯ için 2. delik yarım; Eren'in tablosunda da aynı.</p>",
        },
        {
          tur: "dinle", baslik: "Sade Hicaz dizisi",
          html: "<p>La'dan La'ya çık, in. Üst yarının Kürdî ile aynı olduğuna dikkat: sürpriz hep altta, Do♯'te.</p>",
          abc: "X:3\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\nA _B ^c d | e f g a | a g f e | d ^c _B A | A4 |]",
          dem: "A4",
        },
        {
          tur: "nota-dizisi", baslik: "Sade Hicaz — çal",
          html: "<p>Tam dizi, bir çıkış bir iniş. Tepede La5'i zorlama; dudak değil hava hızı. İnişte Do♯'ten Si♭'ye geçerken 6. parmak kapanır, 7–8 açılır.</p>",
          dizi: ["A4", "Bb4", "C#5", "D5", "E5", "F5", "G5", "A5", "G5", "F5", "E5", "D5", "C#5", "Bb4", "A4"],
        },
        {
          tur: "parmak", baslik: "Sol♯: 2. delik yarım",
          html: "<p>Sol5: 1–2 kapalı, 3 açık. La5: yalnız 1 kapalı. Sol♯5 ikisinin arasında: <b>2. delik yarım</b>. Şemalara dokun, üç sesi dinle.</p>",
          notalar: ["G5", "G#5", "A5"],
        },
        {
          tur: "uzun-ses", baslik: "Sol♯ — yerini bul",
          html: "<p>Sol'den başla, 2. parmağı yarıya kaydır. Üst bölgede yarım delik daha hassastır; küçük hareket, büyük değişim. Sonunda tahmin: Sol'e mi yakın, La'ya mı?</p>",
          nota: "G#5", saniye: 5, tekrar: 3, dem: "A4", tolerans: 20,
        },
        {
          tur: "dinle", baslik: "Üstte ikinci Hicaz",
          html: "<p>Mi–Fa–Sol♯–La: altta duyduğun geniş adım şimdi üstte. Sonra tam Zirgüleli dizi. Dinle; tüylerin diken diken olursa normal, bu rengin işi bu.</p>",
          abc: "X:4\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\ne f ^g a | a ^g f e | A _B ^c d | e f ^g a | a ^g f e | d ^c _B A | A4 |]",
          dem: "A4",
        },
        {
          tur: "nota-dizisi", baslik: "Üst Hicaz dörtlüsü — çal",
          html: "<p>Mi–Fa–Sol♯–La ve geri, iki kez. Fa→Sol♯ geçişi: 3. parmak kapanırken 2. yarım açılır. Hata avı: yalnız bu iki notayı 5 kez.</p>",
          dizi: ["E5", "F5", "G#5", "A5", "G#5", "F5", "E5", "E5", "F5", "G#5", "A5", "G#5", "F5", "E5"],
        },
        {
          tur: "dinle", baslik: "Hicaz cümle (model)",
          html: "<p>Bu ezgi bu metot için yazıldı, Erzurum oyun havası üslubunda. Üç cümle: birincisi Mi'de, ikincisi Re'de (güçlü) duruyor, üçüncüsü La'ya iniyor. Üst yarı sade (Sol natürel).</p>",
          abc: "X:5\nM:2/4\nL:1/8\nQ:1/4=80\nK:C\ne2 f e | d2 ^c d | e f g f | e4 |\na2 g f | e2 f e | d2 ^c _B | ^c2 d2 |\ne2 d ^c | d2 ^c _B | A2 _B ^c | A4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Hicaz cümleyi çal",
          notaBaslik: "Hicaz cümle (bu metot için yazıldı)",
          html: "<p>%60 → %100 → %80. Nefes: 4., 8. ölçü sonları. Hata avı için en olası yer: 7–8. ölçü, Re–Do♯–Si♭–Do♯–Re; yalnız o beşliyi 5 kez.</p>",
          abc: "X:5\nM:2/4\nL:1/8\nQ:1/4=80\nK:C\ne2 f e | d2 ^c d | e f g f | e4 |\na2 g f | e2 f e | d2 ^c _B | ^c2 d2 |\ne2 d ^c | d2 ^c _B | A2 _B ^c | A4 |]",
          bpm: 80, dem: "A4", gecme: 70,
        },
        {
          tur: "kulak", baslik: "Do mu Do♯ mi? Sol mü Sol♯ mü?",
          html: "<p>Uygulama bir ses çalacak; sen aynısını çal. Çalmadan önce içinden söyle: natürel mi, diyez mi?</p>",
          notalar: ["C5", "C#5", "G5", "G#5", "D5"], soru: 6, gecme: 80,
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: Re kararlı renk",
          html: "<p>Ünite 7'nin Re evi: Re–Mi–Fa–Sol–La–Sol–Fa–Mi–Re. Hicaz'dan sonra Sol'ün natürel olduğunu kulağın yeniden bulsun.</p>",
          dizi: ["D5", "E5", "F5", "G5", "A5", "G5", "F5", "E5", "D5"],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Sade Hicaz dizisini inip çıkarken Do♯ bantta kalıyor",
            "Sol♯ uzun sesinde en az 2 deneme bantta",
            "Kulak adımını %80 doğrulukla geçtim",
            "Hicaz cümleyi tempoda 70 puan üstünde çaldım",
          ],
        },
      ],
      kapanis: "<p>Hicaz artık kulağında. Yarın notaları süslemeye başlıyoruz: çarpma, tril ve kaydırma — balabanı 'konuşturan' üç araç.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u8d3",
      baslik: "Süslemeler: çarpma, tril, kaydırma",
      ozet: "Üç süsü parmakla ve dudakla yapmak; ana notanın yerini bozmadan.",
      sure: 18,
      hedefler: [
        "Trili iki parmakla, 2–3 salınımla, nefesi kesmeden yapmak",
        "Kaydırmayı (glissando) parmağı yavaş kaydırarak + dudakla bir tam ses içinde yapmak",
        "Süslü Hicaz cümleyi tempoda ≥60 puanla çalmak",
      ],
      giris: "<p>Süs, ezginin tuzu. Az olursa tatsız, çok olursa yenmez. Üç tane öğreneceksin; hepsini <b>nefesi kesmeden</b>, parmak ve dudakla yapacaksın. Balabanda dil yok.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Üç süs, tek kural",
          html: "<p><b>Çarpma</b>: ana notadan hemen önce küçük komşu (Ünite 7'den biliyorsun). <b>Tril</b>: ana nota ile üst komşusu arasında hızlı gidiş-geliş; balabanda kısa tutulur, 2–3 salınım yeter. <b>Kaydırma</b> (glissando): bir notadan diğerine <i>basamaksız</i> akmak; parmağı delikten yavaşça kaydırırken dudak sesi taşır. Tek kural: <b>ana notanın yeri ve süresi değişmez</b>. Süs, vuruştan çalmaz.</p>",
          not: "<p>Araştırma notları: geleneksel çalışta notalar dille değil parmakla ayrılır; vibrato ve kaydırma dudakla yapılır. Obua literatüründe (Kiremitci 2024) dudak glissandosu 'O' dudağından (pes) 'İ' dudağına (tiz) geçişle anlatılır; balabanda aynı mantık.</p>",
        },
        {
          tur: "dinle", baslik: "Tril: düz ve trilli",
          html: "<p>Önce düz Re–Do♯–Si♭, sonra Re üstünde tril (Re–Mi–Re–Mi–Re). Dinle: tril ne kadar kısa, ana nota ne kadar yerinde.</p>",
          abc: "X:6\nM:4/4\nL:1/4\nQ:1/4=60\nK:C\nd2 ^c _B | A4 | !trill!d2 ^c _B | A4 |]",
          dem: "A4",
        },
        {
          tur: "nota-dizisi", baslik: "Tril parmağı",
          html: "<p>Re'de dur; 5. parmağı hızlıca aç-kapat (Re–Mi). Uygulama sırayla bekliyor: Re, Mi, Re, Mi, Re. Önce yavaş, sonra bir nefeste. Nefes sabit, yalnız parmak oynuyor.</p>",
          dizi: ["D5", "E5", "D5", "E5", "D5", "D5", "E5", "D5", "E5", "D5"],
        },
        {
          tur: "cizim", cizim: "dudak-bukme", baslik: "Kaydırma: parmak + dudak",
          html: "<p>Re'den Do♯'e kaydır: 6. parmağı deliğe <b>yavaşça</b> kaydırırken dudağı hafifçe gevşet; ses basamaksız insin. Yukarı kaydırırken tersi: parmak açılırken dudak hafif sıkılır. Kısa aralıklar (yarım–bir ses) dudakla; daha geniş aralıklar parmakla. Dış odak: 'sesi bir ipek gibi çek'.</p>",
        },
        {
          tur: "dinle", baslik: "Kaydırmalı iniş",
          html: "<p>Model: Re'den La'ya bağlı iniş. Sentez kaydıramaz; sen çalarken bağ altındaki iki notayı kaydırarak birleştir. Dinlerken her bağa 'burada kaydıracağım' de.</p>",
          abc: "X:7\nM:4/4\nL:1/4\nQ:1/4=60\nK:C\n(d ^c) (_B A) | (d2 ^c2) | (_B2 A2) | A4 |]",
          dem: "A4",
        },
        {
          tur: "sureli", baslik: "Kaydırma çalışması (serbest)",
          html: "<p>2 dakika: Re→Do♯, Do♯→Si♭, Si♭→La kaydırmaları; sonra tersine yukarı. Sayaç yalnız ses duyulurken ilerler. Dudak ağrırsa dur.</p>",
          dakika: 2,
        },
        {
          tur: "dinle", baslik: "Süslü Hicaz cümle (model)",
          html: "<p>Bu ezgi bu metot için yazıldı. Çarpma (küçük nota), tril (tr) ve kaydırma (bağ) yerleri işaretli. Dinle; süs sayısına dikkat: 8 ölçüde yalnız 7 süs.</p>",
          abc: "X:8\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\n{d}e2 f e d2 ^c2 | !trill!d4 ^c2 _B2 | {_B}A2 _B ^c d2 ^c2 | d4 z4 |\ne2 !trill!f2 e2 d2 | ^c2 d ^c _B2 A2 | {^c}_B2 A2 (_B2 A2) | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Süslü Hicaz cümleyi çal",
          notaBaslik: "Süslü Hicaz cümle (bu metot için yazıldı)",
          html: "<p>Önce <b>Notayla ilerle</b> ile süssüz; sonra süsleri tek tek ekle; en son tempoda. Süs, ölçümü karıştırabilir; eşik bu derste 60 puan. Asıl ölçüt: süsleri eklediğinde tempo bozulmuyor.</p>",
          abc: "X:8\nM:4/4\nL:1/8\nQ:1/4=66\nK:C\n{d}e2 f e d2 ^c2 | !trill!d4 ^c2 _B2 | {_B}A2 _B ^c d2 ^c2 | d4 z4 |\ne2 !trill!f2 e2 d2 | ^c2 d ^c _B2 A2 | {^c}_B2 A2 (_B2 A2) | A4 z4 |]",
          bpm: 66, dem: "A4", gecme: 60,
          not: "<p>Hata avı: trilden sonra Do♯'e dönüşte 6. parmak yarımı kaçırmak en sık hata. Re–tril–Do♯ üçlüsünü 5 kez.</p>", notTuru: "ipucu",
        },
        {
          tur: "eser", baslik: "Serpiştirme: Segâh cümleye tril",
          notaBaslik: "Segâh cümle, trilli (bu metot için yazıldı)",
          html: "<p>Ünite 7'nin Segâh cümlesi; bu kez ilk Re'ye tril. Koma dudağı ve tril parmağı aynı cümlede. Zor gelir ama kalıcıdır.</p>",
          abc: "X:9\nM:6/8\nL:1/8\nQ:3/8=66\nK:C\n!trill!d2 e f2 e | d2 c d2 c | _/B2 c d2 c | _/B3 z3 |\ne2 f e2 d | c2 d c2 _/B | {c}_/B2 c _/B2 A | _/B3 z3 |]",
          bpm: 66, dem: "B4@-50", gecme: 60,
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Tril yaparken nefesim kesilmiyor, 2–3 salınımdan sonra ana nota yerinde",
            "Re→Do♯ kaydırmasında basamak duyulmuyor",
            "Süslü cümlede süsler tempoyu bozmuyor",
          ],
        },
      ],
      kapanis: "<p>Balaban artık konuşuyor. Yarın ona <b>fısıldamayı ve bağırmayı</b> öğreteceğiz (dinamik) ve ünite sınavına gireceğiz.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u8d4",
      baslik: "Dinamik ve ünite sınavı",
      ozet: "p'den f'ye karın desteğiyle; gürlük değişince perde kayar, dudakla düzelt. Sonra Hicaz sınavı, model ve kayıt.",
      sure: 20,
      hedefler: [
        "Aynı notayı p ve f'de perdeyi ±20 cent içinde tutarak çalmak; forte fısıltıdan en az 6 dB gür",
        "Tek nefeste aç–kıs: gürlük tepesi ortada, perde bantta",
        "Kör Do♯ ve Sol♯ uzun seslerinden en az birini bantta tutmak",
        "Hicaz cümleyi tempoda ≥70 puanla çalmak ve kaydı modelle karşılaştırmak",
      ],
      giris: "<p>Balaban fısıltıdan tam sese kadar konuşur; zurna gibi bağırmaz. Gürlük <b>dudaktan değil karından</b> gelir. Ve bir tuzak var: gürlük değişince perde de değişir.</p>",
      adimlar: [
        {
          tur: "cizim", cizim: "nefes", baslik: "Gürlük karından gelir",
          html: "<p>Piyano (p): az hava, ama <i>destekli</i> az hava; karın kasları yine havayı tutar, dudak gevşemez. Forte (f): daha hızlı hava, karın kasları daha çok iter; dudağı sıkma. Dudakla gürlük yapmaya kalkarsan ses boğulur.</p>",
          not: "<p>Eren (2020): yanakları şişirerek üfleme sesi azaltır, karın desteğiyle (Eren buna 'diyafram tekniği' der) üfleme yükseltir. Yani dinamik = karın. Yanak deposu yalnız nefes çevirmede (Ünite 11).</p>",
        },
        {
          tur: "metin", baslik: "Tuzak: gürlük perdeyi kaydırır",
          html: "<p>Kuvvetli üflersen ses <b>tizleşir</b>, hafif üflersen <b>pesleşir</b> (Kalın: Fa deliği kuvvetli üflenince Fa♯'e kadar çıkar). Düzeltme dudakta: f'de dudağı <i>birazcık</i> gevşet, p'de <i>birazcık</i> sık. Uygulama şimdi aynı notayı iki gürlükte ölçecek; hedef ikisinde de aynı cent.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Re — piyano (fısıltı)",
          html: "<p>Odanın karşısına değil, önündeki masaya gönder. Az hava, destek tam, dudak hafif sıkı. Perde bantta kalsın.</p>",
          nota: "D5", saniye: 6, tekrar: 2, dem: "A4", tolerans: 20, gurluk: "p",
        },
        {
          tur: "uzun-ses", baslik: "Re — forte (tam ses)",
          html: "<p>Şimdi odanın dışına gönder. Karın iter, dudak hafif gevşer. Aynı notayı, aynı cent'te. Tiz çıkıyorsa dudağı biraz daha bırak. Uygulama bu kez gürlüğü de ölçer: forte, az önceki fısıltından en az 6 dB gür olmalı. Telefonu iki adımda da aynı yerde tut.</p>",
          nota: "D5", saniye: 6, tekrar: 2, dem: "A4", tolerans: 20, gurluk: "f",
          sonra: "<p>45 sn dinlen: forte dudağı yorar.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Re — aç ve kıs (tek nefeste)",
          html: "<p>Şimdi ikisini tek seste birleştir: fısıltıyla başla, 4 saniyede yavaşça tam sese aç, sonraki 4 saniyede yine fısıltıya kıs. Ekranda \"Aç\" ve \"Kıs\" yazar. Zor olan gürlük değil, <b>perdeyi yerinde tutmak</b>: açarken dudak birazcık gevşer, kısarken birazcık sıkılır. Sonuç kartındaki gürlük çizgisi bir tepe gibi olmalı; tepe ortada.</p>",
          not: "<p>Bu klasik nefes çalışmasının adı <i>messa di voce</i>'dir: üflemeli çalgı ve şan eğitiminde nefes desteğiyle perde kontrolünü birlikte geliştiren temel alıştırma. Uygulama açma ve kısmayı ayrı ayrı (dB) ve gür yerdeki perde kaymasını (cent) ölçer.</p>",
          nota: "D5", saniye: 8, tekrar: 2, dem: "A4", tolerans: 25, gurluk: "kis-ac",
          sonra: "<p>Dudağını dinlendir; 30 sn kamış ağızda değil.</p>",
        },
        {
          tur: "dinle", baslik: "Dinamikli Hicaz (model)",
          html: "<p>Ünite'nin Hicaz cümlesi; bu kez p–f işaretli: ilk cümle p, ikinci f, üçüncü p'ye dönüp La'da sönüyor. Sentez gürlüğü abartmaz; sen abart.</p>",
          abc: "X:10\nM:2/4\nL:1/8\nQ:1/4=80\nK:C\n!p! e2 f e | d2 ^c d | e f g f | e4 |\n!f! a2 g f | e2 f e | d2 ^c _B | ^c2 d2 |\n!p! e2 d ^c | d2 ^c _B | A2 _B ^c | A4 |]",
          dem: "A4",
        },
        {
          tur: "uzun-ses", baslik: "Kör 1: Do♯",
          html: "<p>Sınav başlıyor; gösterge yok. 6 yarım. Çal, bitir, tahmin et.</p>",
          nota: "C#5", saniye: 6, tekrar: 2, tolerans: 20,
        },
        {
          tur: "ritim", baslik: "Ritim: 4/4 noktalı",
          html: "<p>Her notayı nefesle ('hu') başlat; notayı Mi'de çal. Noktalı dörtlük + sekizlik, Doğu Anadolu'nun 'sekme'si.</p>",
          desen: "1.5 .5 1 1 | 1 1 2", olcu: "4/4", bpm: 72, nota: "E5",
        },
        {
          tur: "uzun-ses", baslik: "Kör 2: Sol♯",
          html: "<p>2. delik yarım. Üstte küçük hareket, büyük fark. Çal, tahmin et.</p>",
          nota: "G#5", saniye: 5, tekrar: 2, tolerans: 20,
        },
        {
          tur: "eser", baslik: "Sınav: Hicaz cümle, dinamikli, tempoda",
          notaBaslik: "Hicaz cümle, p–f (bu metot için yazıldı)",
          html: "<p>%60 ile bir kez, sonra %100. Dinamiği uygula; perde kaymasını dudakla tut. Eşik 70 puan.</p>",
          abc: "X:10\nM:2/4\nL:1/8\nQ:1/4=80\nK:C\n!p! e2 f e | d2 ^c d | e f g f | e4 |\n!f! a2 g f | e2 f e | d2 ^c _B | ^c2 d2 |\n!p! e2 d ^c | d2 ^c _B | A2 _B ^c | A4 |]",
          bpm: 80, dem: "A4", gecme: 70,
        },
        {
          tur: "kayit", baslik: "Kaydet ve modelle karşılaştır",
          html: "<p>Aynı cümleyi dem ile, dinamikli ve istediğin yere bir çarpma, bir tril ekleyerek kaydet. Modeli, sonra kendini dinle. Üç soru, dürüst cevap.</p>",
          etiket: "Ünite 8 sınavı — Hicaz cümle",
          kontrol: [
            "Ses: p ile f arasındaki fark kayıtta açıkça duyuluyor mu?",
            "Perde: f'de tizleştim mi, p'de pesleştim mi? Do♯ ve Si♭ yerinde mi?",
            "Zaman: süsler ana notaların yerini kaydırdı mı?",
          ],
        },
        {
          tur: "kontrol", baslik: "Üniteyi bitirme ölçütü",
          maddeler: [
            "p ve f uzun seslerinde Re aynı bantta kaldı",
            "Kör Do♯ ya da Sol♯'ten en az birinde tahminim sonuçla uyuştu",
            "Sınav ezgisini tempoda 70 puan üstünde çaldım",
            "Kayıtta dinamik farkını kendim duydum",
          ],
        },
      ],
      kapanis: "<p>Hicaz, üç süs ve dinamik: artık 'ne çaldığın' kadar 'nasıl çaldığın' da var. Ünite 9 tamamen <b>ses rengine</b> ayrılacak: vibrato, kaydırma, üst bölge ve 20 saniyelik nefes.</p>",
    },
  ],
};
