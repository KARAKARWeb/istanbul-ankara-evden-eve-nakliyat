'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TOCProps {
  items: TOCItem[];
}

export function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const createUrlSlug = (title: string) => {
    return title
      .replace(/\s+/g, '-')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'I')
      .replace(/ğ/g, 'g')
      .replace(/Ğ/g, 'G')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'U')
      .replace(/ş/g, 's')
      .replace(/Ş/g, 'S')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string, title: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // URL'ye okunabilir #anchor ekle (SEO için)
      const urlSlug = createUrlSlug(title);
      window.history.pushState(null, '', `#${urlSlug}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl border border-border">
      <h2 className="font-semibold text-text-primary mb-4 text-center">İçindekiler</h2>
      <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" aria-label="İçindekiler navigasyonu">
        {items.map((item, index) => {
          const urlSlug = createUrlSlug(item.title);
          return (
            <a
              key={item.id}
              href={`#${urlSlug}`}
              onClick={(e) => scrollToSection(e, item.id, item.title)}
              className={`text-sm px-4 py-2 rounded-lg border transition-all text-center ${
                activeId === item.id
                  ? 'bg-accent text-white border-accent font-medium'
                  : 'bg-surface text-text-secondary border-border hover:border-accent hover:text-text-primary'
              }`}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
