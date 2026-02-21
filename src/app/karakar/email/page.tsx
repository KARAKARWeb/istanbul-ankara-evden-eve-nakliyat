'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Mail } from 'lucide-react';

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  fromName: string;
  fromEmail: string;
}

export default function EmailPage() {
  const [settings, setSettings] = useState({
    smtpHost: '',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: '',
    smtpPass: '',
    fromName: 'Evden Eve Nakliyat',
    fromEmail: 'info@example.com',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [emailRes, siteRes] = await Promise.all([
        fetch('/api/settings/email'),
        fetch('/api/settings/site'),
      ]);
      
      const emailData = await emailRes.json();
      const siteData = await siteRes.json();
      
      // Site ayarlarından fromName ve fromEmail'i otomatik doldur
      setSettings({
        ...emailData,
        fromName: emailData.fromName || siteData.siteName || 'Evden Eve Nakliyat',
        fromEmail: emailData.fromEmail || siteData.email || 'info@example.com',
      });
    } catch (error) {
      console.error('Ayarlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert('Email ayarları kaydedildi!');
      } else {
        alert('Kaydetme başarısız!');
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Bir hata oluştu!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-text-secondary">Yükleniyor...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-text-primary">Email Ayarları</h1>
              <p className="text-sm text-text-secondary mt-1">SMTP ayarlarını buradan yönetin</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>

        <div className="bg-background p-6 rounded-xl border border-border space-y-6">
          <div className="bg-info/10 border border-info/20 rounded-lg p-4">
            <p className="text-sm text-info">
              <strong>Not:</strong> Email ayarları burada kaydedilir ve tüm email gönderimlerinde kullanılır.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">SMTP Sunucu Ayarları</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>SMTP Host</Label>
                <Input
                  value={settings.smtpHost}
                  onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                  placeholder="smtp.gmail.com"
                />
                <p className="text-xs text-text-muted mt-1">SMTP sunucu adresi</p>
              </div>

              <div>
                <Label>SMTP Port</Label>
                <Input
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => setSettings({ ...settings, smtpPort: parseInt(e.target.value) })}
                  placeholder="587"
                />
                <p className="text-xs text-text-muted mt-1">Genelde 587 veya 465</p>
              </div>
            </div>

            <div>
              <Label>SMTP Kullanıcı Adı</Label>
              <Input
                value={settings.smtpUser}
                onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                placeholder="info@domain.com"
              />
              <p className="text-xs text-text-muted mt-1">Email adresi veya kullanıcı adı</p>
            </div>

            <div>
              <Label>SMTP Şifre</Label>
              <Input
                type="password"
                value={settings.smtpPass}
                onChange={(e) => setSettings({ ...settings, smtpPass: e.target.value })}
                placeholder="••••••••"
              />
              <p className="text-xs text-text-muted mt-1">Gmail için App Password kullanın</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smtpSecure"
                checked={settings.smtpSecure}
                onChange={(e) => setSettings({ ...settings, smtpSecure: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="smtpSecure" className="cursor-pointer">
                SSL/TLS Kullan (Port 465 için)
              </Label>
            </div>
          </div>

          <div className="pt-6 border-t border-border space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Gönderici Bilgileri</h2>
            
            <div>
              <Label>Gönderici Adı</Label>
              <Input
                value={settings.fromName}
                onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                placeholder="Evden Eve Nakliyat"
              />
              <p className="text-xs text-success mt-1">✓ Site ayarlarından otomatik çekildi</p>
            </div>

            <div>
              <Label>Gönderici Email</Label>
              <Input
                type="email"
                value={settings.fromEmail}
                onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                placeholder="info@example.com"
              />
              <p className="text-xs text-success mt-1">✓ Site ayarlarından otomatik çekildi</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
