import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  sourceCity: z.string().min(1, 'Nereden seçiniz'),
  targetCity: z.string().min(1, 'Nereye seçiniz'),
  houseType: z.string().min(1, 'Ev tipi seçiniz'),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Price Quote Form Schema
export const priceQuoteSchema = z.object({
  fullName: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz').optional(),
  sourceCity: z.string().min(1, 'Nereden seçiniz'),
  targetCity: z.string().min(1, 'Nereye seçiniz'),
  houseType: z.string().min(1, 'Ev tipi seçiniz'),
  elevator: z.enum(['yes', 'no']),
  moveDate: z.string().optional(),
  notes: z.string().optional(),
});

export type PriceQuoteData = z.infer<typeof priceQuoteSchema>;

// Dashboard Login Schema
export const loginSchema = z.object({
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export type LoginData = z.infer<typeof loginSchema>;

// Region Schema
export const regionSchema = z.object({
  sourceCity: z.string().min(1, 'Kaynak şehir gereklidir'),
  targetCity: z.string().min(1, 'Hedef şehir gereklidir'),
  distance: z.string().min(1, 'Mesafe gereklidir'),
  duration: z.string().min(1, 'Süre gereklidir'),
  priceMin: z.number().min(0, 'Minimum fiyat 0\'dan büyük olmalıdır'),
  priceMax: z.number().min(0, 'Maximum fiyat 0\'dan büyük olmalıdır'),
});

export type RegionData = z.infer<typeof regionSchema>;
