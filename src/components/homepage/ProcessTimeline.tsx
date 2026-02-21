'use client';

import { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  Shield, 
  FileSignature, 
  Building2,
  Package,
  Truck,
  MapPin,
  Home,
  Wrench,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const getSteps = (fromCity: string, toCity: string, distance: number, duration: string | number) => [
  { 
    icon: ClipboardCheck, 
    title: 'Ücretsiz Keşif', 
    desc: `${fromCity} ücretsiz eksper hizmeti`,
    duration: 1000 
  },
  { 
    icon: Calendar, 
    title: 'Tarih Belirleme', 
    desc: 'Size uygun taşınma tarihi',
    duration: 800 
  },
  { 
    icon: Shield, 
    title: 'Sigorta', 
    desc: 'Eşyalarınız tam güvence altında',
    duration: 900 
  },
  { 
    icon: FileSignature, 
    title: 'Sözleşme', 
    desc: 'Şeffaf ve güvenli anlaşma',
    duration: 700 
  },
  { 
    icon: Building2, 
    title: 'Asansör Rezervesi', 
    desc: 'Her iki adres için rezervasyon',
    duration: 600 
  },
  { 
    icon: Package, 
    title: 'Ambalajlama', 
    desc: 'Profesyonel paketleme malzemeleri',
    duration: 1200 
  },
  { 
    icon: Truck, 
    title: 'Yükleme', 
    desc: 'Eşyalar güvenle araca yüklenir',
    duration: 1000 
  },
  { 
    icon: MapPin, 
    title: 'Yolculuk', 
    desc: `${distance} km - ${duration}`,
    duration: 2000 
  },
  { 
    icon: Home, 
    title: 'Varış', 
    desc: `${toCity} yeni evinize ulaşım`,
    duration: 800 
  },
  { 
    icon: Truck, 
    title: 'Taşıma', 
    desc: 'Eşyalar yeni yerine yerleştirilir',
    duration: 1000 
  },
  { 
    icon: Wrench, 
    title: 'Montaj', 
    desc: 'Mobilya kurulumu ve düzenleme',
    duration: 1100 
  },
  { 
    icon: Sparkles, 
    title: 'Temizlik', 
    desc: 'Son kontrol ve temizlik',
    duration: 700 
  },
  { 
    icon: CheckCircle2, 
    title: 'Teslim', 
    desc: 'Keyifle yeni evinizde!',
    duration: 1000 
  },
  { 
    icon: Sparkles, 
    title: 'Mutlu Müşteri', 
    desc: 'Memnuniyetiniz bizim başarımız!',
    duration: 1500 
  },
];

import { RouteInfo } from '@/lib/data/getRouteInfo';

interface ProcessTimelineProps {
  routeInfo: RouteInfo;
  processData?: any;
}

export function ProcessTimeline({ routeInfo, processData: propsData }: ProcessTimelineProps) {
  const processData = propsData || {
    title: 'Nakliyat Sürecimiz',
    description: `${routeInfo.fromCity}'dan ${routeInfo.toCity}'e profesyonel taşınma sürecinin her adımı`
  };
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = getSteps(routeInfo.fromCity, routeInfo.toCity, routeInfo.distance, routeInfo.duration);

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setTimeout(() => setActiveStep(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, steps[activeStep].duration);

    return () => clearTimeout(timer);
  }, [activeStep, isAnimating, steps]);

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {processData.title}
          </h2>
          <div 
            className="text-text-secondary max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: processData.description }}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Steps Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isFuture = index > activeStep;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                  onMouseEnter={() => {
                    setIsAnimating(false);
                    setActiveStep(index);
                  }}
                  onMouseLeave={() => setIsAnimating(true)}
                >
                  {/* Icon Circle */}
                  <div
                    className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                      isActive
                        ? 'bg-accent text-white shadow-lg shadow-accent/50 ring-4 ring-accent/20'
                        : isPast
                        ? 'bg-accent/20 text-accent'
                        : 'bg-background text-text-muted border-2 border-border'
                    }`}
                  >
                    <Icon className={`w-7 h-7 ${isActive ? 'animate-pulse' : ''}`} />
                  </div>

                  {/* Step Info */}
                  <div className="space-y-1">
                    <h3
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive
                          ? 'text-accent'
                          : isPast
                          ? 'text-text-primary'
                          : 'text-text-muted'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs transition-all duration-300 ${
                        isActive
                          ? 'text-text-secondary opacity-100'
                          : 'text-text-muted opacity-0 md:opacity-60'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Active Step Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Step Detail Card */}
        <div className="mt-12 bg-background p-8 rounded-xl border border-border">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              {(() => {
                const Icon = steps[activeStep].icon;
                return (
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                );
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {activeStep + 1}. {steps[activeStep].title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center gap-2">
            <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-text-secondary">
              {activeStep + 1}/{steps.length}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0 || isAnimating}
            className="px-6 py-2 rounded-lg border border-border hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Önceki
          </button>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-6 py-2 rounded-lg font-medium transition-colors bg-accent text-white hover:bg-accent-hover"
          >
            {isAnimating ? '⏸ Durdur' : '▶ Başlat'}
          </button>
          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1 || isAnimating}
            className="px-6 py-2 rounded-lg border border-border hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </div>
  );
}
