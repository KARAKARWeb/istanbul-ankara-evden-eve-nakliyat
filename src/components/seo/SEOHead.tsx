import { Metadata } from 'next';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/og-image.jpg',
}: SEOHeadProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: fullCanonical,
      siteName: 'Evden Eve Nakliyat',
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullCanonical,
    },
  };
}
