const dictionaryData = [
    { id: 1, term: "Ab initio", definition: "Boshidanoq. Huquqiy hujjat, bitim yoki majburiyat tuzilgan/chiqarilgan vaqtidan boshlab yuridik kuchga ega emasligini anglatuvchi prinsip.", source: "Yuridik nazariya" },
    { id: 2, term: "Absenteizm", definition: "Fuqarolarning davlat hokimiyati organlari saylovlarida va referendumlarda ovoz berish huquqini amalga oshirishdan ixtiyoriy hamda ongli ravishda boʻyin tovlashi.", source: "Konstitutsiyaviy huquq" },
    { id: 3, term: "Adliya", definition: "Davlatda qonun ustuvorligi, inson huquq va erkinliklarini himoya qilish hamda qonuniylikni taʼminlashga qaratilgan sud va huquqni muhofaza qiluvchi organlar faoliyati majmui.", source: "Huquqni muhofaza qilish organlari" },
    { id: 4, term: "Advokat", definition: "Belgilangan tartibda advokatlik faoliyati bilan shugʻullanish huquqi (litsenziyasi)ni olgan va jismoniy hamda yuridik shaxslarga professional huquqiy yordam koʻrsatuvchi mustaqil yurist.", source: "Advokatura to'g'risida Qonun" },
    { id: 5, term: "Advokatlik siri", definition: "Ishonch bildiruvchi (mijoz)ning advokatga huquqiy yordam soʻrab murojaat qilganligi, yordam mazmuni va ish boʻyicha toʻplangan barcha maxfiy maʼlumotlar daxlsizligi.", source: "Advokatura to'g'risida Qonun" },
    { id: 6, term: "Affillangan shaxslar", definition: "Jismoniy yoki yuridik shaxsning tadbirkorlik (xoʻjalik) faoliyati boʻyicha qarorlar qabul qilish jarayoniga bevosita yoki bilvosita taʼsir koʻrsatishga haqli boʻlgan bogʻliq shaxslar.", source: "Fuqarolik kodeksi" },
    { id: 7, term: "Affekt", definition: "Insonning toʻsatdan yuzaga keladigan, qisqa muddat davom etadigan va qonunga xilof harakatlar oqibatida kuchli ruhiy hayajonlanish bilan kechadigan, ongli idrokni cheklovchi ruhiy holat.", source: "Jinoyat kodeksi" },
    { id: 8, term: "Afv etish", definition: "Oʻzbekiston Respublikasi Prezidentining mutlaq vakolati boʻlib, sudlangan muayyan shaxsni jazodan butunlay yoki qisman ozod qilish yoxud jazosini yengilrogʻi bilan almashtirish hujjati.", source: "Konstitutsiya" },
    { id: 9, term: "Aksept", definition: "Tuzilishi taklif etilgan shartnoma (oferta) shartlarini toʻliq, soʻzsiz va yozma yoki harakatlar orqali qabul qilinishini anglatuvchi huquqiy rozilik bildirish shakli.", source: "Fuqarolik kodeksi" },
    { id: 10, term: "Aksiya", definition: "Egasining (aksiyadorning) aksiyadorlik jamiyati foydasidan dividend shaklida ulush olish, jamiyatni boshqarish va tugatilgandan keyin qolgan mulkdan qism olish huquqini tasdiqlovchi ulushli qimmatli qogʻoz.", source: "Fuqarolik kodeksi" },
    { id: 11, term: "Aliment", definition: "Qonunda belgilangan holatlarda (masalan, voyaga yetmagan farzandlar, mehnatga layoqatsiz er-xotin yoki ota-ona uchun) taʼminot majburiyatiga ega shaxs tomonidan toʻlanadigan majburiy pul mablagʻi.", source: "Oila kodeksi" },
    { id: 12, term: "Band solish (Xatlash)", definition: "Sud, tergov yoki majburiy ijro organlari tomonidan mulkdorning oʻz mol-mulkini begonalashtirish va tasarruf etish huquqlarini vaqtincha taqiqlash yoki cheklash chorasi.", source: "Protsessual kodekslar" },
    { id: 13, term: "Blank qonun normasi", definition: "Oʻz matnida aniq xulq-atvor qoidasini toʻliq bayon etmay, uni aniqlash uchun boshqa normativ-huquqiy hujjatlarga havola beruvchi norma.", source: "Huquq nazariyasi" },
    { id: 14, term: "Bona fide", definition: "Huquqiy munosabatlar ishtirokchisining oʻz majburiyatlarini gʻarazli maqsadsiz, halollik bilan, boshqa taraflarning huquqlarini hurmat qilgan holda amalga oshirishi.", source: "Fuqarolik kodeksi" },
    { id: 15, term: "Boy berilgan foyda", definition: "Shaxsning huquqlari buzilmaganida va u odatdagi fuqarolik muomalasi sharoitida olishi mumkin boʻlgan, biroq huquqbuzarlik oqibatida ololmay qolgan sof daromadlari miqdori.", source: "Fuqarolik kodeksi" },
    { id: 16, term: "Buyruq tartibida ish yuritish", definition: "Nizosiz talablar boʻyicha sud majlisi oʻtkazmasdan va tomonlarni chaqirmasdan, faqat taqdim etilgan hujjatlar asosida chiqariladigan sud hujjati.", source: "Fuqarolik protsessual kodeksi" },
    { id: 17, term: "Buyurtmachi", definition: "Fuqarolik-huquqiy shartnomalariga asosan maʼlum bir ish natijasini yoki xizmatni qabul qilib olish va uning haqini toʻlash majburiyatini olgan shartnoma tarafi.", source: "Fuqarolik kodeksi" },
    { id: 18, term: "Byurokratiya", definition: "Davlat boshqaruv tizimida rasmiyatchilik va qogʻozbozlikning kuchayishi sababli fuqarolarning qonuniy huquqlarini amalga oshirish jarayonini asossiz qiyinlashtiradigan salbiy holat.", source: "Ma'muriy huquq" },
    { id: 19, term: "Byudjet", definition: "Davlat, munitsipal tuzilma yoki korxonaning muayyan davriy vaqt uchun moʻljallangan barcha daromadlar manbalari va xarajatlar yoʻnalishlarining qonuniy tasdiqlangan moliyaviy rejasi.", source: "Budjet kodeksi" },
    { id: 20, term: "Daʼvo muddati", definition: "Shaxs oʻzining buzilgan fuqarolik huquqini daʼvo qoʻzgʻatish yoʻli bilan sud orqali himoya qilishi mumkin boʻlgan qonuniy vaqt chegarasi (umumiy muddat 3 yil).", source: "Fuqarolik kodeksi" },
    { id: 21, term: "Daʼvoning asosi", definition: "Daʼvogar oʻzining sudga qilgan moddiy-huquqiy talablarini tasdiqlash uchun asos qilib keltiradigan yuridik faktlar, holatlar va dalillar majmui.", source: "Protsessual huquq" },
    { id: 22, term: "Daʼvogar", definition: "Oʻzining buzilgan yoki nizolashilayotgan qonuniy huquqlarini himoya qilishni soʻrab sudga ariza (daʼvo) bilan murojaat qilgan taraf.", source: "Fuqarolik protsessual kodeksi" },
    { id: 23, term: "Dalillar", definition: "Sud yoki tergov organlari tomonidan ish uchun ahamiyatli boʻlgan holatlar mavjudligini aniqlash uchun asos boʻladigan har qanday faktik maʼlumotlar.", source: "Protsessual kodekslar" },
    { id: 24, term: "Davlatchilik shaffofligi", definition: "Davlat organlari va mansabdor shaxslarning faoliyati, qabul qilayotgan qarorlari hamda sarflayotgan mablagʻlari yuzasidan jamiyat oldidagi ochiqligi va hisobdorligi.", source: "Konstitutsiyaviy huquq" },
    { id: 25, term: "De-fakto (De facto)", definition: "Amalda, haqiqatda. Biron-bir voqelik yoki munosabatning huquqiy jihatdan rasman rasmiylashtirilmagan boʻlsa-da, real hayotda mavjud boʻlishi.", source: "Yuridik atama" },
    { id: 26, term: "De-yure (De jure)", definition: "Huquqiy jihatdan, qonunan. Amaldagi real vaziyat qanday boʻlishidan qatʼi nazar, normativ-huquqiy hujjatlarda rasman mustahkamlab qoʻyilgan holat.", source: "Yuridik atama" },
    { id: 27, term: "Deklaratsiya", definition: "Jismoniy yoki yuridik shaxslarning oʻz daromadlari, mol-mulki, soliqlari yoki bojxonadan oʻtayotgan tovarlari toʻgʻrisida davlat organlariga taqdim etadigan rasmiy bildirishnomasi.", source: "Soliq va bojxona huquqi" },
    { id: 28, term: "Demokratik tamoyillar", definition: "Davlat qurilishi va huquq tizimida xalq hokimiyatchiligi, hokimiyatlarning boʻlinishi va inson huquqlarining oliy qadriyat sifatida tan olinishi prinsiplari.", source: "Konstitutsiya" },
    { id: 29, term: "Dispozitivlik", definition: "Fuqarolik yoki protsessual huquq ishtirokchilarining oʻz huquqlaridan qonun doirasida oʻz xohishlariga koʻra erkin foydalanish hamda tasarruf etish mustaqilligi.", source: "Fuqarolik protsessual kodeksi" },
    { id: 30, term: "Egalik huquqi", definition: "Mulk huquqining tarkibiy qismi boʻlib, shaxsning ashyoni oʻzining bevosita jismoniy yoki yuridik hukmronligi ostida qonuniy saqlab turish imkoniyati.", source: "Fuqarolik kodeksi" },
    { id: 31, term: "Ekspertiza", definition: "Maxsus bilimlarga ega boʻlgan ekspert tomonidan ish boʻyicha haqiqatni aniqlash uchun oʻtkaziladigan tadqiqot.", source: "Protsessual qonunchilik" },
    { id: 32, term: "Ekstraditsiya", definition: "Jinoiy javobgarlikka tortish yoki sud hukmini ijro etish maqsadida, jinoyat sodir etgan shaxsni u boshpana topgan davlat tomonidan topshirilishi.", source: "Jinoyat-protsessual kodeksi" },
    { id: 33, term: "Emissiya", definition: "Markaziy bank yoki vakolatli emitentlar tomonidan qonuniy toʻlov vositasi boʻlgan pul belgilarini yoxud qimmatli qogʻozlarni muomalaga chiqarish faoliyati.", source: "Bank qonunchiligi" },
    { id: 34, term: "Epizod", definition: "Jinoyat ishining tarkibiy qismi boʻlgan, vaqti, joyi va usuliga koʻra alohida ajralib turuvchi, mustaqil huquqiy baho beriladigan jinoiy harakat.", source: "Jinoyat-protsessual kodeksi" },
    { id: 35, term: "Erkin iqtisodiy zona (EIZ)", definition: "Tadbirkorlik va investitsiyalarni jalb etish maqsadida bojxona, soliq va boshqa maʼmuriy tartiblar boʻyicha maxsus imtiyozli rejim joriy qilingan hudud.", source: "Investitsiyalar to'g'risida Qonun" },
    { id: 36, term: "Fidutsiar majburiyat", definition: "Ishonchga asoslangan huquqiy majburiyat. Shaxs boshqa tarafning manfaatlarini oʻz foydasidan ustun qoʻyishi shart.", source: "Fuqarolik kodeksi" },
    { id: 37, term: "Fors-major", definition: "Tomonlarning irodasiga bogʻliq boʻlmagan, oldindan koʻrib chiqish imkoni boʻlmagan favqulodda vaziyatlar tufayli javobgarlikdan ozod etish asosi.", source: "Fuqarolik kodeksi" },
    { id: 38, term: "Franshiza", definition: "Brend va texnologiya egasi boshqa tadbirkorga muayyan haq evaziga oʻz tovar belgisi va biznes modelidan foydalanishga ruxsat berish shartnomasi.", source: "Fuqarolik kodeksi" },
    { id: 39, term: "Fuqarolik huquq layoqati", definition: "Barcha jismoniy shaxslarning tugʻilgan kundan boshlab huquqlarga ega boʻlish va majburiyatlar orttirish boʻyicha qonun tomonidan tan olingan teng imkoniyati.", source: "Fuqarolik kodeksi" },
    { id: 40, term: "Fuqarolik muomala layoqati", definition: "Fuqaroning oʻz harakatlari bilan huquqlarga ega boʻlishi va ularni amalga oshirishi (18 yoshdan boshlanadi).", source: "Fuqarolik kodeksi" },
    { id: 41, term: "Fuqarolik-huquqiy javobgarlik", definition: "Shartnoma majburiyatlarini buzgan yoki zarar yetkazgan shaxsga nisbatan qoʻllaniladigan mulkiy sanksiya.", source: "Fuqarolik kodeksi" },
    { id: 42, term: "Fuqaroligi boʻlmagan shaxs", definition: "Muayyan davlat hududida yashab turgan, lekin birorta davlat fuqaroligiga ega emasligini tasdiqlovchi hujjati boʻlgan/bo'lmagan jismoniy shaxs.", source: "Fuqarolik huquqi" },
    { id: 43, term: "Garov", definition: "Majburiyatlar ijrosini taʼminlash usuli. Qarzdor majburiyatni bajarmasa, kreditor garovdagi mulkdan oʻz talabini qondiradi.", source: "Fuqarolik kodeksi" },
    { id: 44, term: "Grafting (Korrupsiya)", definition: "Mansabdor shaxsning oʻz mansab mavqeyidan shaxsiy xarakterdagi asossiz ustunlik va imtiyozlar olish maqsadida foydalanishi.", source: "Korrupsiyaga qarshi kurashish to'g'risida Qonun" },
    { id: 45, term: "Guvoh", definition: "Ish boʻyicha holatlarni bilgan va koʻrsatma berishga chaqirilgan shaxs.", source: "Protsessual kodekslar" },
    { id: 46, term: "Guvohnoma", definition: "Shaxsning muayyan huquqiy maqomini yoki faktini tasdiqlovchi rasmiy hujjat.", source: "Maʼmuriy huquq" },
    { id: 47, term: "Gumanizm tamoyili", definition: "Inson daxlsizligi, shaʼnini ulugʻlash, qiynoq va shafqatsizlikka yoʻl qoʻymaslik prinsipi.", source: "Jinoyat kodeksi" },
    { id: 48, term: "Hadya shartnomasi", definition: "Ashyoni yoki mulkiy huquqni tekinga mulk qilib topshirish bitimi.", source: "Fuqarolik kodeksi" },
    { id: 49, term: "Hakamlik sudi", definition: "Nizolarni davlat sudi tizimidan tashqari, tomonlarning kelishuvi bilan saylangan mustaqil hakamlar tomonidan koʻrib chiquvchi nodavlat sud.", source: "Hakamlik sudlari to'g'risida Qonun" },
    { id: 50, term: "Hamyonbop huquqiy yordam", definition: "Ijtimoiy himoyaga muhtoj shaxslarga ixtiyoriy ravishda koʻrsatiladigan bepul yuridik xizmat (Pro bono).", source: "Advokatura to'g'risida Qonun" },
    { id: 51, term: "Haqiqiy emas deb topish", definition: "Talablar buzilgan holda tuzilgan shartnomaning sud tartibida oʻz yuridik kuchini yoʻqotishi.", source: "Fuqarolik kodeksi" },
    { id: 52, term: "Harakat va Harakatsizlik", definition: "Huquqbuzarlikning obyektiv tomoni; taqiqlangan xulqni bajarish yoki majburiy vazifani bajarmaslik.", source: "Jinoyat / Maʼmuriy kodeks" },
    { id: 53, term: "Hukm", definition: "Sudlanuvchining aybdorligi va jazo chorasi toʻgʻrisida sud tomonidan chiqariladigan oliy qaror.", source: "Jinoyat-protsessual kodeksi" },
    { id: 54, term: "Huquqbuzarlik", definition: "Qonunchilik normalarini buzadigan, yuridik javobgarlikka sabab boʻladigan aybli, gʻayrihuquqiy qilmish.", source: "Huquq nazariyasi" },
    { id: 55, term: "Ijro varaqasi", datum: "Sud qarorlarini majburiy tartibda ijro ettirish uchun asos boʻladigan maxsus hujjat.", source: "Sud hujjatlarini ijro etish to'g'risida Qonun" },
    { id: 56, term: "Immutabilitet", definition: "Normativ hujjatlar yoki shartnoma shartlarini tomonlarning oʻzboshimchalik bilan bir tomonlama oʻzgartira olmasligi.", source: "Fuqarolik huquqi" },
    { id: 57, term: "Imperativ norma", definition: "Oʻzgartirilishi mutlaqo mumkin boʻlmagan, qatʼiy va majburiy xarakterga ega boʻlgan buyruq qoidasi.", source: "Huquq nazariyasi" },
    { id: 58, term: "In camera", definition: "Yopiq eshiklar ortida. Sirlarni saqlash maqsadida sud majlisining jamoatchilik ishtirokisiz oʻtkazilishi.", source: "Protsessual huquq" },
    { id: 59, term: "Intellektual mulk", definition: "Ijodiy faoliyat mahsulotlari (fan, adabiyot, sanʼat asarlari, ixtirolar, tovar belgilari) ustidan eksklyuziv huquq.", source: "Fuqarolik kodeksi" },
    { id: 60, term: "Ishonchnoma", definition: "Bir shaxs tomonidan ikkinchi shaxsga uchinchi shaxslar oldida vakillik qilish uchun beriladigan yozma vakolat hujjati.", source: "Fuqarolik kodeksi" },
    { id: 61, term: "Jarima", definition: "Huquqbuzarlik sodir etilganda davlat foydasiga undiriladigan pul sanksiyasi.", source: "Jinoyat / Maʼmuriy kodeks" },
    { id: 62, term: "Javobgar", definition: "Sud ishlarida huquqlarni buzganlikda ayblanib, daʼvo talablariga qarshi eʼtiroz bildirish huquqiga ega boʻlgan taraf.", source: "Protsessual kodekslar" },
    { id: 63, term: "Jinoiy javobgarlik", definition: "Jinoyat tarkibini sodir etgan shaxsning davlat oldidagi majburiy hisobdorligi.", source: "Jinoyat kodeksi" },
    { id: 64, term: "Jismoniy shaxs", definition: "Huquqiy munosabatlarning mustaqil ishtirokchisi boʻlgan inson.", source: "Fuqarolik kodeksi" },
    { id: 65, term: "Jurisprudensiya", definition: "Huquq tizimi, qonunchilik va yuristlarning amaliy faoliyatini ifodalovchi tushuncha.", source: "Huquqshunoslik" },
    { id: 66, term: "Kafillik", definition: "Qarzdor majburiyatini bajarmasa, kafil shaxsning kreditor oldida birgalikda javob berish majburiyati.", source: "Fuqarolik kodeksi" },
    { id: 67, term: "Kassa tartibida shikoyat", definition: "Sudning qonuniy kuchga kirgan qarorlari ustidan qonun normalari toʻgʻri qoʻllanganligini tekshirishni soʻrab beriladigan shikoyat.", source: "Protsessual kodekslar" },
    { id: 68, term: "Kassaatsiya instansiyasi", definition: "Qonuniy kuchga kirgan sud qarorlarining qonuniyligini mavjud materiallar asosida tekshiruvchi yuqori sud bosqichi.", source: "Protsessual kodekslar" },
    { id: 69, term: "Kollizion norma", definition: "Bir xil munosabatga bir nechta qonun toʻgʻri kelganda, qaysi qonunni qoʻllash lozimligini koʻrsatuvchi qoida.", source: "Xususiy xalqaro huquq" },
    { id: 70, term: "Konfiskatsiya", definition: "Noqonuniy yoʻl bilan qoʻlga kirilgan mol-mulkni sud qaroriga asosan majburiy ravishda davlat mulkiga oʻtkazish.", source: "Jinoyat kodeksi" },
    { id: 71, term: "Kreditor", definition: "Qarzdordan muayyan harakatlarni bajarishni talab qilishga haqli boʻlgan taraf.", source: "Fuqarolik kodeksi" },
    { id: 72, term: "Legallash", definition: "Noqonuniy yoʻl bilan topilgan mablagʻlarga bitimlar orqali qonuniy tus berish (jinoiy daromadlarni legallashtirish).", source: "Jinoyat kodeksi" },
    { id: 73, term: "Lex specialis", definition: "Maxsus qonun prinsipi. Maxsus sohani tartibga soluvchi qoida ustun qoʻllaniladi.", source: "Huquq nazariyasi" },
    { id: 74, term: "Litsenziya", definition: "Litsenziyalanadigan faoliyat turi bilan shugʻullanish uchun beriladigan maxsus ruxsatnoma.", source: "Litsenziyalash to'g'risida Qonun" },
    { id: 75, term: "Likvidatsiya", definition: "Yuridik shaxsning huquq va majburiyatlari vorislik tartibida oʻtmasdan tugatilishi.", source: "Fuqarolik kodeksi" },
    { id: 76, term: "Mediatsiya", definition: "Nizolarni betaraf uchinchi shaxs (mediator) koʻmagida oʻzaro rozilik bilan hal qilish usuli.", source: "Mediatsiya to'g'risida Qonun" },
    { id: 77, term: "Merosxoʻr", definition: "Vafot etgan shaxsning mulkini qonun yoki vasiyatnoma boʻyicha qabul qilib oluvchi shaxs.", source: "Fuqarolik kodeksi" },
    { id: 78, term: "Moddiy zarar", definition: "Huquqbuzarlik natijasida mol-mulkning kamayishi yoki yoʻq qilinishi oqibatida koʻrilgan iqtisodiy yoʻqotish.", source: "Fuqarolik kodeksi" },
    { id: 79, term: "Maʼnaviy zarar", definition: "Huquqlar buzilishi natijasida boshidan kechirilgan ruhiy azoblar uchun sud tomonidan undiriladigan kompensatsiya.", source: "Fuqarolik kodeksi" },
    { id: 80, term: "Mulk huquqi", definition: "Mulkdorning oʻz ashyosiga nisbatan egalik qilish, foydalanish va tasarruf etish boʻyicha mutlaq huquqi.", source: "Fuqarolik kodeksi" },
    { id: 81, term: "Huquqiy munosabat subyekti", definition: "Huquqiy munosabatlarda ishtirok etish layoqatiga ega boʻlgan shaxslar (jismoniy va yuridik shaxslar).", source: "Fuqarolik kodeksi" },
    { id: 82, term: "Mutlaq monarxiya", definition: "Hokimiyatning cheksiz vakolatlari birgina davlat rahbari qoʻlida toʻplanadigan boshqaruv shakli.", source: "Konstitutsiyaviy huquq" },
    { id: 83, term: "Ehtiyotsizlik", definition: "Oqibatlarni oldindan koʻra bilgan holda uning oldini olishga umid qilish yoki koʻra olmaslik holati.", source: "Jinoyat kodeksi" },
    { id: 84, term: "Nemo tenetur", definition: "Hech bir shaxs oʻziga va yaqin qarindoshlariga qarshi guvohlik berishga majbur emasligi prinsipi.", source: "Konstitutsiya" },
    { id: 85, term: "Normativ-huquqiy hujjat (NHH)", definition: "Hamma uchun majburiy boʻlgan huquqiy normalarni belgilaydigan rasmiy hujjat.", source: "Normativ-huquqiy hujjatlar to'g'risida Qonun" },
    { id: 86, term: "Notarius", definition: "Bitimlarni va hujjatlarni davlat nomidan qonuniy tasdiqlash vakolatiga ega boʻlgan maxsus shaxs.", source: "Notariat to'g'risida Qonun" },
    { id: 87, term: "Oferta", definition: "Shartnoma tuzish niyatini anglatuvchi aniq taklif.", source: "Fuqarolik kodeksi" },
    { id: 88, term: "Ommaviy huquq", definition: "Davlat manfaatlari va jamiyat xavfsizligini taʼminlash bilan bogʻliq munosabatlarni tartibga soluvchi huquq sohalari.", source: "Huquq nazariyasi" },
    { id: 89, term: "Oqlash hukmi", definition: "Jinoyat tarkibi boʻlmaganda sudlanuvchining mutlaq aybsizligini tasdiqlovchi yakuniy qaror.", source: "Jinoyat-protsessual kodeksi" },
    { id: 90, term: "Vasiylik va Homiylik", definition: "Muomala layoqati toʻliq boʻlmagan shaxslarning huquqlarini himoya qilish maqsadidagi huquqiy institut.", source: "Oila kodeksi" },
    { id: 91, term: "Pacta sunt servanda", definition: "Qonuniy tartibda tuzilgan shartnomalar tomonlar uchun soʻzsiz bajarilishi shartligi prinsipi.", source: "Xalqaro huquq" },
    { id: 92, term: "Pretsedent", definition: "Sudning muayyan ish boʻyicha chiqargan qarori boʻlib, oʻxshash ishlarni koʻrishda qoida boʻlib xizmat qiladi.", source: "Huquq tizimlari" },
    { id: 93, term: "Aybsizlik prezumpsiyasi", definition: "Aybi isbotlanmaguncha shaxs aybsiz hisoblanishi haqidagi konstitutsiyaviy qoida.", source: "Konstitutsiya" },
    { id: 94, term: "Regressiv talab", definition: "Asosiy qarzdor oʻrniga zararni qoplagan shaxsning haqiqiy aybdordan pulni qaytarish talabi.", source: "Fuqarolik kodeksi" },
    { id: 95, term: "Reabilitatsiya", definition: "Nohaq javobgarlikka tortilgan shaxsning huquqlarini davlat tomonidan tiklash.", source: "Jinoyat-protsessual kodeksi" },
    { id: 96, term: "Sanksiya", definition: "Qoidalar buzilganda huquqbuzarga nisbatan qoʻllaniladigan jazo choralari.", source: "Huquq nazariyasi" },
    { id: 97, term: "Subsidiar javobgarlik", definition: "Asosiy qarzdor bajara olmasa, qarz majburiyati qoʻshimcha javobgarga oʻtishi.", source: "Fuqarolik kodeksi" },
    { id: 98, term: "Tasarruf etish huquqi", definition: "Mulkdorning oʻz obektining huquqiy taqdirini erkin belgilash imkoniyati.", source: "Fuqarolik kodeksi" },
    { id: 99, term: "Tergovga qadar tekshiruv", definition: "Jinoyat alomatlari mavjudligini aniqlash uchun vakolatli organlar oʻtkazadigan dastlabki harakatlar.", source: "Jinoyat-protsessual kodeksi" },
    { id: 100, term: "Yuridik shaxs", definition: "Alohida mol-mulkka ega boʻlgan, oʻz nomidan shartnomalar tuzadigan va sudda qatnasha oladigan tashkilot.", source: "Fuqarolik kodeksi" }
];

// Kartochkalarni ekranga chiqarish
function displayDictionary(data) {
    const grid = document.getElementById('dictionaryGrid');
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #475569; font-size: 1.1rem; padding: 40px;">Kechirasiz, bunday atama topilmadi.</p>';
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dict-card';
        card.innerHTML = `
            <div>
                <div class="dict-term">${item.term}</div>
                <div class="dict-definition">${item.definition}</div>
            </div>
            <div class="dict-source">Manba: ${item.source}</div>
        `;
        grid.appendChild(card);
    });
}

// Qidiruv funksiyasi
function filterDictionary() {
    const query = document.getElementById('dictionarySearch').value.toLowerCase().trim();
    
    // Harflar filterini "Barchasi" ga qaytarish qidiruv paytida chalg'itmasligi uchun
    const buttons = document.querySelectorAll('.alphabet-filter button');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[0].classList.add('active');

    const filtered = dictionaryData.filter(item => 
        item.term.toLowerCase().includes(query) || 
        item.definition.toLowerCase().includes(query)
    );
    displayDictionary(filtered);
}

// Harflar bo'yicha filtrlash
function filterByLetter(letter) {
    const buttons = document.querySelectorAll('.alphabet-filter button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Qidiruv satrini tozalash
    document.getElementById('dictionarySearch').value = '';

    if (letter === 'ALL') {
        displayDictionary(dictionaryData);
        return;
    }

    const filtered = dictionaryData.filter(item => 
        item.term.toUpperCase().startsWith(letter)
    );
    displayDictionary(filtered);
}

// Sahifa to'liq yuklanganda ishga tushishi
document.addEventListener('DOMContentLoaded', () => {
    displayDictionary(dictionaryData);
});
