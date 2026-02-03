/**
 * History Module
 * Manages calculation history with localStorage persistence
 */

const STORAGE_KEY = 'calculator_history';
const MAX_ENTRIES = 10;

let historyEntries = [];

// Get localStorage - lazily accessed to work with test mocks
function getLS() {
  // In jsdom/browser environment, localStorage is available as a global
  // In pure Node.js (non-jsdom), use global.localStorage if set
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  if (typeof global !== 'undefined' && global.localStorage) {
    return global.localStorage;
  }
  return null;
}

/**
 * Add a new entry to history
 * @param {string} expression - The expression that was calculated
 * @param {string} result - The result of the calculation
 */
function addEntry(expression, result) {
  // Don't save error results
  if (result === 'Error' || result === 'Infinity' || result === '-Infinity') {
    return;
  }

  const entry = {
    id: generateId(),
    expression,
    result,
    timestamp: Date.now()
  };

  // Add to beginning (newest first)
  historyEntries.unshift(entry);

  // Enforce max entries limit (FIFO - remove oldest)
  if (historyEntries.length > MAX_ENTRIES) {
    historyEntries = historyEntries.slice(0, MAX_ENTRIES);
  }

  save();
}

/**
 * Get all history entries (newest first)
 * @returns {Array} Copy of history entries array
 */
function getEntries() {
  // Return a deep copy to prevent external mutation
  return historyEntries.map(entry => ({ ...entry }));
}

/**
 * Get a specific entry by ID
 * @param {string} id - The entry ID
 * @returns {Object|null} The entry or null if not found
 */
function getEntryById(id) {
  const entry = historyEntries.find(e => e.id === id);
  return entry ? { ...entry } : null;
}

/**
 * Get just the result value for an entry
 * @param {string} id - The entry ID
 * @returns {string|null} The result value or null if not found
 */
function getResult(id) {
  const entry = historyEntries.find(e => e.id === id);
  return entry ? entry.result : null;
}

/**
 * Clear all history
 */
function clear() {
  historyEntries = [];
  save();
}

/**
 * Load history from localStorage
 */
function load() {
  try {
    const storage = getLS();
    if (!storage) {
      historyEntries = [];
      return;
    }

    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) {
      historyEntries = [];
      return;
    }

    const parsed = JSON.parse(stored);

    // Validate that it's an array
    if (!Array.isArray(parsed)) {
      historyEntries = [];
      return;
    }

    // Filter out invalid entries (missing required fields)
    historyEntries = parsed.filter(entry =>
      entry &&
      entry.id &&
      entry.expression &&
      entry.result &&
      entry.timestamp
    );
  } catch (e) {
    // Handle corrupted localStorage gracefully
    historyEntries = [];
  }
}

/**
 * Save history to localStorage
 */
function save() {
  try {
    const storage = getLS();
    if (!storage) {
      return;
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(historyEntries));
  } catch (e) {
    // Silently fail if localStorage is unavailable
    // History will work in-memory only
  }
}

/**
 * Generate a unique ID for an entry
 * @returns {string} Unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

module.exports = {
  addEntry,
  getEntries,
  getEntryById,
  getResult,
  clear,
  load
};
