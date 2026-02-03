/**
 * Keyboard Support Module
 * Maps keyboard input to calculator actions
 * Pure logic - no DOM dependencies
 */

/**
 * Map a keyboard key to calculator action or input
 * @param {string} key - The key that was pressed
 * @param {Object} options - Optional state (invMode, shiftKey, metaKey, ctrlKey, altKey)
 * @returns {string|null} - The mapped action/input or null if invalid
 */
function mapKey(key, options = {}) {
  const { invMode = false, shiftKey = false, metaKey = false, ctrlKey = false, altKey = false } = options;

  // Allow browser shortcuts to pass through
  if (metaKey || ctrlKey || altKey) {
    return null;
  }

  // Numbers
  if (/^[0-9]$/.test(key)) {
    return key;
  }

  // Decimal point
  if (key === '.') {
    return '.';
  }

  // Basic operators
  if (key === '+') return '+';
  if (key === '-') return '-';
  if (key === '*') return '*';
  if (key === '/') return '/';
  if (key === '%') return '%';
  if (key === '(') return '(';
  if (key === ')') return ')';
  if (key === '^') return '^';
  if (key === '!') return '!';

  // Control keys
  if (key === 'Enter' || key === '=') return 'EVALUATE';
  if (key === 'Escape') return 'CLEAR';
  if (key === 'Backspace' || key === 'Delete') return 'DELETE';

  // Mode toggles
  if (key === 'i') return 'TOGGLE_INV';
  if (key === 'd' && !shiftKey) return 'SET_DEG';
  if (key === 'D' || (key === 'd' && shiftKey)) return 'SET_RAD';

  // Scientific functions (depend on invMode)
  if (key === 's') return invMode ? 'asin(' : 'sin(';
  if (key === 'c') return invMode ? 'acos(' : 'cos(';
  if (key === 't') return invMode ? 'atan(' : 'tan(';
  if (key === 'l') return invMode ? 'e^(' : 'ln(';
  if (key === 'g') return invMode ? '10^(' : 'log(';
  if (key === 'r') return invMode ? '²' : '√(';

  // Constants
  if (key === 'p') return 'π';
  if (key === 'e') return 'e';

  // Special functions
  if (key === 'a') return 'Ans';

  // Unrecognized key
  return null;
}

/**
 * Check if a mapped value is an action command
 * @param {string} value - The mapped value from mapKey
 * @returns {boolean} - True if it's an action command
 */
function isActionKey(value) {
  const actionKeys = ['EVALUATE', 'CLEAR', 'DELETE', 'TOGGLE_INV', 'SET_DEG', 'SET_RAD'];
  return actionKeys.includes(value);
}

// Export for Node.js (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mapKey,
    isActionKey
  };
}
