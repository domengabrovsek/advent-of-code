import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { solveOne, solveTwo } from '../../src/2023/08/index';

describe('2023-08', () => {

  const input = readFileSync('./src/2023/08/input.txt', 'utf8');

  it('part 1', () => {
    const result = solveOne(input);
    expect(result).toBe(13301);
  });

  it('part 2', () => {
    const result = solveTwo(input);
    expect(result).toBe(7309459565207);
  });
});

