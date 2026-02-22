import { Metadata } from 'next';
import { getPageSEO } from '@/lib/seo/getPageSEO';
import { getSiteSettings, getContactSettings } from '@/lib/seo/getContactSettings';
import AboutPageClient from './AboutPageClient';

// ISR: 1 saat cache
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPageSEO('about');
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: '/hakkimizda',
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: '/hakkimizda',
      type: 'website',
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
    },
  };
}

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  
  // Server-side about content fetch
  const fs = require('fs/promises');
  const path = require('path');
  let aboutData = null;
  let pageSEO = null;
  let footerData = null;
  let regionsData: any[] = [];
  
  try {
    const aboutPath = path.join(process.cwd(), 'data/content/about.json');
    const seoPath = path.join(process.cwd(), 'data/seo/pages.json');
    const footerLayer1Path = path.join(process.cwd(), 'data/footer/layer-1.json');
    const footerLayer2Path = path.join(process.cwd(), 'data/footer/layer-2.json');
    const footerLayer3Path = path.join(process.cwd(), 'data/footer/layer-3.json');
    
    const [aboutContent, seoContent, layer1, layer2, layer3] = await Promise.all([
      fs.readFile(aboutPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(seoPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(footerLayer1Path, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(footerLayer2Path, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(footerLayer3Path, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
    ]);
    
    aboutData = aboutContent;
    pageSEO = seoContent?.about || null;
    footerData = { layer1, layer2, layer3 };
    
    // Regions data fetch
    try {
      const regionsDir = path.join(process.cwd(), 'data/regions');
      const files = await fs.readdir(regionsDir);
      const regions = await Promise.all(
        files
          .filter((file: string) => file.endsWith('.json'))
          .map(async (file: string) => {
            const filePath = path.join(regionsDir, file);
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
          })
      );
      regionsData = regions.slice(0, 6);
    } catch {}
  } catch {
    // Fallback
  }
  
  return <AboutPageClient siteSettings={siteSettings} contactData={contactSettings} aboutData={aboutData} pageSEO={pageSEO} footerData={footerData} regionsData={regionsData} />;
}
