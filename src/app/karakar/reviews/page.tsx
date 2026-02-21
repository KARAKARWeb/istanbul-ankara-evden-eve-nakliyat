'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Star, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';

export default function ReviewsPage() {
  const { toasts, showToast, removeToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [regionReviews, setRegionReviews] = useState<any>(null);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
    verified: true,
  });

  useEffect(() => {
    loadRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      loadRegionReviews();
    }
  }, [selectedRegion]);

  const loadRegions = async () => {
    try {
      const response = await fetch('/api/regions');
      const data = await response.json();
      setRegions(data);
      if (data.length > 0) {
        setSelectedRegion(data[0].id);
      }
    } catch (error) {
      console.error('Load regions error:', error);
    }
  };

  const loadRegionReviews = async () => {
    if (!selectedRegion) return;
    try {
      const response = await fetch(`/api/regions/${selectedRegion}/reviews`);
      const data = await response.json();
      console.log('Dashboard reviews data:', data); // Debug
      setRegionReviews(data);
    } catch (error) {
      console.error('Load reviews error:', error);
      setRegionReviews({ reviews: [], aggregateRating: null });
    }
  };

  const addReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegion) return;
    setLoading(true);
    try {
      await fetch(`/api/regions/${selectedRegion}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });
      setNewReview({ author: '', rating: 5, text: '', verified: true });
      loadRegionReviews();
      showToast('Yorum eklendi!', 'success');
    } catch (error) {
      showToast('Hata oluştu!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteAllReviews = async () => {
    if (!confirm('TÜM bölgelerdeki TÜM yorumlar silinecek! Emin misiniz?')) return;
    setLoading(true);
    try {
      const response = await fetch('/api/regions/bulk-reviews', {
        method: 'DELETE',
      });
      const data = await response.json();
      showToast(`${data.totalDeleted} yorum silindi!`, 'success');
      loadRegionReviews();
    } catch (error) {
      showToast('Yorumlar silinemedi!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    if (!selectedRegion) return;
    setLoading(true);
    try {
      await fetch(`/api/regions/${selectedRegion}/reviews?reviewId=${reviewId}`, {
        method: 'DELETE',
      });
      loadRegionReviews();
      showToast('Yorum silindi!', 'success');
    } catch (error) {
      showToast('Silme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (regions.length === 0) return <div className="p-8">Yükleniyor...</div>;

  const selectedRegionData = regions.find(r => r.id === selectedRegion);

  return (
    <div className="p-8">
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-text-primary mb-8">Yorum Yönetimi (Region Bazlı)</h1>

        {/* Toplu İşlemler */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-text-primary">Toplu Silme</h2>
          </div>
          <p className="text-sm text-text-secondary mb-4">
            Tüm bölgelerdeki tüm yorumları silmek için kullanın. Yorumlar manuel eklenecek (Google Maps, gerçek müşteriler vs.)
          </p>
          <Button onClick={deleteAllReviews} disabled={loading} variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Tüm Yorumları Sil
          </Button>
        </div>

        {/* Region Seçimi */}
        <div className="bg-background p-6 rounded-xl border border-border mb-6">
          <Label>Bölge Seçin</Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Aggregate Rating */}
        {regionReviews?.aggregateRating && (
          <div className="bg-background p-6 rounded-xl border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {selectedRegionData?.title} - Aggregate Rating
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-8 h-8 ${
                      star <= Math.round(regionReviews.aggregateRating.ratingValue)
                        ? 'text-accent fill-accent'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div>
                <div className="text-3xl font-semibold text-text-primary">
                  {regionReviews.aggregateRating.ratingValue}/5
                </div>
                <div className="text-sm text-text-secondary">
                  {regionReviews.aggregateRating.reviewCount} değerlendirme
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
                    <SelectItem value="5">5 Yıldız</SelectItem>
                    <SelectItem value="4">4 Yıldız</SelectItem>
                    <SelectItem value="3">3 Yıldız</SelectItem>
                    <SelectItem value="2">2 Yıldız</SelectItem>
                    <SelectItem value="1">1 Yıldız</SelectItem>
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Ekleniyor...' : 'Yorum Ekle'}
            </Button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          <div className="p-4 bg-surface border-b border-border">
            <h2 className="font-semibold text-text-primary">
              {selectedRegionData?.title} - Mevcut Yorumlar ({regionReviews?.reviews?.length || 0})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {regionReviews?.reviews?.length === 0 && (
              <div className="p-8 text-center text-text-muted">
                Henüz yorum yok. Yukarıdan yorum ekleyin veya toplu oluşturun.
              </div>
            )}
            {regionReviews?.reviews?.map((review: any) => (
              <div key={review.id} className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-text-primary">{review.author}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                    <span className="text-xs text-text-muted">{review.date}</span>
                  </div>
                  <p className="text-sm text-text-secondary">{review.text}</p>
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
