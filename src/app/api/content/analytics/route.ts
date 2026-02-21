import { NextResponse } from 'next/server';
import { analyzeContent, analyzeContentFreshness, RECOMMENDED_WORD_COUNTS } from '@/lib/utils/contentAnalyzer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      content, 
      primaryKeyword, 
      secondaryKeywords = [], 
      lastUpdated,
      pageType = 'homepage'
    } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const minWordCount = RECOMMENDED_WORD_COUNTS[pageType as keyof typeof RECOMMENDED_WORD_COUNTS]?.min || 1500;
    
    const contentAnalysis = analyzeContent(
      content,
      primaryKeyword,
      secondaryKeywords,
      minWordCount
    );

    let freshnessAnalysis = null;
    if (lastUpdated) {
      freshnessAnalysis = analyzeContentFreshness(lastUpdated);
    }

    return NextResponse.json({
      content: contentAnalysis,
      freshness: freshnessAnalysis,
      recommendations: contentAnalysis.recommendations,
      score: calculateSEOScore(contentAnalysis),
    });
  } catch (error) {
    console.error('Content analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content' },
      { status: 500 }
    );
  }
}

// SEO skoru hesapla (0-100)
function calculateSEOScore(analysis: any): number {
  let score = 0;

  // Kelime sayısı (30 puan)
  if (analysis.meetsMinimumLength) {
    score += 30;
  } else {
    score += (analysis.wordCount / 1500) * 30;
  }

  // Keyword density (25 puan)
  if (analysis.primaryKeyword) {
    if (analysis.primaryKeyword.density >= 1 && analysis.primaryKeyword.density <= 2) {
      score += 25;
    } else if (analysis.primaryKeyword.density >= 0.5 && analysis.primaryKeyword.density < 3) {
      score += 15;
    } else if (!analysis.hasKeywordStuffing) {
      score += 5;
    }
  }

  // Başlık yapısı (20 puan)
  if (analysis.headingCount.h1 === 1) score += 5;
  if (analysis.headingCount.h2 >= 2) score += 10;
  if (analysis.headingCount.h3 >= 1) score += 5;

  // Paragraf yapısı (15 puan)
  if (analysis.paragraphCount >= 5) score += 10;
  if (analysis.paragraphCount >= 10) score += 5;

  // Okunabilirlik (10 puan)
  score += (analysis.readabilityScore / 100) * 10;

  return Math.min(100, Math.round(score));
}
