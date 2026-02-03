/**
 * History Feature Tests
 * Tests for calculation history and localStorage persistence
 * Pure logic tests - no DOM simulation
 */

// Mock localStorage
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

// Override localStorage in jsdom environment (MUST be before require)
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

const History = require('../src/history');

beforeEach(() => {
  localStorageMock.reset();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  History.clear();
});

describe('History Storage', () => {
  test('addEntry saves calculation to history', () => {
    History.addEntry('2+2', '4');
    const entries = History.getEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].expression).toBe('2+2');
    expect(entries[0].result).toBe('4');
  });

  test('addEntry includes timestamp', () => {
    const before = Date.now();
    History.addEntry('5*5', '25');
    const after = Date.now();
    const entries = History.getEntries();
    expect(entries[0].timestamp).toBeGreaterThanOrEqual(before);
    expect(entries[0].timestamp).toBeLessThanOrEqual(after);
  });

  test('addEntry generates unique ids', () => {
    History.addEntry('1+1', '2');
    History.addEntry('2+2', '4');
    const entries = History.getEntries();
    expect(entries[0].id).not.toBe(entries[1].id);
  });

  test('history persists to localStorage', () => {
    History.addEntry('10/2', '5');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'calculator_history',
      expect.any(String)
    );
  });

  test('history loads from localStorage on init', () => {
    const mockData = JSON.stringify([
      { id: '1', expression: '3+3', result: '6', timestamp: Date.now() }
    ]);
    localStorageMock.store['calculator_history'] = mockData;

    History.load();
    const entries = History.getEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].expression).toBe('3+3');
  });

  test('error results are not saved to history', () => {
    History.addEntry('5/0', 'Error');
    const entries = History.getEntries();
    expect(entries).toHaveLength(0);
  });

  test('history respects 10 entry limit', () => {
    for (let i = 1; i <= 15; i++) {
      History.addEntry(`${i}+1`, `${i + 1}`);
    }
    const entries = History.getEntries();
    expect(entries).toHaveLength(10);
  });

  test('oldest entries removed when limit exceeded (FIFO)', () => {
    for (let i = 1; i <= 12; i++) {
      History.addEntry(`${i}+0`, `${i}`);
    }
    const entries = History.getEntries();
    // Oldest (1+0, 2+0) should be removed, newest should remain
    expect(entries.find(e => e.expression === '1+0')).toBeUndefined();
    expect(entries.find(e => e.expression === '2+0')).toBeUndefined();
    expect(entries.find(e => e.expression === '12+0')).toBeDefined();
  });
});

describe('History Retrieval', () => {
  test('getEntries returns all entries', () => {
    History.addEntry('1+1', '2');
    History.addEntry('2+2', '4');
    History.addEntry('3+3', '6');
    const entries = History.getEntries();
    expect(entries).toHaveLength(3);
  });

  test('getEntries returns newest first', () => {
    History.addEntry('first', '1');
    History.addEntry('second', '2');
    History.addEntry('third', '3');
    const entries = History.getEntries();
    expect(entries[0].expression).toBe('third');
    expect(entries[2].expression).toBe('first');
  });

  test('getEntryById returns specific entry', () => {
    History.addEntry('5*5', '25');
    const entries = History.getEntries();
    const id = entries[0].id;
    const entry = History.getEntryById(id);
    expect(entry.expression).toBe('5*5');
    expect(entry.result).toBe('25');
  });

  test('getEntryById returns null for non-existent id', () => {
    const entry = History.getEntryById('non-existent-id');
    expect(entry).toBeNull();
  });

  test('getResult returns just the result value', () => {
    History.addEntry('100/4', '25');
    const entries = History.getEntries();
    const result = History.getResult(entries[0].id);
    expect(result).toBe('25');
  });
});

describe('History Clear', () => {
  test('clear removes all entries', () => {
    History.addEntry('1+1', '2');
    History.addEntry('2+2', '4');
    History.clear();
    const entries = History.getEntries();
    expect(entries).toHaveLength(0);
  });

  test('clear updates localStorage', () => {
    History.addEntry('1+1', '2');
    localStorageMock.setItem.mockClear();
    History.clear();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'calculator_history',
      '[]'
    );
  });

  test('clear allows new entries to be added', () => {
    History.addEntry('1+1', '2');
    History.clear();
    History.addEntry('3+3', '6');
    const entries = History.getEntries();
    expect(entries).toHaveLength(1);
    expect(entries[0].expression).toBe('3+3');
  });
});

describe('History Error Handling', () => {
  test('handles corrupted localStorage gracefully', () => {
    localStorageMock.store['calculator_history'] = 'not valid json{{{';
    expect(() => History.load()).not.toThrow();
    const entries = History.getEntries();
    expect(entries).toHaveLength(0);
  });

  test('handles missing localStorage gracefully', () => {
    localStorageMock.store['calculator_history'] = null;
    expect(() => History.load()).not.toThrow();
    const entries = History.getEntries();
    expect(entries).toHaveLength(0);
  });

  test('handles localStorage with wrong data type', () => {
    localStorageMock.store['calculator_history'] = JSON.stringify({ not: 'array' });
    expect(() => History.load()).not.toThrow();
    const entries = History.getEntries();
    expect(entries).toHaveLength(0);
  });

  test('handles entries with missing fields', () => {
    const badData = JSON.stringify([
      { id: '1' }, // missing expression, result, timestamp
      { id: '2', expression: '1+1', result: '2', timestamp: Date.now() }
    ]);
    localStorageMock.store['calculator_history'] = badData;
    History.load();
    const entries = History.getEntries();
    // Should filter out invalid entries
    expect(entries.every(e => e.expression && e.result)).toBe(true);
  });
});

describe('History Duplicate Handling', () => {
  test('duplicate consecutive calculations are saved', () => {
    History.addEntry('2+2', '4');
    History.addEntry('2+2', '4');
    const entries = History.getEntries();
    expect(entries).toHaveLength(2);
  });

  test('same expression different results both saved', () => {
    // This shouldn't happen in normal use, but test the behavior
    History.addEntry('random()', '0.5');
    History.addEntry('random()', '0.7');
    const entries = History.getEntries();
    expect(entries).toHaveLength(2);
  });
});

describe('History Data Integrity', () => {
  test('entries are immutable via getEntries', () => {
    History.addEntry('5+5', '10');
    const entries = History.getEntries();
    entries[0].expression = 'hacked';
    const freshEntries = History.getEntries();
    expect(freshEntries[0].expression).toBe('5+5');
  });

  test('save and load preserves all data', () => {
    History.addEntry('sin(90)', '1');
    History.addEntry('cos(0)', '1');
    History.addEntry('π*2', '6.283185307179586');

    // Simulate page reload by clearing and reloading
    const savedData = localStorageMock.store['calculator_history'];
    History.clear();
    localStorageMock.store['calculator_history'] = savedData;
    History.load();

    const entries = History.getEntries();
    expect(entries).toHaveLength(3);
    expect(entries.find(e => e.expression === 'sin(90)')).toBeDefined();
  });
});
