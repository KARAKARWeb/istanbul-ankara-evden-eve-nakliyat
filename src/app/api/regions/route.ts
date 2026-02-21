import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// GET - Tüm bölgeleri listele
export async function GET() {
  try {
    const files = await fs.readdir(REGIONS_DIR);
    const regions = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const data = await fs.readFile(path.join(REGIONS_DIR, file), 'utf-8');
          return JSON.parse(data);
        })
    );
    
    // Sıralama: order > createdAt
    regions.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Regions API Error:', error);
    return NextResponse.json({ error: 'Bölgeler okunamadı', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// POST - Yeni bölge ekle
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // ID oluştur (slug'dan)
    const id = body.slug || `${body.sourceCity.toLowerCase()}-${body.targetCity.toLowerCase()}`.replace(/\s+/g, '-').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
    
    const region = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data: region });
  } catch (error) {
    return NextResponse.json({ error: 'Bölge eklenemedi' }, { status: 500 });
  }
}
