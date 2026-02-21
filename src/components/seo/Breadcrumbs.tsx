import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbSchema } from './BreadcrumbSchema';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbSchema items={[{ label: 'Ana Sayfa', href: '/' }, ...items]} />
      <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
        <Link href="/" className="hover:text-text-primary transition-colors">
          Ana Sayfa
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            {item.href ? (
              <Link href={item.href} className="hover:text-text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
