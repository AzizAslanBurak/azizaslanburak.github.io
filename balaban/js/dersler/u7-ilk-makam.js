// Ünite 7 — İlk makam. Hafta 12–16. Aralık: La4–La5 + Si koma bemolü (B4@-50).
// Kaynaklar: araştırma notu 03 §1.2, §2 (muğam/makam, notasyon önerisi, alıştırma dizileri);
// 02 §2.6, §7 (dudakla bükme, mikrotonlar); 01 U6 (bant, kör test, serpiştirme).
// Buradaki ezgiler bu metot için yazıldı (geleneksel değildir); 03 notundaki alıştırma dizileri
// La4'ün altına inmeyenler olduğu gibi kullanıldı.
export default {
  id: "u7",
  baslik: "İlk makam",
  ozet: "Karar ve güçlü; aynı deliklerle dört renk: Kürdî, Nihavend/Buselik, Uşşak/Hüseynî, Segâh. Koma ve çarpma.",
  dersler: [
    // ------------------------------------------------------------------
    {
      id: "u7d1",
      baslik: "Makam nedir? Karar ve güçlü",
      ozet: "Bildiğin diziyi La'dan çalınca çıkan rengin adı Kürdî; eve dönülen ses karar, dinlenilen ses güçlü.",
      sure: 15,
      hedefler: [
        "Karar ve güçlü kavramını bir ezgide kulakla ayırt etmek",
        "La'dan Kürdî dizisini (La–Si♭–Do–Re–Mi–Fa–Sol–La) temiz çalmak",
        "Kürdî soru–cevap ezgisini tempoda ≥70 puanla çalmak",
      ],
      giris: "<p>Bugüne kadar sesleri tek tek öğrendin. Bugün onların <b>aralarındaki ilişkiyi</b> duymaya başlıyoruz. Yeni parmak yok; yeni <b>kulak</b> var.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Tek paragraf teori",
          html: "<p>Bir ezginin sürekli dönüp dinlendiği ev sesine <b>karar</b> deriz. Yolda en çok durup soluklandığı ikinci sese <b>güçlü</b>. Ezginin karardan çıkıp güçlüye gidip geri gelme yoluna da <b>seyir</b>. Hangi seslerin kullanıldığı + karar + güçlü + seyir = <b>makam</b> (Azerbaycan'da <i>muğam</i>, Batı'da kabaca <i>mod</i>). Bu kadar. Gerisini kulağın öğrenecek.</p>",
          not: "<p>Doğu Anadolu ve Azerbaycan ezgilerinin büyük çoğunluğu üç-dört makamda gezer. Balabanın delikleri de zaten bu makamlara göre açılmıştır; Azerbaycan'da koma pes Si'yi veren deliğe <i>segah deliği</i> denir, çoğu çalgıda o ses kendiliğinden hafif pes çıkar.</p>",
        },
        {
          tur: "dinle", baslik: "La'dan yukarı: Kürdî dizisi",
          html: "<p>Bütün delikler kapalı La'dan başlayıp delikleri sırayla aç. Balabanda bu dizi kendiliğinden çıkar (Si♭ = 8. delik açık); düdükte Si♭ için 8. deliği yarım açıyordun. Çıkan rengin Türk müziğindeki adı <b>Kürdî</b>. Önce dinle, sonra sessizce parmakla.</p>",
          abc: "X:1\nM:4/4\nL:1/4\nQ:1/4=72\nK:C\nA _B c d | e f g a | a g f e | d c _B A | A4 |]",
          dem: "A4",
        },
        {
          tur: "uzun-ses", baslik: "Karar sesi: La (dem üstünde)",
          html: "<p>Karar sesini vücuduna yerleştir. Dem La çalarken sen de La çal; iki ses birbirinin içinde kaybolsun, dalgalanma duymayacaksın. Sesi odanın karşı duvarına gönder, sonunu temiz bitir.</p>",
          nota: "A4", saniye: 8, tekrar: 3, dem: true,
          sonra: "<p>Arada 30 sn dinlen; dudak yükü.</p>",
        },
        {
          tur: "nota-dizisi", baslik: "Kürdî dörtlüsü ve beşlisi",
          html: "<p>Önce dörtlü La–Si♭–Do–Re, sonra beşli Mi'ye kadar; inerken La'ya <b>dinlenerek</b> gel. La'ya her dönüşte 'eve geldim' hissini ara.</p>",
          dizi: ["A4", "Bb4", "C5", "D5", "E5", "D5", "C5", "Bb4", "A4", "A4", "Bb4", "C5", "D5", "C5", "Bb4", "A4"],
        },
        {
          tur: "dinle", baslik: "Kürdî soru–cevap — güçlüyü duy",
          html: "<p>Bu ezgi bu metot için yazıldı, Doğu Anadolu ezgilerinin üslubunda. İlk yarı <b>Re</b>'de durup soluk alıyor (güçlü, 'soru'); ikinci yarı <b>La</b>'ya iniyor (karar, 'cevap'). İki kez dinle; ilkinde Re duraklarını, ikincisinde La inişini say.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=76\nK:C\nA2 _B2 c2 d2 | e2 d2 c2 _B2 | A2 _B c d2 c2 | d4 z4 |\ne2 f e d2 c2 | d2 c _B c2 d2 | c2 _B2 A2 _B2 | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Kürdî soru–cevap'ı çal",
          notaBaslik: "Kürdî soru–cevap (bu metot için yazıldı)",
          html: "<p>Nota sadece hatırlatıcı; ezgi kulağında. Hız kaydırıcısı: önce <b>%60</b>, temizse <b>%100</b>, en son <b>%80</b> ile pekiştir. Nefes: her dört ölçüde bir, ölçü sonundaki eslerde.</p>",
          abc: "X:2\nM:4/4\nL:1/8\nQ:1/4=76\nK:C\nA2 _B2 c2 d2 | e2 d2 c2 _B2 | A2 _B c d2 c2 | d4 z4 |\ne2 f e d2 c2 | d2 c _B c2 d2 | c2 _B2 A2 _B2 | A4 z4 |]",
          bpm: 76, dem: "A4", gecme: 70,
          not: "<p>Takılırsan hata avı: hatanın tam yerini bul (çoğunlukla Si♭→Do ya da Do→Si♭). Yalnız o iki notayı 5 temiz tekrar, sonra cümleye geri koy.</p>", notTuru: "ipucu",
        },
        {
          tur: "ritim", baslik: "Serpiştirme: 6/8 ile Kürdî",
          html: "<p>Önceki ünitelerden 6/8'i geri çağırıyoruz; zor gelir ama kalıcı olan budur. Her notayı nefesle ('hu') yeniden başlat; notayı Re'de çal.</p>",
          desen: "1 .5 1 .5 | 1.5 1.5", olcu: "6/8", bpm: 72, nota: "D5",
        },
        {
          tur: "kulak", baslik: "Karar mı güçlü mü?",
          html: "<p>Uygulama bir ses çalacak; sen aynısını çal. Hepsi karar (La) ve güçlü (Re) arasında gidip geliyor. Çalmadan önce içinden söyle: ev mi, durak mı?</p>",
          notalar: ["A4", "D5", "C5", "Bb4"], soru: 5, gecme: 80,
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Kürdî dizisini inip çıkarken hiçbir sesi zorlamadan çaldım",
            "Ezgide Re'nin 'soru', La'nın 'cevap' olduğunu duyuyorum",
            "Tempoda çalma puanım en az bir denemede 70'i geçti",
          ],
        },
      ],
      kapanis: "<p>Bugün yeni ses öğrenmedin; yeni <b>anlam</b> öğrendin. Yarın aynı deliklerle bambaşka bir renk çıkaracağız: kararı değiştireceğiz.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u7d2",
      baslik: "Aynı delikler, yeni karar: Re",
      ozet: "Hiçbir parmağı değiştirmeden kararı Re yapınca Nihavend/Buselik rengi çıkar.",
      sure: 15,
      hedefler: [
        "Re kararlı diziyi (La–Si♭–Do–Re–Mi–Fa–Sol–La, karar Re5) çalmak",
        "Re üstünde dem ile 8 sn kararlı uzun ses",
        "Nihavend renkli cümleyi tempoda ≥70 puanla çalmak",
      ],
      giris: "<p>Dünkü deliklerin hepsi aynı. Değişen tek şey: <b>eve hangi sese döndüğün</b>. Bu, makam dünyasının en güzel sırrıdır.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Kararı taşımak",
          html: "<p>Dün La'ya dönüyordun. Bugün <b>Re</b>'ye döneceksin. Aynı sekiz ses, ama Re'nin altında La–Si♭–Do, üstünde Mi–Fa–Sol–La. Batı kulağı buna 'minör' der; Türk müziğinde bu renk La üstünde kurulursa <b>Buselik</b>, Sol üstünde <b>Nihavend</b> adını alır. Biz Re üstünde kurduk; bu metotta kısaca <b>Re kararlı Nihavend/Buselik rengi</b> diyeceğiz. Güçlüsü beşli yukarıda: <b>La5</b>.</p>",
          not: "<p>Azerbaycan muğamında bu tadın adı <i>Bayatı-Şiraz</i>'a yakındır; Hacıbəyli'nin sisteminde karar, dörtlünün <b>son</b> sesidir — yani dizinin tepesinden inilerek varılan ses. Ağır, lirik parçalar bu renkte gezer.</p>",
        },
        {
          tur: "dinle", baslik: "Re'den dinle",
          html: "<p>Dem bu kez <b>Re</b>. Dizi Re'den La'ya çıkıp Re'ye iniyor; sonra Re'nin altına Si♭'ye inip geri geliyor. Dinlerken dem ile ezginin 'rahatladığı' anı yakala: hep Re.</p>",
          abc: "X:3\nM:4/4\nL:1/4\nQ:1/4=72\nK:C\nd e f g | a g f e | d c _B c | d4 |]",
          dem: "D5",
        },
        {
          tur: "uzun-ses", baslik: "Yeni ev: Re (dem Re)",
          html: "<p>Dem Re çalıyor. Re'yi sen de tut; dalgalanma yok, ses demin içinde erisin. Nefes alırken karnın genişlesin, üflerken karın kasları havayı desteklesin.</p>",
          nota: "D5", saniye: 8, tekrar: 3, dem: "D5",
        },
        {
          tur: "nota-dizisi", baslik: "Re'nin altı ve üstü",
          html: "<p>Önce üst beşli Re–Mi–Fa–Sol–La ve geri; sonra alt üçlü Re–Do–Si♭–La ve geri. Her dönüşte Re'de bir an dur: 'eve geldim'.</p>",
          dizi: ["D5", "E5", "F5", "G5", "A5", "G5", "F5", "E5", "D5", "C5", "Bb4", "A4", "Bb4", "C5", "D5"],
        },
        {
          tur: "dinle", baslik: "Nihavend cümle",
          html: "<p>Bu ezgi bu metot için yazıldı. Soru cümlesi Mi'de asılı kalıyor; cevap Si♭'den dolanıp Re'ye oturuyor. Dinle, sonra sessiz parmakla eşlik et.</p>",
          abc: "X:4\nM:2/4\nL:1/8\nQ:1/4=84\nK:C\nd e f g | a2 g f | g f e d | e4 |\nf e d c | _B c d e | d c _B c | d4 |]",
          dem: "D5",
        },
        {
          tur: "eser", baslik: "Nihavend cümleyi çal",
          notaBaslik: "Re kararlı cümle (bu metot için yazıldı)",
          html: "<p>Üç tempo: %60 → %100 → %80. Nefes yerleri: 4. ve 8. ölçü sonları. Hata avı: Fa→Sol→La tırmanışında Sol'ü dudakla değil parmakla al; iki notayı 5 kez temiz tekrar et.</p>",
          abc: "X:4\nM:2/4\nL:1/8\nQ:1/4=84\nK:C\nd e f g | a2 g f | g f e d | e4 |\nf e d c | _B c d e | d c _B c | d4 |]",
          bpm: 84, dem: "D5", gecme: 70,
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: Kürdî'ye geri dön",
          html: "<p>Aynı sesler, dünkü ev. La'ya dönerek çal; Re'ye dönerek değil. Kulağın iki evi ayırt etmeye başlasın.</p>",
          dizi: ["A4", "Bb4", "C5", "D5", "E5", "D5", "C5", "Bb4", "A4"],
        },
        {
          tur: "kulak", baslik: "Hangi ev?",
          html: "<p>Uygulama bir ses çalacak, sen tekrar edeceksin. Çalmadan önce içinden söyle: bu ses Re'ye mi yakın, La'ya mı?</p>",
          notalar: ["D5", "A4", "E5", "Bb4", "A5"], soru: 5, gecme: 80,
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Re kararlı uzun seste gösterge çoğunlukla bantta kaldı",
            "Aynı diziyi La'ya ve Re'ye dönerek çalınca farkı duyuyorum",
            "Tempoda çalma puanım 70'i geçti",
          ],
        },
      ],
      kapanis: "<p>İki ev, bir parmaklama. Yarın ilk kez piyanoda olmayan bir sese gideceğiz: Si'yi <i>biraz</i> pes çalmayı öğreneceksin.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u7d3",
      baslik: "Koma: Si'yi biraz pes çal — Uşşak ve Hüseynî",
      ozet: "Si♭ ile Si'nin arasındaki ses: koma bemolü. Dudak gevşetme ve yarım delikle bulunur; Uşşak/Hüseynî'nin kalbi budur.",
      sure: 18,
      hedefler: [
        "Si koma bemolünü (B4@-50) dudakla ±25 cent içinde 6 sn tutmak",
        "Uşşak beşlisini (La–Si²–Do–Re–Mi) temiz inip çıkmak",
        "Hüseynî cümleyi tempoda ≥65 puanla çalmak",
      ],
      giris: "<p>Piyanoda Si♭ ile Si arasında tuş yoktur. Balabanda vardır: dudağın. Türküde 'Si bemol 2' (♭ üstünde küçük 2) diye yazılan, Azerbaycan'da <i>segah perdesi</i> denen ses tam oradadır.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Koma nedir, ne değildir",
          html: "<p>Yarım ses 100 cent'tir. Halk müziğinde Si koma bemolü, Si'den <b>1–2 koma</b> (yaklaşık 25–50 cent) pestir; yani Si♭ ile Si'nin arasında. Uygulama bu notayı ikisinin ortası (<b>B4@-50</b>) diye hedefler, notada yarım bemol (<b>_/B</b>) çizer ve bandı geniş tutar (±25), çünkü doğru yer çalgıdan çalgıya ve makamdan makama biraz değişir. Kuralı tek cümle: <b>piyano Si'si değil, 'Do'ya yaslanmış bir Si'</b>.</p>",
          not: "<p>Türk müziğinde 1 koma ≈ 22,6 cent. Yazım sistemleri tarih boyunca değişti (Atalay 2015); biz TRT notalarındaki gibi ♭² kullanıyoruz. Azerbaycan balabanında bu perde çoğu çalgıda 'segah deliğinden' zaten hafif pest çıkar.</p>",
        },
        {
          tur: "cizim", cizim: "dudak-bukme", baslik: "Dudakla bükme",
          html: "<p>Dudak gevşeyince kamış ağzı açılır, ses <b>pesleşir</b>; sıkınca <b>tizleşir</b>. Üfleme de aynı yönde çalışır: hafif üfle → pes. Bugün iki yoldan aynı sese gideceğiz: (1) Si'den (balabanda 7. delik yarım, düdükte 8 açık) dudağı gevşeterek <i>aşağı</i>; (2) Si♭'den dudağı hafif sıkıp biraz daha üfleyerek <i>yukarı</i>. Hangisi sana rahat geliyorsa o senin yolun.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Önce sabit nokta: Si natürel",
          html: "<p>Si'yi 7. delik yarım (düdükte 8. delik açık) ile tut. Bu, aşağı inmeden önceki başlangıç noktan.</p>",
          nota: "B4", saniye: 5, tekrar: 2, dem: "A4", tolerans: 20,
        },
        {
          tur: "uzun-ses", baslik: "Si koma bemolü — dudakla bul",
          html: "<p>Si'yi başlat; ikinci saniyede alt dudağını <b>birazcık</b> gevşet, ses hafifçe aşağı kaysın ve orada kalsın. Sesi değil, <b>demle sürtünmenin kaybolduğu</b> yeri ara: La demiyle en yumuşak eridiği yer senin Si²'n. Sonunda tahmin et: pes mi, tam mı, tiz mi?</p>",
          nota: "B4@-50", saniye: 6, tekrar: 4, dem: "A4", tolerans: 25,
          not: "<p>Çok gevşetirsen Si♭'ye düşersin ('−100'); bu normal, bir sonraki denemede yarısı kadar gevşet. Dudak ağrırsa dur, 1 dakika dinlen.</p>", notTuru: "dikkat",
        },
        {
          tur: "nota-dizisi", baslik: "Uşşak beşlisi",
          html: "<p>La–Si²–Do–Re–Mi ve geri. Si²'ye her gelişte dudağı gevşet, Do'ya geçince <b>normal dudağa dön</b> — en sık hata, gevşek dudağın Do'da da kalıp onu pesleştirmesidir.</p>",
          dizi: ["A4", "B4@-50", "C5", "D5", "E5", "D5", "C5", "B4@-50", "A4"],
        },
        {
          tur: "dinle", baslik: "Uşşak mı Hüseynî mi?",
          html: "<p>İkisi aynı sesleri kullanır: La karar, Si². Fark güçlüde: <b>Uşşak Re'de</b> dinlenir, <b>Hüseynî Mi'de</b>. Önce kısa bir Uşşak alıştırma dizisi (bu metot için yazıldı; Re'ye yaslı), ardından yine bu metot için yazılmış Hüseynî cümleyi dinle; Mi'nin nasıl 'taht' olduğuna dikkat et.</p>",
          abc: "X:5\nM:4/4\nL:1/4\nQ:1/4=72\nK:C\nA _/B c d | e d c _/B | A2 z2 | A _/B c _/B | A4 |]",
          dem: "A4",
        },
        {
          tur: "dinle", baslik: "Hüseynî cümle (model)",
          html: "<p>Bu ezgi bu metot için yazıldı, Doğu Anadolu ezgilerinin üslubunda. TRT'deki Erzurum türkülerinin yaklaşık %43'ü bu ailedendir (Uşşak/Hüseynî). Soru Mi'de asılı; cevap Si² üzerinden La'ya iner.</p>",
          abc: "X:6\nM:4/4\nL:1/8\nQ:1/4=72\nK:C\ne2 e f e2 d2 | e2 d c d2 e2 | d2 c _/B c2 d2 | e4 z4 |\ne2 f e d2 c2 | d2 c _/B A2 _/B2 | c2 _/B A _/B2 A2 | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Hüseynî cümleyi çal",
          notaBaslik: "Hüseynî cümle (bu metot için yazıldı)",
          html: "<p>Nota hatırlatıcı; yarım bemol gördüğün her yerde dudak gevşer. %60 → %100 → %80. Puan eşiği bugün biraz düşük (65): mikroton ölçümü hassastır, önce <b>renk</b> doğru olsun.</p>",
          abc: "X:6\nM:4/4\nL:1/8\nQ:1/4=72\nK:C\ne2 e f e2 d2 | e2 d c d2 e2 | d2 c _/B c2 d2 | e4 z4 |\ne2 f e d2 c2 | d2 c _/B A2 _/B2 | c2 _/B A _/B2 A2 | A4 z4 |]",
          bpm: 72, dem: "A4", gecme: 65,
          not: "<p>Hata avı: 6. ölçüdeki Do→Si²→La. Si²'den La'ya inerken dudağı <i>daha da</i> gevşetme; La'yı parmaklar verir, dudak normale döner. O üç notayı 5 kez.</p>", notTuru: "ipucu",
        },
        {
          tur: "nota-dizisi", baslik: "Serpiştirme: üç Si",
          html: "<p>Kulağını keskinleştir: Si♭, Si² (dudak), Si (parmaklar çalgına göre; şemalar Ünite 5'te) — hepsi La'dan başlayıp La'ya dönerek. Üç farklı komşu, tek ev.</p>",
          dizi: ["A4", "Bb4", "A4", "B4@-50", "A4", "B4", "A4"],
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Si²'yi dudakla bulup 6 sn tutabiliyorum (en az 2 başarılı deneme)",
            "Si²'den Do'ya geçince dudağım normale dönüyor; Do pes kalmıyor",
            "Uşşak (Re) ile Hüseynî (Mi) duraklarını duyuyorum",
          ],
        },
      ],
      kapanis: "<p>Artık piyanoda olmayan bir sesi çalabiliyorsun. Yarın o sesi <b>karar</b> yapacağız (Segâh) ve ilk süsü, çarpmayı ekleyeceğiz.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u7d4",
      baslik: "Segâh beşlisi ve çarpma süsü",
      ozet: "Koma bemollü Si'yi ev yapmak; notaya küçük bir komşu nota 'çarparak' girmek.",
      sure: 18,
      hedefler: [
        "Segâh beşlisini (Si²–Do–Re–Mi–Fa) Si²'de karar vererek çalmak",
        "Çarpmayı parmakla, dil kullanmadan, ana notayı geciktirmeden yapmak",
        "Segâh cümleyi tempoda ≥65 puanla çalmak",
      ],
      giris: "<p>Dün dudağınla bulduğun ses bugün evin oluyor. Iğdır'ın 'Si kararlı' türküleri tam buradadır; Azerbaycan'da Segah, Şur'dan sonra en geniş repertuvarlı muğamdır.</p>",
      adimlar: [
        {
          tur: "metin", baslik: "Segâh: ev, komanın üstünde",
          html: "<p>Segâh beşlisi: <b>Si²–Do–Re–Mi–Fa</b>. İlk adım yarıma yakın (Si²→Do), sonra iki tam, sonra yarım (Mi→Fa). Zorluğu şu: karar sesi dudakla tutulan bir ses. Yani cümleyi bitirirken hem parmağın (balabanda 7 yarım, düdükte 8 açık) hem dudağın (gevşek) aynı anda yerinde olacak. Ödülü: Iğdır–Kars–Azerbaycan ezgilerinin kapısı.</p>",
          not: "<p>Pelikoğlu &amp; Acay (2024): TRT'deki Iğdır türkülerinin Si kararlıları Segâh dizisindedir; A cümlesi Sol'den Re'ye çıkar, B cümlesi Mi'den inerek Si'de karar verir. Usulleri 12/8. Ünite 10'da 'Ben Bir Avuç Darı Olup' ile buraya döneceğiz.</p>",
        },
        {
          tur: "uzun-ses", baslik: "Ev sesi: Si² (dem Si²)",
          html: "<p>Dem bu kez senin koma sesinde. Si'yi başlat, gevşet, demle eri. Bitirirken dudağı birden bırakma; ses <b>aynı yükseklikte</b> sönsün.</p>",
          nota: "B4@-50", saniye: 6, tekrar: 3, dem: "B4@-50", tolerans: 25,
        },
        {
          tur: "dinle", baslik: "Segâh beşlisi (alıştırma dizisi)",
          html: "<p>Bu kısa alıştırma dizisi bu metot için yazıldı; geleneksel ezgi değildir. 6/8'de, her cümle Si²'de bitiyor. Dinle; Si²'de bitişin 'yarım kalmış' değil 'oturmuş' duyulduğuna dikkat et.</p>",
          abc: "X:7\nM:6/8\nL:1/8\nQ:3/8=60\nK:C\n_/B c d e d c | _/B3 z3 | d e d c _/B c | _/B3 z3 |]",
          dem: "B4@-50",
        },
        {
          tur: "nota-dizisi", baslik: "Segâh beşlisi — çal",
          html: "<p>Si²'den Fa'ya çık, Si²'ye in. İnişte Do→Si² geçişinde parmak yarım deliğe gelirken dudak aynı anda gevşer; ikisini tek hareket gibi düşün.</p>",
          dizi: ["B4@-50", "C5", "D5", "E5", "F5", "E5", "D5", "C5", "B4@-50"],
        },
        {
          tur: "metin", baslik: "Çarpma: küçük komşu",
          html: "<p>Çarpma, ana notadan hemen önce çok kısa çalınan komşu notadır; notada küçük yazılır (<b>{Do}Si</b>). Balabanda dil yok: parmak deliği bir an açıp kapatır, nefes <b>kesilmez</b>. Kural: çarpma süresini ana notadan çalmaz; ana nota vuruşta, çarpma vuruştan hemen önce. Yukarıdan çarpma (Do→Si) en yaygını; aşağıdan (La→Si) daha yumuşak.</p>",
          not: "<p>Dış odak: 'parmağı hızlı kaldır' yerine 'ana notanın başını sivrilt' diye düşün. Doğu Anadolu ve Azerbaycan üslubunda çarpma, notayı <i>vurgulamak</i> için kullanılır; her notaya değil.</p>", notTuru: "ipucu",
        },
        {
          tur: "dinle", baslik: "Çarpmalı ve çarpmasız",
          html: "<p>Aynı dört nota iki kez: önce düz, sonra çarpmalı. Farkı duy: ana notaların yeri değişmiyor, yalnızca başları 'sivriliyor'.</p>",
          abc: "X:8\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\nc2 _/B2 | d2 c2 | _/B4 |\n{d}c2 {c}_/B2 | {e}d2 {d}c2 | {c}_/B {A}_/B {c}_/B2 | _/B4 |]",
          dem: "B4@-50",
        },
        {
          tur: "eser", baslik: "Segâh cümle (çarpmalı)",
          notaBaslik: "Segâh cümle (bu metot için yazıldı)",
          html: "<p>Bu ezgi bu metot için yazıldı, Iğdır–Kars üslubunda. Önce <b>Notayla ilerle</b> ile çarpmasız çal; sonra çarpmaları ekle ve tempoda dene. Çarpmalar puanı biraz düşürebilir; eşik 65 puan.</p>",
          abc: "X:9\nM:6/8\nL:1/8\nQ:3/8=66\nK:C\nd2 e f2 e | d2 c d2 c | _/B2 c d2 c | _/B3 z3 |\ne2 f e2 d | c2 d c2 _/B | {c}_/B2 c _/B2 A | _/B3 z3 |]",
          bpm: 66, dem: "B4@-50", gecme: 65,
        },
        {
          tur: "eser", baslik: "Serpiştirme: Kürdî'ye çarpma ekle",
          notaBaslik: "Kürdî soru–cevap, çarpmalı (bu metot için yazıldı)",
          html: "<p>1. dersteki Kürdî soru–cevap, bu kez üç çarpmayla. Ev yine La. Üç tempo; çarpmayı yalnız yazıldığı yerde yap, fazlasını ekleme.</p>",
          abc: "X:10\nM:4/4\nL:1/8\nQ:1/4=76\nK:C\nA2 _B2 c2 d2 | e2 d2 c2 _B2 | A2 _B c {e}d2 c2 | d4 z4 |\n{f}e2 f e d2 c2 | d2 c _B c2 d2 | c2 _B2 {_B}A2 _B2 | A4 z4 |]",
          bpm: 76, dem: "A4", gecme: 70,
        },
        {
          tur: "kontrol", baslik: "Geçiş ölçütü",
          maddeler: [
            "Si² kararlı uzun seste en az 2 deneme bantta",
            "Çarpma yaparken nefesim kesilmiyor, ana nota vuruşta kalıyor",
            "Segâh cümlede son Si²'ler 'oturmuş' duyuluyor",
          ],
        },
      ],
      kapanis: "<p>Dört renk tanıdın: Kürdî, Nihavend/Buselik, Uşşak/Hüseynî, Segâh. Yarın hepsini karıştırıp sınava gireceğiz; sonra kendini kaydedip modelle karşılaştıracaksın.</p>",
    },
    // ------------------------------------------------------------------
    {
      id: "u7d5",
      baslik: "Ünite sınavı: Dört renk",
      ozet: "Kör uzun ses, ritim, koma kulağı, tempoda eser; model dinle, kendini kaydet, dürüstçe değerlendir.",
      sure: 20,
      hedefler: [
        "Üç kör uzun sesten (La, Si², Re) en az ikisini bantta tutmak",
        "Koma kulağı: Si♭ / Si² / Si'yi %80 doğrulukla tekrar etmek",
        "Renk değiştiren sınav ezgisini tempoda ≥70 puanla çalmak",
      ],
      giris: "<p>Sınavda gösterge yok; kulağın var. Sırayı bilerek karıştırdım: ustalık, karışık sırada da çıkan şeydir.</p>",
      adimlar: [
        {
          tur: "uzun-ses", baslik: "Kör 1: Karar La",
          html: "<p>Dem yok, gösterge yok. Çal, bitir, tahmin et: pes / tam / tiz.</p>",
          nota: "A4", saniye: 8, tekrar: 2,
        },
        {
          tur: "ritim", baslik: "Ritim: 2/4 kesik",
          html: "<p>Her notayı nefesle başlat. Notayı Do'da çal; sayım bittiğinde gir.</p>",
          desen: "1 .5 .5 | 1 1 | .5 .5 1 | 2", olcu: "2/4", bpm: 84, nota: "C5",
        },
        {
          tur: "uzun-ses", baslik: "Kör 2: Si koma bemolü",
          html: "<p>En zor olan. Si'yi başlat, gevşet, tut. Sonunda tahmin: Si'ye mi daha yakın kaldın, Si♭'ye mi?</p>",
          nota: "B4@-50", saniye: 6, tekrar: 2, tolerans: 25,
        },
        {
          tur: "kulak", baslik: "Koma kulağı",
          html: "<p>Uygulama Si♭, Si² ya da Si çalacak; sen aynısını çal. Çalmadan önce içinden adını söyle.</p>",
          notalar: ["Bb4", "B4@-50", "B4", "A4"], soru: 6, gecme: 80,
        },
        {
          tur: "uzun-ses", baslik: "Kör 3: Re",
          html: "<p>Dünkü ev. Tut, bitir, tahmin et.</p>",
          nota: "D5", saniye: 8, tekrar: 2,
        },
        {
          tur: "dinle", baslik: "Model: Renk değiştiren ezgi",
          html: "<p>Bu ezgi bu metot için yazıldı. İlk yarı Kürdî (Si♭), ikinci yarı Uşşak (Si²) — aynı ev La, komşu değişince renk değişiyor. İki kez dinle; geçiş anını işaretle.</p>",
          abc: "X:11\nM:4/4\nL:1/8\nQ:1/4=76\nK:C\nA2 _B c d2 e2 | d2 c _B A4 | d2 e f e2 d2 | e4 z4 |\ne2 d c d2 c2 | _/B2 c d c2 _/B2 | A2 _/B c _/B2 A2 | A4 z4 |]",
          dem: "A4",
        },
        {
          tur: "eser", baslik: "Sınav ezgisi: tempoda",
          notaBaslik: "Renk değiştiren ezgi (bu metot için yazıldı)",
          html: "<p>Önce %60 ile bir kez, sonra doğrudan %100. Nefes: 4. ve 8. ölçü. Puan eşiği 70.</p>",
          abc: "X:11\nM:4/4\nL:1/8\nQ:1/4=76\nK:C\nA2 _B c d2 e2 | d2 c _B A4 | d2 e f e2 d2 | e4 z4 |\ne2 d c d2 c2 | _/B2 c d c2 _/B2 | A2 _/B c _/B2 A2 | A4 z4 |]",
          bpm: 76, dem: "A4", gecme: 70,
        },
        {
          tur: "kayit", baslik: "Kaydet ve modelle karşılaştır",
          html: "<p>Aynı ezgiyi dem ile kaydet. Sonra önce modeli, sonra kendini dinle. Üç soru; dürüst cevap ver, 'iyiydi' kaçamak cevaptır.</p>",
          etiket: "Ünite 7 sınavı — Renk değiştiren ezgi",
          kontrol: [
            "Ses: Si♭'den Si²'ye geçince rengin değiştiği kayıtta duyuluyor mu?",
            "Perde: Si² Si'ye mi daha yakın, yoksa Si♭'ye mi düştü?",
            "Zaman: 4. ve 8. ölçü nefeslerinde tempo bozuldu mu?",
          ],
        },
        {
          tur: "kontrol", baslik: "Üniteyi bitirme ölçütü",
          maddeler: [
            "Üç kör uzun sesten en az ikisinde tahminim ile sonuç uyuştu",
            "Koma kulağı adımını %80 doğrulukla geçtim",
            "Sınav ezgisini tempoda 70 puan üstünde çaldım",
            "Kayıtta renk değişimini kendim duydum",
          ],
        },
      ],
      kapanis: "<p>Artık 'makam' sözcüğü senin için bir sözcük değil, bir his. Ünite 8'de ilk gerçek 'egzotik' renge gidiyoruz: Hicaz — ve ikinci yarım deliğin, Do♯.</p>",
    },
  ],
};
