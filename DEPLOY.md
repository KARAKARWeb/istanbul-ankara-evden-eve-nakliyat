# 🚀 Vercel Deploy Rehberi

## ✅ ÖN KONTROL

Build başarılı! Proje deploy'a hazır.

### Hardcode Kontrol Sonuçları:
- ✅ KARAKAR Web bilgileri sadece footer'da (constants/index.ts - KARAKAR_WEB)
- ✅ Tüm schema'lar dinamik (generateSchemas.ts)
- ✅ Layout.tsx dinamik metadata
- ✅ API fallback'ler temiz
- ✅ Dashboard URL: /karakar
- ✅ 24 bölge içeriği hazır

---

## 📋 VERCEL DEPLOY ADIMLARI

### Yöntem 1: GitHub + Vercel (ÖNERİLEN)

#### 1. GitHub'a Push
```bash
# Git repo oluştur (henüz yoksa)
git init
git add .
git commit -m "Initial commit - Production ready"

# GitHub'a push
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

#### 2. Vercel'e Bağla
1. https://vercel.com/dashboard adresine git
2. **"Add New Project"** tıkla
3. **"Import Git Repository"** seç
4. GitHub repo'nu seç
5. **Framework Preset:** Next.js (otomatik algılanır)
6. **Root Directory:** `.` (varsayılan)

#### 3. Environment Variables Ekle

Vercel dashboard'da **"Environment Variables"** bölümüne şunları ekle:

```bash
# Site Ayarları
NEXT_PUBLIC_SITE_URL=https://DOMAIN.com
NEXT_PUBLIC_SITE_NAME=İstanbul İzmir Evden Eve Nakliyat

# Dashboard Admin (KARAKAR Web için)
DASHBOARD_USERNAME=info@karakar.web.tr
DASHBOARD_PASSWORD_HASH=$2b$10$Mec.3DaYBhxncYJIRMvDLOV01pLzzzKLppi22xr8FVDvxBJ5gUEb.

# SMTP (Gmail örneği)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@domain.com
SMTP_PASS=your-app-password

# Google Maps API
GOOGLE_MAPS_API_KEY=your-api-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key

# Analytics (opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**ÖNEMLİ:** 
- `NEXT_PUBLIC_SITE_URL` → Canlı domain adresiniz (https://domain.com)
- `DASHBOARD_PASSWORD_HASH` → `$` karakterleri escape edilmeden yazılmalı

#### 4. Deploy Et
- **"Deploy"** butonuna tıkla
- Build süreci başlayacak (~2-3 dakika)
- Deploy tamamlandığında Vercel size bir URL verecek

---

### Yöntem 2: Vercel CLI (Direkt Deploy)

#### 1. Vercel CLI Kur
```bash
npm i -g vercel
```

#### 2. Login
```bash
vercel login
```

#### 3. Deploy
```bash
# İlk deploy (interaktif)
vercel

# Production deploy
vercel --prod
```

#### 4. Environment Variables Ekle
```bash
# Vercel dashboard'dan ekle veya CLI ile:
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add DASHBOARD_USERNAME
# ... diğerleri
```

---

## 🔧 DEPLOY SONRASI AYARLAR

### 1. Domain Bağlama
1. Vercel Dashboard → Project Settings → Domains
2. Custom domain ekle
3. DNS ayarlarını güncelle:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```

### 2. Site Ayarlarını Güncelle
1. `https://DOMAIN.com/karakar/login` → Giriş yap
2. **Site Ayarları** → Domain güncelle
3. **İletişim Ayarları** → Email, telefon güncelle

### 3. Google Maps API
- Google Cloud Console'da domain'i whitelist'e ekle
- API key'i Vercel environment variables'a ekle

### 4. Email Ayarları
- SMTP bilgilerini Vercel'e ekle
- Test email gönder: `/karakar/email`

---

## 📊 KONTROL LİSTESİ

Deploy öncesi:
```
✅ Build başarılı (npm run build)
✅ TypeScript hatasız
✅ Hardcode kontrol tamam
✅ .env.local hazır (local test için)
✅ Environment variables listesi hazır
✅ Git commit yapıldı
```

Deploy sonrası:
```
☐ Site açılıyor mu? (https://DOMAIN.com)
☐ Dashboard çalışıyor mu? (https://DOMAIN.com/karakar/login)
☐ Bölge sayfaları açılıyor mu? (https://DOMAIN.com/bolgeler)
☐ Schema.org markup'lar var mı? (View Source kontrol)
☐ Screaming Frog testi
☐ Google Search Console'a ekle
```

---

## 🔐 GÜVENLİK

**Vercel'de şunları ASLA commit etme:**
- ❌ `.env.local` (gitignore'da)
- ❌ `node_modules`
- ❌ `.next`
- ❌ Şifreler, API keys

**Tüm hassas bilgiler Vercel Environment Variables'da olmalı!**

---

## 🚨 SORUN GİDERME

### Build Hatası
```bash
# Local'de test et
npm run build

# Hata varsa düzelt ve tekrar push et
git add .
git commit -m "Fix build error"
git push
```

### Environment Variables Hatası
- Vercel Dashboard → Settings → Environment Variables
- Tüm değişkenleri kontrol et
- Redeploy et

### Domain Bağlama Sorunu
- DNS propagation bekle (24 saate kadar)
- `dig DOMAIN.com` ile kontrol et

---

## 📞 DESTEK

**KARAKAR Web**
- Tel: +90 532 138 4979
- Email: info@karakar.web.tr
- Web: https://karakar.web.tr

---

## 🎯 ÖNEMLİ NOTLAR

1. **İlk deploy'dan sonra:**
   - `/karakar/login` ile giriş yap
   - Site ayarlarını güncelle
   - İletişim bilgilerini güncelle

2. **Her güncelleme için:**
   - Git push yap
   - Vercel otomatik deploy eder
   - ~2-3 dakika sürer

3. **Production URL:**
   - Vercel size `.vercel.app` subdomain verir
   - Custom domain ekleyebilirsin

**Başarılar!** 🚀
