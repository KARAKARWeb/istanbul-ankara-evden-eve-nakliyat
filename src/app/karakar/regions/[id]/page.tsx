'use client';

import { use, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function RegionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { showToast } = useToast();
  const { id } = use(params); // Unwrap params Promise
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [region, setRegion] = useState<any>({
    id: '',
    slug: '',
    title: '',
    metaTitle: '',
    metaDescription: '',
    sourceCity: '',
    targetCity: '',
    distance: 0,
    duration: 0,
    priceMin: 0,
    active: true,
    order: 0,
    content: '',
    faqs: [],
  });

  useEffect(() => {
    loadRegion();
  }, [id]);

  useEffect(() => {
    // Region yüklendikten sonra default settings'i çek
    if (region.id && !region.priceMin) {
      fetchDefaultSettings();
    }
  }, [region.id]);

  const loadRegion = async () => {
    try {
      console.log('Loading region:', id);
      const response = await fetch(`/api/regions/${id}`);
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Loaded data:', data);
        setRegion(data);
      } else {
        console.error('Response not OK:', response.status);
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultSettings = async () => {
    try {
      const response = await fetch('/api/settings/route-info');
      if (response.ok) {
        const data = await response.json();
        // Dashboard settings'den default min fiyat çek
        if (data.priceMin && !region.priceMin) {
          setRegion((prev: any) => ({
            ...prev,
            priceMin: data.priceMin,
          }));
        }
      }
    } catch (error) {
      console.error('Settings fetch error:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/regions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(region),
      });

      if (response.ok) {
        showToast('Bölge güncellendi!', 'success');
      } else {
        showToast('Güncelleme başarısız!', 'error');
      }
    } catch (error) {
      showToast('Güncelleme başarısız!', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-text-secondary">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/regions">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">Bölge Düzenle</h1>
            <p className="text-sm text-text-secondary mt-1">{region.title}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-background p-6 rounded-xl border border-border space-y-6">
            {/* Başlık */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bölge Başlığı
              </label>
              <input
                type="text"
                value={region.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setRegion({ ...region, title: newTitle });
                  
                  // Otomatik slug oluştur
                  const slug = newTitle
                    .replace(/İ/g, 'i')
                    .replace(/I/g, 'i')
                    .toLowerCase()
                    .replace(/ı/g, 'i')
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                  
                  // Başlıktan şehir isimlerini çıkar (örn: "İstanbul Aliağa Evden Eve Nakliyat")
                  const parts = newTitle.split(' ');
                  if (parts.length >= 2) {
                    const sourceCity = parts[0]; // İstanbul
                    const targetCity = parts[1]; // Aliağa
                    
                    setRegion({
                      ...region,
                      title: newTitle,
                      slug: slug,
                      sourceCity: sourceCity,
                      targetCity: targetCity,
                    });
                  } else {
                    setRegion({
                      ...region,
                      title: newTitle,
                      slug: slug,
                    });
                  }
                }}
                placeholder="İstanbul Aliağa Evden Eve Nakliyat"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={region.slug}
                onChange={(e) => setRegion({ ...region, slug: e.target.value })}
                placeholder="istanbul-aliaga"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                required
              />
              <p className="text-xs text-text-muted mt-1">
                URL: /{region.slug}
              </p>
            </div>

            {/* SEO Alanları */}
            <div className="space-y-4 bg-accent/5 p-4 rounded-lg border border-accent/20">
              <h3 className="text-sm font-semibold text-text-primary">SEO Ayarları</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Meta Title (Boş bırakılırsa başlık kullanılır)
                </label>
                <input
                  type="text"
                  value={region.metaTitle || ''}
                  onChange={(e) => setRegion({ ...region, metaTitle: e.target.value })}
                  placeholder="İstanbul Aliağa Evden Eve Nakliyat | Profesyonel Taşımacılık"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                />
                <p className="text-xs text-text-muted mt-1">
                  {region.metaTitle ? `${region.metaTitle.length} karakter` : 'Boş - başlık kullanılacak'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Meta Description (Boş bırakılırsa içeriğin ilk 150 karakteri kullanılır)
                </label>
                <textarea
                  value={region.metaDescription || ''}
                  onChange={(e) => setRegion({ ...region, metaDescription: e.target.value })}
                  placeholder="İstanbul'dan Aliağa'ya profesyonel evden eve nakliyat hizmeti. Sigortalı taşıma, uygun fiyat."
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                />
                <p className="text-xs text-text-muted mt-1">
                  {region.metaDescription ? `${region.metaDescription.length} karakter (Önerilen: 150-160)` : 'Boş - içeriğin ilk 150 karakteri kullanılacak'}
                </p>
              </div>
            </div>

            {/* Şehirler */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Kaynak Şehir
                </label>
                <input
                  type="text"
                  value={region.sourceCity}
                  onChange={(e) => setRegion({ ...region, sourceCity: e.target.value })}
                  placeholder="İstanbul"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hedef Şehir
                </label>
                <input
                  type="text"
                  value={region.targetCity}
                  onChange={(e) => setRegion({ ...region, targetCity: e.target.value })}
                  placeholder="Balçova"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  required
                />
              </div>
            </div>

            {/* Mesafe ve Süre */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Mesafe (km)
                </label>
                <input
                  type="number"
                  value={region.distance}
                  onChange={(e) => setRegion({ ...region, distance: parseInt(e.target.value) || 0 })}
                  placeholder="468"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  required
                />
                <p className="text-xs text-text-muted mt-1">
                  Manuel girilmeli
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Süre (saat)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={region.duration}
                  onChange={(e) => setRegion({ ...region, duration: parseFloat(e.target.value) || 0 })}
                  placeholder="5.5"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  required
                />
                <p className="text-xs text-text-muted mt-1">
                  Manuel girilmeli
                </p>
              </div>
            </div>

            {/* Başlangıç Fiyatı - Otomatik Dashboard Settings'den */}
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Başlangıç Fiyatı (₺)
                  </label>
                  <p className="text-xs text-text-muted">
                    Dashboard → Settings → Rota Bilgileri → Min Fiyat'tan otomatik çekilir
                  </p>
                </div>
                <div className="text-2xl font-semibold text-accent">
                  {region.priceMin || '---'} ₺
                </div>
              </div>
            </div>

            {/* İçerik - TipTap Editör */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                İçerik
              </label>
              <TipTapEditor
                content={region.content}
                onChange={(html) => setRegion({ ...region, content: html })}
              />
              <p className="text-xs text-text-muted mt-2">
                HTML formatında kaydedilir. Bold, Italic, Başlıklar, Listeler kullanabilirsiniz.
              </p>
            </div>

            {/* FAQ Listesi */}
            <div className="p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-text-primary">Sık Sorulan Sorular (Bölgeye Özel)</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newFaqs = [...(region.faqs || []), { q: '', a: '' }];
                    setRegion({ ...region, faqs: newFaqs });
                  }}
                  className="px-3 py-1 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
                >
                  + Yeni Soru Ekle
                </button>
              </div>
              {region.faqs && region.faqs.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {region.faqs.map((faq: any, index: number) => (
                    <div key={index} className="p-4 bg-background rounded-lg border border-border space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-text-primary">Soru {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaqs = region.faqs.filter((_: any, i: number) => i !== index);
                            setRegion({ ...region, faqs: newFaqs });
                          }}
                          className="text-xs text-error hover:underline"
                        >
                          Sil
                        </button>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Soru
                        </label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const newFaqs = [...region.faqs];
                            newFaqs[index].q = e.target.value;
                            setRegion({ ...region, faqs: newFaqs });
                          }}
                          placeholder="Soru..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Cevap
                        </label>
                        <textarea
                          value={faq.a}
                          onChange={(e) => {
                            const newFaqs = [...region.faqs];
                            newFaqs[index].a = e.target.value;
                            setRegion({ ...region, faqs: newFaqs });
                          }}
                          rows={3}
                          placeholder="Cevap..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-muted text-center py-4">
                  Henüz soru eklenmemiş. "Yeni Soru Ekle" butonuna tıklayarak başlayın.
                </p>
              )}
            </div>

            {/* Durum */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={region.active}
                onChange={(e) => setRegion({ ...region, active: e.target.checked })}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="active" className="text-sm font-medium text-text-primary cursor-pointer">
                Aktif
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={saving} size="lg">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
            <Link href="/dashboard/regions">
              <Button type="button" variant="ghost" size="lg">
                İptal
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
