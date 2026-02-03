/**
 * Calculator Logic Module
 * Pure JavaScript calculator logic - no DOM dependencies
 */

// Calculator state
let state = {
  expression: '',
  result: '0',
  lastResult: 0,
  angleMode: 'deg',
  invMode: false
};

/**
 * Reset calculator to initial state
 */
function reset() {
  state = {
    expression: '',
    result: '0',
    lastResult: 0,
    angleMode: 'deg',
    invMode: false
  };
}

/**
 * Get current calculator state
 */
function getState() {
  return { ...state };
}

/**
 * Set angle mode for trigonometric functions
 * @param {string} mode - 'deg' or 'rad'
 */
function setAngleMode(mode) {
  if (mode === 'deg' || mode === 'rad') {
    state.angleMode = mode;
  }
}

/**
 * Convert degrees to radians
 */
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
function radToDeg(radians) {
  return radians * (180 / Math.PI);
}

/**
 * Factorial function
 */
function factorial(n) {
  if (n < 0) throw new Error('Factorial of negative number');
  if (!Number.isInteger(n)) throw new Error('Factorial of non-integer');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Evaluate a mathematical expression
 * @param {string} expr - The expression to evaluate
 * @returns {number|string} - The result or 'Error'
 */
function evaluate(expr) {
  try {
    // Handle empty expression
    if (!expr || expr.trim() === '') {
      return 0;
    }

    // Replace symbols with JavaScript equivalents
    let processedExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/Ans/g, state.lastResult.toString());

    // Handle implicit multiplication before replacing constants (e.g., 2π → 2*π)
    processedExpr = processedExpr.replace(/(\d)(π|e(?![E\d]))/g, '$1*$2');

    // Now replace constants
    processedExpr = processedExpr.replace(/π/g, Math.PI.toString());

    // Handle percentage - convert to /100
    processedExpr = processedExpr.replace(/(\d+\.?\d*)%/g, '($1/100)');

    // Handle factorial - check for negative factorials
    processedExpr = processedExpr.replace(/-(\d+\.?\d*)!/g, (match, num) => {
      return 'factorial(-' + num + ')';
    });
    processedExpr = processedExpr.replace(/(\d+\.?\d*)!/g, (match, num) => {
      return `factorial(${num})`;
    });

    // Handle square (²)
    processedExpr = processedExpr.replace(/(\d+\.?\d*)²/g, '($1**2)');

    // Handle cube root (³√)
    processedExpr = processedExpr.replace(/³√(\d+\.?\d*)/g, '(Math.pow($1, 1/3))');
    processedExpr = processedExpr.replace(/³√\(([^)]+)\)/g, '(Math.pow($1, 1/3))');

    // Handle 4th root (⁴√)
    processedExpr = processedExpr.replace(/⁴√(\d+\.?\d*)/g, '(Math.pow($1, 1/4))');
    processedExpr = processedExpr.replace(/⁴√\(([^)]+)\)/g, '(Math.pow($1, 1/4))');

    // Handle square root (√)
    processedExpr = processedExpr.replace(/√(\d+\.?\d*)/g, 'Math.sqrt($1)');
    processedExpr = processedExpr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');

    // Handle power operator (^)
    processedExpr = processedExpr.replace(/\^/g, '**');

    // Handle 'e' constant (but not in Math.E or scientific notation)
    // First, protect Math.E
    processedExpr = processedExpr.replace(/Math\.E/g, '__MATH_E__');
    // Protect scientific notation E
    processedExpr = processedExpr.replace(/(\d+\.?\d*)E([+-]?\d+)/gi, '__SCI_$1_E_$2__');
    // Now replace standalone 'e' with Math.E
    processedExpr = processedExpr.replace(/\be\b/g, Math.E.toString());
    // Restore protected values
    processedExpr = processedExpr.replace(/__MATH_E__/g, Math.E.toString());
    processedExpr = processedExpr.replace(/__SCI_(\d+\.?\d*)_E_([+-]?\d+)__/gi, '$1E$2');

    // Custom function handling for trig functions based on angle mode
    const customFunctions = {
      sin: (x) => {
        const angle = state.angleMode === 'deg' ? degToRad(x) : x;
        return Math.sin(angle);
      },
      cos: (x) => {
        const angle = state.angleMode === 'deg' ? degToRad(x) : x;
        return Math.cos(angle);
      },
      tan: (x) => {
        const angle = state.angleMode === 'deg' ? degToRad(x) : x;
        return Math.tan(angle);
      },
      asin: (x) => {
        if (x < -1 || x > 1) throw new Error('asin out of range');
        const result = Math.asin(x);
        return state.angleMode === 'deg' ? radToDeg(result) : result;
      },
      acos: (x) => {
        if (x < -1 || x > 1) throw new Error('acos out of range');
        const result = Math.acos(x);
        return state.angleMode === 'deg' ? radToDeg(result) : result;
      },
      atan: (x) => {
        const result = Math.atan(x);
        return state.angleMode === 'deg' ? radToDeg(result) : result;
      },
      ln: (x) => {
        if (x <= 0) throw new Error('ln of non-positive number');
        return Math.log(x);
      },
      log: (x) => {
        if (x <= 0) throw new Error('log of non-positive number');
        return Math.log10(x);
      },
      sqrt: (x) => {
        if (x < 0) throw new Error('sqrt of negative number');
        return Math.sqrt(x);
      },
      factorial: factorial
    };

    // Evaluate the expression
    const result = Function(
      ...Object.keys(customFunctions),
      `'use strict'; return (${processedExpr});`
    )(...Object.values(customFunctions));

    // Check for invalid results
    if (!isFinite(result)) {
      if (processedExpr.includes('/0') || String(result) === 'Infinity') {
        return 'Error';
      }
      return 'Error';
    }

    // Store result for Ans
    state.lastResult = result;
    state.result = String(result);

    return result;
  } catch (error) {
    return 'Error';
  }
}

// Export for Node.js (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    evaluate,
    reset,
    getState,
    setAngleMode
  };
}
