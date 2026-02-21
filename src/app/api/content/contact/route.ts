import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'data/content');
const FILE_PATH = path.join(CONTENT_DIR, 'contact.json');

export async function GET() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch (error) {
      return NextResponse.json({
        description: '',
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'İçerik yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    
    const data = {
      description: body.description || '',
      updatedAt: new Date().toISOString(),
    };
    
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'İçerik kaydedilemedi' }, { status: 500 });
  }
}
