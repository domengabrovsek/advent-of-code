/* This file contains solution for AoC puzzle day 14 */

import { getYear, getDay, getInput } from '../../utils/utils';

const initGrid = () => {

  let size = 10000;
  let grid: string[][] = [];

  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = '.';
    }
  }

  return grid;
}

const drawLine = (a: [number, number], b: [number, number], grid: string[][]) => {

  // vertical line
  if (a[0] === b[0]) {
    for (let i = Math.min(a[1], b[1]); i <= Math.max(a[1], b[1]); i++) {
      grid[i][a[0]] = '#'
    }
  }

  // horizontal line
  if (a[1] === b[1]) {
    for (let i = Math.min(a[0], b[0]); i <= Math.max(a[0], b[0]); i++) {
      grid[a[1]][i] = '#'
    }
  }
}

const drawLines = (lines: any, grid: any) => {
  lines.forEach((line: any) => {
    drawLine(line[0], line[1], grid);
  })
}

const getMinIndex = (lines: any) => {
  return (Math.min(...lines.map((line: any) => [line[0][0], line[1][0]]).flat(2))) - 1000;
}

const getMaxIndex = (lines: any) => {
  return Math.max(...lines.map((line: any) => [line[0][1], line[1][1]]).flat(2))
}

const parseLines = (input: string) => {

  const lines: any = [];
  const rows = input.split('\n').map(row => row.split(' -> '));

  for (let row of rows) {
    for (let i = 0; i < row.length; i++) {
      if (row[i + 1]) {

        const a = row[i].split(',').map(n => parseInt(n));
        const b = row[i + 1].split(',').map(n => parseInt(n));

        lines.push([a, b]);
      }
    }
  }

  const minIndex = getMinIndex(lines);
  const maxIndex = getMaxIndex(lines);

  for (let row of lines) {
    row[0][0] = row[0][0] - minIndex;
    row[1][0] = row[1][0] - minIndex;
  }

  return { lines, minIndex, maxIndex };
}

const newSand = (sandPoint: any, grid: any) => {

  let currentPosition = sandPoint;
  let numberOfSands = 0;

  while (true) {

    let [x, y] = currentPosition;

    // falls into the void
    if (!grid?.[x + 1]?.[y] || !grid?.[x + 1]?.[y - 1] || !grid?.[x + 1]?.[y + 1]) {
      return numberOfSands;
    }

    // below
    else if (grid[x + 1][y] === '.') {
      grid[x + 1][y] = 'O';
      grid[x][y] = '.'
      currentPosition = [x + 1, y];
    }
    // below left
    else if (grid[x + 1][y - 1] === '.') {
      grid[x + 1][y - 1] = 'O'
      grid[x][y] = '.'
      currentPosition = [x + 1, y - 1];
    }
    // below right
    else if (grid[x + 1][y + 1] === '.') {
      grid[x + 1][y + 1] = 'O';
      grid[x][y] = '.'
      currentPosition = [x + 1, y + 1];
    } else {
      currentPosition = sandPoint;
      numberOfSands++;
    }
  }
}

const newSand2 = (sandPoint: any, grid: any, floor: any) => {

  let [sandPointX, sandPointY] = sandPoint;
  let currentPosition = [sandPointX, sandPointY + 1];
  let numberOfSands = 0;
  let lastLine: number;

  while (true) {

    let [x, y] = currentPosition;

    if (lastLine === 0) {
      return numberOfSands;
    }

    // below
    if (grid[x + 1][y] === '.') {
      grid[x + 1][y] = 'O';
      grid[x][y] = '.'
      currentPosition = [x + 1, y];
    }
    // below left
    else if (grid[x + 1][y - 1] === '.') {
      grid[x + 1][y - 1] = 'O'
      grid[x][y] = '.'
      currentPosition = [x + 1, y - 1];
    }
    // below right
    else if (grid[x + 1][y + 1] === '.') {
      grid[x + 1][y + 1] = 'O';
      grid[x][y] = '.'
      currentPosition = [x + 1, y + 1];
    } else {
      currentPosition = sandPoint;
      numberOfSands++;
      lastLine = x;
    }
  }
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const { lines, minIndex } = parseLines(input);
  const grid = initGrid();
  const sandPoint = [0, 500 - minIndex];

  // draw sand point
  grid[sandPoint[0]][sandPoint[1]] = '+';

  // draw the rock formations
  drawLines(lines, grid);

  const numberOfSands = newSand(sandPoint, grid);

  return numberOfSands;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const { lines, minIndex, maxIndex } = parseLines(input);
  const grid = initGrid();
  const sandPoint = [0, 500 - minIndex];
  const floor = maxIndex + 2;

  // draw sand point
  grid[sandPoint[0]][sandPoint[1]] = '+';

  // draw the rock formations
  drawLines(lines, grid);

  // draw floor
  drawLine([0, floor], [10000, floor], grid);

  // console.table(grid);
  const numberOfSands = newSand2(sandPoint, grid, floor);
  return numberOfSands;
}
