'use client';

interface FAQSectionProps {
  regionFaqs?: Array<{ q: string; a: string }>; // Bölgeye özel FAQ'lar - opsiyonel
  faqData?: any; // Global FAQ'lar - opsiyonel
}

export function FAQSection({ regionFaqs, faqData: propsData }: FAQSectionProps = {}) {
  const faqData = propsData || {
    title: 'Sıkça Sorulan Sorular',
    description: '',
    faqs: []
  };

  // Bölgeye özel FAQ'lar varsa onları kullan, yoksa global FAQ'ları kullan
  const faqs = regionFaqs && regionFaqs.length > 0 ? regionFaqs : (faqData.faqs?.length > 0 ? faqData.faqs : [
    { q: 'Nakliyat ücreti nasıl hesaplanır?', a: 'Nakliyat ücreti ev büyüklüğü, mesafe, asansör durumu ve eşya miktarına göre belirlenir. Ücretsiz keşif hizmeti ile size en uygun fiyatı sunuyoruz.' },
    { q: 'Sigorta kapsamı nedir?', a: 'Tüm eşyalarınız taşıma sırasında sigorta kapsamındadır. Herhangi bir hasar durumunda tazminat ödenir.' },
    { q: 'Ne kadar önceden rezervasyon yapmalıyım?', a: 'En az 3-5 gün önceden rezervasyon yapmanızı öneriyoruz. Yoğun dönemlerde daha erken rezervasyon gerekebilir.' },
    { q: 'Paketleme hizmeti veriyor musunuz?', a: 'Evet, profesyonel paketleme hizmeti sunuyoruz. Özel paketleme malzemeleri ile eşyalarınızı koruyoruz.' },
    { q: 'Mobilya montaj/demontaj yapıyor musunuz?', a: 'Evet, tüm mobilyalarınızın sökme ve takma işlemlerini deneyimli ekibimiz gerçekleştirir.' },
    { q: 'Asansörsüz binalarda nasıl taşıma yapılır?', a: 'Asansörsüz binalarda dış cephe asansörü veya hamal hizmeti ile güvenli taşıma sağlanır.' },
    { q: 'Eşya depolama hizmeti var mı?', a: 'Evet, güvenli ve modern depolama alanlarımızda eşyalarınızı istediğiniz süre boyunca saklayabiliriz.' },
    { q: 'Ödeme nasıl yapılır?', a: 'Nakit, kredi kartı veya havale ile ödeme yapabilirsiniz. Ödeme koşulları esnek olarak belirlenir.' },
    { q: 'Taşınma günü ne kadar sürer?', a: 'Ev büyüklüğü ve mesafeye göre değişir. Ortalama 1+1 daire için 4-6 saat sürer.' },
    { q: 'Hafta sonu veya tatil günlerinde çalışıyor musunuz?', a: 'Evet, hafta sonu ve resmi tatil günlerinde de hizmet veriyoruz. 7/24 ulaşabilirsiniz.' },
  ]);

  return (
    <section className="bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            {faqData.title}
          </h2>
          {faqData.description && (
            <div 
              className="text-text-secondary max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{ __html: faqData.description }}
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sol Sütun */}
          <div className="flex-1 space-y-6">
            {faqs.filter((_: any, index: number) => index % 2 === 0).map((faq: any, index: number) => (
              <details 
                key={index * 2}
                className="bg-background p-6 rounded-xl border border-border hover:border-accent transition-colors"
              >
                <summary className="font-semibold text-text-primary cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down flex-shrink-0 ml-2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* Sağ Sütun */}
          <div className="flex-1 space-y-6">
            {faqs.filter((_: any, index: number) => index % 2 === 1).map((faq: any, index: number) => (
              <details 
                key={index * 2 + 1}
                className="bg-background p-6 rounded-xl border border-border hover:border-accent transition-colors"
              >
                <summary className="font-semibold text-text-primary cursor-pointer flex items-center justify-between">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down flex-shrink-0 ml-2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </summary>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
