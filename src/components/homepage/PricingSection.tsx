'use client';

import { Check, Info } from 'lucide-react';

import { RouteInfo } from '@/lib/data/getRouteInfo';

interface PricingSectionProps {
  regionTitle?: string;
  routeInfo: RouteInfo;
  pricingData?: any;
}

export function PricingSection({ regionTitle, routeInfo, pricingData: propsData }: PricingSectionProps) {
  const pricingData = propsData || {
    title: 'Fiyatlandırma',
    description: 'Şeffaf ve rekabetçi fiyatlarımız',
    packages: [
      { name: '1+1 Ev Taşıma Fiyatı', priceRange: '15.000 – 20.000 TL', elevatorFee: '+ 2.000 TL' },
      { name: '2+1 Ev Taşıma Fiyatı', priceRange: '20.000 – 25.000 TL', elevatorFee: '+ 2.500 TL' },
      { name: '3+1 Ev Taşıma Fiyatı', priceRange: '25.000 – 30.000 TL', elevatorFee: '+ 3.000 TL' },
      { name: '4+1 Ev Taşıma Fiyatı', priceRange: '30.000 – 35.000 TL', elevatorFee: '+ 3.500 TL' },
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
      `Fiyatlar ${routeInfo.fromCity} - ${routeInfo.toCity} arası için geçerlidir`,
      `Mesafe: ${routeInfo.distance} km`,
      'Tüm fiyatlar KDV dahildir',
      'Sigortalı taşıma ücretsizdir',
      'Kesin fiyat için ücretsiz keşif hizmeti sunuyoruz'
    ]
  };

  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {regionTitle ? `${regionTitle} Ev Taşıma Fiyatları` : 'Ev Taşıma Fiyatları'}
          </h2>
        </div>

        <div className="space-y-8">
          {/* Premium Pricing Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-accent/5">
                      <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                        Eşya Miktarı
                      </th>
                      <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                        Evden Eve Nakliyat Ücretleri
                      </th>
                      <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                        Asansör (Vinç) Kurulumu
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {pricingData.packages?.map((pkg: any, index: number) => (
                      <tr
                        key={index}
                        className={`transition-colors hover:bg-surface/50 ${
                          pkg.popular ? 'bg-accent/5 border-l-4 border-l-accent' : ''
                        }`}
                      >
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-text-primary">
                              {pkg.name}
                            </span>
                            {pkg.popular && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                                Popüler
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="text-lg font-semibold text-accent">
                            {pkg.priceRange}
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="text-sm font-medium text-text-secondary">
                            {pkg.elevatorFee}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          {pricingData.additionalServices?.length > 0 && (
            <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Ek Hizmetler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pricingData.additionalServices.map((service: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border hover:border-accent/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-text-secondary">{service.name}</span>
                    <span className="text-sm font-semibold text-accent">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
