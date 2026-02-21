# Teknoloji Stack

## [>] Genel Bakış

Modern, hızlı ve SEO-odaklı bir web sitesi için seçilmiş teknolojiler.

## [◆] Core Technologies

### Frontend Framework
- **Next.js 15.1** - React framework
  - App Router (yeni routing sistemi)
  - React Server Components (RSC)
  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - Incremental Static Regeneration (ISR)
  - API Routes

- **React 19** - UI library
  - Server Components
  - Concurrent rendering
  - Automatic batching

- **TypeScript 5.x** - Type safety
  - Strict mode
  - Path aliases (@/*)

### Styling
- **Tailwind CSS v4** - Utility-first CSS
  - JIT compiler
  - Custom design system
  - Responsive utilities
  - Dark mode support (kullanılmayacak ama hazır)

- **shadcn/ui** - UI component library
  - Radix UI primitives
  - Accessible components
  - Customizable
  - Copy-paste approach

### Rich Text Editor
- **TipTap** - WYSIWYG editor
  - Notion-like experience
  - HTML görüntüleme
  - Frontend preview
  - Extensible
  - Headless

**TipTap Özellikleri:**
- Bold, italic, underline
- Headings (H1-H6)
- Lists (bullet, numbered)
- Links
- Images
- Tables
- Code blocks
- Color picker
- Custom extensions

## [◈] SEO & Monitoring Dependencies (Yeni Eklenenler)

### Installation
```bash
# SEO Monitoring
npm install @vercel/analytics @vercel/speed-insights web-vitals

# Error Tracking
npm install @sentry/nextjs

# Google APIs
npm install googleapis

# Schema Validation
npm install schema-dts

# Performance
npm install -D @next/bundle-analyzer lighthouse lighthouse-ci

# Accessibility
npm install -D @axe-core/react
```

### Configuration

#### Vercel Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### Web Vitals
```typescript
// app/layout.tsx
import { sendToAnalytics } from '@/lib/analytics';

export function reportWebVitals(metric: any) {
  sendToAnalytics(metric);
}
```

#### Sentry
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

#### Google APIs
```typescript
// lib/google/client.ts
import { google } from 'googleapis';

export const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/webmasters.readonly',
  ],
});
```

## [□] Dependencies

### Production Dependencies

```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0",
  
  "tailwindcss": "^4.0.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  
  "@radix-ui/react-accordion": "^1.1.0",
  "@radix-ui/react-alert-dialog": "^1.0.0",
  "@radix-ui/react-dialog": "^1.0.0",
  "@radix-ui/react-dropdown-menu": "^2.0.0",
  "@radix-ui/react-label": "^2.0.0",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.0",
  "@radix-ui/react-toast": "^1.1.0",
  
  "@tiptap/react": "^2.1.0",
  "@tiptap/starter-kit": "^2.1.0",
  "@tiptap/extension-color": "^2.1.0",
  "@tiptap/extension-text-style": "^2.1.0",
  "@tiptap/extension-image": "^2.1.0",
  "@tiptap/extension-link": "^2.1.0",
  "@tiptap/extension-table": "^2.1.0",
  
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "class-variance-authority": "^0.7.0",
  
  "lucide-react": "^0.300.0",
  "react-hook-form": "^7.49.0",
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0",
  
  "sharp": "^0.33.0",
  "nodemailer": "^6.9.0",
  "bcryptjs": "^2.4.3",
  
  "next-seo": "^6.4.0",
  "next-sitemap": "^4.2.0",
  "schema-dts": "^1.1.0"
}
```

### Development Dependencies

```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "@types/bcryptjs": "^2.4.0",
  "@types/nodemailer": "^6.4.0",
  
  "eslint": "^8.0.0",
  "eslint-config-next": "^15.1.0",
  "prettier": "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.0"
}
```

## [◈] SEO Technologies (Genişletilmiş)

### Core SEO Packages

### Core SEO
- **next-seo** - Meta tags management
  - Title, description, keywords
  - Open Graph
  - Twitter Cards
  - Canonical URLs

- **next-sitemap** - Automatic sitemap generation
  - Dynamic routes
  - Multi-language support
  - robots.txt generation

- **schema-dts** - TypeScript definitions for Schema.org
  - Type-safe schemas
  - JSON-LD generation

### Schema.org Markup
- MovingCompany
- LocalBusiness
- Service
- BreadcrumbList
- FAQPage
- Review + AggregateRating
- WebPage

### Analytics
- Google Analytics GA4
- Google Tag Manager
- Google Search Console

## [◇] Email & Forms

### Email Templates (Premium)
- **react-email** - React-based email templates
- **@react-email/components** - Pre-built email components
- **@react-email/render** - Render React to HTML

**Özellikler:**
- Premium, modern tasarım
- Site tasarımına uygun (brand colors)
- Responsive (mobile-friendly)
- Tüm email client'larda çalışır
- Dashboard'dan özelleştirilebilir

**Email Templates:**
1. Fiyat Teklifi Email
2. İletişim Formu Email
3. Yorum İsteği Email
4. Hoş Geldin Email

### Email Sending

### Form Management
- **React Hook Form** - Form state management
  - Performance optimized
  - Validation
  - Error handling

- **Zod** - Schema validation
  - Type-safe
  - Runtime validation
  - Error messages

### Email Service
- **Nodemailer** - Email sending
  - Gmail SMTP
  - **Premium email templates** (react-email)
  - Attachment support
  - HTML email rendering
  - Email preview & testing
  - Template support
  - Attachments

**SMTP Providers (Esnek):**
- Gmail
- SendGrid
- Mailgun
- Amazon SES
- Custom SMTP

## [▢] Image Optimization

- **Sharp** - Image processing
  - Resize
  - Format conversion (WebP)
  - Compression
  - Lazy loading

- **Next.js Image** - Built-in optimization
  - Automatic WebP
  - Responsive images
  - Lazy loading
  - Blur placeholder

## [◆] Security

- **bcryptjs** - Password hashing
  - Salt rounds: 10
  - Secure hashing

- **Rate Limiting** - Brute force protection
  - Login attempts
  - API requests

## [◇] API Integration

### Google Maps API
- **Mesafe hesaplama** - Distance calculation
- **Süre hesaplama** - Duration calculation
- **Rota bilgisi** - Route information

**Kullanım:**
- Dashboard'dan API key girişi
- .env.local'de saklanır
- Toplu bölge eklemede otomatik hesaplama

## [▷] Deployment

### Vercel Pro
- **Serverless Functions** - API routes
- **Edge Network** - Global CDN
- **Automatic HTTPS** - SSL certificates
- **Preview Deployments** - PR previews
- **Analytics** - Web vitals

### Environment Variables
```bash
# Site (Başlangıç - Dashboard'dan değiştirilebilir)
NEXT_PUBLIC_SITE_URL=https://istanbulizmirevtasima.com.tr
NEXT_PUBLIC_SITE_NAME=İstanbul İzmir Evden Eve Nakliyat

# Dashboard
DASHBOARD_PASSWORD_HASH=<bcrypt_hash>

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@[domain]
SMTP_PASS=<app_password>

# Google Maps
GOOGLE_MAPS_API_KEY=<api_key>

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## [□] File Structure

Detaylı dosya yapısı için [FILE-STRUCTURE.md](FILE-STRUCTURE.md) dosyasına bakın.

## [◈] Data Flow

### Frontend → Backend
1. User action (form submit, button click)
2. React Hook Form validation
3. API route call (fetch)
4. Server-side processing
5. Response to client
6. UI update

### Data Storage
- **JSON files** - Settings, regions, pricing
- **Markdown files** - Content, blog posts
- **File system** - No database required

### Caching Strategy
- **Static pages** - ISR (revalidate: 3600)
- **Dynamic pages** - SSR with cache headers
- **API routes** - Cache-Control headers

## [◇] UI Components

### shadcn/ui Components
- Button
- Input
- Textarea
- Select
- Dialog
- Dropdown Menu
- Tabs
- Accordion
- Toast
- Label
- Form

### Custom Components
- PricingTable (gelişmiş fiyatlandırma tablosu)
- RegionCard (hizmet bölgesi kartı)
- HeroForm (fiyat teklif formu)
- Footer (4 katmanlı)
- Header (navigation)
- SEOHead (meta tags)

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Proje context'i
- [FILE-STRUCTURE.md](FILE-STRUCTURE.md) - Dosya yapısı
- [DASHBOARD.md](DASHBOARD.md) - Dashboard özellikleri
- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment rehberi

## [▷] Sonraki Adım

[STEP-01-SETUP.md](STEP-01-SETUP.md) ile projeyi kurmaya başlayın.
