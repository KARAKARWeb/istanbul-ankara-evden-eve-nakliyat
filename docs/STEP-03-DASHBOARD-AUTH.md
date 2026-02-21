# STEP 3: Dashboard Authentication

## [>] Hedef

Basit şifre tabanlı dashboard authentication sistemi kurmak.

## [◆] Authentication Stratejisi

- Tek kullanıcı
- Şifre bcrypt ile hash'lenir
- Session cookie ile oturum yönetimi
- Rate limiting (brute force koruması)

## [□] Dosyalar

### 1. Auth Utilities

**src/lib/auth/password.ts**
```typescript
import bcrypt from 'bcryptjs';

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
```

**src/lib/auth/session.ts**
```typescript
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'dashboard-session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 gün

export async function createSession() {
  const cookieStore = await cookies();
  const sessionToken = generateSessionToken();
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
  
  return sessionToken;
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
```

**src/lib/auth/rate-limit.ts**
```typescript
interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 dakika
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 saat

// Periyodik temizleme
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(ip);
    }
  }
}, CLEANUP_INTERVAL);

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remainingAttempts: number;
  resetAt?: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.resetAt < now) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }
  
  if (entry.attempts >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      remainingAttempts: 0,
      resetAt: entry.resetAt,
    };
  }
  
  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - entry.attempts,
  };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, {
      attempts: 1,
      resetAt: now + LOCKOUT_DURATION,
    });
  } else {
    entry.attempts += 1;
  }
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}
```

### 2. Middleware (Dashboard Koruması)

**src/middleware.ts**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Dashboard route'ları koru
  if (pathname.startsWith('/dashboard')) {
    // Login sayfası hariç
    if (pathname === '/dashboard/login') {
      return NextResponse.next();
    }
    
    // Session kontrolü
    const session = request.cookies.get('dashboard-session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

### 3. Login API Route

**src/app/api/auth/login/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { checkRateLimit, recordFailedAttempt, resetRateLimit } from '@/lib/auth/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // IP adresi al
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limit kontrolü
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const resetIn = Math.ceil((rateLimit.resetAt! - Date.now()) / 1000 / 60);
      return NextResponse.json(
        { error: `Çok fazla başarısız deneme. ${resetIn} dakika sonra tekrar deneyin.` },
        { status: 429 }
      );
    }
    
    // Şifre kontrolü
    const passwordHash = process.env.DASHBOARD_PASSWORD_HASH;
    if (!passwordHash) {
      return NextResponse.json(
        { error: 'Dashboard şifresi yapılandırılmamış' },
        { status: 500 }
      );
    }
    
    const isValid = await verifyPassword(password, passwordHash);
    
    if (!isValid) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { 
          error: 'Hatalı şifre',
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
```

**src/app/api/auth/logout/route.ts**
```typescript
import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/auth/session';

export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true });
}
```

### 4. Login Sayfası

**src/app/dashboard/login/page.tsx**
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Girişi</h1>
          <p className="text-gray-600 mt-2">Devam etmek için şifrenizi girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### 5. Dashboard Layout

**src/app/dashboard/layout.tsx**
```typescript
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect('/dashboard/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
```

### 6. Dashboard Ana Sayfa

**src/app/dashboard/page.tsx**
```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/dashboard/login');
    router.refresh();
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Hoş Geldiniz!</h2>
          <p className="text-gray-600">
            Dashboard authentication başarıyla kuruldu. Sonraki adımlarda dashboard özellikleri eklenecek.
          </p>
        </div>
      </div>
    </div>
  );
}
```

## [✓] Test

### 1. Şifre Hash Oluştur

```bash
npm run generate-password admin123
```

Çıkan hash'i `.env.local` dosyasındaki `DASHBOARD_PASSWORD_HASH` değerine yapıştır.

### 2. Development Server Başlat

```bash
npm run dev
```

### 3. Test Senaryoları

1. **Korumalı route testi:**
   - `http://localhost:3000/dashboard` adresine git
   - Login sayfasına yönlendirilmelisin

2. **Login testi:**
   - Şifre: `admin123` (veya belirlediğin şifre)
   - Başarılı giriş sonrası dashboard'a yönlendirilmelisin

3. **Rate limiting testi:**
   - 5 kez yanlış şifre gir
   - 6. denemede "Çok fazla başarısız deneme" hatası almalısın

4. **Logout testi:**
   - "Çıkış Yap" butonuna tıkla
   - Login sayfasına yönlendirilmelisin

5. **Session testi:**
   - Login ol
   - Tarayıcıyı kapat
   - Tekrar aç ve `/dashboard` adresine git
   - Session hala geçerliyse dashboard'a erişebilmelisin

## [✓] Kontrol Listesi

- [ ] Auth utilities oluşturuldu
- [ ] Middleware eklendi
- [ ] Login API route oluşturuldu
- [ ] Logout API route oluşturuldu
- [ ] Login sayfası oluşturuldu
- [ ] Dashboard layout oluşturuldu
- [ ] Dashboard ana sayfa oluşturuldu
- [ ] Şifre hash oluşturuldu ve .env.local'e eklendi
- [ ] Tüm test senaryoları başarılı

## [◆] Güvenlik Notları

- ✅ Şifre bcrypt ile hash'lenir (10 rounds)
- ✅ Session cookie httpOnly (XSS koruması)
- ✅ Session cookie secure (production'da HTTPS)
- ✅ Rate limiting (brute force koruması)
- ✅ IP bazlı takip
- ✅ Otomatik temizleme (memory leak önleme)

## [▷] Sonraki Adım

[STEP-04-DASHBOARD-SETTINGS.md](STEP-04-DASHBOARD-SETTINGS.md) - Dashboard ayarlar sayfasını oluşturmaya geçin.
