'use client';

interface WhyUsSectionProps {
  whyUsData?: any;
}

export function WhyUsSection({ whyUsData: propsData }: WhyUsSectionProps = {}) {
  const whyUsData = propsData || {
    title: 'Neden Bizi Tercih Etmelisiniz?',
    description: 'Yılların deneyimi ve müşteri memnuniyeti odaklı hizmet anlayışımız',
    features: [
      { title: '10+ Yıllık Deneyim', description: 'Sektörde 10 yılı aşkın tecrübemiz ile güvenilir hizmet' },
      { title: 'Profesyonel Ekip', description: 'Eğitimli ve deneyimli personelimiz ile kaliteli hizmet' },
      { title: 'Sigortalı Taşıma', description: 'Tüm eşyalarınız sigorta kapsamında güvende' },
      { title: '7/24 Müşteri Desteği', description: 'Her zaman ulaşabileceğiniz destek ekibimiz' },
      { title: 'Uygun Fiyat Garantisi', description: 'Rekabetçi fiyatlarla kaliteli hizmet sunuyoruz' },
      { title: 'Modern Araç Filosu', description: 'Yeni model araçlarımız ile güvenli taşımacılık' },
    ],
    footer: 'Neden Bizi Tercih Etmelisiniz? 10 yılı aşkın sektör tecrübemiz, profesyonel ekibimiz ve modern araç filomuz ile evden eve nakliyat hizmetinde güvenilir çözüm ortağınızız. Tüm eşyalarınız sigorta kapsamında taşınır ve 7/24 müşteri desteğimiz ile her zaman yanınızdayız. Rekabetçi fiyatlarımız ve kaliteli hizmet anlayışımız ile taşınma sürecinizi kolaylaştırıyoruz.'
  };

  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {whyUsData.title}
          </h2>
          <div 
            className="text-text-secondary max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: whyUsData.description }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsData.features?.map((item: any, index: number) => (
            <div key={index} className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
              <div 
                className="text-sm text-text-secondary"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          ))}
        </div>

        {/* Info Text */}
        {whyUsData.footer && (
          <div className="mt-8 bg-surface p-6 rounded-xl border border-border">
            <div 
              className="text-text-secondary leading-relaxed text-center"
              dangerouslySetInnerHTML={{ __html: whyUsData.footer }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
