import { Metadata } from 'next';
import { getPageSEO } from '@/lib/seo/getPageSEO';
import { getSiteSettings, getContactSettings } from '@/lib/seo/getContactSettings';
import ContactPageClient from './ContactPageClient';

// ISR: 1 saat cache
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getPageSEO('contact');
  
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: '/iletisim',
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: '/iletisim',
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

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const contactSettings = await getContactSettings();
  
  // Server-side contact content fetch
  const fs = require('fs/promises');
  const path = require('path');
  let contactContent = null;
  let pageSEO = null;
  
  try {
    const contentPath = path.join(process.cwd(), 'data/content/contact.json');
    const seoPath = path.join(process.cwd(), 'data/seo/pages.json');
    const [content, seoContent] = await Promise.all([
      fs.readFile(contentPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
      fs.readFile(seoPath, 'utf-8').then((d: string) => JSON.parse(d)).catch(() => null),
    ]);
    contactContent = content;
    pageSEO = seoContent?.contact || null;
  } catch {
    // Fallback
  }
  
  return <ContactPageClient siteSettings={siteSettings} contactData={contactSettings} contactContent={contactContent} pageSEO={pageSEO} />;
}
