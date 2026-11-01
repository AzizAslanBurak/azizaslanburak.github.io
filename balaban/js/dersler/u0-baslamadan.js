// Ünite 0 — Başlamadan: çalgıyı tanı, kamışı hazırla, nefes/duruş/tutuş, çalışma planı.
// Bu ünitede henüz nota çalınmaz; denetim öz-değerlendirme listeleriyle yapılır.
export default {
  id: "u0",
  baslik: "Başlamadan",
  ozet: "Çalgını, kamışını ve kendi nefesini tanı; ilk sese hazırlan.",
  dersler: [
    {
      id: "u0d1",
      baslik: "Çalgını tanı",
      ozet: "Parçaların adları, delik numaraları, balaban ile düdük farkı ve çalgının sağlık kontrolü.",
      sure: 10,
      hedefler: [
        "Dört ana parçayı (gövde, kamış, kıskaç, kapak) adıyla göstermek",
        "Delikleri bu metodun kuralıyla (1–8 + Arka) saymak",
        "Çalgında çatlak ve hava kaçağı olmadığını denetlemek",
      ],
      giris: `<p>Hoş geldin. Elinde bir balaban ya da düdük var ve henüz tek ses bile çıkarmadın. Doğru yerdesin: bu ilk ünitede <b>nota çalmak yok</b>. Önce çalgını tanıyacak, kamışını hazırlayacak ve bedenini ilk sese hazırlayacaksın. Bu bir günlük sabır, ilk haftanın yarısını kurtarır.</p>`,
      adimlar: [
        {
          tur: "cizim",
          cizim: "parcalar",
          baslik: "Dört parça, bir ses",
          ust: `<p>Çalgın dört parçadan oluşur:</p>
<ul>
<li><b>Gövde:</b> sert meyve ağacından (erik, kayısı, dut, ceviz) tek parça boru. Önde 8, arkada 1 delik.</li>
<li><b>Kamış:</b> bir ucu yassılaştırılmış, "ördek gagası" biçimli çift kamış. Ses burada doğar.</li>
<li><b>Kıskaç:</b> kamışın ortasına geçen küçük ahşap mandal; akordu ayarlar.</li>
<li><b>Kapak:</b> kamışı çalmadığın zamanlarda koruyan kılıf.</li>
</ul>`,
          html: `<p>Delikleri bu metot boyunca <b>yukarıdan aşağıya 1'den 8'e</b> sayacağız; baş parmağın kapattığı arka deliğe <b>Arka</b> (A) diyeceğiz. Başka kaynaklar başka sayar; sen şemalarımızı bu kurala göre oku.</p>`,
          not: `<p>Türkçe kaynaklarda "ağızlık" sözcüğü bazen kamışı, bazen kapağı anlatır (Eren 2020). Karışıklık olmasın diye biz hep <b>kamış</b> ve <b>kapak</b> diyeceğiz.</p>`,
        },
        {
          tur: "metin",
          baslik: "Balaban mı, düdük mü?",
          html: `<p>Azerbaycan/Türkiye <b>balabanı</b> ile Ermeni <b>düdüğü</b> dışarıdan ikiz gibidir: ikisinde de 8 ön + 1 arka delik. Fark alt deliklerde gizlidir: bütün delikler kapalıyken 8. deliği açınca balaban <b>yarım ses</b>, düdük <b>tam ses</b> yükselir. Üst delikler iki çalgıda da aynı davranır; ilk üç ünitede yalnızca onları kullanacağız.</p>
<p>Hangisine sahip olduğunu bilmek zorunda değilsin: uygulama ileride "Çalgını tanıt" ekranında ölçüp sana söyleyecek. Şimdilik ikisi için de aynı dersler geçerli.</p>`,
          not: `<p>Kaynaklar burada tam uyuşmuyor: Eren'in (2020) balaban tablosunda 8. delik yarım ses verir; düdük kaynakları (duduk.com, Dudukhouse) tam ses verdiğini yazar. İkisi de doğru; farklı çalgılar. Bu yüzden ölçmeden varsaymıyoruz.</p>`,
        },
        {
          tur: "metin",
          baslik: "Çalgını gözden geçir",
          html: `<p>Çalgını eline al ve şunlara bak:</p>
<ul>
<li><b>Gövdede çatlak var mı?</b> Işığa tut; ince bir çizgi bile hava kaçırır. Çatlak varsa yapımcıya dön.</li>
<li><b>Kamış gövdeye uyuyor mu?</b> Dibi yuvaya sıkıca, sallanmadan oturmalı. Her kamış her gövdeye uymaz; çok küçük kamış bozuk akort verir.</li>
<li><b>Kamışın ucu çatlak mı?</b> Yalnızca orta kıvrım çizgisi boyunca küçük bir yarık kabul edilebilir; yanlardan çatlak kamışı at.</li>
<li><b>Yedek kamışın var mı?</b> Kamış çalgının en hassas ve "tükenen" parçasıdır. İkinci bir kamış şart.</li>
</ul>`,
          not: `<p>Hediyelik dükkânlarındaki süs balabanları çoğu zaman akortsuzdur (Dudukhouse satın alma rehberi). Sertlikte kaynaklar ayrışıyor: bazıları yeni başlayana yumuşak, bazıları orta kamış önerir. Önerimiz <b>orta</b>: yumuşak kamış vızıldar, sert kamış dudağını erken yorar.</p>`,
          notTuru: "ipucu",
        },
        {
          tur: "cizim",
          cizim: "bakim",
          baslik: "Hava kaçağı testi",
          ust: `<p>Kamışı takmadan önce gövdeyi dene: bütün delikleri parmaklarının etli kısmıyla kapat, alt ucu avucunla tıka ve üst uçtan hafifçe üfle. <b>Hava hiç geçmemeli.</b> Geçiyorsa ya bir delik tam kapanmıyordur (en sık neden) ya da gövdede çatlak vardır.</p>`,
          html: `<p>Kamış yuvada gevşek duruyorsa dip kısmına birkaç tur <b>mumlu diş ipi</b> ya da ince iplik sar; hem sızdırmaz oturur hem gevşemez.</p>`,
          not: `<p>Bu test balabana özel bir kaynaktan değil, üflemeli çalgıların genel pratiğinden geliyor; balaban için ayrıca belgelenmiş bir yöntem bulamadık.</p>`,
        },
        {
          tur: "metin",
          baslik: "Çalgının bakımı (kısa)",
          html: `<ul>
<li><b>Nem ve ısı:</b> güneşten, kaloriferden, arabanın torpidosundan uzak. Kuru hava ahşabı çatlatır.</li>
<li><b>Yağ:</b> yılda 1–2 kez, kamış takılı değilken, az miktarda tatlı badem ya da ceviz yağı; dış yüzeye ve boruya ince sür, fazlasını sil.</li>
<li><b>Her oturumdan sonra:</b> kamışı çıkar, boruyu kuru bezle sil. Kamışın bakımını bir sonraki derste ayrıntılı göreceksin.</li>
<li><b>Kapak:</b> kamış çalınmıyorken kapağı takılı; uçlar açık kalıp eğrilmesin.</li>
</ul>`,
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          html: `<p>Hepsini dürüstçe işaretleyebiliyorsan ders tamam.</p>`,
          maddeler: [
            "Gövde, kamış, kıskaç ve kapağı gösterebiliyorum",
            "Delikleri yukarıdan aşağıya 1–8 ve Arka diye sayabiliyorum",
            "Gövdede çatlak yok; hava kaçağı testini geçtim (ya da nedenini buldum)",
            "Kamış yuvaya sıkı oturuyor; en az bir yedek kamışım var",
          ],
        },
      ],
      kapanis: `<p>Bugün çalgını tanıdın. Yarın kamışı uyandıracağız: nemlendirme, açıklık ve kıskaç. Çalgıyı kapağı takılı, oda sıcaklığında bırak.</p>`,
    },

    {
      id: "u0d2",
      baslik: "Kamış ve kıskaç",
      ozet: "Kuru kamışı hazırlamak, doğru açıklığı tanımak, kıskaçla ince ayar ve kamış bakımı.",
      sure: 12,
      hedefler: [
        "Kuru kamışı ses verecek duruma getirmek",
        "Uç açıklığının çok kapalı / doğru / çok açık olduğunu gözle ayırt etmek",
        "Kıskacın hangi yöne hangi etkiyi yaptığını söylemek",
      ],
      giris: `<p>Balabanın ruhu kamıştadır: aynı gövde, farklı kamışla bambaşka ses verir. Bugün kamışı "uyandırmayı" ve ona zarar vermeden ayarlamayı öğreniyorsun. Bu dersin sonunda kamıştan ilk kaba sesini de alacaksın.</p>`,
      adimlar: [
        {
          tur: "cizim",
          cizim: "kamis-hazirlama",
          baslik: "Kuru kamışı uyandır",
          ust: `<p>Yeni ya da uzun süre çalınmamış kamışın iki yaprağı birbirine yapışır; üflersen ses çıkmaz. Önerdiğimiz yol:</p>
<ol>
<li>Kamışın <b>içine</b> dip tarafından birkaç damla ılık su koy, çalkala, boşalt.</li>
<li>Kapağı tak, kamışı dik bırak, 5–15 dakika bekle. Uç kendiliğinden hafifçe açılır.</li>
<li>Yalnızca hafif kapalıysa su gerekmez: kamışı dudaklarının arasına al, 2–3 dakika sıcak nefesle nemlendir.</li>
</ol>`,
          html: `<p><b>Yapma:</b> kamışı bardakta suda bekletme; yanlardan parmakla zorla açma. Fazla ıslanan kamış "yuvarlaklaşır", çok açılır ve çalınması zorlaşır. Çok ıslandıysa kapağı takıp bir süre dinlendir.</p>`,
          not: `<p>Kaynaklar burada açıkça ayrışıyor: Türkçe kaynaklar (Eren 2020) yalnızca nefesle 3–5 dakika, Ermeni ustalar (duduk.com, iarmenia) içine az su, Chris Bleth 20 dakikaya kadar ılık suda bekletme, Dudukhouse ise "ıslatma!" der. Ortak nokta: nemlendirilecek olan kamışın <b>içi</b>dir ve fazlası zararlıdır. Bu yüzden az su + bekleme + nefes önerdik.</p>`,
        },
        {
          tur: "cizim",
          cizim: "kamis-acikligi",
          baslik: "Doğru açıklık",
          ust: `<p>Kamışın ucuna yandan bak. İki yaprak arasında ince bir mercek biçimi görmelisin: yaklaşık <b>1–1,5 mm</b>. "Ne çok bitişik ne çok açık."</p>`,
          html: `<ul>
<li><b>Çok kapalı:</b> ses çıkmaz ya da cılız ve tiz gelir.</li>
<li><b>Çok açık:</b> üflemesi çok zor, ses pes ve kararsız, nefesin çabuk biter.</li>
<li><b>Doğru:</b> orta kuvvette nefesle dolgun, sakin bir ses.</li>
</ul>
<p>Açıklık çalarken değişir: ısındıkça ve ıslandıkça kamış biraz daha açılır. Bu yüzden "bir kere ayarladım, bitti" yoktur.</p>`,
        },
        {
          tur: "metin",
          baslik: "Kamıştan ilk kaba ses",
          html: `<p>Kamışı gövdeye takmadan dene. Yassı ucun <b>6–10 mm</b> kadarını dudaklarının arasına al; dişlerin değmesin, dudakların kamışı çepeçevre sarsın. Ayakta ya da dik oturarak sakin ve sürekli üfle.</p>
<p>Duyacağın şey müzik değil: kaz ya da ördek gibi kaba bir "vaak". <b>Bu ses, kamışın hazır olduğunun kanıtıdır.</b> Bir iki saniye yeter; dudaklarını yormadan bırak.</p>
<p>Ses gelmiyorsa: uç hâlâ kapalıdır (biraz daha bekle) ya da kamışı çok az almışsındır. Cıyaklıyorsa dişlerin değiyor olabilir.</p>`,
          not: `<p>Eren (2020): kamış "üflendiğinde ses çıkıyorsa hazırdır". Yeni kamış ilk günlerde tam sesini vermez; "çalındıkça açılır". Beklediğin ton gelmezse kamışı değil, zamanı suçla.</p>`,
        },
        {
          tur: "cizim",
          cizim: "kiskac",
          baslik: "Kıskaç: tek kural",
          ust: `<p>Kıskaç kamışın yassı kısmının <b>ortasında</b> durur ve iki yaprağı sıkar. Yerini oynatınca iki şey değişir: uç açıklığı ve titreşen kısmın uzunluğu.</p>
<ul>
<li>Kıskacı <b>uca doğru</b> (ağzına giren tarafa) itersen açıklık daralır → ses <b>tizleşir</b>.</li>
<li><b>Dibe doğru</b> çekersen açıklık büyür → ses <b>pesleşir</b>, nefes daha çok harcanır.</li>
</ul>`,
          html: `<p>Pratik kural: <b>1 milimetre oynat, sonra kulağa ya da uygulamanın akort göstergesine bak.</b> Kıskaç yalnızca ince ayar içindir; çeyrek ses kadar düzeltir, yarım ses zorlamadır. Çalmadığın zaman kıskacı hafifçe gevşet.</p>`,
          not: `<p>Kaynaklar yönü farklı sözcüklerle anlatıyor ("aşağı/yukarı", "altına doğru") ve hangi uca göre olduğunu söylemiyor; Kalın'ın tarifi ve fizik yukarıdaki kuralı veriyor. Şüphede kalırsan ölç: hangi yön açıklığı daraltıyorsa o yön tizleştirir.</p>`,
        },
        {
          tur: "cizim",
          cizim: "bakim",
          baslik: "Kamış bakımı ve hijyen",
          ust: `<p>Her oturumun sonunda:</p>
<ol>
<li>Kamışı gövdeden çıkar, içindeki nemi hafifçe üfleyerek at, ılık suyla çalkala.</li>
<li><b>Açıkta kurut</b>; havalandırmalı bir kutu ideal. Islak kamışı kapalı kutuya koyma.</li>
<li>Kuruyunca kapağı tak, kıskacı gevşet.</li>
</ol>`,
          html: `<p>Kamış ağzına giren bir parçadır: kimseyle paylaşma. Haftada bir ılık suyla iyice yıka ve tamamen kurut. Ömrü öngörülemez; birkaç aydan birkaç yıla kadar. Yedek kamışını arada bir çalıp "alıştır".</p>`,
          not: `<p>Soumagne ve ark. (2019): incelenen nefesli çalgıların %95'i mantarla kolonizeydi; ana risk <b>kurutmamak</b>tı ve müzisyenlerde akciğer alerjisi belirtileri görüldü. Kurutma rutini süs değil, sağlık kuralı.</p>`,
          notTuru: "dikkat",
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          maddeler: [
            "Kamışı az suyla / nefesle hazırladım; uç gözle görülür biçimde hafif açık",
            "Kamıştan tek başına kaba 'vaak' sesini aldım",
            "Kıskacı ortaya yerleştirdim ve hangi yönün tizleştirdiğini söyleyebiliyorum",
            "Kamışı çalkalayıp açıkta kurumaya bıraktım",
          ],
        },
      ],
      kapanis: `<p>Kamışın artık uyanık. Yarın çalgısız nefes, duruş ve tutuş çalışacak, sonra çalgını uygulamaya tanıtacaksın. Bugünlük üfleme bitti; dudakların dinlensin.</p>`,
    },

    {
      id: "u0d3",
      baslik: "Nefes, duruş, tutuş ve plan",
      ozet: "Karın nefesi, ~40° duruş, sol el üstte tutuş, dudak pozisyonunun ön bilgisi, sağlık kuralları ve çalışma planı.",
      sure: 12,
      hedefler: [
        "Omuzlar kıpırdamadan karın nefesiyle 8 saniye düzenli hava vermek",
        "Çalgıyı doğru elle ve doğru parmak–delik eşlemesiyle tutmak",
        "Günlük çalışma planını ve dudak güvenlik kuralını söylemek",
      ],
      giris: `<p>Eren (2020) balabanda "en önemli nokta nefestir" der. Bugün sesi hazırlayan üç şeyi kuruyorsun: nefes, duruş, tutuş. Hepsi çalgısız ya da üflemeden yapılır; dudakların yarına taze kalsın.</p>`,
      adimlar: [
        {
          tur: "cizim",
          cizim: "nefes",
          baslik: "Karın nefesi",
          ust: `<p>Doğru dil şu: nefes alırken <b>karnın genişler</b> (diyafram iner), omuzlar yerinde kalır; üflerken <b>karın kasları</b> havayı yavaş ve sabit basınçla dışarı iter. "Diyaframdan üfle" demiyoruz, çünkü diyafram nefes <i>alma</i> kasıdır.</p>`,
          html: `<p>Alıştırma (oturarak, çalgısız): bir elini karnına koy. 4 sayarak burnundan al, karnın elini itsin. Sonra dudaklarını hafif büzüp uzun bir "sss" sesiyle 8 sayarak ver; ses baştan sona <b>aynı kuvvette</b> kalsın. 5 tekrar. Hafif baş dönmesi olursa dur, bir dakika normal nefes al.</p>`,
          not: `<p>Solunum fizyolojisi (McGill "breathing myths"; Cugell & Jacobs): üflemedeki güç karın ve kaburga arası kaslardan gelir. "Diyaframımı hissediyorum" ifadeleri çoğunlukla yanılgıdır; karnını hissetmek yeter.</p>`,
        },
        {
          tur: "cizim",
          cizim: "durus",
          baslik: "Duruş",
          ust: `<p>İlk haftalarda <b>oturarak</b> çalış: sandalyenin ön yarısında, sırt dik ama kaskatı değil, iki ayak yerde. Baş dik, boyun uzun, omuzlar düşük. Çalgı yataydan yaklaşık <b>40°</b> aşağı eğik durur; başı öne eğip çalgıya gitme, çalgıyı dudağına getir.</p>`,
          html: `<p>Neden oturarak? İlk haftalarda hafif baş dönmesi olağandır; oturursan güvendesin. Dirsekler bedenden bir yumruk kadar açık, kollar asılı değil, gergin de değil.</p>`,
        },
        {
          tur: "cizim",
          cizim: "tutus",
          baslik: "Tutuş: sol el üstte",
          ust: `<p><b>Sol el üstte</b>, sağ el altta. Sol baş parmak arka deliği (Arka), sol işaret–orta–yüzük–serçe parmakları 1–2–3–4'ü kapatır. Sağ işaret–orta–yüzük–serçe 5–6–7–8'i kapatır; <b>sağ baş parmak</b> gövdeyi arkadan, 5–6 hizasında taşır.</p>`,
          html: `<p>Şimdi kamışsız gövdeyi al ve bütün delikleri kapat. Parmaklarını say: sol el beş delik (Arka + 1–4), sağ el dört delik (5–8). Bu, ilerleyen ünitelerde "bütün delikler kapalı" dediğimiz pozisyon.</p>`,
          not: `<p>Eren 2020 ve Ermeni kaynakları sol el üstte konusunda uyuşuyor. Solak olsan da sol el üstte öğren; parmak şemaları buna göre çizildi.</p>`,
        },
        {
          tur: "cizim",
          cizim: "parmak-yastigi",
          baslik: "Deliği yastıkla kapat",
          ust: `<p>Delik parmak <b>ucuyla</b> değil, ilk boğumun etli <b>yastığıyla</b> kapanır. Parmaklar hafif kavisli, rahat; bastırmak gerekmez, sızdırmayan temas yeter. Açık parmaklar delikten 1–2 cm'den fazla kalkmaz.</p>`,
          html: `<p>Kuru alıştırma (kamışsız): bütün delikler kapalı 10 saniye dur, sonra sol serçeyi (4) kaldır, geri koy; sağ elin dördünü kaldır, geri koy. Her seferinde "tam kapandı mı?" diye parmaklarının altını hisset. Üflemiyorsun, sadece dokunuşu öğreniyorsun.</p>`,
        },
        {
          tur: "cizim",
          cizim: "ambusur",
          baslik: "Dudak: yarının ön bilgisi",
          ust: `<p>Yarın kamışı çalgıya takılı olarak ağzına alacaksın. Dünkü "kaba ses" denemesinde kullandığın resmi şimdi iyice tanı: kamışın yassı ucu dudakların arasına <b>6–10 mm</b> girer; <b>dişler değmez</b>; dudaklar dişlerin önünde, hafif "Ü" der gibi, kamışı çepeçevre sarar; çene gevşek. Dudaklar hava kaçırmayacak kadar kapalı, ama ısırmıyor.</p>`,
          html: `<p>Yanaklar konusunda gelenekler ayrılır: Ermeni düdük ustaları yanakların hafif şişmesine izin verir (hava deposu); Eren (2020) temel sesi karın desteğiyle çıkarmayı, yanak deposunu yalnızca nefes çevirmeye saklamayı öğretir. Biz Eren'in yolunu izliyoruz: <b>yanak düz, destek karından.</b> İleride düdük üslubunu da tanıyacaksın.</p>`,
        },
        {
          tur: "metin",
          baslik: "Sağlık kuralları",
          html: `<ul>
<li><b>Dudak yükü:</b> ilk ay bir oturumda en çok 10 dakika ses; her 3 dakikada 30–60 saniye mola. <b>Ağrı ya da uyuşma = o gün bitti.</b> İki gün sürerse iki gün tam ara.</li>
<li><b>Baş dönmesi:</b> otur, çalgıyı bırak, bir dakika normal nefes al. Daha az hava kaçırarak çal; 2–3 haftada geçer. Geçmezse hekime.</li>
<li><b>Devirli nefes (nefes çevirme):</b> 5. aydan önce yok. Glokom ya da göz tansiyonu öykün varsa uzun ve yüksek basınçlı üflemeden önce doktoruna sor.</li>
<li><b>Kamış hijyeni:</b> her oturum sonu kurut; paylaşma.</li>
</ul>`,
          not: `<p>Kok ve ark. (2016): çalma süresi aniden artan amatörlerde kas-iskelet şikâyeti %28'den %80'e çıktı. Schuman ve ark. (2000): yüksek dirençli üflemede göz içi basıncı yükselir. Balaban düşük–orta dirençlidir ama uyarı yerinde.</p>`,
          notTuru: "dikkat",
        },
        {
          tur: "metin",
          baslik: "Çalışma planın",
          html: `<p><b>Günde 2 kısa oturum</b> (10–12 dakika), aralarında en az 4 saat; haftada 5–6 gün, 1 gün tam dinlenme. Bir uzun oturum yerine iki kısa oturum daha çok öğretir, dudağı da korur.</p>
<p>Uygulama bir dersi tamamladığın günün ertesi gün sıradakini açar; bir beceri "ustalaşıldı" sayılması için üç farklı günde geçmen gerekir. Bu acımasızlık değil, bilim: öğrenme uykuda pekişir. "Bugün olmayan yarın olur."</p>
<p>Her derste eski malzeme yenisine karışacak (A-B-C-A-B-C). Anlık olarak daha zor ve daha az tatmin edici gelir; ama kalıcı olan budur.</p>`,
          not: `<p>Simmons (2011): aralıklı iki kısa oturum tek uzun oturuma göre daha çok hız kazandırdı. Carter & Grahn (2016), Abushanab & Bishara (2013): serpiştirilmiş çalışma anlık performansı düşürüp kalıcı öğrenmeyi artırır.</p>`,
        },
        {
          tur: "metin",
          baslik: "Çalgını uygulamaya tanıt",
          html: `<p>Uygulama senin çalgının akordunu ve türünü (balaban mı düdük mü) kendi ölçer; böylece bütün dersler senin çalgına göre dinler. Bunun için bütün delikler kapalı bir ses ister.</p>
<p>Şimdi dene: <a href="#araclar-tanit">Çalgını tanıt</a>. Henüz ses çıkaramıyorsan hiç dert değil; bu çok normal. Ünite 1'in ilk dersinden sonra buraya dönüp tanıtırsın. Tanıtana kadar uygulama varsayılan akortla dinler.</p>`,
          notTuru: "ipucu",
          not: `<p>Piyasadaki "La balaban" ya da "A duduk" etiketleri aynı şeyi anlatmaz: bazen bütün delikler kapalı sesi, bazen karar sesini söyler. Bu yüzden etikete değil, ölçüme güveniyoruz.</p>`,
        },
        {
          tur: "kontrol",
          baslik: "Kendini denetle",
          maddeler: [
            "Omuzlarım kıpırdamadan karın nefesiyle 8 saniye düzenli 'sss' verdim",
            "Sol el üstte; hangi parmağın hangi deliği kapattığını söyleyebiliyorum",
            "Delikleri parmak ucuyla değil yastıkla kapattığımı hissettim",
            "Dudak yükü kuralını (10 dk, 3 dk'da mola, ağrı = dur) biliyorum",
            "Çalışma planım: günde 2 × 10–12 dakika, haftada 1 tam dinlenme",
          ],
        },
      ],
      kapanis: `<p>Hazırsın. Yarın ilk sesin: Fa. Kamışını bu akşam hazırla (az su, kapak, dik bekleme), yarın yalnızca nefesle uyandırırsın. Bugünün tek ödevi: 5 kez karın nefesi, bir kez de kamışsız tutuş.</p>`,
    },
  ],
};
