'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BulkRegionForm } from '@/components/dashboard/BulkRegionForm';
import { SingleRegionForm } from '@/components/dashboard/SingleRegionForm';
import { Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function RegionsPage() {
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadRegions();
    loadDescription();
  }, []);

  const loadDescription = async () => {
    try {
      const response = await fetch('/api/content/regions-showcase');
      const data = await response.json();
      setDescription(data.pageDescription || '');
    } catch (error) {
      console.error('Description load error:', error);
    }
  };

  const saveDescription = async () => {
    try {
      await fetch('/api/content/regions-showcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageDescription: description }),
      });
      alert('Açıklama kaydedildi!');
    } catch (error) {
      alert('Kaydetme hatası!');
    }
  };

  const loadRegions = async () => {
    try {
      const response = await fetch('/api/regions');
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRegion = async (id: string) => {
    if (!confirm('Bu bölgeyi silmek istediğinize emin misiniz?')) return;

    try {
      await fetch(`/api/regions/${id}`, { method: 'DELETE' });
      loadRegions();
    } catch (error) {
      alert('Silme hatası!');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(regions.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      alert('Lütfen en az bir bölge seçin!');
      return;
    }

    if (!confirm(`${selectedIds.length} bölgeyi silmek istediğinize emin misiniz?`)) return;

    setDeleting(true);
    try {
      const response = await fetch('/api/regions/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`${data.deletedCount} bölge başarıyla silindi!`);
        setSelectedIds([]);
        loadRegions();
      } else {
        alert('Silme hatası!');
      }
    } catch (error) {
      alert('Silme hatası!');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-text-primary mb-8">Bölge Yönetimi</h1>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Bölge Listesi ({regions.length})</TabsTrigger>
            <TabsTrigger value="single">Tekli Ekle</TabsTrigger>
            <TabsTrigger value="bulk">Toplu Ekle</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            {/* Description Field */}
            <div className="mb-4 bg-background p-4 rounded-xl border border-border">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bölgeler Sayfası Açıklaması
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                placeholder="Bölgeler sayfası açıklama metni"
              />
              <p className="text-xs text-text-muted mt-1">
                Bölgeler sayfası hero bölümünde görünecek açıklama metni
              </p>
            </div>

            {selectedIds.length > 0 && (
              <div className="mb-4 flex items-center justify-between bg-accent/10 border border-accent/20 rounded-lg p-4">
                <span className="text-sm font-medium text-text-primary">
                  {selectedIds.length} bölge seçildi
                </span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={deleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {deleting ? 'Siliniyor...' : 'Seçilenleri Sil'}
                </Button>
              </div>
            )}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="p-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === regions.length && regions.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-semibold text-text-primary">Bölge</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-primary">Mesafe</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-primary">Fiyat</th>
                    <th className="text-left p-4 text-sm font-semibold text-text-primary">Durum</th>
                    <th className="text-right p-4 text-sm font-semibold text-text-primary">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region) => (
                    <tr key={region.id} className="border-b border-border last:border-0">
                      <td className="p-4 w-12">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(region.id)}
                          onChange={(e) => handleSelectOne(region.id, e.target.checked)}
                          className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-text-primary">{region.title}</div>
                          <div className="text-sm text-text-secondary">{region.slug || region.id}</div>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary">{region.distance} km</td>
                      <td className="p-4 text-text-secondary">{region.priceMin}₺ - {region.priceMax}₺</td>
                      <td className="p-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          region.active ? 'bg-accent/10 text-accent' : 'bg-surface text-text-muted'
                        }`}>
                          {region.active ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/${region.slug}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" title="Hızlı Görüntüle">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </Button>
                          </Link>
                          <div className="flex items-center gap-2">
                          <Link href={`/dashboard/regions/${region.id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Düzenle"
                            >
                              <Edit className="w-4 h-4 text-accent" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteRegion(region.id)}
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </Button>
                        </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {regions.length === 0 && (
                <div className="p-8 text-center text-text-secondary">
                  Henüz bölge eklenmemiş. Toplu Ekle sekmesinden bölge ekleyebilirsiniz.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="single">
            <SingleRegionForm />
          </TabsContent>

          <TabsContent value="bulk">
            <BulkRegionForm />
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Bölgeler Sayfası Ayarları
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Sayfa Açıklaması
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                    placeholder="Bölgeler sayfası açıklama metni"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Bölgeler sayfası hero bölümünde görünecek açıklama metni
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <Button size="lg" onClick={saveDescription}>
                    Ayarları Kaydet
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
