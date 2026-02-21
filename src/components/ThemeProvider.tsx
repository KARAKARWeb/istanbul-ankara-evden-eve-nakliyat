'use client';

import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Tema ayarlarını yükle ve CSS değişkenlerini güncelle
    fetch('/api/settings/theme')
      .then(r => r.json())
      .then(data => {
        if (data.accentColor) {
          document.documentElement.style.setProperty('--accent', data.accentColor);
          document.documentElement.style.setProperty('--color-accent', data.accentColor);
        }
        if (data.accentHoverColor) {
          document.documentElement.style.setProperty('--accent-hover', data.accentHoverColor);
          document.documentElement.style.setProperty('--color-accent-hover', data.accentHoverColor);
        }
      })
      .catch(() => {});
  }, []);

  return <>{children}</>;
}
