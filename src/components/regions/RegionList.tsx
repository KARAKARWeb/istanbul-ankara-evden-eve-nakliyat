import { RegionCard } from './RegionCard';

interface Region {
  id: string;
  title: string;
  sourceCity: string;
  targetCity: string;
  distance: number;
  priceMin: number;
  active: boolean;
}

interface RegionListProps {
  regions: Region[];
}

export function RegionList({ regions }: RegionListProps) {
  const activeRegions = regions.filter(r => r.active);

  if (activeRegions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">Henüz bölge eklenmemiş.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeRegions.map((region) => (
        <RegionCard
          key={region.id}
          id={region.id}
          title={region.title}
          sourceCity={region.sourceCity}
          targetCity={region.targetCity}
          distance={region.distance}
          priceMin={region.priceMin}
        />
      ))}
    </div>
  );
}
