'use client';

import { useEffect, useState } from 'react';

interface GlobalMetaTagsProps {
  siteSettings?: any;
}

// Global Meta Tags Component - Tüm sayfalarda kullanılacak
export function GlobalMetaTags({ siteSettings }: GlobalMetaTagsProps = {}) {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  const author = siteSettings?.author || siteSettings?.siteName || 'Site';
  const appTitle = siteSettings?.siteName || 'App';

  return (
    <>
      {/* Viewport - Next.js metadata'dan gelecek ama yedek olarak */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="tr" />
      <meta name="language" content="Turkish" />
      
      {/* Author - Dinamik */}
      <meta name="author" content={author} />
      
      {/* Robots - Next.js metadata'dan gelecek ama yedek olarak */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Format Detection */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#16A34A" />
      <meta name="msapplication-TileColor" content="#16A34A" />
      
      {/* Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={appTitle} />
      
      {/* Hreflang - Turkish only */}
      <link rel="alternate" hrefLang="tr" href={baseUrl} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
    </>
  );
}

// Page-specific Meta Tags
interface PageMetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  siteSettings?: any;
}

export function PageMetaTags({
  title, 
  description, 
  canonicalUrl,
  keywords,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  ogImageAlt,
  article,
  siteSettings
}: PageMetaTagsProps) {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  const canonicalToUse = canonicalUrl || '';
  const fullCanonical = canonicalToUse.startsWith('http') ? canonicalToUse : `${baseUrl}${canonicalToUse}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const siteName = siteSettings?.siteName || 'Site';
  const twitterHandle = siteSettings?.social?.twitter || '@site';
  const facebookUrl = siteSettings?.social?.facebook || 'https://facebook.com/';
  const defaultOgImageAlt = ogImageAlt || siteName;

  return (
    <>
      {/* Canonical */}
      <link rel="canonical" href={fullCanonical} />
      
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={defaultOgImageAlt} />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Article specific OG tags */}
      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article?.tags && article.tags.map((tag: string, i: number) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
          <meta property="article:publisher" content={facebookUrl} />
        </>
      )}
      
      {/* Twitter Card - Dinamik */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={defaultOgImageAlt} />
      
      {/* Hreflang for this page */}
      <link rel="alternate" hrefLang="tr" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
    </>
  );
}
