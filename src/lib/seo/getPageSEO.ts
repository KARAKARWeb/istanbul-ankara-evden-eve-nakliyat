'use server';

import fs from 'fs';
import path from 'path';
import { getSiteSettings } from './getContactSettings';

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
}

export async function getPageSEO(page: 'home' | 'about' | 'contact' | 'regions'): Promise<PageSEO> {
  try {
    const filePath = path.join(process.cwd(), 'data/seo/pages.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const pageData = data[page];
    const titleSuffix = data.titleSuffix || '';
    
    if (pageData) {
      // Ana sayfaya suffix ekleme, diğer sayfalara ekle
      const shouldAddSuffix = page !== 'home' && titleSuffix;
      
      return {
        title: shouldAddSuffix ? `${pageData.title} ${titleSuffix}` : pageData.title,
        description: pageData.description,
        keywords: pageData.keywords,
      };
    }
    
    // Fallback: site.json'dan dinamik çek
    const site = await getSiteSettings();
    return {
      title: site.siteName || 'Evden Eve Nakliyat',
      description: site.description || 'Profesyonel evden eve nakliyat hizmeti',
      keywords: 'evden eve nakliyat',
    };
  } catch (error) {
    // Son fallback: site.json'dan dinamik çek
    try {
      const site = await getSiteSettings();
      return {
        title: site.siteName || 'Evden Eve Nakliyat',
        description: site.description || 'Profesyonel evden eve nakliyat hizmeti',
        keywords: 'evden eve nakliyat',
      };
    } catch {
      return {
        title: 'Evden Eve Nakliyat',
        description: 'Profesyonel evden eve nakliyat hizmeti',
        keywords: 'evden eve nakliyat',
      };
    }
  }
}
