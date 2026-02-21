# SEO Monitoring & Analytics

## [>] Core Web Vitals Monitoring (Kritik!)

### Real-Time Monitoring
**Zorunlu metrikler:**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms (2024 yeni metrik)

### Monitoring Tools

#### 1. Vercel Analytics (Built-in)
```typescript
// next.config.js
module.exports = {
  analytics: {
    enabled: true,
  },
}
```

**Özellikler:**
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Page load times
- Error tracking
- Deployment analytics

#### 2. Google PageSpeed Insights API
```typescript
// lib/monitoring/pagespeed.ts
export async function checkPageSpeed(url: string) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${apiKey}&strategy=mobile`
  );
  
  const data = await response.json();
  
  return {
    performance: data.lighthouseResult.categories.performance.score * 100,
    fcp: data.lighthouseResult.audits['first-contentful-paint'].numericValue,
    lcp: data.lighthouseResult.audits['largest-contentful-paint'].numericValue,
    cls: data.lighthouseResult.audits['cumulative-layout-shift'].numericValue,
    tbt: data.lighthouseResult.audits['total-blocking-time'].numericValue,
  };
}
```

#### 3. Web Vitals Library
```typescript
// app/layout.tsx
import { sendToAnalytics } from '@/lib/analytics';

export function reportWebVitals(metric: any) {
  sendToAnalytics(metric);
}
```

### Dashboard Integration
**Dashboard'da gösterilecek:**
- Son 7 gün Core Web Vitals grafiği
- Sayfa bazlı performans skorları
- Mobile vs Desktop karşılaştırma
- Uyarılar (threshold aşımları)

## [◈] Google Analytics GA4

### Event Tracking
```typescript
// lib/analytics/ga4.ts
export const trackEvent = (eventName: string, params: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Kullanım örnekleri:
trackEvent('form_submission', {
  form_name: 'price_quote',
  source_city: 'Istanbul',
  target_city: 'Izmir',
});

trackEvent('phone_click', {
  phone_number: '+905321384979',
});

trackEvent('region_view', {
  region: 'istanbul-bornova',
});
```

### Custom Dimensions
```typescript
// GA4 Custom Dimensions
const customDimensions = {
  user_type: 'visitor', // visitor, returning, customer
  source_city: 'Istanbul',
  target_city: 'Izmir',
  service_type: 'elevator', // elevator, no_elevator
  price_range: '1500-3000',
};
```

### Conversion Tracking
```typescript
// Conversion events
trackEvent('conversion', {
  transaction_id: 'QUOTE-123',
  value: 2500,
  currency: 'TRY',
  items: [{
    item_name: 'Asansörlü Nakliyat',
    item_category: 'Service',
    price: 2500,
  }],
});
```

## [◈] Google Tag Manager

### Container Setup
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Custom Events
```typescript
// dataLayer push
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'custom_event',
  eventCategory: 'Form',
  eventAction: 'Submit',
  eventLabel: 'Price Quote',
  eventValue: 1,
});
```

### Triggers
- Form submission
- Button clicks (CTA, Phone, Email)
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 60s, 120s)
- Exit intent
- Video play/pause

## [◈] Google Search Console

### API Integration
```typescript
// lib/monitoring/search-console.ts
import { google } from 'googleapis';

export async function getSearchAnalytics(siteUrl: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl,
    requestBody: {
      startDate: '2026-01-01',
      endDate: '2026-02-20',
      dimensions: ['query', 'page', 'device'],
      rowLimit: 1000,
    },
  });

  return response.data;
}
```

### Monitored Metrics
- **Impressions:** Gösterim sayısı
- **Clicks:** Tıklama sayısı
- **CTR:** Click-through rate
- **Position:** Ortalama sıralama
- **Coverage:** İndeksleme durumu
- **Core Web Vitals:** Sayfa deneyimi

### Automated Reports
**Haftalık rapor:**
- Top 10 keywords
- Top 10 pages
- Coverage issues
- Mobile usability issues
- Core Web Vitals issues

## [◈] Heatmap & Session Recording

### Hotjar Integration
```html
<!-- Hotjar Tracking Code -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:XXXXXXX,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

### Tracked Behaviors
- Click heatmaps
- Scroll heatmaps
- Move heatmaps
- Session recordings
- Form analytics
- Feedback polls

## [◈] Error Tracking

### Sentry Integration
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Error Monitoring
- JavaScript errors
- API errors
- Performance issues
- User feedback
- Source maps

## [◈] Custom Monitoring Dashboard

### Dashboard Features
```typescript
// Dashboard metrics
interface MonitoringMetrics {
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
    inp: number;
  };
  traffic: {
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
  };
  seo: {
    impressions: number;
    clicks: number;
    ctr: number;
    avgPosition: number;
  };
  conversions: {
    formSubmissions: number;
    phoneClicks: number;
    emailClicks: number;
  };
  errors: {
    count: number;
    types: string[];
  };
}
```

### Real-Time Alerts
```typescript
// Alert thresholds
const alerts = {
  lcp: { threshold: 2500, severity: 'critical' },
  cls: { threshold: 0.1, severity: 'warning' },
  errorRate: { threshold: 5, severity: 'critical' },
  conversionRate: { threshold: 2, severity: 'warning' },
};

// Send alert
async function sendAlert(metric: string, value: number) {
  // Email notification
  // Slack notification
  // SMS notification (critical only)
}
```

## [◈] Performance Budget

### Budget Limits
```javascript
// performance-budget.json
{
  "timings": {
    "firstContentfulPaint": 1500,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3500,
    "totalBlockingTime": 300,
    "cumulativeLayoutShift": 0.1
  },
  "resourceSizes": {
    "total": 1000,
    "script": 300,
    "stylesheet": 100,
    "image": 500,
    "font": 100
  },
  "resourceCounts": {
    "total": 50,
    "script": 10,
    "stylesheet": 5,
    "image": 30,
    "font": 5
  }
}
```

### Budget Monitoring
- Lighthouse CI integration
- Automated budget checks
- PR comments with budget status
- Deployment blocking on budget violations

## [◈] SEO Monitoring Checklist

### Daily Checks
- [ ] Core Web Vitals status
- [ ] Error rate
- [ ] Conversion rate
- [ ] Server uptime

### Weekly Checks
- [ ] Search Console performance
- [ ] Top keywords ranking
- [ ] New indexing issues
- [ ] Backlink changes
- [ ] Competitor analysis

### Monthly Checks
- [ ] Full SEO audit
- [ ] Content freshness review
- [ ] Schema validation
- [ ] Mobile usability
- [ ] Page speed optimization review

## [□] Diğer Dokümantasyon

- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [SEO-OPTIMIZATION.md](SEO-OPTIMIZATION.md) - Performance optimization
- [SEO-LOCAL.md](SEO-LOCAL.md) - Local SEO
- [SEO-TRUST.md](SEO-TRUST.md) - E-E-A-T & Trust signals
