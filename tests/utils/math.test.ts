import { describe, it, expect } from 'vitest';
import { sum } from '../../src/utils/math';

describe('sum function', () => {
  it('sums an array of numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
  });

  it('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(sum([-1, -2, -3, -4, -5])).toBe(-15);
  });

  it('works with an array of zeros', () => {
    expect(sum([0, 0, 0, 0])).toBe(0);
  });

  it('handles mixed positive and negative numbers', () => {
    expect(sum([1, -2, 3, -4, 5])).toBe(3);
  });
});
