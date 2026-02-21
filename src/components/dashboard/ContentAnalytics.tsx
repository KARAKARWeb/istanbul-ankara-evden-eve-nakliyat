'use client';

import { useState, useEffect } from 'react';
import { analyzeContent, analyzeContentFreshness, RECOMMENDED_WORD_COUNTS } from '@/lib/utils/contentAnalyzer';
import { AlertCircle, CheckCircle, TrendingUp, Calendar, FileText } from 'lucide-react';

interface ContentAnalyticsProps {
  content: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  lastUpdated?: string;
  pageType?: 'homepage' | 'about' | 'contact' | 'service' | 'blog' | 'region';
}

export function ContentAnalytics({
  content,
  primaryKeyword,
  secondaryKeywords = [],
  lastUpdated,
  pageType = 'homepage',
}: ContentAnalyticsProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [freshness, setFreshness] = useState<any>(null);

  useEffect(() => {
    if (content) {
      const minWordCount = RECOMMENDED_WORD_COUNTS[pageType]?.min || 1500;
      const result = analyzeContent(content, primaryKeyword, secondaryKeywords, minWordCount);
      setAnalysis(result);
    }

    if (lastUpdated) {
      const freshnessResult = analyzeContentFreshness(lastUpdated);
      setFreshness(freshnessResult);
    }
  }, [content, primaryKeyword, secondaryKeywords, lastUpdated, pageType]);

  if (!analysis) return null;

  const recommendedWordCount = RECOMMENDED_WORD_COUNTS[pageType];

  return (
    <div className="space-y-6">
      {/* Genel Durum */}
      <div className="bg-background p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          İçerik Analizi
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface p-4 rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Kelime Sayısı</div>
            <div className="text-2xl font-semibold text-text-primary">{analysis.wordCount}</div>
            <div className="text-xs text-text-muted mt-1">
              Hedef: {recommendedWordCount?.min}-{recommendedWordCount?.ideal}
            </div>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Karakter</div>
            <div className="text-2xl font-semibold text-text-primary">{analysis.characterCount}</div>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Paragraf</div>
            <div className="text-2xl font-semibold text-text-primary">{analysis.paragraphCount}</div>
          </div>

          <div className="bg-surface p-4 rounded-lg">
            <div className="text-sm text-text-secondary mb-1">Okunabilirlik</div>
            <div className="text-2xl font-semibold text-text-primary">{analysis.readabilityScore}%</div>
          </div>
        </div>
      </div>

      {/* Keyword Density */}
      {analysis.primaryKeyword && (
        <div className="bg-background p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Keyword Yoğunluğu
          </h3>

          <div className="space-y-4">
            {/* Primary Keyword */}
            <div className="bg-surface p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-text-primary">
                  Primary: {analysis.primaryKeyword.keyword}
                </div>
                <div className={`text-sm font-semibold ${
                  analysis.primaryKeyword.density >= 1 && analysis.primaryKeyword.density <= 2
                    ? 'text-green-600'
                    : analysis.primaryKeyword.density > 3
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {analysis.primaryKeyword.density}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    analysis.primaryKeyword.density >= 1 && analysis.primaryKeyword.density <= 2
                      ? 'bg-green-600'
                      : analysis.primaryKeyword.density > 3
                      ? 'bg-red-600'
                      : 'bg-yellow-600'
                  }`}
                  style={{ width: `${Math.min(100, analysis.primaryKeyword.density * 20)}%` }}
                />
              </div>
              <div className="text-xs text-text-muted mt-2">
                {analysis.primaryKeyword.count} kez kullanıldı • Hedef: 1-2%
              </div>
            </div>

            {/* Secondary Keywords */}
            {analysis.secondaryKeywords.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-text-secondary">Secondary Keywords:</div>
                {analysis.secondaryKeywords.map((kw: any, index: number) => (
                  <div key={index} className="bg-surface p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm text-text-primary">{kw.keyword}</div>
                      <div className="text-sm font-semibold text-text-secondary">{kw.density}%</div>
                    </div>
                    <div className="text-xs text-text-muted">
                      {kw.count} kez kullanıldı
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Başlık Yapısı */}
      <div className="bg-background p-6 rounded-xl border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Başlık Yapısı</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(analysis.headingCount).map(([tag, count]) => (
            <div key={tag} className="bg-surface p-3 rounded-lg text-center">
              <div className="text-xs text-text-secondary uppercase">{tag}</div>
              <div className="text-xl font-semibold text-text-primary">{count as number}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Freshness */}
      {freshness && (
        <div className="bg-background p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            İçerik Tazeliği
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-sm text-text-secondary mb-1">Son Güncelleme</div>
              <div className="text-lg font-medium text-text-primary">
                {new Date(freshness.lastUpdated).toLocaleDateString('tr-TR')}
              </div>
              <div className="text-sm text-text-muted mt-1">
                {freshness.daysSinceUpdate} gün önce
              </div>
            </div>
            {freshness.needsUpdate && (
              <div className={`px-4 py-2 rounded-lg ${
                freshness.updatePriority === 'high'
                  ? 'bg-red-100 text-red-700'
                  : freshness.updatePriority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                <div className="text-sm font-medium">
                  {freshness.updatePriority === 'high' && '🔴 Acil Güncelleme Gerekli'}
                  {freshness.updatePriority === 'medium' && '🟡 Güncelleme Önerilir'}
                  {freshness.updatePriority === 'low' && '🔵 Yakında Güncellenebilir'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Öneriler */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-background p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            SEO Önerileri
          </h3>
          <div className="space-y-2">
            {analysis.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">{rec}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Başarı Mesajı */}
      {analysis.meetsMinimumLength && !analysis.hasKeywordStuffing && analysis.recommendations.length === 0 && (
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-semibold text-green-900">İçerik SEO Standartlarına Uygun!</div>
              <div className="text-sm text-green-700 mt-1">
                Tüm SEO kontrolleri başarıyla geçildi. İçeriğiniz yayına hazır.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
