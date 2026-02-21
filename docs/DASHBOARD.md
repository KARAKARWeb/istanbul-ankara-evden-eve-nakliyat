# Dashboard Özellikleri

## [>] Genel Bakış

Admin paneli, sitenin tüm içeriğini, ayarlarını ve SEO özelliklerini yönetmek için kullanılır.

**URL:** `/dashboard`

## [◆] Authentication

### Basit Şifre Sistemi
- Tek kullanıcı
- Şifre bcrypt ile hash'lenir
- Environment variable'da saklanır
- Rate limiting (brute force koruması)

### Login Flow
```
1. Kullanıcı /dashboard'a gider
2. Login sayfasına yönlendirilir
3. Şifre girer
4. bcrypt ile doğrulama
5. Session cookie oluşturulur
6. Dashboard'a erişim
```

### Environment Variable
```bash
DASHBOARD_PASSWORD_HASH=<bcrypt_hash>
```

**Şifre hash oluşturma:**
```bash
npm run generate-password
# Veya manuel:
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### Rate Limiting
- 5 başarısız deneme → 15 dakika ban
- IP bazlı takip
- Otomatik temizleme (24 saat)

## [□] Dashboard Menü Yapısı

### Yeni Eklenen Menüler (SEO)
- **SEO > Schema Yönetimi** - 15+ schema editörü
- **SEO > GMB Entegrasyonu** - Google My Business yönetimi
- **SEO > NAP Consistency** - Name, Address, Phone tutarlılık kontrolü
- **SEO > Monitoring** - Core Web Vitals, Analytics
- **İçerik > Yorumlar** - Müşteri yorumları yönetimi

## [□] Dashboard Menü Yapısı (Güncellenmiş)

```
Dashboard
├── [▣] Genel Bakış
│   ├── İstatistikler
│   ├── Son eklenen bölgeler
│   └── Hızlı erişim
│
├── [◆] Ayarlar
│   ├── Site Bilgileri
│   │   ├── Domain
│   │   ├── Site adı
│   │   ├── Logo (beyaz/koyu)
│   │   └── Favicon
│   ├── İletişim Bilgileri
│   │   ├── Adres
│   │   ├── Telefon
│   │   ├── E-posta
│   │   └── Sosyal medya
│   ├── Çalışma Saatleri
│   │   ├── Hafta içi
│   │   ├── Cumartesi
│   │   └── Pazar
│   ├── Rota Bilgileri (Kaynak-Hedef Şehir)
│   │   ├── Kaynak Şehir
│   │   ├── Hedef Şehir
│   │   ├── Mesafe (km)
│   │   ├── Süre (saat)
│   │   └── Rota (otoyol)
│   └── Özel Kodlar
│       ├── <head> içine
│       ├── <body> başına
│       └── </body> önüne
│
├── [◈] SEO
│   ├── Genel SEO
│   │   ├── Ana sayfa title
│   │   ├── Ana sayfa description
│   │   ├── Meta keywords
│   │   └── Canonical URL
│   ├── Schema.org
│   │   ├── MovingCompany
│   │   ├── LocalBusiness
│   │   ├── Service
│   │   ├── BreadcrumbList
│   │   ├── FAQPage
│   │   ├── Review + AggregateRating
│   │   └── WebPage
│   ├── Open Graph
│   │   ├── OG title
│   │   ├── OG description
│   │   ├── OG image
│   │   └── Twitter Cards
│   └── Sitemap
│       ├── Otomatik oluşturma
│       ├── Öncelikler
│       └── Güncelleme sıklığı
│
├── [□] Ana Sayfa
│   ├── Hero
│   │   ├── Başlık
│   │   ├── Alt başlık
│   │   ├── CTA buton
│   │   └── Arka plan görseli
│   ├── SEO Makale (Üst)
│   │   ├── Başlık
│   │   └── İçerik (TipTap)
│   ├── Hizmetler
│   │   ├── Hizmet 1-4 (kart)
│   │   ├── İkon
│   │   ├── Başlık
│   │   └── Açıklama
│   ├── Neden Biz?
│   │   ├── Özellik 1-6
│   │   ├── İkon
│   │   ├── Başlık
│   │   └── Açıklama
│   ├── Fiyatlandırma
│   │   └── (Genel fiyat tablosundan çeker)
│   ├── SSS
│   │   ├── Soru-Cevap ekle/düzenle/sil
│   │   └── Sıralama
│   ├── Yorumlar
│   │   ├── Yorum ekle/düzenle/sil
│   │   ├── İsim
│   │   ├── Yıldız (1-5)
│   │   ├── Metin
│   │   └── Fotoğraf
│   ├── SEO Makale (Alt)
│   │   ├── Başlık
│   │   └── İçerik (TipTap)
│   └── CTA
│       ├── Başlık
│       ├── Açıklama
│       └── Buton metni
│
├── [◇] Hizmet Bölgeleri
│   ├── Tüm Bölgeler (Liste)
│   │   ├── Tablo görünümü
│   │   ├── Arama
│   │   ├── Filtreleme
│   │   └── Sıralama
│   ├── Yeni Ekle
│   │   ├── Başlangıç noktası (dropdown)
│   │   ├── Bitiş noktası (dropdown)
│   │   ├── Tam başlık (manuel)
│   │   ├── URL (otomatik/manuel)
│   │   ├── Mesafe (km)
│   │   ├── Süre (saat)
│   │   ├── Fiyat aralığı
│   │   ├── Görsel yükle
│   │   ├── İçerik (TipTap)
│   │   ├── FAQ ekle
│   │   └── SEO (title, description, keywords)
│   └── Toplu Ekle
│       ├── H1 listesi (textarea)
│       ├── Otomatik mesafe/süre (Google Maps API)
│       ├── Manuel düzenleme
│       ├── Varsayılan fiyat
│       └── Varsayılan görsel
│
├── [₺] Fiyatlandırma
│   ├── Genel Fiyatlar
│   │   ├── Asansörlü (min-max)
│   │   ├── Asansörsüz (min-max)
│   │   └── Ev tipleri (1+0, 1+1, 2+1, 3+1, 4+1, Villa)
│   ├── Bölge Katsayıları
│   │   ├── Bölge seç
│   │   └── Katsayı (%)
│   └── Formül Ayarları
│       ├── Mesafe katsayısı
│       ├── Ev tipi katsayısı
│       └── Asansör katsayısı
│
├── [□] Sayfalar
│   ├── Hakkımızda
│   │   ├── İçerik (TipTap)
│   │   └── SEO
│   ├── İletişim
│   │   ├── Harita embed
│   │   ├── Form ayarları
│   │   └── SEO
│   └── Gizlilik/Kullanım Şartları
│       ├── İçerik (TipTap)
│       └── SEO
│
├── [◇] Footer
│   ├── Katman 1 (Linkler)
│   │   ├── Link ekle/düzenle/sil
│   │   ├── Başlık
│   │   ├── URL
│   │   ├── Rel (nofollow, sponsored, vb.)
│   │   └── Sıralama
│   ├── Katman 2 (İçerik)
│   │   ├── Sütun sayısı (4-6)
│   │   ├── Sütun başlıkları
│   │   └── Sütun içerikleri
│   ├── Katman 3 (Linkler)
│   │   ├── Link ekle/düzenle/sil
│   │   ├── Başlık
│   │   ├── URL
│   │   ├── Rel
│   │   └── Sıralama
│   └── Katman 4 (Copyright/Developer)
│       ├── Copyright metni (sol)
│       └── Developer logo (sağ - KARAKAR Web)
│           ├── Logo: https://karakar.web.tr/KARAKAR-Web-Logo-1.webp
│           ├── Alt Text: "Web Tasarım Ajansı"
│           ├── Link: https://karakar.web.tr (dofollow)
│           └── Hover efekti: opacity 0.8
│
└── [▢] Medya
    ├── Görseller
    │   ├── Yükle (drag & drop)
    │   ├── Otomatik optimize (Sharp)
    │   ├── WebP dönüşümü
    │   ├── Önizleme
    │   ├── URL kopyala
    │   └── Sil
    └── Dosya Bilgileri
        ├── Boyut
        ├── Format
        └── Yükleme tarihi
```

## [!] ÖNEMLİ: Full-Page Editor (Dialog Değil!)

### Editor Tasarımı
**Geniş ekran, full-page editor:**
- ❌ Dialog/Modal içinde AÇILMAZ
- ✅ Ayrı sayfa olarak açılır (`/dashboard/content/edit/[id]`)
- ✅ Tam ekran çalışma alanı
- ✅ Split view (editor + preview)
- ✅ Distraction-free mode

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Header: Kaydet | Önizleme | Kapat                       │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│  Editor (Sol)            │  Preview (Sağ)               │
│  - TipTap editor         │  - Gerçek zamanlı önizleme   │
│  - Toolbar               │  - Site tasarımında          │
│  - Tam genişlik          │  - Responsive preview        │
│                          │                              │
│                          │                              │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

**Özellikler:**
- Split view (50/50 veya 60/40)
- Toggle preview (editor full-width)
- Distraction-free mode (sadece editor)
- Auto-save (her 30 saniyede)
- Keyboard shortcuts (Cmd+S save, Cmd+P preview)

## [◇] TipTap Editor Özellikleri

### Toolbar
```
[B] [I] [U] [S] | [H1] [H2] [H3] | [•] [1.] | [🔗] [🖼️] | [📊] | [</>] | [🎨]
```

### Özellikler
- **Bold, Italic, Underline, Strikethrough**
- **Headings** (H1-H6)
- **Lists** (Bullet, Numbered)
- **Links** (URL + title)
- **Images** (Upload + URL)
- **Tables** (Ekle, düzenle, sil)
- **Code blocks** (Syntax highlighting)
- **Color picker** (Text + background)
- **Undo/Redo**
- **HTML görüntüleme**
- **Frontend preview**

### Frontend Preview
Editor'ün yanında gerçek zamanlı önizleme:
```
┌─────────────────┬─────────────────┐
│   TipTap Editor │ Frontend Preview│
│                 │                 │
│  [Toolbar]      │  [Gerçek görünüm]│
│                 │                 │
│  İçerik yazma   │  Nasıl görünecek│
│  alanı...       │  gösterir...    │
│                 │                 │
└─────────────────┴─────────────────┘
```

## [₺] Fiyatlandırma Tablosu Editörü

### Dashboard Görünümü
```
┌──────────────────────────────────────────────┐
│ Genel Fiyatlandırma Tablosu                  │
├──────────────┬─────────────┬─────────────────┤
│ Ev Tipi      │ Asansörlü   │ Asansörsüz      │
├──────────────┼─────────────┼─────────────────┤
│ 1+0          │ [1500-3000] │ [1800-3500]     │
│ 1+1          │ [1500-3000] │ [1800-3500]     │
│ 2+1          │ [1500-3000] │ [1800-3500]     │
│ 3+1          │ [1500-3000] │ [1800-3500]     │
│ 4+1          │ [1500-3000] │ [1800-3500]     │
│ Villa        │ [1500-3000] │ [1800-3500]     │
└──────────────┴─────────────┴─────────────────┘

[Kaydet] [Önizle]
```

### Frontend Görünümü (Premium)
```
╔═══════════════════════════════════════════════╗
║     FİYATLANDIRMA - [KAYNAK] [HEDEF]        ║
╠═══════════════════════════════════════════════╣
║                                               ║
║  [▣] ASANSÖRLÜ                                ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
║  1.500₺ - 3.000₺                             ║
║                                               ║
║  1+0  1+1  2+1  3+1  4+1  Villa              ║
║                                               ║
║  [▢] ASANSÖRSÜZ                               ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
║  1.800₺ - 3.500₺                             ║
║                                               ║
║  1+0  1+1  2+1  3+1  4+1  Villa              ║
║                                               ║
║  [—] Mesafe: 482 km  [○] Süre: 5.5 saat      ║
║  [→] Rota: E87/O-4 Otoyolu                   ║
║                                               ║
║  [▷] Hemen Teklif Al                         ║
╚═══════════════════════════════════════════════╝
```

**Özellikler:**
- Gradient arka plan (light tonlar)
- Hover efektleri
- İkonlar
- Responsive (mobilde stack)
- JSON-LD schema uyumlu

## [◈] Hakkımızda Sayfası Editörü (Yeni!)

### Dashboard'dan Tam Düzenleme
**Sayfa:** `/dashboard/content/hakkimizda`

**Özellikler:**
- ✅ TipTap editor ile tam düzenleme
- ✅ Full-page editor (dialog değil!)
- ✅ Split view (editor + preview)
- ✅ Görsel yükleme ve yönetimi
- ✅ SEO ayarları (title, description, keywords)
- ✅ Schema.org markup (AboutPage)
- ✅ Auto-save
- ✅ Revizyon geçmişi
- ✅ Önizleme

### İçerik Bölümleri
**Dashboard'dan düzenlenebilir:**
1. **Hikayemiz** - Şirket hikayesi
2. **Misyon & Vizyon** - Misyon ve vizyon metinleri
3. **Değerlerimiz** - Şirket değerleri (liste)
4. **Ekibimiz** - Ekip üyeleri (fotoğraf + bio)
5. **Sertifikalar & Ödüller** - Sertifika ve ödül listesi
6. **İstatistikler** - Sayısal veriler (10+ yıl, 5000+ müşteri, vb.)

### Hakkımızda Page Schema
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "foundingDate": "2015",
    "founders": [{
      "@type": "Person",
      "name": "{{FOUNDER_NAME}}"
    }],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 50
    },
    "award": [
      "2023 Yılın Nakliyat Firması",
      "2022 Müşteri Memnuniyeti Ödülü"
    ]
  }
}
```

### Editor Layout
```typescript
// /dashboard/content/hakkimizda/page.tsx
export default function AboutPageEditor() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1>Hakkımızda Sayfası Düzenle</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            Önizleme
          </Button>
          <Button onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </header>

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor (Sol) */}
        <div className="flex-1 overflow-y-auto p-6">
          <TipTapEditor
            content={content}
            onChange={setContent}
          />
        </div>

        {/* Preview (Sağ) */}
        {showPreview && (
          <div className="flex-1 border-l overflow-y-auto p-6 bg-gray-50">
            <AboutPagePreview content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
```

## [◈] Schema Yönetimi (Yeni!)

### Schema Editörü
**Özellikler:**
- 15+ schema tipi
- JSON-LD editör (syntax highlighting)
- Template variables desteği
- Schema validation (Google Rich Results Test API)
- Schema preview
- Otomatik schema generation

**Schema Tipleri:**
1. MovingCompany
2. LocalBusiness
3. Service
4. BreadcrumbList
5. FAQPage
6. AggregateRating
7. Review
8. Organization
9. HowTo
10. ItemList (Hizmet Bölgeleri)
11. VideoObject
12. ImageObject
13. Article
14. Offer
15. ContactPoint

### Schema Validation
```typescript
// Otomatik validation
export async function validateSchema(schema: object) {
  const response = await fetch(
    'https://search.google.com/test/rich-results',
    {
      method: 'POST',
      body: JSON.stringify(schema),
    }
  );
  
  return response.json();
}
```

## [◈] GMB Entegrasyonu (Yeni!)

### Google My Business Yönetimi
**Dashboard'dan:**
- GMB profil bilgileri güncelleme
- Otomatik post paylaşımı
- Review yönetimi ve yanıtlama
- Q&A yönetimi
- Fotoğraf galerisi yönetimi
- İstatistikler ve raporlar

### 5. Bölge Yönetimi
- Bölge ekleme/düzenleme/silme
- Bölge bilgileri (mesafe, süre, fiyat)
- Bölge SEO ayarları
- Bölge içerik yönetimi
- **Bölge Rating Yönetimi (Yeni!)**
  - Her bölge için ayrı aggregate rating
  - Otomatik rating oluşturma (4.5-4.9 arası)
  - Otomatik yorum oluşturma (5-10 adet)
  - Manuel rating düzenleme
  - Yorum ekleme/düzenleme/silme
  - Rating istatistikleri
  - Google Rich Snippets önizleme ve yanıtlama

### GMB API Entegrasyonu
```typescript
// GMB post oluşturma
export async function createGMBPost(content: string, imageUrl?: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/business.manage'],
  });

  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

  return await mybusiness.accounts.locations.localPosts.create({
    parent: `accounts/${process.env.GMB_ACCOUNT_ID}/locations/${process.env.GMB_LOCATION_ID}`,
    requestBody: {
      languageCode: 'tr',
      summary: content,
      media: imageUrl ? [{ mediaFormat: 'PHOTO', sourceUrl: imageUrl }] : [],
    },
  });
}
```

### Review Management
**Özellikler:**
- GMB yorumlarını otomatik çekme
- Yorumlara yanıt verme
- Yorum istatistikleri
- Uyarı sistemi (yeni yorum, düşük puan)

## [◈] NAP Consistency Checker (Yeni!)

### Tutarlılık Kontrolü
**Kontrol edilen platformlar:**
- Google My Business
- Yandex Haritalar
- Facebook Business
- Instagram Business
- LinkedIn Company
- Yerel dizinler

### Otomatik Senkronizasyon
```typescript
// NAP güncelleme
export async function syncNAPToAllPlatforms(napData: NAPData) {
  const platforms = [
    'google_my_business',
    'yandex_maps',
    'facebook',
    'instagram',
  ];
  
  for (const platform of platforms) {
    await updateNAPOnPlatform(platform, napData);
  }
}
```

### Validation
**Kontrol edilen:**
- İşletme adı tutarlılığı
- Adres formatı
- Telefon formatı (+90 532 138 4979)
- E-posta adresi

## [◆] Domain Değişikliği

### Dashboard'dan Domain Değiştirme
```
┌──────────────────────────────────────┐
│ Site Bilgileri                       │
├──────────────────────────────────────┤
│ Domain:                              │
│ [istanbulizmirevtasima.com.tr]      │
│                                      │
│ Site Adı:                            │
│ [İstanbul İzmir Evden Eve Nakliyat] │
│                                      │
│ [Kaydet]                             │
└──────────────────────────────────────┘
```

### Otomatik Güncellemeler
Domain değiştirildiğinde:
1. ✅ Sitemap.xml yeniden oluşturulur
2. ✅ Tüm schema.org @id ve url alanları güncellenir
3. ✅ Open Graph og:url güncellenir
4. ✅ Canonical URL'ler güncellenir
5. ✅ Internal linkler güncellenir
6. ✅ Email domain güncellenir
7. ✅ Cache temizlenir
8. ✅ Kullanıcıya uyarı gösterilir

### Uyarı Mesajı
```
┌──────────────────────────────────────────────┐
│ ⚠️ Domain Değiştirildi                       │
├──────────────────────────────────────────────┤
│ Domain başarıyla güncellendi.                │
│                                              │
│ Yapılan değişiklikler:                       │
│ ✓ Sitemap yeniden oluşturuldu                │
│ ✓ SEO schema'ları güncellendi                │
│ ✓ Cache temizlendi                           │
│                                              │
│ Sonraki adım:                                │
│ Vercel'de yeniden deploy edin.               │
│                                              │
│ [Tamam]                                      │
└──────────────────────────────────────────────┘
```

## [◇] Google Maps API Entegrasyonu

### API Key Yönetimi
```
┌──────────────────────────────────────┐
│ Google Maps API                      │
├──────────────────────────────────────┤
│ API Key:                             │
│ [••••••••••••••••••••••••••••]      │
│                                      │
│ Durum: ✅ Aktif                      │
│                                      │
│ [Test Et] [Kaydet]                   │
└──────────────────────────────────────┘
```

### Toplu Bölge Eklemede Kullanım
```
┌──────────────────────────────────────────────┐
│ Toplu Hizmet Bölgesi Ekle                    │
├──────────────────────────────────────────────┤
│ Bölge Listesi:                               │
│ ┌──────────────────────────────────────────┐ │
│ │ İstanbul Karşıyaka Evden Eve Nakliyat   │ │
│ │ İstanbul Bornova Evden Eve Nakliyat     │ │
│ │ İstanbul Çeşme Evden Eve Nakliyat       │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [🗺️ Mesafe/Süre Otomatik Hesapla]           │
│ [✏️ Manuel Düzenle]                          │
│                                              │
│ Hesaplanan Bilgiler:                         │
│ • Karşıyaka: 482 km, 5.5 saat               │
│ • Bornova: 478 km, 5.4 saat                 │
│ • Çeşme: 520 km, 6.2 saat                   │
│                                              │
│ [Oluştur] [İptal]                            │
└──────────────────────────────────────────────┘
```

## [▢] Medya Yönetimi

### Görsel Yükleme
```
┌──────────────────────────────────────────────┐
│ Görsel Yükle                                 │
├──────────────────────────────────────────────┤
│                                              │
│   ┌────────────────────────────────────┐    │
│   │  Sürükle & Bırak                   │    │
│   │  veya                               │    │
│   │  [Dosya Seç]                        │    │
│   └────────────────────────────────────┘    │
│                                              │
│ Desteklenen formatlar: JPG, PNG, WebP       │
│ Maksimum boyut: 4.5 MB                       │
│                                              │
│ Otomatik işlemler:                           │
│ ✓ WebP dönüşümü                              │
│ ✓ Boyut optimizasyonu                        │
│ ✓ Lazy loading                               │
│                                              │
└──────────────────────────────────────────────┘
```

### Yüklenen Görseller
```
┌──────────────────────────────────────────────┐
│ Medya Kütüphanesi                            │
├──────────────────────────────────────────────┤
│                                              │
│ [Arama...] [Filtrele ▼] [Sırala ▼]         │
│                                              │
│ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │            │
│ │ 250KB  │ │ 180KB  │ │ 320KB  │            │
│ │ WebP   │ │ WebP   │ │ WebP   │            │
│ │[Kopyala]│ │[Kopyala]│ │[Kopyala]│          │
│ │ [Sil]  │ │ [Sil]  │ │ [Sil]  │            │
│ └────────┘ └────────┘ └────────┘            │
│                                              │
└──────────────────────────────────────────────┘
```

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Proje context'i
- [TECH-STACK.md](TECH-STACK.md) - Teknoloji detayları
- [FILE-STRUCTURE.md](FILE-STRUCTURE.md) - Dosya yapısı
- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment rehberi

## [▷] Sonraki Adım

[STEP-03-DASHBOARD-AUTH.md](STEP-03-DASHBOARD-AUTH.md) ile dashboard authentication'ı kurmaya başlayın.
