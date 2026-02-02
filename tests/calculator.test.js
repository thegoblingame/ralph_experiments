/**
 * Calculator Logic Tests
 * Tests for core calculation functionality
 */

// The calculator module will expose these functions
let Calculator;

beforeEach(() => {
  // Reset calculator state before each test
  Calculator = require('../public/calculator.html').Calculator;
  Calculator.reset();
});

describe('Basic Arithmetic', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(Calculator.evaluate('2+3')).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(Calculator.evaluate('10-4')).toBe(6);
  });

  test('multiplication: 6 × 7 = 42', () => {
    expect(Calculator.evaluate('6*7')).toBe(42);
  });

  test('division: 15 ÷ 3 = 5', () => {
    expect(Calculator.evaluate('15/3')).toBe(5);
  });

  test('percentage: 50% = 0.5', () => {
    expect(Calculator.evaluate('50%')).toBe(0.5);
  });

  test('percentage in expression: 200 * 50% = 100', () => {
    expect(Calculator.evaluate('200*50%')).toBe(100);
  });

  test('order of operations: 2 + 3 × 4 = 14', () => {
    expect(Calculator.evaluate('2+3*4')).toBe(14);
  });

  test('parentheses override precedence: (2 + 3) × 4 = 20', () => {
    expect(Calculator.evaluate('(2+3)*4')).toBe(20);
  });

  test('nested parentheses: ((2 + 3) × 2) + 1 = 11', () => {
    expect(Calculator.evaluate('((2+3)*2)+1')).toBe(11);
  });

  test('decimal addition: 0.1 + 0.2 ≈ 0.3', () => {
    expect(Calculator.evaluate('0.1+0.2')).toBeCloseTo(0.3);
  });

  test('decimal multiplication: 0.5 × 0.5 = 0.25', () => {
    expect(Calculator.evaluate('0.5*0.5')).toBe(0.25);
  });

  test('negative numbers: -5 + 3 = -2', () => {
    expect(Calculator.evaluate('-5+3')).toBe(-2);
  });

  test('negative result: 3 - 10 = -7', () => {
    expect(Calculator.evaluate('3-10')).toBe(-7);
  });

  test('multiple operations: 10 + 5 - 3 × 2 = 9', () => {
    expect(Calculator.evaluate('10+5-3*2')).toBe(9);
  });

  test('division with decimals: 10 ÷ 4 = 2.5', () => {
    expect(Calculator.evaluate('10/4')).toBe(2.5);
  });
});

describe('Scientific Functions - Trigonometric (Degrees)', () => {
  beforeEach(() => {
    Calculator.setAngleMode('deg');
  });

  test('sin(0) = 0', () => {
    expect(Calculator.evaluate('sin(0)')).toBe(0);
  });

  test('sin(90) = 1', () => {
    expect(Calculator.evaluate('sin(90)')).toBeCloseTo(1);
  });

  test('sin(30) = 0.5', () => {
    expect(Calculator.evaluate('sin(30)')).toBeCloseTo(0.5);
  });

  test('cos(0) = 1', () => {
    expect(Calculator.evaluate('cos(0)')).toBe(1);
  });

  test('cos(90) ≈ 0', () => {
    expect(Calculator.evaluate('cos(90)')).toBeCloseTo(0);
  });

  test('cos(60) = 0.5', () => {
    expect(Calculator.evaluate('cos(60)')).toBeCloseTo(0.5);
  });

  test('tan(0) = 0', () => {
    expect(Calculator.evaluate('tan(0)')).toBe(0);
  });

  test('tan(45) = 1', () => {
    expect(Calculator.evaluate('tan(45)')).toBeCloseTo(1);
  });
});

describe('Scientific Functions - Trigonometric (Radians)', () => {
  beforeEach(() => {
    Calculator.setAngleMode('rad');
  });

  test('sin(0) = 0', () => {
    expect(Calculator.evaluate('sin(0)')).toBe(0);
  });

  test('sin(π/2) = 1', () => {
    expect(Calculator.evaluate('sin(π/2)')).toBeCloseTo(1);
  });

  test('cos(0) = 1', () => {
    expect(Calculator.evaluate('cos(0)')).toBe(1);
  });

  test('cos(π) = -1', () => {
    expect(Calculator.evaluate('cos(π)')).toBeCloseTo(-1);
  });

  test('tan(π/4) ≈ 1', () => {
    expect(Calculator.evaluate('tan(π/4)')).toBeCloseTo(1);
  });
});

describe('Scientific Functions - Inverse Trigonometric (Degrees)', () => {
  beforeEach(() => {
    Calculator.setAngleMode('deg');
  });

  test('asin(1) = 90', () => {
    expect(Calculator.evaluate('asin(1)')).toBeCloseTo(90);
  });

  test('asin(0) = 0', () => {
    expect(Calculator.evaluate('asin(0)')).toBe(0);
  });

  test('asin(0.5) = 30', () => {
    expect(Calculator.evaluate('asin(0.5)')).toBeCloseTo(30);
  });

  test('acos(1) = 0', () => {
    expect(Calculator.evaluate('acos(1)')).toBe(0);
  });

  test('acos(0) = 90', () => {
    expect(Calculator.evaluate('acos(0)')).toBeCloseTo(90);
  });

  test('acos(0.5) = 60', () => {
    expect(Calculator.evaluate('acos(0.5)')).toBeCloseTo(60);
  });

  test('atan(1) = 45', () => {
    expect(Calculator.evaluate('atan(1)')).toBeCloseTo(45);
  });

  test('atan(0) = 0', () => {
    expect(Calculator.evaluate('atan(0)')).toBe(0);
  });
});

describe('Scientific Functions - Logarithmic', () => {
  test('ln(1) = 0', () => {
    expect(Calculator.evaluate('ln(1)')).toBe(0);
  });

  test('ln(e) = 1', () => {
    expect(Calculator.evaluate('ln(e)')).toBeCloseTo(1);
  });

  test('ln(e^2) = 2', () => {
    expect(Calculator.evaluate('ln(e^2)')).toBeCloseTo(2);
  });

  test('log(1) = 0', () => {
    expect(Calculator.evaluate('log(1)')).toBe(0);
  });

  test('log(10) = 1', () => {
    expect(Calculator.evaluate('log(10)')).toBe(1);
  });

  test('log(100) = 2', () => {
    expect(Calculator.evaluate('log(100)')).toBe(2);
  });

  test('log(1000) = 3', () => {
    expect(Calculator.evaluate('log(1000)')).toBe(3);
  });
});

describe('Scientific Functions - Exponential', () => {
  test('e^0 = 1', () => {
    expect(Calculator.evaluate('e^0')).toBe(1);
  });

  test('e^1 = e', () => {
    expect(Calculator.evaluate('e^1')).toBeCloseTo(Math.E);
  });

  test('e^2 ≈ 7.389', () => {
    expect(Calculator.evaluate('e^2')).toBeCloseTo(7.389, 2);
  });

  test('10^0 = 1', () => {
    expect(Calculator.evaluate('10^0')).toBe(1);
  });

  test('10^1 = 10', () => {
    expect(Calculator.evaluate('10^1')).toBe(10);
  });

  test('10^2 = 100', () => {
    expect(Calculator.evaluate('10^2')).toBe(100);
  });

  test('2^10 = 1024', () => {
    expect(Calculator.evaluate('2^10')).toBe(1024);
  });
});

describe('Scientific Functions - Factorial', () => {
  test('0! = 1', () => {
    expect(Calculator.evaluate('0!')).toBe(1);
  });

  test('1! = 1', () => {
    expect(Calculator.evaluate('1!')).toBe(1);
  });

  test('5! = 120', () => {
    expect(Calculator.evaluate('5!')).toBe(120);
  });

  test('10! = 3628800', () => {
    expect(Calculator.evaluate('10!')).toBe(3628800);
  });

  test('factorial in expression: 3! + 2 = 8', () => {
    expect(Calculator.evaluate('3!+2')).toBe(8);
  });
});

describe('Scientific Functions - Square Root and Powers', () => {
  test('√4 = 2', () => {
    expect(Calculator.evaluate('√4')).toBe(2);
  });

  test('√9 = 3', () => {
    expect(Calculator.evaluate('√9')).toBe(3);
  });

  test('√2 ≈ 1.414', () => {
    expect(Calculator.evaluate('√2')).toBeCloseTo(1.414, 3);
  });

  test('√0 = 0', () => {
    expect(Calculator.evaluate('√0')).toBe(0);
  });

  test('square: 5² = 25', () => {
    expect(Calculator.evaluate('5²')).toBe(25);
  });

  test('square: 3² = 9', () => {
    expect(Calculator.evaluate('3²')).toBe(9);
  });

  test('power: 2^8 = 256', () => {
    expect(Calculator.evaluate('2^8')).toBe(256);
  });

  test('power: 3^4 = 81', () => {
    expect(Calculator.evaluate('3^4')).toBe(81);
  });

  test('cube root: ³√27 = 3', () => {
    expect(Calculator.evaluate('³√27')).toBeCloseTo(3);
  });

  test('cube root: ³√8 = 2', () => {
    expect(Calculator.evaluate('³√8')).toBeCloseTo(2);
  });

  test('4th root: ⁴√16 = 2', () => {
    expect(Calculator.evaluate('⁴√16')).toBeCloseTo(2);
  });
});

describe('Constants', () => {
  test('π ≈ 3.14159', () => {
    expect(Calculator.evaluate('π')).toBeCloseTo(Math.PI);
  });

  test('e ≈ 2.71828', () => {
    expect(Calculator.evaluate('e')).toBeCloseTo(Math.E);
  });

  test('π × 2 ≈ 6.28318', () => {
    expect(Calculator.evaluate('π*2')).toBeCloseTo(Math.PI * 2);
  });

  test('e × e = e²', () => {
    expect(Calculator.evaluate('e*e')).toBeCloseTo(Math.E * Math.E);
  });

  test('2π (implicit multiplication)', () => {
    expect(Calculator.evaluate('2π')).toBeCloseTo(2 * Math.PI);
  });
});

describe('Scientific Notation (EXP)', () => {
  test('5 EXP 3 = 5000', () => {
    expect(Calculator.evaluate('5E3')).toBe(5000);
  });

  test('1.5 EXP 2 = 150', () => {
    expect(Calculator.evaluate('1.5E2')).toBe(150);
  });

  test('2 EXP -3 = 0.002', () => {
    expect(Calculator.evaluate('2E-3')).toBe(0.002);
  });

  test('6.022 EXP 23 (Avogadro)', () => {
    expect(Calculator.evaluate('6.022E23')).toBe(6.022e23);
  });
});

describe('Ans Function', () => {
  test('Ans returns last result', () => {
    Calculator.evaluate('5+5');
    expect(Calculator.evaluate('Ans')).toBe(10);
  });

  test('Ans in expression', () => {
    Calculator.evaluate('10');
    expect(Calculator.evaluate('Ans*2')).toBe(20);
  });

  test('Ans updates after each calculation', () => {
    Calculator.evaluate('3+3');
    Calculator.evaluate('Ans+4');
    expect(Calculator.evaluate('Ans')).toBe(10);
  });

  test('Ans is 0 initially', () => {
    expect(Calculator.evaluate('Ans')).toBe(0);
  });
});

describe('Error Handling', () => {
  test('division by zero returns Error', () => {
    expect(Calculator.evaluate('5/0')).toBe('Error');
  });

  test('sqrt of negative returns Error', () => {
    expect(Calculator.evaluate('√-1')).toBe('Error');
  });

  test('invalid expression returns Error', () => {
    expect(Calculator.evaluate('+++')).toBe('Error');
  });

  test('factorial of negative returns Error', () => {
    expect(Calculator.evaluate('-5!')).toBe('Error');
  });

  test('factorial of decimal returns Error', () => {
    expect(Calculator.evaluate('2.5!')).toBe('Error');
  });

  test('unbalanced parentheses returns Error', () => {
    expect(Calculator.evaluate('(2+3')).toBe('Error');
  });

  test('empty expression returns 0', () => {
    expect(Calculator.evaluate('')).toBe(0);
  });

  test('log of 0 returns Error', () => {
    expect(Calculator.evaluate('log(0)')).toBe('Error');
  });

  test('log of negative returns Error', () => {
    expect(Calculator.evaluate('log(-5)')).toBe('Error');
  });

  test('ln of 0 returns Error', () => {
    expect(Calculator.evaluate('ln(0)')).toBe('Error');
  });

  test('asin out of range returns Error', () => {
    expect(Calculator.evaluate('asin(2)')).toBe('Error');
  });

  test('acos out of range returns Error', () => {
    expect(Calculator.evaluate('acos(-2)')).toBe('Error');
  });
});

describe('Edge Cases', () => {
  test('very large number', () => {
    const result = Calculator.evaluate('10^100');
    expect(result).toBe(1e100);
  });

  test('very small number', () => {
    const result = Calculator.evaluate('10^-100');
    expect(result).toBe(1e-100);
  });

  test('result exceeding max safe integer still works', () => {
    const result = Calculator.evaluate('2^60');
    expect(result).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
  });

  test('multiple decimal points in same number returns Error', () => {
    expect(Calculator.evaluate('1.2.3')).toBe('Error');
  });

  test('trailing operator returns Error', () => {
    expect(Calculator.evaluate('5+')).toBe('Error');
  });

  test('leading operator (except minus) returns Error', () => {
    expect(Calculator.evaluate('*5')).toBe('Error');
  });

  test('double operators return Error', () => {
    expect(Calculator.evaluate('5++5')).toBe('Error');
  });
});

describe('State Management', () => {
  test('reset clears state', () => {
    Calculator.evaluate('100');
    Calculator.reset();
    expect(Calculator.getState().result).toBe('0');
    expect(Calculator.getState().expression).toBe('');
  });

  test('setAngleMode changes angle mode', () => {
    Calculator.setAngleMode('rad');
    expect(Calculator.getState().angleMode).toBe('rad');
    Calculator.setAngleMode('deg');
    expect(Calculator.getState().angleMode).toBe('deg');
  });

  test('getState returns current state', () => {
    const state = Calculator.getState();
    expect(state).toHaveProperty('expression');
    expect(state).toHaveProperty('result');
    expect(state).toHaveProperty('angleMode');
    expect(state).toHaveProperty('invMode');
  });
});
