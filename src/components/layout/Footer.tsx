'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface Layer1Link {
  id: string;
  title: string;
  url: string;
  rel: string;
  target?: string;
  order: number;
}

interface Layer3Link {
  id: string;
  title: string;
  url: string;
  rel: string;
  target?: string;
  order: number;
}

interface FooterProps {
  siteSettings?: any;
  contactData?: any;
  footerData?: any;
  regionsData?: any[];
}

export function Footer({ siteSettings, contactData, footerData: propsFooterData, regionsData: propsRegions }: FooterProps = {}) {
  const footerData = propsFooterData;
  const regions = propsRegions || [];
  const [visibleRegions, setVisibleRegions] = useState(6);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const layer1Links = footerData?.layer1?.links || [];
  const layer2AboutText = footerData?.layer2?.aboutText || '';
  const layer3Links = footerData?.layer3?.links || [];
  const [showTooltip, setShowTooltip] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
        setClickCount(0);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  const services = [
    { title: 'Evden Eve Nakliyat', href: '/#hizmetler' },
    { title: 'Sözleşmeli Nakliyat', href: '/#hizmetler' },
    { title: 'Sigortalı Nakliyat', href: '/#hizmetler' },
    { title: 'Asansörlü Nakliyat', href: '/#hizmetler' },
    { title: 'Ofis Taşımacılığı', href: '/#hizmetler' },
    { title: 'Eşya Depolama', href: '/#hizmetler' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Katman 1 - Linkler */}
      {layer1Links.length > 0 && (
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center gap-6">
              {layer1Links.sort((a: Layer1Link, b: Layer1Link) => a.order - b.order).map((link: Layer1Link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  rel={link.rel || undefined}
                  target={link.target || undefined}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Katman 2 - İçerik (4 Sütun) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8">
          {/* 1. Logo + Hakkımızda */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/logo-koyu.svg" 
                alt={siteSettings?.siteName || 'Evden Eve Nakliyat'}
                className="h-11 w-auto"
                width="120"
                height="44"
              />
              {siteSettings?.siteName && (
                <h3 className="text-lg font-semibold text-text-primary mt-3">
                  {siteSettings.siteName}
                </h3>
              )}
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {layer2AboutText}
            </p>
          </div>

          {/* 2 & 3. Hizmetlerimiz + Hizmet Bölgeleri (Mobilde yan yana) */}
          <div className="grid grid-cols-2 lg:contents gap-8">
            {/* 2. Hizmetlerimiz */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Hizmetlerimiz</h3>
              <ul className="space-y-2">
                {services.map((service, i) => (
                  <li key={i}>
                    <a href={service.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Hizmet Bölgeleri */}
            <div>
            <h3 className="font-semibold text-text-primary mb-4">Hizmet Bölgeleri</h3>
            <ul className="space-y-2">
              {regions.map((region) => (
                <li key={region.id}>
                  <Link href={`/${region.slug}`} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {region.sourceCity} {region.targetCity}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/bolgeler" className="text-sm text-accent hover:text-accent-hover font-medium transition-colors">
                  Tümünü Gör →
                </Link>
              </li>
            </ul>
            </div>
          </div>

          {/* 4. İletişim */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-text-primary mb-4">İletişim Bilgileri</h3>
            <ul className="space-y-3">
              {contactData?.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <a href={`tel:${contactData.phone}`} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {contactData.phone}
                  </a>
                </li>
              )}
              {contactData?.whatsappNumber && (
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <a href={`https://wa.me/${contactData.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent transition-colors">
                    WhatsApp Hattı
                  </a>
                </li>
              )}
              {contactData?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">
                    {contactData.address}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Katman 3 - Linkler */}
      {layer3Links.length > 0 && (
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap justify-center gap-6">
              {layer3Links.sort((a: Layer3Link, b: Layer3Link) => a.order - b.order).map((link: Layer3Link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  rel={link.rel || undefined}
                  target={link.target || undefined}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Katman 4 - Copyright/Developer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} {siteSettings?.siteName || 'Evden Eve Nakliyat'}. Tüm hakları saklıdır.
            </p>
            <div ref={tooltipRef} className="relative">
              <a 
                href="https://karakar.web.tr"
                target="_blank"
                title="Web Tasarım Ajansı"
                onClick={(e) => {
                  if (clickCount === 0) {
                    e.preventDefault();
                    setShowTooltip(true);
                    setClickCount(1);
                  }
                }}
                className="hover:opacity-80 transition-opacity cursor-pointer block"
              >
                <img 
                  src="https://karakar.web.tr/KARAKAR-Web-Logo-1.webp" 
                  alt="Web Tasarım Ajansı" 
                  width={200}
                  height={24}
                  loading="lazy"
                  className="h-auto w-auto max-h-6"
                />
              </a>
              
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2">
                  <div className="bg-white rounded-md shadow-xl border border-border p-4 text-center w-64">
                    <img 
                      src="https://karakar.web.tr/KARAKAR-Web-Logo-1.webp" 
                      alt="KARAKAR Web" 
                      className="h-6 w-auto mx-auto mb-2"
                    />
                    <p className="text-xs font-medium text-text-secondary mb-2">
                      Web Tasarım ve Yazılım Ajansı
                    </p>
                    <p className="text-[10px] leading-relaxed text-text-muted mb-3">
                      Tarafından; Kozcuoğlu İçin Özel Olarak Geliştirildi ve Devam Ediyor...
                    </p>
                    <a
                      href="https://karakar.web.tr"
                      target="_blank"
                      className="inline-block bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                      onClick={() => {
                        setShowTooltip(false);
                        setClickCount(0);
                      }}
                    >
                      İletişime Geç
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
