'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function FooterLayer2Page() {
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/footer/layer-2')
      .then(r => r.json())
      .then(data => setAboutText(data.aboutText || ''));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/footer/layer-2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aboutText }),
      });
      alert('Kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">Footer Katman 2 - Hakkımızda Metni</h1>
          <p className="text-text-secondary mt-1">Footer'da görünecek kısa açıklama metnini düzenleyin</p>
        </div>

        <div className="bg-background p-6 rounded-lg border border-border">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Hakkımızda Metni
          </label>
          <Textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={6}
            placeholder="Profesyonel evden eve nakliyat hizmeti ile eşyalarınızı güvenle taşıyoruz..."
            className="resize-none"
          />
          <p className="text-xs text-text-muted mt-2">
            Bu metin footer'ın 2. katmanında site başlığının altında görünecektir.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>

        <div className="mt-8 p-6 bg-surface rounded-lg border border-border">
          <h3 className="font-semibold text-text-primary mb-4">Footer Katman 2 Yapısı:</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-background rounded border border-border">
              <p className="font-semibold text-text-primary mb-2">1. Site Başlığı</p>
              <p className="text-text-muted text-xs">Dinamik (API'den)</p>
              <p className="text-text-muted text-xs mt-1">+ Hakkımızda metni (buradan)</p>
            </div>
            <div className="p-4 bg-background rounded border border-border">
              <p className="font-semibold text-text-primary mb-2">2. Hizmetlerimiz</p>
              <p className="text-text-muted text-xs">Sabit linkler</p>
              <p className="text-text-muted text-xs mt-1">Ana sayfa #hizmetler'e kayar</p>
            </div>
            <div className="p-4 bg-background rounded border border-border">
              <p className="font-semibold text-text-primary mb-2">3. Hizmet Bölgeleri</p>
              <p className="text-text-muted text-xs">5 bölge (dinamik)</p>
              <p className="text-text-muted text-xs mt-1">+ Tümünü Gör linki</p>
            </div>
            <div className="p-4 bg-background rounded border border-border">
              <p className="font-semibold text-text-primary mb-2">4. İletişim</p>
              <p className="text-text-muted text-xs">Telefon, WhatsApp, Adres</p>
              <p className="text-text-muted text-xs mt-1">Dinamik (API'den)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
