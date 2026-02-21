import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function robots(): MetadataRoute.Robots {
  // Dashboard settings'ten ayarları oku
  let crawlDelay = 0;
  let userAgentRules = '';
  
  try {
    const settingsPath = path.join(process.cwd(), 'data/settings/robots.json');
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    crawlDelay = parseInt(settings.crawlDelay) || 0;
    userAgentRules = settings.userAgentRules || '';
  } catch (error) {
    // Default settings
  }

  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/karakar/', '/api/'],
      crawlDelay: crawlDelay > 0 ? crawlDelay : undefined,
    },
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/karakar/', '/api/'],
    },
    {
      userAgent: 'Bingbot',
      allow: '/',
      disallow: ['/karakar/', '/api/'],
    },
  ];

  return {
    rules,
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
