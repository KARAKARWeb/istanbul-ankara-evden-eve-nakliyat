import { MapPin, Clock, DollarSign } from 'lucide-react';

interface RouteInfoSectionProps {
  distance: number;
  duration: number;
  priceMin: number;
  sourceCity: string;
  targetCity: string;
  regionTitle: string;
  siteName?: string;
}

export function RouteInfoSection({
  distance,
  duration,
  priceMin,
  sourceCity,
  targetCity,
  regionTitle,
  siteName = 'Evden Eve Nakliyat',
}: RouteInfoSectionProps) {
  return (
    <>
      {/* Offer Schema - SEO için */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": regionTitle,
              "description": `${sourceCity} - ${targetCity} evden eve nakliyat hizmeti`,
              "provider": {
                "@type": "Organization",
                "name": siteName
              }
            },
            "price": priceMin,
            "priceCurrency": "TRY",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString(),
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": priceMin,
              "priceCurrency": "TRY",
              "valueAddedTaxIncluded": true
            },
            "areaServed": {
              "@type": "Place",
              "name": `${sourceCity} - ${targetCity}`
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Mesafe",
                "value": `${distance} km`
              },
              {
                "@type": "PropertyValue",
                "name": "Tahmini Süre",
                "value": `${duration} saat`
              }
            ]
          })
        }}
      />

      <div id="rota-bilgileri" className="bg-background p-6 rounded-xl border border-border mb-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-semibold text-accent mb-1">
              {distance} km
            </div>
            <div className="text-sm text-text-secondary">Mesafe</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-accent mb-1">
              {duration} saat
            </div>
            <div className="text-sm text-text-secondary">Tahmini Süre</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-accent mb-1">
              {priceMin}₺+
            </div>
            <div className="text-sm text-text-secondary">Başlangıç Fiyatı</div>
          </div>
        </div>
      </div>
    </>
  );
}
