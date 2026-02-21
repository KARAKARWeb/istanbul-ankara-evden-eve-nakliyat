'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-background border-2 border-accent rounded-xl shadow-lg p-4 z-50 animate-slide-up">
      <button
        onClick={() => setShowInstall(false)}
        className="absolute top-2 right-2 p-1 hover:bg-surface rounded-lg transition-colors"
      >
        <X className="w-4 h-4 text-text-secondary" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-accent" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-1">
            Uygulamayı Yükle
          </h3>
          <p className="text-sm text-text-secondary mb-3">
            Hızlı erişim için ana ekranınıza ekleyin
          </p>
          
          <button
            onClick={handleInstall}
            className="w-full bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
}
