# sport-app
Mobil Programlama dersi proje ödevi: “Spor Mücadeleleri” uygulaması.

Özellikler

- React Native (Expo) tabanlı, hem iOS hem Android’de çalışır  
- Atomic Design prensiplerine uygun component mimarisi  
- Context API ile global state yönetimi  
- Mocki.io üzerinden GET ile challenge verisi çekme  
- Katıl/Katıldın butonları: POST yerine lokal state güncellemesi  
- FlatList ile performanslı listeleme  
- React Navigation ile ekranlar arası geçiş  
- SafeAreaView ve useSafeAreaInsets kullanarak durum çubuğu altından başlama  
- Motivasyon sözü, FilterBar, Liderlik Tablosu ve Profil ekranları  

Kullanım
1.Hoşgeldin Ekranı:
-“Kullanıcı adınızı giriniz” alanına isim yazın.
-İlgi alanlarınızı seçin ve Devam Et’e dokunun.

2.Anasayfa (Home):
-Motivasyon sözü okunur.
-“Challenge ara…” satırına yazarak filtreleyin.
-“Tüm” / “Yakınındaki” / “Popüler” kategorilerini seçin.
-Kartlara dokunarak challenge’ın detayına gidin.

3.Challenge Detayı:
-Başlık, tarih, açıklama ve görsel gösterilir.
-Katıl butonuna dokunarak katılımı onaylayın.
-Katıldığınız challenge artık “Katıldın” olarak işaretlenir.

4.Leaderboard (Liderlik Tablosu):
-Tüm challenge’lar katılımcı sayısına göre sıralanır.
-Her satırda ilgili ikon ve renk görseli bulunur.

5.Profile (Profil):
-Kaydedilen kullanıcı adı ve ilgi alanları üstte gösterilir.
-“Katıldığın Mücadeleler” listesinde yanlarında ikonlar ile görünür.

 Teknolojiler:
-React Native & Expo
-React Navigation
-Context API
-axios
-react-native-safe-area-context
-@expo/vector-icons
-Mocki.io