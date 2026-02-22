import { Metadata } from 'next';
import { getPageSEO } from '@/lib/seo/getPageSEO';
import { getSiteSettings, getContactSettings } from '@/lib/seo/getContactSettings';
import RegionsPageClient from './RegionsPageClient';

// ISR: 1 saat cache
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPageSEO('regions');
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: '/bolgeler',
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: '/bolgeler',
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

export default async function RegionsPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  
  // Server-side regions fetch
  const fs = require('fs/promises');
  const path = require('path');
  let regionsData = [];
  let showcaseData = null;
  let pageSEO = null;
  
  try {
    const regionsDir = path.join(process.cwd(), 'data/regions');
    const showcasePath = path.join(process.cwd(), 'data/content/regions-showcase.json');
    const seoPath = path.join(process.cwd(), 'data/seo/pages.json');
    
    const [files, showcase, seo] = await Promise.all([
      fs.readdir(regionsDir),
      fs.readFile(showcasePath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(seoPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
    ]);
    
    const regions = await Promise.all(
      files
        .filter((file: string) => file.endsWith('.json'))
        .map(async (file: string) => {
          const data = await fs.readFile(path.join(regionsDir, file), 'utf-8');
          return JSON.parse(data);
        })
    );
    
    regionsData = regions.filter((r: any) => r.active);
    showcaseData = showcase;
    pageSEO = seo?.regions || null;
  } catch {
    // Fallback
  }
  
  return <RegionsPageClient siteSettings={siteSettings} contactData={contactSettings} regionsData={regionsData} showcaseData={showcaseData} pageSEO={pageSEO} />;
}
