'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function SEOPage() {
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState<any>(null);
  const [ogData, setOgData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [general, og] = await Promise.all([
        fetch('/api/seo/general').then(r => r.json()),
        fetch('/api/seo/og').then(r => r.json()),
      ]);
      setGeneralData(general);
      setOgData(og);
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/seo/general', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generalData),
      });
      alert('SEO ayarları kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const saveOG = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/seo/og', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ogData),
      });
      alert('Open Graph ayarları kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  if (!generalData) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-text-primary mb-8">SEO Yönetimi</h1>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Genel SEO</TabsTrigger>
            <TabsTrigger value="og">Open Graph</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <form onSubmit={saveGeneral} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div>
                <Label>Meta Title</Label>
                <Input
                  value={generalData.title}
                  onChange={(e) => setGeneralData({ ...generalData, title: e.target.value })}
                  placeholder="Site başlığı"
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea
                  value={generalData.description}
                  onChange={(e) => setGeneralData({ ...generalData, description: e.target.value })}
                  placeholder="Site açıklaması"
                  rows={3}
                />
              </div>
              <div>
                <Label>Keywords (virgülle ayırın)</Label>
                <Input
                  value={generalData.keywords?.join(', ')}
                  onChange={(e) => setGeneralData({
                    ...generalData,
                    keywords: e.target.value.split(',').map((k: string) => k.trim())
                  })}
                  placeholder="nakliyat, evden eve, taşımacılık"
                />
              </div>
              <div>
                <Label>Canonical URL</Label>
                <Input
                  value={generalData.canonical}
                  onChange={(e) => setGeneralData({ ...generalData, canonical: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="og">
            <form onSubmit={saveOG} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div>
                <Label>OG Title</Label>
                <Input
                  value={ogData.title}
                  onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>OG Description</Label>
                <Textarea
                  value={ogData.description}
                  onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>OG Image URL</Label>
                <Input
                  value={ogData.image}
                  onChange={(e) => setOgData({ ...ogData, image: e.target.value })}
                  placeholder="/og-image.jpg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Image Width</Label>
                  <Input
                    type="number"
                    value={ogData.imageWidth}
                    onChange={(e) => setOgData({ ...ogData, imageWidth: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Image Height</Label>
                  <Input
                    type="number"
                    value={ogData.imageHeight}
                    onChange={(e) => setOgData({ ...ogData, imageHeight: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
