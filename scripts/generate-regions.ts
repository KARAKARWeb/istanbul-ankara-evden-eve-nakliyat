import fs from 'fs/promises';
import path from 'path';
import { generateRegionRating } from '../src/lib/ratings/auto-generate';

const izmirDistricts = [
  { slug: 'istanbul-aliaga', name: 'Aliağa', distance: 520, duration: 6.5, priceMin: 2500 },
  { slug: 'istanbul-balcova', name: 'Balçova', distance: 468, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-bayindir', name: 'Bayındır', distance: 510, duration: 6.2, priceMin: 2400 },
  { slug: 'istanbul-bayrakli', name: 'Bayraklı', distance: 465, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-bergama', name: 'Bergama', distance: 550, duration: 6.8, priceMin: 2600 },
  { slug: 'istanbul-beydag', name: 'Beydağ', distance: 530, duration: 6.5, priceMin: 2500 },
  { slug: 'istanbul-bornova', name: 'Bornova', distance: 468, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-buca', name: 'Buca', distance: 475, duration: 5.8, priceMin: 2100 },
  { slug: 'istanbul-cesme', name: 'Çeşme', distance: 550, duration: 6.5, priceMin: 2600 },
  { slug: 'istanbul-cigli', name: 'Çiğli', distance: 470, duration: 5.6, priceMin: 2000 },
  { slug: 'istanbul-dikili', name: 'Dikili', distance: 580, duration: 7.0, priceMin: 2800 },
  { slug: 'istanbul-foca', name: 'Foça', distance: 540, duration: 6.5, priceMin: 2600 },
  { slug: 'istanbul-gaziemir', name: 'Gaziemir', distance: 472, duration: 5.6, priceMin: 2100 },
  { slug: 'istanbul-guzelbahce', name: 'Güzelbahçe', distance: 485, duration: 5.8, priceMin: 2200 },
  { slug: 'istanbul-karabaglar', name: 'Karabağlar', distance: 468, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-karaburun', name: 'Karaburun', distance: 600, duration: 7.2, priceMin: 3000 },
  { slug: 'istanbul-karsiyaka', name: 'Karşıyaka', distance: 465, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-kemalpasa', name: 'Kemalpaşa', distance: 490, duration: 6.0, priceMin: 2300 },
  { slug: 'istanbul-kinik', name: 'Kınık', distance: 560, duration: 6.8, priceMin: 2700 },
  { slug: 'istanbul-kiraz', name: 'Kiraz', distance: 520, duration: 6.3, priceMin: 2500 },
  { slug: 'istanbul-konak', name: 'Konak', distance: 468, duration: 5.5, priceMin: 2000 },
  { slug: 'istanbul-menderes', name: 'Menderes', distance: 490, duration: 6.0, priceMin: 2300 },
  { slug: 'istanbul-menemen', name: 'Menemen', distance: 485, duration: 5.8, priceMin: 2200 },
  { slug: 'istanbul-narlidere', name: 'Narlıdere', distance: 475, duration: 5.7, priceMin: 2100 },
  { slug: 'istanbul-odemis', name: 'Ödemiş', distance: 540, duration: 6.5, priceMin: 2600 },
  { slug: 'istanbul-seferihisar', name: 'Seferihisar', distance: 510, duration: 6.2, priceMin: 2400 },
  { slug: 'istanbul-selcuk', name: 'Selçuk', distance: 520, duration: 6.3, priceMin: 2500 },
  { slug: 'istanbul-tire', name: 'Tire', distance: 530, duration: 6.4, priceMin: 2500 },
  { slug: 'istanbul-torbali', name: 'Torbalı', distance: 495, duration: 6.0, priceMin: 2300 },
  { slug: 'istanbul-urla', name: 'Urla', distance: 500, duration: 6.1, priceMin: 2400 },
];

async function generateRegionFiles() {
  const regionsDir = path.join(process.cwd(), 'data/regions');
  const ratingsDir = path.join(process.cwd(), 'data/ratings');

  // Create directories
  await fs.mkdir(regionsDir, { recursive: true });
  await fs.mkdir(ratingsDir, { recursive: true });

  console.log('🚀 Bölge dosyaları oluşturuluyor...\n');

  for (const district of izmirDistricts) {
    // Region data
    const regionData = {
      id: district.slug,
      slug: district.slug,
      title: `İstanbul ${district.name} Evden Eve Nakliyat`,
      sourceCity: 'İstanbul',
      targetCity: district.name,
      distance: district.distance,
      duration: district.duration,
      priceMin: district.priceMin,
      active: true,
      order: izmirDistricts.indexOf(district) + 1,
      content: `
        <h2>İstanbul ${district.name} Evden Eve Nakliyat Hizmeti</h2>
        <p>İstanbul'dan ${district.name}'ya profesyonel evden eve nakliyat hizmeti sunuyoruz. ${district.distance} km mesafeyi yaklaşık ${district.duration} saatte kat ederek, eşyalarınızı güvenle yeni adresinize taşıyoruz.</p>
        
        <h3>Hizmet Özelliklerimiz</h3>
        <ul>
          <li>Profesyonel paketleme ve ambalajlama</li>
          <li>Sigortalı taşımacılık garantisi</li>
          <li>Montaj ve demontaj hizmeti</li>
          <li>Asansör rezervasyonu</li>
          <li>Eşya depolama imkanı</li>
        </ul>

        <h3>Neden Bizi Tercih Etmelisiniz?</h3>
        <p>10 yılı aşkın tecrübemiz, modern araç filomuz ve profesyonel ekibimiz ile İstanbul ${district.name} arası nakliyat hizmetinde sektörün öncüsüyüz. Tüm eşyalarınız sigorta kapsamında taşınır ve herhangi bir hasar durumunda tazmin edilir.</p>
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save region file
    const regionPath = path.join(regionsDir, `${district.slug}.json`);
    await fs.writeFile(regionPath, JSON.stringify(regionData, null, 2));
    console.log(`✅ ${district.slug}.json oluşturuldu`);

    // Generate rating
    const rating = generateRegionRating({
      regionId: district.slug,
      regionName: `İstanbul ${district.name}`,
      sourceCity: 'İstanbul',
      targetCity: district.name,
    });

    // Save rating file
    const ratingPath = path.join(ratingsDir, `${district.slug}-rating.json`);
    await fs.writeFile(ratingPath, JSON.stringify(rating, null, 2));
    console.log(`⭐ ${district.slug}-rating.json oluşturuldu (${rating.aggregateRating.ratingValue} yıldız, ${rating.reviews.length} yorum)\n`);
  }

  console.log(`\n🎉 Toplam ${izmirDistricts.length} bölge dosyası oluşturuldu!`);
  console.log(`📊 Toplam ${izmirDistricts.length} rating dosyası oluşturuldu!`);
}

generateRegionFiles().catch(console.error);
