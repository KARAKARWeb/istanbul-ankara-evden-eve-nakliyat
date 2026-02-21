import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';

export interface ImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export interface ImageUploadResult {
  filename: string;
  path: string;
  url: string;
  width: number;
  height: number;
  size: number;
}

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Upload klasörünü oluştur
export async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

// Orijinal dosya adından güvenli isim oluştur
export function sanitizeFilename(filename: string): string {
  // Uzantıyı ayır
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  
  // Türkçe karakterleri değiştir ve güvenli hale getir
  return name
    .replace(/İ/g, 'i')  // Büyük İ -> küçük i
    .replace(/I/g, 'i')  // Büyük I -> küçük i
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Benzersiz dosya adı oluştur (duplicate kontrolü ile)
export async function generateUniqueFilename(originalName: string, format: string): Promise<string> {
  const safeName = sanitizeFilename(originalName);
  let filename = `${safeName}.${format}`;
  let counter = 1;
  
  // Dosya var mı kontrol et
  while (true) {
    try {
      const filepath = path.join(UPLOAD_DIR, filename);
      await fs.access(filepath);
      // Dosya var, counter ekle
      filename = `${safeName}-${counter}.${format}`;
      counter++;
    } catch {
      // Dosya yok, bu ismi kullanabiliriz
      break;
    }
  }
  
  return filename;
}

// Resim yükle ve optimize et
export async function uploadImage(
  buffer: Buffer,
  options: ImageUploadOptions = {},
  originalFilename?: string
): Promise<ImageUploadResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 85,
    format = 'webp',
  } = options;

  // Dosya boyutu kontrolü
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error('Dosya boyutu çok büyük (max 5MB)');
  }

  await ensureUploadDir();

  // Sharp ile resmi işle
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Resize ve optimize
  const processedImage = image
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFormat(format, { quality });

  // Dosya adı oluştur (orijinal isimden veya timestamp'ten)
  const filename = originalFilename 
    ? await generateUniqueFilename(originalFilename, format)
    : `${Date.now()}.${format}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  // Kaydet
  await processedImage.toFile(filepath);

  // Dosya bilgilerini al
  const stats = await fs.stat(filepath);
  const processedMetadata = await sharp(filepath).metadata();

  return {
    filename,
    path: filepath,
    url: `/uploads/${filename}`,
    width: processedMetadata.width || 0,
    height: processedMetadata.height || 0,
    size: stats.size,
  };
}

// Resim sil
export async function deleteImage(filename: string): Promise<boolean> {
  try {
    const filepath = path.join(UPLOAD_DIR, filename);
    await fs.unlink(filepath);
    return true;
  } catch (error) {
    console.error('Resim silinemedi:', error);
    return false;
  }
}

// Tüm resimleri listele
export async function listImages(): Promise<string[]> {
  try {
    await ensureUploadDir();
    const files = await fs.readdir(UPLOAD_DIR);
    return files.filter(file => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );
  } catch (error) {
    console.error('Resimler listelenemedi:', error);
    return [];
  }
}

// Resim bilgilerini al
export async function getImageInfo(filename: string) {
  try {
    const filepath = path.join(UPLOAD_DIR, filename);
    const stats = await fs.stat(filepath);
    const metadata = await sharp(filepath).metadata();

    return {
      filename,
      url: `/uploads/${filename}`,
      width: metadata.width || 0,
      height: metadata.height || 0,
      size: stats.size,
      format: metadata.format,
      createdAt: stats.birthtime,
    };
  } catch (error) {
    console.error('Resim bilgisi alınamadı:', error);
    return null;
  }
}
