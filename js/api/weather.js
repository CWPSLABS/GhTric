// ============================================
// api/weather.js — WeatherAPI.com
// Free: 1,000,000 calls/month
// Docs: https://www.weatherapi.com/docs/
// ============================================
import { CONFIG } from '../config.js';
import { cache } from '../utils/cache.js';

export async function fetchWeather(lat = CONFIG.DEFAULT_LAT, lng = CONFIG.DEFAULT_LNG) {
  const cacheKey = `weather_${lat}_${lng}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const url = `https://api.weatherapi.com/v1/current.json?key=${CONFIG.WEATHERAPI_KEY}&q=${lat},${lng}&aqi=no`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);

  const data = await res.json();
  cache.set(cacheKey, data, CONFIG.CACHE_TTL.weather);
  return data;
}

/**
 * Reverse-geocode lat/lng to short city name
 */
export async function getCityName(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    const addr = data.address;

    const raw = addr?.suburb
             || addr?.neighbourhood
             || addr?.quarter
             || addr?.town
             || addr?.city
             || addr?.county
             || CONFIG.DEFAULT_CITY;

    return raw.length > 20 ? raw.slice(0, 20).trim() + '…' : raw;
  } catch {
    return CONFIG.DEFAULT_CITY;
  }
}
