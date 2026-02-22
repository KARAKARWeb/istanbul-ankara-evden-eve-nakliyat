'use client';

import { useState, useEffect } from 'react';
import { Calculator, MapPin, Home, Calendar, Package } from 'lucide-react';

interface CalculatorResult {
  basePrice: number;
  maxPrice: number;
  distance: number;
  duration: number;
  totalPrice: number;
}

interface PriceCalculatorProps {
  contactData?: any;
  heroSettings?: any;
  routeInfo?: any;
}

export function PriceCalculator({ contactData, heroSettings: propsHero, routeInfo: propsRoute }: PriceCalculatorProps = {}) {
  const contactInfo = contactData;
  const heroSettings = propsHero || { pricing: { houseTypes: [], elevatorPrices: { withElevator: 0, withoutElevator: 500 } } };
  const routeInfo = propsRoute || { fromCity: '', toCity: '' };
  
  const [from, setFrom] = useState(routeInfo.fromCity || routeInfo.sourceCity || '');
  const [to, setTo] = useState(routeInfo.toCity || routeInfo.targetCity || '');
  const [homeType, setHomeType] = useState('2+1');
  const [hasElevator, setHasElevator] = useState(true);
  const [moveDate, setMoveDate] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const homeTypes = heroSettings.pricing.houseTypes.length > 0 
    ? heroSettings.pricing.houseTypes.map((ht: any) => ({
        value: ht.id,
        label: ht.label,
        basePrice: ht.basePrice,
        maxPrice: ht.maxPrice
      }))
    : [
        { value: '1+1', label: '1+1', basePrice: 2000, maxPrice: 3000 },
        { value: '2+1', label: '2+1', basePrice: 2500, maxPrice: 3500 },
        { value: '3+1', label: '3+1', basePrice: 3000, maxPrice: 4000 },
        { value: '4+1', label: '4+1', basePrice: 4000, maxPrice: 5000 },
      ];

  const calculatePrice = async () => {
    setLoading(true);
    
    try {
      // Distance API çağrısı
      const distanceRes = await fetch(`/api/maps/distance?origin=${from}&destination=${to}`);
      const distanceData = await distanceRes.json();

      // Fiyat hesaplama
      const selectedHome = homeTypes.find((h: any) => h.value === homeType);
      const basePrice = selectedHome?.basePrice || 2500;
      const maxPrice = selectedHome?.maxPrice || selectedHome?.basePrice || 3500;
      const elevatorPrice = hasElevator 
        ? (heroSettings.pricing.elevatorPrices?.withElevator || 0)
        : (heroSettings.pricing.elevatorPrices?.withoutElevator || 500);
      const totalPrice = basePrice + elevatorPrice;

      setResult({
        basePrice: basePrice + elevatorPrice,
        maxPrice: maxPrice + elevatorPrice,
        distance: distanceData.distance || 468,
        duration: distanceData.duration || 5.5,
        totalPrice,
      });
    } catch (error) {
      console.error('Hesaplama hatası:', error);
      // Fallback hesaplama
      const selectedHome = homeTypes.find((h: any) => h.value === homeType);
      const basePrice = selectedHome?.basePrice || 2500;
      const maxPrice = selectedHome?.maxPrice || selectedHome?.basePrice || 3500;
      const elevatorPrice = hasElevator 
        ? (heroSettings.pricing.elevatorPrices?.withElevator || 0)
        : (heroSettings.pricing.elevatorPrices?.withoutElevator || 500);
      
      setResult({
        basePrice: basePrice + elevatorPrice,
        maxPrice: maxPrice + elevatorPrice,
        distance: 468,
        duration: 5.5,
        totalPrice: basePrice + elevatorPrice,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 md:p-8 shadow-lg" style={{
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
    }}>
      <div className="space-y-4">
        {/* From - To */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Nereden
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              placeholder="İstanbul"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Nereye
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              placeholder={routeInfo?.toCity || routeInfo?.targetCity || ''}
            />
          </div>
        </div>

        {/* Home Type */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            <Home className="w-4 h-4 inline mr-1" />
            Ev Tipi
          </label>
          <div className="grid grid-cols-5 gap-2">
            {homeTypes.map((type: any) => (
              <button
                key={type.value}
                onClick={() => setHomeType(type.value)}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  homeType === type.value
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-surface text-text-primary hover:border-accent/50'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Elevator & Date - Yarı Yarıya */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <Package className="w-4 h-4 inline mr-1" />
              Asansör Durumu
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setHasElevator(true)}
                className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  hasElevator
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-surface text-text-primary hover:border-accent/50'
                }`}
              >
                Var
              </button>
              <button
                onClick={() => setHasElevator(false)}
                className={`flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                  !hasElevator
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-surface text-text-primary hover:border-accent/50'
                }`}
              >
                Yok
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="move-date" className="block text-sm font-medium text-text-primary mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Taşınma Tarihi
            </label>
            <input
              id="move-date"
              type="date"
              value={moveDate}
              onChange={(e) => setMoveDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Calculate Button - Tam Genişlik */}
        <button
          onClick={calculatePrice}
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-white px-6 py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
        >
          {loading ? 'Hesaplanıyor...' : 'Fiyat Hesapla'}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-2 border-accent/20">
            <div className="mb-6 p-4 bg-white/50 rounded-lg border-2 border-white text-center">
              <div className="text-base text-white font-bold mb-1">Tahmini Fiyat:</div>
              <div className="text-3xl font-bold text-white">
                {result.basePrice.toLocaleString('tr-TR')}₺ - {result.maxPrice.toLocaleString('tr-TR')}₺
              </div>
            </div>
            <div className="flex gap-2 w-full">
                  <a
                    href={`tel:${contactInfo.phone || ''}`}
                    className="flex-1 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Telefon
                  </a>
                  <a
                    href={`https://wa.me/${(contactInfo.whatsappNumber || contactInfo.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Merhaba, fiyat teklifi almak istiyorum.\n\nNereden: ${from}\nNereye: ${to}\nEv Tipi: ${homeType}\nAsansör: ${hasElevator ? 'Var' : 'Yok'}${moveDate ? `\nTaşınma Tarihi: ${moveDate}` : ''}\n\nTahmini Fiyat: ${result.basePrice.toLocaleString('tr-TR')}₺ - ${result.maxPrice.toLocaleString('tr-TR')}₺`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
