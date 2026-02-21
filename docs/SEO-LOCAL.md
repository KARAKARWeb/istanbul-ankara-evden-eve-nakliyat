# Local SEO Stratejisi

## [>] Google My Business (GMB) Entegrasyonu

### GMB Profil Oluşturma
**Zorunlu bilgiler:**
- İşletme adı: {{SITE_NAME}}
- Kategori: Moving Company, Local Business
- Adres: {{BUSINESS_ADDRESS}}
- Telefon: {{SITE_PHONE}}
- Website: {{SITE_URL}}
- Çalışma saatleri: Pazartesi-Cumartesi 08:00-20:00, Pazar 09:00-18:00
- Hizmet alanları: İstanbul, İzmir, Ankara (dashboard'dan eklenebilir)

### GMB API Entegrasyonu
```typescript
// lib/gmb/client.ts
import { google } from 'googleapis';

export async function createGMBPost(content: string, imageUrl?: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/business.manage'],
  });

  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

  const post = {
    languageCode: 'tr',
    summary: content,
    media: imageUrl ? [{
      mediaFormat: 'PHOTO',
      sourceUrl: imageUrl,
    }] : [],
    topicType: 'STANDARD',
  };

  return await mybusiness.accounts.locations.localPosts.create({
    parent: `accounts/${process.env.GMB_ACCOUNT_ID}/locations/${process.env.GMB_LOCATION_ID}`,
    requestBody: post,
  });
}
```

### Otomatik GMB Post Paylaşımı
**Dashboard'dan:**
- Yeni blog yazısı → GMB'ye otomatik post
- Özel kampanya → GMB'ye post
- Müşteri yorumu → GMB'ye paylaş
- Fotoğraf galerisi → GMB'ye ekle

### GMB Review Yönetimi
```typescript
// lib/gmb/reviews.ts
export async function getGMBReviews() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/business.manage'],
  });

  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

  const reviews = await mybusiness.accounts.locations.reviews.list({
    parent: `accounts/${process.env.GMB_ACCOUNT_ID}/locations/${process.env.GMB_LOCATION_ID}`,
  });

  return reviews.data.reviews;
}

export async function replyToGMBReview(reviewId: string, comment: string) {
  // GMB yorumlarına otomatik yanıt
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/business.manage'],
  });

  const mybusiness = google.mybusinessbusinessinformation({ version: 'v1', auth });

  return await mybusiness.accounts.locations.reviews.updateReply({
    name: `accounts/${process.env.GMB_ACCOUNT_ID}/locations/${process.env.GMB_LOCATION_ID}/reviews/${reviewId}/reply`,
    requestBody: {
      comment: comment,
    },
  });
}
```

### GMB Q&A Yönetimi
**Dashboard'dan:**
- Soru-cevap yönetimi
- Otomatik yanıt şablonları
- Sık sorulan sorular
- Moderasyon sistemi

## [◈] NAP Consistency (Name, Address, Phone)

### NAP Tutarlılık Kontrolü
**Tüm platformlarda aynı bilgiler:**

#### İşletme Adı (Name)
```
✅ Doğru: İstanbul İzmir Evden Eve Nakliyat
❌ Yanlış: İstanbul-İzmir Nakliyat
❌ Yanlış: İst. İzmir Evden Eve Nakliyat
```

#### Adres (Address)
```
✅ Doğru: Kaynarca Mah. Bahattin Veled Cad. No:37 Pendik/İstanbul
❌ Yanlış: Kaynarca Mahallesi Bahattin Veled Caddesi No:37
❌ Yanlış: Pendik, İstanbul
```

#### Telefon (Phone)
```
✅ Doğru: +90 532 138 4979
❌ Yanlış: 0532 138 4979
❌ Yanlış: (0532) 138 49 79
```

### NAP Validation API
```typescript
// lib/seo/nap-validator.ts
interface NAPData {
  name: string;
  address: string;
  phone: string;
}

export function validateNAP(data: NAPData): boolean {
  const nameRegex = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/;
  const phoneRegex = /^\+90\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
  
  return (
    nameRegex.test(data.name) &&
    data.address.length > 10 &&
    phoneRegex.test(data.phone)
  );
}

export async function checkNAPConsistency(platforms: string[]) {
  const results = [];
  
  for (const platform of platforms) {
    const napData = await fetchNAPFromPlatform(platform);
    const isValid = validateNAP(napData);
    
    results.push({
      platform,
      isValid,
      data: napData,
    });
  }
  
  return results;
}
```

### NAP Platformları
**Kontrol edilecek platformlar:**
- Google My Business
- Yandex Haritalar
- Facebook Business
- Instagram Business
- LinkedIn Company
- Sahibinden.com
- Hürriyet Emlak
- Yerel dizinler

### Otomatik NAP Sync
```typescript
// Dashboard'dan NAP güncelleme
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

## [◈] Local Business Categories

### Primary Category
```json
{
  "@type": "MovingCompany",
  "additionalType": [
    "https://schema.org/LocalBusiness",
    "https://schema.org/HomeAndConstructionBusiness"
  ]
}
```

### Secondary Categories
- Nakliyat Firması
- Evden Eve Taşımacılık
- Eşya Depolama
- Paketleme Hizmeti
- Sigortalı Taşımacılık

### GMB Categories
**Primary:** Moving Company
**Secondary:**
- Moving and storage service
- Mover
- Moving supply store
- Packing service
- Storage facility

## [◈] Service Area Schema

### GeoCircle Implementation
```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "{{SITE_NAME}}",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "40.8783",
      "longitude": "29.2336"
    },
    "geoRadius": "500000"
  }
}
```

### Multiple Service Areas
```json
{
  "areaServed": [
    {
      "@type": "City",
      "name": "İstanbul",
      "containedInPlace": {
        "@type": "Country",
        "name": "Turkey"
      }
    },
    {
      "@type": "City",
      "name": "İzmir",
      "containedInPlace": {
        "@type": "Country",
        "name": "Turkey"
      }
    },
    {
      "@type": "City",
      "name": "Ankara",
      "containedInPlace": {
        "@type": "Country",
        "name": "Turkey"
      }
    }
  ]
}
```

### Dashboard'dan Service Area Yönetimi
**Özellikler:**
- Şehir ekleme/çıkarma
- Hizmet alanı haritası
- Otomatik schema güncelleme
- GMB'ye senkronizasyon

## [◈] Local Citations

### Citation Platformları
**Türkiye'de önemli dizinler:**
- Yandex Haritalar
- Foursquare
- Yelp
- TripAdvisor
- Sahibinden.com
- Hürriyet Emlak
- Zingat
- Emlakjet

### Citation Building Strategy
```typescript
// lib/seo/citations.ts
interface Citation {
  platform: string;
  url: string;
  napData: NAPData;
  status: 'active' | 'pending' | 'inactive';
}

export async function buildCitation(platform: string, napData: NAPData) {
  // Citation oluşturma
  const citation: Citation = {
    platform,
    url: await submitToPlatform(platform, napData),
    napData,
    status: 'pending',
  };
  
  return citation;
}

export async function monitorCitations() {
  // Citation'ları izle
  const citations = await getAllCitations();
  
  for (const citation of citations) {
    const isActive = await checkCitationStatus(citation.url);
    
    if (!isActive) {
      // Uyarı gönder
      await sendAlert(`Citation inactive: ${citation.platform}`);
    }
  }
}
```

## [◈] Local Link Building

### Local Backlink Stratejisi
**Hedef siteler:**
- Yerel haber siteleri
- Şehir blogları
- Yerel iş dizinleri
- Ticaret odaları
- Yerel dernekler

### Local Partnership
```typescript
// Dashboard'dan ortaklık yönetimi
interface LocalPartner {
  name: string;
  website: string;
  backlink: string;
  status: 'active' | 'pending';
}

export async function addLocalPartner(partner: LocalPartner) {
  // Ortaklık ekle
  // Backlink kontrolü
  // NAP paylaşımı
}
```

## [◈] Local Content Strategy

### Şehir Bazlı İçerik
**Her şehir için:**
- Şehir rehberi
- Nakliyat ipuçları (şehre özel)
- Yerel etkinlikler
- Mahalle bilgileri
- Trafik durumu

### Local Keywords
```typescript
// Şehir bazlı keyword'ler
const localKeywords = [
  '{şehir} evden eve nakliyat',
  '{şehir} nakliyat firması',
  '{şehir} ev taşıma',
  '{şehir} nakliyat fiyatları',
  '{şehir} {mahalle} nakliyat',
];
```

## [◈] Local Schema Implementation

### Complete Local Business Schema
```json
{
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "{{SITE_NAME}}",
  "image": "{{SITE_URL}}/logo.svg",
  "@id": "{{SITE_URL}}",
  "url": "{{SITE_URL}}",
  "telephone": "{{SITE_PHONE}}",
  "priceRange": "₺₺",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{STREET_ADDRESS}}",
    "addressLocality": "{{CITY}}",
    "addressRegion": "{{REGION}}",
    "postalCode": "{{POSTAL_CODE}}",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{LATITUDE}}",
    "longitude": "{{LONGITUDE}}"
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
  "sameAs": [
    "{{FACEBOOK_URL}}",
    "{{INSTAGRAM_URL}}",
    "{{TWITTER_URL}}",
    "{{LINKEDIN_URL}}"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

## [◈] Dashboard Integration

### Local SEO Dashboard
**Özellikler:**
- GMB performans metrikleri
- NAP consistency checker
- Citation monitoring
- Local keyword rankings
- Review management
- Q&A management
- Local backlink tracker

### Automated Tasks
```typescript
// Otomatik görevler
export async function runLocalSEOTasks() {
  // Her gün
  await checkNAPConsistency();
  await monitorGMBReviews();
  
  // Her hafta
  await updateGMBPosts();
  await checkCitations();
  
  // Her ay
  await auditLocalSEO();
  await updateServiceAreas();
}
```

## [□] Diğer Dokümantasyon

- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [SEO-MONITORING.md](SEO-MONITORING.md) - Monitoring & analytics
- [SEO-OPTIMIZATION.md](SEO-OPTIMIZATION.md) - Performance optimization
- [SEO-TRUST.md](SEO-TRUST.md) - E-E-A-T & Trust signals
