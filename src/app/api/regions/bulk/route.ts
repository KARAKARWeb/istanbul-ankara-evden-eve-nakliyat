import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// POST - Toplu bölge ekleme
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { regions } = await request.json();
    
    if (!Array.isArray(regions)) {
      return NextResponse.json({ error: 'Geçersiz veri formatı' }, { status: 400 });
    }
    
    // Klasörü oluştur (yoksa)
    await fs.mkdir(REGIONS_DIR, { recursive: true });
    
    const results = [];
    
    for (let i = 0; i < regions.length; i++) {
      const regionData = regions[i];
      
      // ID oluştur
      const id = regionData.slug || `${regionData.sourceCity.toLowerCase()}-${regionData.targetCity.toLowerCase()}`
        .replace(/\s+/g, '-')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c');
      
      const region = {
        ...regionData,
        id,
        order: regionData.order || i + 1,
        active: regionData.active !== false,
        featured: regionData.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const filePath = path.join(REGIONS_DIR, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
      
      results.push(region);
    }
    
    return NextResponse.json({ 
      success: true, 
      count: results.length,
      data: results 
    });
  } catch (error) {
    console.error('Bulk region error:', error);
    return NextResponse.json({ error: 'Toplu ekleme başarısız' }, { status: 500 });
  }
}
