# Örnek İçerikler - Tüm Sayfalar

## [>] Genel Bakış

**Tüm sayfalar örnek içeriklerle doldurulacak:**
- ✅ Ana Sayfa (12 section - her biri detaylı)
- ✅ Hakkımızda (6 bölüm - tam içerik)
- ✅ Hizmet Bölgeleri (6 bölüm - tam içerik)
- ✅ SEO Makaleler (üst ve alt - detaylı başlıklar)

---

## [◈] Ana Sayfa Örnek İçerikler

### 1. Hero Section
```typescript
{
  title: "İstanbul İzmir Evden Eve Nakliyat",
  subtitle: "Profesyonel, Güvenilir ve Uygun Fiyatlı Nakliyat Hizmeti",
  description: "10+ yıllık deneyimimiz ile eşyalarınızı güvenle taşıyoruz. Sigortalı taşımacılık, profesyonel paketleme ve 7/24 müşteri desteği.",
  stats: [
    { number: "10,000+", label: "Mutlu Müşteri" },
    { number: "4.8/5", label: "⭐ Müşteri Puanı" },
    { number: "482 km", label: "Mesafe" },
    { number: "5.5 saat", label: "Tahmini Süre" }
  ],
  cta: {
    primary: "Ücretsiz Teklif Alın",
    secondary: "Hemen Ara: +90 532 138 4979"
  }
}
```

### 2. SEO Makale (Üst)
**Başlık:** "İstanbul İzmir Evden Eve Nakliyat Hakkında"

**Alt Başlıklar (TOC'a eklenecek):**
- Profesyonel Nakliyat Hizmeti
- Güvenli ve Sigortalı Taşımacılık
- Uygun Fiyat Garantisi

**İçerik:**
```markdown
## Profesyonel Nakliyat Hizmeti

İstanbul'dan İzmir'e evden eve nakliyat hizmeti sunan firmamız, 10 yılı aşkın 
tecrübesi ile güvenilir ve kaliteli hizmet vermektedir. 482 km mesafedeki bu 
rotada, modern araç filomuz ve profesyonel ekibimiz ile eşyalarınızı güvenle 
taşıyoruz.

## Güvenli ve Sigortalı Taşımacılık

Tüm taşıma işlemlerimiz sigorta kapsamındadır. Eşyalarınız özenle paketlenir, 
yüklenir ve hasarsız bir şekilde yeni adresinize teslim edilir.

## Uygun Fiyat Garantisi

Rekabetçi fiyatlarımız ile kaliteli hizmeti uygun fiyata sunuyoruz. 
1+1 daire için 1.500₺'den başlayan fiyatlarla hizmet veriyoruz.
```

### 3. Hizmetler Section
```typescript
const services = [
  {
    icon: "Truck",
    title: "Asansörlü Nakliyat",
    description: "Modern asansör sistemleri ile eşyalarınızı güvenle taşıyoruz.",
    features: ["Hızlı taşıma", "Hasarsız teslimat", "Uygun fiyat"]
  },
  {
    icon: "Package",
    title: "Profesyonel Paketleme",
    description: "Eşyalarınız özel paketleme malzemeleri ile korunur.",
    features: ["Bubble wrap", "Karton kutular", "Streç film"]
  },
  {
    icon: "Shield",
    title: "Sigortalı Taşıma",
    description: "Tüm eşyalarınız sigorta kapsamında taşınır.",
    features: ["%100 güvence", "Hasar tazminatı", "Anında çözüm"]
  },
  {
    icon: "Wrench",
    title: "Montaj/Demontaj",
    description: "Mobilyalarınızın sökme ve takma işlemleri.",
    features: ["Uzman ekip", "Özel aletler", "Hızlı montaj"]
  },
  {
    icon: "Warehouse",
    title: "Eşya Depolama",
    description: "Güvenli depolama alanlarımızda eşyalarınızı saklayın.",
    features: ["Güvenli alan", "Kamera sistemi", "Esnek süreler"]
  },
  {
    icon: "Clock",
    title: "7/24 Destek",
    description: "Her zaman ulaşabileceğiniz müşteri hizmetleri.",
    features: ["Anlık yanıt", "Profesyonel destek", "Çözüm odaklı"]
  }
];
```

### 4. Neden Biz Section
```typescript
const whyUs = [
  {
    icon: "Award",
    title: "10+ Yıllık Deneyim",
    description: "Sektörde 10 yılı aşkın tecrübemiz ile güvenilir hizmet."
  },
  {
    icon: "Users",
    title: "Profesyonel Ekip",
    description: "Eğitimli ve deneyimli personelimiz ile kaliteli hizmet."
  },
  {
    icon: "Shield",
    title: "Sigortalı Taşıma",
    description: "Tüm eşyalarınız sigorta kapsamında güvende."
  },
  {
    icon: "HeadphonesIcon",
    title: "7/24 Müşteri Desteği",
    description: "Her zaman ulaşabileceğiniz destek ekibimiz."
  },
  {
    icon: "DollarSign",
    title: "Uygun Fiyat Garantisi",
    description: "Rekabetçi fiyatlarla kaliteli hizmet sunuyoruz."
  },
  {
    icon: "Truck",
    title: "Modern Araç Filosu",
    description: "Yeni model araçlarımız ile güvenli taşımacılık."
  }
];
```

### 5. Rota Bilgileri Section
```typescript
{
  route: {
    from: "İstanbul",
    to: "İzmir",
    distance: "482 km",
    duration: "5.5 saat",
    highway: "E87/O-4",
    priceRange: "1.500₺ - 3.500₺"
  },
  details: [
    {
      icon: "MapPin",
      label: "Mesafe",
      value: "482 km",
      description: "İstanbul merkez - İzmir merkez arası"
    },
    {
      icon: "Clock",
      label: "Süre",
      value: "5.5 saat",
      description: "Ortalama seyahat süresi"
    },
    {
      icon: "DollarSign",
      label: "Fiyat",
      value: "1.500₺'den başlar",
      description: "1+1 daire için başlangıç fiyatı"
    }
  ]
}
```

### 6. Fiyatlandırma Tablosu
```typescript
const pricingTable = [
  {
    houseType: "1+0 / 1+1",
    elevator: "1.500₺ - 2.500₺",
    noElevator: "1.800₺ - 3.000₺",
    features: ["Küçük ev", "Az eşya", "Hızlı taşıma"]
  },
  {
    houseType: "2+1",
    elevator: "2.000₺ - 3.000₺",
    noElevator: "2.500₺ - 3.500₺",
    features: ["Orta boy ev", "Standart eşya", "Profesyonel paketleme"],
    popular: true
  },
  {
    houseType: "3+1",
    elevator: "2.500₺ - 3.500₺",
    noElevator: "3.000₺ - 4.500₺",
    features: ["Büyük ev", "Çok eşya", "Ekstra hizmet"]
  },
  {
    houseType: "4+1 ve üzeri",
    elevator: "3.500₺+",
    noElevator: "4.500₺+",
    features: ["Çok büyük ev", "Özel paketleme", "Ekstra ekip"]
  }
];
```

### 7. Hizmet Bölgeleri Showcase
```typescript
const regions = [
  {
    name: "İstanbul Bornova",
    distance: "45 km",
    duration: "1.5 saat",
    priceMin: "1.200₺",
    rating: 4.7,
    reviewCount: 23,
    image: "/regions/bornova.jpg"
  },
  {
    name: "İstanbul Konak",
    distance: "38 km",
    duration: "1.2 saat",
    priceMin: "1.100₺",
    rating: 4.8,
    reviewCount: 31,
    image: "/regions/konak.jpg"
  },
  // ... 28 bölge daha
];
```

### 8. SSS Section
```typescript
const faqs = [
  {
    question: "Nakliyat ücreti nasıl hesaplanır?",
    answer: "Nakliyat ücreti, ev büyüklüğü, eşya miktarı, asansör durumu ve mesafeye göre belirlenir. Ücretsiz keşif hizmeti ile size en uygun fiyatı sunuyoruz."
  },
  {
    question: "Sigorta kapsamı nedir?",
    answer: "Tüm eşyalarınız taşıma sırasında sigorta kapsamındadır. Herhangi bir hasar durumunda tam tazminat ödenir."
  },
  {
    question: "Taşıma süresi ne kadar?",
    answer: "İstanbul-İzmir arası ortalama 5.5 saat sürmektedir. Trafik ve hava koşullarına göre değişiklik gösterebilir."
  },
  {
    question: "Paketleme malzemeleri dahil mi?",
    answer: "Evet, tüm paketleme malzemeleri (karton kutu, bubble wrap, streç film) fiyata dahildir."
  },
  {
    question: "Ödeme nasıl yapılır?",
    answer: "Nakit, kredi kartı veya havale ile ödeme yapabilirsiniz. Peşin ödeme %10 indirim fırsatı."
  }
];
```

### 9. Müşteri Yorumları
```typescript
const reviews = [
  {
    author: "Ahmet Y.",
    rating: 5,
    date: "2026-02-15",
    text: "Eşyalarımız hiç zarar görmeden İzmir'e ulaştı. Profesyonel ekip, güler yüzlü hizmet. Kesinlikle tavsiye ederim.",
    verified: true,
    photos: ["/reviews/ahmet-1.jpg", "/reviews/ahmet-2.jpg"]
  },
  {
    author: "Zeynep K.",
    rating: 5,
    date: "2026-02-10",
    text: "Çok memnun kaldık. Fiyat/performans açısından çok iyi. Eşyalar özenle paketlendi ve hasarsız teslim edildi.",
    verified: true
  },
  // ... 8 yorum daha (toplam 10)
];
```

### 10. İletişim Formu
```typescript
const contactForm = {
  fields: [
    { name: "fullName", label: "Ad Soyad", type: "text", required: true },
    { name: "phone", label: "Telefon", type: "tel", required: true },
    { name: "email", label: "E-posta", type: "email", required: true },
    { name: "sourceCity", label: "Nereden", type: "select", required: true },
    { name: "targetCity", label: "Nereye", type: "select", required: true },
    { name: "houseType", label: "Ev Tipi", type: "select", required: true },
    { name: "message", label: "Mesajınız", type: "textarea", required: false }
  ],
  submitText: "Teklif Al",
  successMessage: "Talebiniz alındı! En kısa sürede size dönüş yapacağız."
};
```

### 11. SEO İçerik (Alt)
**Başlık:** "İstanbul İzmir Evden Eve Nakliyat - Detaylı Rehber"

**Alt Başlıklar (TOC'a eklenecek):**
- Nakliyat Süreci Nasıl İşler?
- Fiyatları Etkileyen Faktörler
- Taşınma Öncesi Hazırlık İpuçları
- En Sık Sorulan Sorular
- İletişim Bilgileri

**İçerik:**
```markdown
## Nakliyat Süreci Nasıl İşler?

1. **Ücretsiz Keşif:** Evinize gelerek eşyalarınızı inceliyoruz
2. **Fiyat Teklifi:** Size en uygun fiyatı sunuyoruz
3. **Randevu:** Taşınma tarihinizi belirliyoruz
4. **Paketleme:** Eşyalarınızı özenle paketliyoruz
5. **Yükleme:** Araçlara güvenli şekilde yüklüyoruz
6. **Taşıma:** İzmir'e güvenli yolculuk
7. **Teslimat:** Yeni adresinize hasarsız teslimat

## Fiyatları Etkileyen Faktörler

- **Ev Büyüklüğü:** 1+1, 2+1, 3+1 vb.
- **Eşya Miktarı:** Az veya çok eşya
- **Asansör Durumu:** Asansörlü veya asansörsüz
- **Mesafe:** İstanbul-İzmir arası 482 km
- **Ekstra Hizmetler:** Paketleme, montaj, depolama

## Taşınma Öncesi Hazırlık İpuçları

1. En az 2 hafta önceden planlama yapın
2. Gereksiz eşyalardan kurtulun
3. Değerli eşyaları ayrı paketleyin
4. Etiketleme yapın (hangi oda, ne var)
5. Sigorta yaptırın
6. Yeni adresinizi hazırlayın

## En Sık Sorulan Sorular

**Q: Kaç gün önceden rezervasyon yapmalıyım?**
A: En az 1 hafta önceden rezervasyon yapmanızı öneriyoruz.

**Q: Hafta sonu taşınma yapıyor musunuz?**
A: Evet, hafta sonu ve resmi tatillerde de hizmet veriyoruz.

**Q: Eşyalar zarar görürse ne olur?**
A: Sigorta kapsamında tam tazminat ödenir.

## İletişim Bilgileri

**Telefon:** +90 532 138 4979
**E-posta:** info@karakar.web.tr
**Adres:** İstanbul, Türkiye
**Çalışma Saatleri:** 7/24 hizmet
```

### 12. CTA Section
```typescript
{
  title: "Hemen Ücretsiz Teklif Alın!",
  description: "Profesyonel nakliyat hizmeti için formu doldurun, size en uygun fiyatı sunalım.",
  primaryCTA: {
    text: "Teklif Al",
    href: "#contact"
  },
  secondaryCTA: {
    text: "Hemen Ara",
    href: "tel:+905321384979"
  },
  features: [
    "Ücretsiz keşif",
    "Sigortalı taşıma",
    "7/24 destek"
  ]
}
```

---

## [◈] Hakkımızda Sayfası Örnek İçerikler

### 1. Hikayemiz
```markdown
# Hikayemiz

2015 yılında İstanbul'da kurulan firmamız, evden eve nakliyat sektöründe 
güvenilir ve kaliteli hizmet sunma misyonu ile yola çıktı. Kurucumuz 
Mehmet Yılmaz'ın 15 yıllık sektör deneyimi, müşteri memnuniyeti odaklı 
bir nakliyat firması kurma hayalini gerçekleştirdi.

Bugün 50+ çalışanımız, 20+ araç filomuz ve 10.000+ mutlu müşterimiz ile 
Türkiye'nin önde gelen nakliyat firmalarından biriyiz. Her geçen gün 
büyüyen ailemize katılan yeni müşterilerimiz, bizim en büyük motivasyon 
kaynağımızdır.
```

### 2. Misyon & Vizyon
```markdown
## Misyonumuz

Eşyalarınızı güvenle, zamanında ve hasarsız taşımak. Müşteri memnuniyetini 
her şeyin önünde tutarak, sektörde güvenilir ve kaliteli hizmetin adresi olmak.

## Vizyonumuz

Türkiye'nin en güvenilir ve tercih edilen nakliyat firması olmak. Teknoloji 
ve inovasyonu kullanarak, müşterilerimize en iyi deneyimi sunmak.
```

### 3. Değerlerimiz
```markdown
## Değerlerimiz

- **Güvenilirlik:** Her eşya bizim için değerlidir
- **Profesyonellik:** Eğitimli ve deneyimli ekip
- **Müşteri Memnuniyeti:** %100 memnuniyet hedefi
- **Şeffaflık:** Net fiyatlandırma, gizli ücret yok
- **Kalite:** ISO 9001 kalite standartları
- **İnovasyon:** Sürekli gelişim ve iyileştirme
```

### 4. Ekibimiz
```typescript
const team = [
  {
    name: "Mehmet Yılmaz",
    position: "Kurucu & CEO",
    experience: "15+ yıl",
    image: "/team/mehmet.jpg",
    bio: "Nakliyat sektöründe 15 yılı aşkın deneyime sahip."
  },
  {
    name: "Ayşe Demir",
    position: "Operasyon Müdürü",
    experience: "10+ yıl",
    image: "/team/ayse.jpg",
    bio: "Lojistik yönetiminde uzman, operasyonları yönetiyor."
  },
  {
    name: "Ali Kaya",
    position: "Müşteri Hizmetleri Müdürü",
    experience: "8+ yıl",
    image: "/team/ali.jpg",
    bio: "Müşteri memnuniyeti odaklı hizmet sunuyor."
  }
];
```

### 5. Sertifikalar & Ödüller
```markdown
## Sertifikalar

- **ISO 9001** - Kalite Yönetim Sistemi (2020)
- **ISO 14001** - Çevre Yönetim Sistemi (2021)
- **OHSAS 18001** - İş Sağlığı ve Güvenliği (2022)

## Ödüller

- **2023 Yılın Nakliyat Firması** - Lojistik Derneği
- **2022 Müşteri Memnuniyeti Ödülü** - Nakliyat Birliği
- **2021 En İyi Hizmet Ödülü** - Sektör Dergisi
```

### 6. İletişim
```typescript
{
  phone: "+90 532 138 4979",
  email: "info@karakar.web.tr",
  address: "İstanbul, Türkiye",
  workingHours: "7/24 Hizmet",
  socialMedia: {
    facebook: "https://facebook.com/...",
    instagram: "https://instagram.com/...",
    twitter: "https://twitter.com/..."
  }
}
```

---

## [◈] Hizmet Bölgeleri Sayfası Örnek İçerikler

### 1. Genel Bilgi
```markdown
# İstanbul Bornova Evden Eve Nakliyat

İstanbul'dan Bornova'ya evden eve nakliyat hizmeti sunan firmamız, 
45 km mesafedeki bu rotada profesyonel ve güvenilir hizmet vermektedir.

**Mesafe:** 45 km
**Süre:** 1.5 saat
**Fiyat:** 1.200₺'den başlar
**Rating:** ⭐⭐⭐⭐⭐ 4.7 (23 değerlendirme)
```

### 2. Hizmetler
```markdown
## Hizmetlerimiz

- Asansörlü/Asansörsüz Nakliyat
- Profesyonel Paketleme
- Sigortalı Taşıma
- Montaj/Demontaj
- Eşya Depolama
- 7/24 Müşteri Desteği
```

### 3. Fiyatlandırma
```typescript
const regionPricing = [
  { houseType: "1+0 / 1+1", price: "1.200₺ - 2.000₺" },
  { houseType: "2+1", price: "1.800₺ - 2.800₺" },
  { houseType: "3+1", price: "2.500₺ - 3.500₺" },
  { houseType: "4+1+", price: "3.500₺+" }
];
```

### 4. Yorumlar
```typescript
const regionReviews = [
  {
    author: "Mehmet A.",
    rating: 5,
    date: "2026-02-18",
    text: "Bornova'ya taşınma işlemimiz çok iyi geçti. Profesyonel ekip, uygun fiyat."
  },
  // ... 4 yorum daha
];
```

### 5. SSS
```typescript
const regionFAQs = [
  {
    question: "İstanbul Bornova arası ne kadar sürer?",
    answer: "Ortalama 1.5 saat sürmektedir."
  },
  {
    question: "Fiyata neler dahil?",
    answer: "Paketleme, yükleme, taşıma, boşaltma ve sigorta dahildir."
  }
];
```

### 6. İletişim
```markdown
## Hemen Teklif Alın

**Telefon:** +90 545 181 4040
**Form:** Aşağıdaki formu doldurun
```

---

## [□] Diğer Dokümantasyon

- [STEP-08-FRONTEND-HOMEPAGE.md](STEP-08-FRONTEND-HOMEPAGE.md) - Ana sayfa
- [STEP-09-FRONTEND-PAGES.md](STEP-09-FRONTEND-PAGES.md) - Hakkımızda
- [STEP-10-FRONTEND-REGIONS.md](STEP-10-FRONTEND-REGIONS.md) - Bölgeler
- [TOC-SYSTEM.md](TOC-SYSTEM.md) - TOC sistemi
