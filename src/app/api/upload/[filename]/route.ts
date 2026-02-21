import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { deleteImage, getImageInfo } from '@/lib/image/upload';

// GET - Resim bilgilerini getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  
  try {
    const info = await getImageInfo(filename);
    
    if (!info) {
      return NextResponse.json({ error: 'Resim bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: 'Bilgi alınamadı' }, { status: 500 });
  }
}

// DELETE - Resmi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const success = await deleteImage(filename);
    
    if (!success) {
      return NextResponse.json({ error: 'Resim silinemedi' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
  }
}
