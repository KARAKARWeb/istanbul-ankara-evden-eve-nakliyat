'use client';

import { useState, useEffect } from 'react';
import { PriceCalculator } from './PriceCalculator';
import { Star } from 'lucide-react';
import { RouteInfo } from '@/lib/data/getRouteInfo';

interface HeroSectionProps {
  routeInfo: RouteInfo;
  siteSettings: any;
  contactData?: any;
  heroSettings?: any;
  reviewsData?: any;
}

export function HeroSection({ routeInfo, siteSettings, contactData, heroSettings, reviewsData }: HeroSectionProps) {
  const rating = reviewsData?.aggregateRating?.ratingValue || 4.8;
  const distance = routeInfo.distance || 0;
  return (
    <section className="relative bg-background border-b border-border overflow-hidden">
      {/* Background Image */}
      {heroSettings?.backgroundImage && (
        <>
          <link rel="preload" as="image" href={heroSettings.backgroundImage} fetchPriority="high" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroSettings.backgroundImage})`,
              backgroundPosition: 'center center',
              opacity: heroSettings.backgroundOpacity || 0.1,
              willChange: 'opacity',
            }}
          />
          {heroSettings.backgroundOverlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />
          )}
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[1.9125rem] pb-[1.9125rem] md:pt-20 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="rounded-xl p-6 mb-8" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              <h1 className="text-xl md:text-2xl font-semibold text-black mb-4">
                {heroSettings?.title || siteSettings?.siteName || 'Evden Eve Nakliyat'}
              </h1>
              <div 
                className="text-lg text-black"
                dangerouslySetInnerHTML={{ 
                  __html: heroSettings?.description || 'Profesyonel, güvenilir ve uygun fiyatlı nakliyat hizmeti. 10 yılı aşkın tecrübemiz ile eşyalarınızı güvenle taşıyoruz.' 
                }}
              />
            </div>
            
            {/* Stats */}
            <div className="mb-8 w-full">
              <div className="flex gap-0 rounded-lg overflow-hidden shadow-lg" style={{
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
              }}>
                <div className="flex-1 p-4 text-center" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.5)' }}>
                  <div className="text-2xl font-semibold text-accent mb-1">{heroSettings?.stats?.customers || '10,000+'}</div>
                  <div className="text-xs text-black">{heroSettings?.stats?.customersLabel || 'Mutlu Müşteri'}</div>
                </div>
                <div className="flex-1 p-4 text-center" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.5)' }}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-2xl font-semibold text-accent">
                      {typeof rating === 'number' ? rating.toFixed(1) : '4.8'}
                    </span>
                    <Star className="w-5 h-5 fill-accent text-accent" />
                  </div>
                  <div className="text-xs text-black">Müşteri Puanı</div>
                </div>
                <div className="flex-1 p-4 text-center">
                  <div className="text-2xl font-semibold text-accent mb-1">{distance} km</div>
                  <div className="text-xs text-black">Mesafe</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <a
                href="#fiyat-teklifi"
                className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-medium transition-colors text-center"
              >
                Teklif Al
              </a>
              {contactData && (
                <a
                  href={`tel:${contactData.phone}`}
                  className="bg-surface border border-border hover:border-accent text-text-primary px-8 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Hemen Ara
                </a>
              )}
            </div>
          </div>

          {/* Right: Price Calculator */}
          <div>
            <PriceCalculator contactData={contactData} heroSettings={heroSettings} routeInfo={routeInfo} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
