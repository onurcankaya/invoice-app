import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency } from './formatters';

describe('formatDate', () => {
  it('formats valid ISO date string', () => {
    expect(formatDate('2021-08-18')).toBe('18 Aug 2021');
  });

  it('handles invalid date gracefully', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('handles empty string', () => {
    expect(formatDate('')).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formats currency with GBP symbol', () => {
    expect(formatCurrency(1800.9)).toBe('£1,800.90');
  });

  it('formats whole numbers', () => {
    expect(formatCurrency(100)).toBe('£100.00');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('£0.00');
  });

  it('handles negative numbers', () => {
    expect(formatCurrency(-50.5)).toBe('-£50.50');
  });
});
