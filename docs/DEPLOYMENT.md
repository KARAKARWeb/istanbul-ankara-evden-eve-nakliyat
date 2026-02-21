# Deployment Rehberi

## [!] ÖNEMLİ: Local Test Önceliği

**Deployment öncesi MUTLAKA:**
1. ✅ Local'de tam test et
2. ✅ Tüm özellikler çalışsın
3. ✅ Hata yok mu kontrol et
4. ✅ Production build başarılı olsun
5. ✅ Sonra deploy et

**ASLA:**
- ❌ Test etmeden deploy etme
- ❌ Hatalı kod gönderme
- ❌ Production'da test etme

## [>] Vercel Deployment

Proje Vercel Pro üzerinde deploy edilecektir.

## [▷] İlk Deployment

### 1. Vercel Hesabı
- [vercel.com](https://vercel.com) adresinden Pro hesap oluşturun
- GitHub hesabınızı bağlayın

### 2. Proje Bağlama
```bash
# Vercel CLI kurulumu
npm i -g vercel

# Proje dizinine gidin
cd /Users/karakar/Desktop/evden-eve-nakliyat

# Vercel'e login
vercel login

# İlk deployment
vercel
```

### 3. Environment Variables
Vercel dashboard'dan environment variables ekleyin:

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

### 4. Domain Bağlama
Vercel dashboard'dan:
1. **Settings** → **Domains**
2. Domain adınızı ekleyin (örn: `istanbulizmirevtasima.com.tr`)
3. DNS kayıtlarını güncelleyin:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```

## [◆] Build Settings

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.' + (process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '') || 'localhost'),
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ]
  },
  
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
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

## [▢] Production Build

### Build Komutu
```bash
npm run build
```

### Build Optimizasyonları
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Minification
- ✅ Image optimization
- ✅ Font optimization
- ✅ CSS optimization

### Build Çıktısı
```
Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         95.3 kB
├ ○ /hakkimizda                          2.1 kB         92.2 kB
├ ○ /iletisim                            3.5 kB         93.6 kB
├ ƒ /[region]                            4.8 kB         94.9 kB
├ ○ /dashboard                           8.2 kB         98.3 kB
└ ○ /dashboard/login                     2.5 kB         92.6 kB

○  (Static)  prerendered as static content
ƒ  (Dynamic) server-rendered on demand
```

## [◈] Continuous Deployment

### GitHub Integration
1. GitHub repository oluşturun
2. Vercel'de repository'yi bağlayın
3. Her push otomatik deploy olur

### Branch Strategy
```
main (production)
├── develop (staging)
└── feature/* (preview)
```

### Deployment Flow
```
1. Feature branch'e push
   → Vercel preview deployment
   
2. Develop branch'e merge
   → Staging deployment
   
3. Main branch'e merge
   → Production deployment
```

## [◆] Domain Değişikliği Sonrası

### Checklist
Dashboard'dan domain değiştirildiğinde:

1. ✅ **Vercel'de yeni domain ekleyin**
   - Settings → Domains
   - Yeni domain ekle
   - DNS kayıtlarını güncelle

2. ✅ **Environment variables güncelleyin**
   ```bash
   NEXT_PUBLIC_SITE_URL=https://yenidomain.com
   ```

3. ✅ **Yeniden deploy edin**
   ```bash
   vercel --prod
   ```

4. ✅ **Sitemap'i yeniden oluşturun**
   - Otomatik olarak yeni domain ile oluşturulur

5. ✅ **Google Search Console'a ekleyin**
   - Yeni domain'i Search Console'a ekle
   - Sitemap'i gönderin

6. ✅ **Analytics güncelleyin**
   - Google Analytics'te yeni property oluştur
   - GTM'de domain değişikliğini yapın

## [◈] Performance Monitoring

### Vercel Analytics
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times
- Error tracking

### Google Analytics GA4
- User behavior
- Conversion tracking
- Traffic sources
- Bounce rate

### Google Search Console
- Search performance
- Indexing status
- Core Web Vitals
- Mobile usability

## [◆] Security

### HTTPS
- Otomatik SSL certificate (Let's Encrypt)
- HSTS header
- Secure cookies

### Environment Variables
- Vercel dashboard'da güvenli saklanır
- Build time'da inject edilir
- Client-side'da expose edilmez (NEXT_PUBLIC_ prefix hariç)

### API Routes
- Rate limiting
- CORS configuration
- Input validation (Zod)
- Error handling

## [◇] Debugging

### Vercel Logs
```bash
# Realtime logs
vercel logs

# Specific deployment
vercel logs <deployment-url>
```

### Error Tracking
- Vercel Error Tracking (built-in)
- Console logs
- Source maps (production)

## [◈] Rollback

### Önceki Versiyona Dön
```bash
# Deployment listesi
vercel ls

# Belirli deployment'ı promote et
vercel promote <deployment-url>
```

### Vercel Dashboard'dan
1. **Deployments** sekmesine git
2. Önceki deployment'ı seç
3. **Promote to Production** butonuna tıkla

## [◈] Scaling

### Vercel Pro Limits
- **Bandwidth:** 1 TB/month
- **Serverless Function Execution:** 1000 GB-Hrs
- **Build Time:** 6000 minutes/month
- **Concurrent Builds:** 12
- **Team Members:** 10

### Auto-scaling
- Vercel otomatik scale eder
- Edge Network (global CDN)
- Serverless functions (on-demand)

## [◆] Maintenance

### Regular Tasks
- **Haftalık:** Analytics kontrolü
- **Aylık:** Dependency updates
- **3 Ayda:** Security audit
- **6 Ayda:** Performance review

### Updates
```bash
# Dependencies güncelle
npm update

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Proje context'i
- [TECH-STACK.md](TECH-STACK.md) - Teknoloji detayları
- [FILE-STRUCTURE.md](FILE-STRUCTURE.md) - Dosya yapısı
- [DASHBOARD.md](DASHBOARD.md) - Dashboard özellikleri
- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi

## [▷] Sonraki Adım

[STEP-12-DEPLOYMENT.md](STEP-12-DEPLOYMENT.md) ile deployment sürecini adım adım uygulayın.
