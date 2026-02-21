import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// POST - Toplu bölge silme
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { ids } = await request.json();
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'Geçersiz ID listesi' }, { status: 400 });
    }

    let deletedCount = 0;
    const errors: string[] = [];

    for (const id of ids) {
      try {
        const filePath = path.join(REGIONS_DIR, `${id}.json`);
        await fs.unlink(filePath);
        deletedCount++;
      } catch (error) {
        errors.push(id);
      }
    }

    return NextResponse.json({ 
      success: true, 
      deletedCount,
      totalRequested: ids.length,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json({ error: 'Toplu silme hatası' }, { status: 500 });
  }
}
