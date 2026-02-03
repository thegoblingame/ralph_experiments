# Testing Specification

## Testing Philosophy

**This project uses pure JavaScript logic testing only.**

- ✅ Tests verify calculation logic, state management, and data structures
- ✅ Tests are fast, simple, and focused on correctness
- ❌ No DOM simulation or jsdom
- ❌ No end-to-end browser testing
- ❌ No UI/integration tests

**Rationale:** For a calculator with straightforward UI, the critical bugs are in calculation logic (order of operations, trig functions, edge cases), not DOM manipulation. UI integration is verified through manual browser testing.

## Implementation Status

| Test File | Status | Test Count |
|-----------|--------|------------|
| `tests/calculator.test.js` | ✅ Created | ~70 tests |
| `tests/history.test.js` | ✅ Created | ~25 tests |
| `tests/keyboard.test.js` | ✅ Created | ~35 tests |

## Testing Framework
- **Jest**: Test runner in Node.js environment
- **No additional dependencies**: Pure logic tests require no DOM libraries

## Test Categories

### 1. Calculator Logic Tests (`calculator.test.js`)

**Tests pure calculation functions** - verifies `Calculator.evaluate()`, `Calculator.setAngleMode()`, and state management without any DOM interaction.

#### Basic Arithmetic
```javascript
describe('Basic Arithmetic', () => {
  test('addition: 2 + 3 = 5')
  test('subtraction: 10 - 4 = 6')
  test('multiplication: 6 × 7 = 42')
  test('division: 15 ÷ 3 = 5')
  test('percentage: 50% = 0.5')
  test('chained operations: 2 + 3 × 4 = 14 (order of operations)')
  test('parentheses: (2 + 3) × 4 = 20')
  test('decimal operations: 0.1 + 0.2 ≈ 0.3')
  test('negative numbers: -5 + 3 = -2')
});
```

#### Scientific Functions
```javascript
describe('Scientific Functions', () => {
  // Trigonometric (Degrees)
  test('sin(90) in degrees = 1')
  test('cos(0) in degrees = 1')
  test('tan(45) in degrees = 1')

  // Trigonometric (Radians)
  test('sin(π/2) in radians = 1')
  test('cos(0) in radians = 1')
  test('tan(π/4) in radians ≈ 1')

  // Inverse Trigonometric
  test('asin(1) in degrees = 90')
  test('acos(1) in degrees = 0')
  test('atan(1) in degrees = 45')

  // Logarithmic
  test('ln(e) = 1')
  test('log(100) = 2')
  test('e^1 = e')
  test('10^2 = 100')

  // Other
  test('5! = 120')
  test('√9 = 3')
  test('2^3 = 8')
  test('3rd root of 27 = 3')
});
```

#### Constants
```javascript
describe('Constants', () => {
  test('π ≈ 3.14159...')
  test('e ≈ 2.71828...')
  test('π × 2 ≈ 6.28318...')
});
```

#### Error Handling
```javascript
describe('Error Handling', () => {
  test('division by zero returns Error')
  test('sqrt of negative returns Error')
  test('invalid expression returns Error')
  test('factorial of negative returns Error')
  test('factorial of decimal returns Error')
});
```

#### Edge Cases
```javascript
describe('Edge Cases', () => {
  test('very large numbers display in scientific notation')
  test('very small numbers display correctly')
  test('repeated equals uses last operation')
  test('starting with operator uses previous result')
  test('multiple decimal points handled correctly')
});
```

### 2. History Tests (`history.test.js`)

**Tests history data management** - verifies `History.addEntry()`, `History.getEntries()`, localStorage persistence, and data integrity. Uses mocked localStorage (not DOM).

#### Storage
```javascript
describe('History Storage', () => {
  test('addEntry saves calculation to history')
  test('history persists to localStorage')
  test('history loads from localStorage on init')
  test('error results are not saved to history')
  test('history respects 10 entry limit')
  test('oldest entries removed when limit exceeded (FIFO)')
});
```

#### Retrieval
```javascript
describe('History Retrieval', () => {
  test('getEntries returns all entries')
  test('getEntries returns newest first')
  test('getEntryById returns specific entry')
  test('getEntryById returns null for non-existent id')
  test('getResult returns just the result value')
});
```

#### Clear
```javascript
describe('History Clear', () => {
  test('clear removes all entries')
  test('clear updates localStorage')
  test('clear allows new entries to be added')
});
```

#### Error Handling
```javascript
describe('History Error Handling', () => {
  test('handles corrupted localStorage gracefully')
  test('works without localStorage (in-memory fallback)')
});
```

### 3. Keyboard Tests (`keyboard.test.js`)

**Tests key mapping logic** - verifies `Keyboard.mapKey()` function that maps keyboard input to calculator actions. No DOM events or keyboard simulation.

#### Number & Operator Mapping
```javascript
describe('Keyboard Mapping', () => {
  test('mapKey("0") returns "0"')
  test('mapKey("5") returns "5"')
  test('mapKey("+") returns "+"')
  test('mapKey("*") returns "*"')
  test('mapKey(".") returns "."')
});
```

#### Control Keys
```javascript
describe('Keyboard Control Keys', () => {
  test('mapKey("Enter") returns "EVALUATE"')
  test('mapKey("=") returns "EVALUATE"')
  test('mapKey("Escape") returns "CLEAR"')
  test('mapKey("Backspace") returns "DELETE"')
});
```

#### Scientific Function Keys
```javascript
describe('Keyboard Scientific Functions', () => {
  test('mapKey("s") returns "sin("')
  test('mapKey("c") returns "cos("')
  test('mapKey("t") returns "tan("')
  test('mapKey("p") returns "π"')
  test('mapKey("e") returns "e"')
  test('mapKey("i") returns "TOGGLE_INV"')
});
```

#### Inverse Mode
```javascript
describe('Keyboard Inverse Mode', () => {
  test('mapKey("s", {invMode: true}) returns "asin("')
  test('mapKey("c", {invMode: true}) returns "acos("')
  test('mapKey("r", {invMode: true}) returns "²"')
});
```

#### Modifier Keys
```javascript
describe('Keyboard Modifiers', () => {
  test('mapKey("c", {metaKey: true}) returns null (system shortcut)')
  test('mapKey("v", {ctrlKey: true}) returns null (system shortcut)')
  test('mapKey("D", {shiftKey: true}) returns "SET_RAD"')
});
```

#### Invalid Keys
```javascript
describe('Keyboard Invalid Keys', () => {
  test('mapKey("z") returns null (unrecognized)')
  test('mapKey("F1") returns null (unrecognized)')
  test('isActionKey("EVALUATE") returns true')
  test('isActionKey("5") returns false')
});
```


## Test Configuration

### jest.config.js
```javascript
module.exports = {
  testEnvironment: 'node',  // Pure Node.js, no DOM simulation
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### package.json scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Mocking Strategy

### localStorage Mock (history.test.js only)

Since we're testing in Node.js without a browser environment, we mock `localStorage` for history persistence tests:

```javascript
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
    get store() { return store; },
    reset: () => { store = {}; }
  };
})();

// Attach to global for the history module to use
global.localStorage = localStorageMock;
```

**No other mocking needed** - calculator and keyboard tests use pure functions with no external dependencies.

## What Is NOT Tested (By Design)

The following are intentionally excluded from automated testing and verified through manual browser testing:

- ❌ Button click handling
- ❌ Display updates and rendering
- ❌ History panel UI interactions
- ❌ CSS styling and layout
- ❌ DOM event listeners
- ❌ Browser-specific behavior
- ❌ Visual appearance

**Why:** For this calculator's scope, these UI elements are straightforward enough that bugs are immediately obvious during manual testing. The automated tests focus on correctness of the underlying logic where bugs are harder to spot.

## Module Structure Expected by Tests

Tests import from separate JavaScript modules:

```
src/
  calculator.js    → exports Calculator object with evaluate(), reset(), etc.
  history.js       → exports History object with addEntry(), getEntries(), etc.
  keyboard.js      → exports Keyboard object with mapKey(), isActionKey(), etc.
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- calculator.test.js

# Run with coverage report
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```
