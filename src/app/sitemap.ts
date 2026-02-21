import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
    
    try {
      const siteJsonPath = path.join(process.cwd(), 'data/settings/site.json');
      const siteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf-8'));
      if (siteData.domain) {
        return `https://${siteData.domain}`;
      }
    } catch (error) {
      console.error('Error reading site.json:', error);
    }
    
    return 'https://example.com';
  }

  const baseUrl = getBaseUrl();
  
  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bolgeler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dinamik bölge sayfaları
  try {
    const regionsDir = path.join(process.cwd(), 'data/regions');
    const files = fs.readdirSync(regionsDir).filter(f => f.endsWith('.json'));
    
    const regionPages: MetadataRoute.Sitemap = files
      .map(file => {
        try {
          const content = fs.readFileSync(path.join(regionsDir, file), 'utf-8');
          const region = JSON.parse(content);
          
          if (region.active && region.slug) {
            return {
              url: `${baseUrl}/bolgeler/${region.slug}`,
              lastModified: new Date(),
              changeFrequency: 'weekly' as const,
              priority: 0.8,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error reading region file ${file}:`, error);
          return null;
        }
      })
      .filter((page): page is NonNullable<typeof page> => page !== null);
    
    return [...staticPages, ...regionPages];
  } catch (error) {
    console.error('Error reading regions directory:', error);
    return staticPages;
  }
}
