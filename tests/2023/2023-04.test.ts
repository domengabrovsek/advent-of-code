import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { solveOne, solveTwo } from '../../src/2023/04/index';

describe('2023-04', () => {

  const input = readFileSync('./src/2023/04/input.txt', 'utf8');

  it('part 1', () => {
    const result = solveOne(input);
    expect(result).toBe(21568);
  });

  it('part 2', () => {
    const result = solveTwo(input);
    expect(result).toBe(11827296);
  });
});
