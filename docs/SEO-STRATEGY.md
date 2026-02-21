# SEO Stratejisi

## [>] Hedef

Google'da **"[Kaynak] [Hedef] Evden Eve Nakliyat"** ve benzeri anahtar kelimeler için **#1 sıralama**.

> **Not:** Tüm örnekler başlangıç için İstanbul-İzmir kullanır. Dashboard'dan değiştirilebilir.

## [◈] Anahtar Kelimeler

### Primary Keywords (Başlangıç Örneği: İstanbul-İzmir)
- [Kaynak] [Hedef] Evden Eve Nakliyat
- [Kaynak] [Hedef] Nakliyat
- [Kaynak] [Hedef] Ev Taşıma
- [Kaynak]'dan [Hedef]'e Nakliyat

### Secondary Keywords
- [Kaynak] [Bölge] Evden Eve Nakliyat (dashboard'dan eklenen bölgeler)
- [Hedef] Evden Eve Nakliyat Fiyatları
- [Kaynak] [Hedef] Nakliyat Ücreti
- Güvenilir Nakliyat Firması

### Long-tail Keywords
- [Kaynak]'dan [Hedef]'e ev taşıma fiyatları
- [Kaynak] [Hedef] arası nakliyat kaç para
- [Kaynak] [Hedef] nakliyat firması önerileri
- Asansörlü nakliyat [Kaynak] [Hedef]

## [◈] Schema.org Markup (15+ Schema)

### [!] Kritik: Schema Validation
**Her schema Google Rich Results Test ile doğrulanmalı:**
- https://search.google.com/test/rich-results
- https://validator.schema.org/
- Otomatik validation dashboard'a entegre edilmeli

### [!] JSON-LD @graph Kullanımı
**Tek sayfada birden fazla schema için @graph kullan:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { /* MovingCompany */ },
    { /* LocalBusiness */ },
    { /* BreadcrumbList */ },
    { /* FAQPage */ },
    { /* AggregateRating */ }
  ]
}
```

## [◈] Ana Schema'lar (7 Temel)

### 1. MovingCompany Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "{{SITE_NAME}}",
  "url": "{{SITE_URL}}",
  "logo": "{{SITE_URL}}/logo-beyaz.svg",
  "image": "{{SITE_URL}}/images/hero.jpg",
  "description": "{{SOURCE_CITY}}'dan {{TARGET_CITY}}'e profesyonel evden eve nakliyat hizmeti",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
    "addressLocality": "Pendik",
    "addressRegion": "İstanbul",
    "postalCode": "34890",
    "addressCountry": "TR"
  },
  "telephone": "{{SITE_PHONE}}",
  "email": "{{SITE_EMAIL}}",
  "priceRange": "1500₺ - 3500₺",
  "openingHours": "Mo-Sa 08:00-20:00, Su 09:00-18:00",
  "areaServed": [
    {
      "@type": "City",
      "name": "İstanbul"
    },
    {
      "@type": "City",
      "name": "İzmir"
    }
  ]
}
```

### 2. LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "İstanbul İzmir Evden Eve Nakliyat",
  "image": "https://istanbulizmirevtasima.com.tr/images/hero.jpg",
  "@id": "https://istanbulizmirevtasima.com.tr",
  "url": "https://istanbulizmirevtasima.com.tr",
  "telephone": "+905321384979",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaynarca Mah. Bahattin Veled Cad. No:37",
    "addressLocality": "Pendik",
    "addressRegion": "İstanbul",
    "postalCode": "34890",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.8783,
    "longitude": 29.2336
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

### 3. Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Evden Eve Nakliyat",
  "provider": {
    "@type": "MovingCompany",
    "name": "İstanbul İzmir Evden Eve Nakliyat"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "İstanbul"
    },
    {
      "@type": "City",
      "name": "İzmir"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Nakliyat Hizmetleri",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Asansörlü Nakliyat",
          "description": "Asansörlü binalarda profesyonel nakliyat hizmeti"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "1500-3000",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Asansörsüz Nakliyat",
          "description": "Asansörsüz binalarda profesyonel nakliyat hizmeti"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "1800-3500",
          "priceCurrency": "TRY"
        }
      }
    ]
  }
}
```

### 4. WebPage Schema (TOC ile)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "{{routeTitleEvdenEve}}",
  "url": "{{SITE_URL}}",
  "description": "{{SEO_DESCRIPTION}}",
  "inLanguage": "tr-TR",
  "hasPart": [
    {
      "@type": "WebPageElement",
      "name": "Hizmetlerimiz",
      "url": "{{SITE_URL}}#services",
      "position": 1
    },
    {
      "@type": "WebPageElement",
      "name": "Fiyatlandırma",
      "url": "{{SITE_URL}}#pricing",
      "position": 2
    },
    {
      "@type": "WebPageElement",
      "name": "Müşteri Yorumları",
      "url": "{{SITE_URL}}#reviews",
      "position": 3
    }
  ]
}
```

### 5. BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://istanbulizmirevtasima.com.tr"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "İstanbul Bornova Evden Eve Nakliyat",
      "item": "https://istanbulizmirevtasima.com.tr/istanbul-bornova"
    }
  ]
}
```

### 5. FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "İstanbul İzmir arası nakliyat ücreti ne kadar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "İstanbul İzmir arası nakliyat ücreti 1.500₺ ile 3.500₺ arasında değişmektedir. Fiyat, ev büyüklüğü ve asansör durumuna göre belirlenir."
      }
    },
    {
      "@type": "Question",
      "name": "İstanbul'dan İzmir'e kaç km?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "İstanbul'dan İzmir'e mesafe 482 km'dir. E87/O-4 otoyolu üzerinden yaklaşık 5.5 saat sürmektedir."
      }
    }
  ]
}
```

### 6. AggregateRating Schema (Ana Sayfada - Kritik!)
**Müşteri yorumları aggregate rating - Rich snippets için zorunlu:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{SITE_NAME}}",
  "url": "{{SITE_URL}}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ahmet Yılmaz"
      },
      "datePublished": "2026-01-15",
      "reviewBody": "Çok memnun kaldık. Eşyalarımız hiç zarar görmeden İzmir'e ulaştı.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    }
  ]
}
```

### 7. WebPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "İstanbul İzmir Evden Eve Nakliyat",
  "description": "İstanbul'dan İzmir'e profesyonel, güvenilir ve uygun fiyatlı evden eve nakliyat hizmeti",
  "url": "https://istanbulizmirevtasima.com.tr",
  "inLanguage": "tr-TR",
  "isPartOf": {
    "@type": "WebSite",
    "name": "İstanbul İzmir Evden Eve Nakliyat",
    "url": "https://istanbulizmirevtasima.com.tr"
  }
}
```

## [◈] Ek Schema'lar (8 İlave - SEO Güçlendirme)

### 8. Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{SITE_NAME}}",
  "url": "{{SITE_URL}}",
  "logo": "{{SITE_URL}}/logo-beyaz.svg",
  "description": "Profesyonel evden eve nakliyat hizmeti",
  "foundingDate": "2020",
  "sameAs": [
    "{{FACEBOOK_URL}}",
    "{{TWITTER_URL}}",
    "{{INSTAGRAM_URL}}",
    "{{LINKEDIN_URL}}"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{{SITE_PHONE}}",
    "contactType": "Customer Service",
    "areaServed": "TR",
    "availableLanguage": "Turkish"
  }
}
```

### 9. HowTo Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Evden Eve Nakliyat Nasıl Yapılır?",
  "description": "Profesyonel evden eve nakliyat süreci adım adım",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Fiyat Teklifi Alın",
      "text": "Online formdan veya telefon ile ücretsiz fiyat teklifi alın"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Randevu Belirleyin",
      "text": "Size uygun tarih ve saatte randevu oluşturun"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Paketleme",
      "text": "Profesyonel ekibimiz eşyalarınızı güvenli şekilde paketler"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Taşıma",
      "text": "Eşyalarınız sigortalı araçlarla güvenle taşınır"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Yerleştirme",
      "text": "Yeni adresinizde eşyalarınız yerleştirilir"
    }
  ]
}
```

### 10. ItemList Schema (Hizmet Bölgeleri Aggregate)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Hizmet Bölgelerimiz",
  "description": "Evden eve nakliyat hizmeti verdiğimiz bölgeler",
  "numberOfItems": 30,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "İstanbul Bornova Evden Eve Nakliyat",
        "url": "{{SITE_URL}}/istanbul-bornova"
      }
    }
    // ... diğer bölgeler
  ]
}
```

### 11. VideoObject Schema (Video içerikler için)
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Evden Eve Nakliyat Süreci",
  "description": "Profesyonel nakliyat sürecimizi videoda izleyin",
  "thumbnailUrl": "{{SITE_URL}}/images/video-thumb.jpg",
  "uploadDate": "2026-01-15",
  "duration": "PT2M30S",
  "contentUrl": "{{SITE_URL}}/videos/nakliyat-sureci.mp4"
}
```

### 12. ImageObject Schema (Görseller için)
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "{{SITE_URL}}/images/nakliyat.jpg",
  "caption": "Profesyonel evden eve nakliyat hizmeti",
  "creditText": "{{SITE_NAME}}",
  "copyrightNotice": "© {{SITE_NAME}}"
}
```

### 13. Article Schema (Blog yazıları için)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Evden Eve Nakliyat İpuçları",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_NAME}}"
  },
  "datePublished": "2026-02-20",
  "dateModified": "2026-02-20",
  "publisher": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{SITE_URL}}/logo-beyaz.svg"
    }
  }
}
```

### 14. Offer Schema (Detaylı teklifler için)
```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Asansörlü Nakliyat Teklifi",
  "price": "1500",
  "priceCurrency": "TRY",
  "availability": "https://schema.org/InStock",
  "validFrom": "2026-02-20",
  "priceValidUntil": "2026-12-31",
  "seller": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}"
  }
}
```

### 15. ContactPoint Schema (İletişim noktaları için)
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "telephone": "{{SITE_PHONE}}",
  "contactType": "Customer Service",
  "email": "{{SITE_EMAIL}}",
  "areaServed": "TR",
  "availableLanguage": ["Turkish"],
  "contactOption": "TollFree",
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }
}
```

## [★] Rich Snippets

### Hedeflenen Rich Snippets
- [★] **Yıldız Puanları** (AggregateRating)
- [₺] **Fiyat Aralıkları** (PriceSpecification)
- [□] **Stok Durumu** (Availability: InStock)
- [—] **Mesafe Bilgisi** (dashboard'dan)
- [○] **Süre Bilgisi** (dashboard'dan)
- [◇] **Telefon** (Click to call)
- [◇] **Adres** (Google Maps entegrasyonu)
- [○] **Çalışma Saatleri** (OpeningHours)

### Google Search Console'da Görünüm
```
İstanbul İzmir Evden Eve Nakliyat
https://istanbulizmirevtasima.com.tr
⭐⭐⭐⭐⭐ 4.8 (127 değerlendirme)
1.500₺ - 3.500₺ · Stokta var
📏 482 km · ⏱️ 5.5 saat · 📞 +90 532 138 4979
Açık · Pazartesi-Cumartesi 08:00-20:00
```

## [◇] Meta Tags

### [!] Kritik Meta Tags (Her Sayfada Zorunlu)

#### Viewport Meta Tag (Mobile-First İçin Kritik)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

#### Robots Meta Tag
```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

#### Author & Publisher
```html
<meta name="author" content="{{SITE_NAME}}">
<meta property="article:publisher" content="{{FACEBOOK_URL}}">
```

#### Language & Hreflang
```html
<meta http-equiv="content-language" content="tr">
<link rel="alternate" hreflang="tr" href="{{SITE_URL}}">
<link rel="alternate" hreflang="x-default" href="{{SITE_URL}}">
```

### Ana Sayfa
```html
<title>{{SOURCE_CITY}} {{TARGET_CITY}} Evden Eve Nakliyat | Güvenilir & Uygun Fiyat</title>
<meta name="description" content="{{SOURCE_CITY}}'dan {{TARGET_CITY}}'e profesyonel evden eve nakliyat hizmeti. {{DISTANCE}} km mesafe, {{DURATION}} saat. Asansörlü {{PRICE_MIN}}₺'den başlayan fiyatlar." />
<meta name="keywords" content="istanbul izmir evden eve nakliyat, istanbul izmir nakliyat, istanbul izmir ev taşıma, nakliyat fiyatları" />
<link rel="canonical" href="https://istanbulizmirevtasima.com.tr" />
```

### Bölge Sayfası (Örnek: İstanbul Bornova)
```html
<title>İstanbul Bornova Evden Eve Nakliyat | 478 km - 5.4 Saat</title>
<meta name="description" content="İstanbul'dan Bornova'ya evden eve nakliyat. 478 km mesafe, 5.4 saat. Profesyonel paketleme, sigortalı taşıma. 1500₺'den başlayan fiyatlar." />
<meta name="keywords" content="istanbul bornova nakliyat, istanbul bornova evden eve, bornova nakliyat fiyatları" />
<link rel="canonical" href="https://istanbulizmirevtasima.com.tr/istanbul-bornova" />
```

## [◇] Open Graph & Twitter Cards

### Open Graph
```html
<meta property="og:type" content="website" />
<meta property="og:title" content="İstanbul İzmir Evden Eve Nakliyat" />
<meta property="og:description" content="İstanbul'dan İzmir'e profesyonel evden eve nakliyat hizmeti. 482 km, 5.5 saat. 1500₺'den başlayan fiyatlar." />
<meta property="og:url" content="https://istanbulizmirevtasima.com.tr" />
<meta property="og:image" content="https://istanbulizmirevtasima.com.tr/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="tr_TR" />
<meta property="og:site_name" content="İstanbul İzmir Evden Eve Nakliyat" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="İstanbul İzmir Evden Eve Nakliyat" />
<meta name="twitter:description" content="İstanbul'dan İzmir'e profesyonel evden eve nakliyat hizmeti. 482 km, 5.5 saat." />
<meta name="twitter:image" content="https://istanbulizmirevtasima.com.tr/images/twitter-card.jpg" />
```

## [◇] Sitemap.xml

### Otomatik Oluşturma
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://istanbulizmirevtasima.com.tr</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://istanbulizmirevtasima.com.tr/hakkimizda</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://istanbulizmirevtasima.com.tr/iletisim</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- 30 bölge sayfası -->
  <url>
    <loc>https://istanbulizmirevtasima.com.tr/istanbul-bornova</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... -->
</urlset>
```

### Özellikler
- Otomatik güncelleme (yeni bölge eklendiğinde)
- Domain değişikliğinde yeniden oluşturma
- Google Search Console'a otomatik gönderim

## [◇] robots.txt

```txt
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/

Sitemap: https://istanbulizmirevtasima.com.tr/sitemap.xml
```

## [◈] İçerik Stratejisi

### [!] Keyword Density (Anahtar Kelime Yoğunluğu)
**Hedef yoğunluklar:**
- **Primary Keyword:** %1-2 (örn: "İstanbul İzmir Evden Eve Nakliyat")
- **Secondary Keywords:** %0.5-1% (örn: "nakliyat fiyatları", "ev taşıma")
- **LSI Keywords:** Doğal kullanım (örn: "taşımacılık", "eşya taşıma", "paketleme")

**Kontrol:**
- Keyword stuffing yapma (max %3)
- Doğal cümle yapısı koru
- Synonyms ve variations kullan

### [!] Content Length Guidelines (İçerik Uzunluğu)
**Minimum kelime sayıları:**
- **Ana Sayfa:** 1500-2000 kelime
- **Bölge Sayfaları:** 800-1000 kelime
- **Hakkımızda:** 600-800 kelime
- **Blog Yazıları:** 1200-1500 kelime
- **Hizmet Sayfaları:** 500-700 kelime

**Neden önemli:**
- Google uzun içeriği tercih eder
- Thin content penalty riski azalır
- Daha fazla keyword fırsatı
- Kullanıcı engagement artar

### [!] Content Freshness (İçerik Tazeliği)
**Güncelleme sıklığı:**
- **Ana Sayfa:** Aylık güncelleme
- **Bölge Sayfaları:** 3 ayda bir
- **Blog:** Haftalık yeni içerik
- **Fiyatlar:** Anlık güncelleme
- **Yorumlar:** Haftalık yeni yorum

### İlk 200 Kelime (Kritik!)
Ana sayfada hero section'dan hemen sonra gelen SEO makale alanı:

**Örnek:**
> # İstanbul İzmir Evden Eve Nakliyat - Profesyonel Taşımacılık
> 
> İstanbul'dan İzmir'e evden eve nakliyat hizmeti arıyorsanız doğru yerdesiniz. 482 km mesafe, 5.5 saatlik yolculuk boyunca eşyalarınız güvende. Profesyonel ekibimiz, modern araçlarımız ve 10 yıllık tecrübemizle ev taşıma işlemlerinizi sorunsuz gerçekleştiriyoruz.
> 
> **Neden Bizi Tercih Etmelisiniz?**
> - ✅ Sigortalı taşıma garantisi
> - ✅ Profesyonel paketleme malzemeleri
> - ✅ Eşya montaj/demontaj hizmeti
> - ✅ 7/24 müşteri desteği
> - ✅ Uygun fiyat garantisi
> 
> İstanbul İzmir arası nakliyat fiyatlarımız 1.500₺'den başlamaktadır. Asansörlü binalarda 1.500₺ - 3.000₺, asansörsüz binalarda ise 1.800₺ - 3.500₺ arasında değişen fiyatlarımız bulunmaktadır...

### Alt SEO Makale Alanı
Sayfa sonunda detaylı içerik:

**Konular:**
- İstanbul İzmir arası nakliyat süreci
- Fiyatları etkileyen faktörler
- Nakliyat öncesi hazırlık
- Eşya paketleme ipuçları
- Sigorta ve güvence
- Müşteri yorumları
- SSS (detaylı)

## [◈] Müşteri Yorumları & Aggregate Rating (Kritik!)

### Ana Sayfada Yorumlar Section
**Zorunlu öğeler:**
- Minimum 10 gerçek müşteri yorumu
- Aggregate rating (ortalama puan)
- Review count (toplam yorum sayısı)
- Her yorumda: İsim, tarih, puan, yorum metni
- Fotoğraflı yorumlar (opsiyonel)

**Schema implementation:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ahmet Yılmaz"
      },
      "datePublished": "2026-01-15",
      "reviewBody": "Çok memnun kaldık. Eşyalarımız hiç zarar görmeden İzmir'e ulaştı. Profesyonel ekip, güler yüzlü hizmet. Kesinlikle tavsiye ederim.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]
}
```

**Rich Snippets için:**
- Google'da yıldızlar görünsün ⭐⭐⭐⭐⭐
- Review count görünsün (127 değerlendirme)
- Click-through rate (CTR) %40-60 artar

### Hizmet Bölgeleri Aggregate
**ItemList schema ile:**
```json
{
  "@type": "ItemList",
  "name": "Hizmet Bölgelerimiz",
  "numberOfItems": 30,
  "itemListElement": [
    // Tüm bölgeler burada listelenir
  ]
}
```

**Faydaları:**
- Google'da "Hizmet Bölgeleri" rich snippet
- Tüm bölgeler tek seferde indexlenir
- Internal linking güçlenir

## [>] On-Page SEO Checklist

### Her Sayfa İçin
- ✅ Unique title tag (50-60 karakter)
- ✅ Unique meta description (150-160 karakter)
- ✅ Meta keywords (10-15 kelime)
- ✅ H1 tag (1 adet, keyword içermeli)
- ✅ H2-H6 tags (hiyerarşik yapı)
- ✅ Alt text (tüm görsellerde)
- ✅ Internal linking
- ✅ Canonical URL
- ✅ Schema.org markup
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Mobile-friendly
- ✅ Fast loading (Core Web Vitals)

### URL Yapısı
- ✅ Kısa ve açıklayıcı
- ✅ Türkçe karakter yok (slug)
- ✅ Tire (-) ile ayrılmış
- ✅ Keyword içermeli

**Örnekler:**
- ✅ `/istanbul-bornova`
- ✅ `/istanbul-cesme`
- ❌ `/bölge/123`
- ❌ `/region?id=istanbul-bornova`

## [◈] Technical SEO

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Optimizasyonlar
- ✅ Next.js Image optimization
- ✅ WebP format
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Minification (CSS, JS)
- ✅ Gzip compression
- ✅ CDN (Vercel Edge Network)
- ✅ HTTP/2
- ✅ Preload critical resources
- ✅ Defer non-critical JS

### Mobile-First
- ✅ Responsive design
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Readable font sizes (min 16px)
- ✅ Viewport meta tag
- ✅ Mobile-friendly navigation

## [◇] Off-Page SEO

### Backlink Stratejisi
- KARAKAR Web footer linki (her sayfada)
- Yerel dizinler (Google My Business, Yandex)
- Sosyal medya profilleri
- İş ortağı siteleri

### Local SEO
- Google My Business profili
- Yandex Haritalar
- Yerel dizinler
- NAP (Name, Address, Phone) tutarlılığı

## [◈] Analytics & Tracking

### Google Analytics GA4
- Sayfa görüntülemeleri
- Kullanıcı davranışları
- Dönüşüm takibi (form gönderimi)
- Bounce rate
- Session duration

### Google Tag Manager
- Event tracking
- Custom events
- E-commerce tracking (fiyat teklifi)

### Google Search Console
- Arama performansı
- İndeksleme durumu
- Sitemap gönderimi
- Hata raporları
- Core Web Vitals

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Proje context'i
- [TECH-STACK.md](TECH-STACK.md) - Teknoloji detayları
- [FILE-STRUCTURE.md](FILE-STRUCTURE.md) - Dosya yapısı
- [DASHBOARD.md](DASHBOARD.md) - Dashboard özellikleri
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment rehberi

## [▷] Sonraki Adım

[STEP-11-SEO-IMPLEMENTATION.md](STEP-11-SEO-IMPLEMENTATION.md) ile SEO implementasyonuna başlayın.
