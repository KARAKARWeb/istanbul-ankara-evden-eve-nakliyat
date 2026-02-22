'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WebPageUnifiedSchema } from '@/components/seo/UnifiedSchema';
import { PageHero } from '@/components/shared/PageHero';
import { TOC } from '@/components/shared/TOC';
import { MobileFloatingButtons } from '@/components/shared/MobileFloatingButtons';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { Trophy, Shield, Users, Target, Eye } from 'lucide-react';

const tocItems = [
  { id: 'hikayemiz', title: 'Hikayemiz', level: 1 },
  { id: 'misyon-vizyon', title: 'Misyon & Vizyon', level: 1 },
  { id: 'degerlerimiz', title: 'Değerlerimiz', level: 1 },
  { id: 'neden-biz', title: 'Neden Bizi Tercih Etmelisiniz?', level: 1 },
];

interface AboutPageClientProps {
  siteSettings?: any;
  contactData?: any;
  aboutData?: any;
  pageSEO?: any;
  footerData?: any;
  regionsData?: any[];
}

export default function AboutPageClient({ siteSettings, contactData, aboutData: propsAboutData, pageSEO: propsPageSEO, footerData, regionsData }: AboutPageClientProps = {}) {
  const pageSEO = propsPageSEO || { title: 'Hakkımızda', description: '', keywords: '' };
  const aboutData = propsAboutData || {
    story: { content: '' },
    mission: { content: '' },
    vision: { content: '' },
    values: { content: '' },
    whyUs: { content: '' },
  };
  return (
    <div className="min-h-screen bg-surface">
      <WebPageUnifiedSchema 
        name={pageSEO.title}
        description={pageSEO.description}
        url="/hakkimizda"
        breadcrumbs={[
          { name: 'Ana Sayfa', url: '/' },
          { name: 'Hakkımızda' }
        ]}
      />
      <Header siteSettings={siteSettings} contactData={contactData} />
      
      <PageHero 
        title="Hakkımızda"
        description={aboutData.story?.content?.substring(0, 150) || "Profesyonel evden eve nakliyat hizmeti ile yanınızdayız."}
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda' }
        ]}
      />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
                {/* Hikayemiz */}
                <section id="hikayemiz" className="scroll-mt-24">
                  <div className="bg-background rounded-xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-semibold text-text-primary">Hikayemiz</h2>
                    </div>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: aboutData.story?.content || '' }}
                    />
                  </div>
                </section>

                {/* TOC - Hikayemiz'in altında */}
                <div>
                  <TOC items={tocItems} />
                </div>

                {/* Misyon & Vizyon */}
                <section id="misyon-vizyon" className="scroll-mt-24">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background rounded-xl border border-border p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary">Misyonumuz</h2>
                      </div>
                      <div 
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: aboutData.mission?.content || '' }}
                      />
                    </div>

                    <div className="bg-background rounded-xl border border-border p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                          <Eye className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-2xl font-semibold text-text-primary">Vizyonumuz</h2>
                      </div>
                      <div 
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: aboutData.vision?.content || '' }}
                      />
                    </div>
                  </div>
                </section>

                {/* Değerlerimiz */}
                <section id="degerlerimiz" className="scroll-mt-24">
                  <div className="bg-background rounded-xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-semibold text-text-primary">Değerlerimiz</h2>
                    </div>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: aboutData.values?.content || '' }}
                    />
                  </div>
                </section>

                {/* Neden Biz */}
                <section id="neden-biz" className="scroll-mt-24">
                  <div className="bg-background rounded-xl border border-border p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-semibold text-text-primary">Neden Bizi Tercih Etmelisiniz?</h2>
                    </div>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: aboutData.whyUs?.content || '' }}
                    />
                  </div>
                </section>
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} contactData={contactData} footerData={footerData} regionsData={regionsData} />
      <MobileFloatingButtons contactData={contactData} />
      <ScrollToTop />
    </div>
  );
}
