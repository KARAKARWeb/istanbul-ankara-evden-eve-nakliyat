export interface DistanceResult {
  distance: number; // km
  duration: number; // saat
  origin: string;
  destination: string;
}

// Google Maps Distance Matrix API
export async function calculateDistance(
  origin: string,
  destination: string
): Promise<DistanceResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    // API key yoksa tahmini hesaplama yap
    return estimateDistance(origin, destination);
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
    url.searchParams.append('origins', origin);
    url.searchParams.append('destinations', destination);
    url.searchParams.append('key', apiKey);
    url.searchParams.append('language', 'tr');

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== 'OK' || !data.rows?.[0]?.elements?.[0]) {
      throw new Error('Google Maps API hatası');
    }

    const element = data.rows[0].elements[0];

    if (element.status !== 'OK') {
      throw new Error('Rota bulunamadı');
    }

    // Mesafe (metre -> km)
    const distanceKm = Math.round(element.distance.value / 1000);
    
    // Süre (saniye -> saat, yuvarla)
    const durationHours = Math.round((element.duration.value / 3600) * 10) / 10;

    return {
      distance: distanceKm,
      duration: durationHours,
      origin,
      destination,
    };
  } catch (error) {
    console.error('Google Maps API hatası:', error);
    // Hata durumunda tahmini hesaplama
    return estimateDistance(origin, destination);
  }
}

// Tahmini mesafe hesaplama (API key yoksa veya hata durumunda)
function estimateDistance(origin: string, destination: string): DistanceResult {
  // Türkiye'deki önemli şehirler arası tahmini mesafeler (km)
  const distances: Record<string, Record<string, number>> = {
    'istanbul': {
      'ankara': 450,
      'izmir': 480,
      'antalya': 720,
      'bursa': 150,
      'adana': 940,
      'gaziantep': 1150,
      'konya': 660,
      'kayseri': 770,
      'eskisehir': 330,
      'trabzon': 1100,
    },
    'ankara': {
      'istanbul': 450,
      'izmir': 590,
      'antalya': 480,
      'bursa': 380,
      'adana': 480,
      'gaziantep': 700,
      'konya': 260,
      'kayseri': 330,
      'eskisehir': 230,
      'trabzon': 780,
    },
    'izmir': {
      'istanbul': 480,
      'ankara': 590,
      'antalya': 480,
      'bursa': 330,
      'adana': 900,
      'gaziantep': 1100,
      'konya': 550,
      'kayseri': 850,
      'eskisehir': 450,
      'trabzon': 1300,
    },
  };

  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();

  let distance = 500; // Varsayılan mesafe

  // Şehir adlarını bul
  const originCity = Object.keys(distances).find(city => originLower.includes(city));
  const destCity = Object.keys(distances).find(city => destLower.includes(city));

  if (originCity && destCity && distances[originCity]?.[destCity]) {
    distance = distances[originCity][destCity];
  } else if (destCity && originCity && distances[destCity]?.[originCity]) {
    distance = distances[destCity][originCity];
  }

  // Süre tahmini: ortalama 80 km/h
  const duration = Math.round((distance / 80) * 10) / 10;

  return {
    distance,
    duration,
    origin,
    destination,
  };
}

// Toplu mesafe hesaplama
export async function calculateMultipleDistances(
  origin: string,
  destinations: string[]
): Promise<DistanceResult[]> {
  const results = await Promise.all(
    destinations.map(dest => calculateDistance(origin, dest))
  );
  return results;
}
