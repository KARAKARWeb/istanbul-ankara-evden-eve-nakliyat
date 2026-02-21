import { getContactSettings, getSiteSettings, formatPhoneForSchema, parseAddress } from './getContactSettings';

// Global Schema Generator - Metadata API için
export async function generateOrganizationSchema() {
  const contact = await getContactSettings();
  const site = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (site.domain ? `https://${site.domain}` : '');
  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_SITE_URL not set and site.domain is empty');
    return {};
  }
  const addressParsed = parseAddress(contact.address);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo-koyu.svg`,
    description: site.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: formatPhoneForSchema(contact.phone),
      contactType: 'customer service',
      email: contact.email,
      areaServed: 'TR',
      availableLanguage: 'Turkish',
    },
    address: {
      '@type': 'PostalAddress',
      ...addressParsed,
    },
    sameAs: [
      contact.facebook,
      contact.instagram,
      contact.twitter,
    ].filter(Boolean),
  };
}

export async function generateWebSiteSchema() {
  const site = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (site.domain ? `https://${site.domain}` : '');
  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_SITE_URL not set and site.domain is empty');
    return {};
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.siteName,
    url: baseUrl,
    description: site.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/bolgeler?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export async function generateHomePageSchema(routeInfo?: any) {
  const contact = await getContactSettings();
  const site = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (site.domain ? `https://${site.domain}` : '');
  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_SITE_URL not set and site.domain is empty');
    return {};
  }
  const addressParsed = parseAddress(contact.address);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: site.siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo-koyu.svg`,
        description: site.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: formatPhoneForSchema(contact.phone),
          contactType: 'customer service',
          email: contact.email,
          areaServed: 'TR',
          availableLanguage: 'Turkish',
        },
        address: {
          '@type': 'PostalAddress',
          ...addressParsed,
        },
        sameAs: [
          contact.facebook,
          contact.instagram,
          contact.twitter,
        ].filter(Boolean),
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: site.siteName,
        url: baseUrl,
        description: site.description,
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
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#localbusiness`,
        name: site.siteName,
        image: `${baseUrl}/logo-koyu.svg`,
        url: baseUrl,
        telephone: formatPhoneForSchema(contact.phone),
        priceRange: '₺₺',
        address: {
          '@type': 'PostalAddress',
          ...addressParsed,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: contact.coordinates.lat,
          longitude: contact.coordinates.lng,
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
          contact.facebook,
          contact.instagram,
          contact.twitter,
        ].filter(Boolean),
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service`,
        serviceType: 'Evden Eve Nakliyat',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: {
          '@type': 'City',
          name: routeInfo ? `${routeInfo.fromCity || 'İstanbul'}, ${routeInfo.toCity || 'Ankara'}` : 'İstanbul, Ankara',
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
    ],
  };
}
