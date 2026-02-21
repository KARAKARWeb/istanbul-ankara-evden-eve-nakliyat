'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

interface ReviewsSectionProps {
  regionId: string;
  regionTitle: string;
}

export function ReviewsSection({ regionId, regionTitle }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [aggregateRating, setAggregateRating] = useState<AggregateRating | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [regionId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/regions/${regionId}/reviews`);
      const data = await response.json();
      console.log('Reviews data:', data); // Debug
      setReviews(data.reviews || []);
      setAggregateRating(data.aggregateRating);
    } catch (error) {
      console.error('Reviews fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loading durumunda gösterme
  if (loading) {
    return null;
  }

  // Yorum yoksa default AggregateRating
  const defaultRating = {
    ratingValue: 4.8,
    reviewCount: 15,
    bestRating: 5,
    worstRating: 1,
  };

  const displayRating = aggregateRating || defaultRating;
  const hasReviews = reviews && reviews.length > 0;

  return (
    <section className="bg-background border-b border-border">
      {/* AggregateRating Schema - SEO için (her zaman) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": regionTitle,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": displayRating.ratingValue,
              "reviewCount": displayRating.reviewCount,
              "bestRating": displayRating.bestRating,
              "worstRating": displayRating.worstRating
            },
            "review": hasReviews ? reviews.map((review) => ({
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
            })) : []
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
            Müşteri Yorumları
          </h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.round(displayRating.ratingValue)
                      ? 'text-accent fill-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {displayRating.ratingValue}/5
            </div>
            <div className="text-sm text-text-secondary">
              ({displayRating.reviewCount} değerlendirme)
            </div>
          </div>
        </div>

        {/* Reviews Grid - sadece yorum varsa */}
        {hasReviews && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="bg-surface p-6 rounded-xl border border-border hover:border-accent/30 transition-colors"
              >
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-xs text-accent font-medium">✓ Doğrulanmış</span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="font-medium">{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Info */}
        {hasReviews && reviews.length > 6 && (
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
