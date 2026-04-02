// ============================================
// modules/locationDetect.js
// Detects user's location via browser geolocation
// Falls back to Accra, GH if denied or unavailable
// ============================================
import { getCityName } from '../api/weather.js';
import { CONFIG } from '../config.js';

/**
 * Attempt to get the user's current position.
 * Returns { lat, lng, city }
 */
export function detectLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('[Location] Geolocation not supported — using default.');
      return resolve({
        lat: CONFIG.DEFAULT_LAT,
        lng: CONFIG.DEFAULT_LNG,
        city: CONFIG.DEFAULT_CITY,
      });
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Reverse geocode to get a human-readable city name
        const city = await getCityName(lat, lng);

        // Update the location display in the header
        const locEl = document.getElementById('location-display');
        if (locEl) locEl.textContent = `📍 ${city}, GH`;

        resolve({ lat, lng, city });
      },
      (err) => {
        console.warn('[Location] Permission denied or error:', err.message);
        resolve({
          lat: CONFIG.DEFAULT_LAT,
          lng: CONFIG.DEFAULT_LNG,
          city: CONFIG.DEFAULT_CITY,
        });
      },
      {
        timeout: 8000,           // Give up after 8 seconds
        maximumAge: 5 * 60000,   // Accept a cached position up to 5 min old
        enableHighAccuracy: false,
      }
    );
  });
}