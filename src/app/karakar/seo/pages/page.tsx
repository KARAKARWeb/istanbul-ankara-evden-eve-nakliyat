'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';
import { FileText } from 'lucide-react';

export default function SEOPagesPage() {
  const [loading, setLoading] = useState(false);
  const [pagesData, setPagesData] = useState<any>(null);
  const [titleSuffix, setTitleSuffix] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/seo/pages');
      const data = await response.json();
      setPagesData(data);
      setTitleSuffix(data.titleSuffix || '');
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...pagesData,
          titleSuffix,
        }),
      });
      
      if (response.ok) {
        showToast('SEO ayarları kaydedildi!', 'success');
      } else {
        showToast('Kaydetme başarısız', 'error');
      }
    } catch (error) {
      showToast('Hata oluştu!', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!pagesData) return <div className="p-8">Yükleniyor...</div>;

  return (
    <>
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-text-primary mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8" />
              Sayfa SEO Ayarları
            </h1>
            <p className="text-text-secondary">
              Ana sayfa, Hakkımızda ve İletişim sayfalarının title, description ve keywords ayarları
            </p>
          </div>

          <div className="space-y-6">
            {/* Title Suffix */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                ⚙️ Global Ayarlar
              </h2>
              <div>
                <Label htmlFor="title-suffix">Title Suffix (Başlık Soneki)</Label>
                <Input
                  id="title-suffix"
                  value={titleSuffix}
                  onChange={(e) => setTitleSuffix(e.target.value)}
                  placeholder="Örn: | Profesyonel Taşımacılık"
                />
                <p className="text-xs text-text-muted mt-1">
                  Tüm sayfa başlıklarının sonuna eklenecek metin. Boş bırakılabilir.
                </p>
                <p className="text-xs text-info mt-1">
                  Örnek: "Site Adı" + " | Profesyonel Taşımacılık"
                </p>
              </div>
            </div>
            {/* Ana Sayfa */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                🏠 Ana Sayfa
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="home-title">Meta Title</Label>
                  <Input
                    id="home-title"
                    value={pagesData.home?.title || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      home: { ...pagesData.home, title: e.target.value }
                    })}
                    placeholder="Ana sayfa başlığı"
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.home?.title?.length || 0) >= 50 && (pagesData.home?.title?.length || 0) <= 60 
                      ? 'text-success' 
                      : (pagesData.home?.title?.length || 0) > 60 && (pagesData.home?.title?.length || 0) <= 70
                      ? 'text-warning'
                      : (pagesData.home?.title?.length || 0) > 70
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.home?.title?.length || 0} karakter (Önerilen: 50-60)
                  </p>
                </div>
                <div>
                  <Label htmlFor="home-description">Meta Description</Label>
                  <Textarea
                    id="home-description"
                    value={pagesData.home?.description || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      home: { ...pagesData.home, description: e.target.value }
                    })}
                    placeholder="Ana sayfa açıklaması"
                    rows={3}
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.home?.description?.length || 0) >= 150 && (pagesData.home?.description?.length || 0) <= 160 
                      ? 'text-success' 
                      : (pagesData.home?.description?.length || 0) > 160 && (pagesData.home?.description?.length || 0) <= 170
                      ? 'text-warning'
                      : (pagesData.home?.description?.length || 0) > 170
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.home?.description?.length || 0} karakter (Önerilen: 150-160)
                  </p>
                </div>
                <div>
                  <Label htmlFor="home-keywords">Keywords (virgülle ayırın)</Label>
                  <Input
                    id="home-keywords"
                    value={pagesData.home?.keywords || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      home: { ...pagesData.home, keywords: e.target.value }
                    })}
                    placeholder="anahtar kelime 1, anahtar kelime 2"
                  />
                </div>
              </div>
            </div>

            {/* Hakkımızda */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                ℹ️ Hakkımızda
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="about-title">Meta Title</Label>
                  <Input
                    id="about-title"
                    value={pagesData.about?.title || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      about: { ...pagesData.about, title: e.target.value }
                    })}
                    placeholder="Hakkımızda başlığı"
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.about?.title?.length || 0) >= 50 && (pagesData.about?.title?.length || 0) <= 60 
                      ? 'text-success' 
                      : (pagesData.about?.title?.length || 0) > 60 && (pagesData.about?.title?.length || 0) <= 70
                      ? 'text-warning'
                      : (pagesData.about?.title?.length || 0) > 70
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.about?.title?.length || 0} karakter (Önerilen: 50-60)
                  </p>
                </div>
                <div>
                  <Label htmlFor="about-description">Meta Description</Label>
                  <Textarea
                    id="about-description"
                    value={pagesData.about?.description || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      about: { ...pagesData.about, description: e.target.value }
                    })}
                    placeholder="Hakkımızda açıklaması"
                    rows={3}
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.about?.description?.length || 0) >= 150 && (pagesData.about?.description?.length || 0) <= 160 
                      ? 'text-success' 
                      : (pagesData.about?.description?.length || 0) > 160 && (pagesData.about?.description?.length || 0) <= 170
                      ? 'text-warning'
                      : (pagesData.about?.description?.length || 0) > 170
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.about?.description?.length || 0} karakter (Önerilen: 150-160)
                  </p>
                </div>
                <div>
                  <Label htmlFor="about-keywords">Keywords (virgülle ayırın)</Label>
                  <Input
                    id="about-keywords"
                    value={pagesData.about?.keywords || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      about: { ...pagesData.about, keywords: e.target.value }
                    })}
                    placeholder="anahtar kelime 1, anahtar kelime 2"
                  />
                </div>
              </div>
            </div>

            {/* İletişim */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                📞 İletişim
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact-title">Meta Title</Label>
                  <Input
                    id="contact-title"
                    value={pagesData.contact?.title || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      contact: { ...pagesData.contact, title: e.target.value }
                    })}
                    placeholder="İletişim başlığı"
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.contact?.title?.length || 0) >= 50 && (pagesData.contact?.title?.length || 0) <= 60 
                      ? 'text-success' 
                      : (pagesData.contact?.title?.length || 0) > 60 && (pagesData.contact?.title?.length || 0) <= 70
                      ? 'text-warning'
                      : (pagesData.contact?.title?.length || 0) > 70
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.contact?.title?.length || 0} karakter (Önerilen: 50-60)
                  </p>
                </div>
                <div>
                  <Label htmlFor="contact-description">Meta Description</Label>
                  <Textarea
                    id="contact-description"
                    value={pagesData.contact?.description || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      contact: { ...pagesData.contact, description: e.target.value }
                    })}
                    placeholder="İletişim açıklaması"
                    rows={3}
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.contact?.description?.length || 0) >= 150 && (pagesData.contact?.description?.length || 0) <= 160 
                      ? 'text-success' 
                      : (pagesData.contact?.description?.length || 0) > 160 && (pagesData.contact?.description?.length || 0) <= 170
                      ? 'text-warning'
                      : (pagesData.contact?.description?.length || 0) > 170
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.contact?.description?.length || 0} karakter (Önerilen: 150-160)
                  </p>
                </div>
                <div>
                  <Label htmlFor="contact-keywords">Keywords (virgülle ayırın)</Label>
                  <Input
                    id="contact-keywords"
                    value={pagesData.contact?.keywords || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      contact: { ...pagesData.contact, keywords: e.target.value }
                    })}
                    placeholder="anahtar kelime 1, anahtar kelime 2"
                  />
                </div>
              </div>
            </div>

            {/* Bölgeler */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                🗺️ Hizmet Bölgeleri
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="regions-title">Meta Title</Label>
                  <Input
                    id="regions-title"
                    value={pagesData.regions?.title || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      regions: { ...pagesData.regions, title: e.target.value }
                    })}
                    placeholder="Bölgeler başlığı"
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.regions?.title?.length || 0) >= 50 && (pagesData.regions?.title?.length || 0) <= 60 
                      ? 'text-success' 
                      : (pagesData.regions?.title?.length || 0) > 60 && (pagesData.regions?.title?.length || 0) <= 70
                      ? 'text-warning'
                      : (pagesData.regions?.title?.length || 0) > 70
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.regions?.title?.length || 0} karakter (Önerilen: 50-60)
                  </p>
                </div>
                <div>
                  <Label htmlFor="regions-description">Meta Description</Label>
                  <Textarea
                    id="regions-description"
                    value={pagesData.regions?.description || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      regions: { ...pagesData.regions, description: e.target.value }
                    })}
                    placeholder="Bölgeler açıklaması"
                    rows={3}
                  />
                  <p className={`text-xs mt-1 ${
                    (pagesData.regions?.description?.length || 0) >= 150 && (pagesData.regions?.description?.length || 0) <= 160 
                      ? 'text-success' 
                      : (pagesData.regions?.description?.length || 0) > 160 && (pagesData.regions?.description?.length || 0) <= 170
                      ? 'text-warning'
                      : (pagesData.regions?.description?.length || 0) > 170
                      ? 'text-error'
                      : 'text-text-muted'
                  }`}>
                    {pagesData.regions?.description?.length || 0} karakter (Önerilen: 150-160)
                  </p>
                </div>
                <div>
                  <Label htmlFor="regions-keywords">Keywords (virgülle ayırın)</Label>
                  <Input
                    id="regions-keywords"
                    value={pagesData.regions?.keywords || ''}
                    onChange={(e) => setPagesData({
                      ...pagesData,
                      regions: { ...pagesData.regions, keywords: e.target.value }
                    })}
                    placeholder="anahtar kelime 1, anahtar kelime 2"
                  />
                </div>
              </div>
            </div>

            {/* Kaydet Butonu */}
            <div className="flex justify-end">
              <Button onClick={saveData} disabled={loading} size="lg">
                {loading ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
