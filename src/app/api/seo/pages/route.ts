import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/seo/pages.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // Fallback: Dinamik değerler
    return NextResponse.json({
      home: {
        title: "Evden Eve Nakliyat | Profesyonel Taşımacılık",
        description: "Profesyonel evden eve nakliyat hizmeti.",
        keywords: "evden eve nakliyat"
      },
      about: {
        title: "Hakkımızda",
        description: "Hakkımızda sayfası",
        keywords: "hakkımızda"
      },
      contact: {
        title: "İletişim",
        description: "İletişim sayfası",
        keywords: "iletişim"
      }
    });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Veri kaydedilemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return PUT(request);
}
