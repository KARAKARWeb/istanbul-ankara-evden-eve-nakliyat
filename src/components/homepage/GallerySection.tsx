'use client';

import Image from 'next/image';

interface GallerySectionProps {
  galleryData?: any;
}

export function GallerySection({ galleryData: propsData }: GallerySectionProps = {}) {
  const galleryData = propsData || {
    title: 'Galeri',
    description: 'Nakliyat çalışmalarımızdan görüntüler',
    images: [],
    footer: ''
  };

  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {galleryData.title}
          </h2>
          <div 
            className="text-text-secondary"
            dangerouslySetInnerHTML={{ __html: galleryData.description }}
          />
        </div>

        {galleryData.images?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryData.images.map((imageSrc: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <Image
                    src={imageSrc}
                    alt={`${galleryData.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            
            {galleryData.footer && (
              <div className="mt-8 text-center">
                <div 
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: galleryData.footer }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-text-muted">
            Henüz galeri resmi eklenmemiş
          </div>
        )}
      </div>
    </section>
  );
}
