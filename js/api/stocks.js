// ============================================
// api/stocks.js — Ghana Stock Exchange (GSE)
// Manual data (GSE has no free public API)
// Source: https://gse.com.gh/market-data
// Update weekly or as market closes
// ============================================

// GSE Composite Index + top stocks
// Update these values from: https://gse.com.gh
export const GSE_DATA = {
  lastUpdated: '2025-03-01',
  composite: {
    value: 2847.32,
    change: +12.45,
    changePct: +0.44,
    volume: 1_240_000,
  },
  stocks: [
    {
      ticker: 'MTN',
      company: 'MTN Ghana Ltd',
      price: 1.42,
      change: +0.03,
      changePct: +2.16,
      volume: 520_000,
    },
    {
      ticker: 'GCB',
      company: 'GCB Bank Ltd',
      price: 5.80,
      change: -0.10,
      changePct: -1.69,
      volume: 210_000,
    },
    {
      ticker: 'GOIL',
      company: 'Ghana Oil Company',
      price: 1.98,
      change: +0.05,
      changePct: +2.59,
      volume: 180_000,
    },
    {
      ticker: 'TOTAL',
      company: 'TotalEnergies Mktg GH',
      price: 4.55,
      change: 0.00,
      changePct: 0.00,
      volume: 95_000,
    },
    {
      ticker: 'CAL',
      company: 'Cal Bank Ltd',
      price: 0.88,
      change: -0.02,
      changePct: -2.22,
      volume: 305_000,
    },
    {
      ticker: 'EGL',
      company: 'Enterprise Group Ltd',
      price: 2.10,
      change: +0.10,
      changePct: +5.00,
      volume: 142_000,
    },
  ],
};

export function getGSEData() {
  return GSE_DATA;
}