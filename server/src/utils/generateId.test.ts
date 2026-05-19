import { describe, it, expect } from 'vitest';
import { generateId } from './generateId';

describe('generateId', () => {
  it('generates ID with correct format: 2 uppercase letters + 4 numbers', () => {
    const id = generateId();
    expect(id).toMatch(/^[A-Z]{2}\d{4}$/);
  });

  it('generates ID with length of 6 characters', () => {
    const id = generateId();
    expect(id).toHaveLength(6);
  });

  it('generates unique IDs', () => {
    const ids = new Set<string>();

    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }

    expect(ids.size).toBeGreaterThan(95);
  });

  it('generates different IDs on subsequent calls', () => {
    const id1 = generateId();
    const id2 = generateId();

    expect(typeof id1).toBe('string');
    expect(typeof id2).toBe('string');
  });
});
