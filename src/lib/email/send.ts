import { render } from '@react-email/components';
import { createTransporter, getEmailConfig, isEmailConfigured } from './config';
import PriceQuoteEmail from '@/emails/templates/PriceQuoteEmail';
import ContactFormEmail from '@/emails/templates/ContactFormEmail';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface PriceQuoteData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  sourceCity: string;
  targetCity: string;
  apartmentSize: string;
  hasElevator: boolean;
  movingDate: string;
  estimatedPrice: number;
  distance: number;
  duration: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType?: string;
  preferredDate?: string;
  fromCity?: string;
  fromAddress?: string;
  toCity?: string;
  toAddress?: string;
  message: string;
}

// Genel email gönderme fonksiyonu
export async function sendEmail(options: SendEmailOptions) {
  if (!isEmailConfigured()) {
    throw new Error('Email yapılandırması eksik. SMTP ayarlarını kontrol edin.');
  }

  const config = getEmailConfig();
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"${config.from.name}" <${config.from.email}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw new Error('Email gönderilemedi');
  }
}

// Fiyat teklifi emaili gönder
export async function sendPriceQuoteEmail(data: PriceQuoteData) {
  const emailHtml = await render(
    PriceQuoteEmail({
      customerName: data.customerName,
      phone: data.customerPhone,
      email: data.customerEmail,
      fromCity: data.sourceCity,
      toCity: data.targetCity,
      message: `Tahmini Fiyat: ${data.estimatedPrice}₺ | Mesafe: ${data.distance}km | Süre: ${data.duration} saat`,
    })
  );
  
  return sendEmail({
    to: data.customerEmail,
    subject: `${data.sourceCity} - ${data.targetCity} Nakliyat Fiyat Teklifi`,
    html: emailHtml,
  });
}

// İletişim formu emaili gönder
export async function sendContactFormEmail(data: ContactFormData) {
  const config = getEmailConfig();
  
  // Ana sayfa formu (Fiyat Teklifi) için PriceQuoteEmail kullan
  const isPriceQuote = data.serviceType || data.fromCity || data.toCity;
  
  const emailHtml = await render(
    isPriceQuote ? (
      PriceQuoteEmail({
        customerName: data.name,
        phone: data.phone,
        email: data.email,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        fromCity: data.fromCity,
        fromAddress: data.fromAddress,
        toCity: data.toCity,
        toAddress: data.toAddress,
        message: data.message,
      })
    ) : (
      ContactFormEmail({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
      })
    )
  );
  
  // Müşteriye otomatik yanıt (email varsa)
  if (data.email) {
    try {
      await sendEmail({
        to: data.email,
        subject: isPriceQuote ? 'Fiyat Teklifi Talebiniz Alındı' : 'Mesajınız Alındı',
        html: emailHtml,
      });
    } catch (error) {
      console.error('Müşteriye email gönderilemedi:', error);
    }
  }
  
  // Firmaya bildirim
  return sendEmail({
    to: config.from.email,
    subject: isPriceQuote ? `Yeni Fiyat Teklifi Talebi - ${data.name}` : `Yeni İletişim Formu - ${data.name}`,
    html: emailHtml,
  });
}

// Email gönderme testi
export async function testEmailConnection() {
  if (!isEmailConfigured()) {
    return {
      success: false,
      error: 'Email yapılandırması eksik',
    };
  }

  const transporter = createTransporter();
  
  try {
    await transporter.verify();
    return {
      success: true,
      message: 'Email bağlantısı başarılı',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Email bağlantısı başarısız',
    };
  }
}
