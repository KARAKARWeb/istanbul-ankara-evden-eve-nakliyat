'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      {/* SEO: rel="prev" and rel="next" */}
      {prevPage && (
        <link rel="prev" href={`${basePath}?page=${prevPage}`} />
      )}
      {nextPage && (
        <link rel="next" href={`${basePath}?page=${nextPage}`} />
      )}

      <div className="flex items-center justify-center gap-2 mt-8">
        {prevPage && (
          <Link
            href={`${basePath}?page=${prevPage}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-surface transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Önceki
          </Link>
        )}

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`${basePath}?page=${page}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-accent text-white'
                  : 'border border-border hover:bg-surface'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>

        {nextPage && (
          <Link
            href={`${basePath}?page=${nextPage}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-surface transition-colors"
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </>
  );
}
