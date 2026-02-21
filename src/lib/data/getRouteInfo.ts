import fs from 'fs';
import path from 'path';

export interface RouteInfo {
  title?: string;
  description?: string;
  originCoords?: string;
  destinationCoords?: string;
  fromCity: string;
  toCity: string;
  sourceCity?: string;
  targetCity?: string;
  distance: number;
  duration: number | string;
  basePrice: number;
  priceMin?: number;
}

export async function getRouteInfo(): Promise<RouteInfo> {
  const filePath = path.join(process.cwd(), 'data/settings/route-info.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
