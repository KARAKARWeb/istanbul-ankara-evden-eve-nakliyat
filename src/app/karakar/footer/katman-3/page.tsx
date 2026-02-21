'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Link {
  id: string;
  title: string;
  url: string;
  rel: string;
  target?: string;
  order: number;
}

export default function FooterLayer3Page() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/footer/layer-3')
      .then(r => r.json())
      .then(data => setLinks(data.links || []));
  }, []);

  const addLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: '',
      url: '',
      rel: '',
      target: '',
      order: links.length + 1,
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: keyof Link, value: string | number) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const toggleRelValue = (id: string, relValue: string) => {
    setLinks(links.map(link => {
      if (link.id !== id) return link;
      
      const currentRels = link.rel ? link.rel.split(' ').filter(r => r) : [];
      const hasValue = currentRels.includes(relValue);
      
      let newRels;
      if (hasValue) {
        newRels = currentRels.filter(r => r !== relValue);
      } else {
        newRels = [...currentRels, relValue];
      }
      
      return { ...link, rel: newRels.join(' ') };
    }));
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/footer/layer-3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ links }),
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Footer Katman 3 - Linkler</h1>
            <p className="text-text-secondary mt-1">Alt footer linklerini yönetin</p>
          </div>
          <Button onClick={addLink}>
            <Plus className="w-4 h-4 mr-2" />
            Link Ekle
          </Button>
        </div>

        <div className="space-y-6">
          {links.map((link, index) => (
            <div key={link.id} className="bg-background rounded-xl border border-border overflow-hidden">
              {/* Header */}
              <div className="bg-surface px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-5 h-5 text-text-muted" />
                  <h3 className="font-semibold text-text-primary">Link #{index + 1}</h3>
                  {link.title && <span className="text-sm text-text-muted">- {link.title}</span>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteLink(link.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Temel Bilgiler */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">Temel Bilgiler</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Başlık
                      </label>
                      <Input
                        value={link.title}
                        onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                        placeholder="SSS"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        URL
                      </label>
                      <Input
                        value={link.url}
                        onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                        placeholder="/#sss"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO ve Güvenlik Ayarları */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">SEO ve Güvenlik Ayarları</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3">
                      Rel Attribute
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${link.id}-nofollow`}
                          checked={link.rel.split(' ').includes('nofollow')}
                          onCheckedChange={() => toggleRelValue(link.id, 'nofollow')}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label htmlFor={`${link.id}-nofollow`} className="text-sm font-medium cursor-pointer block">
                            Nofollow
                          </label>
                          <p className="text-xs text-text-muted mt-0.5">
                            Google bu linki takip etmez, SEO değeri geçmez
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${link.id}-noopener`}
                          checked={link.rel.split(' ').includes('noopener')}
                          onCheckedChange={() => toggleRelValue(link.id, 'noopener')}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label htmlFor={`${link.id}-noopener`} className="text-sm font-medium cursor-pointer block">
                            Noopener
                          </label>
                          <p className="text-xs text-text-muted mt-0.5">
                            Güvenlik için, yeni pencerede açılan linklerde kullanılır
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${link.id}-noreferrer`}
                          checked={link.rel.split(' ').includes('noreferrer')}
                          onCheckedChange={() => toggleRelValue(link.id, 'noreferrer')}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label htmlFor={`${link.id}-noreferrer`} className="text-sm font-medium cursor-pointer block">
                            Noreferrer
                          </label>
                          <p className="text-xs text-text-muted mt-0.5">
                            Referrer bilgisi göndermez, gizlilik için kullanılır
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${link.id}-sponsored`}
                          checked={link.rel.split(' ').includes('sponsored')}
                          onCheckedChange={() => toggleRelValue(link.id, 'sponsored')}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label htmlFor={`${link.id}-sponsored`} className="text-sm font-medium cursor-pointer block">
                            Sponsored
                          </label>
                          <p className="text-xs text-text-muted mt-0.5">
                            Ödenen/sponsorlu linkler için, Google'a bildirir
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`${link.id}-ugc`}
                          checked={link.rel.split(' ').includes('ugc')}
                          onCheckedChange={() => toggleRelValue(link.id, 'ugc')}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label htmlFor={`${link.id}-ugc`} className="text-sm font-medium cursor-pointer block">
                            UGC
                          </label>
                          <p className="text-xs text-text-muted mt-0.5">
                            Kullanıcı tarafından oluşturulan içerik (yorum, forum vb.)
                          </p>
                        </div>
                      </div>
                      <div className="bg-surface p-4 rounded-lg mt-3">
                        <p className="text-xs text-text-muted">
                          ℹ️ Birden fazla seçebilirsiniz. Boş bırakırsanız Dofollow olur (Google SEO değeri geçer)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${link.id}-target`}
                        checked={link.target === '_blank'}
                        onCheckedChange={(checked) => updateLink(link.id, 'target', checked ? '_blank' : '')}
                      />
                      <label htmlFor={`${link.id}-target`} className="text-sm font-medium cursor-pointer">
                        Linki yeni sekmede aç (target="_blank")
                      </label>
                    </div>
                    <p className="text-xs text-text-muted mt-2 ml-6">
                      Yeni sekmede açılan linkler için noopener ve noreferrer kullanmanız önerilir
                    </p>
                  </div>
                </div>

                {/* Sıralama */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-text-primary pb-2 border-b border-border">Sıralama</h4>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Görüntülenme Sırası
                    </label>
                    <Input
                      type="number"
                      value={link.order}
                      onChange={(e) => updateLink(link.id, 'order', parseInt(e.target.value))}
                      className="w-32"
                    />
                    <p className="text-xs text-text-muted mt-1">Küçük sayı önce görünür</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center py-12 bg-surface rounded-lg border border-border">
            <p className="text-text-muted">Henüz link eklenmemiş</p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} disabled={loading} size="lg">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  );
}
