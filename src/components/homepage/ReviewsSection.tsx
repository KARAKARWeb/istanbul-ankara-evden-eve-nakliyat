import { Star } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    { name: 'Ahmet Y.', rating: 5, text: 'Çok profesyonel bir ekip. Eşyalarımız hiç zarar görmeden taşındı. Teşekkürler!' },
    { name: 'Ayşe K.', rating: 5, text: 'Fiyat performans olarak çok iyi. Kesinlikle tavsiye ederim.' },
    { name: 'Mehmet D.', rating: 4, text: 'Güler yüzlü ve işini bilen bir ekip. Memnun kaldık.' },
  ];

  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Müşteri Yorumları
          </h2>
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl font-semibold text-text-primary">4.8/5</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="text-text-secondary mt-2">127 değerlendirme</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-surface p-6 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-medium text-text-primary">{review.name}</div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
