'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WebPageUnifiedSchema } from '@/components/seo/UnifiedSchema';
import { PageHero } from '@/components/shared/PageHero';
import { SimpleContactForm } from '@/components/contact/SimpleContactForm';
import { MobileFloatingButtons } from '@/components/shared/MobileFloatingButtons';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPageClient() {
  const [pageSEO, setPageSEO] = useState({ title: 'İletişim', description: '', keywords: '' });
  const [contactSettings, setContactSettings] = useState<any>(null);
  const [siteData, setSiteData] = useState<any>(null);
  const [contactContent, setContactContent] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/seo/pages').then(r => r.json()),
      fetch('/api/settings/contact').then(r => r.json()),
      fetch('/api/settings/site').then(r => r.json()),
      fetch('/api/content/contact').then(r => r.json()),
    ]).then(([seoData, contact, site, content]) => {
      setPageSEO(seoData.contact || pageSEO);
      setContactSettings(contact);
      setSiteData(site);
      setContactContent(content);
    });
  }, []);

  if (!contactSettings || !siteData || !contactContent) {
    return <div className="min-h-screen bg-surface flex items-center justify-center">
      <p className="text-text-secondary">Yükleniyor...</p>
    </div>;
  }

  const email = `info@${siteData.domain}`;
  const whatsappNumber = contactSettings.whatsappNumber || contactSettings.phone;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Merhaba`;
  
  return (
    <div className="min-h-screen bg-surface">
      <WebPageUnifiedSchema 
        name="İletişim - İstanbul İzmir Evden Eve Nakliyat"
        description={contactContent?.description || "Bizimle iletişime geçin. Profesyonel evden eve nakliyat hizmeti."}
        url="/iletisim"
        breadcrumbs={[
          { name: 'Ana Sayfa', url: '/' },
          { name: 'İletişim' }
        ]}
      />
      <Header />
      
      <PageHero 
        title="İletişim"
        description={contactContent.description || "Bize ulaşın, ücretsiz fiyat teklifi alın. 7/24 müşteri desteği ile yanınızdayız."}
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'İletişim' }
        ]}
      />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* İletişim Bilgileri */}
            <div className="space-y-4">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Telefon</h3>
                    <a href={`tel:${contactSettings.phone}`} className="text-accent hover:underline">
                      {contactSettings.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">WhatsApp</h3>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">E-posta</h3>
                    <a href={`mailto:${email}`} className="text-accent hover:underline">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Adres</h3>
                    <p className="text-text-secondary">{contactSettings.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div>
              <SimpleContactForm />
            </div>
          </div>

          {/* Çalışma Saatleri */}
          {contactContent.workingHours && (
            <div className="bg-background p-8 rounded-xl border border-border">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">Çalışma Saatleri</h2>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: contactContent.workingHours }}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileFloatingButtons />
      <ScrollToTop />
    </div>
  );
}
