// Ünite 2 — Üç sesle ezgi: Fa–Sol–La ile kulaktan ezgiler, dörtlükler, soru-cevap, kulak oyunu, hata avı, ilk ezgi kaydı.
// Ezgiler bu metot için yazıldı (geleneksel değildir); karar Fa.
const EZGI1 = "X:1\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\nf g a g | f2 g2 | a g f g | f4 |]";
const EZGI2 = "X:2\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\na g f g | a2 g2 | a g a g | f4 |]";
const EZGI3 = "X:3\nM:4/4\nL:1/4\nQ:1/4=66\nK:C\nf g a g | f g a2 | g a g f | g2 f2 | a g f g | a2 g2 | f g a g | f4 |]";

export default {
  id: "u2",
  baslik: "Üç sesle ezgi",
  ozet: "Fa, Sol ve La ile ilk ezgilerini kulaktan çal; dörtlükleri say, soru-cevabı duy, hatanı avla.",
  dersler: [
    {
      id: "u2d1",
      baslik: "Dörtlükler ve ilk ezgi",
      ozet: "Vuruşu saymak, dörtlük notalar ve üç sesle yazılmış ilk küçük ezgi.",
      sure: 12,
      hedefler: [
        "Dörtlük ve ikilikleri 60 vuruş/dk'da sayımla çalmak",
        "'Üç Basamak' ezgisini kulaktan, kendi hızında çalmak",
        "Fa'yı 6 saniye kör sınavda tutmak",
      ],
      giris: `<p>Ezgi, seslerin zamanla buluşmasıdır. Üç sesin var; bugün onlara zaman veriyoruz. Önce vuruşu saymayı, sonra bu metot için yazılmış ilk ezgiyi öğreneceksin. Yöntem hep aynı: <b>dinle → mırıldan → hava balabanında parmak → çal.</b> Nota kâğıdı bazen görünür; şimdilik bakma, kulağını kullan.</p>`,
      adimlar: [
        {
          tur: "cizim",
          cizim: "ritim-sayma",
          baslik: "Vuruş, ölçü, sayım",
          ust: `<p>Müzikte zaman <b>vuruş</b>la ölçülür: kalp atışı gibi düzenli. Dört vuruş bir <b>ölçü</b> yapar: 1-2-3-4, 1-2-3-4. <b>Dörtlük</b> nota bir vuruş, <b>ikilik</b> iki vuruş, <b>birlik</b> dört vuruş sürer.</p>`,
          html: `<p>Çalgısız dene: ayağınla vuruşu tut, "1-2-3-4" de; sonra her sayıda bir "hu" söyle. Şimdi "1" ve "3"te "hu" (ikilikler). Şimdi yalnızca "1"de (birlik). Beden saymayı öğrenince parmak ve nefes onu izler.</p>`,
        },
        {
          tur: "ritim",
          baslik: "Dörtlükler Fa'da",
          desen: "1 1 1 1 | 2 2",
          olcu: "4/4",
          bpm: 60,
          nota: "F5",
          html: `<p>İlk ölçü dört dörtlük, ikinci ölçü iki ikilik. Her nota "hu" ile; notalar arasında hava kesilir ama dudak pozisyonu bozulmaz. Önce dinle, sayımla başla.</p>`,
        },
        {
          tur: "uzun-ses",
          baslik: "Kör: Fa, 6 saniye",
          nota: "F5",
          saniye: 6,
          tekrar: 2,
          dem: true,
          html: `<p>Serpiştirme: ritimden uzun sese geçiyoruz. Bu ay hedefin 8 saniye; bugün 6. Dem sesine yaslan, sonunu temiz bitir, tahmin et.</p>`,
        },
        {
          tur: "dinle",
          baslik: "Ezgi 1: Üç Basamak",
          abc: EZGI1,
          notaBaslik: "Üç Basamak (bu metot için yazıldı)",
          html: `<p>Bu ezgi bu metot için yazıldı, Doğu Anadolu ezgilerinin üslubunda; geleneksel bir türkü değil. Üç kez dinle. Sonra mırıldan: "Fa Sol La Sol – Fa Sol – La Sol Fa Sol – Fa". Porte görünüyor; bakma, kulağını kullan.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "Üç Basamak, kendi hızında",
          dizi: ["F5", "G5", "A5", "G5", "F5", "G5", "A5", "G5", "F5", "G5", "F5"],
          html: `<p>Notaları sırayla bekliyorum; süre yok, sadece sıra. Her nota ayrı "hu". Takılırsan dur, nefes al, o notadan sür. Üç kez temiz geçince ezgi "parmağında".</p>`,
        },
        {
          tur: "ritim",
          baslik: "Ezginin ritmi, tek seste",
          desen: "1 1 1 1 | 2 2 | 1 1 1 1 | 4",
          olcu: "4/4",
          bpm: 60,
          nota: "G5",
          html: `<p>Bu, Üç Basamak'ın ritmi. Parmak yok, yalnız Sol sesi; sadece zamanı duy. Dörtlük-dörtlük-dörtlük-dörtlük, ikilik-ikilik, dörtlükler, birlik. Yarın ikisini birleştireceğiz.</p>`,
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          maddeler: [
            "Dörtlük ve ikilikleri sayımla çaldım",
            "Üç Basamak'ı kendi hızımda en az bir kez temiz geçtim",
            "Fa'yı 6 saniye tuttum",
            "Dudak molalarını verdim; kamış kurumaya alındı",
          ],
        },
      ],
      kapanis: `<p>İlk ezgin parmağında. Akşam oturumunda: 2 uzun ses + Üç Basamak 3 kez + 1 dakika serbest. Yarın soru-cevap cümlelerini duyacaksın.</p>`,
    },

    {
      id: "u2d2",
      baslik: "Soru ve cevap",
      ozet: "Ezgi cümleleri: soru yukarıda kalır, cevap karara iner; ilk kulak oyunu.",
      sure: 12,
      hedefler: [
        "'Soru–Cevap' ezgisini iki cümle hâlinde, sonra bütün olarak çalmak",
        "Uygulamanın çaldığı sesi üç sesten tanıyıp aynısını çalmak (3 soru)",
        "La'yı 6 saniye kör sınavda tutmak",
      ],
      giris: `<p>Ezgiler konuşma gibidir: bir cümle sorar, öbürü cevaplar. Soru havada kalır (Sol'de biter), cevap <b>karar</b> sesine (Fa) iner ve dinler. Bugün bunu duyacak, sonra kulağınla oynayacaksın.</p>`,
      adimlar: [
        {
          tur: "dinle",
          baslik: "Ezgi 2: Soru–Cevap",
          abc: EZGI2,
          notaBaslik: "Soru–Cevap (bu metot için yazıldı)",
          html: `<p>Bu metot için yazıldı. İlk iki ölçü soru: "La Sol Fa Sol – La Sol" (Sol'de asılı kalır). Son iki ölçü cevap: "La Sol La Sol – Fa" (karar). Nefes yeri: soru ile cevap arasında. Üç kez dinle, mırıldan, hava balabanında parmakla.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "Önce soru",
          dizi: ["A5", "G5", "F5", "G5", "A5", "G5"],
          html: `<p>Yalnızca ilk cümle. La'dan başlıyor: önce dem gibi içinden La'yı duy, sonra "hu". Son Sol'ü biraz uzun tut, soru gibi.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "Sonra cevap",
          dizi: ["A5", "G5", "A5", "G5", "F5"],
          html: `<p>İkinci cümle. Son Fa'yı uzun ve sakin bitir; karar sesi "eve dönüş"tür.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "Bütün ezgi",
          dizi: ["A5", "G5", "F5", "G5", "A5", "G5", "A5", "G5", "A5", "G5", "F5"],
          html: `<p>Soru, nefes, cevap. İki cümleyi birleştirirken bir yerde takılırsan, o iki notayı üç kez tek başına çal, sonra bütüne dön. Buna yarın "hata avı" diyeceğiz.</p>`,
        },
        {
          tur: "uzun-ses",
          baslik: "Kör: La, 6 saniye",
          nota: "A5",
          saniye: 6,
          tekrar: 2,
          dem: true,
          html: `<p>Dudak molasından sonra. Serpiştirme: ezgiden uzun sese. La'da tiz kaçma eğilimini hatırla: kamışı daha az sık, dem sesiyle vuru kaybolsun.</p>`,
        },
        {
          tur: "kulak",
          baslik: "Kulak oyunu: hangi ses?",
          notalar: ["F5", "G5", "A5"],
          soru: 3,
          html: `<p>Uygulama üç sesten birini çalar; sen aynısını çalarsın. Önce içinden söyle ("bu Sol"), sonra parmak, sonra "hu". Yanılırsan ikinci hakkın var. Bu oyun, balabanı "kulak çalgısı" yapan şeydir.</p>`,
          not: `<p>Ata (2001, aktaran Şahin 2018): balaban "neredeyse perdesiz bir çalgı… tüm hakimiyet dudaklardadır." Dudağı yöneten kulaktır; kulak oyunu bu yüzden her ünitede olacak.</p>`,
        },
        {
          tur: "ritim",
          baslik: "Dörtlükler La'da",
          desen: "1 1 1 1 | 1 1 2",
          olcu: "4/4",
          bpm: 66,
          nota: "A5",
          html: `<p>Biraz daha hızlı: 66. Yedi nota, her biri "hu". Son ikilikte sesi düşürme.</p>`,
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          maddeler: [
            "Soru ve cevabı ayrı ayrı, sonra birlikte çaldım",
            "Kulak oyununda en az 2/3 doğru",
            "La'yı 6 saniye tuttum",
            "Ağrı yok; kamış kurumaya alındı",
          ],
        },
      ],
      kapanis: `<p>Artık ezgi cümlelerini duyuyorsun. Akşam: Üç Basamak + Soru–Cevap ikişer kez, 2 uzun ses. Yarın daha uzun bir ezgi ve hata avı.</p>`,
    },

    {
      id: "u2d3",
      baslik: "Hata avı",
      ozet: "Daha uzun bir ezgi, hatanın tam yerini bulup yalnız orayı onarmak, 2 dakika serbest çalışma.",
      sure: 12,
      hedefler: [
        "'Dağ Yolu' ezgisini iki yarım hâlinde, sonra bütün olarak çalmak",
        "Takıldığın geçişi adlandırıp 5 temiz tekrarla onarmak",
        "Kulak oyununda 5 sorudan 4'ünü doğru çalmak",
      ],
      giris: `<p>Hocası olmayan öğrencinin en büyük düşmanı "baştan sona bir daha" alışkanlığıdır. Bugün hoca gibi çalışmayı öğreniyorsun: hatayı duy, <b>tam yerini</b> bul, yalnız orayı onar, sonra bağlamına geri koy.</p>`,
      adimlar: [
        {
          tur: "metin",
          baslik: "Hata avı: dört adım",
          html: `<ol>
<li><b>Duy:</b> ezgiyi çal; takıldığın ya da kirli çıkan yeri fark et.</li>
<li><b>Adlandır:</b> hangi iki nota arasında? Nedeni ne: parmak mı, nefes mi, dudak mı, zamanlama mı?</li>
<li><b>Onar:</b> yalnız o iki notayı (en çok dört) yavaşça, <b>5 kez üst üste temiz</b> çıkana kadar çal.</li>
<li><b>Geri koy:</b> o iki notayı içeren cümleyi çal; sonra bütünü.</li>
</ol>
<p>Bu, 20 kez baştan sona çalmaktan daha sıkıcı ve daha etkili.</p>`,
          not: `<p>Duke, Simmons & Cash (2009): en iyi piyano öğrencilerini ayıran şey tekrar sayısı değil, hatanın tam yerini bulup <b>o hücreyi</b> onarma ve bağlama geri koymaydı.</p>`,
        },
        {
          tur: "dinle",
          baslik: "Ezgi 3: Dağ Yolu",
          abc: EZGI3,
          notaBaslik: "Dağ Yolu (bu metot için yazıldı)",
          html: `<p>Sekiz ölçü, iki yarım. Bu metot için yazıldı; iki kez "tırmanır" ve karara iner. Üç kez dinle; ikinci dinleyişte ikinci yarıya dikkat et: "La Sol Fa Sol – La Sol – Fa Sol La Sol – Fa".</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "İlk yarı",
          dizi: ["F5", "G5", "A5", "G5", "F5", "G5", "A5", "G5", "A5", "G5", "F5", "G5", "F5"],
          html: `<p>Dört ölçü: "Fa Sol La Sol – Fa Sol La – Sol La Sol Fa – Sol Fa". Takıldığın yeri aklında tut.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "İkinci yarı",
          dizi: ["A5", "G5", "F5", "G5", "A5", "G5", "F5", "G5", "A5", "G5", "F5"],
          html: `<p>La'dan başlar: önce içinden La'yı duy. "La Sol Fa Sol – La Sol – Fa Sol La Sol – Fa".</p>`,
        },
        {
          tur: "metin",
          baslik: "Şimdi avla",
          html: `<p>Dudak molası (45 sn). Molada karar ver: iki yarımda en çok nerede takıldın? Çoğu öğrencide ilk aday <b>Fa→La</b> sıçraması (iki parmak birden kalkar) ya da <b>La→Fa</b> inişidir (iki parmak birden iner, biri sızdırır).</p>
<p>Mola bitince yalnız o iki notayı 5 kez temiz çal; parmaklar <b>aynı anda</b> insin, yastıkla. Sonra bütün ezgiye dön.</p>`,
          notTuru: "ipucu",
        },
        {
          tur: "nota-dizisi",
          baslik: "Bütün Dağ Yolu",
          dizi: ["F5", "G5", "A5", "G5", "F5", "G5", "A5", "G5", "A5", "G5", "F5", "G5", "F5", "A5", "G5", "F5", "G5", "A5", "G5", "F5", "G5", "A5", "G5", "F5"],
          gecme: 70,
          html: `<p>Yirmi dört nota. Yarımlar arasında rahat nefes. Takılırsan hata avına dön; geçemezsen yarın yine burada.</p>`,
        },
        {
          tur: "kulak",
          baslik: "Kulak oyunu: 5 soru",
          notalar: ["F5", "G5", "A5"],
          soru: 5,
          html: `<p>Dünkü oyun, daha uzun. Önce içinden adlandır, sonra çal.</p>`,
        },
        {
          tur: "sureli",
          baslik: "2 dakika serbest",
          dakika: 2,
          html: `<p>Sayaç yalnızca ses duyarken ilerler. Üç ezgiyi istediğin sırayla çal; yargılama, dinle. Uzun ses de olur, ezgi de. Yorulursan kamışı çıkar, sayaç durur.</p>`,
        },
        {
          tur: "uzun-ses",
          baslik: "Kör: Sol, 5 saniye",
          nota: "G5",
          saniye: 5,
          tekrar: 2,
          dem: true,
          html: `<p>Günü sakin bir uzun sesle kapat. Düz, sıcak, tahmin et.</p>`,
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          maddeler: [
            "Takıldığım geçişi adlandırdım (hangi iki nota, neden)",
            "O geçişi 5 kez temiz çalıp ezgiye geri koydum",
            "Dağ Yolu'nu bütün olarak en az bir kez geçtim",
            "Kulak oyununda 4/5 ya da üstü (ya da hangi sesi karıştırdığımı biliyorum)",
          ],
        },
      ],
      kapanis: `<p>Üç ezgin ve bir yöntemin var. Yarın ünite sınavı ve ilk <b>ezgi</b> kaydın. Akşam oturumu kısa: Soru–Cevap 3 kez, 2 uzun ses; yarın dudağın taze olsun.</p>`,
    },

    {
      id: "u2d4",
      baslik: "Ünite sınavı: ilk ezgi kaydın",
      ozet: "8 saniyelik uzun ses, karışık ritim, kulak oyunu, Soru–Cevap ezgisi; model dinle, kaydet, değerlendir.",
      sure: 12,
      hedefler: [
        "Fa'yı 8 saniye kör sınavda bantta tutmak (1. ay hedefi)",
        "Kulak oyununda 5 sorudan 4'ünü doğru çalmak",
        "Soru–Cevap ezgisini kaydedip modelle karşılaştırmak",
      ],
      giris: `<p>Birinci ayın ölçütleri: 8 saniyelik düz ses, kulaktan iki ezgi. Bugün ikisini de ölçüyoruz. Sıra karışık, kör sınav var; ustalık üç farklı günde. Kamışı uyandır, 3 karın nefesi, başla.</p>`,
      adimlar: [
        {
          tur: "uzun-ses",
          baslik: "Kör: Fa, 8 saniye",
          nota: "F5",
          saniye: 8,
          tekrar: 2,
          dem: true,
          html: `<p>Ayın hedefi. Nefesi karından al, sabit basınçla ver; son saniyede ses düşmesin. Tahmin et.</p>`,
        },
        {
          tur: "ritim",
          baslik: "Karışık ritim",
          desen: "1 1 2 | 2 1 1 | 1 1 1 1 | 4",
          olcu: "4/4",
          bpm: 66,
          nota: "F5",
          html: `<p>Dört ölçü, dört farklı desen. Her nota "hu". Önce dinle, sayımı bekle.</p>`,
        },
        {
          tur: "kulak",
          baslik: "Kulak oyunu",
          notalar: ["F5", "G5", "A5"],
          soru: 5,
          gecme: 80,
          html: `<p>Beş soru, dördü doğru olmalı. Önce adlandır, sonra çal.</p>`,
        },
        {
          tur: "nota-dizisi",
          baslik: "Soru–Cevap, bütün",
          dizi: ["A5", "G5", "F5", "G5", "A5", "G5", "A5", "G5", "A5", "G5", "F5"],
          gecme: 70,
          html: `<p>Dudak molasından sonra. Soru, nefes, cevap; son Fa'yı sakin bitir.</p>`,
        },
        {
          tur: "uzun-ses",
          baslik: "Kör: La, 6 saniye",
          nota: "A5",
          saniye: 6,
          tekrar: 2,
          dem: true,
          html: `<p>En "kaçak" sesin. Kamışı az sık, dem sesiyle vuru kaybolsun.</p>`,
        },
        {
          tur: "dinle",
          baslik: "Model: Soru–Cevap",
          abc: EZGI2,
          notaBaslik: "Soru–Cevap (model)",
          html: `<p>Kaydetmeden önce modeli iki kez dinle. Dikkat: cümle sonlarındaki uzun notaların sakinliği, notaların eşit uzunluğu, başlangıçların temizliği.</p>`,
        },
        {
          tur: "kayit",
          baslik: "İlk ezgi kaydın",
          etiket: "Ünite 2 — Soru–Cevap ezgisi",
          html: `<p>Soru–Cevap'ı baştan sona kaydet; yaklaşık 66 vuruş/dk, soru ile cevap arasında nefes. Çalarken yargı yok. Sonra kaydını ve modeli art arda dinle; üç soruya dürüst yanıt ver.</p>`,
          kontrol: [
            "Ses: sıcak ve dolgun; notalar arasında cıyaklama yok",
            "Perde: Fa, Sol, La modeldekine yakın; La tiz kaçmadı",
            "Zaman: ikilikler dörtlüklerin iki katı; ezgi akıyor, duraksamıyor",
          ],
        },
        {
          tur: "metin",
          baslik: "Bu kaydı sakla",
          html: `<p>Bugünkü kayıt senin "ilk ay" belgen. Dört hafta sonra uygulama sana onu yeniden dinletecek; ilerlemeyi hissetmek değil, <b>duymak</b> istiyoruz. Şimdi kendine karşı sert olma: bir ay önce tek ses bile çıkaramıyordun.</p>`,
          not: `<p>Hewitt (2001): öz-değerlendirme yalnızca model kayıtla birleşince işe yarıyor. Dört haftada bir eski kaydı dinlemek, bırakmayı önleyen en ucuz araçlardan biri.</p>`,
        },
        {
          tur: "kontrol",
          baslik: "Geçiş ölçütü",
          html: `<p>Ünite 3'e geçmek için üç farklı günde:</p>`,
          maddeler: [
            "Fa'yı 8 saniye bantta tuttum",
            "Kulak oyununda 4/5",
            "Soru–Cevap'ı temiz geçtim; en az bir ezgiyi daha ezberden çalabiliyorum",
            "Kaydımı modelle karşılaştırıp bir sonraki hedefimi yazdım",
          ],
        },
      ],
      kapanis: `<p>İki ünite, üç ses, üç ezgi, iki kayıt. Ünite 3'te aşağı iniyoruz: Mi, Re, Do; sonra altı sesle ilk Çargâh renkli ezgiler ve nota kâğıdının ilk "hatırlatıcı" kullanımı. Yarın görüşürüz.</p>`,
    },
  ],
};
