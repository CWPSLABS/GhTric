// ============================================
// api/fuel.js — NPA Ghana Fuel Prices (Manual)
// Update prices below when NPA announces changes
// NPA website: https://npa.gov.gh
// ============================================

// Last updated: manually — check NPA Ghana for current prices
export const FUEL_DATA = {
  lastUpdated: '2025-03-01', // Update this date when you refresh prices
  currency: 'GHS',
  unit: 'per litre',
  prices: [
    {
      id: 'petrol',
      name: 'Petrol (RON 91)',
      //icon: '⛽',
      priceMin: 14.50, // Minimum ex-pump price (GHS)
      priceMax: 15.20, // Maximum ex-pump price
      priceDisplay: '14.50 – 15.20',
      companies: 'Shell, Total, Goil',
    },
    {
      id: 'diesel',
      name: 'Diesel (Gas Oil)',
      //icon: '🚛',
      priceMin: 14.20,
      priceMax: 14.90,
      priceDisplay: '14.20 – 14.90',
      companies: 'Shell, Total, Goil',
    },
    {
      id: 'lpg',
      name: 'LPG (Cylinder)',
      //icon: '🔥',
      priceMin: 13.80,
      priceMax: 14.50,
      priceDisplay: '13.80 – 14.50',
      companies: 'per kg',
    },
    {
      id: 'kerosene',
      name: 'Kerosene',
      //icon: '🪔',
      priceMin: 13.00,
      priceMax: 13.60,
      priceDisplay: '13.00 – 13.60',
      companies: 'Household use',
    },
  ],
};

// Simple getter
export function getFuelData() {
  return FUEL_DATA;
}