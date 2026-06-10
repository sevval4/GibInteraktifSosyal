# GİB İnteraktif Admin Paneli - Mimari ve Yol Haritası Manifestosu

Bu manifesto, "GİB İnteraktif" Admin Dashboard projesinin mimari standartlarını, veri akışını ve 6 saatlik hackathon takvimini belirleyen nihai referans dokümanıdır. Geliştirme sürecindeki tüm adımlar bu belgedeki prensiplere körü körüne bağlı kalacaktır.

---

## 1. Mimari Kararlar (Tech Stack)

*   **Framework:** React 18+ (Vite tabanlı, hızlı derleme ve HMR avantajı için).
*   **Stil Kütüphanesi:** Tailwind CSS v4 (Tasarım sistemine tam uyumlu, hızlı UI prototipleme için) + Özel CSS `@keyframes` (Confetti ve mikro animasyonlar için).
*   **Durum Yönetimi (State Management):** React Context API tabanlı `GIBStore`.
    *   Veriler **LocalStorage** üzerinde senkronize çalışacaktır.
    *   Admin panelindeki değişiklikler mobil simülatöre, simülatördeki etkileşimler admin paneline anında yansıyacaktır (Çift yönlü reaktif akış).
*   **İkon Seti:** `lucide-react` (Modern ve sade tasarım dili için).
*   **Animasyonlar:** Tailwind transition sınıfları ve özel CSS animasyonları (Confetti efekti, coin sayma efekti).

---

## 2. Tasarım Sistemi & Renk Paleti (gemini.md Uyumlu)

*   **Primary (Ana İşlemler):** `#5B5BD6` (Vivid Indigo) | Koyu Mod: `#8E8EF5`
*   **Accent (Coin & Ödüller):** `#FFB020` (Warm Gold) | Koyu Mod: `#FFC24D`
*   **Success (Tamamlanan):** `#1FB873` (Vivid Green)
*   **Danger (Hata/Yetersiz Bakiye):** `#E5484D` (Vivid Red)
*   **Backgrounds:**
    *   Açık Mod: Arka plan `#FAFAFD`, Kartlar `#F6F6FB`, Yüzey `#FFFFFF`
    *   Koyu Mod: Arka plan `#0E0E14`, Kartlar `#22222E`, Yüzey `#181820`
*   **Border Radius:** Kartlar = `20px`, Butonlar = `16px`, Haplar = `999px`.

---

## 3. Veri Yapısı (State Schema)

`GIBStore` altındaki tüm veriler şu şemaya göre modellenecektir:

```typescript
interface User {
  name: string;
  avatar: {
    base: string;     // örn: "body-1"
    hat: string;      // örn: "crown-gold" | "none"
    glasses: string;  // örn: "glasses-black" | "none"
    outfit: string;   // örn: "hoodie-indigo"
    bg: string;       // örn: "gradient-sunset"
  };
  points: number;
  level: number;
  xp: number;
  department: string;
  lifeTimePoints: number;
}

interface ShopItem {
  id: string;
  name: string;
  category: "Şapka" | "Gözlük" | "Kıyafet" | "Arka Plan";
  price: number;
  rarity: "Common" | "Rare" | "Epic";
  isOwned: boolean;
  isEquipped: boolean;
  emoji: string;
}

interface JiraTask {
  id: string;       // GIB-12
  title: string;
  sp: number;
  status: "Todo" | "In_Progress" | "Done";
  pointsReward: number;
  visible: boolean; // Mobil simülatörde göster/gizle
}

interface CorporateEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  joinedCount: number;
  capacity: number;
  isJoined: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index (0-3)
  pointsReward: number;
}

interface Transaction {
  id: string;
  type: "plus" | "minus";
  description: string;
  amount: number;
  timestamp: string;
}

interface AuditLog {
  id: string;
  message: string;
  timestamp: string;
}
```

---

## 4. UI Düzeni & Çift Yönlü Akış

Ekran **İki Ana Sütuna (split-screen)** bölünecektir:
1.  **Sol Sütun (Genişlik: %70) - Admin Kontrol Paneli:**
    *   **Dashboard:** Sistem durum özeti + Jira Webhook Simülatörü + Canlı Audit Log Akışı.
    *   **Mağaza Yönetimi:** Yeni ürün ekleme, fiyat güncelleme, stok yönetimi.
    *   **Jira Görevleri:** Tüm görevleri listeleme, görünürlük toggle ve durumlarını değiştirme. (Görev ekleme formu YOK - scope dışı)
    *   **Etkinlikler:** Etkinlik oluşturma ve kapasite yönetimi.
2.  **Sağ Sütun (Genişlik: %30) - Canlı Mobil Simülatör (GİB Mobile Frame):**
    *   Etkileşimli iOS telefon çerçevesi.
    *   Alt Navigasyon (Home, Görevler, Shop, Oyna, Profil) aktif olarak çalışacak.
    *   Admin panelinden yapılan işlemler (örn: Mağazaya şapka ekleme) mobil simülatörün Shop kısmında anında belirecek.
    *   Mobil simülatörde yapılan işlemler (örn: Shop'tan şapka satın alma, görev tamamlama) Admin panelinin "Audit Log" akışına düşecek.

---

## 5. Hackathon Anti-Goals (Kapsam Dışı)

- ❌ Jira'da "Yeni Görev Ekle" formu — yerine pre-seeded tasks + Webhook simülatörü
- ❌ Veritabanı / Sunucu kurulumu — her şey localStorage ile client-side
- ❌ Gerçek Jira/Slack API entegrasyonu — simüle edilecek
- ❌ Canvas/SVG avatar çizim motoru — emoji + katman tabanlı
- ❌ React Router — tab tabanlı state navigasyonu yeterli

---

## 6. 6 Saatlik Hackathon Yol Haritası (Task Listesi)

*   **Task 1: Altyapı ve Proje Kurulumu (0.0 - 1.0 Saat)** ✅ TAMAMLANDI
    *   React + Vite projesinin ayağa kaldırılması ve Tailwind CSS v4 entegrasyonu.
    *   `GIBContext` (State Engine) oluşturulması, localStorage bağlantısı ve varsayılan mock verilerin yazılması.
    *   Çift bölmeli (Split-pane) ana layout şablonunun oluşturulması (`App.jsx`).
*   **Task 2: Tasarım Sistemi & UI Bileşenleri (1.0 - 1.5 Saat)** ✅ TAMAMLANDI
    *   `index.css` içine renk paleti, fontlar (Google Fonts - Inter) ve border-radius tanımlarının eklenmesi.
    *   PointBadge, AvatarView ve RarityRings gibi imza bileşenlerin kodlanması.
*   **Task 3: Canlı Mobil Simülatör (1.5 - 3.0 Saat)** ✅ TAMAMLANDI
    *   iOS telefon çerçevesinin tasarımı.
    *   Mobil uygulamanın 5 ana sekmesinin (Home, Görevler, Shop, Oyna, Profil) simülatör içinde kodlanması.
    *   Görev tamamlandığında çalışacak **Confetti + Puan Artışı** animasyonunun entegre edilmesi.
*   **Task 4: Admin Dashboard - Overview & Canlı Log Akışı (3.0 - 4.0 Saat)** ✅ TAMAMLANDI
    *   Admin özet kartları (KPI'lar) ve mini grafiklerin eklenmesi.
    *   Sistem hareketlerini canlı gösteren "Live Activity Feed" ve Jira Webhook tetikleyici buton grubunun yapılması.
*   **Task 5: Admin Panel - Modül Yönetimleri (Mağaza, Görev, Etkinlik) (4.0 - 5.0 Saat)** ✅ TAMAMLANDI
    *   Mağaza ürün yönetim listesi ve yeni ürün ekleme formu.
    *   Jira görev havuzu yönetimi (görünürlük toggle + durum değiştirme).
    *   Etkinlik oluşturma ve kapasite kontrol mekanizmaları.
*   **Task 6: İnce Ayar (Polishing), Hata Kontrolü & Teslim (5.0 - 6.0 Saat)** ← AKTİF
    *   App.jsx build hatasının düzeltilmesi.
    *   Koyu mod geçiş simülasyonu, responsive kontrolü.
    *   Kusursuz kullanıcı deneyimi için mikro-animasyonların eklenmesi.
    *   Build alma, doğrulama ve walkthrough dokümantasyonu.

---

## 7. Doğrulama ve Test Disiplini
Her task tamamlandığında:
1.  Derleme (build) alınarak hata olup olmadığı doğrulanacak.
2.  Bileşen bazlı state güncellemeleri kontrol edilecek.
3.  Hata yoksa bir sonraki task'a geçiş onayı kullanıcıdan alınacak.
