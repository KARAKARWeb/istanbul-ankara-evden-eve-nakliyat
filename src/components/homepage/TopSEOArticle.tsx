'use client';

import { useState, useEffect } from 'react';

interface SEOTopData {
  content: string;
}

export function TopSEOArticle() {
  const [data, setData] = useState<SEOTopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/seo-top')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data || !data.content) {
    return null;
  }

  return (
    <section className="bg-surface border-b border-border">
      <style jsx global>{`
        #seo-top h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
          margin-top: 1.5rem;
        }
        #seo-top h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1A1A1A;
          margin-bottom: 1rem;
          margin-top: 1.25rem;
        }
        #seo-top p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
          color: #737373;
        }
        #seo-top ul, #seo-top ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          color: #737373;
        }
        #seo-top ul {
          list-style-type: disc;
        }
        #seo-top ol {
          list-style-type: decimal;
        }
        #seo-top li {
          margin-bottom: 0.5rem;
          color: #737373;
        }
        #seo-top strong {
          font-weight: 600;
          color: #1A1A1A;
        }
        #seo-top em {
          font-style: italic;
          color: #737373;
        }
        #seo-top a {
          color: #16A34A;
          text-decoration: underline;
        }
        #seo-top a:hover {
          color: #15803D;
        }
      `}</style>
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
