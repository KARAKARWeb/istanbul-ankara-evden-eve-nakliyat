export interface SiteData {
  sourceCity: string;
  targetCity: string;
  distance: string;
  duration: string;
  highway: string;
  priceMin: number;
  priceMax: number;
}

export interface Region {
  id: string;
  slug: string;
  sourceCity: string;
  targetCity: string;
  distance: string;
  duration: string;
  priceMin: number;
  priceMax: number;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  photos?: string[];
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface PricingTier {
  houseType: string;
  elevator: string;
  noElevator: string;
  features: string[];
  popular?: boolean;
}
