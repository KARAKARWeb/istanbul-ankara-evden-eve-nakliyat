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
  
  try {
    const aboutPath = path.join(process.cwd(), 'data/content/about.json');
    const seoPath = path.join(process.cwd(), 'data/seo/pages.json');
    const [aboutContent, seoContent] = await Promise.all([
      fs.readFile(aboutPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(seoPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
    ]);
    aboutData = aboutContent;
    pageSEO = seoContent?.about || null;
  } catch {
    // Fallback
  }
  
  return <AboutPageClient siteSettings={siteSettings} contactData={contactSettings} aboutData={aboutData} pageSEO={pageSEO} />;
}
