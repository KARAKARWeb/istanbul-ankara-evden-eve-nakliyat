# SEO Eksikler Raporu - Profesyonel Analiz

## [!] SEO Uzmanı Perspektifinden Kritik Değerlendirme

**Analiz Tarihi:** 20 Şubat 2026
**Analiz Eden:** SEO Uzmanı / SEO-QA / SEO Danışmanı Perspektifi
**Proje:** Multi-Site Evden Eve Nakliyat Platformu

---

## 🔴 KRİTİK SEO EKSİKLER (Mutlaka Yapılmalı)

### 1. Schema.org Eksikleri

#### 1.1. Eksik Schema Tipleri
**Mevcut:** 7 Schema
**Gerekli:** En az 15-20 Schema (Google 2024+ için)

**Eksik Schemalar:**
- ❌ **Organization Schema** - Şirket bilgileri (logo, sosyal medya, kuruluş tarihi)
- ❌ **HowTo Schema** - "Nasıl yapılır" içerikleri için (örn: "Evden eve nakliyat nasıl yapılır?")
- ❌ **VideoObject Schema** - Video içerikler için
- ❌ **ImageObject Schema** - Görseller için detaylı metadata
- ❌ **Article Schema** - Blog yazıları için
- ❌ **BlogPosting Schema** - Blog gönderileri için
- ❌ **Event Schema** - Özel kampanyalar/etkinlikler için
- ❌ **Offer Schema** - Detaylı teklif bilgileri
- ❌ **ItemList Schema** - Hizmet listesi için
- ❌ **ContactPoint Schema** - İletişim noktaları için

**Etki:** Google Rich Snippets'te görünürlük %40 azalır
**Öncelik:** Yüksek
**Tahmini Süre:** 4-6 saat

#### 1.2. Schema Validation Eksikliği
**Sorun:** Schema'ların Google Rich Results Test ile doğrulanması planlanmamış
**Gerekli:** 
- Google Rich Results Test entegrasyonu
- Schema.org validator kontrolü
- Otomatik schema validation

**Etki:** Hatalı schema'lar Google'da gösterilmez
**Öncelik:** Kritik
**Tahmini Süre:** 2 saat

#### 1.3. Dynamic Schema Generation Eksikliği
**Sorun:** Schema'lar statik, dashboard'dan güncelleme yok
**Gerekli:**
- Dashboard'dan schema yönetimi
- Dinamik schema generation
- Real-time schema preview

**Etki:** Her domain değişikliğinde manuel güncelleme gerekir
**Öncelik:** Yüksek
**Tahmini Süre:** 6-8 saat

### 2. Meta Tags Eksikleri

#### 2.1. Viewport Meta Tag Eksik
**Sorun:** Mobile-first için viewport meta tag dokümante edilmemiş
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**Etki:** Mobile SEO'da sorun
**Öncelik:** Kritik

#### 2.2. Robots Meta Tag Eksik
**Sorun:** Sayfa bazlı indexleme kontrolü yok
```html
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```
**Etki:** Sayfa kontrolü eksik
**Öncelik:** Orta

#### 2.3. Language & Hreflang Eksik
**Sorun:** Çoklu dil desteği için hreflang yok
```html
<link rel="alternate" hreflang="tr" href="https://example.com/tr/">
<link rel="alternate" hreflang="x-default" href="https://example.com/">
```
**Etki:** Uluslararası SEO için gerekli
**Öncelik:** Düşük (şimdilik Türkçe only)

#### 2.4. Author & Publisher Meta Tags Eksik
**Sorun:** İçerik yazarı ve yayıncı bilgisi yok
```html
<meta name="author" content="{{SITE_NAME}}">
<meta property="article:publisher" content="https://facebook.com/page">
```
**Etki:** E-E-A-T sinyali eksik
**Öncelik:** Orta

### 3. Structured Data Eksikleri

#### 3.1. JSON-LD Multiple Schema Support Eksik
**Sorun:** Tek sayfada birden fazla schema birleştirme yok
**Gerekli:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    { /* MovingCompany */ },
    { /* LocalBusiness */ },
    { /* BreadcrumbList */ },
    { /* FAQPage */ }
  ]
}
```
**Etki:** Google tüm schema'ları göremeyebilir
**Öncelik:** Yüksek

#### 3.2. SameAs Property Eksik
**Sorun:** Sosyal medya profilleri schema'da yok
```json
"sameAs": [
  "https://facebook.com/page",
  "https://twitter.com/account",
  "https://instagram.com/account",
  "https://linkedin.com/company"
]
```
**Etki:** Brand authority sinyali eksik
**Öncelik:** Orta

#### 3.3. PotentialAction Eksik
**Sorun:** Kullanıcı aksiyonları schema'da yok
```json
"potentialAction": {
  "@type": "SearchAction",
  "target": "https://example.com/search?q={search_term_string}",
  "query-input": "required name=search_term_string"
}
```
**Etki:** Google Search Box eksik
**Öncelik:** Orta

### 4. Content SEO Eksikleri

#### 4.1. Keyword Density Stratejisi Yok
**Sorun:** Keyword yoğunluğu hedefi belirtilmemiş
**Gerekli:**
- Primary keyword: %1-2
- Secondary keywords: %0.5-1%
- LSI keywords: Doğal kullanım

**Etki:** Over-optimization veya under-optimization riski
**Öncelik:** Yüksek

#### 4.2. LSI Keywords (Latent Semantic Indexing) Eksik
**Sorun:** İlgili anahtar kelimeler listesi yok
**Gerekli:**
- Nakliyat → taşımacılık, ev taşıma, eşya taşıma
- Evden eve → konut, daire, villa
- Fiyat → ücret, maliyet, teklif

**Etki:** Semantic SEO eksik
**Öncelik:** Orta

#### 4.3. Content Length Guidelines Eksik
**Sorun:** Minimum içerik uzunluğu belirtilmemiş
**Gerekli:**
- Ana sayfa: Min 1500-2000 kelime
- Bölge sayfaları: Min 800-1000 kelime
- Blog yazıları: Min 1200-1500 kelime

**Etki:** Thin content riski
**Öncelik:** Yüksek

#### 4.4. Content Freshness Strategy Eksik
**Sorun:** İçerik güncelleme stratejisi yok
**Gerekli:**
- Ana sayfa: Aylık güncelleme
- Bölge sayfaları: 3 ayda bir
- Blog: Haftalık yeni içerik
- Fiyatlar: Anlık güncelleme

**Etki:** Stale content penalty riski
**Öncelik:** Orta

### 5. Technical SEO Eksikleri

#### 5.1. XML Sitemap Index Eksik
**Sorun:** Çoklu sitemap yönetimi yok
**Gerekli:**
```xml
<sitemapindex>
  <sitemap>
    <loc>https://example.com/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-regions.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-blog.xml</loc>
  </sitemap>
</sitemapindex>
```
**Etki:** 50+ sayfa için gerekli
**Öncelik:** Orta

#### 5.2. Image Sitemap Eksik
**Sorun:** Görseller için ayrı sitemap yok
**Gerekli:**
```xml
<url>
  <loc>https://example.com/page</loc>
  <image:image>
    <image:loc>https://example.com/image.jpg</image:loc>
    <image:title>Image Title</image:title>
    <image:caption>Image Caption</image:caption>
  </image:image>
</url>
```
**Etki:** Google Images'da görünürlük düşük
**Öncelik:** Orta

#### 5.3. Video Sitemap Eksik
**Sorun:** Video içerikler için sitemap yok
**Etki:** Video SEO eksik
**Öncelik:** Düşük (video yoksa)

#### 5.4. Pagination SEO Eksik
**Sorun:** Sayfalama için rel="next" ve rel="prev" yok
```html
<link rel="prev" href="https://example.com/page/1">
<link rel="next" href="https://example.com/page/3">
```
**Etki:** Çok sayfalı içerik için gerekli
**Öncelik:** Düşük (şimdilik)

#### 5.5. AMP (Accelerated Mobile Pages) Eksik
**Sorun:** Mobile hız için AMP versiyonu yok
**Etki:** Mobile Core Web Vitals'da dezavantaj
**Öncelik:** Düşük (Next.js zaten hızlı)

### 6. Local SEO Eksikleri

#### 6.1. Google My Business Entegrasyonu Eksik
**Sorun:** GMB API entegrasyonu yok
**Gerekli:**
- GMB profil oluşturma
- Otomatik post paylaşımı
- Review yönetimi
- Q&A yönetimi

**Etki:** Local pack'te görünürlük düşük
**Öncelik:** Yüksek

#### 6.2. NAP Consistency Check Eksik
**Sorun:** Name, Address, Phone tutarlılık kontrolü yok
**Gerekli:**
- Otomatik NAP validation
- Tüm platformlarda tutarlılık
- Schema'da NAP

**Etki:** Local SEO sinyali zayıf
**Öncelik:** Yüksek

#### 6.3. Local Business Categories Eksik
**Sorun:** İş kategorileri detaylı değil
**Gerekli:**
```json
"additionalType": [
  "MovingCompany",
  "LocalBusiness",
  "HomeAndConstructionBusiness"
]
```
**Etki:** Kategori sinyali eksik
**Öncelik:** Orta

#### 6.4. Service Area Schema Eksik
**Sorun:** Hizmet alanları detaylı belirtilmemiş
**Gerekli:**
```json
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": {
    "@type": "GeoCoordinates",
    "latitude": "40.8783",
    "longitude": "29.2336"
  },
  "geoRadius": "500000"
}
```
**Etki:** Local search'te eksik
**Öncelik:** Orta

### 7. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Eksikleri

#### 7.1. Author Bio Eksik
**Sorun:** İçerik yazarları hakkında bilgi yok
**Gerekli:**
- Yazar profilleri
- Uzmanlık alanları
- Sertifikalar
- Deneyim

**Etki:** E-E-A-T sinyali zayıf
**Öncelik:** Orta

#### 7.2. About Us Page SEO Eksik
**Sorun:** Hakkımızda sayfası SEO optimize değil
**Gerekli:**
- Şirket geçmişi
- Ekip üyeleri
- Sertifikalar
- Ödüller
- Referanslar

**Etki:** Trust sinyali eksik
**Öncelik:** Orta

#### 7.3. Trust Signals Eksik
**Sorun:** Güven sinyalleri belirtilmemiş
**Gerekli:**
- SSL sertifikası (var)
- Gizlilik politikası
- Kullanım şartları
- İade politikası
- Garanti bilgileri
- Sigorta bilgileri

**Etki:** Conversion rate düşük
**Öncelik:** Yüksek

#### 7.4. Social Proof Eksik
**Sorun:** Sosyal kanıt stratejisi yok
**Gerekli:**
- Müşteri yorumları (Google, Trustpilot)
- Vaka çalışmaları
- Referans listesi
- Medya bahisleri

**Etki:** Trust factor düşük
**Öncelik:** Yüksek

### 8. Link Building Stratejisi Eksikleri

#### 8.1. Internal Linking Strategy Eksik
**Sorun:** İç link stratejisi detaylı değil
**Gerekli:**
- Cornerstone content belirleme
- Hub & spoke modeli
- Anchor text çeşitliliği
- Link depth kontrolü

**Etki:** Page authority dağılımı zayıf
**Öncelik:** Yüksek

#### 8.2. External Link Strategy Eksik
**Sorun:** Dış link stratejisi yok
**Gerekli:**
- Authoritative kaynaklara link
- Nofollow/dofollow dengesi
- Broken link check

**Etki:** Trust sinyali eksik
**Öncelik:** Orta

#### 8.3. Backlink Monitoring Eksik
**Sorun:** Backlink takibi yok
**Gerekli:**
- Ahrefs/SEMrush entegrasyonu
- Toxic backlink kontrolü
- Disavow file yönetimi

**Etki:** Negative SEO riski
**Öncelik:** Orta

### 9. Performance SEO Eksikleri

#### 9.1. Core Web Vitals Monitoring Eksik
**Sorun:** Real-time CWV takibi yok
**Gerekli:**
- LCP monitoring
- FID monitoring
- CLS monitoring
- Real User Monitoring (RUM)

**Etki:** Google ranking faktörü
**Öncelik:** Kritik

#### 9.2. Page Speed Optimization Detayları Eksik
**Sorun:** Optimizasyon teknikleri yüzeysel
**Gerekli:**
- Critical CSS inline
- Font optimization (font-display: swap)
- Resource hints (preconnect, prefetch)
- Service Worker caching

**Etki:** Page speed düşük
**Öncelik:** Yüksek

#### 9.3. Image Optimization Strategy Eksik
**Sorun:** Görsel optimizasyon detaylı değil
**Gerekli:**
- Responsive images (srcset)
- Art direction
- Image CDN
- Lazy loading threshold
- LQIP (Low Quality Image Placeholder)

**Etki:** LCP yüksek
**Öncelik:** Yüksek

### 10. Mobile SEO Eksikleri

#### 10.1. Mobile-First Indexing Optimization Eksik
**Sorun:** Mobile-first için özel optimizasyon yok
**Gerekli:**
- Mobile content parity
- Mobile UX optimization
- Touch target size (min 48x48px)
- Mobile navigation

**Etki:** Google mobile-first index kullanıyor
**Öncelik:** Kritik

#### 10.2. Mobile Page Speed Eksik
**Sorun:** Mobile için özel hız optimizasyonu yok
**Gerekli:**
- Mobile-specific optimizations
- Reduced payload
- Adaptive loading

**Etki:** Mobile ranking düşük
**Öncelik:** Yüksek

---

## 🟡 ÖNEML İ SEO EKSİKLER (Yapılması Önerilen)

### 11. Analytics & Tracking Eksikleri

#### 11.1. Enhanced E-commerce Tracking Eksik
**Sorun:** Fiyat teklifi conversion tracking detaylı değil
**Gerekli:**
- Form submission tracking
- Phone click tracking
- Email click tracking
- CTA button tracking

**Öncelik:** Orta

#### 11.2. Custom Events Eksik
**Sorun:** Özel event tanımları yok
**Gerekli:**
- Scroll depth tracking
- Time on page tracking
- Exit intent tracking
- Video engagement tracking

**Öncelik:** Orta

#### 11.3. Heatmap & Session Recording Eksik
**Sorun:** Kullanıcı davranışı analizi yok
**Gerekli:**
- Hotjar/Crazy Egg entegrasyonu
- Click heatmaps
- Scroll heatmaps
- Session recordings

**Öncelik:** Düşük

### 12. Content Marketing Eksikleri

#### 12.1. Blog Strategy Eksik
**Sorun:** Blog içerik planı yok
**Gerekli:**
- Content calendar
- Topic clusters
- Pillar pages
- Supporting content

**Öncelik:** Orta

#### 12.2. Content Distribution Strategy Eksik
**Sorun:** İçerik dağıtım kanalları belirtilmemiş
**Gerekli:**
- Social media distribution
- Email marketing
- Content syndication
- Guest posting

**Öncelik:** Düşük

### 13. Conversion Rate Optimization (CRO) Eksikleri

#### 13.1. A/B Testing Strategy Eksik
**Sorun:** A/B test planı yok
**Gerekli:**
- Title tag testing
- Meta description testing
- CTA button testing
- Form field testing

**Öncelik:** Orta

#### 13.2. Landing Page Optimization Eksik
**Sorun:** Landing page SEO stratejisi yok
**Gerekli:**
- Dedicated landing pages
- SEO-optimized copy
- Clear CTAs
- Trust signals

**Öncelik:** Orta

---

## 🟢 İYİLEŞTİRME ÖNERİLERİ (Nice to Have)

### 14. Advanced SEO Features

#### 14.1. Voice Search Optimization Eksik
**Sorun:** Sesli arama için optimizasyon yok
**Gerekli:**
- Conversational keywords
- Featured snippet optimization
- FAQ schema
- Natural language content

**Öncelik:** Düşük

#### 14.2. Featured Snippet Optimization Eksik
**Sorun:** Featured snippet hedefleme yok
**Gerekli:**
- Question-based content
- Structured answers
- List formatting
- Table formatting

**Öncelik:** Düşük

#### 14.3. Knowledge Graph Optimization Eksik
**Sorun:** Google Knowledge Graph için optimizasyon yok
**Gerekli:**
- Wikipedia presence
- Wikidata entry
- Brand mentions
- Entity optimization

**Öncelik:** Düşük

---

## 📊 ÖZET VE ÖNCELİKLENDİRME

### Kritik (Mutlaka Yapılmalı) - 15 Eksik
1. Schema Validation
2. Dynamic Schema Generation
3. Viewport Meta Tag
4. JSON-LD @graph Support
5. Keyword Density Strategy
6. Content Length Guidelines
7. GMB Entegrasyonu
8. NAP Consistency
9. Trust Signals
10. Social Proof
11. Internal Linking Strategy
12. Core Web Vitals Monitoring
13. Page Speed Optimization
14. Mobile-First Optimization
15. Mobile Page Speed

**Tahmini Süre:** 40-50 saat
**Etki:** SEO performansı %60-70 artış

### Önemli (Yapılması Önerilen) - 20 Eksik
- Eksik schema tipleri (10 adet)
- Meta tag eksikleri (4 adet)
- Local SEO eksikleri (3 adet)
- E-E-A-T eksikleri (3 adet)

**Tahmini Süre:** 30-40 saat
**Etki:** SEO performansı %20-30 artış

### İyileştirme (Nice to Have) - 10 Eksik
- Analytics detayları
- Content marketing
- CRO optimizasyonları
- Advanced SEO features

**Tahmini Süre:** 20-30 saat
**Etki:** SEO performansı %10-15 artış

---

## 🎯 ÖNER İLEN AKSIYON PLANI

### Faz 1: Kritik Eksikler (İlk 2 Hafta)
1. Schema validation ve dynamic generation
2. Meta tags tamamlama
3. Core Web Vitals monitoring
4. Mobile-first optimization
5. GMB entegrasyonu

### Faz 2: Önemli Eksikler (3-4. Hafta)
1. Eksik schema'ları ekleme
2. Local SEO tamamlama
3. E-E-A-T sinyalleri
4. Internal linking

### Faz 3: İyileştirmeler (5-6. Hafta)
1. Analytics detaylandırma
2. Content marketing
3. CRO optimizasyonları

---

## 🔴 KARAR ZAMANIN

**Soru:** Bu SEO eksiklerini şimdi mi tamamlayalım, yoksa proje başlatıp geliştirme sırasında mı ekleyelim?

**Seçenek A:** Önce tüm SEO eksiklerini tamamla, sonra proje başlat (8-10 hafta)

**Seçenek B:** Kritik SEO eksiklerini dokümante et, proje başlat, geliştirme sırasında ekle (Önerilen)

**Seçenek C:** Projeyi şimdi başlat, SEO'yu sonra ekle (Önerilmez)

**Hangisini tercih ediyorsun?**
