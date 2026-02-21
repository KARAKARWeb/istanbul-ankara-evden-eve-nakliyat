import { RegionCard } from '@/components/regions/RegionCard';
import fs from 'fs/promises';
import path from 'path';

interface Region {
  id: string;
  title: string;
  sourceCity: string;
  targetCity: string;
  distance: number;
  duration: number;
  priceMin: number;
  priceMax: number;
}

interface Rating {
  aggregateRating: {
    ratingValue: number;
    reviewCount: number;
  };
}

async function getRegions() {
  try {
    const regionsDir = path.join(process.cwd(), 'data/regions');
    const files = await fs.readdir(regionsDir);
    const regions = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(regionsDir, file);
          const data = await fs.readFile(filePath, 'utf-8');
          return JSON.parse(data);
        })
    );
    return regions;
  } catch (error) {
    return [];
  }
}

async function getRegionRating(regionId: string) {
  try {
    const filePath = path.join(process.cwd(), 'data/ratings', `${regionId}-rating.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

async function getRegionsShowcaseData() {
  try {
    const filePath = path.join(process.cwd(), 'data/content/regions-showcase.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {
      title: 'Hizmet Bölgelerimiz',
      description: 'Türkiye\'nin her yerine güvenli nakliyat hizmeti'
    };
  }
}

export async function RegionsShowcase() {
  const regions = await getRegions();
  const showcaseData = await getRegionsShowcaseData();
  
  const regionsWithRatings = await Promise.all(
    regions.slice(0, 9).map(async (region) => {
      const rating = await getRegionRating(region.id);
      return { ...region, rating };
    })
  );

  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {showcaseData.title}
          </h2>
          <div 
            className="text-text-secondary max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: showcaseData.description }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionsWithRatings.map((region) => (
            <RegionCard
              key={region.id}
              id={region.id}
              title={region.title}
              sourceCity={region.sourceCity}
              targetCity={region.targetCity}
              distance={region.distance}
              priceMin={region.priceMin}
              rating={region.rating}
              reviewCount={region.reviewCount}
            />
          ))}
        </div>

        {/* Tümünü Görüntüle Butonu */}
        <div className="mt-12 text-center">
          <a
            href="/bolgeler"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Tümünü Görüntüle
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
