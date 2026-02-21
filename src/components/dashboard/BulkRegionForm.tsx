'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function BulkRegionForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const regionsText = formData.get('regions') as string;

    // Her satır bir bölge
    const lines = regionsText.split('\n').filter(line => line.trim());
    const regions = lines.map((line, index) => {
      // Eğer satır zaten tam başlık formatındaysa (örn: "İstanbul Buca Evden Eve Nakliyat")
      const fullLine = line.trim();
      let source = 'İstanbul';
      let target = '';
      let title = '';
      
      // "Evden Eve Nakliyat" kelimelerini kaldır
      const cleanLine = fullLine.replace(/\s*Evden\s+Eve\s+Nakliyat\s*/gi, '').trim();
      
      // "-" ile ayrılmış mı kontrol et
      if (cleanLine.includes('-')) {
        const parts = cleanLine.split('-').map(s => s.trim());
        source = parts[0] || 'İstanbul';
        target = parts[1] || parts[0];
      } else {
        // Boşlukla ayrılmış iki kelime varsa (örn: "İstanbul Buca")
        const words = cleanLine.split(/\s+/);
        if (words.length >= 2) {
          source = words[0];
          target = words.slice(1).join(' ');
        } else {
          target = cleanLine;
        }
      }
      
      title = `${source} ${target} Evden Eve Nakliyat`;
      
      // Slug'u başlığın tamamından oluştur
      // ÖNEMLİ: toLowerCase() öncesi İ->i dönüşümü yapmalıyız!
      const slug = title
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
      
      return {
        sourceCity: source,
        targetCity: target,
        slug,
        title,
        metaTitle: `${title} | Profesyonel Taşımacılık`,
        metaDescription: `${source}'dan ${target}'ya profesyonel evden eve nakliyat hizmeti.`,
        distance: 468,
        duration: 5.5,
        priceMin: 1500,
        priceMax: 3500,
        content: `<h2>${title}</h2><p>Profesyonel nakliyat hizmeti.</p>`,
        active: true,
        featured: false,
        order: index + 1,
      };
    });

    try {
      const response = await fetch('/api/regions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regions }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({ success: true, count: data.count });
        e.currentTarget.reset();
      } else {
        setResult({ success: false, error: data.error });
      }
    } catch (error) {
      setResult({ success: false, error: 'Bir hata oluştu' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Toplu Bölge Ekleme
      </h3>

      {result && (
        <div className={`mb-4 p-4 rounded-lg ${result.success ? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'}`}>
          {result.success ? `${result.count} bölge başarıyla eklendi!` : result.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="regions">
            Bölgeler (Her satıra bir bölge, format: "Kaynak Şehir - Hedef Şehir" veya sadece "Hedef Şehir")
          </Label>
          <Textarea
            id="regions"
            name="regions"
            rows={10}
            placeholder="İstanbul Bornova Evden Eve Nakliyat&#10;İstanbul - Konak&#10;Karşıyaka&#10;Buca"
            required
          />
          <p className="text-xs text-text-muted mt-2">
            Örnek: "İstanbul Bornova Evden Eve Nakliyat", "İstanbul - Bornova" veya sadece "Bornova"
          </p>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Ekleniyor...' : 'Toplu Ekle'}
        </Button>
      </form>
    </div>
  );
}
