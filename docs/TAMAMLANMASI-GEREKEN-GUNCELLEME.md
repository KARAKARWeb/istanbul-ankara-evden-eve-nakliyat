# Tamamlanması Gereken Güncelleme Listesi

## [!] KRİTİK - Hemen Yapılacak

### 1. SEO-STRATEGY.md - TAM GÜNCELLENMELİ
**Emoji → Outline Icon:**
- Satır 3: 🎯 → [>]
- Satır 7: 🔍 → [◈]
- Satır 27: 📊 → [◈]
- Satır 261: 🌟 → [★]
- Satır 264-271: Tüm emoji'ler → outline icon
- Satır 283: 📝 → [◇]
- Satır 301: 🌐 → [◇]
- Satır 324: 🗺️ → [◇]
- Satır 364: 🤖 → [◇]
- Satır 375: 📊 → [◈]
- Satır 406: 🎯 → [>]
- Satır 435: 📈 → [◈]
- Satır 461: 🔗 → [◇]
- Satır 475: 📊 → [◈]
- Satır 496: 📚 → [□]
- Satır 504: 🚀 → [▷]

**Hardcode → Değişken:**
- Satır 5: "İstanbul İzmir" → "[Kaynak] [Hedef]"
- Satır 10-25: Tüm keyword örnekleri → template variables
- Satır 34-48: Schema'da domain → {{SITE_URL}}, email → {{SITE_EMAIL}}
- Satır 69-105: LocalBusiness schema → template variables
- Satır 117: "İstanbul İzmir Evden Eve Nakliyat" → "{{SITE_NAME}}"
- Satır 194-206: FAQ örnekleri → template variables
- Satır 217: "İstanbul İzmir Evden Eve Nakliyat Hizmeti" → "{{SITE_NAME}} Hizmeti"
- Satır 287-298: Meta tags → template variables

### 2. DEPLOYMENT.md - TAM GÜNCELLENMELİ
**Emoji → Outline Icon:**
- Satır 3: 🎯 → [>]
- Satır 7: 🚀 → [▷]
- Satır 63: 🔧 → [◆]
- Tüm emoji'ler outline icon'a çevrilmeli

**Hardcode → Değişken:**
- Satır 33-34: Domain ve site adı → template variables
- Satır 42: Email → {{SITE_EMAIL}}
- Satır 56: Domain → {{SITE_DOMAIN}}

**Local-First Vurgusu Ekle:**
```markdown
## [!] ÖNEMLİ: Local Test Önceliği

**Deployment öncesi:**
1. Local'de tam test et
2. Tüm özellikler çalışsın
3. Hata yok mu kontrol et
4. Sonra deploy et

**ASLA:**
- Test etmeden deploy etme
- Hatalı kod gönderme
- Production'da test etme
```

### 3. STEP-01-SETUP.md - TAM GÜNCELLENMELİ
**Emoji → Outline Icon:**
- Satır 3: 🎯 → [>]
- Satır 7: 📋 → [□]
- Satır 13: 🚀 → [▷]
- Tüm emoji'ler outline icon'a

**Hardcode → Değişken:**
- Satır 78: Site adı → "Evden Eve Nakliyat (Başlangıç: İstanbul İzmir)"
- Satır 86: Email → "info@[domain]"

### 4. STEP-02-STRUCTURE.md - TAM GÜNCELLENMELİ
**Emoji → Outline Icon + Eksiksiz İçerik**

### 5. STEP-03-DASHBOARD-AUTH.md - TAM GÜNCELLENMELİ
**Emoji → Outline Icon + Eksiksiz İçerik**

### 6. STEP-04 to STEP-12 - EKSİKSİZ YAZILMALI
**Mevcut Durum:** Sadece başlık var, "sonra yapılacak" ifadeleri
**Yapılacak:** Her dosya eksiksiz implementasyon içermeli

## [◆] Yeni Oluşturulacak Dosyalar

### 1. API-ROUTES.md
```markdown
# API Routes Dokümantasyonu

## [>] Genel Bakış
Tüm API endpoint'lerin detaylı dokümantasyonu.

## [◇] Settings API
### GET /api/settings/site
**Request:** Yok
**Response:**
```json
{
  "success": true,
  "data": {
    "domain": "string",
    "siteName": "string",
    "logo": "string",
    "logoDark": "string",
    "favicon": "string"
  }
}
```

### PUT /api/settings/site
**Request:**
```json
{
  "domain": "string",
  "siteName": "string",
  "logo": "string",
  "logoDark": "string",
  "favicon": "string"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

## [◇] Regions API
### GET /api/regions
### POST /api/regions
### PUT /api/regions/[id]
### DELETE /api/regions/[id]
### POST /api/regions/bulk

## [◇] Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {}
  }
}
```
```

### 2. ERROR-HANDLING.md
```markdown
# Error Handling Stratejisi

## [>] Standard Error Response
```typescript
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

## [◇] Error Codes
- VALIDATION_ERROR
- NOT_FOUND
- UNAUTHORIZED
- INTERNAL_ERROR
- RATE_LIMIT_EXCEEDED

## [◇] Frontend Error Boundary
```typescript
// Error boundary component
```

## [◇] Logging Strategy
- Console.log for development
- Sentry for production (optional)
```

### 3. SECURITY.md
```markdown
# Security Best Practices

## [>] Headers
```typescript
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': cspHeader,
};
```

## [◇] CSRF Protection
- SameSite cookies
- CSRF tokens for forms

## [◇] XSS Prevention
- Input sanitization
- Output encoding
- CSP headers

## [◇] Rate Limiting
- 5 failed login attempts → 15 min ban
- API rate limits: 100 req/min
```

## [✓] Güncelleme Tamamlandığında

Tüm dosyalar güncellendiğinde:
1. Emoji kullanımı: %0
2. Hardcode: %0
3. Geçiştirici ifade: %0
4. Eksik dokümantasyon: %0
5. Proje başlatmaya hazır: %100

## [▷] Sonraki Adım

Kullanıcı onayı ile proje başlatılacak.
