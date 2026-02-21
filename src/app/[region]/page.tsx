import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { TOC } from '@/components/shared/TOC';
import { RegionContent } from '@/components/regions/RegionContent';
import { RouteInfoSection } from '@/components/regions/RouteInfoSection';
import { PricingSection } from '@/components/homepage/PricingSection';
import { FAQSection } from '@/components/homepage/FAQSection';
import { ReviewsSection } from '@/components/regions/ReviewsSection';
import { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

const tocItems = [
  { id: 'genel-bilgi', title: 'Genel Bilgi', level: 1 },
  { id: 'rota-bilgileri', title: 'Rota Bilgileri', level: 1 },
  { id: 'icerik', title: 'Hizmet Detayları', level: 1 },
  { id: 'fiyatlandirma', title: 'Fiyatlandırma', level: 1 },
  { id: 'sss', title: 'Sık Sorulan Sorular', level: 1 },
  { id: 'yorumlar', title: 'Müşteri Yorumları', level: 1 },
  { id: 'cta', title: 'Teklif Alın', level: 1 },
];

// Tüm bölgeleri getir - SSG için
async function getAllRegions() {
  try {
    const regionsDir = path.join(process.cwd(), 'data/regions');
    const files = await fs.readdir(regionsDir);
    const regions = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const data = await fs.readFile(path.join(regionsDir, file), 'utf-8');
          return JSON.parse(data);
        })
    );
    return regions.filter(r => r.active);
  } catch (error) {
    console.error('Error reading regions:', error);
    return [];
  }
}

// Tek bölge getir - domain bağımsız
async function getRegion(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'data/regions', `${slug}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    const region = JSON.parse(data);
    return region.active ? region : null;
  } catch (error) {
    return null;
  }
}

// SSG + ISR: Build-time'da oluştur, 1 saatte bir güncelle
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 saat cache

// SSG: Tüm bölge sayfalarını build-time'da oluştur
export async function generateStaticParams() {
  const regions = await getAllRegions();
  return regions.map((region) => ({
    region: region.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = await getRegion(regionSlug);

  if (!region) {
    return {
      title: 'Bölge Bulunamadı',
    };
  }

  // Title: metaTitle varsa kullan, yoksa title kullan
  const pageTitle = region.metaTitle || region.title;
  
  // Description: metaDescription varsa kullan, yoksa content'in ilk 150 karakterini al
  let pageDescription = region.metaDescription;
  if (!pageDescription && region.content) {
    // HTML tag'lerini temizle ve ilk 150 karakteri al
    const cleanContent = region.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    pageDescription = cleanContent.substring(0, 150) + (cleanContent.length > 150 ? '...' : '');
  }
  // Hala yoksa otomatik oluştur
  if (!pageDescription) {
    pageDescription = `${region.sourceCity} ${region.targetCity} arası evden eve nakliyat. ${region.distance} km mesafe, ${region.duration} saat süre. ${region.priceMin}₺'den başlayan fiyatlarla sigortalı taşıma.`;
  }

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `/${regionSlug}`,
      languages: {
        'tr': `/${regionSlug}`,
        'x-default': `/${regionSlug}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `/${regionSlug}`,
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${region.title} | Profesyonel Nakliyat`,
      description: `${region.sourceCity} ${region.targetCity} arası ${region.distance} km profesyonel nakliyat hizmeti.`,
    },
    other: {
      'content-language': 'tr',
    },
  };
}

// Viewport ayrı export - Next.js 15 requirement
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default async function RegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region: regionSlug } = await params;
  const region = await getRegion(regionSlug);

  if (!region) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#F3F3F3] border-b border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6">
            {region.title}
          </h1>
          <Breadcrumbs 
            items={[
              { label: 'Hizmet Bölgeleri', href: '/bolgeler' },
              { label: region.title }
            ]} 
          />
        </div>
      </section>
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Rota Bilgileri */}
          <RouteInfoSection
            distance={region.distance}
            duration={region.duration}
            priceMin={region.priceMin}
            sourceCity={region.sourceCity}
            targetCity={region.targetCity}
            regionTitle={region.title}
          />
          
          {/* TOC Section */}
          <div className="mb-8">
            <TOC items={tocItems} />
          </div>

          {/* İçerik */}
          <div id="icerik" className="bg-background p-8 rounded-xl border border-border mb-8">
            <RegionContent content={region.content} />
          </div>

          {/* Fiyatlandırma */}
          <div id="fiyatlandirma">
            <PricingSection regionTitle={`${region.sourceCity} ${region.targetCity}`} />
          </div>

          {/* SSS - Sık Sorulan Sorular */}
          {region.faqs && region.faqs.length > 0 && (
            <div id="sss">
              <FAQSection regionFaqs={region.faqs} />
            </div>
          )}

          {/* Müşteri Yorumları */}
          <div id="yorumlar">
            <ReviewsSection regionId={region.id} regionTitle={region.title} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
