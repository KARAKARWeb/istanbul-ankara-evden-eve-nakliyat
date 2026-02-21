'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export function SingleRegionForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sourceCity: 'İstanbul',
    targetCity: '',
    distance: '',
    duration: '',
    priceMin: '',
    priceMax: '',
    active: true,
    featured: false,
  });

  const generateSlug = (title: string) => {
    return title
      .replace(/İ/g, 'i')
      .replace(/I/g, 'i')
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const title = `${formData.sourceCity} ${formData.targetCity} Evden Eve Nakliyat`;
    const slug = generateSlug(title);
    
    const regionData = {
      sourceCity: formData.sourceCity,
      targetCity: formData.targetCity,
      slug,
      title,
      metaTitle: `${title} | Profesyonel Taşımacılık`,
      metaDescription: `${formData.sourceCity}'dan ${formData.targetCity}'ya profesyonel evden eve nakliyat hizmeti. Sigortalı taşıma, uygun fiyat.`,
      distance: parseInt(formData.distance) || 468,
      duration: parseFloat(formData.duration) || 5.5,
      priceMin: parseInt(formData.priceMin) || 1500,
      priceMax: parseInt(formData.priceMax) || 3500,
      content: `<h2>${title}</h2><p>${formData.sourceCity}'dan ${formData.targetCity}'ya profesyonel evden eve nakliyat hizmeti sunuyoruz.</p>`,
      active: formData.active,
      featured: formData.featured,
      order: 999,
    };

    try {
      const response = await fetch('/api/regions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regionData),
      });

      if (response.ok) {
        alert('Bölge başarıyla eklendi!');
        router.refresh();
        // Form'u sıfırla
        setFormData({
          sourceCity: 'İstanbul',
          targetCity: '',
          distance: '',
          duration: '',
          priceMin: '',
          priceMax: '',
          active: true,
          featured: false,
        });
      } else {
        const data = await response.json();
        alert(data.error || 'Bölge eklenemedi!');
      }
    } catch (error) {
      alert('Bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Tekli Bölge Ekle
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Yeni bir bölge eklemek için aşağıdaki formu doldurun. Tüm alanlar zorunludur.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Kaynak Şehir */}
          <div>
            <Label htmlFor="sourceCity">Kaynak Şehir</Label>
            <Input
              id="sourceCity"
              value={formData.sourceCity}
              onChange={(e) => setFormData({ ...formData, sourceCity: e.target.value })}
              placeholder="İstanbul"
              required
            />
          </div>

          {/* Hedef Şehir */}
          <div>
            <Label htmlFor="targetCity">Hedef Şehir/İlçe</Label>
            <Input
              id="targetCity"
              value={formData.targetCity}
              onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
              placeholder="Bornova"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Mesafe */}
          <div>
            <Label htmlFor="distance">Mesafe (km)</Label>
            <Input
              id="distance"
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              placeholder="468"
              required
            />
          </div>

          {/* Süre */}
          <div>
            <Label htmlFor="duration">Süre (saat)</Label>
            <Input
              id="duration"
              type="number"
              step="0.1"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="5.5"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Min Fiyat (₺)
            </label>
            <input
              type="number"
              value={formData.priceMin}
              onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              placeholder="3500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Max Fiyat (₺)
            </label>
            <input
              type="number"
              value={formData.priceMax}
              min={formData.priceMin}
              onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              placeholder="12520"
            />
            {parseInt(formData.priceMax) < parseInt(formData.priceMin) && formData.priceMax && formData.priceMin && (
              <p className="text-xs text-error mt-1">
                ⚠️ Max fiyat, min fiyattan küçük olamaz!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Aktif */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-primary">Aktif</span>
          </label>

          {/* Öne Çıkan */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="text-sm text-text-primary">Öne Çıkan</span>
          </label>
        </div>

        <div className="pt-4 border-t border-border">
          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? 'Ekleniyor...' : 'Bölge Ekle'}
          </Button>
        </div>
      </form>
    </div>
  );
}
