'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

export default function HeroSettingsPage() {
  const [settings, setSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 0.1,
    backgroundOverlay: true,
    title: '',
    description: '',
    stats: {
      customers: '10,000+',
      customersLabel: 'Mutlu Müşteri',
    },
    pricing: {
      minPrice: 2500,
      maxPrice: 4500,
    },
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/settings/hero')
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Uploading file:', file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Upload response status:', res.status);
      const data = await res.json();
      console.log('Upload response data:', data);
      
      if (data.data?.url) {
        setSettings(prev => ({ ...prev, backgroundImage: data.data.url }));
        alert('Resim yüklendi: ' + data.data.url);
      } else if (data.url) {
        setSettings(prev => ({ ...prev, backgroundImage: data.url }));
        alert('Resim yüklendi: ' + data.url);
      } else {
        alert('Resim yüklenemedi: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Resim yüklenemedi: ' + error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSettings({ ...settings, backgroundImage: '' });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      alert('Ayarlar kaydedildi!');
    } catch (error) {
      alert('Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">Hero Section Ayarları</h1>
          <p className="text-text-secondary mt-1">Ana sayfa hero bölümünü özelleştirin</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-6 space-y-6">
          {/* Background Image */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Arka Plan Resmi
            </label>
            
            {settings.backgroundImage ? (
              <div className="relative">
                <img 
                  src={settings.backgroundImage} 
                  alt="Hero Background" 
                  className="w-full h-64 object-cover rounded-lg border border-border"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-sm text-text-secondary mb-4">
                  Hero arka plan resmini yükleyin
                </p>
                <label className="cursor-pointer">
                  <span className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                    {uploading ? 'Yükleniyor...' : 'Resim Seç'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-xs text-text-muted mt-2">
                  Önerilen boyut: 1920x600px
                </p>
              </div>
            )}
          </div>

          {/* Background Opacity */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Arka Plan Opaklığı: {settings.backgroundOpacity}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.backgroundOpacity}
              onChange={(e) => setSettings({ ...settings, backgroundOpacity: parseFloat(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-text-muted mt-1">
              Arka plan resminin görünürlük seviyesi (0 = şeffaf, 1 = tam görünür)
            </p>
          </div>

          {/* Background Overlay */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="overlay"
              checked={settings.backgroundOverlay}
              onChange={(e) => setSettings({ ...settings, backgroundOverlay: e.target.checked })}
              className="h-4 w-4 rounded border-border text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer"
            />
            <label htmlFor="overlay" className="text-sm cursor-pointer">
              Koyu overlay kullan (İçeriğin okunabilirliğini artırır)
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Başlık
            </label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
              placeholder="Site Başlığı"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Açıklama
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
              placeholder="Profesyonel, güvenilir ve uygun fiyatlı nakliyat hizmeti..."
            />
            <p className="text-xs text-text-muted mt-1">
              Tiptap editor yakında eklenecek
            </p>
          </div>

          {/* Stats */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              İstatistikler
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Müşteri Sayısı</label>
                <input
                  type="text"
                  value={settings.stats.customers}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    stats: { ...settings.stats, customers: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm"
                  placeholder="10,000+"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Etiket</label>
                <input
                  type="text"
                  value={settings.stats.customersLabel}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    stats: { ...settings.stats, customersLabel: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm"
                  placeholder="Mutlu Müşteri"
                />
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Not: Müşteri Puanı ve Mesafe otomatik hesaplanır
            </p>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Fiyat Aralığı (Fiyat Hesaplama Formu)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Minimum Fiyat (₺)</label>
                <input
                  type="number"
                  value={settings.pricing.minPrice}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    pricing: { ...settings.pricing, minPrice: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm"
                  placeholder="2500"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Maximum Fiyat (₺)</label>
                <input
                  type="number"
                  value={settings.pricing.maxPrice}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    pricing: { ...settings.pricing, maxPrice: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm"
                  placeholder="4500"
                />
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">
              Tahmini Fiyat: {settings.pricing.minPrice.toLocaleString('tr-TR')}₺ - {settings.pricing.maxPrice.toLocaleString('tr-TR')}₺
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-border">
            <Button onClick={handleSave} disabled={loading} size="lg">
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
