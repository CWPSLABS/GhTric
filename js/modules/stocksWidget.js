// ============================================
// modules/stocksWidget.js
// ============================================
import { getGSEData } from '../api/stocks.js';
import { formatChange, formatVolume } from '../utils/formatter.js';

export function initStocksWidget() {
  const container = document.getElementById('stocks-widget');
  const gse = getGSEData();
  const idx = gse.composite;
  const idxDir = idx.change >= 0 ? 'up' : 'down';

  container.innerHTML = `
    <div class="gse-composite">
      <div>
        <div class="gse-label">GSE Composite Index</div>
        <div class="gse-index-val">${idx.value.toLocaleString()}</div>
      </div>
      <div>
        <div class="gse-change ${idxDir}">${formatChange(idx.changePct)}</div>
        <div style="font-size:0.70rem; color:var(--text-muted)">Vol: ${formatVolume(idx.volume)}</div>
      </div>
    </div>

    <table class="stocks-table">
      <thead>
        <tr>
          <th>Ticker</th>
          <th style="text-align:right">Price (GHS)</th>
          <th style="text-align:right">Change</th>
          <th style="text-align:right">Volume</th>
        </tr>
      </thead>
      <tbody>
        ${gse.stocks.map(s => {
          const dir = s.change >= 0 ? 'up' : 'down';
          return `
            <tr>
              <td>
                <div class="stock-ticker">${s.ticker}</div>
                <div class="stock-company">${s.company}</div>
              </td>
              <td class="stock-price">${s.price.toFixed(2)}</td>
              <td class="stock-change ${dir}">${formatChange(s.changePct)}</td>
              <td class="stock-vol">${formatVolume(s.volume)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    <p style="font-size:0.65rem; color:var(--text-secondary); margin-top:var(--space-sm);">
      Source: GSE · Last updated: ${gse.lastUpdated} · Data is manually maintained
    </p>
  `;

  return gse;
}