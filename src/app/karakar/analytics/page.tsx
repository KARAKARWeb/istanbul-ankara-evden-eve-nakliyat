'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';
import { Code, Eye, EyeOff } from 'lucide-react';

export default function AnalyticsPage() {
  const [codes, setCodes] = useState({
    googleAnalytics: '',
    googleTagManager: '',
    facebookPixel: '',
    headScripts: '',
    bodyScripts: '',
    footerScripts: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState({
    googleAnalytics: false,
    googleTagManager: false,
    facebookPixel: false,
    headScripts: false,
    bodyScripts: false,
    footerScripts: false,
  });
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    try {
      const response = await fetch('/api/settings/custom-codes');
      const data = await response.json();
      setCodes(data);
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetch('/api/settings/custom-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(codes),
      });
      showToast('Analytics kodları kaydedildi', 'success');
    } catch (error) {
      showToast('Kaydetme başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-text-primary mb-2 flex items-center gap-3">
              <Code className="w-8 h-8" />
              Analytics & Tracking Kodları
            </h1>
            <p className="text-text-secondary">
              Google Analytics, GTM, Facebook Pixel ve özel script kodlarınızı buradan yönetin
            </p>
          </div>

          <div className="space-y-6">
            {/* Google Analytics */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Google Analytics 4 (GA4)</h3>
                  <p className="text-sm text-text-secondary">Measurement ID: G-XXXXXXXXXX</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, googleAnalytics: !showPreview.googleAnalytics })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.googleAnalytics ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.googleAnalytics}
                onChange={(e) => setCodes({ ...codes, googleAnalytics: e.target.value })}
                placeholder={`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;head&gt;</code> bölümüne eklenecek
              </p>
            </div>

            {/* Google Tag Manager */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Google Tag Manager (GTM)</h3>
                  <p className="text-sm text-text-secondary">Container ID: GTM-XXXXXXX</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, googleTagManager: !showPreview.googleTagManager })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.googleTagManager ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.googleTagManager}
                onChange={(e) => setCodes({ ...codes, googleTagManager: e.target.value })}
                placeholder={`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->`}
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;head&gt;</code> bölümüne eklenecek
              </p>
            </div>

            {/* Facebook Pixel */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Facebook Pixel</h3>
                  <p className="text-sm text-text-secondary">Pixel ID: XXXXXXXXXXXXXXX</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, facebookPixel: !showPreview.facebookPixel })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.facebookPixel ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.facebookPixel}
                onChange={(e) => setCodes({ ...codes, facebookPixel: e.target.value })}
                placeholder={`<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXXXXXXX');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->`}
                rows={10}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;head&gt;</code> bölümüne eklenecek
              </p>
            </div>

            {/* Custom Head Scripts */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Özel Head Script'leri</h3>
                  <p className="text-sm text-text-secondary">Diğer tracking kodları, verification kodları vb.</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, headScripts: !showPreview.headScripts })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.headScripts ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.headScripts}
                onChange={(e) => setCodes({ ...codes, headScripts: e.target.value })}
                placeholder={`<!-- Örnek: Hotjar, Clarity, vb. -->
<script>
  // Buraya özel kodlarınızı ekleyin
</script>`}
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;head&gt;</code> bölümüne eklenecek
              </p>
            </div>

            {/* Custom Body Scripts */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Özel Body Script'leri (Üst)</h3>
                  <p className="text-sm text-text-secondary">GTM noscript, vb.</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, bodyScripts: !showPreview.bodyScripts })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.bodyScripts ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.bodyScripts}
                onChange={(e) => setCodes({ ...codes, bodyScripts: e.target.value })}
                placeholder={`<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`}
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;body&gt;</code> açılışından hemen sonra eklenecek
              </p>
            </div>

            {/* Custom Footer Scripts */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Özel Footer Script'leri</h3>
                  <p className="text-sm text-text-secondary">Chat widget'ları, vb.</p>
                </div>
                <button
                  onClick={() => setShowPreview({ ...showPreview, footerScripts: !showPreview.footerScripts })}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {showPreview.footerScripts ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Textarea
                value={codes.footerScripts}
                onChange={(e) => setCodes({ ...codes, footerScripts: e.target.value })}
                placeholder={`<!-- Örnek: Tawk.to, Crisp, vb. -->
<script>
  // Chat widget kodları
</script>`}
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-2">
                💡 <code>&lt;/body&gt;</code> kapanışından önce eklenecek
              </p>
            </div>

            {/* Save Button */}
            <div className="bg-background p-6 rounded-xl border border-border">
              <Button onClick={handleSave} disabled={loading} size="lg" className="w-full">
                {loading ? 'Kaydediliyor...' : '💾 Tüm Kodları Kaydet'}
              </Button>
              <p className="text-xs text-text-muted mt-3 text-center">
                ⚠️ Kodları kaydettikten sonra site yeniden yüklendiğinde aktif olacaktır
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
