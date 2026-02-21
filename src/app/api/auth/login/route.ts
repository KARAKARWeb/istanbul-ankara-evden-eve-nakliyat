import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '@/lib/auth/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // IP adresi al
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limit kontrolü
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt! - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { error: `Çok fazla başarısız deneme. ${resetIn} dakika sonra tekrar deneyin.` },
        { status: 429 }
      );
    }
    
    // Kullanıcı adı kontrolü
    const validUsername = process.env.DASHBOARD_USERNAME || 'admin';
    if (username !== validUsername) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { 
          error: 'Hatalı kullanıcı adı veya şifre',
          remainingAttempts: rateLimit.remainingAttempts - 1,
        },
        { status: 401 }
      );
    }
    
    // Şifre kontrolü
    const passwordHash = process.env.DASHBOARD_PASSWORD_HASH || '$2b$10$Cf29AXToUmAcQjH9MLDiTeQXO6gMo4Es7BCIFSr5eZoFKT6t33OlO';
    console.log('ENV Hash:', process.env.DASHBOARD_PASSWORD_HASH);
    console.log('Using Hash:', passwordHash);
    
    const isValid = await verifyPassword(password, passwordHash);
    
    if (!isValid) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { 
          error: 'Hatalı kullanıcı adı veya şifre',
          remainingAttempts: rateLimit.remainingAttempts - 1,
        },
        { status: 401 }
      );
    }
    
    // Başarılı giriş
    resetRateLimit(ip);
    await createSession();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
