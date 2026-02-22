'use client';

interface SEOTopData {
  content: string;
}

interface TopSEOArticleProps {
  seoData?: SEOTopData;
}

export function TopSEOArticle({ seoData: propsData }: TopSEOArticleProps = {}) {
  const data = propsData || null;
  const loading = !propsData;

  if (loading || !data || !data.content) {
    return null;
  }

  return (
    <section id="seo-top" className="bg-surface border-b border-border seo-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-gray max-w-none">
          <div 
            className="text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </section>
  );
}
