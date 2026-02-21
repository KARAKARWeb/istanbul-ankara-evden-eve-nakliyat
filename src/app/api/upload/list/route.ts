import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { listImages, getImageInfo } from '@/lib/image/upload';

// GET - Tüm resimleri listele
export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const filenames = await listImages();
    
    // Her resim için bilgi al
    const images = await Promise.all(
      filenames.map(async (filename) => {
        const info = await getImageInfo(filename);
        return info;
      })
    );

    // Null olanları filtrele ve tarihe göre sırala
    const validImages = images
      .filter(img => img !== null)
      .sort((a, b) => {
        if (!a || !b) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return NextResponse.json({
      success: true,
      count: validImages.length,
      images: validImages,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Liste alınamadı' }, { status: 500 });
  }
}
