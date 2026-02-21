import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const SETTINGS_DIR = path.join(process.cwd(), 'data/settings');
const FILE_PATH = path.join(SETTINGS_DIR, 'theme.json');

// GET - Tema ayarlarını getir
export async function GET() {
  try {
    await fs.mkdir(SETTINGS_DIR, { recursive: true });
    
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      // Dosya yoksa default değerler
      return NextResponse.json({
        accentColor: '#16A34A',
        accentHoverColor: '#15803D',
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Tema ayarları yüklenemedi' }, { status: 500 });
  }
}

// POST - Tema ayarlarını kaydet
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.mkdir(SETTINGS_DIR, { recursive: true });
    
    const data = {
      accentColor: body.accentColor || '#16A34A',
      accentHoverColor: body.accentHoverColor || '#15803D',
      updatedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Tema ayarları kaydedilemedi' }, { status: 500 });
  }
}
