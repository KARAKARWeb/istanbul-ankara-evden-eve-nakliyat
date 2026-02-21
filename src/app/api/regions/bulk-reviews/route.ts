import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// NOT: Otomatik yorum oluşturma kaldırıldı
// Yorumlar artık manuel eklenecek (Google Maps, gerçek müşteriler vs.)
// Bu endpoint sadece toplu silme için kullanılıyor

// DELETE - Tüm yorumları sil
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const files = await fs.readdir(REGIONS_DIR);
    const regionFiles = files.filter(file => file.endsWith('.json'));
    
    let totalDeleted = 0;
    
    for (const file of regionFiles) {
      const filePath = path.join(REGIONS_DIR, file);
      const data = await fs.readFile(filePath, 'utf-8');
      const region = JSON.parse(data);
      
      const reviewCount = (region.reviews || []).length;
      totalDeleted += reviewCount;
      
      region.reviews = [];
      region.updatedAt = new Date().toISOString();
      
      await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
    }
    
    return NextResponse.json({ 
      success: true, 
      totalDeleted,
      regionsUpdated: regionFiles.length 
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    return NextResponse.json({ error: 'Yorumlar silinemedi' }, { status: 500 });
  }
}
