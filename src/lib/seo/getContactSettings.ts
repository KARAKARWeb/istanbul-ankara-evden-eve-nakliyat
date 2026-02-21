import fs from 'fs';
import path from 'path';

interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  whatsappNumber: string;
}

interface SiteSettings {
  siteName: string;
  siteTitle: string;
  description: string;
  domain: string;
}

export async function getContactSettings(): Promise<ContactSettings> {
  const filePath = path.join(process.cwd(), 'data', 'settings', 'contact.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const filePath = path.join(process.cwd(), 'data', 'settings', 'site.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Telefon numarasını schema formatına çevir (+90 532 138 4979 -> +905321384979)
export function formatPhoneForSchema(phone: string): string {
  return phone.replace(/\s+/g, '');
}

// Adresi parse et
export function parseAddress(address: string) {
  // "Kaynarca Mah. Bahattin Veled Cad. No:37 34890 Pendik / İstanbul"
  const parts = address.split('/').map(s => s.trim());
  const cityRegion = parts[1] || 'İstanbul';
  
  const addressParts = parts[0].split(' ');
  const postalCode = addressParts.find(p => /^\d{5}$/.test(p)) || '34890';
  const locality = addressParts[addressParts.indexOf(postalCode) + 1] || 'Pendik';
  
  const streetAddress = parts[0].substring(0, parts[0].indexOf(postalCode)).trim();
  
  return {
    streetAddress,
    addressLocality: locality,
    addressRegion: cityRegion,
    postalCode,
    addressCountry: 'TR',
  };
}
