import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    // Ana sayfa HTML'ini çek
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SchemaValidator/1.0)',
      },
    });
    const html = await response.text();
    
    // Schema'ları kontrol et - hem @type hem de type formatlarını kontrol et
    const hasOrganizationSchema = 
      html.includes('"@type":"Organization"') || 
      html.includes('"@type": "Organization"') ||
      html.includes('type="Organization"');
    
    const hasLocalBusinessSchema = 
      html.includes('"@type":"LocalBusiness"') || 
      html.includes('"@type": "LocalBusiness"') ||
      html.includes('type="LocalBusiness"');
    
    const hasBreadcrumbSchema = 
      html.includes('"@type":"BreadcrumbList"') || 
      html.includes('"@type": "BreadcrumbList"') ||
      html.includes('type="BreadcrumbList"');
    
    const hasWebSiteSchema = 
      html.includes('"@type":"WebSite"') || 
      html.includes('"@type": "WebSite"') ||
      html.includes('type="WebSite"');
    
    const hasServiceSchema = 
      html.includes('"@type":"Service"') || 
      html.includes('"@type": "Service"') ||
      html.includes('type="Service"');
    
    // JSON-LD script tag'lerini say
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">/g);
    const jsonLdCount = jsonLdMatches ? jsonLdMatches.length : 0;
    
    const errors = [];
    const warnings = [];
    
    if (!hasOrganizationSchema) {
      errors.push('Organization schema bulunamadı');
    }
    
    if (!hasWebSiteSchema) {
      warnings.push('WebSite schema bulunamadı');
    }
    
    if (!hasLocalBusinessSchema) {
      warnings.push('LocalBusiness schema bulunamadı (ana sayfa için önerilir)');
    }
    
    if (!hasBreadcrumbSchema) {
      warnings.push('Breadcrumb schema bulunamadı (sayfa navigasyonu için önerilir)');
    }
    
    if (!hasServiceSchema) {
      warnings.push('Service schema bulunamadı (hizmet sayfaları için önerilir)');
    }
    
    return NextResponse.json({
      valid: errors.length === 0,
      errors,
      warnings,
      schemas: {
        organization: hasOrganizationSchema,
        localBusiness: hasLocalBusinessSchema,
        breadcrumb: hasBreadcrumbSchema,
        webSite: hasWebSiteSchema,
        service: hasServiceSchema,
      },
      stats: {
        jsonLdCount,
        htmlLength: html.length,
      },
    });
  } catch (error) {
    console.error('Schema validation error:', error);
    return NextResponse.json({ 
      valid: false, 
      errors: ['Validation başarısız: ' + (error as Error).message] 
    }, { status: 500 });
  }
}
