'use client';

import React from 'react';

// Bu component artık kullanılmıyor - generateSchemas.ts kullanılıyor
// Sadece geriye dönük uyumluluk için bırakıldı
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dinamik Site Adı',
    url: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!}/logo-koyu.svg`,
    description: 'Dinamik açıklama',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

interface WebSiteSchemaProps {
  siteSettings?: any;
}

// WebSite Schema - Global site bilgileri
export function WebSiteSchema({ siteSettings }: WebSiteSchemaProps = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings?.siteName || 'Evden Eve Nakliyat',
    url: process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!,
    description: 'Profesyonel, güvenilir ve uygun fiyatlı evden eve nakliyat hizmeti',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!}/bolgeler?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}

// AggregateRating Schema - Ayrı olarak (LocalBusiness'tan bağımsız)
export function AggregateRatingSchema({ 
  ratingValue = '4.8', 
  reviewCount = '127',
  bestRating = '5',
  worstRating = '1',
  itemName = 'Evden Eve Nakliyat Hizmeti'
}: {
  ratingValue?: string;
  reviewCount?: string;
  bestRating?: string;
  worstRating?: string;
  itemName?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating,
      worstRating,
    },
    brand: {
      '@type': 'Brand',
      name: 'Evden Eve Nakliyat',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ImageObject Schema - Görseller için
export function ImageObjectSchema({ 
  url, 
  caption, 
  width = 1200, 
  height = 630 
}: { 
  url: string; 
  caption: string; 
  width?: number; 
  height?: number; 
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: url.startsWith('http') ? url : `${baseUrl}${url}`,
    caption,
    width,
    height,
    author: {
      '@type': 'Organization',
      name: 'Evden Eve Nakliyat',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema - Blog/İçerik sayfaları için
export function ArticleSchema({ 
  headline, 
  description, 
  datePublished, 
  dateModified, 
  authorName = 'Site Admin',
  image 
}: { 
  headline: string; 
  description: string; 
  datePublished: string; 
  dateModified?: string; 
  authorName?: string;
  image?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Evden Eve Nakliyat',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-koyu.svg`,
      },
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${baseUrl}${image}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema - "Nasıl yapılır" içerikler için
export function HowToSchema({ 
  name, 
  description, 
  steps 
}: { 
  name: string; 
  description: string; 
  steps: Array<{ name: string; text: string; image?: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`,
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// VideoObject Schema - Video içerikler için
export function VideoObjectSchema({ 
  name, 
  description, 
  thumbnailUrl, 
  uploadDate, 
  duration, 
  contentUrl 
}: { 
  name: string; 
  description: string; 
  thumbnailUrl: string; 
  uploadDate: string; 
  duration: string; 
  contentUrl: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http') ? thumbnailUrl : `${baseUrl}${thumbnailUrl}`,
    uploadDate,
    duration,
    contentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Evden Eve Nakliyat',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-koyu.svg`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
