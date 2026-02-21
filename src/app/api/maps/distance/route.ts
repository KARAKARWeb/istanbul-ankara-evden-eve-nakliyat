import { NextRequest, NextResponse } from 'next/server';
import { calculateDistance } from '@/lib/maps/distance';

// GET - Mesafe hesapla
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json({ 
      error: 'origin ve destination parametreleri gerekli' 
    }, { status: 400 });
  }

  try {
    const result = await calculateDistance(origin, destination);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ 
      error: 'Mesafe hesaplanamadı' 
    }, { status: 500 });
  }
}
