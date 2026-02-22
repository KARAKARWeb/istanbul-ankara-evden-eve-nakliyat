import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { PWAInstall } from '@/components/shared/PWAInstall';
import { ThemeProvider } from '@/components/ThemeProvider';
import { GlobalMetaTags } from '@/components/seo/MetaTags';
import { CustomScripts, CustomBodyScripts, CustomFooterScripts } from '@/components/seo/CustomScripts';
import { getSiteSettings } from '@/lib/seo/getContactSettings';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/generateSchemas';
import { SchemaRenderer } from '@/components/seo/SchemaRenderer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'optional',
  preload: true,
  variable: '--font-inter',
});

// Dinamik metadata - site.json'dan çekilecek
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (site.domain ? `https://${site.domain}` : 'https://example.com');
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s',
      default: site.siteName || 'Evden Eve Nakliyat',
    },
    alternates: {
      canonical: '/',
      languages: {
        'tr': '/',
        'x-default': '/',
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: baseUrl,
      siteName: site.siteName || 'Evden Eve Nakliyat',
      title: site.siteTitle || site.siteName || 'Evden Eve Nakliyat',
      description: site.description || 'Profesyonel evden eve nakliyat hizmeti',
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${site.siteName || 'Evden Eve Nakliyat'} - Profesyonel Taşımacılık Hizmeti`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.siteName || 'Evden Eve Nakliyat',
      description: site.description || 'Profesyonel evden eve nakliyat hizmeti',
      images: ["/og-image.jpg"],
    },
    verification: {
      google: "google-site-verification-code",
    },
    other: {
      'content-language': 'tr',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dinamik schema'ları server-side oluştur
  const organizationSchema = await generateOrganizationSchema();
  const websiteSchema = await generateWebSiteSchema();
  
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Font Preload */}
        <link
          rel="preload"
          href="/_next/static/media/1bffadaabf893a1e-s.7cd81963.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://istanbulankaraevdenevenakliye.com.tr" />
        {/* Resource Hints - Performance Optimization */}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/logo-koyu.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        
        <CustomScripts />
      </head>
      <body className={inter.className}>
        {/* Global Schema.org Markup - Dinamik */}
        <SchemaRenderer schema={organizationSchema} />
        <SchemaRenderer schema={websiteSchema} />
        
        <CustomBodyScripts />
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <PWAInstall />
        
        <CustomFooterScripts />
      </body>
    </html>
  );
}
