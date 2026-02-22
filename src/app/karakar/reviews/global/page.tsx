'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Star, Home, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';
import Link from 'next/link';

export default function GlobalReviewsPage() {
  const { toasts, showToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState<any>(null);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
    verified: true,
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviewsData(data);
    } catch (error) {
      console.error('Load reviews error:', error);
      setReviewsData({ reviews: [], aggregateRating: null });
    }
  };

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      setNewReview({ author: '', rating: 5, text: '', verified: true });
      loadReviews();
      showToast('Yorum eklendi! Ana sayfa güncellenecek.', 'success');
    } catch (error) {
      showToast('Hata oluştu!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    setLoading(true);
    try {
      const updatedReviews = reviewsData.reviews.filter((r: any) => r.id !== reviewId);
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reviewsData, reviews: updatedReviews }),
      });
      loadReviews();
      showToast('Yorum silindi!', 'success');
    } catch (error) {
      showToast('Silme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteAllReviews = async () => {
    if (!confirm('ANA SAYFA yorumlarının HEPSİ silinecek! Emin misiniz?')) return;
    setLoading(true);
    try {
      await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: [], aggregateRating: null }),
      });
      loadReviews();
      showToast('Tüm yorumlar silindi!', 'success');
    } catch (error) {
      showToast('Silme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!reviewsData) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="p-8">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/karakar/reviews">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Home className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-semibold text-text-primary">Ana Sayfa Yorumları</h1>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
          <h3 className="font-semibold text-text-primary mb-2">📍 Bu yorumlar nerede görünür?</h3>
          <p className="text-sm text-text-secondary">
            Ana sayfadaki <strong>"Müşteri Yorumları"</strong> bölümünde (http://localhost:3000/#reviews)
          </p>
        </div>

        {/* Toplu Silme */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-text-primary">Toplu Silme</h2>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Ana sayfadaki tüm yorumları silmek için kullanın.
          </p>
          <Button onClick={deleteAllReviews} disabled={loading} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Tüm Yorumları Sil
          </Button>
        </div>

        {/* Aggregate Rating */}
        {reviewsData?.aggregateRating && (
          <div className="bg-background p-6 rounded-xl border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">Ortalama Puan</h3>
            <div className="flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-8 h-8 ${
                      star <= Math.round(reviewsData.aggregateRating.ratingValue)
                        ? 'text-accent fill-accent'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div>
                <div className="text-3xl font-semibold text-text-primary">
                  {reviewsData.aggregateRating.ratingValue}/5
                </div>
                <div className="text-sm text-text-secondary">
                  {reviewsData.aggregateRating.reviewCount} değerlendirme
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Review */}
        <div className="bg-background p-6 rounded-xl border border-border mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Yeni Yorum Ekle</h2>
          <form onSubmit={addReview} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>İsim</Label>
                <Input
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  placeholder="Ahmet Y."
                  required
                />
              </div>
              <div>
                <Label>Puan</Label>
                <Select
                  value={newReview.rating.toString()}
                  onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Yıldız ⭐⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="4">4 Yıldız ⭐⭐⭐⭐</SelectItem>
                    <SelectItem value="3">3 Yıldız ⭐⭐⭐</SelectItem>
                    <SelectItem value="2">2 Yıldız ⭐⭐</SelectItem>
                    <SelectItem value="1">1 Yıldız ⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Yorum</Label>
              <Textarea
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                placeholder="Çok memnun kaldık..."
                rows={3}
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Ekleniyor...' : 'Ana Sayfaya Yorum Ekle'}
            </Button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          <div className="p-4 bg-surface border-b border-border">
            <h2 className="font-semibold text-text-primary">
              Mevcut Yorumlar ({reviewsData?.reviews?.length || 0})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {reviewsData?.reviews?.length === 0 && (
              <div className="p-8 text-center text-text-muted">
                Henüz yorum yok. Yukarıdan yorum ekleyin.
              </div>
            )}
            {reviewsData?.reviews?.map((review: any) => (
              <div key={review.id} className="p-4 flex items-start justify-between hover:bg-surface/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium text-text-primary">{review.author}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                          ))}
                        </div>
                        <span className="text-xs text-text-muted">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary ml-12">{review.text}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteReview(review.id)}
                >
                  <Trash2 className="w-4 h-4 text-error" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
