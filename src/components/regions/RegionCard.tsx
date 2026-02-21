import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

interface RegionCardProps {
  id: string;
  title: string;
  sourceCity: string;
  targetCity: string;
  distance: number;
  priceMin: number;
  rating?: number;
  reviewCount?: number;
}

export function RegionCard({
  id,
  title,
  sourceCity,
  targetCity,
  distance,
  priceMin,
  rating = 4.7,
  reviewCount = 0,
}: RegionCardProps) {
  return (
    <Link
      href={`/${id}`}
      className="block bg-background p-6 rounded-xl border border-border hover:border-accent transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text-primary mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin className="w-4 h-4" />
            <span>{distance} km</span>
          </div>
        </div>
        {reviewCount > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-medium text-text-primary">{rating}</span>
            <span className="text-text-secondary">({reviewCount})</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Başlangıç fiyatı</span>
        <span className="text-lg font-semibold text-accent">{priceMin}₺+</span>
      </div>
    </Link>
  );
}
