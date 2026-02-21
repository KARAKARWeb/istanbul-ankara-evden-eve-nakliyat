'use client';

import { useEffect } from 'react';

export function SchemaRenderer({ schema }: { schema: any }) {
  useEffect(() => {
    // Client-side'da schema'yı head'e ekle
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
}
