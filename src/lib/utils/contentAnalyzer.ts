// Content Analysis Utilities - SEO ve İçerik Kalitesi Kontrolü

export interface KeywordAnalysis {
  keyword: string;
  count: number;
  density: number; // Yüzde olarak
  positions: number[]; // Kelimenin bulunduğu pozisyonlar
}

export interface ContentAnalysis {
  wordCount: number;
  characterCount: number;
  paragraphCount: number;
  headingCount: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  primaryKeyword: KeywordAnalysis | null;
  secondaryKeywords: KeywordAnalysis[];
  readabilityScore: number;
  hasKeywordStuffing: boolean;
  meetsMinimumLength: boolean;
  recommendations: string[];
}

export interface ContentFreshness {
  lastUpdated: string;
  daysSinceUpdate: number;
  needsUpdate: boolean;
  updatePriority: 'low' | 'medium' | 'high';
}

// Metni temizle ve kelime sayısını hesapla
export function getWordCount(text: string): number {
  const cleanText = text
    .replace(/<[^>]*>/g, ' ') // HTML tag'lerini kaldır
    .replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa çevir
    .trim();
  
  if (!cleanText) return 0;
  
  return cleanText.split(' ').filter(word => word.length > 0).length;
}

// Karakter sayısını hesapla (boşluksuz)
export function getCharacterCount(text: string): number {
  const cleanText = text
    .replace(/<[^>]*>/g, '') // HTML tag'lerini kaldır
    .replace(/\s+/g, ''); // Tüm boşlukları kaldır
  
  return cleanText.length;
}

// Paragraf sayısını hesapla
export function getParagraphCount(html: string): number {
  const pTags = html.match(/<p[^>]*>.*?<\/p>/gi);
  return pTags ? pTags.length : 0;
}

// Başlık sayılarını hesapla
export function getHeadingCounts(html: string) {
  return {
    h1: (html.match(/<h1[^>]*>.*?<\/h1>/gi) || []).length,
    h2: (html.match(/<h2[^>]*>.*?<\/h2>/gi) || []).length,
    h3: (html.match(/<h3[^>]*>.*?<\/h3>/gi) || []).length,
    h4: (html.match(/<h4[^>]*>.*?<\/h4>/gi) || []).length,
    h5: (html.match(/<h5[^>]*>.*?<\/h5>/gi) || []).length,
    h6: (html.match(/<h6[^>]*>.*?<\/h6>/gi) || []).length,
  };
}

// Keyword density hesapla
export function analyzeKeyword(text: string, keyword: string): KeywordAnalysis {
  const cleanText = text
    .replace(/<[^>]*>/g, ' ')
    .toLowerCase();
  
  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;
  
  const keywordLower = keyword.toLowerCase();
  const keywordWords = keywordLower.split(/\s+/);
  
  let count = 0;
  const positions: number[] = [];
  
  // Tek kelimelik keyword
  if (keywordWords.length === 1) {
    words.forEach((word, index) => {
      if (word.includes(keywordLower)) {
        count++;
        positions.push(index);
      }
    });
  } else {
    // Çok kelimelik keyword
    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase.includes(keywordLower)) {
        count++;
        positions.push(i);
      }
    }
  }
  
  const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
  
  return {
    keyword,
    count,
    density: parseFloat(density.toFixed(2)),
    positions,
  };
}

// Keyword stuffing kontrolü
export function hasKeywordStuffing(density: number): boolean {
  // 3%'den fazla keyword density = stuffing
  return density > 3;
}

// İçerik analizi yap
export function analyzeContent(
  html: string,
  primaryKeyword?: string,
  secondaryKeywords?: string[],
  minWordCount: number = 1500
): ContentAnalysis {
  const wordCount = getWordCount(html);
  const characterCount = getCharacterCount(html);
  const paragraphCount = getParagraphCount(html);
  const headingCount = getHeadingCounts(html);
  
  const primaryKeywordAnalysis = primaryKeyword
    ? analyzeKeyword(html, primaryKeyword)
    : null;
  
  const secondaryKeywordsAnalysis = secondaryKeywords
    ? secondaryKeywords.map(kw => analyzeKeyword(html, kw))
    : [];
  
  const hasStuffing = primaryKeywordAnalysis
    ? hasKeywordStuffing(primaryKeywordAnalysis.density)
    : false;
  
  const meetsMinimumLength = wordCount >= minWordCount;
  
  // Okunabilirlik skoru (basit hesaplama)
  const avgWordsPerParagraph = paragraphCount > 0 ? wordCount / paragraphCount : 0;
  const readabilityScore = Math.min(100, Math.max(0, 100 - (avgWordsPerParagraph - 20) * 2));
  
  // Öneriler
  const recommendations: string[] = [];
  
  if (!meetsMinimumLength) {
    recommendations.push(`İçerik çok kısa. En az ${minWordCount} kelime olmalı. Şu an: ${wordCount} kelime.`);
  }
  
  if (primaryKeywordAnalysis && primaryKeywordAnalysis.density < 0.5) {
    recommendations.push(`Primary keyword yoğunluğu çok düşük (${primaryKeywordAnalysis.density}%). Hedef: 1-2%.`);
  }
  
  if (primaryKeywordAnalysis && primaryKeywordAnalysis.density > 3) {
    recommendations.push(`Keyword stuffing tespit edildi! Keyword yoğunluğu çok yüksek (${primaryKeywordAnalysis.density}%). Hedef: 1-2%.`);
  }
  
  if (headingCount.h1 === 0) {
    recommendations.push('H1 başlığı eksik. Her sayfada bir H1 olmalı.');
  }
  
  if (headingCount.h1 > 1) {
    recommendations.push('Birden fazla H1 başlığı var. Sadece bir tane olmalı.');
  }
  
  if (headingCount.h2 < 2) {
    recommendations.push('Yeterli H2 başlığı yok. En az 2-3 H2 kullanın.');
  }
  
  if (paragraphCount < 5) {
    recommendations.push('Paragraf sayısı az. İçeriği daha fazla paragrafa bölün.');
  }
  
  if (avgWordsPerParagraph > 50) {
    recommendations.push('Paragraflar çok uzun. Daha kısa paragraflar kullanın (20-30 kelime).');
  }
  
  return {
    wordCount,
    characterCount,
    paragraphCount,
    headingCount,
    primaryKeyword: primaryKeywordAnalysis,
    secondaryKeywords: secondaryKeywordsAnalysis,
    readabilityScore: parseFloat(readabilityScore.toFixed(2)),
    hasKeywordStuffing: hasStuffing,
    meetsMinimumLength,
    recommendations,
  };
}

// Content freshness analizi
export function analyzeContentFreshness(lastUpdated: string): ContentFreshness {
  const lastUpdateDate = new Date(lastUpdated);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastUpdateDate.getTime());
  const daysSinceUpdate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let needsUpdate = false;
  let updatePriority: 'low' | 'medium' | 'high' = 'low';
  
  if (daysSinceUpdate > 180) {
    // 6 aydan eski
    needsUpdate = true;
    updatePriority = 'high';
  } else if (daysSinceUpdate > 90) {
    // 3 aydan eski
    needsUpdate = true;
    updatePriority = 'medium';
  } else if (daysSinceUpdate > 30) {
    // 1 aydan eski
    needsUpdate = true;
    updatePriority = 'low';
  }
  
  return {
    lastUpdated,
    daysSinceUpdate,
    needsUpdate,
    updatePriority,
  };
}

// Minimum kelime sayısı önerileri (sayfa tipine göre)
export const RECOMMENDED_WORD_COUNTS = {
  homepage: { min: 1500, ideal: 2000 },
  about: { min: 800, ideal: 1200 },
  contact: { min: 300, ideal: 500 },
  service: { min: 1000, ideal: 1500 },
  blog: { min: 1500, ideal: 2500 },
  region: { min: 800, ideal: 1200 },
};
