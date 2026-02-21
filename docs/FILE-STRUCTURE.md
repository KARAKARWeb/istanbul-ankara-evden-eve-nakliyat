# Dosya Yapısı

## [□] Proje Klasör Yapısı

```
evden-eve-nakliyat/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Ana sayfa
│   │   ├── hakkimizda/
│   │   │   └── page.tsx              # Hakkımızda sayfası
│   │   ├── iletisim/
│   │   │   └── page.tsx              # İletişim sayfası
│   │   ├── [region]/
│   │   │   └── page.tsx              # Dinamik bölge sayfaları
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   ├── page.tsx              # Dashboard ana sayfa
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Login sayfası
│   │   │   ├── ayarlar/
│   │   │   │   ├── page.tsx          # Genel ayarlar
│   │   │   │   ├── site/
│   │   │   │   ├── iletisim/
│   │   │   │   ├── calisma-saatleri/
│   │   │   │   ├── rota-bilgileri/
│   │   │   │   └── ozel-kodlar/
│   │   │   ├── seo/
│   │   │   │   ├── page.tsx          # SEO ana sayfa
│   │   │   │   ├── genel/
│   │   │   │   ├── schema/
│   │   │   │   ├── open-graph/
│   │   │   │   └── sitemap/
│   │   │   ├── ana-sayfa/
│   │   │   │   ├── page.tsx          # Ana sayfa yönetimi
│   │   │   │   ├── hero/
│   │   │   │   ├── seo-makale-ust/
│   │   │   │   ├── hizmetler/
│   │   │   │   ├── neden-biz/
│   │   │   │   ├── fiyatlandirma/
│   │   │   │   ├── sss/
│   │   │   │   ├── yorumlar/
│   │   │   │   ├── seo-makale-alt/
│   │   │   │   └── cta/
│   │   │   ├── hizmet-bolgeleri/
│   │   │   │   ├── page.tsx          # Bölge listesi
│   │   │   │   ├── yeni/
│   │   │   │   ├── toplu-ekle/
│   │   │   │   └── [id]/
│   │   │   ├── fiyatlandirma/
│   │   │   │   ├── page.tsx          # Fiyatlandırma yönetimi
│   │   │   │   ├── genel/
│   │   │   │   ├── katsayilar/
│   │   │   │   └── formul/
│   │   │   ├── sayfalar/
│   │   │   │   ├── hakkimizda/
│   │   │   │   ├── iletisim/
│   │   │   │   └── gizlilik/
│   │   │   ├── footer/
│   │   │   │   ├── katman-1/
│   │   │   │   ├── katman-2/
│   │   │   │   ├── katman-3/
│   │   │   │   └── katman-4/
│   │   │   └── medya/
│   │   │       └── page.tsx          # Medya yönetimi
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   └── logout/
│   │       ├── settings/
│   │       │   ├── site/
│   │       │   ├── contact/
│   │       │   ├── hours/
│   │       │   ├── route-info/
│   │       │   └── custom-codes/
│   │       ├── seo/
│   │       │   ├── general/
│   │       │   ├── schema/
│   │       │   ├── og/
│   │       │   └── sitemap/
│   │       ├── regions/
│   │       │   ├── route.ts          # CRUD operations
│   │       │   ├── bulk/
│   │       │   └── [id]/
│   │       ├── pricing/
│   │       │   └── route.ts
│   │       ├── homepage/
│   │       │   └── [section]/
│   │       ├── footer/
│   │       │   └── [layer]/
│   │       ├── media/
│   │       │   ├── upload/
│   │       │   └── delete/
│   │       ├── contact/
│   │       │   └── route.ts          # İletişim formu
│   │       └── maps/
│   │           └── distance/         # Google Maps API
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── label.tsx
│   │   │   └── form.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── footer-layer-1.tsx
│   │   │   ├── footer-layer-2.tsx
│   │   │   ├── footer-layer-3.tsx
│   │   │   └── footer-layer-4.tsx
│   │   ├── homepage/
│   │   │   ├── hero.tsx
│   │   │   ├── hero-form.tsx
│   │   │   ├── seo-article-top.tsx
│   │   │   ├── services.tsx
│   │   │   ├── why-us.tsx
│   │   │   ├── route-info.tsx
│   │   │   ├── pricing-table.tsx
│   │   │   ├── regions-showcase.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── reviews.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── seo-article-bottom.tsx
│   │   │   └── cta.tsx
│   │   ├── regions/
│   │   │   ├── region-card.tsx
│   │   │   ├── region-list.tsx
│   │   │   └── region-content.tsx
│   │   ├── dashboard/
│   │   │   ├── sidebar.tsx
│   │   │   ├── topbar.tsx
│   │   │   ├── stats-card.tsx
│   │   │   ├── tiptap-editor.tsx
│   │   │   ├── image-upload.tsx
│   │   │   ├── pricing-table-editor.tsx
│   │   │   └── bulk-region-form.tsx
│   │   ├── seo/
│   │   │   ├── seo-head.tsx
│   │   │   ├── schema-generator.tsx
│   │   │   └── breadcrumbs.tsx
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   ├── cn.ts                     # Class name merger
│   │   ├── api/
│   │   │   ├── settings.ts
│   │   │   ├── regions.ts
│   │   │   ├── pricing.ts
│   │   │   ├── seo.ts
│   │   │   └── maps.ts
│   │   ├── auth/
│   │   │   ├── password.ts           # bcrypt utilities
│   │   │   └── session.ts            # Session management
│   │   ├── email/
│   │   │   ├── send.ts               # Nodemailer
│   │   │   └── templates.ts          # Email templates
│   │   ├── seo/
│   │   │   ├── schema.ts             # Schema.org generators
│   │   │   ├── meta.ts               # Meta tags
│   │   │   └── sitemap.ts            # Sitemap generation
│   │   ├── validation/
│   │   │   ├── settings.ts           # Zod schemas
│   │   │   ├── regions.ts
│   │   │   ├── pricing.ts
│   │   │   └── contact.ts
│   │   └── constants/
│   │       ├── izmir-districts.ts    # İzmir ilçeleri
│   │       ├── house-types.ts        # Ev tipleri
│   │       └── default-values.ts     # Varsayılan değerler
│   │
│   ├── types/
│   │   ├── settings.ts
│   │   ├── region.ts
│   │   ├── pricing.ts
│   │   ├── seo.ts
│   │   └── api.ts
│   │
│   └── styles/
│       └── globals.css               # Global styles + Tailwind
│
├── public/
│   ├── logo-beyaz.svg                # Logo (light backgrounds)
│   ├── logo-koyu.svg                 # Logo (dark backgrounds)
│   ├── favicon.ico                   # Favicon
│   ├── uploads/                      # User uploaded images
│   │   └── .gitkeep
│   └── images/                       # Static images
│       └── .gitkeep
│
├── data/                             # File-based database
│   ├── sites/                        # Site configs (JSON)
│   │   └── default.json
│   ├── content/                      # Content (MD)
│   │   └── default-content.md
│   ├── regions/                      # Region configs (JSON)
│   │   ├── istanbul-bornova.json
│   │   ├── istanbul-konak.json
│   │   └── ...
│   ├── ratings/                      # Region ratings (JSON)
│   │   ├── istanbul-bornova-rating.json
│   │   ├── istanbul-konak-rating.json
│   │   └── ...
│   ├── settings/
│   │   ├── site.json                 # Site bilgileri
│   │   ├── contact.json              # İletişim bilgileri
│   │   ├── hours.json                # Çalışma saatleri
│   │   ├── route-info.json           # Rota bilgileri (kaynak-hedef şehir)
│   │   └── custom-codes.json         # Head/Body/Footer kodlar
│   ├── seo/
│   │   ├── general.json              # Genel SEO
│   │   ├── schemas.json              # Schema.org
│   │   └── og.json                   # Open Graph
│   ├── regions/
│   │   ├── [kaynak]-[hedef].json     # Dinamik bölge dosyaları
│   │   └── ...                       # Dashboard'dan eklenen bölgeler
│   ├── pricing/
│   │   ├── general.json              # Genel fiyatlar
│   │   └── formula.json              # Fiyat formülü
│   ├── homepage/
│   │   ├── hero.json
│   │   ├── seo-article-top.md
│   │   ├── services.json
│   │   ├── why-us.json
│   │   ├── faq.json
│   │   ├── reviews.json
│   │   ├── seo-article-bottom.md
│   │   └── cta.json
│   ├── pages/
│   │   ├── hakkimizda.md
│   │   ├── iletisim.json
│   │   └── gizlilik.md
│   └── footer/
│       ├── layer-1.json              # Linkler
│       ├── layer-2.json              # İçerik
│       ├── layer-3.json              # Linkler
│       └── layer-4.json              # Copyright/Developer
│
├── docs/                             # Dokümantasyon
│   ├── CONTEXT.md
│   ├── TECH-STACK.md
│   ├── FILE-STRUCTURE.md
│   ├── DASHBOARD.md
│   ├── SEO-STRATEGY.md
│   ├── DEPLOYMENT.md
│   ├── STEP-01-SETUP.md
│   ├── STEP-02-STRUCTURE.md
│   ├── STEP-03-DASHBOARD-AUTH.md
│   ├── STEP-04-DASHBOARD-SETTINGS.md
│   ├── STEP-05-DASHBOARD-SEO.md
│   ├── STEP-06-DASHBOARD-REGIONS.md
│   ├── STEP-07-DASHBOARD-PRICING.md
│   ├── STEP-08-FRONTEND-HOMEPAGE.md
│   ├── STEP-09-FRONTEND-PAGES.md
│   ├── STEP-10-FRONTEND-REGIONS.md
│   ├── STEP-11-SEO-IMPLEMENTATION.md
│   └── STEP-12-DEPLOYMENT.md
│
├── .env.local                        # Environment variables
├── .env.example                      # Example env file
├── .gitignore
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json
├── package-lock.json
├── README.md
└── vercel.json                       # Vercel deployment config
```

## [◇] Dosya Açıklamaları

### App Router (`src/app/`)
- **layout.tsx** - Root layout, global HTML structure
- **page.tsx** - Ana sayfa (12 section)
- **[region]/page.tsx** - Dinamik bölge sayfaları (örn: `/istanbul-bornova`)
- **dashboard/** - Admin panel (authentication required)
- **api/** - API routes (RESTful endpoints)

### Components (`src/components/`)
- **ui/** - shadcn/ui base components
- **layout/** - Header, Footer (4 katman)
- **homepage/** - Ana sayfa sections (12 adet)
- **regions/** - Hizmet bölgesi components
- **dashboard/** - Dashboard-specific components
- **seo/** - SEO-related components
- **shared/** - Shared components (loading, error, vb.)

### Library (`src/lib/`)
- **api/** - API client functions
- **auth/** - Authentication utilities
- **email/** - Email sending & templates
- **seo/** - SEO utilities (schema, meta, sitemap)
- **validation/** - Zod validation schemas
- **constants/** - Sabit değerler

### Types (`src/types/`)
TypeScript type definitions

### Data (`data/`)
File-based database (JSON + Markdown)

### Public (`public/`)
Static files (logo, favicon, uploads)

### Docs (`docs/`)
Proje dokümantasyonu

## [◈] Data Flow

### Settings Flow
```
Dashboard Form → API Route → Validation → JSON File → Frontend
```

### Region Flow
```
Dashboard → API → Validation → JSON File → Dynamic Route → Page
```

### Image Upload Flow
```
Dashboard → API → Sharp Optimization → /public/uploads/ → URL
```

### SEO Flow
```
Settings → Schema Generator → JSON-LD → <head> tag
```

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Proje context'i
- [TECH-STACK.md](TECH-STACK.md) - Teknoloji detayları
- [DASHBOARD.md](DASHBOARD.md) - Dashboard özellikleri
- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment rehberi

## [▷] Sonraki Adım

[STEP-01-SETUP.md](STEP-01-SETUP.md) ile projeyi kurmaya başlayın.
