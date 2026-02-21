import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/content/pricing.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ 
      title: 'Fiyatlandırma',
      description: 'Şeffaf ve rekabetçi fiyatlarımız',
      packages: [
        { name: '1+1 Ev Taşıma Fiyatı', priceRange: '18.000 – 22.000 TL', elevatorFee: '+ 4.000 TL' },
        { name: '2+1 Ev Taşıma Fiyatı', priceRange: '20.000 – 28.000 TL', elevatorFee: '+ 4.000 TL', popular: true },
        { name: '3+1 Ev Taşıma Fiyatı', priceRange: '25.000 – 35.000 TL', elevatorFee: '+ 4.000 TL' },
        { name: '4+1 Ev Taşıma Fiyatı', priceRange: '30.000 – 40.000 TL', elevatorFee: '+ 4.000 TL' },
        { name: '5+1 Ev Taşıma Fiyatı', priceRange: '35.000 – 45.000 TL', elevatorFee: '+ 4.000 TL' },
        { name: 'Villa Taşıma Fiyatı', priceRange: '50.000 TL', elevatorFee: '+ 4.000 TL' },
      ],
      additionalServices: [
        { name: 'Piyano Taşıma', price: '+ 500 TL' },
        { name: 'Beyaz Eşya Taşıma', price: '+ 200 TL' },
        { name: 'Depolama (Aylık)', price: '+ 1.000 TL' },
        { name: 'Ambalaj Malzemesi', price: '+ 300 TL' },
      ],
      infoItems: [
        'Fiyatlar rota bazlı hesaplanır',
        'Mesafe ve süre değişkenlik gösterebilir',
        'Tüm fiyatlar KDV dahildir',
        'Sigortalı taşıma ücretsizdir',
        'Kesin fiyat için ücretsiz keşif hizmeti sunuyoruz'
      ]
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
