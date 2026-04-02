// ============================================
// utils/errorHandler.js — Error UI helper
// ============================================

/**
 * Render an error state into a widget container
 * @param {string} containerId - DOM id
 * @param {string} message - Human-readable error
 * @param {Function} retryFn - Function to call on retry
 */
export function renderError(containerId, message = 'Failed to load data', retryFn = null) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <div class="error-state">
      <div class="error-icon">⚠️</div>
      <p>${message}</p>
      ${retryFn ? `<span class="retry-link" id="retry-${containerId}">Try again</span>` : ''}
    </div>
  `;

  if (retryFn) {
    document.getElementById(`retry-${containerId}`)?.addEventListener('click', retryFn);
  }
}