'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/Toaster';
import { Code, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

export default function SEOAdvancedPage() {
  const [activeTab, setActiveTab] = useState<'schema' | 'sitemap' | 'robots' | 'validation'>('schema');
  const [schemaData, setSchemaData] = useState({
    organizationSchema: '',
    localBusinessSchema: '',
    breadcrumbSchema: '',
  });
  const [sitemapSettings, setSitemapSettings] = useState({
    enableImageSitemap: true,
    enableVideoSitemap: false,
    changefreq: 'weekly',
    priority: '0.8',
  });
  const [robotsSettings, setRobotsSettings] = useState({
    crawlDelay: '0',
    userAgentRules: '',
    customRules: '',
  });
  const [validationResults, setValidationResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [schemaRes, sitemapRes, robotsRes] = await Promise.all([
        fetch('/api/seo/schema-settings'),
        fetch('/api/seo/sitemap-settings'),
        fetch('/api/seo/robots-settings'),
      ]);
      
      if (schemaRes.ok) setSchemaData(await schemaRes.json());
      if (sitemapRes.ok) setSitemapSettings(await sitemapRes.json());
      if (robotsRes.ok) setRobotsSettings(await robotsRes.json());
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const validateSchema = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/validate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: window.location.origin }),
      });
      const data = await response.json();
      setValidationResults(data);
      showToast('Schema validation tamamlandı', 'success');
    } catch (error) {
      showToast('Validation başarısız', 'error');
    } finally {
      setLoading(false);
    }
  };

  const testRichResults = () => {
    const url = `https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.origin)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Toaster toasts={toasts} removeToast={removeToast} />
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-text-primary mb-2 flex items-center gap-3">
              <Code className="w-8 h-8" />
              Gelişmiş SEO Yönetimi
            </h1>
            <p className="text-text-secondary">
              Schema.org, Sitemap, Robots.txt ve SEO validation araçları
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'schema'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Schema Yönetimi
            </button>
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'sitemap'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sitemap Ayarları
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'robots'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Robots.txt
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'validation'
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              SEO Validation
            </button>
          </div>

          {/* Schema Yönetimi */}
          {activeTab === 'schema' && (
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Organization Schema
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  İşletme bilgileriniz için Organization schema. Global settings'ten otomatik doldurulur.
                </p>
                <div className="bg-surface p-4 rounded-lg border border-border">
                  <p className="text-sm text-text-muted">
                    ✅ Organization Schema otomatik olarak <code className="bg-background px-2 py-1 rounded">data/settings/site.json</code> dosyasından oluşturuluyor.
                  </p>
                  <p className="text-sm text-text-muted mt-2">
                    📍 Konum: Layout → GlobalSchemas component
                  </p>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  LocalBusiness Schema
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Yerel işletme bilgileri için LocalBusiness schema.
                </p>
                <div className="bg-surface p-4 rounded-lg border border-border">
                  <p className="text-sm text-text-muted">
                    ✅ LocalBusiness Schema otomatik olarak ana sayfada oluşturuluyor.
                  </p>
                  <p className="text-sm text-text-muted mt-2">
                    📍 Konum: Ana Sayfa → UnifiedSchema component
                  </p>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Breadcrumb Schema
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Sayfa hiyerarşisi için Breadcrumb schema.
                </p>
                <div className="bg-surface p-4 rounded-lg border border-border">
                  <p className="text-sm text-text-muted">
                    ✅ Breadcrumb Schema tüm sayfalarda otomatik oluşturuluyor.
                  </p>
                  <p className="text-sm text-text-muted mt-2">
                    📍 Konum: Her sayfa → WebPageUnifiedSchema component
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sitemap Ayarları */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Sitemap Ayarları
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary">Image Sitemap</p>
                      <p className="text-sm text-text-secondary">Görseller için ayrı sitemap oluştur</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sitemapSettings.enableImageSitemap}
                        onChange={(e) => setSitemapSettings({ ...sitemapSettings, enableImageSitemap: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary">Video Sitemap</p>
                      <p className="text-sm text-text-secondary">Videolar için ayrı sitemap oluştur</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sitemapSettings.enableVideoSitemap}
                        onChange={(e) => setSitemapSettings({ ...sitemapSettings, enableVideoSitemap: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Change Frequency
                      </label>
                      <select
                        value={sitemapSettings.changefreq}
                        onChange={(e) => setSitemapSettings({ ...sitemapSettings, changefreq: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                      >
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Priority (0.0 - 1.0)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={sitemapSettings.priority}
                        onChange={(e) => setSitemapSettings({ ...sitemapSettings, priority: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={async () => {
                      setLoading(true);
                      try {
                        await fetch('/api/seo/sitemap-settings', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(sitemapSettings),
                        });
                        showToast('Sitemap ayarları kaydedildi', 'success');
                      } catch (error) {
                        showToast('Kaydetme başarısız', 'error');
                      } finally {
                        setLoading(false);
                      }
                    }} disabled={loading}>
                      {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Mevcut Sitemap'ler
                </h3>
                <div className="space-y-2">
                  <a href="/sitemap.xml" target="_blank" className="flex items-center gap-2 text-accent hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    sitemap.xml
                  </a>
                  {sitemapSettings.enableImageSitemap && (
                    <a href="/sitemap-images.xml" target="_blank" className="flex items-center gap-2 text-accent hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      sitemap-images.xml
                    </a>
                  )}
                  {sitemapSettings.enableVideoSitemap && (
                    <a href="/sitemap-videos.xml" target="_blank" className="flex items-center gap-2 text-accent hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      sitemap-videos.xml
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Robots.txt */}
          {activeTab === 'robots' && (
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Robots.txt Ayarları
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Crawl Delay (saniye)
                    </label>
                    <input
                      type="number"
                      value={robotsSettings.crawlDelay}
                      onChange={(e) => setRobotsSettings({ ...robotsSettings, crawlDelay: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      Bot'ların sayfa istekleri arasında beklemesi gereken süre (0 = sınırsız)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      User-Agent Specific Rules
                    </label>
                    <Textarea
                      value={robotsSettings.userAgentRules}
                      onChange={(e) => setRobotsSettings({ ...robotsSettings, userAgentRules: e.target.value })}
                      rows={6}
                      placeholder={`User-agent: Googlebot\nDisallow: /admin/\n\nUser-agent: Bingbot\nCrawl-delay: 1`}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      Belirli bot'lar için özel kurallar
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Özel Kurallar
                    </label>
                    <Textarea
                      value={robotsSettings.customRules}
                      onChange={(e) => setRobotsSettings({ ...robotsSettings, customRules: e.target.value })}
                      rows={4}
                      placeholder="# Özel robots.txt kuralları"
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <Button onClick={async () => {
                      setLoading(true);
                      try {
                        await fetch('/api/seo/robots-settings', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(robotsSettings),
                        });
                        showToast('Robots.txt ayarları kaydedildi', 'success');
                      } catch (error) {
                        showToast('Kaydetme başarısız', 'error');
                      } finally {
                        setLoading(false);
                      }
                    }} disabled={loading}>
                      {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Mevcut Robots.txt
                </h3>
                <a href="/robots.txt" target="_blank" className="flex items-center gap-2 text-accent hover:underline">
                  <ExternalLink className="w-4 h-4" />
                  robots.txt dosyasını görüntüle
                </a>
              </div>
            </div>
          )}

          {/* SEO Validation */}
          {activeTab === 'validation' && (
            <div className="space-y-6">
              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  Schema Validation
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Sitenizin schema.org işaretlemelerini doğrulayın
                </p>
                <div className="flex gap-4">
                  <Button onClick={validateSchema} disabled={loading}>
                    {loading ? 'Kontrol Ediliyor...' : 'Schema Kontrolü Yap'}
                  </Button>
                  <Button onClick={testRichResults} variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Google Rich Results Test
                  </Button>
                </div>

                {validationResults && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-surface rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        {validationResults.valid ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-error" />
                        )}
                        <p className="font-medium text-text-primary">
                          {validationResults.valid ? 'Schema Geçerli ✅' : 'Schema Kontrol Sonuçları'}
                        </p>
                      </div>
                      
                      {/* Errors */}
                      {validationResults.errors && validationResults.errors.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-error mb-2">❌ Hatalar:</p>
                          <ul className="list-disc list-inside text-sm text-error space-y-1">
                            {validationResults.errors.map((error: string, i: number) => (
                              <li key={i}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Warnings */}
                      {validationResults.warnings && validationResults.warnings.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-warning mb-2">⚠️ Uyarılar:</p>
                          <ul className="list-disc list-inside text-sm text-warning space-y-1">
                            {validationResults.warnings.map((warning: string, i: number) => (
                              <li key={i}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Schema Status */}
                      {validationResults.schemas && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium text-text-primary mb-2">Schema Durumu:</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              {validationResults.schemas.organization ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <XCircle className="w-4 h-4 text-error" />
                              )}
                              <span>Organization</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {validationResults.schemas.webSite ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <XCircle className="w-4 h-4 text-error" />
                              )}
                              <span>WebSite</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {validationResults.schemas.localBusiness ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-warning" />
                              )}
                              <span>LocalBusiness</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {validationResults.schemas.breadcrumb ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-warning" />
                              )}
                              <span>Breadcrumb</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {validationResults.schemas.service ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-warning" />
                              )}
                              <span>Service</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Stats */}
                      {validationResults.stats && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs text-text-muted">
                            JSON-LD Script Sayısı: {validationResults.stats.jsonLdCount} | 
                            HTML Boyutu: {Math.round(validationResults.stats.htmlLength / 1024)}KB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-background p-6 rounded-xl border border-border">
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  External Validation Tools
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://validator.schema.org/"
                    target="_blank"
                    className="flex items-center gap-2 text-accent hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Schema.org Validator
                  </a>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    className="flex items-center gap-2 text-accent hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Rich Results Test
                  </a>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    className="flex items-center gap-2 text-accent hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Search Console
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
