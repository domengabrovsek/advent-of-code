import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { solveOne, solveTwo } from '../../src/2023/05/index';

describe.skip('2023-05', () => {

  const input = readFileSync('./src/2023/05/input.txt', 'utf8');

  it('part 1', () => {
    const result = solveOne(input);
    expect(result).toBe(379811651);
  });

  it('part 2', () => {
    const result = solveTwo(input);
    expect(result).toBe(27992443);
  });
});