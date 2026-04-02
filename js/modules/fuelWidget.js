// ============================================
// modules/fuelWidget.js
// ============================================
import { getFuelData } from '../api/fuel.js';

export function initFuelWidget() {
  const container = document.getElementById('fuel-widget');
  const updatedEl = document.getElementById('fuel-updated');
  const { prices, lastUpdated, currency, unit } = getFuelData();

  // Show last-updated date in panel header
  if (updatedEl) updatedEl.textContent = `Updated ${lastUpdated}`;

  container.innerHTML = `
    <div class="fuel-list">
      ${prices.map(fuel => `
        <div class="fuel-item">
          <div class="fuel-left">
            <div>
              <div class="fuel-name">${fuel.name}</div>
              <div class="fuel-company">${fuel.companies}</div>
            </div>
          </div>
          <div style="text-align:right">
            <div class="fuel-price">${currency} ${fuel.priceDisplay}</div>
            <div class="fuel-unit">${unit}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <p style="font-size:0.65rem; color:var(--text-secondary); margin-top:var(--space-md);">
      Source: NPA Ghana · Prices are ex-pump indicative ranges
    </p>
  `;
}