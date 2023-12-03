import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { solveOne, solveTwo } from '../../src/2023/01/index';

describe('2023-01', () => {

  const input = readFileSync('./src/2023/01/input.txt', 'utf8');

  it('part 1', () => {
    const result = solveOne(input);
    expect(result).toBe(55017);
  });

  it('part 2', () => {
    const result = solveTwo(input);
    expect(result).toBe(53539);
  });
});
