import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      phone, 
      email, 
      serviceType,
      preferredDate,
      fromCity,
      fromAddress,
      toCity,
      toAddress,
      message 
    } = body;
    
    // Basit validasyon
    if (!name || !phone) {
      return NextResponse.json({ error: 'Ad ve telefon zorunludur' }, { status: 400 });
    }
    
    // Email gönder
    try {
      await sendContactFormEmail({
        name,
        phone,
        email: email || '',
        serviceType: serviceType || '',
        preferredDate: preferredDate || '',
        fromCity: fromCity || '',
        fromAddress: fromAddress || '',
        toCity: toCity || '',
        toAddress: toAddress || '',
        message: message || '',
      });
    } catch (emailError) {
      console.error('Email gönderimi başarısız:', emailError);
      // Email hatası olsa bile formu kabul et
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      error: 'Mesaj gönderilemedi. Lütfen telefon ile iletişime geçin.' 
    }, { status: 500 });
  }
}
