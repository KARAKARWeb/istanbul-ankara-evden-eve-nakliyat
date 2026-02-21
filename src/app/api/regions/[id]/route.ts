import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// GET - Tek bölge getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Bölge bulunamadı' }, { status: 404 });
  }
}

// PUT - Bölge güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // PriceMin yoksa dashboard settings'den çek
    let priceMin = body.priceMin;
    if (!priceMin) {
      try {
        const settingsPath = path.join(process.cwd(), 'data/settings/route-info.json');
        const settingsData = await fs.readFile(settingsPath, 'utf-8');
        const settings = JSON.parse(settingsData);
        priceMin = settings.priceMin || 0;
      } catch (error) {
        priceMin = 0;
      }
    }
    
    const region = {
      ...body,
      id,
      priceMin,
      updatedAt: new Date().toISOString(),
    };
    
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data: region });
  } catch (error) {
    return NextResponse.json({ error: 'Bölge güncellenemedi' }, { status: 500 });
  }
}

// DELETE - Bölge sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    await fs.unlink(filePath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Bölge silinemedi' }, { status: 500 });
  }
}
