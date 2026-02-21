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
  
  return <AboutPageClient siteSettings={siteSettings} contactData={contactSettings} />;
}
