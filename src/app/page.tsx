import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SchemaRenderer } from '@/components/seo/SchemaRenderer';
import { TOC } from '@/components/shared/TOC';
import { MobileFloatingButtons } from '@/components/shared/MobileFloatingButtons';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { HeroSection } from '@/components/homepage/HeroSection';
import { TopSEOArticle } from '@/components/homepage/TopSEOArticle';
import { ServicesSection } from '@/components/homepage/ServicesSection';
import { WhyUsSection } from '@/components/homepage/WhyUsSection';
import { RouteInfoSection } from '@/components/homepage/RouteInfoSection';
import { GallerySection } from '@/components/homepage/GallerySection';
import { PricingSection } from '@/components/homepage/PricingSection';
import { RegionsShowcase } from '@/components/homepage/RegionsShowcase';
import { FAQSection } from '@/components/homepage/FAQSection';
import { GlobalReviewsSection } from '@/components/homepage/GlobalReviewsSection';
import { ContactForm } from '@/components/homepage/ContactForm';
import { SEOContentSection } from '@/components/homepage/SEOContentSection';
import { CTASection } from '@/components/homepage/CTASection';
import { getPageSEO } from '@/lib/seo/getPageSEO';
import { generateHomePageSchema } from '@/lib/seo/generateSchemas';
import { getRouteInfo } from '@/lib/data/getRouteInfo';
import { getSiteSettings, getContactSettings } from '@/lib/seo/getContactSettings';

// ISR: 1 saat cache
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('home');
  const schema = generateHomePageSchema();
  
  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: pageSEO.title,
      description: pageSEO.description,
      url: '/',
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageSEO.title,
      description: pageSEO.description,
    },
    other: {
      'script:ld+json': JSON.stringify(schema),
    },
  };
}

const tocItems = [
  { id: 'hero', title: 'Evden Eve Nakliyat', level: 1 },
  { id: 'seo-top', title: 'Ev Taşıma', level: 1 },
  { id: 'services', title: 'Hizmetlerimiz', level: 1 },
  { id: 'why-us', title: 'Neden Biz', level: 1 },
  { id: 'route-info', title: 'Rota Bilgileri', level: 1 },
  { id: 'gallery', title: 'Galeri', level: 1 },
  { id: 'pricing', title: 'Fiyatlandırma', level: 1 },
  { id: 'regions', title: 'Hizmet Bölgeleri', level: 1 },
  { id: 'faq', title: 'Sık Sorulan Sorular', level: 1 },
  { id: 'reviews', title: 'Müşteri Yorumları', level: 1 },
  { id: 'contact', title: 'İletişim', level: 1 },
  { id: 'seo-content', title: 'Detaylı Bilgi', level: 1 },
];

export default async function Home() {
  const pageSEO = await getPageSEO('home');
  const schema = await generateHomePageSchema();
  const routeInfo = await getRouteInfo();
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  
  return (
    <div className="min-h-screen bg-surface">
      {/* Schema.org Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        suppressHydrationWarning
      />
      
      <Header siteSettings={siteSettings} contactData={contactSettings} />
      
      <main>
        <div id="hero"><HeroSection routeInfo={routeInfo} siteSettings={siteSettings} /></div>
        <div id="seo-top"><TopSEOArticle /></div>
        
        {/* TOC Section */}
        <section className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TOC items={tocItems} />
          </div>
        </section>
        
        <div id="services"><ServicesSection /></div>
        <div id="why-us"><WhyUsSection /></div>
        <div id="route-info"><RouteInfoSection routeInfo={routeInfo} /></div>
        <div id="gallery"><GallerySection /></div>
        <div id="pricing"><PricingSection routeInfo={routeInfo} /></div>
        <div id="regions"><RegionsShowcase /></div>
        <div id="faq"><FAQSection /></div>
        <GlobalReviewsSection />
        <div id="contact"><ContactForm /></div>
        <div id="seo-content"><SEOContentSection /></div>
        <div id="cta"><CTASection /></div>
      </main>

      <Footer siteSettings={siteSettings} contactData={contactSettings} />
      
      {/* Mobile Floating Buttons */}
      <MobileFloatingButtons />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
