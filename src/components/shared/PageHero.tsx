import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-[#F3F3F3] border-b border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-lg text-text-secondary max-w-3xl mb-6">
            {description}
          </p>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4" />
              )}
              {item.href ? (
                <Link 
                  href={item.href}
                  className="hover:text-text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-text-primary font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
