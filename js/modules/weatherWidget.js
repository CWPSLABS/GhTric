// ============================================
// modules/weatherWidget.js
// ============================================
import { fetchWeather, getCityName } from '../api/weather.js';
import { CONFIG } from '../config.js';
import { renderError } from '../utils/errorHandler.js';

export async function initWeatherWidget(lat, lng, cityName) {
  const container = document.getElementById('weather-widget');

  try {
    const data = await fetchWeather(lat, lng);
    const c = data.current;
    const code = c.weather_code;
    const icon = CONFIG.WEATHER_ICONS[code] ?? '🌡️';
    const desc = CONFIG.WEATHER_DESCS[code] ?? 'Unknown';

    container.innerHTML = `
      <div class="weather-main">
        <div>
          <div class="weather-city">${cityName}</div>
          <div class="weather-temp">${Math.round(c.temperature_2m)}<sup>°C</sup></div>
          <div class="weather-desc">${desc}</div>
        </div>
        <div class="weather-icon">${icon}</div>
      </div>
      <div class="weather-details">
        <div class="weather-detail-item">
          <div class="weather-detail-label">Feels like</div>
          <div class="weather-detail-value">${Math.round(c.apparent_temperature)}°C</div>
        </div>
        <div class="weather-detail-item">
          <div class="weather-detail-label">Humidity</div>
          <div class="weather-detail-value">${c.relative_humidity_2m}%</div>
        </div>
        <div class="weather-detail-item">
          <div class="weather-detail-label">Wind</div>
          <div class="weather-detail-value">${c.wind_speed_10m} km/h</div>
        </div>
        <div class="weather-detail-item">
          <div class="weather-detail-label">Precip.</div>
          <div class="weather-detail-value">${c.precipitation} mm</div>
        </div>
      </div>
    `;
  } catch (err) {
    console.error('[Weather]', err);
    renderError('weather-widget', 'Weather unavailable', () => initWeatherWidget(lat, lng, cityName));
  }
}