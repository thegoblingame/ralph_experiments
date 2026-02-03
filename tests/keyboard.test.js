/**
 * Keyboard Support Tests
 * Tests for keyboard input mapping logic
 * Pure logic tests - no DOM simulation
 */

const Keyboard = require('../src/keyboard');

describe('Keyboard Number Mapping', () => {
  test('key "0" maps to "0"', () => {
    expect(Keyboard.mapKey('0')).toBe('0');
  });

  test('key "1" maps to "1"', () => {
    expect(Keyboard.mapKey('1')).toBe('1');
  });

  test('key "2" maps to "2"', () => {
    expect(Keyboard.mapKey('2')).toBe('2');
  });

  test('key "3" maps to "3"', () => {
    expect(Keyboard.mapKey('3')).toBe('3');
  });

  test('key "4" maps to "4"', () => {
    expect(Keyboard.mapKey('4')).toBe('4');
  });

  test('key "5" maps to "5"', () => {
    expect(Keyboard.mapKey('5')).toBe('5');
  });

  test('key "6" maps to "6"', () => {
    expect(Keyboard.mapKey('6')).toBe('6');
  });

  test('key "7" maps to "7"', () => {
    expect(Keyboard.mapKey('7')).toBe('7');
  });

  test('key "8" maps to "8"', () => {
    expect(Keyboard.mapKey('8')).toBe('8');
  });

  test('key "9" maps to "9"', () => {
    expect(Keyboard.mapKey('9')).toBe('9');
  });

  test('key "." maps to "."', () => {
    expect(Keyboard.mapKey('.')).toBe('.');
  });
});

describe('Keyboard Basic Operator Mapping', () => {
  test('key "+" maps to "+"', () => {
    expect(Keyboard.mapKey('+')).toBe('+');
  });

  test('key "-" maps to "-"', () => {
    expect(Keyboard.mapKey('-')).toBe('-');
  });

  test('key "*" maps to "*"', () => {
    expect(Keyboard.mapKey('*')).toBe('*');
  });

  test('key "/" maps to "/"', () => {
    expect(Keyboard.mapKey('/')).toBe('/');
  });

  test('key "%" maps to "%"', () => {
    expect(Keyboard.mapKey('%')).toBe('%');
  });

  test('key "(" maps to "("', () => {
    expect(Keyboard.mapKey('(')).toBe('(');
  });

  test('key ")" maps to ")"', () => {
    expect(Keyboard.mapKey(')')).toBe(')');
  });

  test('key "^" maps to "^"', () => {
    expect(Keyboard.mapKey('^')).toBe('^');
  });

  test('key "!" maps to "!"', () => {
    expect(Keyboard.mapKey('!')).toBe('!');
  });
});

describe('Keyboard Control Keys', () => {
  test('Enter key maps to "EVALUATE"', () => {
    expect(Keyboard.mapKey('Enter')).toBe('EVALUATE');
  });

  test('= key maps to "EVALUATE"', () => {
    expect(Keyboard.mapKey('=')).toBe('EVALUATE');
  });

  test('Escape key maps to "CLEAR"', () => {
    expect(Keyboard.mapKey('Escape')).toBe('CLEAR');
  });

  test('Backspace key maps to "DELETE"', () => {
    expect(Keyboard.mapKey('Backspace')).toBe('DELETE');
  });

  test('Delete key maps to "DELETE"', () => {
    expect(Keyboard.mapKey('Delete')).toBe('DELETE');
  });
});

describe('Keyboard Scientific Function Mapping', () => {
  test('key "s" maps to "sin("', () => {
    expect(Keyboard.mapKey('s', { invMode: false })).toBe('sin(');
  });

  test('key "c" maps to "cos("', () => {
    expect(Keyboard.mapKey('c', { invMode: false })).toBe('cos(');
  });

  test('key "t" maps to "tan("', () => {
    expect(Keyboard.mapKey('t', { invMode: false })).toBe('tan(');
  });

  test('key "l" maps to "ln("', () => {
    expect(Keyboard.mapKey('l', { invMode: false })).toBe('ln(');
  });

  test('key "g" maps to "log("', () => {
    expect(Keyboard.mapKey('g', { invMode: false })).toBe('log(');
  });

  test('key "r" maps to "√("', () => {
    expect(Keyboard.mapKey('r', { invMode: false })).toBe('√(');
  });

  test('key "p" maps to "π"', () => {
    expect(Keyboard.mapKey('p')).toBe('π');
  });

  test('key "e" maps to "e"', () => {
    expect(Keyboard.mapKey('e')).toBe('e');
  });

  test('key "a" maps to "Ans"', () => {
    expect(Keyboard.mapKey('a')).toBe('Ans');
  });
});

describe('Keyboard Inverse Mode Mapping', () => {
  test('key "i" maps to "TOGGLE_INV"', () => {
    expect(Keyboard.mapKey('i')).toBe('TOGGLE_INV');
  });

  test('key "s" with invMode maps to "asin("', () => {
    expect(Keyboard.mapKey('s', { invMode: true })).toBe('asin(');
  });

  test('key "c" with invMode maps to "acos("', () => {
    expect(Keyboard.mapKey('c', { invMode: true })).toBe('acos(');
  });

  test('key "t" with invMode maps to "atan("', () => {
    expect(Keyboard.mapKey('t', { invMode: true })).toBe('atan(');
  });

  test('key "l" with invMode maps to "e^("', () => {
    expect(Keyboard.mapKey('l', { invMode: true })).toBe('e^(');
  });

  test('key "g" with invMode maps to "10^("', () => {
    expect(Keyboard.mapKey('g', { invMode: true })).toBe('10^(');
  });

  test('key "r" with invMode maps to "²"', () => {
    expect(Keyboard.mapKey('r', { invMode: true })).toBe('²');
  });
});

describe('Keyboard Angle Mode', () => {
  test('key "d" maps to "SET_DEG"', () => {
    expect(Keyboard.mapKey('d')).toBe('SET_DEG');
  });

  test('key "D" (shift+d) maps to "SET_RAD"', () => {
    expect(Keyboard.mapKey('D', { shiftKey: true })).toBe('SET_RAD');
  });
});

describe('Keyboard Modifier Keys', () => {
  test('keys with metaKey return null (allow system shortcuts)', () => {
    expect(Keyboard.mapKey('c', { metaKey: true })).toBeNull();
    expect(Keyboard.mapKey('v', { metaKey: true })).toBeNull();
    expect(Keyboard.mapKey('a', { metaKey: true })).toBeNull();
  });

  test('keys with ctrlKey return null (allow system shortcuts)', () => {
    expect(Keyboard.mapKey('c', { ctrlKey: true })).toBeNull();
    expect(Keyboard.mapKey('v', { ctrlKey: true })).toBeNull();
  });

  test('keys with altKey return null (allow system shortcuts)', () => {
    expect(Keyboard.mapKey('c', { altKey: true })).toBeNull();
  });
});

describe('Keyboard Invalid Keys', () => {
  test('unrecognized keys return null', () => {
    expect(Keyboard.mapKey('z')).toBeNull();
    expect(Keyboard.mapKey('x')).toBeNull();
    expect(Keyboard.mapKey('q')).toBeNull();
    expect(Keyboard.mapKey('F1')).toBeNull();
    expect(Keyboard.mapKey('Tab')).toBeNull();
  });
});

describe('Keyboard Action Detection', () => {
  test('isActionKey identifies action commands', () => {
    expect(Keyboard.isActionKey('EVALUATE')).toBe(true);
    expect(Keyboard.isActionKey('CLEAR')).toBe(true);
    expect(Keyboard.isActionKey('DELETE')).toBe(true);
    expect(Keyboard.isActionKey('TOGGLE_INV')).toBe(true);
    expect(Keyboard.isActionKey('SET_DEG')).toBe(true);
    expect(Keyboard.isActionKey('SET_RAD')).toBe(true);
  });

  test('isActionKey returns false for input strings', () => {
    expect(Keyboard.isActionKey('5')).toBe(false);
    expect(Keyboard.isActionKey('sin(')).toBe(false);
    expect(Keyboard.isActionKey('+')).toBe(false);
    expect(Keyboard.isActionKey('π')).toBe(false);
  });
});
