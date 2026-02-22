'use client';

import { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';
import { ProcessTimeline } from './ProcessTimeline';
import { RouteInfo } from '@/lib/data/getRouteInfo';

interface RouteInfoSectionProps {
  routeInfo: RouteInfo;
}

export function RouteInfoSection({ routeInfo }: RouteInfoSectionProps) {
  const [carPosition, setCarPosition] = useState(0);
  const [remainingKm, setRemainingKm] = useState(routeInfo.distance || 0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const duration = 5000;
      const startTime = Date.now();
      const totalKm = routeInfo.distance;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setCarPosition(progress * 100);
        setRemainingKm(Math.round(totalKm * (1 - progress)));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            setIsAnimating(false);
            setCarPosition(0);
            setRemainingKm(routeInfo.distance);
          }, 1000);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isAnimating]);

  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };
  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              {routeInfo.title || `${routeInfo.fromCity} ${routeInfo.toCity} Rota Bilgileri`}
            </h2>
            <p className="text-text-secondary">
              {routeInfo.description || 'Güvenli ve hızlı taşımacılık için en iyi rotayı kullanıyoruz'}
            </p>
          </div>

          {/* Harita Görselleştirme */}
          <div className="mb-12 bg-surface p-6 rounded-xl border border-border">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                title={`${routeInfo.fromCity} ${routeInfo.toCity} arası rota haritası`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&origin=${routeInfo.originCoords || '40.87964279652424,29.255537227148615'}&destination=${routeInfo.destinationCoords || '38.42297162766549,27.14327148023357'}&mode=driving`}
              />
            </div>
            
            {/* Şehir Bilgileri */}
            <div className="flex justify-between items-center mt-6 px-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-text-primary">{routeInfo.fromCity}</div>
                <div className="text-xs text-text-secondary">Başlangıç</div>
              </div>
              
              <div className="flex-1 mx-8">
                <div className="relative">
                  <div className="h-1 bg-border rounded-full">
                    <div className="h-full bg-accent rounded-full w-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border-2 border-accent">
                    <div className="text-sm font-semibold text-accent">{routeInfo.distance} km</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="text-lg font-semibold text-text-primary">{routeInfo.toCity}</div>
                <div className="text-xs text-text-secondary">Varış</div>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-surface p-6 rounded-xl border border-border">
              <div className="text-3xl font-semibold text-accent mb-2">{routeInfo.distance} km</div>
              <div className="text-sm text-text-secondary">Mesafe</div>
            </div>
            <div className="text-center bg-surface p-6 rounded-xl border border-border">
              <div className="text-3xl font-semibold text-accent mb-2">{routeInfo.duration}</div>
              <div className="text-sm text-text-secondary">Tahmini Süre</div>
            </div>
            <div className="text-center bg-surface p-6 rounded-xl border border-border">
              <div className="text-3xl font-semibold text-accent mb-2">{(routeInfo.basePrice || 1500).toLocaleString('tr-TR')}₺+</div>
              <div className="text-sm text-text-secondary">Başlangıç Fiyatı</div>
            </div>
          </div>
        </div>
      </section>
      
      <ProcessTimeline routeInfo={routeInfo} />
    </>
  );
}
