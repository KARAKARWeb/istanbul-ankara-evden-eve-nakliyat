# Table of Contents (TOC) Sistemi - SEO Uyumlu

## [>] Genel Bakış

**Modern ve profesyonel TOC sistemi:**
- ✅ Ana sayfa, Hakkımızda, Hizmet Bölgeleri sayfalarında
- ✅ SEO uyumlu (Schema.org markup)
- ✅ JSON-LD ile yapılandırılmış veri
- ✅ Sticky TOC (scroll'da sabit kalır)
- ✅ Active section highlighting
- ✅ Smooth scroll navigation

---

## [◈] TOC Yapısı

### Ana Sayfa TOC
**Yerleşim:** Sağ sidebar (desktop), Collapsible (mobil)

```typescript
// components/TOC.tsx
interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

const homePageTOC: TOCItem[] = [
  { id: 'hero', title: 'Ana Sayfa', level: 1 },
  
  // SEO Makale (Üst) - Başlıklar dahil
  { id: 'seo-top', title: 'İstanbul İzmir Nakliyat Hakkında', level: 1, children: [
    { id: 'seo-top-profesyonel', title: 'Profesyonel Nakliyat Hizmeti', level: 2 },
    { id: 'seo-top-guvenli', title: 'Güvenli ve Sigortalı Taşımacılık', level: 2 },
    { id: 'seo-top-fiyat', title: 'Uygun Fiyat Garantisi', level: 2 },
  ]},
  
  { id: 'services', title: 'Hizmetlerimiz', level: 1 },
  { id: 'why-us', title: 'Neden Biz', level: 1 },
  { id: 'route-info', title: 'Rota Bilgileri', level: 1 },
  { id: 'pricing', title: 'Fiyatlandırma', level: 1 },
  { id: 'regions', title: 'Hizmet Bölgeleri', level: 1 },
  { id: 'faq', title: 'Sık Sorulan Sorular', level: 1 },
  { id: 'reviews', title: 'Müşteri Yorumları', level: 1 },
  { id: 'contact', title: 'İletişim', level: 1 },
  
  // SEO İçerik (Alt) - Başlıklar dahil
  { id: 'seo-content', title: 'Detaylı Rehber', level: 1, children: [
    { id: 'seo-surec', title: 'Nakliyat Süreci Nasıl İşler?', level: 2 },
    { id: 'seo-faktorler', title: 'Fiyatları Etkileyen Faktörler', level: 2 },
    { id: 'seo-hazirlik', title: 'Taşınma Öncesi Hazırlık İpuçları', level: 2 },
    { id: 'seo-sss', title: 'En Sık Sorulan Sorular', level: 2 },
    { id: 'seo-iletisim', title: 'İletişim Bilgileri', level: 2 },
  ]},
  
  { id: 'cta', title: 'Teklif Alın', level: 1 },
];
```

### Hakkımızda TOC
```typescript
const aboutPageTOC: TOCItem[] = [
  { id: 'hikayemiz', title: 'Hikayemiz', level: 1 },
  { id: 'misyon-vizyon', title: 'Misyon & Vizyon', level: 1 },
  { id: 'degerlerimiz', title: 'Değerlerimiz', level: 1 },
  { id: 'ekibimiz', title: 'Ekibimiz', level: 1 },
  { id: 'sertifikalar', title: 'Sertifikalar & Ödüller', level: 1 },
  { id: 'iletisim', title: 'İletişim', level: 1 },
];
```

### Hizmet Bölgeleri TOC
```typescript
const regionPageTOC: TOCItem[] = [
  { id: 'genel-bilgi', title: 'Genel Bilgi', level: 1 },
  { id: 'hizmetler', title: 'Hizmetlerimiz', level: 1 },
  { id: 'fiyatlandirma', title: 'Fiyatlandırma', level: 1 },
  { id: 'yorumlar', title: 'Müşteri Yorumları', level: 1 },
  { id: 'sss', title: 'Sık Sorulan Sorular', level: 1 },
  { id: 'iletisim', title: 'İletişim', level: 1 },
];
```

---

## [◈] TOC Component

### Desktop TOC (Sticky Sidebar)
```typescript
// components/TOC.tsx
export function TOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="border-l-2 border-gray-200 pl-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          İçindekiler
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
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
// components/MobileTOC.tsx
export function MobileTOC({ items }: { items: TOCItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <span className="text-sm font-medium text-gray-900">
          İçindekiler
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200">
          <ul className="space-y-2 mt-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-gray-600 hover:text-gray-900 py-1"
                >
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

---

## [◈] SEO Schema (JSON-LD)

### WebPage Schema with TOC
```typescript
// lib/seo/toc-schema.ts
export function generateTOCSchema(items: TOCItem[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "mainEntity": {
      "@type": "Table",
      "about": "İçindekiler",
    },
    "hasPart": items.map((item, index) => ({
      "@type": "WebPageElement",
      "name": item.title,
      "url": `${pageUrl}#${item.id}`,
      "position": index + 1,
    })),
  };
}
```

### BreadcrumbList Schema
```typescript
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
```

---

## [◈] Ana Sayfa Layout (TOC ile)

### Layout Yapısı
```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <div className="relative">
      {/* Mobile TOC */}
      <MobileTOC items={homePageTOC} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          {/* Main Content */}
          <main className="min-w-0">
            <HeroSection id="hero" />
            <ServicesSection id="services" />
            <WhyUsSection id="why-us" />
            <RouteInfoSection id="route-info" />
            <PricingTable id="pricing" />
            <RegionsShowcase id="regions" />
            <FAQSection id="faq" />
            <ReviewsSection id="reviews" />
            <ContactForm id="contact" />
            
            {/* SEO İçerik (Alt Kısımda) */}
            <SEOContentSection id="seo-content" />
            
            <CTASection id="cta" />
          </main>
          
          {/* Desktop TOC (Sticky Sidebar) */}
          <aside className="hidden lg:block">
            <TOC items={homePageTOC} />
          </aside>
        </div>
      </div>
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTOCSchema(homePageTOC, process.env.NEXT_PUBLIC_SITE_URL!)
          ),
        }}
      />
    </div>
  );
}
```

---

## [◈] SEO İçerik Yerleşimi (Alt Kısımda)

### SEO Content Section
```typescript
// components/homepage/SEOContentSection.tsx
export function SEOContentSection({ id }: { id: string }) {
  return (
    <section 
      id={id}
      className="py-16 md:py-20 bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          İstanbul İzmir Evden Eve Nakliyat Hakkında Detaylı Bilgi
        </h2>
        
        {/* SEO İçerik */}
        <div className="prose prose-gray max-w-none">
          <h3>Profesyonel Nakliyat Hizmeti</h3>
          <p>
            İstanbul'dan İzmir'e evden eve nakliyat hizmeti sunan firmamız,
            10 yılı aşkın tecrübesi ile güvenilir ve kaliteli hizmet vermektedir.
            482 km mesafedeki bu rotada, modern araç filomuz ve profesyonel
            ekibimiz ile eşyalarınızı güvenle taşıyoruz.
          </p>
          
          <h3>Neden Bizi Tercih Etmelisiniz?</h3>
          <ul>
            <li>10+ yıllık sektör deneyimi</li>
            <li>Sigortalı taşımacılık garantisi</li>
            <li>Profesyonel paketleme hizmeti</li>
            <li>7/24 müşteri desteği</li>
            <li>Uygun fiyat garantisi</li>
          </ul>
          
          <h3>Hizmet Sürecimiz</h3>
          <p>
            Nakliyat sürecimiz, ücretsiz keşif ile başlar. Eşyalarınızın
            miktarı ve özelliklerine göre size en uygun fiyat teklifini
            sunarız. Taşınma gününde, deneyimli ekibimiz eşyalarınızı
            özenle paketler ve araçlara yükler.
          </p>
          
          <h3>Fiyatlandırma</h3>
          <p>
            İstanbul İzmir arası nakliyat fiyatlarımız, ev büyüklüğü,
            eşya miktarı ve asansör durumuna göre değişiklik göstermektedir.
            1+1 daire için ortalama 1.500₺ - 2.500₺, 2+1 daire için
            2.000₺ - 3.500₺ arasında fiyat alabilirsiniz.
          </p>
          
          <h3>Sıkça Sorulan Sorular</h3>
          <p>
            Müşterilerimizin en çok merak ettiği konular arasında
            sigorta kapsamı, taşıma süresi ve ödeme koşulları yer almaktadır.
            Tüm detaylar için SSS bölümümüzü inceleyebilir veya
            bizimle iletişime geçebilirsiniz.
          </p>
        </div>
        
        {/* İlgili Linkler */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            İlgili Sayfalar
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link 
              href="/hakkimizda"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Hakkımızda
            </Link>
            <Link 
              href="/hizmetler"
              className="text-sm text-green-600 hover:text-green-700"
            >
              Hizmetlerimiz
            </Link>
            <Link 
              href="/iletisim"
              className="text-sm text-green-600 hover:text-green-700"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### SEO İçerik Özellikleri
- ✅ **Yerleşim:** Ana sayfa alt kısımda (yorumlar ve iletişim sonrası)
- ✅ **Uzunluk:** 500-800 kelime
- ✅ **Keyword density:** %1-2
- ✅ **Başlıklar:** H2, H3 (SEO uyumlu)
- ✅ **Internal linking:** İlgili sayfalara linkler
- ✅ **Structured data:** Article schema

---

## [◈] Hakkımızda Sayfası TOC

### Layout
```typescript
// app/hakkimizda/page.tsx
export default function AboutPage() {
  return (
    <div className="relative">
      <MobileTOC items={aboutPageTOC} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <main className="min-w-0">
            <section id="hikayemiz">
              <h2>Hikayemiz</h2>
              {/* İçerik */}
            </section>
            
            <section id="misyon-vizyon">
              <h2>Misyon & Vizyon</h2>
              {/* İçerik */}
            </section>
            
            {/* Diğer section'lar */}
          </main>
          
          <aside className="hidden lg:block">
            <TOC items={aboutPageTOC} />
          </aside>
        </div>
      </div>
    </div>
  );
}
```

---

## [◈] Hizmet Bölgeleri Sayfası TOC

### Layout
```typescript
// app/[region]/page.tsx
export default function RegionPage({ params }: { params: { region: string } }) {
  return (
    <div className="relative">
      <MobileTOC items={regionPageTOC} />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <main className="min-w-0">
            <section id="genel-bilgi">
              <h1>İstanbul Bornova Evden Eve Nakliyat</h1>
              {/* İçerik */}
            </section>
            
            {/* Diğer section'lar */}
          </main>
          
          <aside className="hidden lg:block">
            <TOC items={regionPageTOC} />
          </aside>
        </div>
      </div>
    </div>
  );
}
```

---

## [◈] Styling

### TOC Styles
```css
/* Sticky TOC */
.toc-sidebar {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}

/* Active link */
.toc-link.active {
  color: #16A34A;
  font-weight: 500;
  border-left-color: #16A34A;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}
```

---

## [□] Diğer Dokümantasyon

- [STEP-08-FRONTEND-HOMEPAGE.md](STEP-08-FRONTEND-HOMEPAGE.md) - Ana sayfa implementasyonu
- [STEP-09-FRONTEND-PAGES.md](STEP-09-FRONTEND-PAGES.md) - Hakkımızda sayfası
- [STEP-10-FRONTEND-REGIONS.md](STEP-10-FRONTEND-REGIONS.md) - Bölge sayfaları
- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
