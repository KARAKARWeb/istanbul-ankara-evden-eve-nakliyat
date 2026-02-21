interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'FAQPage' | 'BreadcrumbList';
  data: any;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// NOT: Bu component'ler artık kullanılmıyor
// Bunun yerine src/lib/seo/generateSchemas.ts kullanılıyor
// Dinamik telefon, email, adres için generateHomePageSchema() kullan

// LocalBusiness Schema
export function LocalBusinessSchema({
  name = 'Evden Eve Nakliyat',
  phone = '',
  address = {},
}: {
  name?: string;
  phone?: string;
  address?: any;
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-koyu.svg`,
    '@id': process.env.NEXT_PUBLIC_SITE_URL,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: phone,
    priceRange: '₺₺',
    address: address.streetAddress ? address : {
      '@type': 'PostalAddress',
      streetAddress: 'Dinamik Adres',
      addressLocality: 'Dinamik',
      addressRegion: 'Dinamik',
      postalCode: '00000',
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
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQPage Schema
export function FAQPageSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema
export function ServiceSchema({
  name = 'Evden Eve Nakliyat',
  phone = '',
  routeInfo = { fromCity: 'İstanbul', toCity: 'Ankara' }
}: {
  name?: string;
  phone?: string;
  routeInfo?: any;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Evden Eve Nakliyat',
    provider: {
      '@type': 'LocalBusiness',
      name,
      telephone: phone,
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
            name: 'Asansörlü Nakliyat',
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// MovingCompany Schema
export function MovingCompanySchema({
  name = 'Evden Eve Nakliyat',
  phone = '',
  address = {},
}: {
  name?: string;
  phone?: string;
  address?: any;
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/logo-koyu.svg`,
    '@id': process.env.NEXT_PUBLIC_SITE_URL,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: phone,
    priceRange: '₺₺',
    address: address.streetAddress ? address : {
      '@type': 'PostalAddress',
      streetAddress: 'Dinamik Adres',
      addressLocality: 'Dinamik',
      addressRegion: 'Dinamik',
      postalCode: '00000',
      addressCountry: 'TR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema
export function BreadcrumbListSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList Schema (Bölgeler için)
export function ItemListSchema({ items }: { items: Array<{ name: string; url: string; rating?: number; reviewCount?: number }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.name,
        url: item.url,
        ...(item.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating.toString(),
            reviewCount: item.reviewCount?.toString() || '15',
          },
        }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebPage Schema
export function WebPageSchema({ name, description, url }: { name: string; description: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Evden Eve Nakliyat',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Offer Schema (Fiyatlandırma için)
export function OfferSchema({ name, price, description }: { name: string; price: number; description?: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name,
    price: price.toString(),
    priceCurrency: 'TRY',
    availability: 'https://schema.org/InStock',
    ...(description && { description }),
    seller: {
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

// Review Schema (Individual)
export function ReviewSchema({ author, rating, reviewBody, datePublished }: { author: string; rating: number; reviewBody: string; datePublished: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody,
    datePublished,
    itemReviewed: {
      '@type': 'Service',
      name: 'Evden Eve Nakliyat Hizmeti',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
