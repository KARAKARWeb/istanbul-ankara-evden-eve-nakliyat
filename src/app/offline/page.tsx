'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-border">
            <WifiOff className="w-10 h-10 text-text-muted" />
          </div>
          
          <h1 className="text-2xl font-semibold text-text-primary mb-4">
            İnternet Bağlantısı Yok
          </h1>
          
          <p className="text-text-secondary mb-8">
            İnternet bağlantınızı kontrol edin ve sayfayı yenileyin.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sayfayı Yenile
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
