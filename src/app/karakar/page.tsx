import Link from 'next/link';
import { Settings, FileText, MapPin, DollarSign, Users, Mail, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Toplam Bölge', value: '30', icon: MapPin, color: 'text-accent' },
    { label: 'Aktif Yorumlar', value: '127', icon: Users, color: 'text-info' },
    { label: 'Ortalama Puan', value: '4.8', icon: TrendingUp, color: 'text-success' },
  ];

  const quickLinks = [
    {
      title: 'Site Ayarları',
      description: 'Domain, şehir ve iletişim bilgileri',
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      title: 'SEO Yönetimi',
      description: 'Meta tags, schema ve içerik',
      href: '/dashboard/seo',
      icon: FileText,
    },
    {
      title: 'Bölge Yönetimi',
      description: 'Hizmet bölgeleri ve fiyatlar',
      href: '/dashboard/regions',
      icon: MapPin,
    },
    {
      title: 'Fiyatlandırma',
      description: 'Fiyat tablosu ve hesaplama',
      href: '/dashboard/pricing',
      icon: DollarSign,
    },
    {
      title: 'Yorumlar',
      description: 'Müşteri yorumları yönetimi',
      href: '/dashboard/reviews',
      icon: Users,
    },
    {
      title: 'Email Ayarları',
      description: 'SMTP ve email şablonları',
      href: '/dashboard/email',
      icon: Mail,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">Evden Eve Nakliyat Yönetim Paneli</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-background rounded-xl shadow-sm border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                    <p className="text-3xl font-semibold text-text-primary mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-background rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-surface p-4 rounded-lg border border-border hover:border-accent transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                    <div>
                      <h3 className="font-medium text-text-primary group-hover:text-accent transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">{link.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
