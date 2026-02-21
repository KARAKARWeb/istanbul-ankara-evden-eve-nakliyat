/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: false, // robots.ts kullanıyoruz
  generateIndexSitemap: false, // Next.js sitemap.ts kullanıyoruz
  exclude: ['/dashboard/*', '/api/*', '/offline', '/*'], // Hiçbir şey generate etme
};
