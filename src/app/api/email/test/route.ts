import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { testEmailConnection } from '@/lib/email/send';

// GET - Email bağlantısını test et
export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const result = await testEmailConnection();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Test başarısız' 
    }, { status: 500 });
  }
}
