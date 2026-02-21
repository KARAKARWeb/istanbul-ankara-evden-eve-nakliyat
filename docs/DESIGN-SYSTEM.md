# Design System - Mobil App Gibi Minimal Tasarım

## [>] Tasarım Felsefesi

**3 Temel Prensip:**
1. **Mobil uygulama gibi davranmalı** - Native app hissi
2. **Section geçişleri net ve belirgin** - Karmaşık görüntü YOK
3. **Apple/Vercel minimal tasarım** - Büyük font/yazılar YOK

---

## [◈] Mobil Tasarım (Native App Hissi)

### Mobile-First Approach
**Mobil sürüm tam bir mobil uygulama gibi:**

#### 1. Performance
- ✅ **60 FPS** - Smooth animations
- ✅ **< 2s LCP** - Hızlı yükleme
- ✅ **Instant feedback** - Touch response < 100ms
- ✅ **Optimistic UI** - Anında UI güncellemesi

#### 2. Touch Interactions
```typescript
// Touch target minimum boyutları
const touchTargets = {
  button: '48x48px',      // Minimum
  icon: '44x44px',        // Minimum
  link: '48x32px',        // Minimum height
  input: '48x48px',       // Minimum
};

// Touch feedback
const touchFeedback = {
  scale: 0.95,            // Basıldığında küçülme
  opacity: 0.7,           // Basıldığında opacity
  duration: '150ms',      // Transition süresi
};
```

#### 3. Gestures
```typescript
// Desteklenen gesture'lar
const gestures = {
  swipe: 'Navigation (left/right)',
  pullToRefresh: 'Content refresh',
  longPress: 'Context menu',
  pinchZoom: 'Image zoom (sadece galeri)',
};
```

#### 4. Bottom Navigation (Mobil)
```typescript
// Mobil navigasyon (< 768px)
const mobileNav = {
  position: 'fixed',
  bottom: 0,
  height: '64px',
  items: [
    { icon: 'Home', label: 'Ana Sayfa', href: '/' },
    { icon: 'MapPin', label: 'Bölgeler', href: '/bolgeler' },
    { icon: 'Phone', label: 'İletişim', href: '/iletisim' },
    { icon: 'User', label: 'Hesap', href: '/hesap' },
  ],
  safeArea: 'env(safe-area-inset-bottom)', // iPhone notch
};
```

#### 5. PWA Features
```typescript
// Progressive Web App
const pwaFeatures = {
  installable: true,
  offline: true,
  pushNotifications: true,
  homeScreenIcon: true,
  splashScreen: true,
};

// manifest.json
{
  "name": "Evden Eve Nakliyat",
  "short_name": "Nakliyat",
  "display": "standalone",
  "theme_color": "#16A34A",
  "background_color": "#FFFFFF",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192" },
    { "src": "/icon-512.png", "sizes": "512x512" }
  ]
}
```

---

## [◈] Section Geçişleri (Net ve Belirgin)

### Section Spacing
**Karmaşık görüntü YOK - Her section net ayrılmalı:**

```css
/* Section container */
.section {
  padding: 64px 0;           /* Desktop */
  margin-bottom: 0;
  position: relative;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 0;         /* Mobil */
  }
}

/* Section divider */
.section + .section {
  border-top: 1px solid #E5E7EB;  /* Subtle border */
}

/* Alternate background */
.section:nth-child(even) {
  background: #F9FAFB;       /* Light gray background */
}

.section:nth-child(odd) {
  background: #FFFFFF;       /* White background */
}
```

### Section Structure
```typescript
// Her section'ın yapısı
interface Section {
  id: string;
  title: string;
  subtitle?: string;
  background: 'white' | 'gray';
  spacing: {
    top: '48px' | '64px' | '80px';
    bottom: '48px' | '64px' | '80px';
  };
  maxWidth: '1280px';         // Container max width
  padding: {
    x: '16px' | '24px';       // Horizontal padding
  };
}
```

### Visual Hierarchy
```css
/* Section başlığı */
.section-title {
  font-size: 32px;            /* Desktop */
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #1A1A1A;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 28px;          /* Mobil - Büyük YOK! */
  }
}

/* Section subtitle */
.section-subtitle {
  font-size: 18px;            /* Desktop */
  font-weight: 400;
  line-height: 1.6;
  color: #737373;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .section-subtitle {
    font-size: 16px;          /* Mobil */
  }
}
```

### Scroll Snap (Opsiyonel)
```css
/* Smooth scroll snap */
.sections-container {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}

.section {
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}
```

---

## [◈] Typography (Minimal - Büyük Font YOK)

### Font Sizes
**Apple/Vercel gibi - Büyük başlıklar YOK:**

```typescript
const typography = {
  // Headings
  h1: {
    mobile: '28px',           // MAX 32px
    desktop: '36px',          // MAX 40px
    weight: 600,
    lineHeight: 1.2,
  },
  h2: {
    mobile: '24px',
    desktop: '28px',
    weight: 600,
    lineHeight: 1.3,
  },
  h3: {
    mobile: '20px',
    desktop: '24px',
    weight: 600,
    lineHeight: 1.4,
  },
  h4: {
    mobile: '18px',
    desktop: '20px',
    weight: 600,
    lineHeight: 1.4,
  },
  
  // Body
  body: {
    mobile: '14px',
    desktop: '16px',
    weight: 400,
    lineHeight: 1.6,
  },
  bodyLarge: {
    mobile: '16px',
    desktop: '18px',
    weight: 400,
    lineHeight: 1.6,
  },
  
  // Small
  small: {
    mobile: '12px',
    desktop: '14px',
    weight: 400,
    lineHeight: 1.5,
  },
  
  // Caption
  caption: {
    mobile: '11px',
    desktop: '12px',
    weight: 400,
    lineHeight: 1.4,
  },
};
```

### Font Family
```css
/* System font stack - Native app hissi */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

### Font Weights
```typescript
const fontWeights = {
  normal: 400,    // Body text
  medium: 500,    // Emphasis
  semibold: 600,  // Headings
  // ❌ Bold (700) YOK
  // ❌ Heavy (800+) YOK
};
```

---

## [◈] Spacing System

### Spacing Scale
```typescript
const spacing = {
  0: '0px',
  1: '4px',     // xs
  2: '8px',     // sm
  3: '12px',    // md
  4: '16px',    // lg
  5: '20px',    // xl
  6: '24px',    // 2xl
  8: '32px',    // 3xl
  10: '40px',   // 4xl
  12: '48px',   // 5xl
  16: '64px',   // 6xl
  20: '80px',   // 7xl
  24: '96px',   // 8xl
  32: '128px',  // 9xl
};
```

### Section Spacing
```typescript
const sectionSpacing = {
  mobile: {
    padding: '48px 16px',
    gap: '32px',
  },
  desktop: {
    padding: '64px 24px',
    gap: '48px',
  },
  divider: '80px',  // Section arası boşluk
};
```

---

## [◈] Color System

### Color Palette
**Minimal, premium, Vercel/Apple benzeri - Aktif renk YOK:**

```css
/* Background Colors */
--background: #FFFFFF;        /* Ana background - Beyaz */
--surface: #F5F5F5;          /* Card, panel background - Açık gri */
--surface-hover: #EBEBEB;    /* Hover state - Biraz daha koyu */

/* Border Colors */
--border: #E5E7EB;           /* Default border */
--border-light: #F3F4F6;     /* Light border */
--border-dark: #D1D5DB;      /* Dark border */

/* Text Colors */
--text-primary: #000000;     /* Ana metin - Siyah */
--text-secondary: #737373;   /* İkincil metin - Gri */
--text-muted: #A3A3A3;       /* Soluk metin - Açık gri */

/* Accent Colors (Minimal kullanım - Sadece CTA'larda) */
--accent: #16A34A;           /* Yeşil - SADECE CTA butonlarında */
--accent-hover: #15803D;     /* Hover state */
--accent-light: #F0FDF4;     /* Light background */

/* Semantic Colors (Minimal kullanım) */
--success: #16A34A;          /* Başarı mesajları */
--error: #DC2626;            /* Hata mesajları */
--warning: #F59E0B;          /* Uyarı mesajları */
--info: #3B82F6;             /* Bilgi mesajları */

/* ÖNEMLİ: Aktif renk kullanma! */
/* Tasarım beyaz, siyah ve #F5F5F5 üzerine kurulu */
/* Accent renk SADECE CTA butonlarında kullanılacak */
```

### Background Colors
```typescript
const backgrounds = {
  default: '#FFFFFF',
  surface: '#F9FAFB',
  elevated: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
};
```

---

## [◈] Components

### Button
```typescript
const button = {
  // Sizes
  sm: {
    height: '32px',
    padding: '0 12px',
    fontSize: '14px',
  },
  md: {
    height: '40px',
    padding: '0 16px',
    fontSize: '14px',
  },
  lg: {
    height: '48px',
    padding: '0 24px',
    fontSize: '16px',
  },
  
  // Variants
  primary: {
    background: '#16A34A',
    color: '#FFFFFF',
    hover: '#15803D',
  },
  secondary: {
    background: '#F3F4F6',
    color: '#1A1A1A',
    hover: '#E5E7EB',
  },
  outline: {
    background: 'transparent',
    border: '1px solid #E5E7EB',
    color: '#1A1A1A',
    hover: '#F9FAFB',
  },
  
  // Style
  borderRadius: '8px',
  fontWeight: 500,
  transition: '150ms ease',
};
```

### Button Styles
```css
/* Primary Button (SADECE CTA'larda kullan) */
.button-primary {
  background: #16A34A;        /* Yeşil - SADECE CTA */
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 150ms ease;
}

.button-primary:hover {
  background: #15803D;
  transform: translateY(-1px);
}

/* Secondary Button (Minimal - Siyah border) */
.button-secondary {
  background: transparent;
  color: #000000;             /* Siyah metin */
  border: 1px solid #000000;  /* Siyah border */
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 150ms ease;
}

.button-secondary:hover {
  background: #F5F5F5;        /* Açık gri background */
  border-color: #000000;
}

/* Ghost Button (Minimal) */
.button-ghost {
  background: transparent;
  color: #737373;             /* Gri metin */
  border: none;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 150ms ease;
}

.button-ghost:hover {
  color: #000000;             /* Siyah metin */
  background: #F5F5F5;        /* Açık gri background */
}
```

### Card
```typescript
const card = {
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  padding: {
    mobile: '16px',
    desktop: '24px',
  },
  shadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  hover: {
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
    transition: '200ms ease',
  },
};
```

### Card Styles
```css
/* Default Card (Minimal - Beyaz background) */
.card {
  background: #FFFFFF;        /* Beyaz */
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
}

.card:hover {
  border-color: #D1D5DB;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);  /* Minimal shadow */
}

/* Elevated Card (Minimal shadow) */
.card-elevated {
  background: #FFFFFF;        /* Beyaz */
  border: none;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);  /* Minimal shadow */
  transition: all 200ms ease;
}

.card-elevated:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  /* Minimal shadow */
  transform: translateY(-1px);                 /* Subtle lift */
}

/* Surface Card (Açık gri background) */
.card-surface {
  background: #F5F5F5;        /* Açık gri - #f5f5f5 */
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
}
```

### Input
```typescript
const input = {
  height: '48px',
  padding: '0 16px',
  fontSize: '16px',
  background: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  focus: {
    border: '1px solid #16A34A',
    outline: '2px solid rgba(22, 163, 74, 0.1)',
  },
};
```

---

## [◈] Animations

### Transitions
```typescript
const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
  
  // Easing functions
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
};
```

### Animations
```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale */
@keyframes scale {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
```

---

## [◈] Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',    // Mobile landscape
  md: '768px',    // Tablet
  lg: '1024px',   // Desktop
  xl: '1280px',   // Large desktop
  '2xl': '1536px', // Extra large
};
```

---

## [◈] Accessibility

### Touch Targets
```typescript
const touchTargets = {
  minimum: '48x48px',
  recommended: '56x56px',
  spacing: '8px',  // Minimum spacing between targets
};
```

### Focus States
```css
/* Keyboard focus */
:focus-visible {
  outline: 2px solid #16A34A;
  outline-offset: 2px;
}
```

---

## [□] Diğer Dokümantasyon

- [CONTEXT.md](CONTEXT.md) - Tasarım prensipleri
- [TECH-STACK.md](TECH-STACK.md) - UI framework
- [STEP-08-FRONTEND-HOMEPAGE.md](STEP-08-FRONTEND-HOMEPAGE.md) - Section implementasyonu
