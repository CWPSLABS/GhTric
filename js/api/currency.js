// ============================================
// js/api/currency.js — ExchangeRate-API
// Calls our Netlify function instead of the
// API directly — keeps the key server-side
// ============================================
import { CONFIG } from '../config.js';
import { cache } from '../utils/cache.js';

/**
 * Fetch all exchange rates with GHS as base
 * In production  → calls /.netlify/functions/currency
 * In development → calls ExchangeRate-API directly
 */
export async function fetchCurrencyRates() {
  const cacheKey = 'currency_ghs';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // Detect environment
  const isDev = location.hostname === 'localhost'
             || location.hostname === '127.0.0.1';

  const url = isDev
    ? `https://v6.exchangerate-api.com/v6/${CONFIG.EXCHANGERATE_API_KEY}/latest/GHS`
    : '/api/currency';  // Uses netlify.toml redirect → serverless function

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Currency fetch failed: ${res.status}`);

  const data = await res.json();
  if (data.result !== 'success') throw new Error(data['error-type']);

  cache.set(cacheKey, data, CONFIG.CACHE_TTL.currency);
  return data;
}

/**
 * Get rate for a specific currency from the rates object
 */
export function getRate(conversionRates, targetCurrency) {
  return conversionRates[targetCurrency] ?? null;
}