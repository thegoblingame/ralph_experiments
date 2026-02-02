/**
 * Keyboard Support Tests
 * Tests for keyboard input handling
 */

let Keyboard;
let Calculator;

// Helper to simulate keydown event
function pressKey(key, options = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...options
  });
  document.dispatchEvent(event);
  return event;
}

beforeEach(() => {
  // Set up minimal DOM
  document.body.innerHTML = `
    <div id="calculator">
      <div id="display">0</div>
      <div id="expression"></div>
    </div>
  `;

  const module = require('../public/calculator.html');
  Keyboard = module.Keyboard;
  Calculator = module.Calculator;
  Calculator.reset();
  Keyboard.init();
});

afterEach(() => {
  Keyboard.destroy();
});

describe('Keyboard Number Input', () => {
  test('pressing 0 inputs 0', () => {
    pressKey('0');
    expect(Calculator.getState().expression).toContain('0');
  });

  test('pressing 1 inputs 1', () => {
    pressKey('1');
    expect(Calculator.getState().expression).toContain('1');
  });

  test('pressing 2 inputs 2', () => {
    pressKey('2');
    expect(Calculator.getState().expression).toContain('2');
  });

  test('pressing 3 inputs 3', () => {
    pressKey('3');
    expect(Calculator.getState().expression).toContain('3');
  });

  test('pressing 4 inputs 4', () => {
    pressKey('4');
    expect(Calculator.getState().expression).toContain('4');
  });

  test('pressing 5 inputs 5', () => {
    pressKey('5');
    expect(Calculator.getState().expression).toContain('5');
  });

  test('pressing 6 inputs 6', () => {
    pressKey('6');
    expect(Calculator.getState().expression).toContain('6');
  });

  test('pressing 7 inputs 7', () => {
    pressKey('7');
    expect(Calculator.getState().expression).toContain('7');
  });

  test('pressing 8 inputs 8', () => {
    pressKey('8');
    expect(Calculator.getState().expression).toContain('8');
  });

  test('pressing 9 inputs 9', () => {
    pressKey('9');
    expect(Calculator.getState().expression).toContain('9');
  });

  test('pressing . inputs decimal point', () => {
    pressKey('.');
    expect(Calculator.getState().expression).toContain('.');
  });

  test('multiple digits build number', () => {
    pressKey('1');
    pressKey('2');
    pressKey('3');
    expect(Calculator.getState().expression).toBe('123');
  });

  test('rapid key presses captured correctly', () => {
    pressKey('9');
    pressKey('9');
    pressKey('9');
    pressKey('9');
    pressKey('9');
    expect(Calculator.getState().expression).toBe('99999');
  });
});

describe('Keyboard Basic Operators', () => {
  test('+ key triggers addition', () => {
    pressKey('5');
    pressKey('+');
    expect(Calculator.getState().expression).toBe('5+');
  });

  test('- key triggers subtraction', () => {
    pressKey('5');
    pressKey('-');
    expect(Calculator.getState().expression).toBe('5-');
  });

  test('* key triggers multiplication', () => {
    pressKey('5');
    pressKey('*');
    expect(Calculator.getState().expression).toBe('5*');
  });

  test('/ key triggers division', () => {
    pressKey('5');
    pressKey('/');
    expect(Calculator.getState().expression).toBe('5/');
  });

  test('% key triggers percentage', () => {
    pressKey('5');
    pressKey('0');
    pressKey('%');
    expect(Calculator.getState().expression).toBe('50%');
  });

  test('( key inputs open parenthesis', () => {
    pressKey('(');
    expect(Calculator.getState().expression).toBe('(');
  });

  test(') key inputs close parenthesis', () => {
    pressKey('(');
    pressKey('5');
    pressKey(')');
    expect(Calculator.getState().expression).toBe('(5)');
  });
});

describe('Keyboard Evaluation & Control', () => {
  test('Enter evaluates expression', () => {
    pressKey('2');
    pressKey('+');
    pressKey('3');
    pressKey('Enter');
    expect(Calculator.getState().result).toBe('5');
  });

  test('= key evaluates expression', () => {
    pressKey('4');
    pressKey('*');
    pressKey('5');
    pressKey('=');
    expect(Calculator.getState().result).toBe('20');
  });

  test('Escape clears calculator', () => {
    pressKey('1');
    pressKey('2');
    pressKey('3');
    pressKey('Escape');
    expect(Calculator.getState().expression).toBe('');
    expect(Calculator.getState().result).toBe('0');
  });

  test('Backspace deletes last character', () => {
    pressKey('1');
    pressKey('2');
    pressKey('3');
    pressKey('Backspace');
    expect(Calculator.getState().expression).toBe('12');
  });

  test('Delete deletes last character', () => {
    pressKey('1');
    pressKey('2');
    pressKey('3');
    pressKey('Delete');
    expect(Calculator.getState().expression).toBe('12');
  });

  test('Backspace on empty expression does nothing', () => {
    pressKey('Backspace');
    expect(Calculator.getState().expression).toBe('');
  });

  test('multiple Backspaces delete multiple characters', () => {
    pressKey('1');
    pressKey('2');
    pressKey('3');
    pressKey('4');
    pressKey('Backspace');
    pressKey('Backspace');
    expect(Calculator.getState().expression).toBe('12');
  });
});

describe('Keyboard Scientific Functions', () => {
  test('s key triggers sin', () => {
    pressKey('s');
    expect(Calculator.getState().expression).toBe('sin(');
  });

  test('c key triggers cos', () => {
    pressKey('c');
    expect(Calculator.getState().expression).toBe('cos(');
  });

  test('t key triggers tan', () => {
    pressKey('t');
    expect(Calculator.getState().expression).toBe('tan(');
  });

  test('l key triggers ln', () => {
    pressKey('l');
    expect(Calculator.getState().expression).toBe('ln(');
  });

  test('g key triggers log', () => {
    pressKey('g');
    expect(Calculator.getState().expression).toBe('log(');
  });

  test('r key triggers square root', () => {
    pressKey('r');
    expect(Calculator.getState().expression).toBe('√(');
  });

  test('^ key triggers power', () => {
    pressKey('2');
    pressKey('^');
    expect(Calculator.getState().expression).toBe('2^');
  });

  test('! key triggers factorial', () => {
    pressKey('5');
    pressKey('!');
    expect(Calculator.getState().expression).toBe('5!');
  });

  test('p key inputs π', () => {
    pressKey('p');
    expect(Calculator.getState().expression).toBe('π');
  });

  test('e key inputs Euler\'s number', () => {
    pressKey('e');
    expect(Calculator.getState().expression).toBe('e');
  });

  test('a key inputs Ans', () => {
    Calculator.evaluate('10');
    Calculator.reset();
    pressKey('a');
    expect(Calculator.getState().expression).toBe('Ans');
  });
});

describe('Keyboard Inverse Mode', () => {
  test('i key toggles Inv mode on', () => {
    pressKey('i');
    expect(Calculator.getState().invMode).toBe(true);
  });

  test('i key toggles Inv mode off', () => {
    pressKey('i');
    pressKey('i');
    expect(Calculator.getState().invMode).toBe(false);
  });

  test('s key triggers asin when Inv mode is on', () => {
    pressKey('i');
    pressKey('s');
    expect(Calculator.getState().expression).toBe('asin(');
  });

  test('c key triggers acos when Inv mode is on', () => {
    pressKey('i');
    pressKey('c');
    expect(Calculator.getState().expression).toBe('acos(');
  });

  test('t key triggers atan when Inv mode is on', () => {
    pressKey('i');
    pressKey('t');
    expect(Calculator.getState().expression).toBe('atan(');
  });

  test('l key triggers e^( when Inv mode is on', () => {
    pressKey('i');
    pressKey('l');
    expect(Calculator.getState().expression).toBe('e^(');
  });

  test('g key triggers 10^( when Inv mode is on', () => {
    pressKey('i');
    pressKey('g');
    expect(Calculator.getState().expression).toBe('10^(');
  });

  test('r key triggers square (²) when Inv mode is on', () => {
    pressKey('5');
    pressKey('i');
    pressKey('r');
    expect(Calculator.getState().expression).toBe('5²');
  });
});

describe('Keyboard Angle Mode', () => {
  test('d key sets Deg mode', () => {
    Calculator.setAngleMode('rad');
    pressKey('d');
    expect(Calculator.getState().angleMode).toBe('deg');
  });

  test('Shift+d sets Rad mode', () => {
    pressKey('D', { shiftKey: true });
    expect(Calculator.getState().angleMode).toBe('rad');
  });
});

describe('Keyboard Modifier Keys', () => {
  test('Cmd+key does not interfere (allows copy)', () => {
    const event = pressKey('c', { metaKey: true });
    // Should not trigger cos function
    expect(Calculator.getState().expression).toBe('');
  });

  test('Ctrl+key does not interfere', () => {
    const event = pressKey('c', { ctrlKey: true });
    expect(Calculator.getState().expression).toBe('');
  });

  test('Alt+key does not interfere', () => {
    const event = pressKey('c', { altKey: true });
    expect(Calculator.getState().expression).toBe('');
  });
});

describe('Keyboard Invalid Keys', () => {
  test('unrecognized keys are ignored', () => {
    pressKey('z');
    pressKey('x');
    pressKey('q');
    expect(Calculator.getState().expression).toBe('');
  });

  test('no error thrown for invalid keys', () => {
    expect(() => {
      pressKey('InvalidKey');
      pressKey('F13');
      pressKey('MediaPlayPause');
    }).not.toThrow();
  });
});

describe('Keyboard Key Hold Prevention', () => {
  test('holding key does not repeat input', () => {
    // Simulate key hold by dispatching repeated events with repeat: true
    const event1 = new KeyboardEvent('keydown', { key: '5', repeat: false });
    const event2 = new KeyboardEvent('keydown', { key: '5', repeat: true });
    const event3 = new KeyboardEvent('keydown', { key: '5', repeat: true });

    document.dispatchEvent(event1);
    document.dispatchEvent(event2);
    document.dispatchEvent(event3);

    expect(Calculator.getState().expression).toBe('5');
  });
});

describe('Keyboard Complete Expressions', () => {
  test('typing full expression: 2+3*4 Enter = 14', () => {
    pressKey('2');
    pressKey('+');
    pressKey('3');
    pressKey('*');
    pressKey('4');
    pressKey('Enter');
    expect(Calculator.getState().result).toBe('14');
  });

  test('typing expression with parentheses: (2+3)*4 = 20', () => {
    pressKey('(');
    pressKey('2');
    pressKey('+');
    pressKey('3');
    pressKey(')');
    pressKey('*');
    pressKey('4');
    pressKey('=');
    expect(Calculator.getState().result).toBe('20');
  });

  test('typing scientific expression: sin(90) in degrees', () => {
    pressKey('s');
    pressKey('9');
    pressKey('0');
    pressKey(')');
    pressKey('Enter');
    expect(parseFloat(Calculator.getState().result)).toBeCloseTo(1);
  });

  test('typing expression with π: 2*π', () => {
    pressKey('2');
    pressKey('*');
    pressKey('p');
    pressKey('Enter');
    expect(parseFloat(Calculator.getState().result)).toBeCloseTo(2 * Math.PI);
  });
});
