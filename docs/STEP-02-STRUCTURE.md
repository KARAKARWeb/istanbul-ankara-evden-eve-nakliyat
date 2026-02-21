# STEP 2: Dosya Yapısı Oluşturma

## [>] Hedef

Proje klasör yapısını ve temel dosyaları oluşturmak.

## [□] Klasör Yapısı

### 1. Ana Klasörleri Oluştur

```bash
cd /Users/karakar/Desktop/evden-eve-nakliyat

# src/ altında klasörler
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/homepage
mkdir -p src/components/regions
mkdir -p src/components/dashboard
mkdir -p src/components/seo
mkdir -p src/components/shared

mkdir -p src/lib/api
mkdir -p src/lib/auth
mkdir -p src/lib/email
mkdir -p src/lib/seo
mkdir -p src/lib/validation
mkdir -p src/lib/constants

mkdir -p src/types

# data/ klasörü (file-based database)
mkdir -p data/settings
mkdir -p data/seo
mkdir -p data/regions
mkdir -p data/pricing
mkdir -p data/homepage
mkdir -p data/pages
mkdir -p data/footer

# public/ klasörü
mkdir -p public/uploads
mkdir -p public/images

# .gitkeep dosyaları ekle
touch data/settings/.gitkeep
touch data/seo/.gitkeep
touch data/regions/.gitkeep
touch data/pricing/.gitkeep
touch data/homepage/.gitkeep
touch data/pages/.gitkeep
touch data/footer/.gitkeep
touch public/uploads/.gitkeep
touch public/images/.gitkeep
```

### 2. Logo ve Favicon Taşı

```bash
# docs/ klasöründen public/ klasörüne taşı
mv docs/logo-beyaz.svg public/
mv docs/logo-koyu.svg public/
mv docs/favicon.ico public/
```

### 3. Utility Dosyaları Oluştur

**src/lib/utils.ts**
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDistance(km: number): string {
  return `${km} km`;
}

export function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h} saat ${m} dakika` : `${h} saat`;
}
```

### 4. Constants Dosyaları

**src/lib/constants/izmir-districts.ts**
```typescript
export const IZMIR_DISTRICTS = [
  'Aliağa',
  'Balçova',
  'Bayındır',
  'Bayraklı',
  'Bergama',
  'Beydağ',
  'Bornova',
  'Buca',
  'Çeşme',
  'Çiğli',
  'Dikili',
  'Foça',
  'Gaziemir',
  'Güzelbahçe',
  'Karabağlar',
  'Karaburun',
  'Karşıyaka',
  'Kemalpaşa',
  'Kınık',
  'Kiraz',
  'Konak',
  'Menderes',
  'Menemen',
  'Narlıdere',
  'Ödemiş',
  'Seferihisar',
  'Selçuk',
  'Tire',
  'Torbalı',
  'Urla',
] as const;

export type IzmirDistrict = (typeof IZMIR_DISTRICTS)[number];
```

**src/lib/constants/house-types.ts**
```typescript
export const HOUSE_TYPES = [
  { value: '1+0', label: '1+0' },
  { value: '1+1', label: '1+1' },
  { value: '2+1', label: '2+1' },
  { value: '3+1', label: '3+1' },
  { value: '4+1', label: '4+1' },
  { value: 'villa', label: 'Villa' },
] as const;

export const ELEVATOR_OPTIONS = [
  { value: 'with', label: 'Asansörlü' },
  { value: 'without', label: 'Asansörsüz' },
] as const;
```

**src/lib/constants/default-values.ts**
```typescript
export const DEFAULT_SITE_SETTINGS = {
  domain: 'istanbulizmirevtasima.com.tr',
  siteName: 'İstanbul İzmir Evden Eve Nakliyat',
  logo: '/logo-beyaz.svg',
  logoDark: '/logo-koyu.svg',
  favicon: '/favicon.ico',
};

export const DEFAULT_CONTACT_INFO = {
  address: 'Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul',
  phone: '+90 532 138 4979',
  email: 'info@istanbulizmirevtasima.com.tr',
  workingHours: {
    weekdays: '08:00 - 20:00',
    saturday: '08:00 - 20:00',
    sunday: '09:00 - 18:00',
  },
};

export const DEFAULT_ROUTE_INFO = {
  sourceCity: 'İstanbul',
  targetCity: 'İzmir',
  distance: 482,
  duration: 5.5,
  route: 'E87/O-4 Otoyolu',
};

export const DEFAULT_PRICING = {
  withElevator: {
    min: 1500,
    max: 3000,
  },
  withoutElevator: {
    min: 1800,
    max: 3500,
  },
};
```

### 5. TypeScript Types

**src/types/settings.ts**
```typescript
export interface SiteSettings {
  domain: string;
  siteName: string;
  logo: string;
  logoDark: string;
  favicon: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface RouteInfo {
  sourceCity: string;
  targetCity: string;
  distance: number;
  duration: number;
  route: string;
}

export interface CustomCodes {
  head?: string;
  bodyStart?: string;
  bodyEnd?: string;
}
```

**src/types/region.ts**
```typescript
export interface Region {
  id: string;
  title: string;
  slug: string;
  sourceCity: string;
  targetCity: string;
  distance: number;
  duration: number;
  priceRange: {
    min: number;
    max: number;
  };
  image?: string;
  content: string;
  faq: FAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
```

**src/types/pricing.ts**
```typescript
export interface PricingTable {
  withElevator: PriceRange;
  withoutElevator: PriceRange;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface PricingFormula {
  distanceMultiplier: number;
  houseTypeMultiplier: {
    '1+0': number;
    '1+1': number;
    '2+1': number;
    '3+1': number;
    '4+1': number;
    villa: number;
  };
  elevatorMultiplier: number;
}
```

**src/types/seo.ts**
```typescript
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
}

export interface SchemaOrg {
  movingCompany: any;
  localBusiness: any;
  service: any;
  breadcrumbList: any;
  faqPage: any;
  review: any;
  webPage: any;
}
```

### 6. Data Dosyaları (JSON)

**data/settings/site.json**
```json
{
  "domain": "istanbulizmirevtasima.com.tr",
  "siteName": "İstanbul İzmir Evden Eve Nakliyat",
  "logo": "/logo-beyaz.svg",
  "logoDark": "/logo-koyu.svg",
  "favicon": "/favicon.ico"
}
```

**data/settings/contact.json**
```json
{
  "address": "Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul",
  "phone": "+90 532 138 4979",
  "email": "info@istanbulizmirevtasima.com.tr",
  "workingHours": {
    "weekdays": "08:00 - 20:00",
    "saturday": "08:00 - 20:00",
    "sunday": "09:00 - 18:00"
  }
}
```

**data/settings/route-info.json**
```json
{
  "sourceCity": "İstanbul",
  "targetCity": "İzmir",
  "distance": 482,
  "duration": 5.5,
  "route": "E87/O-4 Otoyolu"
}
```

**data/pricing/general.json**
```json
{
  "withElevator": {
    "min": 1500,
    "max": 3000
  },
  "withoutElevator": {
    "min": 1800,
    "max": 3500
  }
}
```

### 7. Root Layout Güncelle

**src/app/layout.tsx**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'İstanbul İzmir Evden Eve Nakliyat',
  description: 'İstanbul\'dan İzmir\'e profesyonel evden eve nakliyat hizmeti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**src/app/page.tsx**
```typescript
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center py-20">
        İstanbul İzmir Evden Eve Nakliyat
      </h1>
      <p className="text-center text-muted-foreground">
        Proje yapısı hazır. Geliştirme devam ediyor...
      </p>
    </main>
  );
}
```

### 8. Test Et

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç. "İstanbul İzmir Evden Eve Nakliyat" başlığını görmelisin.

## ✅ Kontrol Listesi

- [ ] Tüm klasörler oluşturuldu
- [ ] Logo ve favicon taşındı
- [ ] Utility dosyaları oluşturuldu
- [ ] Constants dosyaları oluşturuldu
- [ ] TypeScript types oluşturuldu
- [ ] Data JSON dosyaları oluşturuldu
- [ ] Root layout güncellendi
- [ ] Ana sayfa oluşturuldu
- [ ] Development server çalışıyor

## 📚 Sonraki Adım

[STEP-03-DASHBOARD-AUTH.md](STEP-03-DASHBOARD-AUTH.md) - Dashboard authentication'ı kurmaya geçin.
