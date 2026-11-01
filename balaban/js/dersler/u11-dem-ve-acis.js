// Ünite 11 — Dem, devirli nefes, açış ve bundan sonrası (≈36–52. hafta)
// Açış örnekleri bu metot için yazıldı. Türkü ABC'leri Ünite 10'daki aktarılmış hâlleriyle aynıdır.

const TOPAL_HALAY = `X:1
M:5/8
L:1/8
Q:1/4=80
K:C
A _/B c3 | d e d3 | e d c3 | _/B2 A3 |
e2 d3 | c2 _/B3 | A _/B c2 _/B | A3- A2 |]`;

const HAVADA_SOZ = `X:2
M:10/8
L:1/8
Q:1/4=80
K:C
z2 f g2 a2 a3 | a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 |
a3- a2 a2 g3 | z2 c' c'2 g2 aga | g2 f g2 g2 a3 | a3- a2 a2 g3 |
z2 c' c'2 g2 aga | g2 a ag gf a2 g | gf g gf f_/e g2 f |
f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |
z2 a ag gf a2 g | ag a ag gf a2 g | f_/e f f_/e _/ed f2 _/e | _/ed f f_/e _/ed d3 | d3- d2 d2 d3 |]`;

const DARI_TAM = `X:3
M:12/8
L:1/8
Q:1/4=108
K:C
c>d_/e f g2 g>af g2 z | c>d_/e f g2 g>af g2 z |
|: c>d_/e f g2 g>af g2 z | c>d_/e f g2 g>af g2 z |
w:Ben bir a-vuç da-rı o * lup Ye-re ser-pi-le cek * ol-sam
a>_ba a>ag g>ag g>f_/e | f>gf {a}g>gf f>f_/e _/e2 z :|
w:Goy be-ni ni * ce ney * ler sin ba-lam Sen be-ni ni * ce ney * ler sin`;

// Açış örneği: serbest ritim (M:none), Hüseynî rengi, karar La → güçlü Mi → karar La. Bu metot için yazıldı.
const ACIS_HUSEYNI = `X:4
M:none
L:1/8
Q:1/4=60
K:C
A6 _/B2 A2 z2 | A2 _/B2 c2 _/B2 A6 z2 | A2 _/B2 c2 d2 e6 z2 | e2 f2 e2 d2 e4 d2 c2 d6 z2 | e2 d2 c2 _/B2 c2 _/B2 A6 z2 | _/B2 A2 A8 |]`;

// Açış iskeleti: üç motif, her biri bir nefes.
const ACIS_ISKELET = `X:5
M:none
L:1/8
Q:1/4=60
K:C
A4 _/B2 c2 _/B2 A6 z4 | c2 d2 e8 z4 | e2 d2 c2 _/B2 A8 |]`;

export default {
  id: "u11",
  baslik: "Dem, nefes ve açış",
  ozet: "Dem tutmak, devirli nefes (isteğe bağlı), ölçüsüz açış, repertuvar kaydı ve ilk ayla kıyas; platolar ve bundan sonrası.",
  dersler: [
    {
      id: "u11d1",
      baslik: "Dem tutmak",
      ozet: "Karar sesini uzun uzun üflemek: balabanın en eski görevi. Demkeş ve solist rollerini sırayla yaşa.",
      sure: 20,
      hedefler: ["Karar La'yı 20 saniye, ±15 cent bantta, titremesiz tutmak", "Dem üstünde bir ezgiyi perde kaymadan çalmak", "Demkeş rolünde 2 dakika boyunca sessizliği 2 saniyenin altında tutmak"],
      giris: "<p>Balaban ve mey geleneğinde ikinci çalgı ezgi çalmaz; <b>karar sesini uzun uzun üfler</b>. Buna <b>dem</b>, çalana <b>demkeş</b> denir. Azerbaycan orkestrasında solo balaban, dem balaban ve bas balaban ayrı ayrı vardır. Dem tutmak \"kolay iş\" değildir: en sabit nefes, en temiz perde demkeşten beklenir. Bu derste iki rolü de yaşayacaksın.</p>",
      adimlar: [
        { tur: "cizim", cizim: "dem", ust: "Melodi ve dem", html: "<p>Üstte ezgi, altta tek bir uzun ses: karar. İyi dem, ezginin altında \"yer\" gibi durur; ne öne çıkar ne kaybolur. Perde oturduğunda ezgiyle dem arasında <b>vuru</b> (titreşim) kalmaz. Kulağın bugüne kadar demle bunu öğrendi; şimdi demi sen tutacaksın.</p>" },
        { tur: "uzun-ses", baslik: "Karar La, 15 saniye", nota: "A4", saniye: 15, tekrar: 2, dem: true, html: "<p>Bütün delikler kapalı. Uygulamanın demi bir oktav pesten çalıyor; sen üstüne oturt. Nefesi karnın genişleyerek al, üflerken karın kasları havayı eşit versin; omuzlar sabit. Sesi odanın karşı duvarına gönder, dudağını düşünme.</p>" },
        { tur: "uzun-ses", baslik: "Kör sınav: 20 saniye", nota: "A4", saniye: 20, tekrar: 1, tolerans: 15, dem: true, html: "<p>Altıncı ayın ölçütü: 20 saniye, ±15 cent, titremesiz. Gösterge kapalı. Bitince pes mi tiz mi tam mı, önce sen söyle. Bu aynı zamanda devirli nefes dersinin ön koşulu.</p>", not: "<p>Araştırma protokolü: 1. ay ≥ 8 sn, 3. ay ≥ 12 sn, 6. ay ≥ 20 sn uzun ses; sapma giderek daralır. Nefesli acemiler en çok <b>tiz</b> yönde kayar: kamışı az sık.</p>" },
        { tur: "eser", baslik: "Solist rolü: dem üstünde çal", abc: TOPAL_HALAY, notaBaslik: "Topal Halay — dem açık", dem: "A4", gecme: 70, html: "<p>Dem düğmesini aç, \"Tempoda çal\". Demkeş uygulama, solist sensin. Cümle sonlarında La'ya indiğinde demle birleş; vuru kalmayana kadar sesi düzelt, sonra bırak. Hız: %60 → %100 → %80.</p>" },
        { tur: "sureli", baslik: "Demkeş rolü: 2 dakika", dakika: 2, html: "<p>Şimdi roller değişiyor: demkeş sensin. Burada sayaç yalnızca <b>sen ses çıkarırken</b> ilerler. Karar La'yı tut; nefesin bitince hızla al ve hemen geri gir. Demkeşin bütün işi sessizliği kısa tutmaktır. Hedef: boşluklar 2 saniyeden kısa, 2 dakika dolsun. Sayaç durduğunda nerede nefes aldığını fark et.</p>", not: "<p>Devirli nefes bilmeyen demkeş, nefesi cümle sonlarında, solistin uzun notasında alır. Bu da bir sanattır; önce bunu öğren.</p>", notTuru: "ipucu" },
        { tur: "uzun-ses", baslik: "Serpiştirme: Re karar demi", nota: "D5", saniye: 12, tekrar: 2, dem: "A4", html: "<p>Havada Bulut Yok'un kararı Re. Dem La üstünde Re'yi tut: dörtlü aralığı, kulağa en \"açık\" oturan aralıklardan biri. Vuru kalmayınca doğru yerdesin. Zor gelir ama kalıcıdır.</p>" },
        { tur: "kontrol", maddeler: ["20 saniyelik kör uzun sesi ±15 cent bantta tuttum", "Topal Halay'ın cümle sonlarında demle vuru kalmıyor", "Demkeş rolünde 2 dakikayı doldurdum, boşluklar kısa", "Dudağımda ağrı yok (yorgunluk olabilir)"] },
      ],
      kapanis: "<p>Dem tutmayı öğrendin; bir gün biriyle çaldığında ilk işin bu olacak. Yarın isteğe bağlı bir ders: devirli nefes. Sağlık uyarılarını okumadan başlama.</p>",
    },
    {
      id: "u11d2",
      baslik: "Devirli nefes (isteğe bağlı)",
      ozet: "Burundan alırken ağızdan vermek. Pipet ve bardakla başlar, tek seste biter. Zorunlu değil.",
      sure: 18,
      hedefler: ["Pipet-bardak basamaklarının dördünü tamamlamak", "Tek seste nefes çevirirken sesi 30 saniye kesmemek", "Uyarı belirtilerini tanıyıp durmayı bilmek"],
      giris: "<p><b>Devirli nefes</b> (nefes çevirme, Azerbaycan'da dövri nəfəs): yanakta depolanan hava dudaklardan itilirken burundan hızla nefes alınır; ses kesilmez. Demkeşin aracıdır; solistler uzun cümlelerde kullanır. <b>Zorunlu değildir</b>: bu metodun hiçbir sınavı devirli nefes istemez. Ön koşul: 20 saniye sabit uzun ses ve 3 dakika kesintisiz çalma. Beşinci aydan önce denenmez; sen bu noktayı geçtin.</p>",
      adimlar: [
        { tur: "metin", baslik: "Önce sağlık", html: "<p>Üflerken göğüs içi basınç artar; yüksek dirençli nefesli çalanlarda göz içi basıncının yükseldiği ve uzun yıllar sonra görme alanı kaybıyla ilişkili olduğu bulunmuş (Schuman ve ark. 2000). Balaban düşük–orta dirençli bir çalgıdır, ama kural aynı:</p><ul><li><b>Glokom, göz tansiyonu</b> ya da ailede glokom öyküsü varsa bu dersi atla; önce göz hekimine sor.</li><li><b>Baş dönmesi, görme bulanıklığı, baş ağrısı</b> olursa hemen dur, otur, bir dakika normal nefes al.</li><li>Uzun ve yüksek basınçlı üflemeden kaçın; yanak deposu küçük, basınç hafif.</li></ul>", not: "<p>Devirli nefesin öğretim sırası üzerine kontrollü çalışma yok; aşağıdaki basamaklar duduk, zurna, didgeridoo ve saksofon öğretmenlerinin ortak geleneğidir.</p>", notTuru: "dikkat" },
        { tur: "uzun-ses", baslik: "Ön koşul: 20 saniye", nota: "A4", saniye: 20, tekrar: 1, tolerans: 15, dem: true, html: "<p>Kör sınav. Bu adım geçilmeden devam etme; geçilmiyorsa dersi bir hafta ertele, Ünite 9'daki uzun ses çalışmasına dön. Bu başarısızlık değil, protokol.</p>" },
        { tur: "cizim", cizim: "devirli-nefes", ust: "Pipet-bardak basamakları", html: "<p><b>1.</b> Bardakta suya pipetle düzenli kabarcık çıkar. <b>2.</b> Yanaklarını şişir; yalnızca yanak havasını sıkarak kabarcığı 2 saniye sürdür. <b>3.</b> Yanak havası giderken burundan hızlı bir nefes al. <b>4.</b> Yanak bitince akciğer havasına geç; kabarcık kesilmesin. Önce susuz, pipetsiz prova et; sonra bardakla.</p><p>Dürüst not: Türk kaynağı (Eren 2020) yanak şişirmeyi yalnız nefes çevirme anına ayırır; düdük geleneğinde hafif yanak deposu her zaman olağandır. İkisi de doğru; biz yanağı yalnızca burada kullanıyoruz.</p>" },
        { tur: "kontrol", baslik: "Çalgısız basamaklar", maddeler: ["Pipetle 10 saniye düzenli, kesintisiz kabarcık çıkardım", "Yanak şişkin, yalnız yanak havasıyla kabarcığı 2 saniye sürdürdüm", "Kabarcık sürerken burundan hızlı nefes aldım (en az 5 kez)", "Yanak → akciğer geçişinde kabarcık 5 denemenin 3'ünde kesilmedi"], html: "<p>Her maddeyi gerçekten yapınca işaretle. Bu adım birkaç gün sürebilir; aceleye gerek yok. Günde 3 dakika yeter.</p>" },
        { tur: "metin", baslik: "Yalnız kamış, sonra tek ses", html: "<p>Kamışı gövdesiz al; vızıltı çıkar, yanağı şişir, burundan al, vızıltı kesilmesin. Ses düşse, çatlasa önemli değil; <b>kesilmesin</b>. Üç gün bunu yap.</p><p>Sonra çalgıyla tek ses: bütün delikler kapalı La. Yanak deposu küçükken geçiş hızlıdır; büyük depo sesi batırır. Geçiş anında dudak sıkılığı değişmesin: sesi karşı duvara göndermeye devam et.</p>" },
        { tur: "sureli", baslik: "Tek seste devirli nefes: 1 dakika", dakika: 1, html: "<p>La'yı tut; nefes çevirirken ses zayıflayabilir ama kesilmesin. Sayaç yalnızca ses duyarken ilerler: kesinti olursa durur, sen devam edince sürer. İlk hedef 30 saniye kesintisiz; dakika sayaç <b>hiç durmadan</b> dolarsa devirli nefes seninle. Bu bir sınav değil, ölçü: ne kadar sürdüğünü gör, yarın bir saniye uzat.</p>" },
        { tur: "eser", baslik: "Serpiştirme: dudak dinlensin", abc: TOPAL_HALAY, notaBaslik: "Topal Halay", dem: "A4", gecme: 70, html: "<p>Nefes çalışması dudağı yorar; araya tanıdık bir ezgi. \"Tempoda çal\", %80. Nefes çevirmeye çalışma, normal nefes; sadece ezgi.</p>" },
        { tur: "kontrol", maddeler: ["Sağlık uyarılarını okudum; glokom/göz tansiyonu yok ya da hekime sordum", "Çalışma sırasında baş dönmesi, bulanıklık, baş ağrısı olmadı (olduysa durdum)", "Tek seste en az 30 saniye kesintisiz ses", "Bu becerinin zorunlu olmadığını biliyorum; olmazsa dem dersindeki \"cümle sonunda nefes\" yolunu kullanacağım"] },
      ],
      kapanis: "<p>Devirli nefes haftalar ister; bugün sadece kapıyı açtın. Her gün 3 dakika, zorlamadan. Yarın başka bir özgürlük: ölçüsüz çalmak.</p>",
    },
    {
      id: "u11d3",
      baslik: "Açış: ölçüsüz çalmak",
      ozet: "Taksim ve muğam girişine benzer serbest ritimli doğaçlama. Seyir: karar → güçlü → karar.",
      sure: 20,
      hedefler: ["Üç motifli açış iskeletini kendi nefesinle çalmak", "Karar La'dan başlayıp güçlü Mi'de durup karara inmek", "2 dakikalık serbest açışta her cümleyi bir nefeste bitirmek"],
      giris: "<p>Türkiye'de <b>açış</b>, Azerbaycan'da muğamın giriş bölümü, Osmanlı geleneğinde <b>taksim</b>: ölçü yok, ezgi önceden yazılmamış; icracı makamın yolunu (<b>seyir</b>) kısa cümlelerle gezer. Yemen ağıtları ve Sarı Gelin'in uzun hava biçimi de bu dünyadandır. Korkma: doğaçlama \"aklına geleni çalmak\" değil, bildiğin üç şeyi sırayla yapmaktır.</p>",
      adimlar: [
        { tur: "metin", baslik: "Seyir: üç durak", html: "<p>Hüseynî/Uşşak'ta (karar La) seyrin üç durağı var:</p><ol><li><b>Karar</b> (La): başla, etrafında dolan: La–Si(koma)–Do–Si–La.</li><li><b>Güçlü</b> (Mi): çık, orada <b>dur</b>; uzun ses, vibrato, belki bir çarpma.</li><li><b>Karar</b>: in; son La'ya glissando ile gir, demle birleş.</li></ol><p>Her cümle <b>bir nefes</b>: nefes bitmeden cümle biter. Motif kısa olsun: üç–beş nota. Aynı motifi bir kez tekrar etmek doğaçlamanın en eski hilesidir.</p>" },
        { tur: "dinle", baslik: "Örnek açışı dinle", abc: ACIS_HUSEYNI, notaBaslik: "Açış örneği (Hüseynî) — bu metot için yazıldı", dem: "A4", html: "<p>Bu açış <b>bu metot için yazıldı</b>; Doğu Anadolu ve Azerbaycan girişlerinin üslubunda. Ölçü çizgileri burada <b>nefes</b> demektir, vuruş değil. Dinlerken üç durağı say: karar, güçlü, karar. Sonra dinleme listesindeki ustalarla kıyasla: Kamil Cəlilov'un muğamında tek nefeste perde perde tırmanış, mayəye (karara) dönüş.</p>", not: "<p>Nota burada sadece iskelettir; mikrotonal süslemeler kulakla öğrenilir (01 notu). Yazılanı birebir çalmak hedef değil.</p>" },
        { tur: "eser", baslik: "İskeleti çal", abc: ACIS_ISKELET, notaBaslik: "Açış iskeleti: üç motif, üç nefes", dem: "A4", gecme: 60, takip: true, birlikte: false, html: "<p>Üç motif: karar etrafında dolan; güçlüye çık ve dur; karara in. \"Notayla ilerle\" ile kendi hızında; tempo yok. Her motiften sonra gerçekten nefes al. Son La'ya Si koma bemolünden kaydırarak gir (Ünite 9 glissando).</p>" },
        { tur: "metin", baslik: "Kendi cümlelerin", html: "<p>Şimdi iskeleti kendi notalarınla doldur. Kurallar:</p><ul><li>Bir motif seç (örn. La–Si–Do–Si–La), <b>iki kez</b> çal, ikincisinde bir notayı uzat.</li><li>Mi'ye çıkarken her basamakta dur (Do… Re… Mi).</li><li>Mi'de en az 4 saniye kal; vibrato alt dudakla.</li><li>İnişte Re–Do–Si–La; son La'yı demle bitir.</li></ul><p>Dinamik: karar hafif (p), güçlü dolu (f), karar yine hafif. Bu bir \"yay\"dır.</p>" },
        { tur: "sureli", baslik: "Serbest açış: 2 dakika", dakika: 2, html: "<p><a href=\"#akort\">Dem ve akort</a> ekranındaki demi bir kulağında hayal et ya da gerçekten aç; burada sayaç yalnızca sen çalarken ilerler. İki dakika boyunca karar → güçlü → karar yayını en az <b>üç kez</b> çiz. Her yayda bir şeyi değiştir: motif, uzun notanın yeri, iniş yolu. Hata yok; yalnızca cümle sonunda nefes.</p>", not: "<p>Çalarken yargılama (dış odak); kayıt dersinde değerlendirirsin. Doğaçlama ve kulak eğitimi nota okumayla en çok ilişkili iki beceridir (Mishra 2014): burada kaybedilen vakit yok.</p>" },
        { tur: "sureli", baslik: "Serpiştirme: Hicaz'da açış", dakika: 2, html: "<p>Aynı yay, başka renk: Hicaz (La–Si♭–Do♯–Re–Mi). Güçlü yine Mi, ama yol Do♯'den geçer. Yarım delikleri serbest ritimde basmak ölçülü ritimden kolaydır; nefesin izin verdiği kadar dur. Zor gelir ama kalıcıdır: iki rengi art arda çalmak her ikisini de sabitler.</p>" },
        { tur: "kayit", baslik: "İlk açışını kaydet", etiket: "İlk açışım (Hüseynî)", kontrol: ["Karar La'dan başladım, karar La'da bitirdim", "Güçlü Mi'de en az bir kez uzun durdum", "Her cümle bir nefes: nefes bitmeden cümle bitti"], html: "<p>Bir dakikalık Hüseynî açışı kaydet. Dinle; üç maddeyi dürüstçe işaretle. Beğenmediysen bir daha kaydet; ama ikinci kaydı \"daha iyi çalmak\" için değil, <b>tek bir şeyi</b> değiştirmek için yap.</p>" },
        { tur: "kontrol", maddeler: ["Açış iskeletini üç nefeste, tempo olmadan çaldım", "Serbest açışta yayı üç kez çizdim", "Hicaz açışında Do♯ yarım delik ritimsiz de yerinde", "Kayıtta üç maddeden en az ikisi işaretli"] },
      ],
      kapanis: "<p>Artık ölçüsüz de çalabiliyorsun. Bundan sonra her ısınmayı 30 saniyelik küçük bir açışla bitir; makamı her gün değiştir. Yarın repertuvar kaydı ve ilk ayınla yüzleşme.</p>",
    },
    {
      id: "u11d4",
      baslik: "Repertuvar kaydı ve ilk ayla kıyas",
      ozet: "Repertuvarını kayıt kalitesinde çal, sonra ilk haftanın kaydını yanına koy.",
      sure: 25,
      hedefler: ["İki türküyü ve bir özgün ezgiyi tek oturumda kaydetmek", "Kaydı modelle kıyaslayıp ses/perde/zaman maddelerini işaretlemek", "İlk ay kaydıyla farkı somut üç cümleyle yazmak"],
      giris: "<p>Hocası olmayanın en güçlü hocası kendi kaydıdır; ama yalnızca <b>modelle yan yana</b> dinlenirse (Hewitt 2001). Bugün repertuvar kaydı: ısın, çal, kaydet, kıyasla. Sonra <a href=\"#araclar-kayit\">Kendini kaydet</a> ekranında ilk haftanın kaydını bul. Bu ritüel bırakmayı önleyen en somut ilerleme kanıtıdır.</p>",
      adimlar: [
        { tur: "uzun-ses", baslik: "Isınma: dem üstünde", nota: "A4", saniye: 12, tekrar: 2, dem: true, html: "<p>Kalibrasyon: iki uzun La, demle, vurusuz. Isınma sakatlık önlemez; sesi ve kulağı bugüne ayarlar.</p>" },
        { tur: "eser", baslik: "Topal Halay — kayıt provası", abc: TOPAL_HALAY, notaBaslik: "Topal Halay (5/8)", dem: "A4", gecme: 75, html: "<p>%80'de bir kez, %100'de bir kez. Geçme çıtası bugün 75: kayıt kalitesi.</p>" },
        { tur: "eser", baslik: "Havada Bulut Yok — söz bölümü", abc: HAVADA_SOZ, notaBaslik: "Havada Bulut Yok (Re karar)", dem: "D5", gecme: 70, html: "<p>\"Tempoda çal\", %100. Takıldığın yeri not et: kayıttan önce yalnız o iki notayı 5 kez.</p>", not: "<p><b>Hata avı:</b> Do6 tepesinde ses kısılıyorsa sorun dudak değil nefes hızıdır. Sol–Do6–Do6 üç notasını ayrı çalış.</p>", notTuru: "ipucu" },
        { tur: "eser", baslik: "Ben Bir Avuç Darı Olup — tamamı", abc: DARI_TAM, notaBaslik: "Ben Bir Avuç Darı Olup (TRT 66)", dem: "C5", gecme: 70, html: "<p>\"Tempoda çal\", %100. Sekmeler nefesle; karar Mi koma bemolü.</p>" },
        { tur: "kayit", baslik: "Repertuvar kaydı", etiket: "Repertuvar — 1 (ay 9–12)", kontrol: ["Ses: üç parçada da uzun notalar titremesiz, cümle sonları temiz", "Perde: koma perdeleri ve Si♭5/Do6 modeldeki yerde; demle vuru yok", "Zaman: aksak vuruşlar ve sekmeler modelle örtüşüyor"], html: "<p>Üç parçayı art arda, tek kayıtta çal: Topal Halay, Havada Bulut Yok (söz bölümü), Ben Bir Avuç Darı Olup. Çalarken yargılama; sesi karşı duvara gönder. Hata olursa durma, devam et: kayıt bir konser provasıdır. Sonra model ile yan yana dinle, işaretle.</p>" },
        { tur: "metin", baslik: "İlk ayın kaydını aç", html: "<p><a href=\"#araclar-kayit\">Kendini kaydet</a> ekranında en eski kaydı bul (Ünite 2'nin ilk kaydı). Önce onu, sonra bugünkünü dinle. Üç soruya cevap yaz, telefonuna not olarak:</p><ol><li>Uzun ses o zaman kaç saniyeydi, şimdi kaç?</li><li>Ses rengi: o zaman \"ince/cılız/kararsız\" dediğin şey şimdi ne?</li><li>O zaman çalamadığın hangi şeyi bugün düşünmeden çaldın?</li></ol><p>Bu kıyas gurur için değil, <b>kanıt</b> için: ilerleme günlük hissedilmez, aylık görülür.</p>", not: "<p>Kendi başarılı performansını izlemek (öz-modelleme) öğrenmeyi destekler (Dowrick 1999). Dört haftada bir eski kaydı dinlemek, protokolün bırakma önleyici maddesidir.</p>" },
        { tur: "sureli", baslik: "Serpiştirme: 1 dakika açış", dakika: 1, html: "<p>Kaydın gerginliğini at: bir dakika Hüseynî açış, dem hayalde. Karar → güçlü → karar. Yargılama yok.</p>" },
        { tur: "kontrol", maddeler: ["Üç parçayı tek kayıtta, durmadan çaldım", "Kayıt kontrolünde üç maddeden en az ikisi işaretli", "İlk ay kaydını dinledim ve üç cevabı yazdım", "Kayıt tarihini günlüğüme not ettim; dört hafta sonra tekrar"] },
      ],
      kapanis: "<p>Elinde kanıt var: ilk ay ve bugün. Yarın son ders: ünite sınavı, sonra platolar ve bundan sonrası.</p>",
    },
    {
      id: "u11d5",
      baslik: "Ünite sınavı, platolar ve yol",
      ozet: "Kör uzun ses, curcuna, türkü tempoda, açış; model ve kayıt. Sonra: plato araç kutusu, dinleme listesi, ustalar ve nota kaynakları.",
      sure: 30,
      hedefler: ["Kör sınavda La ve Mi koma bemolünü bantta tutmak", "Ben Bir Avuç Darı Olup'u tempoda 70 puan üstü çalmak", "Plato araç kutusunun beş maddesini bilmek", "Bir yıllık yol planını yazmak"],
      giris: "<p>Metodun son sınavı. Önce çal, sonra konuşalım: bundan sonra ne olacak?</p>",
      adimlar: [
        { tur: "uzun-ses", baslik: "Kör: karar La, 20 saniye", nota: "A4", saniye: 20, tekrar: 1, tolerans: 15, dem: true, html: "<p>Gösterge kapalı; önce tahmin, sonra sonuç.</p>" },
        { tur: "uzun-ses", baslik: "Kör: Mi koma bemolü", nota: "E5@-50", saniye: 12, tekrar: 2, dem: "A4", tolerans: 25, html: "<p>Dem La üstünde. İki türkünün ortak perdesi.</p>" },
        { tur: "ritim", baslik: "Curcuna ve 12/8", desen: "1.5 1 1 1.5 | 1.5 1 1 1.5 | 1.5 1.5 1.5 1.5", olcu: "10/8", bpm: 84, nota: "D5", html: "<p>İki ölçü curcuna, sonra 12/8'in dört büyük vuruşu. Sayımı değiştir, nefesle başlat.</p>" },
        { tur: "eser", baslik: "Ben Bir Avuç Darı Olup — tempoda", abc: DARI_TAM, notaBaslik: "Ben Bir Avuç Darı Olup (TRT 66, aktarılmış)", dem: "C5", gecme: 70, html: "<p>\"Tempoda çal\", %100, tek geçiş. Hata olursa durma.</p>" },
        { tur: "sureli", baslik: "Açış: 2 dakika", dakika: 2, html: "<p>Hüseynî ya da Hicaz, sen seç. Karar → güçlü → karar, en az iki yay. Sayaç yalnız sen çalarken ilerler.</p>" },
        { tur: "dinle", baslik: "Model", abc: ACIS_HUSEYNI, notaBaslik: "Açış örneği (model)", dem: "A4", html: "<p>Kaydetmeden önce model: açış örneği burada, türkü modeli yukarıdaki adımın \"Dinle\" düğmesinde. Üç şeye kulak ver: ses, perde, zaman.</p>" },
        { tur: "kayit", baslik: "Son kayıt", etiket: "Ünite 11 — sınav", kontrol: ["Ses: uzun notalar titremesiz, açışta güçlü dolu, karar hafif", "Perde: Mi koma bemolü ve karar demle vurusuz", "Zaman: türküde sekmeler yerinde; açışta her cümle bir nefes"], html: "<p>Türkü ve bir dakikalık açışı art arda kaydet. Modelle yan yana dinle, dürüstçe işaretle.</p>" },
        { tur: "metin", baslik: "Plato: takılmak normaldir", html: "<p>Dördüncü ve yedinci aylarda çoğu öğrenci \"ilerlemiyorum\" der; bu, becerinin otomatikleşip gelişmenin durduğu doğal fazdır (Ericsson'un uzmanlık araştırmaları). Bazen de yanılsamadır: anlık performans düşerken kalıcı öğrenme artar. Çıkış, rahatlık düzeyinin <b>biraz</b> üstünde, geri bildirimli hedeflerdir. Araç kutusu:</p><ol><li>Serpiştirmeyi artır: üç parçayı A-B-C-A-B-C.</li><li>Tempoyu bilerek değiştir: %60 → %100 → %80.</li><li>Dört hafta önceki kaydı dinle.</li><li>Bir haftalığına yeni makam ya da yeni ezgi.</li><li>Kayıt dinleyerek hata haritanı yenile.</li></ol>" },
        { tur: "metin", baslik: "Dinleme listesi", html: "<p>Bundan sonra hocan kayıtlardır. Başlıkla ara, haftada bir ustayı derinlemesine dinle:</p><ul><li><b>Djivan Gasparyan</b> — <i>I Will Not Be Sad in This World</i>: dem üstünde ton, dudak vibratosu; en iyi ton modeli.</li><li><b>Alihan Samedov</b> — <i>Balaban: The Land of Fire</i>, <i>Nale</i>: nefesli vibrato, cümle sonunda nefesi bitirme, karara glissando.</li><li><b>Kamil Cəlilov</b> — Voyager Altın Plak'taki muğam: tek nefeste tırmanış, mayəye dönüş.</li><li><b>Şirzad Fətəliyev</b> — Gochag Askarov, <i>Sacred World of Azerbaijani Mugham</i>: eşlik ve dem rolü.</li><li><b>Gevorg Dabaghyan</b> — <i>Music of Armenia Vol. 3: Duduk</i>, <i>Miniatures</i>: temiz entonasyon, az süsleme.</li><li><b>Binali Selman</b> — TRT arşiv kayıtları: Türk mey üslubu, bar/halay nefesi.</li><li><b>Ertan Tekin</b> — <i>Itrî &amp; Bach</i>: makam repertuvarında düdük.</li></ul>" },
        { tur: "metin", baslik: "Gerçek usta ve nota kaynakları", html: "<p>Bu uygulama hocanın yerini tutmaya çalıştı; <b>tutamaz</b>. Sırada gerçek bir ustayla birkaç ders ya da bir atölye: Bakü ve Erivan konservatuvarlarının balaban/düdük hocaları, Türkiye'de mey/balaban dersi veren konservatuvar mezunları; Avrupa'da ADEM (Cenevre) düdük sınıfı. Bir usta, dudağına bir kez bakıp bir yılda bulamadığını söyler.</p><p>Nota için IMSLP'de kamu malı kaynaklar: <b>Komitas</b>'ın <i>La lyre arménienne</i> (1906) ve <i>4 Mélodies et quatre chœurs</i> (1928) derlemeleri; <b>Azerbaycan halk mahnıları</b> kategorisi (<i>274 Azərbaycan xalq mahnıları</i>; ezgi anonim, taramayı olduğu gibi basma, kendin yaz). TRT notalarında kaynak kişi, derleyen ve repertuvar numarasını yaz. Hepsini <b>dörtlü yukarı aktarmayı</b> biliyorsun.</p>", not: "<p>Bellekten \"geleneksel\" ezgi yazma; notasını gördüğünü çal. Bu metot da öyle yaptı: iki türkü notadan, gerisi \"bu metot için yazıldı\".</p>", notTuru: "dikkat" },
        { tur: "kontrol", baslik: "Bir yıllık plan", maddeler: ["Kör uzun seslerin ikisinde de tahminim sonuçla uyuştu", "Türküyü tempoda 70 üstü çaldım; kayıtta en az iki madde işaretli", "Haftalık döngüm yazılı: 5 gün 2 oturum, cumartesi kontrol, pazar dinlenme", "Dinleme listesinden bu hafta bir usta seçtim", "Üç ay içinde bir ustayla ders ya da atölye için somut bir adım attım", "Bir sonraki repertuvar kaydının tarihi günlüğümde"] },
      ],
      kapanis: "<p>Bir yıl önce bir kamışın ucundan ses çıkmıyordu. Bugün aksak usulde türkü çalıyor, dem tutuyor, ölçüsüz açış yapıyorsun. Metot burada bitiyor; yol bitmiyor. Her oturum sonu kamışı kurut, haftada bir gün dinlen, dört haftada bir eski kaydını dinle. Sesi odanın karşı duvarına göndermeye devam et.</p>",
    },
  ],
};
