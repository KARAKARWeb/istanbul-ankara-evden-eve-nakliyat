'use client';

import { useState, useEffect } from 'react';
import { TiptapEditor } from '@/components/dashboard/TiptapEditor';
import { Button } from '@/components/ui/button';

export default function SeoTopContentPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await fetch('/api/content/seo-top');
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || '');
      }
    } catch (error) {
      console.error('İçerik yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/seo-top', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        alert('İçerik kaydedildi!');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">
              SEO Makale (Üst)
            </h1>
            <p className="text-text-secondary">
              Ana sayfa üst SEO içeriği - 200-300 kelime
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

        <div className="bg-background rounded-xl border border-border p-6">
          <TiptapEditor
            content={content}
            onChange={setContent}
          />
        </div>
    </div>
  );
}
