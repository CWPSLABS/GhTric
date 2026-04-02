// ============================================
// api/crypto.js — CoinGecko (no key needed)
// Docs: https://www.coingecko.com/api/documentation
// ============================================
import { CONFIG } from '../config.js';
import { cache } from '../utils/cache.js';

/**
 * Fetch prices for configured coin IDs in USD
 */
export async function fetchCryptoPrices() {
  const cacheKey = 'crypto_prices';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const ids = CONFIG.CRYPTO_IDS.join(',');
  const url = `${CONFIG.URLS.crypto}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;

  const res = await fetch(url);

  // CoinGecko rate-limits aggressively; handle 429
  if (res.status === 429) throw new Error('Rate limited by CoinGecko. Try again in a minute.');
  if (!res.ok) throw new Error(`Crypto fetch failed: ${res.status}`);

  const data = await res.json();
  cache.set(cacheKey, data, CONFIG.CACHE_TTL.crypto);
  return data;
}