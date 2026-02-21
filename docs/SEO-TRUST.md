# E-E-A-T & Trust Signals

## [>] E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

### Experience (Deneyim)
**Gösterilmesi gerekenler:**
- 10+ yıllık sektör deneyimi
- 5000+ başarılı taşıma
- 127+ müşteri yorumu
- Vaka çalışmaları
- Öncesi-sonrası fotoğraflar

### Expertise (Uzmanlık)
**Kanıtlanması gerekenler:**
- Sertifikalar ve belgeler
- Eğitimli personel
- Özel ekipman
- Teknik bilgi makaleleri
- Nasıl yapılır rehberleri

### Authoritativeness (Otorite)
**Oluşturulması gerekenler:**
- Medya bahisleri
- Sektör ödülleri
- Referanslar
- Backlink'ler (authoritative sitelerden)
- Sosyal medya takipçi sayısı

### Trustworthiness (Güvenilirlik)
**Sağlanması gerekenler:**
- SSL sertifikası (HTTPS)
- Gizlilik politikası
- Kullanım şartları
- İade/İptal politikası
- İletişim bilgileri (tam)
- Şirket bilgileri (vergi no, ticaret sicil)

## [◈] Author Bio & Expertise

### Author Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{{AUTHOR_NAME}}",
  "jobTitle": "Nakliyat Uzmanı",
  "worksFor": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}"
  },
  "description": "10 yıllık evden eve nakliyat deneyimi",
  "image": "{{SITE_URL}}/team/{{AUTHOR_SLUG}}.jpg",
  "sameAs": [
    "{{LINKEDIN_URL}}",
    "{{TWITTER_URL}}"
  ],
  "knowsAbout": [
    "Evden Eve Nakliyat",
    "Eşya Paketleme",
    "Sigortalı Taşımacılık",
    "Lojistik Yönetimi"
  ]
}
```

### Author Bio Template
```markdown
## Yazar Hakkında

**{{AUTHOR_NAME}}** - Nakliyat Uzmanı

{{AUTHOR_NAME}}, 10 yılı aşkın süredir evden eve nakliyat sektöründe çalışmaktadır. 
İstanbul Üniversitesi Lojistik Yönetimi bölümü mezunu olan {{AUTHOR_NAME}}, 
5000'den fazla başarılı taşıma projesinde görev almıştır.

**Uzmanlık Alanları:**
- Evden Eve Nakliyat
- Eşya Paketleme Teknikleri
- Sigortalı Taşımacılık
- Lojistik Optimizasyonu

**Sertifikalar:**
- Nakliyat Uzmanı Sertifikası (2018)
- Lojistik Yönetimi Sertifikası (2019)
- Kalite Yönetim Sistemi (ISO 9001)
```

### Dashboard'dan Author Yönetimi
```typescript
interface Author {
  id: string;
  name: string;
  slug: string;
  jobTitle: string;
  bio: string;
  image: string;
  expertise: string[];
  certifications: string[];
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}
```

## [◈] About Us Page SEO

### Hakkımızda Sayfası İçeriği
**Zorunlu bölümler:**

#### 1. Şirket Hikayesi
```markdown
## Hikayemiz

{{SITE_NAME}}, 2015 yılında İstanbul'da kurulmuştur. 
Kurucumuz {{FOUNDER_NAME}}, 15 yıllık sektör deneyimini 
müşteri memnuniyeti odaklı bir nakliyat firması kurmak için kullanmıştır.

Bugün 50+ çalışanımız, 20+ araç filomuz ve 10.000+ mutlu müşterimiz ile 
Türkiye'nin önde gelen nakliyat firmalarından biriyiz.
```

#### 2. Misyon & Vizyon
```markdown
## Misyonumuz
Eşyalarınızı güvenle, zamanında ve hasarsız taşımak.

## Vizyonumuz
Türkiye'nin en güvenilir ve tercih edilen nakliyat firması olmak.
```

#### 3. Değerlerimiz
```markdown
## Değerlerimiz
- **Güvenilirlik:** Her eşya bizim için değerlidir
- **Profesyonellik:** Eğitimli ve deneyimli ekip
- **Müşteri Memnuniyeti:** %100 memnuniyet hedefi
- **Şeffaflık:** Net fiyatlandırma, gizli ücret yok
- **Kalite:** ISO 9001 kalite standartları
```

#### 4. Ekibimiz
```markdown
## Ekibimiz
- 50+ Profesyonel çalışan
- 10+ Nakliyat uzmanı
- 20+ Sertifikalı taşıyıcı
- 5+ Müşteri hizmetleri temsilcisi
```

#### 5. Sertifikalar & Ödüller
```markdown
## Sertifikalar
- ISO 9001 Kalite Yönetim Sistemi
- ISO 14001 Çevre Yönetim Sistemi
- OHSAS 18001 İş Sağlığı ve Güvenliği

## Ödüller
- 2023 Yılın Nakliyat Firması (Lojistik Derneği)
- 2022 Müşteri Memnuniyeti Ödülü
- 2021 En İyi Hizmet Ödülü
```

### About Us Schema
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "{{SITE_NAME}}",
    "foundingDate": "2015",
    "founders": [{
      "@type": "Person",
      "name": "{{FOUNDER_NAME}}"
    }],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 50
    },
    "award": [
      "2023 Yılın Nakliyat Firması",
      "2022 Müşteri Memnuniyeti Ödülü"
    ]
  }
}
```

## [◈] Trust Signals

### SSL Certificate
```html
<!-- HTTPS zorunlu -->
<link rel="canonical" href="https://{{SITE_URL}}">
<meta property="og:url" content="https://{{SITE_URL}}">
```

### Privacy Policy
**Gizlilik Politikası içeriği:**
- Kişisel veri toplama
- Veri kullanım amaçları
- Veri saklama süresi
- Veri güvenliği
- Kullanıcı hakları
- KVKK uyumluluğu
- İletişim bilgileri

### Terms of Service
**Kullanım Şartları içeriği:**
- Hizmet kapsamı
- Kullanıcı sorumlulukları
- Fiyatlandırma
- İptal ve iade koşulları
- Garanti şartları
- Uyuşmazlık çözümü
- Yasal uyarılar

### Refund Policy
**İade Politikası:**
```markdown
## İptal ve İade Koşulları

### İptal Hakkı
- Hizmet başlamadan 48 saat öncesine kadar ücretsiz iptal
- 24-48 saat arası %25 kesinti
- 24 saat içinde %50 kesinti

### İade Süreci
- İade talebi 7 iş günü içinde değerlendirilir
- Onaylanan iadeler 14 iş günü içinde hesaba geçer

### Garanti
- Eşya hasarı %100 sigorta kapsamında
- Geç teslimat durumunda ücret iadesi
```

### Contact Information
**Tam iletişim bilgileri:**
```html
<!-- Footer'da görünür -->
<address>
  <strong>{{SITE_NAME}}</strong><br>
  {{STREET_ADDRESS}}<br>
  {{CITY}}, {{POSTAL_CODE}}<br>
  Telefon: <a href="tel:{{SITE_PHONE}}">{{SITE_PHONE}}</a><br>
  E-posta: <a href="mailto:{{SITE_EMAIL}}">{{SITE_EMAIL}}</a><br>
  Vergi No: {{TAX_NUMBER}}<br>
  Ticaret Sicil No: {{TRADE_REGISTRY}}
</address>
```

### Security Badges
```html
<!-- Güven rozetleri -->
<div class="trust-badges">
  <img src="/badges/ssl-secure.svg" alt="SSL Güvenli">
  <img src="/badges/verified-business.svg" alt="Onaylı İşletme">
  <img src="/badges/iso-9001.svg" alt="ISO 9001">
  <img src="/badges/money-back.svg" alt="Para İade Garantisi">
</div>
```

## [◈] Social Proof

### Customer Reviews
**Müşteri yorumları stratejisi:**

#### Review Collection
```typescript
// Otomatik yorum toplama
export async function sendReviewRequest(customerId: string) {
  // Hizmet tamamlandıktan 3 gün sonra
  const customer = await getCustomer(customerId);
  
  await sendEmail({
    to: customer.email,
    subject: 'Hizmetimizi değerlendirir misiniz?',
    template: 'review-request',
    data: {
      customerName: customer.name,
      reviewLink: `${process.env.SITE_URL}/review/${customer.token}`,
    },
  });
}
```

#### Review Display
```typescript
// Ana sayfada yorumlar
interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  photos?: string[];
}

// Minimum 10 yorum göster
// Aggregate rating hesapla
// Schema.org markup ekle
```

#### Review Platforms
**Yorum platformları:**
- Google My Business (en önemli)
- Trustpilot
- Şikayetvar
- Facebook Reviews
- Instagram testimonials

### Case Studies
**Vaka çalışmaları:**
```markdown
## Başarı Hikayeleri

### Vaka 1: İstanbul'dan İzmir'e Villa Taşıma
**Müşteri:** Ahmet Bey
**Tarih:** Ocak 2026
**Zorluk:** 300m² villa, antika eşyalar
**Çözüm:** Özel paketleme, sigortalı taşıma
**Sonuç:** %100 hasarsız teslimat, müşteri memnuniyeti

### Vaka 2: Ofis Taşıma Projesi
**Müşteri:** ABC Şirketi
**Tarih:** Aralık 2025
**Zorluk:** 50 kişilik ofis, 1 gün içinde
**Çözüm:** Gece taşıma, profesyonel ekip
**Sonuç:** Sıfır iş kaybı, zamanında teslimat
```

### Testimonials
```html
<!-- Müşteri referansları -->
<blockquote class="testimonial">
  <p>"Eşyalarımız hiç zarar görmeden İzmir'e ulaştı. Profesyonel ekip, güler yüzlü hizmet. Kesinlikle tavsiye ederim."</p>
  <footer>
    <cite>— Ahmet Yılmaz, İstanbul</cite>
    <div class="rating">⭐⭐⭐⭐⭐</div>
  </footer>
</blockquote>
```

### Media Mentions
**Medya bahisleri:**
```markdown
## Basında Biz

- **Hürriyet Gazetesi** - "Türkiye'nin En Güvenilir Nakliyat Firmaları" (2023)
- **Milliyet** - "Evden Eve Nakliyatta Yeni Trend" (2022)
- **CNN Türk** - "Başarılı Girişimciler" röportajı (2021)
```

### Client Logos
```html
<!-- Kurumsal müşteri logoları -->
<div class="client-logos">
  <img src="/clients/company-1.svg" alt="Şirket 1">
  <img src="/clients/company-2.svg" alt="Şirket 2">
  <img src="/clients/company-3.svg" alt="Şirket 3">
</div>
```

### Statistics
```html
<!-- İstatistikler -->
<div class="stats">
  <div class="stat">
    <span class="number">10,000+</span>
    <span class="label">Mutlu Müşteri</span>
  </div>
  <div class="stat">
    <span class="number">50+</span>
    <span class="label">Profesyonel Ekip</span>
  </div>
  <div class="stat">
    <span class="number">20+</span>
    <span class="label">Araç Filosu</span>
  </div>
  <div class="stat">
    <span class="number">4.8/5</span>
    <span class="label">Müşteri Puanı</span>
  </div>
</div>
```

## [◈] Content Quality

### Content Guidelines
**İçerik kalite standartları:**

#### Yazım Kuralları
- Dilbilgisi hatası yok
- Yazım hatası yok
- Tutarlı terminoloji
- Profesyonel dil
- Anlaşılır cümleler

#### Fact-Checking
- Tüm istatistikler doğru
- Fiyatlar güncel
- İletişim bilgileri doğru
- Hizmet alanları doğru

#### Content Freshness
- Düzenli güncelleme
- Tarih bilgileri güncel
- Eski içerik arşivleme
- Yeni içerik ekleme

### Expert Content
**Uzman içeriği:**
```markdown
## Uzman Görüşü

### Evden Eve Nakliyat İpuçları
*Nakliyat Uzmanı {{AUTHOR_NAME}} tarafından*

1. **Paketleme:** En az 1 hafta önceden başlayın
2. **Etiketleme:** Her kutuyu detaylı etiketleyin
3. **Değerli Eşyalar:** Ayrı paketleyin ve kendiniz taşıyın
4. **Sigorta:** Mutlaka sigorta yaptırın
5. **Planlama:** Taşınma gününü iyi planlayın
```

## [◈] Dashboard Integration

### Trust Signals Dashboard
**Yönetim özellikleri:**
- Review management
- Testimonial approval
- Case study editor
- Media mention tracker
- Certificate uploader
- Award manager
- Author bio editor

### Automated Trust Building
```typescript
// Otomatik güven oluşturma
export async function buildTrust() {
  // Her hafta
  await collectReviews();
  await updateStatistics();
  
  // Her ay
  await publishCaseStudy();
  await updateCertificates();
  
  // Her 3 ay
  await auditContent();
  await updateAboutPage();
}
```

## [□] Diğer Dokümantasyon

- [SEO-STRATEGY.md](SEO-STRATEGY.md) - SEO stratejisi
- [SEO-MONITORING.md](SEO-MONITORING.md) - Monitoring & analytics
- [SEO-OPTIMIZATION.md](SEO-OPTIMIZATION.md) - Performance optimization
- [SEO-LOCAL.md](SEO-LOCAL.md) - Local SEO & GMB
