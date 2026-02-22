'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/shared/PageHero';
import { RegionList } from '@/components/regions/RegionList';
import { MobileFloatingButtons } from '@/components/shared/MobileFloatingButtons';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { WebPageUnifiedSchema } from '@/components/seo/UnifiedSchema';

interface RegionsPageClientProps {
  siteSettings?: any;
  contactData?: any;
  regionsData?: any[];
  showcaseData?: any;
  pageSEO?: any;
  footerData?: any;
}

export default function RegionsPageClient({ siteSettings, contactData, regionsData: propsRegions, showcaseData: propsShowcase, pageSEO: propsPageSEO, footerData }: RegionsPageClientProps = {}) {
  const regions = (propsRegions || []).sort((a: any, b: any) => a.order - b.order);
  const description = propsShowcase?.pageDescription || `${siteSettings?.siteName || 'Evden Eve Nakliyat'} - Profesyonel taşımacılık hizmeti sunuyoruz.`;
  const pageSEO = propsPageSEO || { title: 'Hizmet Bölgelerimiz', description: '', keywords: '' };
  const loading = false;

  // Props kullan, fallback fetch YOK

  if (loading) {
    return <div className="min-h-screen bg-surface flex items-center justify-center">
      <p className="text-text-secondary">Yükleniyor...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-surface">
      <WebPageUnifiedSchema 
        name={pageSEO.title}
        description={pageSEO.description || description}
        url="/bolgeler"
        breadcrumbs={[
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Hizmet Bölgeleri' }
        ]}
      />
      <Header siteSettings={siteSettings} contactData={contactData} />
      
      <PageHero 
        title="Hizmet Bölgelerimiz"
        description={description}
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hizmet Bölgeleri' }
        ]}
      />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegionList regions={regions} />
        </div>
      </main>

      <Footer siteSettings={siteSettings} contactData={contactData} footerData={footerData} regionsData={propsRegions?.slice(0, 6)} />
      <MobileFloatingButtons contactData={contactData} />
      <ScrollToTop />
    </div>
  );
}
