import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');
const SETTINGS_PATH = path.join(process.cwd(), 'data/settings/route-info.json');

// POST - Tüm regionların mesafe/süre bilgilerini dashboard settings'den rastgele güncelle
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    // Dashboard settings'den base değerleri çek
    const settingsData = await fs.readFile(SETTINGS_PATH, 'utf-8');
    const settings = JSON.parse(settingsData);
    const baseDistance = settings.distance || 468;
    const baseDuration = settings.duration || 5.5;

    // Tüm bölgeleri oku
    const files = await fs.readdir(REGIONS_DIR);
    const regionFiles = files.filter(file => file.endsWith('.json'));
    
    let updatedCount = 0;
    const results = [];
    
    for (const file of regionFiles) {
      const filePath = path.join(REGIONS_DIR, file);
      const data = await fs.readFile(filePath, 'utf-8');
      const region = JSON.parse(data);
      
      // Rastgele mesafe: base ± 50km
      const randomDistanceOffset = Math.floor(Math.random() * 101) - 50; // -50 ile +50 arası
      const newDistance = Math.max(50, baseDistance + randomDistanceOffset); // Min 50km
      
      // Rastgele süre: base ± 0.5 saat
      const randomDurationOffset = (Math.random() - 0.5); // -0.5 ile +0.5 arası
      const newDuration = Math.max(1, Math.round((baseDuration + randomDurationOffset) * 10) / 10); // Min 1 saat, 0.1 hassasiyet
      
      const oldDistance = region.distance;
      const oldDuration = region.duration;
      
      region.distance = newDistance;
      region.duration = newDuration;
      region.updatedAt = new Date().toISOString();
      
      await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
      
      updatedCount++;
      results.push({
        region: region.title,
        oldDistance,
        newDistance,
        oldDuration,
        newDuration,
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      updatedCount,
      baseDistance,
      baseDuration,
      results 
    });
  } catch (error) {
    console.error('Sync route info error:', error);
    return NextResponse.json({ error: 'Rota bilgileri senkronize edilemedi' }, { status: 500 });
  }
}
