import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const EMAIL_SETTINGS_FILE = path.join(process.cwd(), 'data/settings/email.json');

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
}

const defaultSettings: EmailSettings = {
  smtpHost: '',
  smtpPort: 587,
  smtpSecure: false,
  smtpUser: '',
  smtpPass: '',
  fromName: 'Evden Eve Nakliyat',
  fromEmail: 'info@example.com',
};

async function ensureSettingsFile() {
  try {
    const dir = path.dirname(EMAIL_SETTINGS_FILE);
    await fs.mkdir(dir, { recursive: true });
    
    try {
      await fs.access(EMAIL_SETTINGS_FILE);
    } catch {
      await fs.writeFile(EMAIL_SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring settings file:', error);
  }
}

export async function GET() {
  try {
    await ensureSettingsFile();
    const data = await fs.readFile(EMAIL_SETTINGS_FILE, 'utf-8');
    const settings = JSON.parse(data);
    
    // Şifreyi gizle
    return NextResponse.json({
      ...settings,
      smtpPass: settings.smtpPass ? '••••••••' : '',
    });
  } catch (error) {
    return NextResponse.json(defaultSettings, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await ensureSettingsFile();
    
    // Mevcut ayarları oku
    let currentSettings = defaultSettings;
    try {
      const data = await fs.readFile(EMAIL_SETTINGS_FILE, 'utf-8');
      currentSettings = JSON.parse(data);
    } catch {
      // Dosya yoksa default kullan
    }
    
    // Şifre değiştirilmediyse eski şifreyi koru
    const newSettings: EmailSettings = {
      smtpHost: body.smtpHost || currentSettings.smtpHost,
      smtpPort: parseInt(body.smtpPort) || currentSettings.smtpPort,
      smtpSecure: body.smtpSecure === true,
      smtpUser: body.smtpUser || currentSettings.smtpUser,
      smtpPass: body.smtpPass && body.smtpPass !== '••••••••' ? body.smtpPass : currentSettings.smtpPass,
      fromName: body.fromName || currentSettings.fromName,
      fromEmail: body.fromEmail || currentSettings.fromEmail,
    };
    
    await fs.writeFile(EMAIL_SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving email settings:', error);
    return NextResponse.json({ error: 'Kaydetme başarısız' }, { status: 500 });
  }
}
