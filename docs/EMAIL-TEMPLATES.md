# Email Templates - Premium Tasarım

## [>] Genel Bakış

**Özellikler:**
- Premium, modern tasarım
- Site tasarımına uygun (brand colors, typography)
- Responsive (mobile-friendly)
- React Email ile oluşturulmuş
- Tüm email client'larda çalışır
- Dashboard'dan özelleştirilebilir

## [◈] Email Template Sistemi

### React Email
**Kullanılan paketler:**
- `react-email` - Email template framework
- `@react-email/components` - Hazır componentler
- `@react-email/render` - HTML'e dönüştürme

### Installation
```bash
npm install react-email @react-email/components
npm install -D @react-email/render
```

### Folder Structure
```
src/
├── emails/
│   ├── templates/
│   │   ├── PriceQuoteEmail.tsx
│   │   ├── ContactFormEmail.tsx
│   │   ├── ReviewRequestEmail.tsx
│   │   └── WelcomeEmail.tsx
│   ├── components/
│   │   ├── EmailLayout.tsx
│   │   ├── EmailHeader.tsx
│   │   ├── EmailFooter.tsx
│   │   └── EmailButton.tsx
│   └── styles/
│       └── email-theme.ts
```

## [◈] Email Templates

### 1. Fiyat Teklifi Email (Price Quote)

**Dosya:** `src/emails/templates/PriceQuoteEmail.tsx`

```typescript
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Row,
  Column,
} from '@react-email/components';

interface PriceQuoteEmailProps {
  customerName: string;
  sourceCity: string;
  targetCity: string;
  distance: number;
  duration: number;
  priceMin: number;
  priceMax: number;
  siteName: string;
  siteUrl: string;
  phone: string;
  email: string;
}

export default function PriceQuoteEmail({
  customerName,
  sourceCity,
  targetCity,
  distance,
  duration,
  priceMin,
  priceMax,
  siteName,
  siteUrl,
  phone,
  email,
}: PriceQuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {sourceCity} {targetCity} Evden Eve Nakliyat Fiyat Teklifi
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${siteUrl}/logo-beyaz.svg`}
              width="150"
              height="50"
              alt={siteName}
              style={logo}
            />
          </Section>

          {/* Hero */}
          <Section style={hero}>
            <Heading style={h1}>
              Fiyat Teklifiniz Hazır!
            </Heading>
            <Text style={heroText}>
              Merhaba {customerName},
            </Text>
            <Text style={heroText}>
              {sourceCity}'dan {targetCity}'e evden eve nakliyat talebiniz için
              fiyat teklifimiz aşağıdadır.
            </Text>
          </Section>

          {/* Route Info */}
          <Section style={infoBox}>
            <Row>
              <Column style={infoColumn}>
                <Text style={infoLabel}>Rota</Text>
                <Text style={infoValue}>
                  {sourceCity} → {targetCity}
                </Text>
              </Column>
              <Column style={infoColumn}>
                <Text style={infoLabel}>Mesafe</Text>
                <Text style={infoValue}>{distance} km</Text>
              </Column>
              <Column style={infoColumn}>
                <Text style={infoLabel}>Süre</Text>
                <Text style={infoValue}>{duration} saat</Text>
              </Column>
            </Row>
          </Section>

          {/* Pricing */}
          <Section style={pricingBox}>
            <Heading style={h2}>Fiyat Aralığı</Heading>
            <Text style={priceRange}>
              {priceMin.toLocaleString('tr-TR')}₺ - {priceMax.toLocaleString('tr-TR')}₺
            </Text>
            <Text style={priceNote}>
              * Fiyat, ev büyüklüğü ve asansör durumuna göre değişebilir.
            </Text>
          </Section>

          {/* Services */}
          <Section style={servicesBox}>
            <Heading style={h2}>Hizmetlerimiz</Heading>
            <Row>
              <Column>
                <Text style={serviceItem}>✓ Profesyonel Paketleme</Text>
                <Text style={serviceItem}>✓ Sigortalı Taşıma</Text>
                <Text style={serviceItem}>✓ Eşya Montaj/Demontaj</Text>
              </Column>
              <Column>
                <Text style={serviceItem}>✓ 7/24 Müşteri Desteği</Text>
                <Text style={serviceItem}>✓ Asansörlü/Asansörsüz</Text>
                <Text style={serviceItem}>✓ Uygun Fiyat Garantisi</Text>
              </Column>
            </Row>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button
              href={`${siteUrl}/iletisim`}
              style={button}
            >
              Hemen Rezervasyon Yap
            </Button>
            <Text style={ctaText}>
              veya bizi arayın:{' '}
              <Link href={`tel:${phone}`} style={link}>
                {phone}
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              {siteName}
            </Text>
            <Text style={footerText}>
              <Link href={`tel:${phone}`} style={footerLink}>
                {phone}
              </Link>
              {' | '}
              <Link href={`mailto:${email}`} style={footerLink}>
                {email}
              </Link>
            </Text>
            <Text style={footerText}>
              <Link href={siteUrl} style={footerLink}>
                {siteUrl}
              </Link>
            </Text>
            <Text style={footerSmall}>
              Bu email {customerName} tarafından talep edilmiştir.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#1a1a1a',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const hero = {
  padding: '48px 24px 32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 16px',
  lineHeight: '1.2',
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const heroText = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const infoBox = {
  backgroundColor: '#f9fafb',
  padding: '24px',
  margin: '0 24px 24px',
  borderRadius: '8px',
};

const infoColumn = {
  textAlign: 'center' as const,
};

const infoLabel = {
  color: '#737373',
  fontSize: '12px',
  fontWeight: '500',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 4px',
};

const infoValue = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const pricingBox = {
  padding: '32px 24px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
  borderBottom: '1px solid #e5e7eb',
};

const priceRange = {
  color: '#16a34a',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0 0 8px',
};

const priceNote = {
  color: '#737373',
  fontSize: '14px',
  margin: '0',
};

const servicesBox = {
  padding: '32px 24px',
};

const serviceItem = {
  color: '#525252',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0 0 8px',
};

const ctaSection = {
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  margin: '0 0 16px',
};

const ctaText = {
  color: '#525252',
  fontSize: '14px',
  margin: '0',
};

const link = {
  color: '#1a1a1a',
  textDecoration: 'underline',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 8px',
};

const footerLink = {
  color: '#1a1a1a',
  textDecoration: 'none',
};

const footerSmall = {
  color: '#a3a3a3',
  fontSize: '12px',
  margin: '16px 0 0',
};
```

### 2. İletişim Formu Email

**Dosya:** `src/emails/templates/ContactFormEmail.tsx`

```typescript
export default function ContactFormEmail({
  name,
  email,
  phone,
  message,
  siteName,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Yeni İletişim Formu Mesajı - {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Yeni İletişim Formu Mesajı</Heading>
          </Section>

          <Section style={content}>
            <Text style={label}>İsim:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>E-posta:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Telefon:</Text>
            <Text style={value}>{phone}</Text>

            <Text style={label}>Mesaj:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Bu mesaj {siteName} iletişim formundan gönderilmiştir.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

### 3. Yorum İsteği Email

**Dosya:** `src/emails/templates/ReviewRequestEmail.tsx`

```typescript
export default function ReviewRequestEmail({
  customerName,
  reviewLink,
  siteName,
}: ReviewRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Hizmetimizi Değerlendirir Misiniz?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={hero}>
            <Heading style={h1}>Merhaba {customerName}!</Heading>
            <Text style={text}>
              Hizmetimizden memnun kaldıysanız, deneyiminizi paylaşır mısınız?
              Görüşleriniz bizim için çok değerli.
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Button href={reviewLink} style={button}>
              Değerlendirme Yap
            </Button>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Teşekkürler,<br />
              {siteName} Ekibi
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

## [◈] Email Sending

### Nodemailer Configuration
```typescript
// lib/email/send.ts
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import PriceQuoteEmail from '@/emails/templates/PriceQuoteEmail';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPriceQuoteEmail(data: PriceQuoteEmailProps) {
  const emailHtml = render(<PriceQuoteEmail {...data} />);

  await transporter.sendMail({
    from: `${data.siteName} <${process.env.SMTP_USER}>`,
    to: data.customerEmail,
    subject: `${data.sourceCity} ${data.targetCity} Evden Eve Nakliyat Fiyat Teklifi`,
    html: emailHtml,
  });
}
```

## [◈] Dashboard'dan Email Template Özelleştirme

### Email Settings
**Dashboard > Ayarlar > Email Ayarları**

```typescript
interface EmailSettings {
  // SMTP
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  
  // Branding
  primaryColor: string; // #1a1a1a
  accentColor: string; // #16a34a
  logoUrl: string;
  
  // Content
  footerText: string;
  signatureText: string;
  
  // Templates
  priceQuoteTemplate: {
    subject: string;
    headerText: string;
    ctaButtonText: string;
  };
  contactFormTemplate: {
    subject: string;
  };
  reviewRequestTemplate: {
    subject: string;
    bodyText: string;
  };
}
```

### Email Preview
**Dashboard'da email preview:**
- Gerçek zamanlı önizleme
- Test email gönderme
- Farklı email client'larda görünüm

## [◈] Email Testing

### Development
```bash
# Email preview server
npm run email:dev
```

### Test Email
```typescript
// Send test email
await sendPriceQuoteEmail({
  customerName: 'Test Kullanıcı',
  customerEmail: 'test@example.com',
  sourceCity: 'İstanbul',
  targetCity: 'İzmir',
  distance: 482,
  duration: 5.5,
  priceMin: 1500,
  priceMax: 3500,
  siteName: process.env.NEXT_PUBLIC_SITE_NAME!,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL!,
  phone: process.env.SITE_PHONE!,
  email: process.env.SITE_EMAIL!,
});
```

## [◈] Email Client Compatibility

**Test edilen client'lar:**
- Gmail (Desktop & Mobile)
- Outlook (Desktop & Mobile)
- Apple Mail (Desktop & Mobile)
- Yahoo Mail
- Yandex Mail
- Thunderbird

**Uyumluluk:**
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Retina images
- ✅ Fallback fonts
- ✅ Inline CSS

## [□] Diğer Dokümantasyon

- [TECH-STACK.md](TECH-STACK.md) - Email packages
- [DASHBOARD.md](DASHBOARD.md) - Email settings
- [CONTEXT.md](CONTEXT.md) - Email template özellikleri
