/* This file contains solution for AoC puzzle day 10 */

import { getYear, getDay, getInput } from '../../utils/utils';

interface Point {
  x: number,
  y: number
}

const initScreen = () => {

  const width = 40;
  const height = 6;
  const grid: string[][] = [];

  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i][j] = '.';
    }
  }

  return grid;
}

const getCoordinate = (cycle: number): Point => {

  if (cycle >= 1 && cycle <= 40) {
    return { x: 0, y: cycle - 1 };
  }

  if (cycle >= 41 && cycle <= 80) {
    return { x: 1, y: cycle - 40 - 1 };
  }

  if (cycle >= 81 && cycle <= 120) {
    return { x: 2, y: cycle - 80 - 1 };
  }

  if (cycle >= 121 && cycle <= 160) {
    return { x: 3, y: cycle - 120 - 1 };
  }

  if (cycle >= 161 && cycle <= 200) {
    return { x: 4, y: cycle - 160 - 1 };
  }

  if (cycle >= 201 && cycle <= 240) {
    return { x: 5, y: cycle - 200 - 1 };
  }
}

const drawPixel = (point: Point, screen: string[][]) => {
  screen[point.x][point.y] = '#';
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const rows = input.split('\n');

  // starting value of register X
  let x = 1;
  let cycle = 0;
  let sums: number[] = []

  const cyclesToCheck = [20, 60, 100, 140, 180, 220];

  let instruction = rows.shift();
  let shouldIncrease = false;

  while (instruction) {

    if (instruction === 'noop') {
      cycle++;
      if (cyclesToCheck.includes(cycle)) {
        sums.push(cycle * x);
      }
      instruction = rows.shift();
    }

    else {
      const [command, value] = instruction.split(' ');

      if (shouldIncrease) {
        cycle++;

        if (cyclesToCheck.includes(cycle)) {
          sums.push(cycle * x);
        }

        x += parseInt(value);
        instruction = rows.shift();
        shouldIncrease = false;
      } else {
        cycle++;

        if (cyclesToCheck.includes(cycle)) {
          sums.push(cycle * x);
        }

        shouldIncrease = true;
      }
    }
  }

  return sums.reduce((a, b) => a + b, 0);
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const rows = input.split('\n');
  const screen = initScreen();

  // starting value of register X
  let x = 1;
  let cycle = 0;

  let instruction = rows.shift();
  let shouldIncrease = false;

  let pointsToDraw = [];

  while (instruction) {

    // draw a pixel
    if (x === cycle % 40 || x === (cycle % 40) + 1 || x === (cycle % 40) - 1) {
      pointsToDraw.push(cycle + 1);
    }

    if (instruction === 'noop') {
      cycle++;
      instruction = rows.shift();
    }

    else {
      const [command, value] = instruction.split(' ');

      if (shouldIncrease) {
        cycle++;
        x += parseInt(value);
        instruction = rows.shift();
        shouldIncrease = false;
      } else {
        cycle++;
        shouldIncrease = true;
      }
    }
  }

  // draw all pixels
  pointsToDraw.forEach(point => drawPixel(getCoordinate(point), screen));

  // draw the whole screen
  console.table(screen)

  // result as seen on the screen
  return 'RZHFGJCB';
}
