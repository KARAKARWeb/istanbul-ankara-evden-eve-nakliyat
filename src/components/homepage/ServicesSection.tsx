'use client';

interface ServicesSectionProps {
  servicesData?: any;
}

export function ServicesSection({ servicesData: propsData }: ServicesSectionProps = {}) {
  const servicesData = propsData || {
    title: 'Hizmetlerimiz',
    description: 'Profesyonel evden eve nakliyat hizmetleri',
    services: [
      { title: 'Evden Eve Nakliyat', description: 'Modern asansör sistemleri ile güvenli taşıma' },
      { title: 'Sözleşmeli Evden Eve Nakliyat', description: 'Özel paketleme malzemeleri ile koruma' },
      { title: 'Sigortalı Evden Eve Nakliyat', description: 'Tüm eşyalarınız sigorta kapsamında' },
      { title: 'Asansörlü Evden Eve Nakliyat', description: 'Mobilya sökme ve takma işlemleri' },
      { title: 'Ofis Taşımacılığı', description: 'Güvenli depolama alanlarımız' },
      { title: 'Eşya Depolama', description: 'Her zaman ulaşabileceğiniz müşteri hizmetleri' },
    ],
    footer: ''
  };

  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {servicesData.title}
          </h2>
          <div 
            className="text-text-secondary max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: servicesData.description }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services?.map((service: any, index: number) => (
            <div key={index} className="bg-surface p-6 rounded-xl border border-border hover:border-accent transition-colors">
              <h3 className="font-semibold text-text-primary mb-2">{service.title}</h3>
              <div 
                className="text-sm text-text-secondary"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          ))}
        </div>

        {/* Info Text */}
        {servicesData.footer && (
          <div className="mt-8 bg-background p-6 rounded-xl border border-border">
            <div 
              className="text-text-secondary leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: servicesData.footer }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
