# Kapsamlı Kontrol Listesi - Evden Eve Nakliyat Projesi

**Oluşturulma Tarihi:** 21 Şubat 2026  
**Proje:** İstanbul İzmir Evden Eve Nakliyat (Domain Bağımsız)  
**Teknoloji:** Next.js 15.1, React 19, TypeScript, Tailwind CSS v4

---

## 📋 İÇİNDEKİLER

1. [Frontend Kontrol Listesi](#1-frontend-kontrol-listesi)
2. [Dashboard Kontrol Listesi](#2-dashboard-kontrol-listesi)
3. [SEO Kontrol Listesi (Detaylı)](#3-seo-kontrol-listesi-detaylı)
4. [Metadata & Schema.org Kontrol Listesi](#4-metadata--schemaorg-kontrol-listesi)
5. [Technical SEO Kontrol Listesi](#5-technical-seo-kontrol-listesi)
6. [Performance & Core Web Vitals](#6-performance--core-web-vitals)
7. [Mobile & Responsive Kontrol](#7-mobile--responsive-kontrol)
8. [Security & Privacy Kontrol](#8-security--privacy-kontrol)
9. [Analytics & Tracking Kontrol](#9-analytics--tracking-kontrol)
10. [Content Quality Kontrol](#10-content-quality-kontrol)
11. [Local SEO Kontrol](#11-local-seo-kontrol)
12. [E-E-A-T Kontrol](#12-e-e-a-t-kontrol)
13. [Deployment Kontrol](#13-deployment-kontrol)
14. [Testing & QA Kontrol](#14-testing--qa-kontrol)

---

## 1. FRONTEND KONTROL LİSTESİ

### 1.1. Ana Sayfa (12 Section)

#### Section 1: Hero Section
- [ ] Hero başlık dinamik (Dashboard'dan)
- [ ] Hero açıklama dinamik (Dashboard'dan)
- [ ] İstatistikler dinamik (Dashboard'dan)
- [ ] Fiyat formu çalışıyor
- [ ] CTA butonları çalışıyor
- [ ] Arka plan görseli optimize (WebP, lazy load)
- [ ] Font boyutları minimal (H1: max 36-40px desktop)
- [ ] Mobilde düzgün görünüm
- [ ] Test: `http://localhost:3000/` → Hero section görünüyor mu?

#### Section 2: SEO Makale (Üst)
- [ ] 200-300 kelime içerik var
- [ ] 3 alt başlık var
- [ ] Primary keyword kullanılmış (%1-2 yoğunluk)
- [ ] Dashboard'dan düzenlenebilir
- [ ] H2 başlık SEO optimize
- [ ] Test: `@/src/components/homepage/TopSEOArticle.tsx` kontrol

#### Section 3: Hizmetler
- [ ] 6 hizmet kartı görünüyor
- [ ] Her kart: ikon, başlık, açıklama
- [ ] Dashboard'dan düzenlenebilir
- [ ] Hover efektleri çalışıyor
- [ ] Mobilde grid düzeni doğru (2 sütun)
- [ ] Test: Dashboard → Content → Services

#### Section 4: Neden Biz
- [ ] 6 özellik kartı görünüyor
- [ ] İkonlar outline (Lucide)
- [ ] Dashboard'dan düzenlenebilir
- [ ] Minimal tasarım (beyaz/gri)
- [ ] Test: Dashboard → Content → Why Us

#### Section 5: Rota Bilgileri
- [ ] Mesafe bilgisi dinamik
- [ ] Süre bilgisi dinamik
- [ ] Fiyat aralığı dinamik
- [ ] Google Maps entegrasyonu çalışıyor
- [ ] Dashboard'dan düzenlenebilir
- [ ] Test: Dashboard → Settings → Route Info

#### Section 6: Galeri
- [ ] Görseller optimize (WebP)
- [ ] Lazy loading aktif
- [ ] Lightbox çalışıyor
- [ ] Dashboard'dan görsel yüklenebilir
- [ ] Alt text her görselde var
- [ ] Test: Dashboard → Media

#### Section 7: Fiyatlandırma
- [ ] 4 ev tipi görünüyor
- [ ] Fiyatlar dinamik (Dashboard'dan)
- [ ] Asansörlü/asansörsüz fiyatlar ayrı
- [ ] CTA butonları çalışıyor
- [ ] Mobilde tablo kaydırılabilir
- [ ] Test: Dashboard → Pricing

#### Section 8: Hizmet Bölgeleri Showcase
- [ ] 30+ bölge görünüyor
- [ ] Her bölge: isim, mesafe, süre, rating
- [ ] Rating otomatik (4.5-4.9)
- [ ] Bölge sayfalarına link çalışıyor
- [ ] Dashboard'dan bölge eklenebilir
- [ ] Test: Dashboard → Regions

#### Section 9: SSS (FAQPage)
- [ ] Minimum 8-10 soru-cevap
- [ ] Accordion çalışıyor
- [ ] FAQPage schema var
- [ ] Dashboard'dan düzenlenebilir
- [ ] SEO optimize sorular
- [ ] Test: Dashboard → Content → FAQ

#### Section 10: Müşteri Yorumları
- [ ] Minimum 10 yorum görünüyor
- [ ] Her yorum: isim, tarih, puan, metin
- [ ] Aggregate rating görünüyor (4.8/5)
- [ ] Review count görünüyor (127)
- [ ] Schema.org Review markup var
- [ ] Dashboard'dan yorum eklenebilir
- [ ] Test: Dashboard → Reviews

#### Section 11: İletişim Formu
- [ ] 7 alan: isim, email, telefon, kaynak, hedef, ev tipi, mesaj
- [ ] Form validation çalışıyor (Zod)
- [ ] Email gönderimi çalışıyor
- [ ] Success/error mesajları gösteriliyor
- [ ] reCAPTCHA var (opsiyonel)
- [ ] Test: Form doldur → Email geldi mi?

#### Section 12: SEO İçerik (Alt)
- [ ] 500-800 kelime içerik var
- [ ] 5 alt başlık var
- [ ] LSI keywords kullanılmış
- [ ] Dashboard'dan düzenlenebilir
- [ ] H2/H3 başlıklar SEO optimize
- [ ] Test: `@/src/components/homepage/SEOContentSection.tsx`

#### Section 13: CTA Section
- [ ] Son çağrı metni var
- [ ] CTA butonları çalışıyor
- [ ] Telefon/WhatsApp linkleri doğru
- [ ] Minimal tasarım
- [ ] Test: Butonlara tıkla

### 1.2. TOC (Table of Contents)
- [ ] Desktop: Sticky sidebar
- [ ] Mobile: Collapsible
- [ ] Smooth scroll çalışıyor
- [ ] Active section highlight var
- [ ] 12 section linki var
- [ ] Dashboard'dan başlıklar değişince TOC güncelleniyor
- [ ] Test: TOC linklerine tıkla → Scroll çalışıyor mu?

### 1.3. Header & Navigation
- [ ] Logo dinamik (Dashboard'dan)
- [ ] Menü linkleri çalışıyor (Ana Sayfa, Hakkımızda, İletişim, Bölgeler)
- [ ] Sticky header çalışıyor
- [ ] Mobile hamburger menü çalışıyor
- [ ] CTA buton (Fiyat Al) çalışıyor
- [ ] Test: Tüm linklere tıkla

### 1.4. Footer
- [ ] 4 kolon: Hakkımızda, Hızlı Linkler, İletişim, Sosyal Medya
- [ ] Tüm linkler çalışıyor
- [ ] KARAKAR Web logosu var (dofollow)
- [ ] NAP tutarlı (Name, Address, Phone)
- [ ] Sosyal medya ikonları çalışıyor
- [ ] Copyright dinamik (yıl otomatik)
- [ ] Test: `@/src/components/layout/Footer.tsx`

### 1.5. Diğer Sayfalar

#### Hakkımızda Sayfası
- [ ] Sayfa açılıyor: `/hakkimizda`
- [ ] İçerik dinamik (Dashboard'dan)
- [ ] SEO metadata doğru
- [ ] Breadcrumb var
- [ ] Schema.org markup var
- [ ] Test: Dashboard → Content → About

#### İletişim Sayfası
- [ ] Sayfa açılıyor: `/iletisim`
- [ ] İletişim formu çalışıyor
- [ ] Harita gösteriliyor
- [ ] İletişim bilgileri dinamik
- [ ] SEO metadata doğru
- [ ] Test: Dashboard → Settings → Contact

#### Bölgeler Listesi
- [ ] Sayfa açılıyor: `/bolgeler`
- [ ] Tüm bölgeler listeleniyor
- [ ] Arama çalışıyor
- [ ] Filtreleme çalışıyor
- [ ] SEO metadata doğru
- [ ] Test: `/bolgeler`

#### Dinamik Bölge Sayfaları
- [ ] Sayfa açılıyor: `/bolgeler/[slug]`
- [ ] İçerik dinamik (JSON'dan)
- [ ] SEO metadata dinamik
- [ ] Breadcrumb var
- [ ] Schema.org markup var
- [ ] Rating gösteriliyor
- [ ] Test: `/bolgeler/istanbul-bornova`

### 1.6. Shared Components

#### Mobile Floating Buttons
- [ ] Telefon butonu çalışıyor
- [ ] WhatsApp butonu çalışıyor
- [ ] Sadece mobilde görünüyor
- [ ] Test: Mobil görünümde kontrol et

#### Scroll to Top
- [ ] Buton görünüyor (scroll > 300px)
- [ ] Smooth scroll çalışıyor
- [ ] Minimal tasarım
- [ ] Test: Aşağı kaydır → Buton görünüyor mu?

#### PWA Install
- [ ] PWA prompt gösteriliyor
- [ ] Install butonu çalışıyor
- [ ] Manifest.json doğru
- [ ] Service worker çalışıyor
- [ ] Test: Chrome DevTools → Application → Manifest

---

## 2. DASHBOARD KONTROL LİSTESİ

### 2.1. Authentication
- [ ] Login sayfası çalışıyor: `/dashboard/login`
- [ ] Password hash doğru (bcrypt)
- [ ] Session yönetimi çalışıyor
- [ ] Logout çalışıyor
- [ ] Unauthorized access engelleniyor
- [ ] Test: Şifre gir → Dashboard açılıyor mu?

### 2.2. Dashboard Ana Sayfa
- [ ] İstatistikler gösteriliyor
- [ ] Son aktiviteler listeleniyor
- [ ] Quick actions çalışıyor
- [ ] Test: `/dashboard`

### 2.3. Content Management

#### Hero Settings
- [ ] Başlık düzenlenebilir
- [ ] Açıklama düzenlenebilir
- [ ] İstatistikler düzenlenebilir
- [ ] CTA metinleri düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Hero → Kaydet → Frontend kontrol

#### SEO Articles (Top & Bottom)
- [ ] TipTap editor çalışıyor
- [ ] Split view (editor + preview)
- [ ] Bold, italic, heading, list çalışıyor
- [ ] Link ekleme çalışıyor
- [ ] Görsel ekleme çalışıyor
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Content → SEO Articles

#### Services
- [ ] 6 hizmet düzenlenebilir
- [ ] İkon seçimi çalışıyor (Lucide)
- [ ] Başlık/açıklama düzenlenebilir
- [ ] Sıralama değiştirilebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Content → Services

#### Why Us
- [ ] 6 özellik düzenlenebilir
- [ ] İkon seçimi çalışıyor
- [ ] Başlık/açıklama düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Content → Why Us

#### FAQ
- [ ] Soru-cevap eklenebilir
- [ ] Soru-cevap düzenlenebilir
- [ ] Soru-cevap silinebilir
- [ ] Sıralama değiştirilebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Content → FAQ

#### About Page
- [ ] TipTap editor çalışıyor
- [ ] İçerik düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Content → About

### 2.4. SEO Management

#### General SEO
- [ ] Meta title düzenlenebilir
- [ ] Meta description düzenlenebilir
- [ ] Keywords düzenlenebilir
- [ ] Canonical URL düzenlenebilir
- [ ] Author düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO → General

#### Open Graph
- [ ] OG title düzenlenebilir
- [ ] OG description düzenlenebilir
- [ ] OG image URL düzenlenebilir
- [ ] Image width/height düzenlenebilir
- [ ] Twitter card settings düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO → Open Graph

#### Pages SEO
- [ ] Home page SEO düzenlenebilir
- [ ] About page SEO düzenlenebilir
- [ ] Contact page SEO düzenlenebilir
- [ ] Regions page SEO düzenlenebilir
- [ ] Title suffix düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO → Pages

#### Schema Settings
- [ ] Schema enable/disable çalışıyor
- [ ] Schema preview gösteriliyor
- [ ] Schema validation çalışıyor
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO Advanced → Schema

#### Robots.txt Settings
- [ ] User-agent rules düzenlenebilir
- [ ] Crawl delay ayarlanabilir
- [ ] Disallow paths eklenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO Advanced → Robots

#### Sitemap Settings
- [ ] Sitemap enable/disable çalışıyor
- [ ] Priority ayarlanabilir
- [ ] Change frequency ayarlanabilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → SEO Advanced → Sitemap

### 2.5. Regions Management
- [ ] Bölge listesi gösteriliyor
- [ ] Yeni bölge eklenebilir
- [ ] Bölge düzenlenebilir
- [ ] Bölge silinebilir
- [ ] Bölge aktif/pasif yapılabilir
- [ ] Mesafe/süre otomatik hesaplanıyor (Google Maps API)
- [ ] Rating otomatik oluşturuluyor
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Regions

### 2.6. Reviews Management
- [ ] Yorum listesi gösteriliyor
- [ ] Yeni yorum eklenebilir
- [ ] Yorum düzenlenebilir
- [ ] Yorum silinebilir
- [ ] Yorum onay/red yapılabilir
- [ ] Aggregate rating otomatik hesaplanıyor
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Reviews

### 2.7. Pricing Management
- [ ] 4 ev tipi fiyatları düzenlenebilir
- [ ] Asansörlü fiyatlar düzenlenebilir
- [ ] Asansörsüz fiyatlar düzenlenebilir
- [ ] Fiyat aralığı gösteriliyor
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Pricing

### 2.8. Settings

#### Site Settings
- [ ] Domain düzenlenebilir
- [ ] Site name düzenlenebilir
- [ ] Site title düzenlenebilir
- [ ] Description düzenlenebilir
- [ ] Logo yolları düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Settings → Site

#### Contact Settings
- [ ] Telefon düzenlenebilir
- [ ] Email düzenlenebilir
- [ ] Adres düzenlenebilir
- [ ] Koordinatlar düzenlenebilir
- [ ] Çalışma saatleri düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Settings → Contact

#### Email Settings
- [ ] SMTP ayarları düzenlenebilir
- [ ] Test email gönderilebilir
- [ ] Email templates önizlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Settings → Email

#### Route Info
- [ ] Kaynak şehir düzenlenebilir
- [ ] Hedef şehir düzenlenebilir
- [ ] Mesafe düzenlenebilir
- [ ] Süre düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Settings → Route Info

### 2.9. Media Management
- [ ] Görsel yüklenebilir
- [ ] Görsel silinebilir
- [ ] Görsel önizlenebilir
- [ ] Görsel optimize ediliyor (Sharp)
- [ ] WebP formatına dönüştürülüyor
- [ ] Test: Dashboard → Media

### 2.10. Footer Management
- [ ] Footer kolonları düzenlenebilir
- [ ] Footer linkleri düzenlenebilir
- [ ] Sosyal medya linkleri düzenlenebilir
- [ ] Copyright metni düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Footer

### 2.11. Theme Settings
- [ ] Renk paleti düzenlenebilir
- [ ] Font ayarları düzenlenebilir
- [ ] Spacing ayarları düzenlenebilir
- [ ] Kaydet butonu çalışıyor
- [ ] Test: Dashboard → Theme

### 2.12. Analytics
- [ ] Google Analytics ID düzenlenebilir
- [ ] Google Tag Manager ID düzenlenebilir
- [ ] Facebook Pixel ID düzenlenebilir
- [ ] İstatistikler gösteriliyor
- [ ] Test: Dashboard → Analytics

---

## 3. SEO KONTROL LİSTESİ (DETAYLI)

### 3.1. On-Page SEO

#### Title Tags
- [ ] Ana sayfa title unique (50-60 karakter)
- [ ] Hakkımızda title unique
- [ ] İletişim title unique
- [ ] Bölgeler title unique
- [ ] Her bölge sayfası title unique
- [ ] Primary keyword her title'da var
- [ ] Title suffix tutarlı
- [ ] Test: View Page Source → `<title>` kontrol

#### Meta Descriptions
- [ ] Ana sayfa description unique (150-160 karakter)
- [ ] Hakkımızda description unique
- [ ] İletişim description unique
- [ ] Bölgeler description unique
- [ ] Her bölge sayfası description unique
- [ ] CTA her description'da var
- [ ] Test: View Page Source → `<meta name="description">` kontrol

#### Meta Keywords
- [ ] Ana sayfa keywords var (10-15 kelime)
- [ ] Hakkımızda keywords var
- [ ] İletişim keywords var
- [ ] Bölgeler keywords var
- [ ] Her bölge sayfası keywords var
- [ ] Test: View Page Source → `<meta name="keywords">` kontrol

#### Heading Tags (H1-H6)
- [ ] Her sayfada 1 adet H1 var
- [ ] H1'de primary keyword var
- [ ] H2-H6 hiyerarşik yapı doğru
- [ ] Heading'ler SEO optimize
- [ ] Test: Chrome DevTools → Elements → Heading'leri kontrol

#### Canonical URLs
- [ ] Ana sayfa canonical: `/`
- [ ] Hakkımızda canonical: `/hakkimizda`
- [ ] İletişim canonical: `/iletisim`
- [ ] Bölgeler canonical: `/bolgeler`
- [ ] Her bölge canonical: `/bolgeler/[slug]`
- [ ] Test: View Page Source → `<link rel="canonical">` kontrol

#### Alt Text (Görseller)
- [ ] Tüm görsellerde alt text var
- [ ] Alt text açıklayıcı
- [ ] Alt text'te keyword var (doğal)
- [ ] Test: Chrome DevTools → Images → Alt kontrol

#### Internal Linking
- [ ] Ana sayfadan tüm sayfalara link var
- [ ] Bölge sayfalarından ana sayfaya link var
- [ ] Footer'da tüm sayfalara link var
- [ ] Breadcrumb linkleri çalışıyor
- [ ] Test: Tüm linklere tıkla

### 3.2. Keyword Optimization

#### Primary Keywords
- [ ] "İstanbul İzmir Evden Eve Nakliyat" kullanılmış
- [ ] Keyword density %1-2 arasında
- [ ] Title'da kullanılmış
- [ ] H1'de kullanılmış
- [ ] İlk 100 kelimede kullanılmış
- [ ] URL'de kullanılmış
- [ ] Test: Ctrl+F → Keyword ara

#### Secondary Keywords
- [ ] "İstanbul İzmir Nakliyat" kullanılmış
- [ ] "İstanbul İzmir Ev Taşıma" kullanılmış
- [ ] "Nakliyat Fiyatları" kullanılmış
- [ ] Keyword density %0.5-1% arasında
- [ ] Test: Ctrl+F → Keyword ara

#### LSI Keywords (Latent Semantic Indexing)
- [ ] "Taşımacılık" kullanılmış
- [ ] "Eşya taşıma" kullanılmış
- [ ] "Paketleme" kullanılmış
- [ ] "Sigortalı taşıma" kullanılmış
- [ ] "Asansörlü nakliyat" kullanılmış
- [ ] Test: Ctrl+F → LSI keyword ara

#### Long-tail Keywords
- [ ] "İstanbul'dan İzmir'e ev taşıma fiyatları" kullanılmış
- [ ] "İstanbul İzmir arası nakliyat kaç para" kullanılmış
- [ ] "Güvenilir nakliyat firması İstanbul İzmir" kullanılmış
- [ ] Test: Ctrl+F → Long-tail keyword ara

### 3.3. Content Quality

#### Content Length
- [ ] Ana sayfa: 1500-2000 kelime
- [ ] Hakkımızda: 600-800 kelime
- [ ] İletişim: 300-500 kelime
- [ ] Bölge sayfaları: 800-1000 kelime
- [ ] Test: Word counter tool kullan

#### Content Freshness
- [ ] Son güncelleme tarihi gösteriliyor
- [ ] İçerik güncel (2026)
- [ ] Fiyatlar güncel
- [ ] İletişim bilgileri güncel
- [ ] Test: Sayfa altında "Son Güncelleme" var mı?

#### Content Uniqueness
- [ ] Tüm içerik unique (kopyala-yapıştır yok)
- [ ] Duplicate content yok
- [ ] Test: Copyscape.com ile kontrol

#### Readability
- [ ] Cümle uzunluğu orta (15-20 kelime)
- [ ] Paragraf uzunluğu kısa (3-4 cümle)
- [ ] Bullet points kullanılmış
- [ ] Alt başlıklar var
- [ ] Test: Hemingway Editor ile kontrol

### 3.4. URL Structure

#### URL Format
- [ ] Kısa ve açıklayıcı
- [ ] Türkçe karakter yok (slug)
- [ ] Tire (-) ile ayrılmış
- [ ] Keyword içeriyor
- [ ] Lowercase
- [ ] Test: URL'leri kontrol et

#### URL Examples
- [ ] Ana sayfa: `/`
- [ ] Hakkımızda: `/hakkimizda`
- [ ] İletişim: `/iletisim`
- [ ] Bölgeler: `/bolgeler`
- [ ] Bölge: `/bolgeler/istanbul-bornova`
- [ ] Test: URL'leri tarayıcıda aç

---

## 4. METADATA & SCHEMA.ORG KONTROL LİSTESİ

### 4.1. Basic Meta Tags

#### Viewport
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">`
- [ ] Test: View Page Source → Viewport kontrol

#### Charset
- [ ] `<meta charset="utf-8">`
- [ ] Test: View Page Source → Charset kontrol

#### Language
- [ ] `<html lang="tr">`
- [ ] `<meta http-equiv="content-language" content="tr">`
- [ ] Test: View Page Source → Language kontrol

#### Robots
- [ ] `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
- [ ] Test: View Page Source → Robots kontrol

#### Author
- [ ] `<meta name="author" content="Site Name">`
- [ ] Test: View Page Source → Author kontrol

### 4.2. Open Graph Tags

#### OG Basic
- [ ] `<meta property="og:type" content="website">`
- [ ] `<meta property="og:title" content="...">`
- [ ] `<meta property="og:description" content="...">`
- [ ] `<meta property="og:url" content="...">`
- [ ] `<meta property="og:site_name" content="...">`
- [ ] `<meta property="og:locale" content="tr_TR">`
- [ ] Test: Facebook Debugger → URL gir

#### OG Image
- [ ] `<meta property="og:image" content="...">`
- [ ] `<meta property="og:image:width" content="1200">`
- [ ] `<meta property="og:image:height" content="630">`
- [ ] `<meta property="og:image:alt" content="...">`
- [ ] OG image boyutu 1200x630px
- [ ] OG image < 1MB
- [ ] Test: Facebook Debugger → Image görünüyor mu?

### 4.3. Twitter Cards

#### Twitter Basic
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<meta name="twitter:title" content="...">`
- [ ] `<meta name="twitter:description" content="...">`
- [ ] `<meta name="twitter:image" content="...">`
- [ ] Test: Twitter Card Validator → URL gir

#### Twitter Optional
- [ ] `<meta name="twitter:site" content="@username">`
- [ ] `<meta name="twitter:creator" content="@username">`
- [ ] Test: Twitter Card Validator kontrol

### 4.4. Schema.org Markup (15+ Schema)

#### 1. Organization Schema
- [ ] Schema var: `@type: Organization`
- [ ] Name var
- [ ] URL var
- [ ] Logo var
- [ ] ContactPoint var
- [ ] Address var
- [ ] SameAs var (sosyal medya)
- [ ] Test: Google Rich Results Test

#### 2. WebSite Schema
- [ ] Schema var: `@type: WebSite`
- [ ] Name var
- [ ] URL var
- [ ] PotentialAction var (SearchAction)
- [ ] Test: Google Rich Results Test

#### 3. LocalBusiness Schema
- [ ] Schema var: `@type: LocalBusiness`
- [ ] Name var
- [ ] Image var
- [ ] Address var
- [ ] Geo coordinates var
- [ ] OpeningHours var
- [ ] AggregateRating var
- [ ] PriceRange var
- [ ] Test: Google Rich Results Test

#### 4. MovingCompany Schema
- [ ] Schema var: `@type: MovingCompany`
- [ ] Name var
- [ ] URL var
- [ ] Telephone var
- [ ] Address var
- [ ] Test: Google Rich Results Test

#### 5. Service Schema
- [ ] Schema var: `@type: Service`
- [ ] ServiceType var
- [ ] Provider var
- [ ] AreaServed var
- [ ] HasOfferCatalog var
- [ ] Test: Google Rich Results Test

#### 6. FAQPage Schema
- [ ] Schema var: `@type: FAQPage`
- [ ] MainEntity var (min 8 soru)
- [ ] Question/Answer formatı doğru
- [ ] Test: Google Rich Results Test → FAQ görünüyor mu?

#### 7. BreadcrumbList Schema
- [ ] Schema var: `@type: BreadcrumbList`
- [ ] ItemListElement var
- [ ] Position doğru
- [ ] Test: Google Rich Results Test → Breadcrumb görünüyor mu?

#### 8. AggregateRating Schema
- [ ] Schema var: `@type: AggregateRating`
- [ ] RatingValue var (4.8)
- [ ] ReviewCount var (127)
- [ ] BestRating var (5)
- [ ] WorstRating var (1)
- [ ] Test: Google Rich Results Test → Yıldızlar görünüyor mu?

#### 9. Review Schema
- [ ] Schema var: `@type: Review` (min 10 adet)
- [ ] Author var
- [ ] ReviewRating var
- [ ] ReviewBody var
- [ ] DatePublished var
- [ ] Test: Google Rich Results Test

#### 10. WebPage Schema
- [ ] Schema var: `@type: WebPage`
- [ ] Name var
- [ ] Description var
- [ ] URL var
- [ ] InLanguage var
- [ ] Test: Google Rich Results Test

#### 11. HowTo Schema
- [ ] Schema var: `@type: HowTo` (opsiyonel)
- [ ] Name var
- [ ] Step array var
- [ ] Test: Google Rich Results Test

#### 12. ItemList Schema
- [ ] Schema var: `@type: ItemList` (bölgeler için)
- [ ] ItemListElement var
- [ ] NumberOfItems var
- [ ] Test: Google Rich Results Test

#### 13. ImageObject Schema
- [ ] Schema var: `@type: ImageObject` (görseller için)
- [ ] ContentUrl var
- [ ] Caption var
- [ ] Test: Google Rich Results Test

#### 14. Article Schema
- [ ] Schema var: `@type: Article` (blog için)
- [ ] Headline var
- [ ] Author var
- [ ] DatePublished var
- [ ] Publisher var
- [ ] Test: Google Rich Results Test

#### 15. Offer Schema
- [ ] Schema var: `@type: Offer` (fiyatlar için)
- [ ] Name var
- [ ] Price var
- [ ] PriceCurrency var
- [ ] Availability var
- [ ] Test: Google Rich Results Test

### 4.5. Schema Validation

#### Google Rich Results Test
- [ ] Ana sayfa test edildi
- [ ] Hakkımızda test edildi
- [ ] İletişim test edildi
- [ ] Bölge sayfası test edildi
- [ ] Hata yok
- [ ] Warning yok
- [ ] Test: https://search.google.com/test/rich-results

#### Schema.org Validator
- [ ] Ana sayfa validate edildi
- [ ] Hata yok
- [ ] Test: https://validator.schema.org/

#### JSON-LD Format
- [ ] Tüm schema'lar JSON-LD formatında
- [ ] @context var
- [ ] @type var
- [ ] @graph kullanılmış (multiple schema için)
- [ ] Test: View Page Source → JSON-LD kontrol

---

## 5. TECHNICAL SEO KONTROL LİSTESİ

### 5.1. Sitemap

#### XML Sitemap
- [ ] Sitemap oluşturulmuş: `/sitemap.xml`
- [ ] Tüm sayfalar sitemap'te var
- [ ] Priority değerleri doğru
- [ ] ChangeFrequency değerleri doğru
- [ ] LastMod tarihleri doğru
- [ ] Test: `http://localhost:3000/sitemap.xml` aç

#### Sitemap Index
- [ ] Sitemap index var (50+ sayfa için)
- [ ] Alt sitemap'ler var
- [ ] Test: `/sitemap.xml` kontrol

#### Google Search Console
- [ ] Sitemap Google'a gönderildi
- [ ] Sitemap hatasız
- [ ] Test: Google Search Console → Sitemaps

### 5.2. Robots.txt

#### Robots.txt File
- [ ] Robots.txt var: `/robots.txt`
- [ ] User-agent: * var
- [ ] Allow: / var
- [ ] Disallow: /dashboard/ var
- [ ] Disallow: /api/ var
- [ ] Sitemap URL var
- [ ] Test: `http://localhost:3000/robots.txt` aç

#### Robots Meta Tag
- [ ] Her sayfada robots meta tag var
- [ ] Dashboard sayfalarında noindex var
- [ ] Test: View Page Source → Robots kontrol

### 5.3. SSL & HTTPS

#### SSL Certificate
- [ ] SSL sertifikası yüklü
- [ ] HTTPS çalışıyor
- [ ] HTTP → HTTPS redirect var
- [ ] Mixed content yok
- [ ] Test: https:// ile aç

### 5.4. Structured Data

#### JSON-LD Implementation
- [ ] Tüm schema'lar JSON-LD formatında
- [ ] Script tag'ler doğru
- [ ] Syntax hatasız
- [ ] Test: View Page Source → JSON-LD kontrol

### 5.5. Hreflang (Çoklu Dil)

#### Hreflang Tags
- [ ] `<link rel="alternate" hreflang="tr" href="...">`
- [ ] `<link rel="alternate" hreflang="x-default" href="...">`
- [ ] Test: View Page Source → Hreflang kontrol

### 5.6. Pagination

#### Rel Next/Prev
- [ ] Sayfalama varsa rel="next" var
- [ ] Sayfalama varsa rel="prev" var
- [ ] Test: Sayfalı içerik kontrol

---

## 6. PERFORMANCE & CORE WEB VITALS

### 6.1. Core Web Vitals

#### LCP (Largest Contentful Paint)
- [ ] LCP < 2.5s
- [ ] Hero image optimize
- [ ] Critical CSS inline
- [ ] Test: Lighthouse → Performance

#### FID (First Input Delay)
- [ ] FID < 100ms
- [ ] JavaScript optimize
- [ ] Event listeners optimize
- [ ] Test: Lighthouse → Performance

#### CLS (Cumulative Layout Shift)
- [ ] CLS < 0.1
- [ ] Image dimensions belirtilmiş
- [ ] Font loading optimize
- [ ] Test: Lighthouse → Performance

### 6.2. Page Speed

#### Lighthouse Score
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90
- [ ] Test: Lighthouse → Run audit

#### GTmetrix Score
- [ ] Grade A
- [ ] Performance > 90%
- [ ] Structure > 90%
- [ ] Test: GTmetrix.com → URL gir

#### PageSpeed Insights
- [ ] Mobile score > 90
- [ ] Desktop score > 90
- [ ] Test: PageSpeed Insights → URL gir

### 6.3. Image Optimization

#### Image Format
- [ ] WebP kullanılmış
- [ ] Fallback var (JPEG/PNG)
- [ ] Test: Network tab → Images kontrol

#### Image Size
- [ ] Tüm görseller < 200KB
- [ ] Hero image < 500KB
- [ ] Thumbnail < 50KB
- [ ] Test: Image file size kontrol

#### Lazy Loading
- [ ] Lazy loading aktif
- [ ] Above-the-fold görseller eager
- [ ] Test: Network tab → Scroll kontrol

#### Responsive Images
- [ ] srcset kullanılmış
- [ ] sizes attribute var
- [ ] Test: DevTools → Responsive kontrol

### 6.4. Code Optimization

#### Minification
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] HTML minified (production)
- [ ] Test: View Page Source → Minified mi?

#### Code Splitting
- [ ] Dynamic imports kullanılmış
- [ ] Route-based splitting var
- [ ] Test: Network tab → Chunks kontrol

#### Tree Shaking
- [ ] Unused code removed
- [ ] Bundle size optimize
- [ ] Test: Bundle analyzer

### 6.5. Caching

#### Browser Caching
- [ ] Cache-Control headers var
- [ ] Static assets cached (1 year)
- [ ] Test: Network tab → Headers kontrol

#### Service Worker
- [ ] Service worker registered
- [ ] Offline support var
- [ ] Test: DevTools → Application → Service Workers

---

## 7. MOBILE & RESPONSIVE KONTROL

### 7.1. Mobile-First Design

#### Responsive Breakpoints
- [ ] Mobile: < 640px çalışıyor
- [ ] Tablet: 640px-1024px çalışıyor
- [ ] Desktop: > 1024px çalışıyor
- [ ] Test: DevTools → Responsive mode

#### Touch Targets
- [ ] Buton boyutu min 44x44px
- [ ] Link aralıkları yeterli
- [ ] Test: Mobile cihazda test et

#### Font Sizes
- [ ] Body text min 16px
- [ ] Headings okunabilir
- [ ] Test: Mobile cihazda test et

### 7.2. Mobile Navigation

#### Hamburger Menu
- [ ] Hamburger menu çalışıyor
- [ ] Menü açılıyor/kapanıyor
- [ ] Linkler çalışıyor
- [ ] Test: Mobile görünümde test et

#### Mobile Header
- [ ] Sticky header çalışıyor
- [ ] Logo görünüyor
- [ ] CTA buton görünüyor
- [ ] Test: Mobile görünümde scroll et

### 7.3. Mobile Performance

#### Mobile Page Speed
- [ ] Mobile Lighthouse > 90
- [ ] Mobile LCP < 2.5s
- [ ] Mobile FID < 100ms
- [ ] Mobile CLS < 0.1
- [ ] Test: Lighthouse → Mobile

### 7.4. Mobile UX

#### Tap Delay
- [ ] 300ms tap delay yok
- [ ] Test: Mobile cihazda test et

#### Viewport
- [ ] Viewport meta tag doğru
- [ ] Zoom çalışıyor (max-scale=5)
- [ ] Test: Mobile cihazda pinch zoom

---

## 8. SECURITY & PRIVACY KONTROL

### 8.1. Security Headers

#### X-Frame-Options
- [ ] `X-Frame-Options: DENY`
- [ ] Test: Security Headers → URL gir

#### X-Content-Type-Options
- [ ] `X-Content-Type-Options: nosniff`
- [ ] Test: Security Headers kontrol

#### X-XSS-Protection
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] Test: Security Headers kontrol

#### Content-Security-Policy
- [ ] CSP header var
- [ ] Test: Security Headers kontrol

### 8.2. HTTPS & SSL

#### SSL Certificate
- [ ] SSL valid
- [ ] SSL expiry > 30 days
- [ ] Test: SSL Labs → URL gir

#### HTTPS Redirect
- [ ] HTTP → HTTPS redirect çalışıyor
- [ ] Test: http:// ile aç

### 8.3. Privacy

#### Privacy Policy
- [ ] Privacy policy sayfası var
- [ ] GDPR uyumlu
- [ ] Test: Footer → Privacy Policy

#### Cookie Consent
- [ ] Cookie banner var
- [ ] Accept/Reject çalışıyor
- [ ] Test: İlk ziyaret → Banner görünüyor mu?

#### GDPR Compliance
- [ ] Kullanıcı verisi şifreleniyor
- [ ] Veri silme hakkı var
- [ ] Test: Privacy policy kontrol

---

## 9. ANALYTICS & TRACKING KONTROL

### 9.1. Google Analytics

#### GA4 Setup
- [ ] GA4 ID eklendi
- [ ] Tracking code çalışıyor
- [ ] Test: GA4 Real-time → Sayfa görünüyor mu?

#### Events Tracking
- [ ] Form submission tracked
- [ ] Button clicks tracked
- [ ] Phone clicks tracked
- [ ] Email clicks tracked
- [ ] Test: GA4 Events → Events görünüyor mu?

### 9.2. Google Tag Manager

#### GTM Setup
- [ ] GTM ID eklendi
- [ ] Container çalışıyor
- [ ] Test: GTM Preview mode

#### Tags
- [ ] GA4 tag çalışıyor
- [ ] Facebook Pixel tag çalışıyor
- [ ] Test: GTM → Tags kontrol

### 9.3. Google Search Console

#### GSC Setup
- [ ] Site eklendi
- [ ] Ownership verified
- [ ] Test: Google Search Console → Property kontrol

#### Sitemap Submission
- [ ] Sitemap gönderildi
- [ ] Sitemap hatasız
- [ ] Test: GSC → Sitemaps

#### Coverage
- [ ] Tüm sayfalar indexed
- [ ] Error yok
- [ ] Test: GSC → Coverage

### 9.4. Facebook Pixel

#### Pixel Setup
- [ ] Pixel ID eklendi
- [ ] Pixel çalışıyor
- [ ] Test: Facebook Pixel Helper

#### Events
- [ ] PageView tracked
- [ ] Lead tracked (form submission)
- [ ] Test: Facebook Events Manager

---

## 10. CONTENT QUALITY KONTROL

### 10.1. Content Uniqueness

#### Duplicate Content
- [ ] Tüm içerik unique
- [ ] Copyscape test yapıldı
- [ ] Test: Copyscape.com → URL gir

#### Thin Content
- [ ] Tüm sayfalar > 300 kelime
- [ ] Ana sayfa > 1500 kelime
- [ ] Test: Word counter

### 10.2. Content Freshness

#### Last Updated
- [ ] Son güncelleme tarihi gösteriliyor
- [ ] Tarih güncel (2026)
- [ ] Test: Sayfa altında kontrol et

#### Content Update Schedule
- [ ] Ana sayfa: Aylık
- [ ] Bölge sayfaları: 3 ayda bir
- [ ] Blog: Haftalık
- [ ] Test: Güncelleme planı var mı?

### 10.3. Content Readability

#### Flesch Reading Ease
- [ ] Score > 60 (kolay okunur)
- [ ] Test: Hemingway Editor

#### Sentence Length
- [ ] Ortalama < 20 kelime
- [ ] Test: Hemingway Editor

#### Paragraph Length
- [ ] Ortalama 3-4 cümle
- [ ] Test: Manuel kontrol

### 10.4. Content Structure

#### Headings
- [ ] H1 var (1 adet)
- [ ] H2 var (3-5 adet)
- [ ] H3 var (gerekirse)
- [ ] Hiyerarşi doğru
- [ ] Test: DevTools → Headings kontrol

#### Lists
- [ ] Bullet points kullanılmış
- [ ] Numbered lists kullanılmış
- [ ] Test: Manuel kontrol

#### Images
- [ ] Her 300 kelimede 1 görsel
- [ ] Görseller relevant
- [ ] Test: Manuel kontrol

---

## 11. LOCAL SEO KONTROL

### 11.1. Google My Business

#### GMB Profile
- [ ] GMB profil oluşturuldu
- [ ] Business name doğru
- [ ] Address doğru
- [ ] Phone doğru
- [ ] Website URL doğru
- [ ] Test: Google Maps → Business ara

#### GMB Categories
- [ ] Primary category: Moving Company
- [ ] Secondary categories eklendi
- [ ] Test: GMB Dashboard

#### GMB Photos
- [ ] Logo yüklendi
- [ ] Cover photo yüklendi
- [ ] Interior photos yüklendi
- [ ] Exterior photos yüklendi
- [ ] Test: GMB Dashboard → Photos

#### GMB Posts
- [ ] İlk post paylaşıldı
- [ ] Haftalık post planı var
- [ ] Test: GMB Dashboard → Posts

### 11.2. NAP Consistency

#### Name
- [ ] Site name tutarlı (tüm sayfalarda aynı)
- [ ] GMB name aynı
- [ ] Schema name aynı
- [ ] Test: Manuel kontrol

#### Address
- [ ] Address tutarlı (tüm sayfalarda aynı)
- [ ] GMB address aynı
- [ ] Schema address aynı
- [ ] Test: Manuel kontrol

#### Phone
- [ ] Phone tutarlı (tüm sayfalarda aynı)
- [ ] GMB phone aynı
- [ ] Schema phone aynı
- [ ] Click-to-call çalışıyor
- [ ] Test: Manuel kontrol

### 11.3. Local Citations

#### Directory Listings
- [ ] Yandex Haritalar'a eklendi
- [ ] Foursquare'e eklendi
- [ ] Yelp'e eklendi (varsa)
- [ ] Test: Her directory'de ara

#### NAP Consistency (Citations)
- [ ] Tüm directory'lerde NAP aynı
- [ ] Test: Manuel kontrol

### 11.4. Local Schema

#### LocalBusiness Schema
- [ ] Schema var
- [ ] Address var
- [ ] Geo coordinates var
- [ ] OpeningHours var
- [ ] Test: Google Rich Results Test

#### Service Area
- [ ] AreaServed belirtilmiş
- [ ] GeoCircle kullanılmış (opsiyonel)
- [ ] Test: Schema kontrol

---

## 12. E-E-A-T KONTROL

### 12.1. Experience (Deneyim)

#### Company History
- [ ] Hakkımızda'da şirket geçmişi var
- [ ] Kuruluş yılı belirtilmiş
- [ ] Deneyim yılı belirtilmiş (10+ yıl)
- [ ] Test: `/hakkimizda` kontrol

#### Case Studies
- [ ] Başarılı projeler gösterilmiş
- [ ] Müşteri hikayeleri var
- [ ] Test: Hakkımızda sayfası kontrol

### 12.2. Expertise (Uzmanlık)

#### Team Members
- [ ] Ekip üyeleri gösterilmiş
- [ ] Uzmanlık alanları belirtilmiş
- [ ] Test: Hakkımızda sayfası kontrol

#### Certifications
- [ ] Sertifikalar gösterilmiş
- [ ] Lisanslar belirtilmiş
- [ ] Test: Hakkımızda sayfası kontrol

### 12.3. Authoritativeness (Otorite)

#### Backlinks
- [ ] KARAKAR Web footer link var (dofollow)
- [ ] Backlink stratejisi var
- [ ] Test: Footer kontrol

#### Media Mentions
- [ ] Medya bahisleri gösterilmiş (varsa)
- [ ] Test: Hakkımızda sayfası kontrol

### 12.4. Trustworthiness (Güvenilirlik)

#### Trust Signals
- [ ] SSL sertifikası var
- [ ] Gizlilik politikası var
- [ ] Kullanım şartları var
- [ ] İade politikası var
- [ ] Garanti bilgileri var
- [ ] Sigorta bilgileri var
- [ ] Test: Footer → Policies kontrol

#### Reviews & Ratings
- [ ] Müşteri yorumları var (min 10)
- [ ] Aggregate rating gösteriliyor
- [ ] Google reviews var
- [ ] Test: Ana sayfa → Reviews section

#### Contact Information
- [ ] Telefon görünür
- [ ] Email görünür
- [ ] Adres görünür
- [ ] İletişim formu çalışıyor
- [ ] Test: İletişim sayfası kontrol

---

## 13. DEPLOYMENT KONTROL

### 13.1. Pre-Deployment

#### Build Test
- [ ] `npm run build` hatasız
- [ ] Build warnings yok
- [ ] Test: Terminal → `npm run build`

#### Type Check
- [ ] TypeScript hataları yok
- [ ] Test: Terminal → `tsc --noEmit`

#### Lint Check
- [ ] ESLint hataları yok
- [ ] Test: Terminal → `npm run lint`

#### Environment Variables
- [ ] `.env.local` dosyası var
- [ ] Tüm gerekli env variables tanımlı
- [ ] Production env variables hazır
- [ ] Test: `.env.local` kontrol

### 13.2. Vercel Deployment

#### Vercel Setup
- [ ] Vercel hesabı var
- [ ] Proje Vercel'e bağlandı
- [ ] Test: Vercel Dashboard

#### Domain Setup
- [ ] Custom domain eklendi
- [ ] DNS ayarları yapıldı
- [ ] SSL otomatik
- [ ] Test: Custom domain aç

#### Environment Variables (Vercel)
- [ ] Tüm env variables Vercel'e eklendi
- [ ] Production values doğru
- [ ] Test: Vercel → Settings → Environment Variables

### 13.3. Post-Deployment

#### Site Accessibility
- [ ] Site açılıyor
- [ ] Tüm sayfalar çalışıyor
- [ ] Test: Production URL aç

#### Functionality Test
- [ ] Formlar çalışıyor
- [ ] Email gönderimi çalışıyor
- [ ] Dashboard login çalışıyor
- [ ] Test: Production'da test et

#### Performance Test
- [ ] Lighthouse score > 90
- [ ] Page speed iyi
- [ ] Test: Lighthouse → Production URL

---

## 14. TESTING & QA KONTROL

### 14.1. Browser Testing

#### Desktop Browsers
- [ ] Chrome çalışıyor
- [ ] Firefox çalışıyor
- [ ] Safari çalışıyor
- [ ] Edge çalışıyor
- [ ] Test: Her tarayıcıda aç

#### Mobile Browsers
- [ ] Chrome Mobile çalışıyor
- [ ] Safari iOS çalışıyor
- [ ] Samsung Internet çalışıyor
- [ ] Test: Mobile cihazda aç

### 14.2. Device Testing

#### Mobile Devices
- [ ] iPhone çalışıyor
- [ ] Android çalışıyor
- [ ] Tablet çalışıyor
- [ ] Test: Gerçek cihazlarda test et

#### Screen Sizes
- [ ] 320px (iPhone SE) çalışıyor
- [ ] 375px (iPhone 12) çalışıyor
- [ ] 768px (iPad) çalışıyor
- [ ] 1024px (Desktop) çalışıyor
- [ ] 1920px (Full HD) çalışıyor
- [ ] Test: DevTools → Responsive mode

### 14.3. Functionality Testing

#### Forms
- [ ] Fiyat formu çalışıyor
- [ ] İletişim formu çalışıyor
- [ ] Validation çalışıyor
- [ ] Error messages gösteriliyor
- [ ] Success messages gösteriliyor
- [ ] Test: Formları doldur

#### Links
- [ ] Tüm internal linkler çalışıyor
- [ ] Tüm external linkler çalışıyor
- [ ] Broken link yok
- [ ] Test: Link checker tool

#### Navigation
- [ ] Header navigation çalışıyor
- [ ] Footer navigation çalışıyor
- [ ] Breadcrumb navigation çalışıyor
- [ ] Mobile navigation çalışıyor
- [ ] Test: Tüm linklere tıkla

### 14.4. Accessibility Testing

#### WCAG 2.1 AA
- [ ] Color contrast yeterli
- [ ] Keyboard navigation çalışıyor
- [ ] Screen reader uyumlu
- [ ] Alt text var
- [ ] Test: Lighthouse → Accessibility

#### ARIA Labels
- [ ] ARIA labels kullanılmış
- [ ] ARIA roles doğru
- [ ] Test: DevTools → Accessibility

---

## 15. ÖZEL KONTROLLER

### 15.1. Domain Bağımsızlığı

#### Hardcode Check
- [ ] Hiçbir yerde hardcode domain yok
- [ ] Hiçbir yerde hardcode şehir yok
- [ ] Hiçbir yerde hardcode telefon yok
- [ ] Test: Grep → "istanbul" ara (lowercase)

#### Dynamic Values
- [ ] Tüm değerler Dashboard'dan geliyor
- [ ] Tüm değerler JSON dosyalarından geliyor
- [ ] Test: Dashboard → Değiştir → Frontend kontrol

### 15.2. Multi-Site Hazırlık

#### Settings Structure
- [ ] `data/settings/` klasörü var
- [ ] Tüm ayarlar JSON'da
- [ ] Test: `data/settings/` kontrol

#### Content Structure
- [ ] `data/content/` klasörü var
- [ ] Tüm içerikler JSON/MD'de
- [ ] Test: `data/content/` kontrol

### 15.3. KARAKAR Web Branding

#### Footer Logo
- [ ] KARAKAR Web logosu var
- [ ] Link dofollow
- [ ] Her sayfada görünüyor
- [ ] Test: Footer kontrol

#### Branding Consistency
- [ ] Logo doğru
- [ ] Renk paleti doğru
- [ ] Test: Tüm sayfalarda kontrol

---

## 🎯 KONTROL LİSTESİ KULLANIM KILAVUZU

### Nasıl Kullanılır?

1. **Sıralı Kontrol:** Listeden sırayla git, her maddeyi kontrol et
2. **Checkbox İşaretle:** Tamamlanan maddeleri işaretle
3. **Test Et:** Her maddede belirtilen test adımını uygula
4. **Hata Varsa Düzelt:** Hata bulursan hemen düzelt
5. **Tekrar Test Et:** Düzeltme sonrası tekrar test et

### Öncelik Sırası

#### Kritik (Önce Bunlar)
1. Frontend Kontrol (Section 1)
2. SEO Kontrol (Section 3)
3. Metadata & Schema (Section 4)
4. Technical SEO (Section 5)
5. Performance (Section 6)

#### Önemli (Sonra Bunlar)
6. Mobile & Responsive (Section 7)
7. Security & Privacy (Section 8)
8. Analytics & Tracking (Section 9)
9. Content Quality (Section 10)

#### İyileştirme (En Son)
10. Local SEO (Section 11)
11. E-E-A-T (Section 12)
12. Deployment (Section 13)
13. Testing & QA (Section 14)

### Test Ortamları

- **Local:** `http://localhost:3000`
- **Staging:** (Varsa staging URL)
- **Production:** (Production URL)

### Test Araçları

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema Validator:** https://validator.schema.org/
- **Lighthouse:** Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **SSL Labs:** https://www.ssllabs.com/ssltest/

---

## 📊 KONTROL İSTATİSTİKLERİ

**Toplam Kontrol Maddesi:** 500+

### Kategori Bazında
- Frontend: 80 madde
- Dashboard: 70 madde
- SEO: 100 madde
- Metadata & Schema: 80 madde
- Technical SEO: 40 madde
- Performance: 50 madde
- Mobile: 30 madde
- Security: 20 madde
- Analytics: 20 madde
- Content: 30 madde
- Local SEO: 25 madde
- E-E-A-T: 20 madde
- Deployment: 15 madde
- Testing: 40 madde

---

## 🚀 SONUÇ

Bu kontrol listesi, projenin **%100 eksiksiz** ve **SEO-optimize** şekilde tamamlanması için hazırlanmıştır.

**Her maddeyi kontrol et, test et, işaretle!**

**Başarılar! 🎉**
