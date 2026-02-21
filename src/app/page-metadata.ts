import { Metadata } from 'next';
import { getPageSEO } from '@/lib/seo/getPageSEO';

export async function generateMetadata(): Promise<Metadata> {
  const pageSEO = await getPageSEO('home');
  
  return {
    title: pageSEO.title,
    description: pageSEO.description,
    keywords: pageSEO.keywords,
    openGraph: {
      title: pageSEO.title,
      description: pageSEO.description,
    },
    twitter: {
      title: pageSEO.title,
      description: pageSEO.description,
    },
  };
}
