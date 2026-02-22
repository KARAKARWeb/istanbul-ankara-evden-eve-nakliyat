import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/reviews/general.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Yorumlar okunamadı' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Aggregate rating'i otomatik hesapla
    if (body.reviews && Array.isArray(body.reviews)) {
      const totalRating = body.reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      const avgRating = body.reviews.length > 0 ? totalRating / body.reviews.length : 0;
      
      body.aggregateRating = {
        ratingValue: Math.round(avgRating * 10) / 10,
        reviewCount: body.reviews.length,
        bestRating: 5,
        worstRating: 1,
      };
      
      body.lastUpdated = new Date().toISOString();
    }
    
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), 'utf-8');
    
    // Ana sayfayı revalidate et
    revalidatePath('/');
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Yorumlar kaydedilemedi' }, { status: 500 });
  }
}

// POST - Yeni yorum ekle
export async function POST(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const newReview = await request.json();
    
    // Mevcut yorumları oku
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    const reviewsData = JSON.parse(data);
    
    // Yeni yorum ekle
    const review = {
      ...newReview,
      id: `gen-rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      verified: newReview.verified || false,
    };
    
    reviewsData.reviews.push(review);
    
    // Aggregate rating'i güncelle
    const totalRating = reviewsData.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    const avgRating = totalRating / reviewsData.reviews.length;
    
    reviewsData.aggregateRating = {
      ratingValue: Math.round(avgRating * 10) / 10,
      reviewCount: reviewsData.reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
    
    reviewsData.lastUpdated = new Date().toISOString();
    
    await fs.writeFile(DATA_PATH, JSON.stringify(reviewsData, null, 2), 'utf-8');
    
    // Ana sayfayı revalidate et - yeni yorum hemen görünsün
    revalidatePath('/');
    
    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    return NextResponse.json({ error: 'Yorum eklenemedi' }, { status: 500 });
  }
}
