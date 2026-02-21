# Outline Icon Kullanım Zorunluluğu

## [!] Kritik Kural

**Tüm `.md` dosyalarında ve projede (frontend + backend + dashboard) SADECE outline icon kullanılacak. Emoji kullanımı YASAKTIR.**

## Outline Icon Listesi

### Genel Kullanım
- `[>]` - Başlık, Hedef, Amaç
- `[□]` - Genel, Liste, Kutu
- `[◆]` - Önemli, Core, Kritik
- `[◇]` - Detay, Alt Başlık
- `[◈]` - SEO, Özel Alan
- `[▷]` - Sonraki, Aksiyon, İleri
- `[▣]` - Dashboard, Panel
- `[▢]` - Medya, Dosya, İçerik
- `[©]` - Lisans, Copyright

### Özel Kullanım
- `[₺]` - Fiyat, Para, Ödeme
- `[✓]` - Tamamlandı, Başarılı
- `[×]` - Yasak, Hayır, Hata
- `[—]` - Mesafe, Çizgi, Ayırıcı
- `[○]` - Süre, Zaman, Boş
- `[→]` - Yön, Rota, Akış
- `[★]` - Yıldız, Rating, Öne Çıkan

### Dashboard Menü
- `[▣]` - Ana menü öğeleri
- `[◆]` - Alt menü (önemli)
- `[◇]` - Alt menü (normal)
- `[□]` - Liste öğeleri

### SEO & Schema
- `[◈]` - SEO başlıkları
- `[★]` - Rating, Yıldız
- `[₺]` - Fiyat bilgisi
- `[—]` - Mesafe
- `[○]` - Süre

## Yasak Emoji Listesi

❌ Hiçbir şekilde kullanılmayacak:
- 🎯 🚀 📁 📊 💰 🔍 📞 📝 🏠 🌐
- 🔧 📦 🔐 📧 🖼️ ⚙️ 🔗 📄 🎨 📈
- ✅ ❌ ⭐ 💡 🔔 📱 💻 🌟 🎉 🔥
- Ve diğer TÜM emoji'ler

## Kullanım Örnekleri

### ✅ Doğru Kullanım

```markdown
## [>] Proje Amacı
## [□] Özellikler
## [◆] Kritik Bilgiler
## [▷] Sonraki Adım
```

### ❌ Yanlış Kullanım

```markdown
## 🎯 Proje Amacı
## 📁 Özellikler
## ⚠️ Kritik Bilgiler
## 🚀 Sonraki Adım
```

## Frontend & Backend Kullanımı

### React Components
```tsx
// ✅ Doğru
<button>[▷] Devam Et</button>
<h2>[□] Özellikler</h2>

// ❌ Yanlış
<button>🚀 Devam Et</button>
<h2>📁 Özellikler</h2>
```

### Dashboard
```tsx
// ✅ Doğru
const menuItems = [
  { icon: '[▣]', label: 'Dashboard' },
  { icon: '[◆]', label: 'Ayarlar' },
  { icon: '[◈]', label: 'SEO' },
];

// ❌ Yanlış
const menuItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '⚙️', label: 'Ayarlar' },
  { icon: '🔍', label: 'SEO' },
];
```

## Neden Outline Icon?

1. **Tutarlılık:** Tüm projede tek stil
2. **Profesyonellik:** Emoji'ler amatör görünüm verir
3. **Performans:** Emoji'ler render maliyeti yüksek
4. **Erişilebilirlik:** Screen reader uyumlu
5. **Minimal Tasarım:** Apple/Vercel tarzı clean design

## Kontrol Listesi

Her `.md` dosyası için:
- [ ] Emoji kullanımı yok
- [ ] Sadece outline icon var
- [ ] Icon kullanımı tutarlı
- [ ] Doğru icon seçilmiş

Her component için:
- [ ] Emoji kullanımı yok
- [ ] Outline icon kullanılmış
- [ ] CSS ile stil verilmiş
- [ ] Responsive tasarım

## İhlal Durumunda

Eğer emoji kullanımı tespit edilirse:
1. Hemen outline icon'a çevrilecek
2. Tüm dosyalar kontrol edilecek
3. Tutarsızlık giderilecek

**Bu kural MUTLAK ve İSTİSNASIZDIR.**
