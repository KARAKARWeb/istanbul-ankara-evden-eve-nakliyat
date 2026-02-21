import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: {
    name: string;
    email: string;
  };
}

// Email config'i JSON dosyasından al
export function getEmailConfig(): EmailConfig {
  try {
    const emailSettingsPath = path.join(process.cwd(), 'data/settings/email.json');
    const siteSettingsPath = path.join(process.cwd(), 'data/settings/site.json');
    
    const emailData = JSON.parse(fs.readFileSync(emailSettingsPath, 'utf-8'));
    const siteData = JSON.parse(fs.readFileSync(siteSettingsPath, 'utf-8'));
    
    return {
      host: emailData.smtpHost || 'smtp.gmail.com',
      port: emailData.smtpPort || 587,
      secure: emailData.smtpSecure || false,
      auth: {
        user: emailData.smtpUser || '',
        pass: emailData.smtpPass || '',
      },
      from: {
        name: emailData.fromName || siteData.siteName || 'Evden Eve Nakliyat',
        email: emailData.fromEmail || siteData.email || emailData.smtpUser || '',
      },
    };
  } catch (error) {
    console.error('Email config okuma hatası:', error);
    return {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
      from: {
        name: 'Evden Eve Nakliyat',
        email: '',
      },
    };
  }
}

// Nodemailer transporter oluştur
export function createTransporter() {
  const config = getEmailConfig();
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });
}

// Email config'in geçerli olup olmadığını kontrol et
export function isEmailConfigured(): boolean {
  const config = getEmailConfig();
  return !!(config.auth.user && config.auth.pass);
}
