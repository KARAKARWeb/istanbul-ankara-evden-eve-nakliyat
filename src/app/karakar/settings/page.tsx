'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [siteData, setSiteData] = useState<any>(null);
  const [contactData, setContactData] = useState<any>(null);
  const [hoursData, setHoursData] = useState<any>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [codesData, setCodesData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [site, contact, hours, route, codes] = await Promise.all([
        fetch('/api/settings/site').then(r => r.json()),
        fetch('/api/settings/contact').then(r => r.json()),
        fetch('/api/settings/hours').then(r => r.json()),
        fetch('/api/settings/route-info').then(r => r.json()),
        fetch('/api/settings/custom-codes').then(r => r.json()),
      ]);
      setSiteData(site);
      setContactData(contact);
      setHoursData(hours);
      setRouteData(route);
      setCodesData(codes);
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData),
      });
      alert('Site bilgileri kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const saveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      alert('İletişim bilgileri kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const saveHours = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings/hours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hoursData),
      });
      alert('Çalışma saatleri kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const saveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings/route-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(routeData),
      });
      alert('Rota bilgileri kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  const saveCodes = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/settings/custom-codes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(codesData),
      });
      alert('Özel kodlar kaydedildi!');
    } catch (error) {
      alert('Hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  if (!siteData) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-text-primary mb-8">Site Ayarları</h1>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList>
            <TabsTrigger value="site">Site Bilgileri</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
            <TabsTrigger value="hours">Çalışma Saatleri</TabsTrigger>
            <TabsTrigger value="route">Rota Bilgileri</TabsTrigger>
            <TabsTrigger value="codes">Özel Kodlar</TabsTrigger>
          </TabsList>

          <TabsContent value="site">
            <form onSubmit={saveSite} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div>
                <Label>Site Adı</Label>
                <Input
                  value={siteData.siteName}
                  onChange={(e) => setSiteData({ ...siteData, siteName: e.target.value })}
                />
              </div>
              <div>
                <Label>Domain</Label>
                <Input
                  value={siteData.domain}
                  onChange={(e) => setSiteData({ ...siteData, domain: e.target.value })}
                />
              </div>
              <div>
                <Label>Açıklama</Label>
                <Textarea
                  value={siteData.description}
                  onChange={(e) => setSiteData({ ...siteData, description: e.target.value })}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="contact">
            <form onSubmit={saveContact} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Telefon</Label>
                  <Input
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+90 532 138 4979"
                  />
                </div>
                <div>
                  <Label>WhatsApp Numarası</Label>
                  <Input
                    value={contactData.whatsappNumber || ''}
                    onChange={(e) => setContactData({ ...contactData, whatsappNumber: e.target.value })}
                    placeholder="+90 532 138 4979"
                  />
                  <p className="text-xs text-text-muted mt-1">Ülke kodu ile birlikte (+90...)</p>
                </div>
              </div>
              <div>
                <Label>Adres</Label>
                <Textarea
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                />
              </div>
              <div className="bg-surface p-4 rounded-lg">
                <p className="text-sm text-text-secondary">
                  <strong>Email:</strong> info@{siteData.domain}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Email adresi otomatik olarak domain'den oluşturulur
                </p>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="hours">
            <form onSubmit={saveHours} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hafta İçi Açılış</Label>
                  <Input
                    type="time"
                    value={hoursData.weekdays.open}
                    onChange={(e) => setHoursData({
                      ...hoursData,
                      weekdays: { ...hoursData.weekdays, open: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label>Hafta İçi Kapanış</Label>
                  <Input
                    type="time"
                    value={hoursData.weekdays.close}
                    onChange={(e) => setHoursData({
                      ...hoursData,
                      weekdays: { ...hoursData.weekdays, close: e.target.value }
                    })}
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="route">
            <form onSubmit={saveRoute} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kaynak Şehir</Label>
                  <Input
                    value={routeData.sourceCity}
                    onChange={(e) => setRouteData({ ...routeData, sourceCity: e.target.value, fromCity: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Hedef Şehir</Label>
                  <Input
                    value={routeData.targetCity}
                    onChange={(e) => setRouteData({ ...routeData, targetCity: e.target.value, toCity: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Mesafe (km)</Label>
                  <Input
                    type="number"
                    value={routeData.distance}
                    onChange={(e) => setRouteData({ ...routeData, distance: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Süre (saat)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={routeData.duration}
                    onChange={(e) => setRouteData({ ...routeData, duration: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Min Fiyat (₺)</Label>
                  <Input
                    type="number"
                    value={routeData.priceMin}
                    onChange={(e) => setRouteData({ ...routeData, priceMin: parseInt(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Yeni eklenen bölgeler bu fiyatı otomatik alır
                  </p>
                </div>
              </div>
              {/* Min Fiyat Güncelleme */}
              <div className="col-span-2 bg-accent/10 p-4 rounded-lg border border-accent/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">
                      Mevcut Bölgeleri Güncelle (Fiyat)
                    </h4>
                    <p className="text-xs text-text-muted">
                      Fiyat: {routeData.priceMin}₺ ± 50₺ rastgele (Min: 1000₺)
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!confirm(`TÜM bölgelere rastgele fiyat (${routeData.priceMin}±50₺) atanacak. Devam edilsin mi?`)) return;
                      setLoading(true);
                      try {
                        const response = await fetch('/api/regions/sync-prices', {
                          method: 'POST',
                        });
                        const data = await response.json();
                        if (response.ok) {
                          alert(`${data.updatedCount} bölge güncellendi!\nBase Fiyat: ${data.basePriceMin}₺`);
                        } else {
                          alert('Güncelleme başarısız!');
                        }
                      } catch (error) {
                        alert('Güncelleme başarısız!');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="bg-accent hover:bg-accent-hover"
                  >
                    Fiyat Rastgele Ata
                  </Button>
                </div>
              </div>

              {/* Mesafe/Süre Rastgele Güncelleme */}
              <div className="col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">
                      Mevcut Bölgeleri Güncelle (Mesafe/Süre)
                    </h4>
                    <p className="text-xs text-text-muted">
                      Mesafe: {routeData.distance}km ± 50km rastgele | Süre: {routeData.duration}sa ± 0.5sa rastgele
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={async () => {
                      if (!confirm(`TÜM bölgelere rastgele mesafe (${routeData.distance}±50km) ve süre (${routeData.duration}±0.5sa) atanacak. Devam edilsin mi?`)) return;
                      setLoading(true);
                      try {
                        const response = await fetch('/api/regions/sync-route-info', {
                          method: 'POST',
                        });
                        const data = await response.json();
                        if (response.ok) {
                          alert(`${data.updatedCount} bölge güncellendi!\nBase Mesafe: ${data.baseDistance}km\nBase Süre: ${data.baseDuration}sa`);
                        } else {
                          alert('Güncelleme başarısız!');
                        }
                      } catch (error) {
                        alert('Güncelleme başarısız!');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Mesafe/Süre Rastgele Ata
                  </Button>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="codes">
            <form onSubmit={saveCodes} className="bg-background p-6 rounded-xl border border-border space-y-4">
              <div>
                <Label>Head Start (Analytics, vb.)</Label>
                <Textarea
                  rows={4}
                  value={codesData.headStart}
                  onChange={(e) => setCodesData({ ...codesData, headStart: e.target.value })}
                  placeholder="<script>...</script>"
                />
              </div>
              <div>
                <Label>Body Start</Label>
                <Textarea
                  rows={4}
                  value={codesData.bodyStart}
                  onChange={(e) => setCodesData({ ...codesData, bodyStart: e.target.value })}
                />
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
