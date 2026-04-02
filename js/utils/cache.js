// ============================================
// utils/cache.js — localStorage TTL Cache
// ============================================

export const cache = {
  set(key, data, ttlMs) {
    const payload = {
      data,
      expires: Date.now() + ttlMs,
    };
    try {
      localStorage.setItem(`ghfi_${key}`, JSON.stringify(payload));
    } catch (e) {
      console.warn('[Cache] Write failed:', e);
    }
  },

  get(key) {
    try {
      const raw = localStorage.getItem(`ghfi_${key}`);
      if (!raw) return null;
      const payload = JSON.parse(raw);
      if (Date.now() > payload.expires) {
        localStorage.removeItem(`ghfi_${key}`);
        return null;
      }
      return payload.data;
    } catch (e) {
      return null;
    }
  },

  clear(key) {
    localStorage.removeItem(`ghfi_${key}`);
  },
};