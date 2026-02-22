'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  MapPin,
  Star,
  Settings,
  Palette,
  Mail,
  Image,
  ChevronRight,
  LogOut,
  Code,
  LayoutDashboard,
  Search,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/karakar',
    icon: LayoutDashboard,
  },
  {
    title: 'İçerik Yönetimi',
    href: '/karakar/content',
    icon: FileText,
  },
  {
    title: 'Bölge Yönetimi',
    href: '/karakar/regions',
    icon: MapPin,
  },
  {
    title: 'Medya Yönetimi',
    href: '/karakar/media',
    icon: FileText,
  },
  {
    title: 'Yorumlar',
    href: '/karakar/reviews',
    icon: Star,
    subItems: [
      { title: 'Bölge Yorumları', href: '/karakar/reviews' },
      { title: 'Ana Sayfa Yorumları', href: '/karakar/reviews/global' },
    ],
  },
  {
    title: 'SEO Yönetimi',
    href: '/karakar/seo',
    icon: Search,
    subItems: [
      { title: 'Genel SEO', href: '/karakar/seo' },
      { title: 'Sayfa SEO', href: '/karakar/seo/pages' },
      { title: 'Gelişmiş SEO', href: '/karakar/seo-advanced' },
    ],
  },
  {
    title: 'Footer Yönetimi',
    href: '/karakar/footer',
    icon: LayoutDashboard,
    subItems: [
      { title: 'Footer 1', href: '/karakar/footer/katman-1' },
      { title: 'Footer 2', href: '/karakar/footer/katman-2' },
      { title: 'Footer 3', href: '/karakar/footer/katman-3' },
    ],
  },
  {
    title: 'Analytics & Kodlar',
    href: '/karakar/analytics',
    icon: Code,
  },
  {
    title: 'Site Ayarları',
    href: '/karakar/settings',
    icon: Settings,
    subItems: [
      { title: 'Email Ayarları', href: '/karakar/email' },
      { title: 'Tema Ayarları', href: '/karakar/theme' },
    ],
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/dashboard/login';
  };

  return (
    <nav className="w-64 bg-background border-r border-border min-h-screen p-6 sticky top-0 h-screen overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary">Dashboard</h2>
        <p className="text-sm text-text-secondary mt-1">Yönetim Paneli</p>
      </div>

      {/* Site Görüntüle Button */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-2 mb-6 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" x2="21" y1="14" y2="3"></line>
        </svg>
        Site Görüntüle
      </a>

      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenus.includes(item.title);

          return (
            <div key={item.href}>
              {hasSubItems ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-text-secondary hover:bg-surface hover:text-text-primary">
                    <Icon className="w-5 h-5" />
                    <Link href={item.href} className="flex-1 text-left">
                      {item.title}
                    </Link>
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className="p-1 hover:bg-surface rounded transition-colors"
                    >
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm transition-colors',
                              isSubActive
                                ? 'bg-accent text-white font-medium'
                                : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-error hover:bg-error/10 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
}
