import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data/content/faq.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ 
      title: 'Sıkça Sorulan Sorular',
      description: '',
      faqs: [
        { q: 'Nakliyat ücreti nasıl hesaplanır?', a: 'Nakliyat ücreti ev büyüklüğü, mesafe, asansör durumu ve eşya miktarına göre belirlenir. Ücretsiz keşif hizmeti ile size en uygun fiyatı sunuyoruz.' },
        { q: 'Sigorta kapsamı nedir?', a: 'Tüm eşyalarınız taşıma sırasında sigorta kapsamındadır. Herhangi bir hasar durumunda tazminat ödenir.' },
        { q: 'Ne kadar önceden rezervasyon yapmalıyım?', a: 'En az 3-5 gün önceden rezervasyon yapmanızı öneriyoruz. Yoğun dönemlerde daha erken rezervasyon gerekebilir.' },
        { q: 'Paketleme hizmeti veriyor musunuz?', a: 'Evet, profesyonel paketleme hizmeti sunuyoruz. Özel paketleme malzemeleri ile eşyalarınızı koruyoruz.' },
        { q: 'Mobilya montaj/demontaj yapıyor musunuz?', a: 'Evet, tüm mobilyalarınızın sökme ve takma işlemlerini deneyimli ekibimiz gerçekleştirir.' },
        { q: 'Asansörsüz binalarda nasıl taşıma yapılır?', a: 'Asansörsüz binalarda dış cephe asansörü veya hamal hizmeti ile güvenli taşıma sağlanır.' },
        { q: 'Eşya depolama hizmeti var mı?', a: 'Evet, güvenli ve modern depolama alanlarımızda eşyalarınızı istediğiniz süre boyunca saklayabiliriz.' },
        { q: 'Ödeme nasıl yapılır?', a: 'Nakit, kredi kartı veya havale ile ödeme yapabilirsiniz. Ödeme koşulları esnek olarak belirlenir.' },
        { q: 'Taşınma günü ne kadar sürer?', a: 'Ev büyüklüğü ve mesafeye göre değişir. Ortalama 1+1 daire için 4-6 saat sürer.' },
        { q: 'Hafta sonu veya tatil günlerinde çalışıyor musunuz?', a: 'Evet, hafta sonu ve resmi tatil günlerinde de hizmet veriyoruz. 7/24 ulaşabilirsiniz.' },
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
