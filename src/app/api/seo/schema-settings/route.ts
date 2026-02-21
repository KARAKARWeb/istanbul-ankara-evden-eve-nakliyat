import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    organizationSchema: 'auto',
    localBusinessSchema: 'auto',
    breadcrumbSchema: 'auto',
  });
}

export async function POST() {
  return NextResponse.json({ success: true });
}
