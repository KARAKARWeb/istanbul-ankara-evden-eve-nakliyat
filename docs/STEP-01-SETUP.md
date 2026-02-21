# STEP 1: Proje Kurulumu

## [>] Hedef

Next.js 15.1 projesi oluşturmak ve temel paketleri kurmak.

## [□] Gereksinimler

- Node.js 20.x LTS
- npm veya yarn
- Git

## [▷] Kurulum Adımları

### 1. Next.js Projesi Oluştur

```bash
cd /Users/karakar/Desktop/evden-eve-nakliyat

npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Sorulacak sorular:**
- ✅ TypeScript? → Yes
- ✅ ESLint? → Yes
- ✅ Tailwind CSS? → Yes
- ✅ `src/` directory? → Yes
- ✅ App Router? → Yes
- ✅ Import alias? → Yes (@/*)
- ✅ Turbopack? → No (stable build için)

### 2. Temel Paketleri Kur

```bash
# UI Components (shadcn/ui dependencies)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast

# TipTap Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-color @tiptap/extension-text-style @tiptap/extension-image @tiptap/extension-link @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header

# Utilities
npm install clsx tailwind-merge class-variance-authority

# Icons
npm install lucide-react

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Image Processing
npm install sharp

# Email
npm install nodemailer
npm install -D @types/nodemailer

# Authentication
npm install bcryptjs
npm install -D @types/bcryptjs

# SEO
npm install next-seo next-sitemap schema-dts
```

### 3. Development Dependencies

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

### 4. Environment Variables

`.env.local` dosyası oluştur:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Evden Eve Nakliyat (Başlangıç: İstanbul İzmir)

# Dashboard (şifre: admin123 - değiştir!)
DASHBOARD_PASSWORD_HASH=$2a$10$rKvVXqZ8YqN5xJ5xJ5xJ5eO5xJ5xJ5xJ5xJ5xJ5xJ5xJ5xJ5xJ5xJ

# Email (Gmail örneği)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@[domain]
SMTP_PASS=your-app-password

# Google Maps API
GOOGLE_MAPS_API_KEY=your-api-key

# Analytics (opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### 5. .env.example Oluştur

```bash
cp .env.local .env.example
```

`.env.example` içindeki değerleri placeholder'larla değiştir.

### 6. Şifre Hash Oluştur

```bash
# Şifre hash oluşturma script'i
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
```

Çıkan hash'i `.env.local` dosyasındaki `DASHBOARD_PASSWORD_HASH` değerine yapıştır.

### 7. Git Ignore Güncelle

`.gitignore` dosyasına ekle:

```
# Environment
.env.local
.env.*.local

# Data
/data/

# Uploads
/public/uploads/

# Vercel
.vercel
```

### 8. Package.json Scripts Güncelle

`package.json` dosyasını aç ve scripts bölümünü güncelle:

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "generate-password": "node -e \"console.log(require('bcryptjs').hashSync(process.argv[1], 10))\"",
    "postbuild": "next-sitemap"
  }
}
```

### 9. Prettier Config

`.prettierrc` dosyası oluştur:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 10. TypeScript Config Güncelle

`tsconfig.json` dosyasını kontrol et:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 11. Next.js Config

`next.config.js` dosyasını oluştur:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.istanbulizmirevtasima.com.tr',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ]
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

module.exports = nextConfig
```

### 12. Tailwind Config

`tailwind.config.ts` dosyasını güncelle:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### 13. Global Styles

`src/styles/globals.css` dosyasını oluştur:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### [◇] Test Çalıştır

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç. Next.js başlangıç sayfasını görmelisin.

## ✅ Kontrol Listesi

- [ ] Next.js projesi oluşturuldu
- [ ] Tüm paketler kuruldu
- [ ] `.env.local` dosyası oluşturuldu
- [ ] Şifre hash'i oluşturuldu
- [ ] `.gitignore` güncellendi
- [ ] `package.json` scripts güncellendi
- [ ] Prettier config oluşturuldu
- [ ] TypeScript config kontrol edildi
- [ ] Next.js config oluşturuldu
- [ ] Tailwind config güncellendi
- [ ] Global styles oluşturuldu
- [ ] Development server çalışıyor

## 🐛 Olası Sorunlar

### Port 3000 kullanımda
```bash
# Port'u kontrol et
lsof -ti:3000

# Kullanımdaysa kill et
kill -9 $(lsof -ti:3000)
```

### Node version hatası
```bash
# Node version kontrol
node -v

# 20.x olmalı, değilse:
nvm install 20
nvm use 20
```

### Package kurulum hatası
```bash
# node_modules ve lock file'ı sil
rm -rf node_modules package-lock.json

# Tekrar kur
npm install
```

## 📚 Sonraki Adım

[STEP-02-STRUCTURE.md](STEP-02-STRUCTURE.md) - Dosya yapısını oluşturmaya geçin.
