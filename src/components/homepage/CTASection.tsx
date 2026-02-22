'use client';

interface CTASectionProps {
  contactData?: any;
}

export function CTASection({ contactData: propsData }: CTASectionProps = {}) {
  const contactData = propsData;

  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-text-primary">
            Hemen Teklif Alın!
          </h2>
          <p className="text-lg mb-8 text-text-secondary">
            Ücretsiz fiyat teklifi için formu doldurun veya bizi arayın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#fiyat-teklifi"
              className="bg-accent text-white hover:bg-accent-hover px-8 py-4 rounded-lg font-medium transition-colors"
            >
              Teklif Formu
            </a>
            {contactData && (
              <a
                href={`tel:${contactData.phone}`}
                className="bg-background border-2 border-border text-text-primary hover:border-accent hover:text-accent px-8 py-4 rounded-lg font-medium transition-colors"
              >
                Hemen Ara: {contactData.phone.replace('+90 ', '0').replace(/\s/g, ' ')}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
