// NOT: Bu component artık kullanılmıyor
// Bunun yerine src/lib/seo/generateSchemas.ts kullanılıyor
// Dinamik telefon, email, adres için generateHomePageSchema() kullan

// Unified Schema with @graph - Tüm schema'ları tek bir JSON-LD'de birleştirir
import { useState, useEffect } from 'react';

export function UnifiedSchema({ schemas }: { schemas: any[] }) {
  const unifiedSchema = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedSchema) }}
      suppressHydrationWarning
    />
  );
}

interface UnifiedSchemaProps {
  siteSettings?: any;
  routeInfo?: any;
}

// Ana Sayfa için Unified Schema
export function HomePageUnifiedSchema({ siteSettings, routeInfo }: UnifiedSchemaProps = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const siteName = siteSettings?.siteName || 'Evden Eve Nakliyat';
  
  const schemas = [
    // Organization
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: siteName,
      // TODO: site.json'dan siteName çekilecek
      url: baseUrl,
      logo: `${baseUrl}/logo-koyu.svg`,
      description: 'Profesyonel, güvenilir ve uygun fiyatlı evden eve nakliyat hizmeti',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: 'Dinamik telefon',
        contactType: 'customer service',
        email: 'Dinamik email',
        areaServed: 'TR',
        availableLanguage: 'Turkish',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kaynarca Mah. Bahattin Veled Cad. No:37',
        addressLocality: 'Pendik',
        addressRegion: 'İstanbul',
        postalCode: '34890',
        addressCountry: 'TR',
      },
      sameAs: [
        'https://facebook.com/',
        'https://instagram.com/',
        'https://twitter.com/',
      ],
    },
    // WebSite
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: siteName,
      url: baseUrl,
      description: 'Profesyonel, güvenilir ve uygun fiyatlı evden eve nakliyat hizmeti',
      publisher: {
        '@id': `${baseUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/bolgeler?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // LocalBusiness
    {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#localbusiness`,
      name: siteName,
      image: `${baseUrl}/logo-koyu.svg`,
      url: baseUrl,
      telephone: 'Dinamik telefon',
      priceRange: '₺₺',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kaynarca Mah. Bahattin Veled Cad. No:37',
        addressLocality: 'Pendik',
        addressRegion: 'İstanbul',
        postalCode: '34890',
        addressCountry: 'TR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.8767,
        longitude: 29.2361,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        'https://facebook.com/',
        'https://instagram.com/',
        'https://twitter.com/',
      ],
    },
    // Service
    {
      '@type': 'Service',
      '@id': `${baseUrl}/#service`,
      serviceType: 'Evden Eve Nakliyat',
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
      areaServed: {
        '@type': 'City',
        name: `${routeInfo.fromCity || 'İstanbul'}, ${routeInfo.toCity || 'Ankara'}`,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Nakliyat Hizmetleri',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Evden Eve Nakliyat',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Profesyonel Paketleme',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sigortalı Taşıma',
            },
          },
        ],
      },
    },
    // FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/#faqpage`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Nakliyat ücreti nasıl hesaplanır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nakliyat ücreti ev büyüklüğü, mesafe, asansör durumu ve eşya miktarına göre belirlenir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Sigorta kapsamı nedir?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tüm eşyalarınız taşıma sırasında sigorta kapsamındadır. Herhangi bir hasar durumunda tazminat ödenir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ne kadar önceden rezervasyon yapmalıyım?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En az 3-5 gün önceden rezervasyon yapmanızı öneriyoruz. Yoğun dönemlerde daha erken rezervasyon gerekebilir.',
          },
        },
        {
          '@type': 'Question',
          name: 'Paketleme hizmeti veriyor musunuz?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, profesyonel paketleme hizmeti sunuyoruz. Özel paketleme malzemeleri ile eşyalarınızı koruyoruz.',
          },
        },
      ],
    },
  ];

  return <UnifiedSchema schemas={schemas} />;
}

// WebPage için Unified Schema
export function WebPageUnifiedSchema({ 
  name, 
  description, 
  url,
  breadcrumbs 
}: { 
  name: string; 
  description: string; 
  url: string;
  breadcrumbs?: Array<{ name: string; url?: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const schemas: any[] = [
    // WebPage
    {
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
      name,
      description,
      url: fullUrl,
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
      about: {
        '@id': `${baseUrl}/#organization`,
      },
      inLanguage: 'tr',
    },
  ];

  // BreadcrumbList ekle (varsa)
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(item.url && { item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}` }),
      })),
    });
  }

  return <UnifiedSchema schemas={schemas} />;
}
