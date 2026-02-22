'use client';

import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  regionTitle: string;
  regionSlug: string;
}

interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

interface GlobalReviewsSectionProps {
  siteSettings?: any;
  contactData?: any;
  reviewsData?: any;
}

export function GlobalReviewsSection({ siteSettings, contactData, reviewsData }: GlobalReviewsSectionProps = {}) {
  const reviews = reviewsData?.reviews || [];
  const aggregateRating = reviewsData?.aggregateRating || null;
  const loading = !reviewsData;
  const siteName = siteSettings?.siteName || 'Evden Eve Nakliyat';
  const contact = contactData;

  if (loading) {
    return null;
  }

  // Default rating if no reviews
  const displayRating = aggregateRating || {
    ratingValue: 4.8,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1,
  };

  return (
    <section id="reviews" className="bg-background border-b border-border">
      {/* AggregateRating Schema - SEO için */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteName,
            "image": `${process.env.NEXT_PUBLIC_SITE_URL}/logo-koyu.svg`,
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "telephone": contact?.phone || "+905321384979",
            "priceRange": "₺₺",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": contact?.address?.split('/')[0]?.trim() || "Kaynarca Mah. Bahattin Veled Cad. No:37",
              "addressLocality": contact?.address?.split('/')[1]?.split(',')[0]?.trim() || "Pendik",
              "addressRegion": contact?.address?.split('/')[1]?.split(',')[1]?.trim() || "İstanbul",
              "postalCode": "34890",
              "addressCountry": "TR"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": displayRating.ratingValue,
              "reviewCount": displayRating.reviewCount,
              "bestRating": displayRating.bestRating,
              "worstRating": displayRating.worstRating
            },
            "review": reviews.slice(0, 10).map((review: any) => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.author
              },
              "datePublished": review.date,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": 5,
                "worstRating": 1
              },
              "reviewBody": review.text
            }))
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Müşteri Yorumları
          </h2>
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl font-semibold text-text-primary">
              {displayRating.ratingValue.toFixed(1)}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(displayRating.ratingValue)
                      ? 'fill-accent text-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-text-secondary mt-2">
            {displayRating.reviewCount} değerlendirme
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review: Review, index: number) => (
              <div
                key={review.id}
                className="bg-surface p-6 rounded-xl border border-border"
              >
                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">
                      {review.author}
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                  {review.text}
                </p>

                {/* Region Badge */}
                <div className="text-xs text-accent font-medium">
                  {review.regionTitle}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Info */}
        {reviews.length > 6 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              +{reviews.length - 6} yorum daha
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
