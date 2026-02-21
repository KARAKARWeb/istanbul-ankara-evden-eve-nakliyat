import { Metadata } from 'next';
import { getPageSEO } from '@/lib/seo/getPageSEO';
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

export default function ContactPage() {
  return <ContactPageClient />;
}
