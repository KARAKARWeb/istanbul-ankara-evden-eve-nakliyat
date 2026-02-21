// NOT: SITE_CONFIG artık kullanılmıyor
// Bunun yerine data/settings/site.json ve data/settings/contact.json kullanılıyor
// API: /api/settings/site ve /api/settings/contact
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Site Adı',
  url: process.env.NEXT_PUBLIC_SITE_URL || '',
  description: 'Site açıklaması',
  phone: 'Dinamik telefon',
  email: 'Dinamik email',
  address: 'Dinamik adres',
};

// NOT: SITE_INFO artık kullanılmıyor
// Bunun yerine data/settings/site.json ve data/settings/contact.json kullanılıyor
// API: /api/settings/site ve /api/settings/contact

// Working Hours
export const WORKING_HOURS = {
  weekdays: 'Pazartesi - Cumartesi: 08:00 - 20:00',
  weekend: 'Pazar: 09:00 - 18:00',
};

// Social Media
export const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://linkedin.com/',
};

// KARAKAR Web (Sadece Footer için - Geliştirici Kredisi)
export const KARAKAR_WEB = {
  name: 'KARAKAR Web',
  fullName: 'KARAKAR Web Tasarım ve Yazılım Ajansı',
  url: 'https://karakar.web.tr',
  phone: '+90 532 138 4979',
  email: 'info@karakar.web.tr',
  whatsapp: 'https://wa.me/905321384979?text=Merhaba',
  support: 'https://tawk.to/karakar',
};

// House Types
export const HOUSE_TYPES = [
  { value: '1+0', label: '1+0' },
  { value: '1+1', label: '1+1' },
  { value: '2+1', label: '2+1' },
  { value: '3+1', label: '3+1' },
  { value: '4+1', label: '4+1' },
  { value: 'villa', label: 'Villa' },
];

// Elevator Options
export const ELEVATOR_OPTIONS = [
  { value: 'yes', label: 'Asansörlü' },
  { value: 'no', label: 'Asansörsüz' },
];

// Services
export const SERVICES = [
  {
    icon: 'Truck',
    title: 'Asansörlü Nakliyat',
    description: 'Modern asansör sistemleri ile eşyalarınızı güvenle taşıyoruz.',
  },
  {
    icon: 'Package',
    title: 'Profesyonel Paketleme',
    description: 'Eşyalarınız özel paketleme malzemeleri ile korunur.',
  },
  {
    icon: 'Shield',
    title: 'Sigortalı Taşıma',
    description: 'Tüm eşyalarınız sigorta kapsamında taşınır.',
  },
  {
    icon: 'Wrench',
    title: 'Montaj/Demontaj',
    description: 'Mobilyalarınızın sökme ve takma işlemleri.',
  },
  {
    icon: 'Warehouse',
    title: 'Eşya Depolama',
    description: 'Güvenli depolama alanlarımızda eşyalarınızı saklayın.',
  },
  {
    icon: 'Clock',
    title: '7/24 Destek',
    description: 'Her zaman ulaşabileceğiniz müşteri hizmetleri.',
  },
];

// Why Us Features
export const WHY_US_FEATURES = [
  {
    icon: 'Award',
    title: '10+ Yıllık Deneyim',
    description: 'Sektörde 10 yılı aşkın tecrübemiz ile güvenilir hizmet.',
  },
  {
    icon: 'Users',
    title: 'Profesyonel Ekip',
    description: 'Eğitimli ve deneyimli personelimiz ile kaliteli hizmet.',
  },
  {
    icon: 'Shield',
    title: 'Sigortalı Taşıma',
    description: 'Tüm eşyalarınız sigorta kapsamında güvende.',
  },
  {
    icon: 'HeadphonesIcon',
    title: '7/24 Müşteri Desteği',
    description: 'Her zaman ulaşabileceğiniz destek ekibimiz.',
  },
  {
    icon: 'DollarSign',
    title: 'Uygun Fiyat Garantisi',
    description: 'Rekabetçi fiyatlarla kaliteli hizmet sunuyoruz.',
  },
  {
    icon: 'Truck',
    title: 'Modern Araç Filosu',
    description: 'Yeni model araçlarımız ile güvenli taşımacılık.',
  },
];
