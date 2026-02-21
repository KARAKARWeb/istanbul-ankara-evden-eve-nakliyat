# Footer Developer Logo Detayı

## [◆] KARAKAR Web Logo Kullanımı

### Footer 4. Katman (Bottom Footer)

**Sol Taraf:** Copyright metni
```
© 2026 [Site Adı]. Tüm hakları saklıdır.
```

**Sağ Taraf:** Developer Logo
```html
<a href="https://karakar.web.tr" target="_blank" title="Web Tasarım Ajansı">
  <img 
    src="https://karakar.web.tr/KARAKAR-Web-Logo-1.webp" 
    alt="Web Tasarım Ajansı"
    width="120"
    height="40"
    loading="lazy"
  />
</a>
```

### Logo Seçimi

**Koyu Zemin İçin (Kullanılacak):**
- URL: `https://karakar.web.tr/KARAKAR-Web-Logo-1.webp`
- Kullanım: Footer'da (açık renkli footer olsa bile bu kullanılacak)

**Beyaz/Açık Zemin İçin:**
- URL: `https://karakar.web.tr/KARAKAR-Web-Logo-2.webp`
- Kullanım: Sistem koyu zemin olmayacağı için kullanılmayacak

### SEO Özellikleri

- **Alt Text:** "Web Tasarım Ajansı" (Google için, kullanıcıya gözükmez)
- **Title Attribute:** "Web Tasarım Ajansı" (hover'da görünür)
- **Rel Attribute:** Yok (dofollow link - SEO değeri geçer)
- **Target:** `_blank` (yeni sekmede açılır)

### Tasarım Kuralları

- Logo sadece görsel olarak gözükecek
- "Web Tasarım Ajansı" metni gözükmeyecek (sadece alt text ve title)
- Logo boyutu: 120x40px (responsive)
- Lazy loading aktif
- Hover efekti: Hafif opacity değişimi (0.8)

### Implementasyon

```tsx
// Footer Component
<footer>
  {/* ... diğer katmanlar ... */}
  
  {/* 4. Katman - Bottom Footer */}
  <div className="border-t border-gray-200 py-6">
    <div className="container mx-auto px-4 flex justify-between items-center">
      {/* Sol - Copyright */}
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} {siteName}. Tüm hakları saklıdır.
      </p>
      
      {/* Sağ - Developer Logo */}
      <a
        href="https://karakar.web.tr"
        target="_blank"
        title="Web Tasarım Ajansı"
        className="hover:opacity-80 transition-opacity"
      >
        <img
          src="https://karakar.web.tr/KARAKAR-Web-Logo-1.webp"
          alt="Web Tasarım Ajansı"
          width={120}
          height={40}
          loading="lazy"
        />
      </a>
    </div>
  </div>
</footer>
```

### Mobil Responsive

```css
/* Mobilde stack */
@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

Bu detay tüm STEP dosyalarında ve DASHBOARD.md'de referans edilmelidir.
