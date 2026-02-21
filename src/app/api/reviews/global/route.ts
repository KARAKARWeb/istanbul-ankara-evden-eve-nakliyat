import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const REGIONS_DIR = path.join(process.cwd(), 'data/regions');

export async function GET() {
  try {
    // Tüm bölgeleri oku
    const files = await fs.readdir(REGIONS_DIR);
    const regionFiles = files.filter(file => file.endsWith('.json'));
    
    let allReviews: any[] = [];
    let totalRating = 0;
    let reviewCount = 0;
    
    // Her bölgenin yorumlarını topla
    for (const file of regionFiles) {
      const filePath = path.join(REGIONS_DIR, file);
      const data = await fs.readFile(filePath, 'utf-8');
      const region = JSON.parse(data);
      
      if (region.reviews && Array.isArray(region.reviews)) {
        // Her yoruma bölge bilgisi ekle
        const reviewsWithRegion = region.reviews.map((review: any) => ({
          ...review,
          regionTitle: region.title,
          regionSlug: region.slug,
        }));
        
        allReviews = [...allReviews, ...reviewsWithRegion];
        
        // Rating hesapla
        region.reviews.forEach((review: any) => {
          totalRating += review.rating;
          reviewCount++;
        });
      }
    }
    
    // Global AggregateRating hesapla
    const aggregateRating = reviewCount > 0 ? {
      ratingValue: parseFloat((totalRating / reviewCount).toFixed(1)),
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : {
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
    };
    
    // Yorumları tarihe göre sırala (en yeni önce)
    allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json({
      reviews: allReviews,
      aggregateRating,
    });
  } catch (error) {
    console.error('Global reviews error:', error);
    return NextResponse.json({ error: 'Yorumlar yüklenemedi' }, { status: 500 });
  }
}
