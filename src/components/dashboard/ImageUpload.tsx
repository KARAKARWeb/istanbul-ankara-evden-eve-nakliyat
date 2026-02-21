'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Basit base64 dönüşümü (gerçek projede S3/Cloudinary kullanılmalı)
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full h-64 border border-border rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Upload"
            fill
            className="object-cover"
          />
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-surface transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-12 h-12 text-text-muted mb-3" />
            <p className="mb-2 text-sm text-text-secondary">
              <span className="font-semibold">Tıklayın</span> veya sürükleyin
            </p>
            <p className="text-xs text-text-muted">PNG, JPG, GIF (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      {uploading && (
        <p className="text-sm text-text-secondary text-center">Yükleniyor...</p>
      )}
    </div>
  );
}
