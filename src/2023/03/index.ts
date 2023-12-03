import { initGrid, getNeighbours, getLeftNeighbor, getRightNeighbor, extractCoordinates } from '../../utils/grid';
import { sum } from '../../utils/math';

const isDigit = (char: string) => /\d/.test(char);
const isSymbol = (char: string) => !isDigit(char) && char !== '.';
const isGear = (char: string) => char === '*';

const getNumber = (grid: Grid, x: number, y: number) => {
  const number = [];

  // numbers are always 1, 2 or 3 digits
  const current = grid[y][x];
  const leftOne = getLeftNeighbor({ x, y }, grid);
  const leftTwo = getLeftNeighbor({ x: x - 1, y }, grid);
  const rightOne = getRightNeighbor({ x, y }, grid);
  const rightTwo = getRightNeighbor({ x: x + 1, y }, grid);

  // check 2 left and 2 right of the current position
  // mark visited positions with '-' so we don't count them twice

  if (isDigit(leftOne)) {
    if (isDigit(leftTwo)) {
      number.push(leftTwo);
      grid[y][x - 2] = '-';
    }

    number.push(leftOne);
    grid[y][x - 1] = '-';
  }

  number.push(current);
  grid[y][x] = '-';

  if (isDigit(rightOne)) {
    number.push(rightOne);
    grid[y][x + 1] = '-';

    if (isDigit(rightTwo)) {
      number.push(rightTwo);
      grid[y][x + 2] = '-';
    }
  }

  return Number(number.join(''));
};

// eslint-disable-next-line complexity
const solve = (input: string, part: number) => {
  const numbers: number[] = [];
  const gearRatios: number[] = [];
  const grid = initGrid(input);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x];
      const position = `${x}:${y}`;

      switch (part) {
        case 1: {
          if (isSymbol(char)) {
            const neighbours = getNeighbours(extractCoordinates(position), grid);

            for (const neighbour of neighbours) {
              const [neighbourX, neighbourY] = [neighbour.x, neighbour.y];
              const neighbourChar = grid[neighbourY][neighbourX];

              if (isDigit(neighbourChar)) {
                const number = getNumber(grid, neighbourX, neighbourY);
                numbers.push(number);
              }
            }
          }
          break;
        }
        case 2: {
          if (isGear(char)) {
            const parts: number[] = [];
            const neighbours = getNeighbours(extractCoordinates(position), grid);

            for (const neighbour of neighbours) {
              const [neighbourX, neighbourY] = [neighbour.x, neighbour.y];
              const neighbourChar = grid[neighbourY][neighbourX];

              if (isDigit(neighbourChar)) {
                const number = getNumber(grid, neighbourX, neighbourY);
                parts.push(number);
              }
            }

            if (parts.length === 2) {
              gearRatios.push(parts[0] * parts[1]);
            }
          }
          break;
        }
      }
    }
  }

  return part === 1 ? sum(numbers) : sum(gearRatios);
};

export const solveOne = (input: string) => {
  return solve(input, 1);
};

export const solveTwo = (input: string) => {
  return solve(input, 2);
};
