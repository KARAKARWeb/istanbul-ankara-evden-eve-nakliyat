'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function FooterManagementPage() {
  const [footer, setFooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadFooter();
  }, []);

  const loadFooter = async () => {
    try {
      const res = await fetch('/api/footer');
      if (res.ok) {
        const data = await res.json();
        setFooter(data);
      }
    } catch (error) {
      console.error('Footer yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footer),
      });

      if (res.ok) {
        alert('Footer kaydedildi!');
      } else {
        alert('Kaydetme başarısız!');
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Kaydetme başarısız!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-text-secondary">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary mb-2">
                Footer Yönetimi
              </h1>
              <p className="text-text-secondary">
                4 katmanlı footer yapısını düzenleyin
              </p>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-accent hover:bg-accent/90"
            >
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>

          <div className="space-y-6">
            {/* Layer 1 - Hızlı Erişim */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Katman 1: Hızlı Erişim</h3>
              <input
                type="text"
                value={footer?.layer1?.title || ''}
                onChange={(e) => setFooter({
                  ...footer,
                  layer1: { ...footer.layer1, title: e.target.value }
                })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface mb-4"
                placeholder="Başlık"
              />
              <div className="space-y-2">
                {footer?.layer1?.links?.map((link: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...footer.layer1.links];
                        newLinks[i].label = e.target.value;
                        setFooter({
                          ...footer,
                          layer1: { ...footer.layer1, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface"
                      placeholder="Link Adı"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...footer.layer1.links];
                        newLinks[i].href = e.target.value;
                        setFooter({
                          ...footer,
                          layer1: { ...footer.layer1, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface"
                      placeholder="URL"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Layer 2 - Hizmetler */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Katman 2: Hizmetler</h3>
              <input
                type="text"
                value={footer?.layer2?.title || ''}
                onChange={(e) => setFooter({
                  ...footer,
                  layer2: { ...footer.layer2, title: e.target.value }
                })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface mb-4"
                placeholder="Başlık"
              />
              <div className="space-y-2">
                {footer?.layer2?.links?.map((link: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...footer.layer2.links];
                        newLinks[i].label = e.target.value;
                        setFooter({
                          ...footer,
                          layer2: { ...footer.layer2, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface"
                      placeholder="Link Adı"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...footer.layer2.links];
                        newLinks[i].href = e.target.value;
                        setFooter({
                          ...footer,
                          layer2: { ...footer.layer2, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-surface"
                      placeholder="URL"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Layer 3 - İletişim */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Katman 3: İletişim</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={footer?.layer3?.title || ''}
                  onChange={(e) => setFooter({
                    ...footer,
                    layer3: { ...footer.layer3, title: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface"
                  placeholder="Başlık"
                />
                <input
                  type="tel"
                  value={footer?.layer3?.phone || ''}
                  onChange={(e) => setFooter({
                    ...footer,
                    layer3: { ...footer.layer3, phone: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface"
                  placeholder="Telefon"
                />
                <input
                  type="email"
                  value={footer?.layer3?.email || ''}
                  onChange={(e) => setFooter({
                    ...footer,
                    layer3: { ...footer.layer3, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={footer?.layer3?.address || ''}
                  onChange={(e) => setFooter({
                    ...footer,
                    layer3: { ...footer.layer3, address: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface"
                  placeholder="Adres"
                />
              </div>
            </div>

            {/* Layer 4 - Sosyal & Copyright */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text-primary mb-4">Katman 4: Sosyal Medya & Copyright</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={footer?.layer4?.copyright || ''}
                  onChange={(e) => setFooter({
                    ...footer,
                    layer4: { ...footer.layer4, copyright: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface"
                  placeholder="Copyright Metni"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
