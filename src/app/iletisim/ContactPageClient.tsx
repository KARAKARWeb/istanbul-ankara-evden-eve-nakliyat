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

interface ContactPageClientProps {
  siteSettings?: any;
  contactData?: any;
  contactContent?: any;
  pageSEO?: any;
}

export default function ContactPageClient({ siteSettings, contactData, contactContent: propsContactContent, pageSEO: propsPageSEO }: ContactPageClientProps = {}) {
  const pageSEO = propsPageSEO || { title: 'İletişim', description: '', keywords: '' };
  const contactContent = propsContactContent;

  const email = `info@${siteSettings?.domain || 'example.com'}`;
  const whatsappNumber = contactData?.whatsappNumber || contactData?.phone || '';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Merhaba`;
  
  return (
    <div className="min-h-screen bg-surface">
      <WebPageUnifiedSchema 
        name="İletişim - Evden Eve Nakliyat"
        description={contactContent?.description || "Bizimle iletişime geçin. Profesyonel evden eve nakliyat hizmeti."}
        url="/iletisim"
        breadcrumbs={[
          { name: 'Ana Sayfa', url: '/' },
          { name: 'İletişim' }
        ]}
      />
      <Header siteSettings={siteSettings} contactData={contactData} />
      
      <PageHero 
        title="İletişim"
        description={contactContent?.description || "Bize ulaşın, ücretsiz fiyat teklifi alın. 7/24 müşteri desteği ile yanınızdayız."}
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
                    <a href={`tel:${contactData?.phone}`} className="text-accent hover:underline">
                      {contactData?.phone}
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
                    <p className="text-text-secondary">{contactData?.address}</p>
                    <p className="text-text-secondary">{contactData?.phone}</p>
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
          {contactContent?.workingHours && (
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

      <Footer siteSettings={siteSettings} contactData={contactData} />
      <MobileFloatingButtons />
      <ScrollToTop />
    </div>
  );
}
