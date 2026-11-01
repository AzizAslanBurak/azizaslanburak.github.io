// Ünite 10 — Aksak usuller ve türküler (≈26–36. hafta)
// Özgün ezgiler bu metot için yazıldı. Türküler 03 notundaki doğrulanmış ABC'lerden dörtlü yukarı aktarıldı (Sol4 → Do5).

const HAVADA_CEKIRDEK = `X:1
M:10/8
L:1/8
Q:1/4=80
K:C
z2 f g2 a2 a3 | a3- a2 a2 g3 | z2 f g2 a2 a3 | a3- a2 a2 g3 |]`;

const HAVADA_SAZ = `X:2
M:10/8
L:1/8
Q:1/4=80
K:C
|: a3 a2 ag aga | g3 g2 g2 b2 z | f3 f2 f_/e f_/ef | f3 f2 f2 f2 z |
c3 c2 d2 d3 | dcf _/ed d2 d3 | c3 c2 d2 d3 | dcf _/ed d2 d3 :|`;

const HAVADA_SOZ = `X:3
M:10/8
L:1/8
Q:1/4=80
K:C
z2 f g2 a2 a3 | a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 |
a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 | a3- a2 a2 g3 |
z2 c' c'2 g2 aga | g2 a ag gf a2 g | gf g gf f_/e g2 f |
f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |
z2 a ag gf a2 g | ag a ag gf a2 g | f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |]`;

const HAVADA_TAM = `X:4
M:10/8
L:1/8
Q:1/4=80
K:C
|: a3 a2 ag aga | g3 g2 g2 b2 z | f3 f2 f_/e f_/ef | f3 f2 f2 f2 z |
c3 c2 d2 d3 | dcf _/ed d2 d3 | c3 c2 d2 d3 | dcf _/ed d2 d3 :|
z2 f g2 a2 a3 | a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 |
a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 | a3- a2 a2 g3 |
z2 c' c'2 g2 aga | g2 a ag gf a2 g | gf g gf f_/e g2 f |
f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |
z2 a ag gf a2 g | ag a ag gf a2 g | f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |]`;

const DARI_A = `X:5
M:12/8
L:1/8
Q:1/4=108
K:C
c>d_/e f g2 g>af g2 z | c>d_/e f g2 g>af g2 z |]
w:Ben bir a-vuç da-rı o * lup Ye-re ser-pi-le cek * ol-sam`;

const DARI_B = `X:6
M:12/8
L:1/8
Q:1/4=108
K:C
a>_ba a>ag g>ag g>f_/e | f>gf {a}g>gf f>f_/e _/e2 z |]
w:Goy be-ni ni * ce ney * ler sin ba-lam Sen be-ni ni * ce ney * ler sin`;

const DARI_TAM = `X:7
M:12/8
L:1/8
Q:1/4=108
K:C
c>d_/e f g2 g>af g2 z | c>d_/e f g2 g>af g2 z |
|: c>d_/e f g2 g>af g2 z | c>d_/e f g2 g>af g2 z |
w:Ben bir a-vuç da-rı o * lup Ye-re ser-pi-le cek * ol-sam
a>_ba a>ag g>ag g>f_/e | f>gf {a}g>gf f>f_/e _/e2 z :|
w:Goy be-ni ni * ce ney * ler sin ba-lam Sen be-ni ni * ce ney * ler sin`;

const TOPAL_HALAY = `X:8
M:5/8
L:1/8
Q:1/4=80
K:C
A _/B c3 | d e d3 | e d c3 | _/B2 A3 |
e2 d3 | c2 _/B3 | A _/B c2 _/B | A3- A2 |]`;

const YEDI_ADIM = `X:9
M:7/8
L:1/8
Q:1/4=84
K:C
A2 _B2 c3 | d2 c2 _B3 | A2 c2 d3 | e2 d2 c3 |
e f e2 d3 | c d c2 _B3 | A2 _B2 c2 _B | A2 A2 A3 |]`;

const DOKUZ_VURUS = `X:10
M:9/8
L:1/8
Q:1/4=88
K:C
A2 _B2 ^c2 d3 | e2 d2 ^c2 d3 | e2 f2 e2 d3 | ^c _B ^c _B A2 A3 |]`;

const UC_TEMPO = "<p><b>Üç tempo:</b> Hız kaydırıcısını önce <b>%60</b>'a al, temiz çal; sonra <b>%100</b>; en son <b>%80</b>. Sırayı bozma: hedef tempoyu bir kez duymak, yavaşı sabitler.</p>";

export default {
  id: "u10",
  baslik: "Aksak usuller ve türküler",
  ozet: "5/8, 7/8, 9/8, 10/8 curcuna ve 12/8; iki gerçek Doğu Anadolu türküsü ve bu metot için yazılmış ezgiler.",
  dersler: [
    {
      id: "u10d1",
      baslik: "Topal ritim: 5/8 (2+3)",
      ozet: "Aksak usulün en küçüğü: iki kısa, üç kısa. Önce dizine vur, sonra çal.",
      sure: 18,
      hedefler: ["5/8'i 2+3 diye sayıp dizine vurmak", "Ritim adımını %70 ve üstü puanla geçmek", "Topal Halay'ı tempoda çalmak"],
      giris: "<p>Şimdiye kadar çaldığın 2/4, 4/4 ve 6/8'de vuruşlar eşitti. Doğu Anadolu'nun ve Azerbaycan'ın çoğu havası ise <b>aksak</b>tır: vuruşların biri ötekinden uzundur. Halk buna \"topal\" der; ayak bir kısa bir uzun basar. Bu ünitede dört aksak usul ve iki gerçek türkü var.</p>",
      adimlar: [
        { tur: "metin", baslik: "Aksak ne demek?", html: "<p>5/8'de ölçüde beş sekizlik var; ama sayarken beş saymazsın, <b>iki grup</b> sayarsın: <b>2+3</b>. Birinci vuruş iki sekizlik (kısa), ikinci vuruş üç sekizlik (uzun).</p><p>Sesli say: \"<b>bir</b>-iki, <b>bir</b>-iki-üç\". Vurgu hep grubun başında. Sağ elinle dizine vur: kısa vuruşta hafif, uzun vuruşta biraz daha ağır. Bir dakika sadece dizine vur, çalgıyı alma.</p>" },
        { tur: "cizim", cizim: "ritim-sayma", ust: "Vuruş, ölçü, sayım", html: "<p>Aksak ölçüde \"vuruş\" artık dörtlük değil, <b>grup</b>tur. 5/8'in iki vuruşu var: biri 2 sekizlik, biri 3 sekizlik. Ritim adımında desenler dörtlük cinsinden yazılır: 2 sekizlik = <b>1</b>, 3 sekizlik = <b>1.5</b>.</p>" },
        { tur: "ritim", baslik: "Ritim adımı: 1 1.5", desen: "1 1.5 | 1 1.5", olcu: "5/8", bpm: 72, nota: "D5", html: "<p>Sayımdan sonra her notayı nefesle (\"hu\") yeniden başlat; parmak değiştirme, tek nota Re. Kısa–uzun, kısa–uzun. Uzun notayı sonuna kadar tut, erkenden bırakırsan uygulama bir sonraki girişi erken sayar.</p>", not: "<p>İşitsel sayım görselden daha güvenilir sürükler (Repp &amp; Su 2013). Ekrana bakma, sayımı dinle.</p>" },
        { tur: "ritim", baslik: "Sekizliklerle 5/8", desen: ".5 .5 .5 .5 .5 | 1 1.5", olcu: "5/8", bpm: 72, nota: "D5", html: "<p>Şimdi beş sekizliğin hepsini ayrı ayrı nefesle başlat, ikinci ölçüde kısa–uzuna dön. Vurguyu birinci ve üçüncü sekizliğe koy: <b>HU</b>-hu-<b>HU</b>-hu-hu. Böylece 2+3 bedene yerleşir.</p>" },
        { tur: "dinle", baslik: "Topal Halay'ı dinle", abc: TOPAL_HALAY, notaBaslik: "Topal Halay — bu metot için yazıldı", dem: "A4", html: "<p>Bu ezgi <b>bu metot için yazıldı</b>, Doğu Anadolu halay havalarının üslubunda; Hüseynî/Uşşak renginde, karar La. Si koma bemolü (<b>_/B</b>) var: piyano Si'si değil, deliğin verdiği hafif pes Si. Üç kez dinle; ikinci dinleyişte dizine 2+3 vur, üçüncüde ezgiyi mırıldan.</p>" },
        { tur: "eser", baslik: "Topal Halay'ı çal", abc: TOPAL_HALAY, notaBaslik: "Topal Halay (5/8)", dem: "A4", gecme: 70, html: "<p>Önce \"Notayla ilerle\" ile kendi hızında, sonra \"Tempoda çal\". Dem düğmesini aç: karar La'nın üstünde çalmak perdeyi oturtur. İlk dört ölçü soru, son dört ölçü cevap; her dördün sonunda nefes.</p>" + UC_TEMPO, not: "<p><b>Hata avı:</b> en çok takılan yer 7. ölçüdeki <i>La–Si²–Do–Si²</i> dönüşüdür. Takılırsan ezgiyi bırak, yalnız o dört notayı 5 kez temiz çal, sonra ölçüyü yerine koy.</p>", notTuru: "ipucu" },
        { tur: "kulak", baslik: "Serpiştirme: Hicaz kulağı", notalar: ["A4", "Bb4", "C#5", "D5", "E5"], soru: 4, html: "<p>Araya önceki ünitelerden bir şey katıyoruz: Hicaz dörtlüsü. Uygulama çalar, sen aynısını çal. Zor gelir ama kalıcıdır: karıştırarak çalışmak bloklu çalışmadan daha çok akılda kalır (Carter &amp; Grahn 2016).</p>" },
        { tur: "ritim", baslik: "Geri dön: 5/8 bir daha", desen: "1 1.5 | .5 .5 1.5 | 1 1.5", olcu: "5/8", bpm: 80, nota: "A5", html: "<p>Biraz daha hızlı ve ortada bir tuzak: ikinci ölçüde iki sekizlik ve uzun. Nefesle başlat, uzunu sonuna kadar götür.</p>" },
        { tur: "kontrol", maddeler: ["5/8'i \"bir-iki, bir-iki-üç\" diye sayarken dizim doğru yere vuruyor", "Ritim adımlarında ortalama puanım 70'in üstünde", "Topal Halay'ı %100 hızda, demle, baştan sona çaldım", "Dudağımda ağrı yok"] },
      ],
      kapanis: "<p>Topal ritmi tuttun. Yarın 7/8 ve 9/8 geliyor; ikisi de aynı ailedendir: kısa, kısa, uzun. Bugün akşam çalgısız beş dakika: Topal Halay'ı içinden söyle, dizine 2+3 vur.</p>",
    },
    {
      id: "u10d2",
      baslik: "7/8 ve 9/8: kısa, kısa, uzun",
      ozet: "2+2+3 ve 2+2+2+3. Uzun vuruş hep sonda; önce ritim, sonra Kürdî ve Hicaz ezgileri.",
      sure: 20,
      hedefler: ["7/8'i 2+2+3, 9/8'i 2+2+2+3 diye sayıp çalmak", "Yedi Adım'ı %100 hızda temiz bitirmek", "Dokuz Vuruş'ta Do♯ yarım deliğini ritmi bozmadan basmak"],
      adimlar: [
        { tur: "metin", baslik: "Aynı aile", html: "<p>7/8 = <b>2+2+3</b>, 9/8 = <b>2+2+2+3</b>. Dünkü 5/8'in önüne bir ya da iki kısa vuruş eklendi, o kadar. Uzun vuruş yine sonda. Say: \"<b>bir</b>-iki, <b>bir</b>-iki, <b>bir</b>-iki-üç\".</p><p>7/8 Türk aksağı ve Azerbaycan rəqslerinde, 9/8 halaylarda ve Azerbaycan yallı/cəngi havalarında yaygındır. Dörtlük cinsinden 7/8 deseni: <b>1 1 1.5</b>; 9/8: <b>1 1 1 1.5</b>.</p>" },
        { tur: "ritim", baslik: "Ritim adımı: 7/8", desen: "1 1 1.5 | 1 1 1.5", olcu: "7/8", bpm: 76, nota: "D5", html: "<p>Önce bir dakika dizine vur, sonra çal. Her notayı nefesle başlat, tek nota Re. Üçüncü vuruş uzun: bırakma, say.</p>" },
        { tur: "ritim", baslik: "7/8 sekizliklerle", desen: ".5 .5 .5 .5 1.5 | 1 1 1.5", olcu: "7/8", bpm: 76, nota: "D5", html: "<p>Dört sekizlik, sonra uzun. Vurgu 1. ve 3. sekizlikte. İkinci ölçüde kısa–kısa–uzuna dön.</p>" },
        { tur: "eser", baslik: "Yedi Adım'ı çal", abc: YEDI_ADIM, notaBaslik: "Yedi Adım (7/8) — bu metot için yazıldı", dem: "A4", gecme: 70, html: "<p><b>Bu ezgi bu metot için yazıldı</b>, Doğu Anadolu ezgilerinin üslubunda; Kürdî renginde (Si♭: balabanda 8 açık, düdükte 8 yarım). Önce dinle, dizine 2+2+3 vur; sonra \"Notayla ilerle\", en son \"Tempoda çal\". Dört ölçü soru, dört ölçü cevap; nefesler dördüncü ve sekizinci ölçünün uzun notalarında.</p>" + UC_TEMPO, not: "<p><b>Hata avı:</b> 5. ölçü <i>Mi–Fa–Mi–Re</i>: Fa'dan Mi'ye dönüşte sol serçe (4) deliği tam ve hızlı kapatsın, yarım delik gibi kaydırma. Yalnız o üç notayı 5 kez.</p>", notTuru: "ipucu" },
        { tur: "ritim", baslik: "Ritim adımı: 9/8", desen: "1 1 1 1.5 | 1 1 1 1.5", olcu: "9/8", bpm: 80, nota: "D5", html: "<p>Üç kısa, bir uzun. Dizine vururken \"bir-iki, bir-iki, bir-iki, bir-iki-üç\". Nefesle başlat, uzunu tut.</p>" },
        { tur: "eser", baslik: "Dokuz Vuruş'u çal", abc: DOKUZ_VURUS, notaBaslik: "Dokuz Vuruş (9/8) — bu metot için yazıldı", dem: "A4", gecme: 70, html: "<p><b>Bu ezgi bu metot için yazıldı</b>; Hicaz renginde: Si♭ ve Do♯ (6. delik yarım). Kısa bir dört ölçü; amaç yarım deliği ritmi aksatmadan basmak. Son ölçüde Do♯–Si♭ sallanışı halay ayağının \"sekme\"sidir.</p>" + UC_TEMPO },
        { tur: "ritim", baslik: "Serpiştirme: 5/8'e dön", desen: "1 1.5 | 1 1.5 | 1 1 1.5", olcu: "7/8", bpm: 76, nota: "A5", html: "<p>Dünkü 2+3 ve bugünkü 2+2+3 art arda. Ölçüler eşit değil, bu bilerek: usulden usule geçerken sayımı değiştirmeyi öğreniyorsun. Zor gelir ama kalıcıdır.</p>" },
        { tur: "uzun-ses", baslik: "Kör sınav: Si koma bemolü", nota: "B4@-50", saniye: 8, tekrar: 2, dem: "A4", tolerans: 25, html: "<p>Gösterge kapalı. Dem La üstünde Si koma bemolünü 8 saniye tut; bitince pes mi tiz mi tam mı, önce sen söyle. Bu perde yarın gelecek türkünün aktarılmış hâlinde Mi koma bemolü olarak karşına çıkacak; kulak bugünden alışsın.</p>" },
        { tur: "kontrol", maddeler: ["7/8 ve 9/8'i sayarken uzun vuruşu kısaltmıyorum", "Yedi Adım'ı %100 hızda 3 geçişten 2'sinde temiz çaldım", "Dokuz Vuruş'ta Do♯ yarım deliği ritmi aksatmıyor", "5/8 → 7/8 geçişinde sayımı değiştirebiliyorum"] },
      ],
      kapanis: "<p>Üç aksak usul bedeninde. Yarın Doğu Anadolu'nun ağıt ritmi curcuna (10/8) ve ilk gerçek türkü: Havada Bulut Yok.</p>",
    },
    {
      id: "u10d3",
      baslik: "Curcuna (10/8) ve Havada Bulut Yok",
      ozet: "3+2+2+3: ağıtların ritmi. Yemen türküsünü Re kararına aktarılmış hâliyle parça parça öğren.",
      sure: 22,
      hedefler: ["10/8 curcunayı 3+2+2+3 diye sayıp çalmak", "Havada Bulut Yok'un çekirdek cümlesini demle, %100 hızda çalmak", "Söz bölümünün tamamını notayla ilerleyerek bitirmek"],
      giris: "<p><b>Havada Bulut Yok</b> (Yemen Türküsü): Muş ve Elazığ sahiplenir; anonim bir ağıttır. Gördüğümüz notada Hüseynî, usûlü Curcuna (10/8). Balabanın en pes sesi La olduğu için ezgiyi <b>bu metot için dörtlü yukarı aktardık</b>: karar La yerine <b>Re</b>, Si koma bemolü yerine <b>Mi koma bemolü</b> (<b>_/e</b>: Mi parmağı, dudak hafif gevşek; Ünite 7'deki Si² gibi). Tepe sesi Do6, Ünite 9'da öğrendiğin dudak notası.</p>",
      adimlar: [
        { tur: "metin", baslik: "Curcuna: 3+2+2+3", html: "<p>Curcuna on sekizliktir ama dört vuruş: <b>uzun–kısa–kısa–uzun</b>. Say: \"<b>bir</b>-iki-üç, <b>bir</b>-iki, <b>bir</b>-iki, <b>bir</b>-iki-üç\". Uzun vuruşlar başta ve sonda; ağıtın sallanışı buradan gelir.</p><p>Dörtlük cinsinden desen: <b>1.5 1 1 1.5</b>. Bir dakika dizine vur, sonra çal.</p>" },
        { tur: "ritim", baslik: "Ritim adımı: 1.5 1 1 1.5", desen: "1.5 1 1 1.5 | 1.5 1 1 1.5", olcu: "10/8", bpm: 80, nota: "D5", html: "<p>Her notayı nefesle başlat, tek nota Re (türkünün yeni kararı). İlk uzunu kısaltma: en sık hata budur.</p>" },
        { tur: "ritim", baslik: "Türkünün ritmi", desen: "-1 .5 1 1 1.5 | 1.5 1 1 1.5", olcu: "10/8", bpm: 80, nota: "D5", html: "<p>Türkünün söz cümlesi bir dörtlük esle başlar, sonra kısa bir giriş notası. Bu desen tam olarak \"Havada bulut yok\" satırının ritmidir. Es sırasında say, notaya girişi kaçırma.</p>" },
        { tur: "dinle", baslik: "Çekirdek cümleyi dinle", abc: HAVADA_CEKIRDEK, notaBaslik: "Havada Bulut Yok — çekirdek (Re karar, aktarılmış)", dem: "D5", html: "<p>Sözler: <i>Havada bulut yok, bu ne dumandır</i>. İki ölçülük cümle iki kez. Fa–Sol–La–La ile çıkar, La'da durur, Sol'de nefeslenir. Üç kez dinle, mırıldan; dizine 3+2+2+3 vur.</p>" },
        { tur: "eser", baslik: "Çekirdeği çal", abc: HAVADA_CEKIRDEK, notaBaslik: "Havada Bulut Yok — çekirdek", dem: "D5", gecme: 70, html: "<p>Dem Re üstünde. Bağlı La'yı (ikinci ölçü başı) tek nefeste tut; ağıtta uzun ses ağlamaktır, kesme. \"Notayla ilerle\" → \"Tempoda çal\".</p>" + UC_TEMPO },
        { tur: "uzun-ses", baslik: "Mi koma bemolü: dudakla bul", nota: "E5@-50", saniye: 6, tekrar: 3, dem: "A4", tolerans: 25, html: "<p>Türkünün yeni perdesi. Mi'yi (1–4 kapalı) başlat, ikinci saniyede alt dudağı birazcık gevşet; ses hafifçe aşağı kaysın ve orada kalsın. Ünite 7'de Si için yaptığının aynısı, bir dörtlü yukarıda. Dem La ile sürtünmenin en yumuşadığı yer senin Mi koma bemolün. Bitince tahmin et.</p>" },
        { tur: "eser", baslik: "Saz girişi", abc: HAVADA_SAZ, notaBaslik: "Havada Bulut Yok — saz girişi", dem: "D5", gecme: 70, html: "<p>Sekiz ölçülük saz girişi; tekrarlı. Burada Si5 (2. ölçü, dudakla) ve Mi koma bemolü var. İlk dört ölçü La'dan Fa'ya iner, son dört ölçü Do–Re kararı etrafında döner. Nefes: her ölçü sonundaki uzun notada.</p>", not: "<p><b>Hata avı:</b> 3. ölçü <i>Fa–Mi(koma)–Fa–Mi(koma)–Fa</i>: Mi'yi fazla pes basma, bir koma yeter. Yalnız bu beş notayı demle 5 kez; ses demin üstünde \"vurusuz\" oturunca ölçüyü yerine koy.</p>", notTuru: "ipucu" },
        { tur: "eser", baslik: "Söz bölümünün tamamı", abc: HAVADA_SOZ, notaBaslik: "Havada Bulut Yok — söz bölümü", dem: "D5", gecme: 65, takip: true, html: "<p>Sözler sırasıyla: <i>Havada bulut yok bu ne dumandır / Mahlede ölü yok bu ne figandır / Şu Yemen illeri ne de yamandır / Adı Yemen'dir gülü çemendir / Giden gelmiyor acep nedendir / Burası Muş'tur yolu yokuştur / Giden gelmiyor acep ne iştir.</i> Söz satırlarını notaya yazmadık; cümleleri kulağınla eşleştir. Tepe Do6'ya dudağı sıkarak değil, nefesi hızlandırarak çık. Bugün \"Notayla ilerle\" yeter; tempoda çalış ünite sınavında.</p>", not: "<p>Uzun parçayı cümle cümle öğrenmek nota nota ezberden daha sağlamdır (Chaffin &amp; Imreh 2002). Her sözlü satır bir cümle, her cümle bir nefes.</p>" },
        { tur: "ritim", baslik: "Serpiştirme: 7/8", desen: "1 1 1.5 | .5 .5 .5 .5 1.5", olcu: "7/8", bpm: 80, nota: "A5", html: "<p>Curcunadan sonra 2+2+3. Sayımı değiştir, dizine vur, çal. Zor gelir ama kalıcıdır.</p>" },
        { tur: "kontrol", maddeler: ["Curcunayı 3+2+2+3 sayarken ilk uzunu kısaltmıyorum", "Çekirdek cümleyi demle %100 hızda temiz çaldım", "Saz girişindeki Si5 ve Mi koma bemolü yerinde", "Söz bölümünü notayla ilerleyerek baştan sona bitirdim"] },
      ],
      kapanis: "<p>İlk gerçek türkün elinde. Yarın 12/8 ve Iğdır'dan Ben Bir Avuç Darı Olup. Akşam Havada Bulut Yok'un bir iyi kaydını bul, dinle; nefes yerlerini say.</p>",
    },
    {
      id: "u10d4",
      baslik: "12/8 ve Ben Bir Avuç Darı Olup",
      ozet: "6/8'in ikilenmişi: 3+3+3+3. Iğdır türküsünü Mi koma kararına aktarılmış hâliyle iki cümle hâlinde öğren.",
      sure: 22,
      hedefler: ["12/8'i dört büyük vuruş olarak saymak", "Noktalı sekizlik–onaltılık \"sekme\"sini temiz çalmak", "Türkünün A ve B cümlelerini demle %100 hızda çalmak"],
      giris: "<p><b>Ben Bir Avuç Darı Olup</b>: Iğdır; kaynak kişi Abdurrahman Yörüktümen; derleyen ve notaya alan Mustafa Hoşsu; <b>TRT THM Rep. No. 66</b>. Segâh dizisinde, Si kararlı; usul 12/8 (3+3+3+3). Iğdır'da türkülere Azerbaycan'daki gibi \"mahnı\" denir ve balaban yörenin çalgısıdır. Ezgi <b>bu metot için dörtlü yukarı aktarıldı</b>: A cümlesi Sol yerine <b>Do</b>'dan Sol'e çıkar, B cümlesi <b>Mi koma bemolü</b>nde (Mi parmağı + gevşek dudak, dünkü gibi) karar verir. Fa yerine Si♭5 (baş parmak yarım).</p>",
      adimlar: [
        { tur: "metin", baslik: "12/8: dört büyük vuruş", html: "<p>Ünite 4'te 6/8'i iki büyük vuruş olarak hissettin. 12/8 onun ikilenmişidir: <b>dört büyük vuruş</b>, her biri üç sekizlik. Say: \"<b>bir</b>-iki-üç, <b>iki</b>-iki-üç, <b>üç</b>-iki-üç, <b>dört</b>-iki-üç\". Dörtlük cinsinden bir vuruş = <b>1.5</b>.</p><p>Bu türkünün tipik figürü noktalı sekizlik + onaltılık: \"sek-me\". Desende <b>.75 .25</b>.</p>" },
        { tur: "ritim", baslik: "Ritim adımı: 1.5 1.5 1.5 1.5", desen: "1.5 1.5 1.5 1.5", olcu: "12/8", bpm: 108, nota: "C5", html: "<p>Dört uzun vuruş, tek nota Do. Nefesle başlat. Hızlı gibi görünür ama vuruşlar uzundur; sakin say.</p>" },
        { tur: "ritim", baslik: "Sekme figürü", desen: ".75 .25 .5 .5 1 .75 .25 .5 1 -.5", olcu: "12/8", bpm: 100, nota: "C5", html: "<p>Türkünün ilk ölçüsünün ritmi, biraz yavaş. Noktalı notayı rahat tut, onaltılığı \"sekerek\" nefesle at, hemen sonraki notaya bağlan. Önce düz sekizlik gibi düşün, sonra noktalı.</p>", not: "<p>Noktalı sekizlik + onaltılık, Doğu Anadolu'nun tipik \"sekme\"sidir (03 notu, Pelikoğlu &amp; Acay 2024). Önce düz, sonra noktalı çal.</p>" },
        { tur: "dinle", baslik: "A cümlesini dinle", abc: DARI_A, notaBaslik: "Ben Bir Avuç Darı Olup — A cümlesi (aktarılmış)", dem: "C5", html: "<p>Do'dan Sol'e çıkan Rast beşlisi: <i>Do–Re–Mi(koma)–Fa–Sol</i>. Mi'yi Ünite 7'deki Si² gibi dudakla hafif pes al; yeni karar Do. Söz satırı notanın altında. Üç kez dinle, söyle.</p>" },
        { tur: "eser", baslik: "A cümlesini çal", abc: DARI_A, notaBaslik: "Ben Bir Avuç Darı Olup — A", dem: "C5", gecme: 70, html: "<p>Dem Do üstünde. Sekmeyi nefesle at; Sol'de (ölçü ortası) dur, Sol–La–Fa dönüşünü hafif çal, ölçü sonundaki este nefes al.</p>" + UC_TEMPO, not: "<p><b>Hata avı:</b> <i>Sol&gt;La–Fa</i> sekmesinde La çoğu zaman geç kalır. Yalnız bu üç notayı 5 kez; sonra ölçüyü yerine koy.</p>", notTuru: "ipucu" },
        { tur: "dinle", baslik: "B cümlesini dinle", abc: DARI_B, notaBaslik: "Ben Bir Avuç Darı Olup — B cümlesi (aktarılmış)", dem: "E5@-50", html: "<p>La'dan inerek <b>Mi koma bemolü</b>nde karar. Mi'yi \"Fa'ya yakın bir Mi\" diye duy: tam pes değil, bir koma. Bu cümlede dem Mi koma bemolü; La'daki tepe Si♭5 baş parmak yarım.</p>" },
        { tur: "eser", baslik: "B cümlesini çal", abc: DARI_B, notaBaslik: "Ben Bir Avuç Darı Olup — B", dem: "E5@-50", gecme: 70, html: "<p>Dem açık. İkinci ölçüdeki küçük La notası çarpmadır: Ünite 8'deki gibi, vuruştan önce hafifçe. Son Mi koma bemolünü demle \"vurusuz\" bitir.</p>" + UC_TEMPO },
        { tur: "eser", baslik: "Tamamı: saz + söz", abc: DARI_TAM, notaBaslik: "Ben Bir Avuç Darı Olup — tamamı", dem: "C5", gecme: 65, html: "<p>İlk iki ölçü saz, sonra tekrarlı söz bölümü (TRT notasında saz ve söz aynı ezgi). A cümlesinde dem Do, B'de Mi koma hissi; uygulamanın demi Do'da kalır, sorun değil: Mi koma bemolü Do'nun üçlüsüdür, iki ses birbirini tutar.</p>" + UC_TEMPO },
        { tur: "uzun-ses", baslik: "Serpiştirme + kör sınav: Mi koma bemolü", nota: "E5@-50", saniye: 10, tekrar: 2, dem: "A4", tolerans: 25, html: "<p>Gösterge kapalı; dem bütün delikler kapalı La. Mi koma bemolünü 10 saniye tut, önce sen söyle: pes mi, tiz mi? Türkünün kararı bu perde; iki türküde de var.</p>" },
        { tur: "kontrol", maddeler: ["12/8'i dört büyük vuruş olarak sayıyorum, sekizlik saymıyorum", "Sekme figüründe onaltılık geç kalmıyor", "A ve B cümlelerini demle %100 hızda temiz çaldım", "Mi koma bemolü kör sınavda bantta"] },
      ],
      kapanis: "<p>İki gerçek türkü ve üç özgün ezgi: repertuvarın beşe çıktı. Yarın ünite sınavı: kör uzun ses, aksak ritimler, iki türkü tempoda, kayıt.</p>",
    },
    {
      id: "u10d5",
      baslik: "Ünite sınavı: usuller ve türküler",
      ozet: "Kör uzun ses, dört aksak usul, iki türkü tempoda; model kaydı dinle, kendini kaydet.",
      sure: 25,
      hedefler: ["Kör sınavda Mi koma bemolü ve Si♭5'i bantta tutmak", "Dört usulün ritim adımlarını 70 üstü geçmek", "Havada Bulut Yok ve Ben Bir Avuç Darı Olup'u tempoda 65 puan üstü çalmak", "Kaydını modelle kıyaslayıp üç maddeyi dürüstçe işaretlemek"],
      giris: "<p>Bugün yeni bir şey yok; her şey karışık geliyor. Sınavın anlamı şu: bir beceri ancak <b>gösterge kapalıyken ve karışık sırada</b> çıkıyorsa senindir. Isınma: dem üstünde üç uzun ses, sonra başla.</p>",
      adimlar: [
        { tur: "uzun-ses", baslik: "Kör: Mi koma bemolü", nota: "E5@-50", saniye: 12, tekrar: 2, dem: "A4", tolerans: 25, html: "<p>Gösterge kapalı. 12 saniye, iki kez. Önce tahmin et, sonra sonucu gör.</p>" },
        { tur: "uzun-ses", baslik: "Kör: Si♭5", nota: "Bb5", saniye: 8, tekrar: 2, dem: "A4", tolerans: 30, html: "<p>Baş parmak yarım. Ben Bir Avuç'un tepe sesi. Tiz kaçma eğilimi burada en yüksek: kamışı az sık, nefesi hızlandır.</p>" },
        { tur: "ritim", baslik: "Karışık usuller", desen: "1 1.5 | 1 1 1.5 | 1 1 1 1.5 | 1.5 1 1 1.5", olcu: "10/8", bpm: 80, nota: "D5", html: "<p>5/8, 7/8, 9/8, 10/8 art arda; ölçüler eşit değil, sayımı her ölçüde değiştir. Nefesle başlat. Bu bir \"karıştırma\" sınavıdır: bloklu çalışmada çıkmayan hata burada çıkar.</p>" },
        { tur: "ritim", baslik: "12/8 sekme", desen: ".75 .25 .5 .5 1 .75 .25 .5 1 -.5", olcu: "12/8", bpm: 108, nota: "C5", html: "<p>Türkünün hızında. Onaltılık geç kalırsa puan düşer.</p>" },
        { tur: "eser", baslik: "Havada Bulut Yok — tamamı tempoda", abc: HAVADA_TAM, notaBaslik: "Havada Bulut Yok (Re karar, aktarılmış)", dem: "D5", gecme: 65, html: "<p>Saz girişi tekrarlı, sonra söz bölümü. Doğrudan \"Tempoda çal\", %100. Takıldığın yeri not et; sınavdan sonra hata avı.</p>" },
        { tur: "eser", baslik: "Ben Bir Avuç Darı Olup — tempoda", abc: DARI_TAM, notaBaslik: "Ben Bir Avuç Darı Olup (TRT 66, aktarılmış)", dem: "C5", gecme: 65, html: "<p>\"Tempoda çal\", %100. Sekmeler nefesle, karar Mi koma bemolü demle.</p>" },
        { tur: "dinle", baslik: "Model: ünite ezgileri", abc: TOPAL_HALAY, notaBaslik: "Topal Halay (model)", dem: "A4", html: "<p>Kaydetmeden önce modeli dinle. Topal Halay'ı burada, iki türküyü yukarıdaki adımların \"Dinle\" düğmesinden. Dikkat ettiğin üç şey: ses rengi, perde (koma), zaman (uzun vuruşlar).</p>" },
        { tur: "kayit", baslik: "Kaydet ve kıyasla", etiket: "Ünite 10 — türküler", kontrol: ["Ses: uzun notalar titremesiz, cümle sonları temiz bitiyor", "Perde: Mi koma bemolü ve Si♭5 modeldeki gibi; dem üstünde vuru yok", "Zaman: aksak ölçülerde uzun vuruş kısalmıyor, sekme geç kalmıyor"], html: "<p>İki türküden birini ya da ikisini kaydet. Çalarken yargılama; sesi odanın karşı duvarına gönder. Sonra kaydı ve modeli yan yana dinle, üç maddeyi dürüstçe işaretle.</p>", not: "<p>Öz-değerlendirme ancak model kaydıyla birleşince işe yarıyor (Hewitt 2001). Çalarken verdiğin puan ile kaydı dinledikten sonra verdiğin puan farklı çıkar (Silveira &amp; Gavin 2015); ikincisine güven.</p>" },
        { tur: "kontrol", maddeler: ["Kör uzun seslerin ikisinde de tahminim sonuçla uyuştu", "Karışık usul adımını 70 üstü geçtim", "İki türküyü de tempoda 65 üstü çaldım", "Kaydımda üç maddeden en az ikisi işaretli", "Bu ünite üç farklı günde geçildi (ustalık kuralı)"] },
      ],
      kapanis: "<p>Ünite 10 bitti. Dört aksak usul, iki gerçek türkü, üç özgün ezgi. Bir sonraki ünite başka bir dünya: dem tutmak, nefesi çevirmek ve ölçüsüz çalmak, yani açış. Aksak ezgileri üç hafta boyunca haftada iki kez geri getir; taşıma kuralı.</p>",
    },
  ],
};
