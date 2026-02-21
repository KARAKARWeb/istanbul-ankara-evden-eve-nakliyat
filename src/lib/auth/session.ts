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
