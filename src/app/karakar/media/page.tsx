'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';

export default function MediaPage() {
  const { toasts, showToast, removeToast } = useToast();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const res = await fetch('/api/upload/list');
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Resimler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await loadImages();
        showToast('Resim başarıyla yüklendi!', 'success');
      } else {
        showToast('Yükleme başarısız!', 'error');
      }
    } catch (error) {
      console.error('Upload hatası:', error);
      showToast('Yükleme başarısız!', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Resmi silmek istediğinize emin misiniz?')) return;

    try {
      const res = await fetch(`/api/upload/${filename}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await loadImages();
        showToast('Resim başarıyla silindi!', 'success');
      } else {
        showToast('Silme başarısız!', 'error');
      }
    } catch (error) {
      console.error('Silme hatası:', error);
      showToast('Silme başarısız!', 'error');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('URL kopyalandı!', 'success');
  };

  return (
    <>
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary mb-2">
                Medya Yönetimi
              </h1>
              <p className="text-text-secondary">
                Resimleri yükleyin ve yönetin
              </p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
              <Button
                disabled={uploading}
                className="bg-accent hover:bg-accent/90"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Yükleniyor...' : 'Resim Yükle'}
                </span>
              </Button>
            </label>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-text-secondary">Yükleniyor...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-text-secondary">Henüz resim yüklenmemiş</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.filename}
                  className="bg-background rounded-xl border border-border overflow-hidden group"
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => copyUrl(image.url)}
                        className="px-3 py-1 bg-white text-black rounded-lg text-sm"
                      >
                        URL Kopyala
                      </button>
                      <button
                        onClick={() => handleDelete(image.filename)}
                        className="p-2 bg-error text-white rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-text-secondary truncate">
                      {image.filename}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {image.width} × {image.height} • {Math.round(image.size / 1024)}KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
