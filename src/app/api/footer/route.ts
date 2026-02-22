import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'footer.json');

async function getContactSettings() {
  const filePath = path.join(process.cwd(), 'data', 'settings', 'contact.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// GET - Footer verilerini getir
export async function GET(request: NextRequest) {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // Dosya yoksa varsayılan footer dön
    const contactSettings = await getContactSettings();
    
    return NextResponse.json({
      layer1: {
        title: 'Hızlı Erişim',
        links: [
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda', href: '/hakkimizda' },
          { label: 'Hizmet Bölgeleri', href: '/bolgeler' },
          { label: 'İletişim', href: '/iletisim' },
        ],
      },
      layer2: {
        title: 'Hizmetlerimiz',
        links: [
          { label: 'Evden Eve Nakliyat', href: '/#services' },
          { label: 'Ofis Taşıma', href: '/#services' },
          { label: 'Parça Eşya Taşıma', href: '/#services' },
          { label: 'Şehirler Arası Nakliyat', href: '/#services' },
        ],
      },
      layer3: {
        title: 'İletişim',
        phone: contactSettings.phone,
        email: contactSettings.email,
        address: contactSettings.address.split('/')[1]?.trim() || contactSettings.address || '',
        whatsapp: contactSettings.whatsapp,
      },
      layer4: {
        social: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
        },
        copyright: '© 2026 Evden Eve Nakliyat. Tüm hakları saklıdır.',
        developer: {
          name: 'KARAKAR Web',
          url: 'https://karakar.web.tr',
        },
      },
    });
  }
}

// PUT - Footer verilerini güncelle
export async function PUT(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Footer güncellenemedi' }, { status: 500 });
  }
}
