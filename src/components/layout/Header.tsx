'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  siteSettings?: any;
  contactData?: any;
}

export function Header({ siteSettings, contactData }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mobilde: Scroll aşağı: Göster, Scroll yukarı: Gizle
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }
      
      // Sayfa en üstteyse her zaman göster
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Hizmet Bölgeleri', href: '/bolgeler' },
    { label: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-background border-b border-border transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'md:translate-y-0 -translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo-koyu.svg" alt={siteSettings?.siteName || 'Evden Eve Nakliyat'} className="h-11 w-auto" width="120" height="44" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          {contactData && (
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>{contactData.phone.replace('+90 ', '0').replace(/\s/g, ' ')}</span>
              </a>
              <a
                href={`https://wa.me/${(contactData.whatsappNumber || contactData.phone).replace(/[^0-9]/g, '')}?text=Merhaba`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className="md:hidden..."
>
  {mobileMenuOpen ? <X /> : <Menu />}
</button>

          
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {contactData && (
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${contactData.phone}`}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm justify-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Ara</span>
                  </a>
                  <a
                    href={`https://wa.me/${(contactData.whatsappNumber || contactData.phone).replace(/[^0-9]/g, '')}?text=Merhaba`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
