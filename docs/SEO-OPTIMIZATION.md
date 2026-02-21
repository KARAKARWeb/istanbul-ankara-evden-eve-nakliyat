# SEO Performance Optimization

## [>] Page Speed Optimization (Kritik!)

### Critical Rendering Path Optimization

#### 1. Critical CSS Inline
```typescript
// app/layout.tsx
export default function RootLayout({ children }: { children: React.Node }) {
  return (
    <html lang="tr">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 2. Defer Non-Critical CSS
```html
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/main.css"></noscript>
```

#### 3. Font Optimization
```css
/* Font Display Swap */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/inter.woff2') format('woff2');
}
```

```html
<!-- Preload Fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

### Resource Hints

#### Preconnect
```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Analytics -->
<link rel="preconnect" href="https://www.google-analytics.com">
```

#### DNS Prefetch
```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://maps.googleapis.com">
```

#### Prefetch
```html
<!-- Next page prefetch -->
<link rel="prefetch" href="/hakkimizda">
<link rel="prefetch" href="/iletisim">
```

#### Preload
```html
<!-- Critical resources -->
<link rel="preload" href="/hero-image.webp" as="image">
<link rel="preload" href="/logo.svg" as="image">
```

### JavaScript Optimization

#### Code Splitting
```typescript
// Dynamic imports
const PricingTable = dynamic(() => import('@/components/PricingTable'), {
  loading: () => <PricingTableSkeleton />,
  ssr: false, // Client-side only
});

const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <ReviewsSkeleton />,
});
```

#### Tree Shaking
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};
```

#### Minification
```javascript
// next.config.js
module.exports = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Image Optimization

#### Next.js Image Component
```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Evden eve nakliyat"
  width={1920}
  height={1080}
  priority // LCP image
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### Responsive Images
```typescript
<Image
  src="/hero.jpg"
  alt="Evden eve nakliyat"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  style={{ objectFit: 'cover' }}
/>
```

#### WebP Format
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

#### Lazy Loading
```typescript
<Image
  src="/service-1.jpg"
  alt="Hizmet 1"
  width={400}
  height={300}
  loading="lazy" // Default
/>
```

#### LQIP (Low Quality Image Placeholder)
```typescript
import { getPlaiceholder } from 'plaiceholder';

export async function getStaticProps() {
  const { base64, img } = await getPlaiceholder('/hero.jpg');
  
  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}
```

## [◈] Mobile-First Optimization (Kritik!)

### Mobile-Specific Optimizations

#### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
```

#### Touch Target Size
```css
/* Minimum 48x48px touch targets */
.button, .link {
  min-width: 48px;
  min-height: 48px;
  padding: 12px 24px;
}
```

#### Readable Font Sizes
```css
/* Minimum 16px font size */
body {
  font-size: 16px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  
  h1 {
    font-size: 28px;
  }
}
```

#### Mobile Navigation
```typescript
// Mobile-friendly hamburger menu
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 touch-target"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>
      {/* Mobile menu */}
    </nav>
  );
};
```

### Adaptive Loading
```typescript
// Detect connection speed
const { effectiveType } = navigator.connection || {};

const shouldLoadHeavyContent = effectiveType === '4g';

if (shouldLoadHeavyContent) {
  // Load high-quality images and videos
} else {
  // Load optimized versions
}
```

### Mobile Performance Budget
```json
{
  "mobile": {
    "firstContentfulPaint": 1800,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3800,
    "totalBlockingTime": 300,
    "cumulativeLayoutShift": 0.1,
    "speedIndex": 3000
  }
}
```

## [◈] Core Web Vitals Optimization

### LCP Optimization

#### Strategies
1. **Optimize images** - WebP, responsive, lazy loading
2. **Preload LCP image** - `<link rel="preload">`
3. **Remove render-blocking resources** - Defer CSS/JS
4. **Server-side rendering** - Next.js SSR
5. **CDN usage** - Vercel Edge Network

#### Implementation
```typescript
// Preload LCP image
export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/hero.webp" />
      </Head>
      <Image
        src="/hero.webp"
        alt="Hero"
        priority
        width={1920}
        height={1080}
      />
    </>
  );
}
```

### FID/INP Optimization

#### Strategies
1. **Code splitting** - Dynamic imports
2. **Defer JavaScript** - Non-critical scripts
3. **Web Workers** - Heavy computations
4. **Debounce/Throttle** - Event handlers
5. **React.memo** - Prevent re-renders

#### Implementation
```typescript
// Debounce search input
import { useDebouncedCallback } from 'use-debounce';

const handleSearch = useDebouncedCallback((value) => {
  // Search logic
}, 300);

// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});
```

### CLS Optimization

#### Strategies
1. **Reserve space** - Width/height attributes
2. **Avoid dynamic content** - Above the fold
3. **Font loading** - font-display: swap
4. **Image dimensions** - Always specify
5. **Avoid animations** - That cause layout shifts

#### Implementation
```typescript
// Reserve space for images
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  style={{ aspectRatio: '4/3' }}
/>

// Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>
```

## [◈] Caching Strategy

### HTTP Caching
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};
```

### Service Worker Caching
```typescript
// service-worker.ts
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/main.js',
        '/images/logo.svg',
      ]);
    })
  );
});
```

### React Query Caching
```typescript
// lib/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

## [◈] Compression

### Gzip/Brotli
```javascript
// next.config.js
module.exports = {
  compress: true, // Gzip compression
};
```

### Image Compression
```typescript
// Sharp configuration
import sharp from 'sharp';

await sharp(inputPath)
  .webp({ quality: 85 })
  .resize(1920, 1080, { fit: 'inside' })
  .toFile(outputPath);
```

## [◈] Performance Monitoring

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://example.com
            https://example.com/hakkimizda
          uploadArtifacts: true
```

### Performance Budget
```json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "interactive",
          "budget": 3500
        },
        {
          "metric": "first-contentful-paint",
          "budget": 1500
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 300
        },
        {
          "resourceType": "total",
          "budget": 1000
        }
      ]
    }
  ]
}
```

## [□] Diğer Dokümantasyon

- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [SEO-MONITORING.md](SEO-MONITORING.md) - Monitoring & analytics
- [SEO-LOCAL.md](SEO-LOCAL.md) - Local SEO
- [SEO-TRUST.md](SEO-TRUST.md) - E-E-A-T & Trust signals
