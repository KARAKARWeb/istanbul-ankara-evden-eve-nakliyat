'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ThemeSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [accentColor, setAccentColor] = useState('#16A34A');
  const [accentHoverColor, setAccentHoverColor] = useState('#15803D');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchThemeSettings();
  }, []);

  const fetchThemeSettings = async () => {
    try {
      const res = await fetch('/api/settings/theme');
      const data = await res.json();
      setAccentColor(data.accentColor || '#16A34A');
      setAccentHoverColor(data.accentHoverColor || '#15803D');
    } catch (error) {
      console.error('Tema ayarları yüklenemedi:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accentColor,
          accentHoverColor,
        }),
      });

      if (res.ok) {
        showToast('Tema ayarları kaydedildi. Değişikliklerin görünmesi için sayfayı yenileyin.', 'success');
        
        // CSS değişkenlerini güncelle
        document.documentElement.style.setProperty('--accent', accentColor);
        document.documentElement.style.setProperty('--accent-hover', accentHoverColor);
        document.documentElement.style.setProperty('--color-accent', accentColor);
        document.documentElement.style.setProperty('--color-accent-hover', accentHoverColor);
      } else {
        showToast('Kaydetme başarısız', 'error');
      }
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const presetColors = [
    { name: 'Yeşil (Default)', color: '#16A34A', hover: '#15803D' },
    { name: 'Mavi', color: '#3B82F6', hover: '#2563EB' },
    { name: 'Turuncu', color: '#F59E0B', hover: '#D97706' },
    { name: 'Kırmızı', color: '#DC2626', hover: '#B91C1C' },
    { name: 'Mor', color: '#9333EA', hover: '#7C3AED' },
    { name: 'Pembe', color: '#EC4899', hover: '#DB2777' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Tema Ayarları</h1>
        <p className="text-text-secondary">Site genelinde kullanılan renk tonlarını buradan ayarlayabilirsiniz.</p>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50`}>
          {toast.message}
        </div>
      )}

      <div className="space-y-8">
        {/* Ana Renk */}
        <div className="bg-surface p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Ana Vurgu Rengi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Renk Seçici */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Ana Renk
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-20 h-12 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-mono"
                  placeholder="#16A34A"
                />
              </div>
            </div>

            {/* Hover Rengi */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Hover Rengi
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={accentHoverColor}
                  onChange={(e) => setAccentHoverColor(e.target.value)}
                  className="w-20 h-12 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text"
                  value={accentHoverColor}
                  onChange={(e) => setAccentHoverColor(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-mono"
                  placeholder="#15803D"
                />
              </div>
            </div>
          </div>

          {/* Önizleme */}
          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <p className="text-sm font-medium text-text-primary mb-3">Önizleme:</p>
            <div className="flex gap-3">
              <button
                style={{ backgroundColor: accentColor }}
                className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentHoverColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = accentColor}
              >
                Buton Örneği
              </button>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: accentColor }}
                  className="w-6 h-6"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                <span style={{ color: accentColor }} className="font-medium">
                  Yıldız Örneği
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hazır Renkler */}
        <div className="bg-surface p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Hazır Renk Paletleri</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setAccentColor(preset.color);
                  setAccentHoverColor(preset.hover);
                }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent transition-colors bg-background"
              >
                <div
                  className="w-10 h-10 rounded-lg"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-sm font-medium text-text-primary">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kullanım Alanları */}
        <div className="bg-surface p-6 rounded-xl border border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Renk Kullanım Alanları</h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• CTA butonları (Ücretsiz Teklif Al, Hemen Ara, vb.)</li>
            <li>• Linkler ve hover efektleri</li>
            <li>• Yıldız ikonları (rating)</li>
            <li>• Vurgu yapılacak öğeler</li>
            <li>• Form focus durumları</li>
            <li>• Badge ve etiketler</li>
          </ul>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg">
            {loading ? 'Kaydediliyor...' : 'Tema Ayarlarını Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  );
}
