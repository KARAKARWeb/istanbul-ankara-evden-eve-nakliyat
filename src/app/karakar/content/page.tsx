'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';
import { TipTapEditor } from '@/components/editor/TipTapEditor';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'anasayfa' | 'hakkimizda' | 'iletisim'>('anasayfa');
  const [aboutData, setAboutData] = useState<any>({
    description: '',
    story: { content: '' },
    mission: { content: '' },
    vision: { content: '' },
    values: { content: '' },
    whyUs: { content: '' },
  });
  const [contactData, setContactData] = useState<any>({
    description: '',
  });
  const { toasts, showToast, removeToast } = useToast();
  const [heroSettings, setHeroSettings] = useState<any>({
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
      houseTypes: [],
      elevatorPrices: {
        withElevator: 0,
        withoutElevator: 500,
      },
    },
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [servicesData, setServicesData] = useState<any>({
    title: 'Hizmetlerimiz',
    description: '',
    services: [],
    footer: ''
  });
  const [whyUsData, setWhyUsData] = useState<any>({
    title: 'Neden Bizi Tercih Etmelisiniz?',
    description: '',
    features: [],
    footer: ''
  });
  const [routeData, setRouteData] = useState<any>({
    title: 'Rota Bilgileri',
    description: 'Güvenli ve hızlı taşımacılık için en iyi rotayı kullanıyoruz',
    originCoords: '40.87964279652424,29.255537227148615',
    destinationCoords: '38.42297162766549,27.14327148023357'
  });
  const [galleryData, setGalleryData] = useState<any>({
    title: 'Galeri',
    description: 'Hizmetlerimizden görüntüler',
    images: [],
    footer: ''
  });
  const [processData, setProcessData] = useState<any>({
    title: 'Nakliyat Sürecimiz',
    description: 'Profesyonel taşınma sürecinin her adımı'
  });
  const [pricingData, setPricingData] = useState<any>({
    title: 'Fiyatlandırma',
    description: 'Şeffaf ve rekabetçi fiyatlarımız',
    packages: [],
    additionalServices: [],
    infoItems: []
  });
  const [faqData, setFaqData] = useState<any>({
    title: 'Sıkça Sorulan Sorular',
    description: ''
  });
  const [regionsData, setRegionsData] = useState<any>({
    title: 'Hizmet Bölgelerimiz',
    description: 'Türkiye\'nin her yerine güvenli nakliyat hizmeti'
  });
  const [seoTopData, setSeoTopData] = useState<any>({
    content: ''
  });
  const [seoBottomData, setSeoBottomData] = useState<any>({
    title: 'Evden Eve Nakliyat Hakkında',
    content: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/settings/hero').then(r => r.json()),
      fetch('/api/content/services').then(r => r.json()),
      fetch('/api/content/why-us').then(r => r.json()),
      fetch('/api/settings/route-info').then(r => r.json()),
      fetch('/api/content/gallery').then(r => r.json()),
      fetch('/api/content/process').then(r => r.json()),
      fetch('/api/content/pricing').then(r => r.json()),
      fetch('/api/content/faq').then(r => r.json()),
      fetch('/api/content/regions-showcase').then(r => r.json()),
      fetch('/api/content/seo-top').then(r => r.json()),
      fetch('/api/content/seo-bottom').then(r => r.json()),
      fetch('/api/content/about').then(r => r.json()),
      fetch('/api/content/contact').then(r => r.json()),
    ]).then(([hero, services, whyUs, route, gallery, process, pricing, faq, regions, seoTop, seoBottom, about, contact]) => {
      setHeroSettings(hero);
      setServicesData(services);
      setWhyUsData(whyUs);
      if (route.originCoords) setRouteData(route);
      if (gallery.title) setGalleryData(gallery);
      if (process.title) setProcessData(process);
      if (pricing.title) setPricingData(pricing);
      if (faq.title) setFaqData(faq);
      if (regions.title) setRegionsData(regions);
      if (seoTop.content) setSeoTopData(seoTop);
      if (seoBottom.title) setSeoBottomData(seoBottom);
      setAboutData(about);
      setContactData(contact);
    }).catch(() => {});
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.data?.url) {
        setHeroSettings((prev: any) => ({ ...prev, backgroundImage: data.data.url }));
        showToast('Resim başarıyla yüklendi', 'success');
      } else if (data.url) {
        setHeroSettings((prev: any) => ({ ...prev, backgroundImage: data.url }));
        showToast('Resim başarıyla yüklendi', 'success');
      } else {
        showToast('Resim yüklenemedi: ' + (data.error || 'Bilinmeyen hata'), 'error');
      }
    } catch (error) {
      showToast('Resim yüklenemedi', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setHeroSettings({ ...heroSettings, backgroundImage: '' });
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await res.json();
        
        if (data.data?.url) {
          uploadedUrls.push(data.data.url);
        } else if (data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setGalleryData((prev: any) => ({
          ...prev,
          images: [...(prev.images || []), ...uploadedUrls]
        }));
        showToast(`${uploadedUrls.length} resim başarıyla yüklendi`, 'success');
      } else {
        showToast('Resim yüklenemedi', 'error');
      }
    } catch (error) {
      showToast('Resim yüklenemedi', 'error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, idx: number) => idx !== index)
    }));
    showToast('Resim kaldırıldı', 'success');
  };

  const handleSaveGallery = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryData),
      });
      showToast('Galeri kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProcess = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processData),
      });
      showToast('Nakliyat Süreci kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePricing = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricingData),
      });
      showToast('Fiyatlandırma kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSeoTop = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/seo-top', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seoTopData),
      });
      showToast('SEO makale kaydedildi', 'success');
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      });
      showToast('Hakkımızda içerikleri kaydedildi', 'success');
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      showToast('İletişim içeriği kaydedildi', 'success');
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSeoBottom = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/seo-bottom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seoBottomData),
      });
      showToast('SEO içerik kaydedildi', 'success');
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFaq = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData),
      });
      showToast('SSS kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHero = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroSettings),
      });
      showToast('Hero ayarları kaydedildi!', 'success');
    } catch (error) {
      showToast('Kayıt başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveServices = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(servicesData),
      });
      showToast('Hizmetler kaydedildi!', 'success');
    } catch (error) {
      showToast('Kayıt başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWhyUs = async () => {
    setLoading(true);
    try {
      await fetch('/api/content/why-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(whyUsData),
      });
      showToast('Neden Biz section kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoute = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings/route-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(routeData),
      });
      showToast('Rota Bilgileri kaydedildi!', 'success');
    } catch (error) {
      showToast('Kaydetme hatası!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            İçerik Yönetimi
          </h1>
          <p className="text-text-secondary">
            Tüm sayfa içeriklerini tek ekrandan düzenleyin
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('anasayfa')}
            className={`text-sm px-4 py-2 rounded-lg border transition-all ${
              activeTab === 'anasayfa'
                ? 'bg-accent text-white border-accent font-medium'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Ana Sayfa (13 Section)
          </button>
          <button
            onClick={() => setActiveTab('hakkimizda')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'hakkimizda'
                ? 'bg-accent text-white'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            Hakkımızda (4 Section)
          </button>
          <button
            onClick={() => setActiveTab('iletisim')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'iletisim'
                ? 'bg-accent text-white'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            İletişim
          </button>
        </div>

        {/* Ana Sayfa Sections */}
        {activeTab === 'anasayfa' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                1. Hero Section
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Başlık, açıklama, stats, CTA butonları ve fiyat hesaplama formu
              </p>
              
              <div className="space-y-6">
                {/* Background Image */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Arka Plan Resmi
                  </label>
                  
                  {heroSettings.backgroundImage ? (
                    <div className="relative">
                      <img 
                        src={heroSettings.backgroundImage} 
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
                    </div>
                  )}
                </div>

                {/* Background Opacity */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Arka Plan Opaklığı: {heroSettings.backgroundOpacity}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={heroSettings.backgroundOpacity}
                    onChange={(e) => setHeroSettings({ ...heroSettings, backgroundOpacity: parseFloat(e.target.value) })}
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
                    checked={heroSettings.backgroundOverlay}
                    onChange={(e) => setHeroSettings({ ...heroSettings, backgroundOverlay: e.target.checked })}
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
                    value={heroSettings.title}
                    onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                    placeholder="Ana Sayfa Başlığı"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Açıklama
                  </label>
                  <TipTapEditor
                    content={heroSettings.description}
                    onChange={(html) => setHeroSettings({ ...heroSettings, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">
                    HTML/Visual toggle ile düzenleyebilirsiniz
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
                        value={heroSettings.stats.customers}
                        onChange={(e) => setHeroSettings({ 
                          ...heroSettings, 
                          stats: { ...heroSettings.stats, customers: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm"
                        placeholder="10,000+"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">Etiket</label>
                      <input
                        type="text"
                        value={heroSettings.stats.customersLabel}
                        onChange={(e) => setHeroSettings({ 
                          ...heroSettings, 
                          stats: { ...heroSettings.stats, customersLabel: e.target.value }
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

                {/* Pricing - Gelişmiş Fiyatlandırma */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Fiyatlandırma Sistemi (Fiyat Hesaplama Formu)
                  </label>
                  
                  {/* Ev Tipleri */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-text-primary">Ev Tipleri ve Fiyatları</label>
                      <button
                        onClick={() => {
                          const newType = {
                            id: `${heroSettings.pricing.houseTypes.length + 1}+1`,
                            label: `${heroSettings.pricing.houseTypes.length + 1}+1`,
                            basePrice: 0,
                            maxPrice: 0
                          };
                          setHeroSettings({
                            ...heroSettings,
                            pricing: {
                              ...heroSettings.pricing,
                              houseTypes: [...heroSettings.pricing.houseTypes, newType]
                            }
                          });
                        }}
                        className="text-xs bg-accent text-white px-3 py-1 rounded-lg hover:bg-accent-hover transition-colors"
                      >
                        + Yeni Ev Tipi Ekle
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {heroSettings.pricing.houseTypes?.map((houseType: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-surface">
                          <input
                            type="text"
                            value={houseType.label}
                            onChange={(e) => {
                              const newTypes = [...heroSettings.pricing.houseTypes];
                              newTypes[index].label = e.target.value;
                              newTypes[index].id = e.target.value;
                              setHeroSettings({
                                ...heroSettings,
                                pricing: { ...heroSettings.pricing, houseTypes: newTypes }
                              });
                            }}
                            className="w-24 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                            placeholder="1+1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-text-secondary">Fiyat:</span>
                              <input
                                type="number"
                                value={houseType.basePrice}
                                onChange={(e) => {
                                  const newTypes = [...heroSettings.pricing.houseTypes];
                                  newTypes[index].basePrice = parseInt(e.target.value) || 0;
                                  setHeroSettings({
                                    ...heroSettings,
                                    pricing: { ...heroSettings.pricing, houseTypes: newTypes }
                                  });
                                }}
                                className="w-28 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                placeholder="2500"
                              />
                              <span className="text-sm text-text-secondary">-</span>
                              <input
                                type="number"
                                value={houseType.maxPrice || houseType.basePrice}
                                onChange={(e) => {
                                  const newTypes = [...heroSettings.pricing.houseTypes];
                                  newTypes[index].maxPrice = parseInt(e.target.value) || 0;
                                  setHeroSettings({
                                    ...heroSettings,
                                    pricing: { ...heroSettings.pricing, houseTypes: newTypes }
                                  });
                                }}
                                className="w-28 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                                placeholder="3500"
                              />
                              <span className="text-sm text-text-secondary">₺</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const newTypes = heroSettings.pricing.houseTypes.filter((_: any, i: number) => i !== index);
                              setHeroSettings({
                                ...heroSettings,
                                pricing: { ...heroSettings.pricing, houseTypes: newTypes }
                              });
                            }}
                            className="text-red-600 hover:text-red-700 px-2 py-1 text-sm"
                          >
                            Sil
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Asansör Fiyatları */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-primary mb-3">Asansör Durumu Fiyatları</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border border-border rounded-lg bg-surface">
                        <label className="block text-xs text-text-secondary mb-2">Asansörlü (Ek Fiyat)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={heroSettings.pricing.elevatorPrices?.withElevator || 0}
                            onChange={(e) => setHeroSettings({
                              ...heroSettings,
                              pricing: {
                                ...heroSettings.pricing,
                                elevatorPrices: {
                                  ...heroSettings.pricing.elevatorPrices,
                                  withElevator: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                            placeholder="0"
                          />
                          <span className="text-sm text-text-secondary">₺</span>
                        </div>
                      </div>
                      <div className="p-3 border border-border rounded-lg bg-surface">
                        <label className="block text-xs text-text-secondary mb-2">Asansörsüz (Ek Fiyat)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={heroSettings.pricing.elevatorPrices?.withoutElevator || 0}
                            onChange={(e) => setHeroSettings({
                              ...heroSettings,
                              pricing: {
                                ...heroSettings.pricing,
                                elevatorPrices: {
                                  ...heroSettings.pricing.elevatorPrices,
                                  withoutElevator: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm"
                            placeholder="500"
                          />
                          <span className="text-sm text-text-secondary">₺</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-text-muted mt-2">
                      Toplam fiyat = Ev tipi fiyatı + Asansör durumu fiyatı
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveHero} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Hero Ayarlarını Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* SEO Makale (Üst) */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                2. SEO Makale (Üst)
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                200-300 kelimelik SEO odaklı makale
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">İçerik</label>
                  <TipTapEditor
                    content={seoTopData.content}
                    onChange={(html) => setSeoTopData({ ...seoTopData, content: html })}
                    minHeight={200}
                  />
                  <p className="text-xs text-text-muted mt-2">
                    HTML/Visual toggle ile düzenleyebilirsiniz
                  </p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveSeoTop} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'SEO Makale Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Hizmetlerimiz */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                3. Hizmetlerimiz
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                6 hizmet kartı - Başlıklar sabit, açıklamalar düzenlenebilir
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={servicesData.title}
                    onChange={(e) => setServicesData({ ...servicesData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                    placeholder="Hizmetlerimiz"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={servicesData.description}
                    onChange={(html) => setServicesData({ ...servicesData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Hizmet Kartları */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Hizmet Açıklamaları (Başlıklar Sabit)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {servicesData.services?.map((service: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <p className="text-sm font-semibold text-text-primary mb-2">{service.title}</p>
                        <TipTapEditor
                          content={service.description}
                          onChange={(html) => {
                            const newServices = [...servicesData.services];
                            newServices[index].description = html;
                            setServicesData({ ...servicesData, services: newServices });
                          }}
                          minHeight={50}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Bilgi */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Alt Bilgi Metni
                  </label>
                  <TipTapEditor
                    content={servicesData.footer}
                    onChange={(html) => setServicesData({ ...servicesData, footer: html })}
                    minHeight={200}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveServices} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Hizmetleri Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Neden Biz */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                4. Neden Bizi Tercih Etmelisiniz?
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık ve açıklaması
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={whyUsData.title}
                    onChange={(e) => setWhyUsData({ ...whyUsData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                    placeholder="Neden Bizi Tercih Etmelisiniz?"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={whyUsData.description}
                    onChange={(html) => setWhyUsData({ ...whyUsData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Özellik Kartları */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Özellik Kartları (6 Adet)
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {whyUsData.features?.map((feature: any, index: number) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...whyUsData.features];
                            newFeatures[index].title = e.target.value;
                            setWhyUsData({ ...whyUsData, features: newFeatures });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold mb-2"
                          placeholder="Özellik Başlığı"
                        />
                        <TipTapEditor
                          content={feature.description}
                          onChange={(html) => {
                            const newFeatures = [...whyUsData.features];
                            newFeatures[index].description = html;
                            setWhyUsData({ ...whyUsData, features: newFeatures });
                          }}
                          minHeight={50}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Alt Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Alt Açıklama Metni
                  </label>
                  <TipTapEditor
                    content={whyUsData.footer}
                    onChange={(html) => setWhyUsData({ ...whyUsData, footer: html })}
                    minHeight={200}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveWhyUs} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Neden Biz Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Rota Bilgileri */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                5. Rota Bilgileri
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık, açıklama ve harita koordinatları
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={routeData.title}
                    onChange={(e) => setRouteData({ ...routeData, title: e.target.value })}
                    placeholder="Rota Bilgileri Başlığı"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={routeData.description}
                    onChange={(html) => setRouteData({ ...routeData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Başlangıç Koordinatı */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Başlangıç Koordinatı (Latitude, Longitude)
                  </label>
                  <input
                    type="text"
                    value={routeData.originCoords}
                    onChange={(e) => setRouteData({ ...routeData, originCoords: e.target.value })}
                    placeholder="40.87964279652424,29.255537227148615"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                  <p className="text-xs text-text-muted mt-1">Örnek: 40.87964279652424,29.255537227148615</p>
                </div>

                {/* Varış Koordinatı */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Varış Koordinatı (Latitude, Longitude)
                  </label>
                  <input
                    type="text"
                    value={routeData.destinationCoords}
                    onChange={(e) => setRouteData({ ...routeData, destinationCoords: e.target.value })}
                    placeholder="38.42297162766549,27.14327148023357"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                  <p className="text-xs text-text-muted mt-1">Örnek: 38.42297162766549,27.14327148023357</p>
                </div>

                {/* Otomatik Bilgiler */}
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <p className="text-sm text-text-secondary mb-2">
                    <strong className="text-text-primary">Otomatik Hesaplanan:</strong>
                  </p>
                  <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
                    <li>Mesafe: Google Maps API'den çekilir</li>
                    <li>Süre: Google Maps API'den çekilir</li>
                    <li>Başlangıç Fiyatı: Pricing tablosundan 1+1 basePrice alınır</li>
                  </ul>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveRoute} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Rota Bilgilerini Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Nakliyat Süreci */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                5.5. Nakliyat Süreci
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık ve açıklaması
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={processData.title}
                    onChange={(e) => setProcessData({ ...processData, title: e.target.value })}
                    placeholder="Nakliyat Sürecimiz"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={processData.description}
                    onChange={(html) => setProcessData({ ...processData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveProcess} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Nakliyat Süreci Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Galeri */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                6. Galeri
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık ve açıklaması
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={galleryData.title}
                    onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                    placeholder="Galeri"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={galleryData.description}
                    onChange={(html) => setGalleryData({ ...galleryData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Galeri Resimleri */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">
                    Galeri Resimleri
                  </label>
                  
                  {/* Upload Area */}
                  <div className="mb-4">
                    <label className="block">
                      <div className="p-6 border-2 border-dashed border-border rounded-lg bg-surface hover:bg-surface/80 cursor-pointer transition-colors">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-text-muted" />
                        <p className="text-sm text-text-secondary mb-2">
                          {uploading ? 'Yükleniyor...' : 'Resimleri sürükleyip bırakın veya tıklayarak seçin'}
                        </p>
                        <p className="text-xs text-text-muted">
                          Birden fazla resim seçebilirsiniz (JPG, PNG, WebP)
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Mevcut Resimler */}
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-text-primary">
                        Mevcut Galeri Resimleri
                      </p>
                      <a
                        href="/dashboard/media"
                        className="text-xs text-accent hover:underline"
                      >
                        Tümünü Yönet
                      </a>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {galleryData.images?.length > 0 ? (
                        galleryData.images.map((img: string, idx: number) => (
                          <div key={idx} className="relative aspect-square rounded-lg border border-border overflow-hidden group">
                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-error text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 text-center py-8 text-sm text-text-muted">
                          Henüz galeri resmi eklenmemiş
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Text */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Alt Açıklama Metni
                  </label>
                  <TipTapEditor
                    content={galleryData.footer}
                    onChange={(html) => setGalleryData({ ...galleryData, footer: html })}
                    minHeight={200}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveGallery} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Galeri Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Fiyatlandırma */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                7. Fiyatlandırma
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Premium fiyatlandırma tablosu - Başlık, açıklama ve bilgilendirme alanları
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={pricingData.title}
                    onChange={(e) => setPricingData({ ...pricingData, title: e.target.value })}
                    placeholder="Fiyatlandırma"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={pricingData.description}
                    onChange={(html) => setPricingData({ ...pricingData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Fiyat Paketleri */}
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Fiyat Paketleri</h4>
                  <div className="space-y-3">
                    {pricingData.packages?.map((pkg: any, index: number) => (
                      <div key={index} className="grid grid-cols-3 gap-3 p-3 bg-background rounded-lg border border-border">
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => {
                            const newPackages = [...pricingData.packages];
                            newPackages[index].name = e.target.value;
                            setPricingData({ ...pricingData, packages: newPackages });
                          }}
                          placeholder="Paket Adı"
                          className="px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                        <input
                          type="text"
                          value={pkg.priceRange}
                          onChange={(e) => {
                            const newPackages = [...pricingData.packages];
                            newPackages[index].priceRange = e.target.value;
                            setPricingData({ ...pricingData, packages: newPackages });
                          }}
                          placeholder="Fiyat Aralığı"
                          className="px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                        <input
                          type="text"
                          value={pkg.elevatorFee}
                          onChange={(e) => {
                            const newPackages = [...pricingData.packages];
                            newPackages[index].elevatorFee = e.target.value;
                            setPricingData({ ...pricingData, packages: newPackages });
                          }}
                          placeholder="Asansör Ücreti"
                          className="px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ek Hizmetler */}
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Ek Hizmetler</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {pricingData.additionalServices?.map((service: any, index: number) => (
                      <div key={index} className="flex gap-2 p-3 bg-background rounded-lg border border-border">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) => {
                            const newServices = [...pricingData.additionalServices];
                            newServices[index].name = e.target.value;
                            setPricingData({ ...pricingData, additionalServices: newServices });
                          }}
                          placeholder="Hizmet Adı"
                          className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                        <input
                          type="text"
                          value={service.price}
                          onChange={(e) => {
                            const newServices = [...pricingData.additionalServices];
                            newServices[index].price = e.target.value;
                            setPricingData({ ...pricingData, additionalServices: newServices });
                          }}
                          placeholder="Fiyat"
                          className="w-32 px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSavePricing} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Fiyatlandırma Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Hizmet Bölgeleri */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                8. Hizmet Bölgeleri
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık ve açıklaması
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={regionsData.title}
                    onChange={(e) => setRegionsData({ ...regionsData, title: e.target.value })}
                    placeholder="Hizmet Bölgelerimiz"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Açıklaması
                  </label>
                  <TipTapEditor
                    content={regionsData.description}
                    onChange={(html) => setRegionsData({ ...regionsData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await fetch('/api/content/regions-showcase', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(regionsData)
                      });
                      if (res.ok) {
                        showToast('Hizmet Bölgeleri kaydedildi!', 'success');
                      } else {
                        showToast('Kaydetme başarısız!', 'error');
                      }
                    } catch (error) {
                      showToast('Kaydetme başarısız!', 'error');
                    } finally {
                      setLoading(false);
                    }
                  }} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'Hizmet Bölgeleri Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* SSS */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                9. SSS (Sık Sorulan Sorular)
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Section başlık ve açıklaması
              </p>
              
              <div className="space-y-6">
                {/* Section Başlık */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Section Başlığı
                  </label>
                  <input
                    type="text"
                    value={faqData.title}
                    onChange={(e) => setFaqData({ ...faqData, title: e.target.value })}
                    placeholder="Sıkça Sorulan Sorular"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>

                {/* Section Açıklama */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Section Açıklaması</label>
                  <TipTapEditor
                    content={faqData.description}
                    onChange={(html) => setFaqData({ ...faqData, description: html })}
                    minHeight={100}
                  />
                  <p className="text-xs text-text-muted mt-1">HTML/Visual toggle ile düzenleyebilirsiniz</p>
                </div>

                {/* FAQ Listesi */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-text-primary">
                      Soru & Cevaplar
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newFaqs = [...(faqData.faqs || []), { q: '', a: '' }];
                        setFaqData({ ...faqData, faqs: newFaqs });
                      }}
                      className="px-3 py-1 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
                    >
                      + Yeni Soru Ekle
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {faqData.faqs?.map((faq: any, index: number) => (
                      <div key={index} className="p-4 bg-background rounded-lg border border-border space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-text-primary">Soru {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newFaqs = faqData.faqs.filter((_: any, i: number) => i !== index);
                              setFaqData({ ...faqData, faqs: newFaqs });
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
                              const newFaqs = [...faqData.faqs];
                              newFaqs[index].q = e.target.value;
                              setFaqData({ ...faqData, faqs: newFaqs });
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
                              const newFaqs = [...faqData.faqs];
                              newFaqs[index].a = e.target.value;
                              setFaqData({ ...faqData, faqs: newFaqs });
                            }}
                            rows={3}
                            placeholder="Cevap..."
                            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-border">
                  <Button onClick={handleSaveFaq} disabled={loading} size="lg">
                    {loading ? 'Kaydediliyor...' : 'SSS Kaydet'}
                  </Button>
                </div>
              </div>
            </div>

            {/* SEO İçerik (Alt) */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                12. SEO İçerik (Alt)
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                500-800 kelimelik detaylı SEO makalesi - TipTap editör ile HTML formatında yazın
              </p>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">Başlık</label>
                <input
                  type="text"
                  value={seoBottomData.title}
                  onChange={(e) => setSeoBottomData({ ...seoBottomData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  placeholder="SEO İçerik Başlığı"
                />
              </div>

              {/* TipTap Editor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-primary mb-2">İçerik</label>
                <TipTapEditor
                  content={seoBottomData.content}
                  onChange={(html) => setSeoBottomData({ ...seoBottomData, content: html })}
                  minHeight={200}
                />
                <p className="text-xs text-text-muted mt-2">
                  HTML formatında kaydedilir. Bold, Italic, Başlıklar, Listeler, Linkler kullanabilirsiniz.
                </p>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-border mt-6">
                <Button onClick={handleSaveSeoBottom} disabled={loading} size="lg">
                  {loading ? 'Kaydediliyor...' : 'SEO İçerik Kaydet'}
                </Button>
              </div>
            </div>

          </div>
        )}

        {/* Hakkımızda Sections */}
        {activeTab === 'hakkimizda' && (
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Sayfa Açıklaması
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Hakkımızda sayfası hero bölümünde görünecek açıklama metni
              </p>
              <input
                type="text"
                value={aboutData.description}
                onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                placeholder="Hakkımızda sayfası açıklama metni"
              />
            </div>

            {/* Hikayemiz */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                1. Hikayemiz
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                2014 kuruluş, 10+ yıl tecrübe hikayesi
              </p>
              <TipTapEditor
                content={aboutData.story.content}
                onChange={(html) => setAboutData({ ...aboutData, story: { content: html } })}
                minHeight={100}
              />
            </div>

            {/* Misyon & Vizyon */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                2. Misyon & Vizyon
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                2 kolon - Misyon ve Vizyon metinleri
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Misyonumuz</label>
                  <TipTapEditor
                    content={aboutData.mission.content}
                    onChange={(html) => setAboutData({ ...aboutData, mission: { content: html } })}
                    minHeight={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Vizyonumuz</label>
                  <TipTapEditor
                    content={aboutData.vision.content}
                    onChange={(html) => setAboutData({ ...aboutData, vision: { content: html } })}
                    minHeight={100}
                  />
                </div>
              </div>
            </div>

            {/* Değerlerimiz */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                3. Değerlerimiz
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                4 değer kartı - Güvenilirlik, Profesyonellik, Müşteri Memnuniyeti, Şeffaflık
              </p>
              <TipTapEditor
                content={aboutData.values.content}
                onChange={(html) => setAboutData({ ...aboutData, values: { content: html } })}
                minHeight={100}
              />
            </div>

            {/* Neden Biz */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                4. Neden Bizi Tercih Etmelisiniz?
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                4 özellik kartı - 10+ Yıl, Sigortalı Taşıma, Profesyonel Ekip, Uygun Fiyat
              </p>
              <TipTapEditor
                content={aboutData.whyUs.content}
                onChange={(html) => setAboutData({ ...aboutData, whyUs: { content: html } })}
                minHeight={100}
              />
            </div>

            {/* Save Button */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <Button onClick={handleSaveAbout} disabled={loading} size="lg">
                {loading ? 'Kaydediliyor...' : 'Hakkımızda İçeriklerini Kaydet'}
              </Button>
            </div>
          </div>
        )}

        {/* İletişim Section */}
        {activeTab === 'iletisim' && (
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Sayfa Açıklaması
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                İletişim sayfası hero bölümünde görünecek açıklama metni
              </p>
              <input
                type="text"
                value={contactData.description}
                onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                placeholder="Bize ulaşın, ücretsiz fiyat teklifi alın. 7/24 müşteri desteği ile yanınızdayız."
              />
            </div>

            {/* Save Button */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <Button onClick={handleSaveContact} disabled={loading} size="lg">
                {loading ? 'Kaydediliyor...' : 'İletişim İçeriğini Kaydet'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
