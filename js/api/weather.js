// ============================================
// api/weather.js — Open-Meteo (no key needed)
// ============================================
import { CONFIG } from '../config.js';
import { cache } from '../utils/cache.js';

/**
 * Fetch current weather for given lat/lng
 */
export async function fetchWeather(lat = CONFIG.DEFAULT_LAT, lng = CONFIG.DEFAULT_LNG) {
  const cacheKey = `weather_${lat}_${lng}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'precipitation',
    ].join(','),
    hourly: 'temperature_2m',
    timezone: 'Africa/Accra',
    forecast_days: 1,
  });

  const res = await fetch(`${CONFIG.URLS.weather}?${params}`);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);

  const data = await res.json();
  cache.set(cacheKey, data, CONFIG.CACHE_TTL.weather);
  return data;
}

/**
 * Reverse-geocode lat/lng to city name using Open-Meteo geocoding
 * (just for display — browser geolocation gives coords, not city names)
 */
export async function getCityName(lat, lng) {
  // Open-Meteo doesn't do reverse geocoding, so we use a simple approach:
  // You can swap this with Nominatim: https://nominatim.openstreetmap.org/reverse
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    return data.address?.city
        || data.address?.town
        || data.address?.village
        || data.address?.county
        || CONFIG.DEFAULT_CITY;
  } catch {
    return CONFIG.DEFAULT_CITY;
  }
}