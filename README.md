# Evden Eve Nakliyat - Modern Web Platformu

**Domain ve şehir bağımsız, SEO-odaklı, premium evden eve nakliyat web sitesi.**

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

---

## 🎯 Proje Hakkında

Modern, hızlı ve SEO-odaklı evden eve nakliyat web sitesi platformu. Dashboard'dan tüm ayarlar (domain, şehirler, iletişim bilgileri) değiştirilebilir.

**Başlangıç Örneği:** İstanbul-İzmir  
**Özellik:** Tamamen domain ve şehir bağımsız

---

## ⚡ Hızlı Başlangıç

```bash
# Proje kurulumu
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Paketleri yükle
npm install

# Geliştirme sunucusu (Port: 3000)
npm run dev

# Production build
npm run build

# Production başlat
npm start
```

**Tarayıcıda aç:** http://localhost:3000

---

## 📁 Proje Yapısı

```
evden-eve-nakliyat/
├── src/                    # Kaynak kodlar
│   ├── app/               # Next.js App Router
│   │   ├── (dashboard)/   # Dashboard routes
│   │   ├── [region]/      # Dinamik bölge sayfaları
│   │   ├── hakkimizda/    # Hakkımızda sayfası
│   │   ├── iletisim/      # İletişim sayfası
│   │   └── page.tsx       # Ana sayfa
│   ├── components/        # React bileşenleri
│   │   ├── ui/           # shadcn/ui bileşenleri
│   │   ├── layout/       # Layout bileşenleri
│   │   ├── homepage/     # Ana sayfa bileşenleri
│   │   ├── dashboard/    # Dashboard bileşenleri
│   │   └── shared/       # Paylaşılan bileşenler
│   ├── lib/              # Yardımcı fonksiyonlar
│   │   ├── api/          # API istemcileri
│   │   ├── seo/          # SEO utilities
│   │   ├── email/        # Email utilities
│   │   └── utils.ts      # Genel utilities
│   └── types/            # TypeScript tipleri
├── public/               # Statik dosyalar
│   ├── images/          # Görseller
│   ├── fonts/           # Fontlar
│   └── favicon.ico      # Favicon
├── data/                # Dosya tabanlı veritabanı
│   ├── settings/        # Site ayarları (JSON)
│   ├── regions/         # Bölge verileri (JSON)
│   ├── ratings/         # Rating verileri (JSON)
│   ├── content/         # İçerik (Markdown)
│   └── emails/          # Email şablonları
├── docs/                # Dokümantasyon (42 .md dosyası)
└── .windsurf/           # Windsurf workspace
```

---

## 🚀 Özellikler

### Frontend (12 Section Ana Sayfa)
1. **Hero Section** - Başlık, açıklama, istatistikler, fiyat formu
2. **SEO Makale (Üst)** - 3 alt başlık, 200-300 kelime
3. **Hizmetler** - 6 hizmet kartı
4. **Neden Biz** - 6 özellik
5. **Rota Bilgileri** - Mesafe, süre, fiyat
6. **Premium Fiyatlandırma Tablosu** - 4 ev tipi
7. **Hizmet Bölgeleri** - 30+ bölge showcase
8. **SSS** - FAQPage schema ile
9. **Müşteri Yorumları** - ⭐⭐⭐⭐⭐ Rich Snippets
10. **İletişim Formu** - 7 alan
11. **SEO İçerik (Alt)** - 5 alt başlık, 500-800 kelime
12. **CTA Section** - Son çağrı

### Dashboard Özellikleri
- ✅ **Full-Page Editor** - Split view (editor + preview)
- ✅ **TipTap WYSIWYG** - Notion-like editor
- ✅ **Schema Yönetimi** - 15+ Schema.org markup
- ✅ **GMB Entegrasyonu** - Google My Business
- ✅ **NAP Consistency** - Name, Address, Phone kontrolü
- ✅ **Email Settings** - SMTP, preview, testing
- ✅ **Rating Yönetimi** - Otomatik bölge rating'leri
- ✅ **Core Web Vitals** - Performance monitoring

### SEO (15+ Schema.org Markup)
- MovingCompany
- LocalBusiness
- Service
- BreadcrumbList
- FAQPage
- AggregateRating
- Review
- WebPage
- Organization
- HowTo
- ItemList
- VideoObject
- ImageObject
- Article
- Offer
- ContactPoint

### Email Sistemi
- ✅ **Premium Templates** - React Email ile
- ✅ **4 Email Şablonu** - Fiyat teklifi, İletişim, Yorum isteği, Hoş geldin
- ✅ **Responsive** - Tüm email client'larda çalışır
- ✅ **Dashboard Özelleştirme** - Brand colors, logo, content

### Otomatik Rating Sistemi
- Her bölge kendi yıldız puanı (4.5-4.9)
- Her bölge kendi değerlendirme sayısı (15-50)
- Otomatik yorum oluşturma (5-10 adet)
- Google Rich Snippets aktif

---

## 🎨 Tasarım Sistemi

### Minimal & Premium Tasarım
**Vercel ve Apple benzeri minimal tasarım:**

#### Renk Paleti
```css
/* Ana Renkler */
--background: #FFFFFF;        /* Beyaz */
--foreground: #000000;        /* Siyah */
--card: #F5F5F5;             /* Açık gri - Kartlar */
--border: #E5E7EB;           /* Border */
--muted: #F9FAFB;            /* Muted background */

/* Text Renkler */
--text-primary: #000000;      /* Ana metin */
--text-secondary: #737373;    /* İkincil metin */
--text-muted: #A3A3A3;       /* Soluk metin */

/* Accent (Minimal kullanım) */
--accent: #16A34A;           /* Yeşil - Sadece CTA'larda */
```

#### Typography
```css
/* Minimal font boyutları */
H1: 28-32px (mobil), 36-40px (desktop) - MAX!
H2: 24-28px (mobil), 28-32px (desktop)
H3: 20-24px (mobil), 24-28px (desktop)
Body: 14-16px (mobil), 16-18px (desktop)

/* Font weight */
Max: 600 (semibold)
Normal: 400 (regular)
```

#### Spacing
```css
/* Section arası */
Desktop: 80-120px
Mobil: 64-80px

/* Component spacing */
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 24px
2xl: 32px
```

### Tasarım Prensipleri
1. **Mobil App Gibi** - Native hissi, smooth, 60 FPS
2. **Section Geçişleri Net** - Belirgin sınırlar, consistent spacing
3. **Minimal & Premium** - Temiz, sade, profesyonel

---

## 🛠️ Teknoloji Stack

### Core
- **Next.js 15.1** - React framework (App Router, RSC, SSR, ISR)
- **React 19** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS v4** - Utility-first CSS

### UI & Editor
- **shadcn/ui** - Accessible UI components
- **Radix UI** - Headless UI primitives
- **TipTap** - WYSIWYG editor
- **Lucide React** - Outline icons

### SEO & Analytics
- **next-seo** - Meta tags management
- **next-sitemap** - Sitemap generation
- **schema-dts** - Schema.org TypeScript definitions
- **@vercel/analytics** - Web vitals tracking
- **Google APIs** - Search Console, GMB

### Email
- **react-email** - Email template framework
- **@react-email/components** - Email components
- **nodemailer** - Email sending

### Forms & Validation
- **react-hook-form** - Form state management
- **zod** - Schema validation

### Image & Performance
- **sharp** - Image processing
- **Next.js Image** - Built-in optimization

### Security
- **bcryptjs** - Password hashing

---

## 📚 Dokümantasyon

### Başlangıç İçin
- **[CONTEXT.md](docs/CONTEXT.md)** - Proje amacı ve özellikleri
- **[TECH-STACK.md](docs/TECH-STACK.md)** - Teknoloji detayları
- **[FILE-STRUCTURE.md](docs/FILE-STRUCTURE.md)** - Dosya yapısı
- **[STEP-01-SETUP.md](docs/STEP-01-SETUP.md)** - İlk kurulum

### Geliştirme İçin
- **[DASHBOARD.md](docs/DASHBOARD.md)** - Dashboard özellikleri
- **[DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)** - Tasarım sistemi
- **[SEO-STRATEGY.md](docs/SEO-STRATEGY.md)** - SEO stratejisi
- **[EMAIL-TEMPLATES.md](docs/EMAIL-TEMPLATES.md)** - Email şablonları
- **[REGION-RATING-SYSTEM.md](docs/REGION-RATING-SYSTEM.md)** - Rating sistemi
- **[TOC-SYSTEM.md](docs/TOC-SYSTEM.md)** - Table of contents

### Deployment
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Vercel deployment rehberi

### Tüm Dokümantasyon
**42 .md dosyası** `docs/` klasöründe mevcuttur.

---

## ⚙️ Konfigürasyon

### Environment Variables

```bash
# .env.local (local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=İstanbul İzmir Evden Eve Nakliyat
DASHBOARD_PASSWORD_HASH=<bcrypt_hash>

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@domain.com
SMTP_PASS=<app_password>

# Google Maps API
GOOGLE_MAPS_API_KEY=<api_key>

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Port
**Standart Port:** 3000  
**URL:** http://localhost:3000

---

## 🔒 Kritik Kurallar

### 1. Emoji Yasağı
❌ **KULLANMA:** 🎯 📊 ✅ 🚀 📝 🌟  
✅ **KULLAN:** `[>]` `[◈]` `[◇]` `[□]` `[▷]` `[★]`

### 2. Hardcode Yasağı
❌ **KULLANMA:** `"İstanbul"` `"+905321384979"` `"domain.com"`  
✅ **KULLAN:** `{{SOURCE_CITY}}` `{{SITE_PHONE}}` `{{SITE_DOMAIN}}`

### 3. Domain Bağımsızlığı
Tüm ayarlar `data/settings/` klasöründen okunmalı.

### 4. Local-First Development
Local'de test et → Hataları düzelt → Sonra deploy et

### 5. Footer Logo
Her sayfada KARAKAR Web logosu (dofollow link) olmalı.

---

## 🧪 Testing

### Pre-Deployment Checklist
```bash
# Build test
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Local test
npm run dev
```

### Performance Hedefleri
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Lighthouse Score:** > 90

---

## 🚀 Deployment

### Vercel Pro
```bash
# Vercel CLI ile deploy
vercel

# Production deploy
vercel --prod
```

### Environment Variables (Vercel)
Dashboard'dan tüm environment variables'ı ekle.

---

## 📞 İletişim

**Geliştirici:** KARAKAR Web Tasarım ve Yazılım Ajansı

- **Website:** https://karakar.web.tr
- **Email:** info@karakar.web.tr
- **Telefon:** +90 532 138 4979
- **WhatsApp:** https://wa.me/905321384979
- **Canlı Destek:** https://tawk.to/karakar

---

## 📄 Lisans

Bu proje KARAKAR Web tarafından geliştirilmiştir.

---

## 🎯 Proje Durumu

**Dokümantasyon:** %100 ✅  
**Geliştirme:** Başlamaya hazır 🚀  
**Son Güncelleme:** 20 Şubat 2026

---

**Proje başlatmaya hazır! Geliştirmeye başlayabilirsiniz.** 🎉
