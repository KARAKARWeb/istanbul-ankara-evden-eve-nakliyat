import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/content/regions-showcase.json');

// GET - Hizmet Bölgeleri verilerini getir
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // Dosya yoksa default data döndür
    const defaultData = {
      title: 'Hizmet Bölgelerimiz',
      description: 'Türkiye\'nin her yerine güvenli nakliyat hizmeti',
      pageDescription: ''
    };
    return NextResponse.json(defaultData);
  }
}

// POST - Hizmet Bölgeleri verilerini kaydet
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const data = {
      title: body.title || 'Hizmet Bölgelerimiz',
      description: body.description || '',
      pageDescription: body.pageDescription || '',
      updatedAt: new Date().toISOString()
    };
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Regions showcase save error:', error);
    return NextResponse.json({ error: 'Kaydetme başarısız' }, { status: 500 });
  }
}
