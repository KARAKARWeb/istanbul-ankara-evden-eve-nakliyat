'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface MobileFloatingButtonsProps {
  contactData?: any;
}

export function MobileFloatingButtons({ contactData }: MobileFloatingButtonsProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scroll aşağı: Göster, Scroll yukarı: Gizle
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!contactData) return null;

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-background border-t border-border shadow-lg">
        <div className="flex gap-3 p-4">
          <a
            href={`tel:${contactData.phone}`}
            className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Ara</span>
          </a>
          <a
            href={`https://wa.me/${(contactData.whatsappNumber || contactData.phone).replace(/[^0-9]/g, '')}?text=Merhaba`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-lg transition-colors font-medium text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
