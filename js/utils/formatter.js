// ============================================
// utils/formatter.js — Number & Date Helpers
// ============================================

/**
 * Format a number as GHS currency
 * e.g. 16.45 → "GHS 16.45"
 */
export function formatGHS(val, decimals = 2) {
  return `GHS ${Number(val).toFixed(decimals)}`;
}

/**
 * Format USD price
 * e.g. 64000 → "$64,000.00"
 */
export function formatUSD(val, decimals = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

/**
 * Format exchange rate
 * If rate >= 100 show 2 decimals, else 4
 */
export function formatRate(rate) {
  return rate >= 100
    ? Number(rate).toFixed(2)
    : Number(rate).toFixed(4);
}

/**
 * Format percentage change
 * e.g. 2.34 → "+2.34%"
 */
export function formatChange(pct) {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${Number(pct).toFixed(2)}%`;
}

/**
 * Format market volume
 * e.g. 1500000 → "1.5M"
 */
export function formatVolume(val) {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `${(val / 1_000).toFixed(1)}K`;
  return String(val);
}

/**
 * Format time HH:MM:SS
 */
export function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-GH', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
}

/**
 * Format date
 */
export function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-GH', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}