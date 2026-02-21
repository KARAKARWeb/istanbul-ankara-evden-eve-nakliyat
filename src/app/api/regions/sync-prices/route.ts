import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');
const SETTINGS_PATH = path.join(process.cwd(), 'data/settings/route-info.json');

// POST - Tüm regionların priceMin'ini dashboard settings'den güncelle
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    // Dashboard settings'den base fiyat çek
    const settingsData = await fs.readFile(SETTINGS_PATH, 'utf-8');
    const settings = JSON.parse(settingsData);
    const basePriceMin = settings.priceMin || 0;

    // Tüm bölgeleri oku
    const files = await fs.readdir(REGIONS_DIR);
    const regionFiles = files.filter(file => file.endsWith('.json'));
    
    let updatedCount = 0;
    const results = [];
    
    for (const file of regionFiles) {
      const filePath = path.join(REGIONS_DIR, file);
      const data = await fs.readFile(filePath, 'utf-8');
      const region = JSON.parse(data);
      
      // Rastgele fiyat: base ± 50₺
      const randomPriceOffset = Math.floor(Math.random() * 101) - 50; // -50 ile +50 arası
      const newPriceMin = Math.max(1000, basePriceMin + randomPriceOffset); // Min 1000₺
      
      const oldPrice = region.priceMin;
      region.priceMin = newPriceMin;
      region.updatedAt = new Date().toISOString();
      
      await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
      
      updatedCount++;
      results.push({
        region: region.title,
        oldPrice,
        newPrice: newPriceMin,
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      updatedCount,
      basePriceMin,
      results 
    });
  } catch (error) {
    console.error('Sync prices error:', error);
    return NextResponse.json({ error: 'Fiyatlar senkronize edilemedi' }, { status: 500 });
  }
}
