# STEP 8: Ana Sayfa Frontend

## [>] Hedef

Ana sayfanın 12 section'ını eksiksiz oluşturmak.

## [□] Ana Sayfa Section'ları (12 Adet)

### 1. Hero Section + Fiyat Formu
**Komponent:** `src/components/homepage/HeroSection.tsx`

```typescript
export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{{routeTitleEvdenEve}}</h1>
        <p>Profesyonel, güvenilir ve uygun fiyatlı nakliyat hizmeti</p>
        <div className="stats">
          <div className="stat">
            <span className="number">10,000+</span>
            <span className="label">Mutlu Müşteri</span>
          </div>
          <div className="stat">
            <span className="number">4.8/5</span>
            <span className="label">⭐ Müşteri Puanı</span>
          </div>
        </div>
      </div>
      <PriceQuoteForm />
    </section>
  );
}
```

### 2. SEO Makale (Üst)
**Komponent:** `src/components/homepage/TopSEOArticle.tsx`

**İçerik uzunluğu:** 200-300 kelime
**Keyword density:** %1-2

### 3. Hizmetler Section
**Komponent:** `src/components/homepage/ServicesSection.tsx`

**Hizmetler:**
- Asansörlü Nakliyat
- Asansörsüz Nakliyat
- Paketleme Hizmeti
- Sigortalı Taşıma
- Eşya Depolama
- Montaj/Demontaj

### 4. Neden Biz Section
**Komponent:** `src/components/homepage/WhyUsSection.tsx`

**Özellikler:**
- 10+ yıllık deneyim
- Profesyonel ekip
- Sigortalı taşıma
- 7/24 müşteri desteği
- Uygun fiyat garantisi
- Modern araç filosu

### 5. Rota Bilgileri Section
**Komponent:** `src/components/homepage/RouteInfoSection.tsx`

```typescript
export function RouteInfoSection({ siteData }: { siteData: SiteData }) {
  return (
    <section className="route-info">
      <h2>{{routeTitle}} Bilgileri</h2>
      <div className="info-grid">
        <div className="info-item">
          <MapPin className="icon" />
          <span className="label">Mesafe</span>
          <span className="value">{siteData.distance} km</span>
        </div>
        <div className="info-item">
          <Clock className="icon" />
          <span className="label">Süre</span>
          <span className="value">{siteData.duration} saat</span>
        </div>
        <div className="info-item">
          <DollarSign className="icon" />
          <span className="label">Fiyat</span>
          <span className="value">{siteData.priceMin}₺'den başlar</span>
        </div>
      </div>
    </section>
  );
}
```

### 6. Premium Fiyatlandırma Tablosu
**Komponent:** `src/components/homepage/PricingTable.tsx`

**Offer Schema ile:**
```json
{
  "@type": "Offer",
  "price": "1500",
  "priceCurrency": "TRY",
  "availability": "https://schema.org/InStock"
}
```

### 7. Hizmet Bölgeleri Showcase (Otomatik Rating ile)
**Komponent:** `src/components/homepage/RegionsShowcase.tsx`

**ItemList Schema + Aggregate Rating:**
```typescript
export function RegionsShowcase({ regions }: { regions: Region[] }) {
  // Her bölge için rating bilgisi al
  const regionsWithRatings = await Promise.all(
    regions.map(async (region) => ({
      ...region,
      rating: await getRegionRating(region.id),
    }))
  );

  // ItemList schema oluştur (rating dahil)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hizmet Bölgelerimiz",
    "numberOfItems": regions.length,
    "itemListElement": regionsWithRatings.map((region, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": `${region.sourceCity} ${region.targetCity} Evden Eve Nakliyat`,
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${region.slug}`,
        "aggregateRating": region.rating ? {
          "@type": "AggregateRating",
          "ratingValue": region.rating.aggregateRating.ratingValue.toString(),
          "reviewCount": region.rating.aggregateRating.reviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        } : undefined
      }
    }))
  };

  return (
    <section className="regions-showcase">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <h2>Hizmet Bölgelerimiz</h2>
      <div className="regions-grid">
        {regionsWithRatings.map(region => (
          <RegionCard key={region.id} region={region} />
        ))}
      </div>
    </section>
  );
}
```

**RegionCard Component (Rating ile):**
```typescript
function RegionCard({ region }: { region: Region & { rating?: RegionRating } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{region.sourceCity} {region.targetCity}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Aggregate Rating Gösterimi */}
        {region.rating && (
          <div className="rating-display mb-3">
            <div className="flex items-center gap-2">
              <div className="stars flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < Math.floor(region.rating.aggregateRating.ratingValue) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    size={16}
                  />
                ))}
              </div>
              <span className="font-semibold">
                {region.rating.aggregateRating.ratingValue}
              </span>
              <span className="text-sm text-gray-600">
                ({region.rating.aggregateRating.reviewCount} değerlendirme)
              </span>
            </div>
          </div>
        )}
        
        <p className="text-sm text-gray-600">
          {region.distance} km • {region.duration} saat
        </p>
        <p className="text-lg font-semibold text-green-600 mt-2">
          {region.priceMin}₺'den başlar
        </p>
        
        <Button asChild className="w-full mt-4">
          <Link href={`/${region.slug}`}>Detaylı Bilgi</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
```

**Google Rich Snippets Sonucu:**
Her bölge kartında:
```
İstanbul Bornova Evden Eve Nakliyat
⭐⭐⭐⭐⭐ 4.7 (23 değerlendirme)
45 km • 1.5 saat
1.200₺'den başlar
```

### 8. SSS Section
**Komponent:** `src/components/homepage/FAQSection.tsx`

**FAQPage Schema ile:**
```typescript
export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2>Sıkça Sorulan Sorular</h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

### 9. Müşteri Yorumları Section (KRİTİK! - Rich Snippets)
**Sıralama:** 9. section (SSS sonrası)
**Komponent:** `src/components/homepage/ReviewsSection.tsx`

**Özellikler:**
- Minimum 10 gerçek müşteri yorumu
- Aggregate rating (ortalama puan)
- Review count (toplam yorum sayısı)
- Yıldız gösterimi
- Fotoğraflı yorumlar (opsiyonel)
- Google Rich Snippets için schema

```typescript
interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  text: string;
  verified: boolean;
  photos?: string[];
}

interface AggregateRating {
  ratingValue: number; // 4.8
  reviewCount: number; // 127
  bestRating: number; // 5
  worstRating: number; // 1
}

export function ReviewsSection({ reviews, aggregateRating }: {
  reviews: Review[];
  aggregateRating: AggregateRating;
}) {
  // AggregateRating Schema (Rich Snippets için KRİTİK!)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": process.env.NEXT_PUBLIC_SITE_NAME,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue.toString(),
      "reviewCount": aggregateRating.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.slice(0, 10).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <section className="reviews">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      
      {/* Aggregate Rating Gösterimi */}
      <div className="aggregate-rating">
        <h2>Müşteri Yorumları</h2>
        <div className="rating-summary">
          <div className="rating-value">
            <span className="number">{aggregateRating.ratingValue}</span>
            <span className="max">/5</span>
          </div>
          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < Math.floor(aggregateRating.ratingValue) ? 'filled' : 'empty'}
              />
            ))}
          </div>
          <div className="count">
            {aggregateRating.reviewCount} değerlendirme
          </div>
        </div>
      </div>

      {/* Yorumlar Listesi */}
      <div className="reviews-list">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Tüm Yorumlar Butonu */}
      <Button variant="outline" asChild>
        <Link href="/yorumlar">Tüm Yorumları Gör</Link>
      </Button>
    </section>
  );
}
```

**ReviewCard Component:**
```typescript
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="author">
          <Avatar>
            <AvatarFallback>{review.author[0]}</AvatarFallback>
          </Avatar>
          <div className="author-info">
            <span className="name">{review.author}</span>
            {review.verified && (
              <Badge variant="secondary">
                <CheckCircle className="w-3 h-3 mr-1" />
                Doğrulanmış
              </Badge>
            )}
          </div>
        </div>
        <div className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < review.rating ? 'filled' : 'empty'}
              size={16}
            />
          ))}
        </div>
      </div>
      <div className="review-body">
        <p>{review.text}</p>
        {review.photos && review.photos.length > 0 && (
          <div className="review-photos">
            {review.photos.map((photo, i) => (
              <Image
                key={i}
                src={photo}
                alt={`Yorum fotoğrafı ${i + 1}`}
                width={100}
                height={100}
                className="rounded"
              />
            ))}
          </div>
        )}
      </div>
      <div className="review-footer">
        <time dateTime={review.date}>
          {new Date(review.date).toLocaleDateString('tr-TR')}
        </time>
      </div>
    </div>
  );
}
```

**Rich Snippets Sonucu:**
Google'da şöyle görünecek:
```
İstanbul İzmir Evden Eve Nakliyat
https://istanbulizmirevtasima.com.tr
⭐⭐⭐⭐⭐ 4.8 (127 değerlendirme)
1.500₺ - 3.500₺ · Stokta var
```

### 10. İletişim Formu
**Sıralama:** 10. section (Yorumlar sonrası)
**Komponent:** `src/components/homepage/ContactForm.tsx`

**Form alanları:**
- Ad Soyad
- Telefon
- E-posta
- Kaynak şehir
- Hedef şehir
- Mesaj

### 11. SEO İçerik (Alt Kısımda - KRİTİK!)
**Sıralama:** 11. section (İletişim sonrası - EN ALTTA!)
**Komponent:** `src/components/homepage/SEOContentSection.tsx`

**Yerleşim:** Ana sayfa EN ALTINDA (İletişim formu sonrası, CTA öncesi)

**İçerik uzunluğu:** 500-800 kelime
**Keyword density:** %1-2
**Başlıklar:** H2, H3 (SEO uyumlu)

**Konular:**
- Profesyonel nakliyat hizmeti
- Neden bizi tercih etmelisiniz?
- Hizmet sürecimiz
- Fiyatlandırma detayları
- Sıkça sorulan sorular
- İlgili linkler (internal linking)

```typescript
export function SEOContentSection({ id }: { id: string }) {
  return (
    <section 
      id={id}
      className="py-16 md:py-20 bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          {{routeTitleEvdenEve}} Hakkında Detaylı Bilgi
        </h2>
        
        <div className="prose prose-gray max-w-none">
          <h3>Profesyonel Nakliyat Hizmeti</h3>
          <p>
            {{sourceCity}}'dan {{targetCity}}'e evden eve nakliyat hizmeti...
          </p>
          
          <h3>Neden Bizi Tercih Etmelisiniz?</h3>
          <ul>
            <li>10+ yıllık sektör deneyimi</li>
            <li>Sigortalı taşımacılık garantisi</li>
            <li>Profesyonel paketleme hizmeti</li>
          </ul>
          
          {/* Diğer içerik */}
        </div>
        
        {/* İlgili Linkler (Internal Linking) */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            İlgili Sayfalar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/hizmetler">Hizmetlerimiz</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 12. CTA Section
**Sıralama:** 12. section (EN SON - SEO içerik sonrası)
**Komponent:** `src/components/homepage/CTASection.tsx`

**İçerik:**
- Başlık: "Hemen Teklif Alın!"
- Açıklama: "Ücretsiz fiyat teklifi için formu doldurun"
- Buton: "Teklif Al"
- Telefon: "Hemen Ara"

## [◈] Section Geçişleri ve Spacing (KRİTİK!)

### Section Yapısı
**Her section net ve belirgin - Karmaşık görüntü YOK:**

```typescript
// Section wrapper component
function Section({ 
  id, 
  background = 'white',
  children 
}: { 
  id: string;
  background?: 'white' | 'gray';
  children: React.ReactNode;
}) {
  return (
    <section 
      id={id}
      className={cn(
        'relative',
        'py-16 md:py-20',              // 64-80px vertical padding
        'px-4 md:px-6',                 // Horizontal padding
        background === 'gray' ? 'bg-gray-50' : 'bg-white',
        'border-t border-gray-200',     // Subtle top border
        'scroll-mt-20'                  // Scroll offset for sticky header
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
```

### Section Başlıkları (Minimal - Büyük Font YOK)
```typescript
function SectionHeader({ 
  title, 
  subtitle 
}: { 
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
        {/* MAX 32px mobil, 36px desktop */}
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          {/* 16-18px */}
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

### Spacing System
```typescript
const spacing = {
  sectionPadding: {
    mobile: 'py-12 px-4',    // 48px vertical, 16px horizontal
    desktop: 'py-16 px-6',   // 64px vertical, 24px horizontal
  },
  sectionGap: 'space-y-12 md:space-y-16',  // 48-64px gap
  cardGap: 'gap-6 md:gap-8',               // 24-32px gap
  elementGap: 'space-y-4 md:space-y-6',    // 16-24px gap
};
```

## [◈] Mobil Tasarım (Native App Hissi)

### Bottom Navigation (Mobil)
```typescript
// components/MobileNav.tsx
export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div 
        className="flex justify-around items-center h-16"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} // iPhone notch
      >
        <NavItem icon={<Home size={24} />} label="Ana Sayfa" href="/" />
        <NavItem icon={<MapPin size={24} />} label="Bölgeler" href="/bolgeler" />
        <NavItem icon={<Phone size={24} />} label="İletişim" href="/iletisim" />
        <NavItem icon={<User size={24} />} label="Hesap" href="/hesap" />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, href }: NavItemProps) {
  return (
    <Link 
      href={href}
      className="flex flex-col items-center justify-center min-w-[56px] min-h-[56px] -mb-1 active:scale-95 transition-transform"
    >
      <div className="text-gray-600">{icon}</div>
      <span className="text-xs text-gray-600 mt-1">{label}</span>
    </Link>
  );
}
```

### Touch Feedback
```typescript
// Touch-friendly button
function TouchButton({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'min-h-[48px] min-w-[48px]',     // Minimum touch target
        'px-6 py-3',
        'rounded-lg',
        'active:scale-95',                // Touch feedback
        'transition-transform duration-150',
        props.className
      )}
    >
      {children}
    </button>
  );
}
```

### Skeleton Loading
```typescript
// components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}
```

## [◈] TOC (Table of Contents) Sistemi (Yeni!)

### Desktop TOC (Sticky Sidebar)
**Yerleşim:** Sağ tarafta, sticky (scroll'da sabit)

```typescript
// components/TOC.tsx
const homePageTOC = [
  { id: 'hero', title: 'Ana Sayfa' },
  
  // SEO Makale (Üst) - Başlıklar dahil
  { id: 'seo-top', title: 'İstanbul İzmir Nakliyat Hakkında', children: [
    { id: 'seo-top-profesyonel', title: 'Profesyonel Nakliyat Hizmeti' },
    { id: 'seo-top-guvenli', title: 'Güvenli ve Sigortalı Taşımacılık' },
    { id: 'seo-top-fiyat', title: 'Uygun Fiyat Garantisi' },
  ]},
  
  { id: 'services', title: 'Hizmetlerimiz' },
  { id: 'why-us', title: 'Neden Biz' },
  { id: 'route-info', title: 'Rota Bilgileri' },
  { id: 'pricing', title: 'Fiyatlandırma' },
  { id: 'regions', title: 'Hizmet Bölgeleri' },
  { id: 'faq', title: 'Sık Sorulan Sorular' },
  { id: 'reviews', title: 'Müşteri Yorumları' },
  { id: 'contact', title: 'İletişim' },
  
  // SEO İçerik (Alt) - Başlıklar dahil
  { id: 'seo-content', title: 'Detaylı Rehber', children: [
    { id: 'seo-surec', title: 'Nakliyat Süreci Nasıl İşler?' },
    { id: 'seo-faktorler', title: 'Fiyatları Etkileyen Faktörler' },
    { id: 'seo-hazirlik', title: 'Taşınma Öncesi Hazırlık İpuçları' },
    { id: 'seo-sss', title: 'En Sık Sorulan Sorular' },
    { id: 'seo-iletisim', title: 'İletişim Bilgileri' },
  ]},
  
  { id: 'cta', title: 'Teklif Alın' },
];

export function TOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState('');

  return (
    <nav className="hidden lg:block sticky top-24 h-fit">
      <div className="border-l-2 border-gray-200 pl-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          İçindekiler
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block text-sm transition-colors',
                  activeId === item.id
                    ? 'text-green-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

### Mobile TOC (Collapsible)
```typescript
export function MobileTOC({ items }: { items: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-white border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <span className="text-sm font-medium">İçindekiler</span>
        <ChevronDown className={cn('w-5 h-5', isOpen && 'rotate-180')} />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4">
          <ul className="space-y-2 mt-2">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => setIsOpen(false)}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

### TOC Schema (JSON-LD)
```typescript
const tocSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": process.env.NEXT_PUBLIC_SITE_URL,
  "hasPart": homePageTOC.map((item, index) => ({
    "@type": "WebPageElement",
    "name": item.title,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}#${item.id}`,
    "position": index + 1,
  })),
};
```

## [◈] Ana Sayfa Layout (TOC ile)

**Dosya:** `src/app/page.tsx`

```typescript
import { HeroSection } from '@/components/homepage/HeroSection';
import { TopSEOArticle } from '@/components/homepage/TopSEOArticle';
import { ServicesSection } from '@/components/homepage/ServicesSection';
import { WhyUsSection } from '@/components/homepage/WhyUsSection';
import { RouteInfoSection } from '@/components/homepage/RouteInfoSection';
import { PricingTable } from '@/components/homepage/PricingTable';
import { RegionsShowcase } from '@/components/homepage/RegionsShowcase';
import { FAQSection } from '@/components/homepage/FAQSection';
import { ReviewsSection } from '@/components/homepage/ReviewsSection';
import { ContactForm } from '@/components/homepage/ContactForm';
import { BottomSEOArticle } from '@/components/homepage/BottomSEOArticle';
import { CTASection } from '@/components/homepage/CTASection';

export default async function HomePage() {
  // Data fetching
  const siteData = await getSiteData('default');
  const reviews = await getReviews();
  const aggregateRating = calculateAggregateRating(reviews);
  const regions = await getRegions();
  const faqs = await getFAQs();

  return (
    <>
      <HeroSection />
      <TopSEOArticle siteData={siteData} />
      <ServicesSection />
      <WhyUsSection />
      <RouteInfoSection siteData={siteData} />
      <PricingTable siteData={siteData} />
      <RegionsShowcase regions={regions} />
      <FAQSection faqs={faqs} />
      <ReviewsSection reviews={reviews} aggregateRating={aggregateRating} />
      <ContactForm />
      <BottomSEOArticle siteData={siteData} />
      <CTASection />
    </>
  );
}
```

## [◈] SEO Implementation

### Metadata
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteData('default');
  
  return {
    title: `${siteData.sourceCity} ${siteData.targetCity} Evden Eve Nakliyat | Güvenilir & Uygun Fiyat`,
    description: `${siteData.sourceCity}'dan ${siteData.targetCity}'e profesyonel evden eve nakliyat hizmeti. ${siteData.distance} km mesafe, ${siteData.duration} saat. ${siteData.priceMin}₺'den başlayan fiyatlar.`,
    keywords: [
      `${siteData.sourceCity} ${siteData.targetCity} evden eve nakliyat`,
      `${siteData.sourceCity} ${siteData.targetCity} nakliyat`,
      'evden eve taşıma',
      'nakliyat fiyatları'
    ],
    openGraph: {
      title: `${siteData.sourceCity} ${siteData.targetCity} Evden Eve Nakliyat`,
      description: `Profesyonel nakliyat hizmeti. ${siteData.priceMin}₺'den başlayan fiyatlar.`,
      images: ['/images/og-image.jpg'],
    },
  };
}
```

## [✓] Kontrol Listesi

- [ ] 12 section oluşturuldu
- [ ] Müşteri yorumları section eksiksiz
- [ ] Aggregate rating schema eklendi
- [ ] Rich snippets test edildi
- [ ] Hizmet bölgeleri aggregate eklendi
- [ ] FAQPage schema eklendi
- [ ] Tüm schema'lar validate edildi
- [ ] Mobile responsive
- [ ] Core Web Vitals optimize
- [ ] Accessibility (WCAG 2.1 AA)

## [▷] Sonraki Adım

[STEP-09-FRONTEND-PAGES.md](STEP-09-FRONTEND-PAGES.md) - Diğer sayfalar (Hakkımızda, İletişim)
