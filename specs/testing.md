# Testing Specification

## Implementation Status

| Test File | Status |
|-----------|--------|
| `tests/calculator.test.js` | Created (~70 tests) |
| `tests/history.test.js` | Created (~25 tests) |
| `tests/keyboard.test.js` | Created (~50 tests) |
| `tests/ui.test.js` | **NOT CREATED** - will be written after HTML implementation |

## Testing Framework
- **Jest**: Primary test runner
- **jsdom**: DOM environment for browser API simulation
- **@testing-library/dom** (optional): For DOM interaction testing

## Test Categories

### 1. Calculator Logic Tests (`calculator.test.js`)

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

#### Storage
```javascript
describe('History Storage', () => {
  test('calculation is saved to history after pressing equals')
  test('history persists in localStorage')
  test('history loads correctly on page refresh')
  test('error results are not saved to history')
  test('history respects 100 entry limit')
  test('oldest entries removed when limit exceeded')
});
```

#### Retrieval
```javascript
describe('History Retrieval', () => {
  test('clicking history entry inserts result into expression')
  test('history displays in reverse chronological order')
  test('history shows correct expression and result')
});
```

#### Clear
```javascript
describe('History Clear', () => {
  test('clear history removes all entries')
  test('clear history updates localStorage')
  test('clear history updates UI')
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

#### Number Input
```javascript
describe('Keyboard Number Input', () => {
  test('pressing 0-9 inputs digits')
  test('pressing . inputs decimal point')
  test('rapid key presses captured correctly')
});
```

#### Operators
```javascript
describe('Keyboard Operators', () => {
  test('+ key triggers addition')
  test('- key triggers subtraction')
  test('* key triggers multiplication')
  test('/ key triggers division')
  test('Enter evaluates expression')
  test('Escape clears calculator')
  test('Backspace deletes last character')
});
```

#### Scientific
```javascript
describe('Keyboard Scientific Functions', () => {
  test('s key triggers sin')
  test('c key triggers cos')
  test('t key triggers tan')
  test('i key toggles Inv mode')
  test('p key inputs π')
});
```

#### Modifiers
```javascript
describe('Keyboard Modifiers', () => {
  test('Cmd+C does not interfere (copy)')
  test('Ctrl+V does not interfere (paste)')
  test('Shift+d sets Rad mode')
});
```

### 4. UI Integration Tests (`ui.test.js`) - NOT YET CREATED

> **Note:** These tests will be written after the HTML implementation is complete, so the tests can match the actual DOM structure.

#### Button Clicks
```javascript
describe('Button Interactions', () => {
  test('clicking number buttons updates display')
  test('clicking operator buttons updates expression')
  test('clicking equals shows result')
  test('clicking AC clears display')
});
```

#### History Panel
```javascript
describe('History Panel', () => {
  test('clicking clock icon opens history panel')
  test('clicking clock icon again closes panel')
  test('panel displays history entries')
  test('clicking entry inserts result')
  test('clear button removes all history')
});
```

#### Mode Toggles
```javascript
describe('Mode Toggles', () => {
  test('clicking Deg/Rad toggles angle mode')
  test('clicking Inv toggles inverse mode')
  test('visual indicator shows current mode')
});
```

## Test Configuration

### jest.config.js
```javascript
module.exports = {
  testEnvironment: 'jsdom',
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

### localStorage Mock
```javascript
const localStorageMock = {
  store: {},
  getItem: jest.fn(key => localStorageMock.store[key] || null),
  setItem: jest.fn((key, value) => { localStorageMock.store[key] = value; }),
  removeItem: jest.fn(key => { delete localStorageMock.store[key]; }),
  clear: jest.fn(() => { localStorageMock.store = {}; })
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
```

### DOM Setup
```javascript
beforeEach(() => {
  document.body.innerHTML = `
    <div id="calculator">
      <div id="display">0</div>
      <!-- ... calculator HTML ... -->
    </div>
  `;
});
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
