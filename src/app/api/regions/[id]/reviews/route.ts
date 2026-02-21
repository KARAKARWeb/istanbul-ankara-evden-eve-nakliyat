import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

// GET - Bölge yorumlarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    const region = JSON.parse(data);
    
    const reviews = region.reviews || [];
    const aggregateRating = calculateAggregateRating(reviews);
    
    return NextResponse.json({ reviews, aggregateRating });
  } catch (error) {
    return NextResponse.json({ reviews: [], aggregateRating: null }, { status: 404 });
  }
}

// POST - Bölgeye yorum ekle
export async function POST(
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
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    const region = JSON.parse(data);
    
    const newReview = {
      id: Date.now().toString(),
      author: body.author,
      rating: body.rating,
      text: body.text,
      date: new Date().toISOString().split('T')[0],
      verified: body.verified || false,
    };
    
    region.reviews = region.reviews || [];
    region.reviews.push(newReview);
    region.updatedAt = new Date().toISOString();
    
    await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, review: newReview });
  } catch (error) {
    console.error('Review add error:', error);
    return NextResponse.json({ error: 'Yorum eklenemedi' }, { status: 500 });
  }
}

// DELETE - Bölgeden yorum sil
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
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('reviewId');
    
    const filePath = path.join(REGIONS_DIR, `${id}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    const region = JSON.parse(data);
    
    region.reviews = (region.reviews || []).filter((r: any) => r.id !== reviewId);
    region.updatedAt = new Date().toISOString();
    
    await fs.writeFile(filePath, JSON.stringify(region, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Review delete error:', error);
    return NextResponse.json({ error: 'Yorum silinemedi' }, { status: 500 });
  }
}

function calculateAggregateRating(reviews: any[]) {
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = totalRating / reviews.length;
  
  return {
    ratingValue: Math.round(avgRating * 10) / 10,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
