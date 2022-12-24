/* This file contains solution for AoC puzzle day 23 */

import { getYear, getDay, getInput } from '../../utils/utils';

type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';
type Grid = string[][];
type Elf = { x: number, y: number, direction?: Direction };

const initGrid = (input: string) => {

  const rows = input.split('\n');
  const grid: Grid = [];

  let size = 1000;

  // empty grid
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = '.';
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (rows?.[i]?.[j]) {
        grid[i + size / 2][j + size / 2] = rows[i][j];
      }
    }
  }

  return grid;
}

const getElvesCoordinates = (grid: Grid): Elf[] => {

  const elves: Elf[] = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const char = grid[i][j];
      if (char === '#') {
        elves.push({ x: j, y: i });
      }
    }
  }

  return elves;
}

const getProposedMoves = (elf: Elf) => {

  const moves: Elf[] = []

  moves.push({ direction: 'N', x: elf.x, y: elf.y - 1 });
  moves.push({ direction: 'S', x: elf.x, y: elf.y + 1 });
  moves.push({ direction: 'E', x: elf.x + 1, y: elf.y });
  moves.push({ direction: 'W', x: elf.x - 1, y: elf.y });
  moves.push({ direction: 'NE', x: elf.x + 1, y: elf.y - 1 });
  moves.push({ direction: 'NW', x: elf.x - 1, y: elf.y - 1 });
  moves.push({ direction: 'SE', x: elf.x + 1, y: elf.y + 1 });
  moves.push({ direction: 'SW', x: elf.x - 1, y: elf.y + 1 });

  return moves;
}

const isVoid = (elf: Elf, grid: Grid) => grid?.[elf.y]?.[elf.x] === undefined;
const isElf = (elf: Elf, grid: Grid) => !isVoid(elf, grid) && grid?.[elf.y]?.[elf.x] === '#';
const isNotElfOrVoid = (elf: Elf, grid: Grid) => !(isVoid(elf, grid) || isElf(elf, grid));
const getNeighbours = (moves: Elf[], grid: Grid) => moves.filter(move => isElf(move, grid));
const rotateConditions = (conditions: Direction[]) => { conditions.push(conditions.shift()); return conditions };
const transposeArray = (array: string[][]): string[][] => array[0].map((_: any, colIndex: any) => array.map((row: any) => row[colIndex]));

const getRectangle = (grid: Grid) => {

  const transposedGrid = transposeArray(grid);

  const minX = transposedGrid.findIndex(row => row.includes('#'));
  const maxX = transposedGrid.map(row => row.includes('#')).lastIndexOf(true);
  const minY = grid.findIndex(row => row.includes('#'));
  const maxY = grid.map(row => row.includes('#')).lastIndexOf(true);

  let rectangle: string[][] = [];

  for (let i = minY; i <= maxY; i++) {
    rectangle.push(grid[i].slice(minX, maxX + 1));
  }

  return rectangle;
}

const getDirection = (elf: Elf, moves: Elf[], grid: Grid, conditionOrder: Direction[]): Elf => {
  const N = moves.find(move => move.direction === 'N');
  const S = moves.find(move => move.direction === 'S');
  const E = moves.find(move => move.direction === 'E');
  const W = moves.find(move => move.direction === 'W');
  const NE = moves.find(move => move.direction === 'NE');
  const NW = moves.find(move => move.direction === 'NW');
  const SE = moves.find(move => move.direction === 'SE');
  const SW = moves.find(move => move.direction === 'SW');

  // N S W E
  // S W E N
  // W E N S
  // E N S W

  const north = isNotElfOrVoid(N, grid) && isNotElfOrVoid(NE, grid) && isNotElfOrVoid(NW, grid);
  const south = isNotElfOrVoid(S, grid) && isNotElfOrVoid(SE, grid) && isNotElfOrVoid(SW, grid);
  const west = isNotElfOrVoid(W, grid) && isNotElfOrVoid(NW, grid) && isNotElfOrVoid(SW, grid);
  const east = isNotElfOrVoid(E, grid) && isNotElfOrVoid(NE, grid) && isNotElfOrVoid(SE, grid)

  let conditions: Record<any, any> = {
    'N': { condition: north, direction: { direction: 'N', x: elf.x, y: elf.y - 1 } },
    'S': { condition: south, direction: { direction: 'S', x: elf.x, y: elf.y + 1 } },
    'W': { condition: west, direction: { direction: 'W', x: elf.x - 1, y: elf.y } },
    'E': { condition: east, direction: { direction: 'E', x: elf.x + 1, y: elf.y } }
  };

  // first conditions
  if (conditions[conditionOrder[0]].condition) return conditions[conditionOrder[0]].direction;
  else if (conditions[conditionOrder[1]].condition) return conditions[conditionOrder[1]].direction;
  else if (conditions[conditionOrder[2]].condition) return conditions[conditionOrder[2]].direction;
  else if (conditions[conditionOrder[3]].condition) return conditions[conditionOrder[3]].direction;
}

const move = (grid: Grid, directions: [Elf, Elf, number][]) => {

  for (const [elf, direction] of directions) {

    // update old location
    grid[elf.y][elf.x] = '.'

    // set new location
    grid[direction.y][direction.x] = '#';
  }

  return grid;
}

const simulate = (grid: Grid, partTwo = false) => {
  let i = 1;
  let conditionsOrder: Direction[] = ['N', 'S', 'W', 'E'];

  while (true) {

    // end after 10 rounds
    if (!partTwo && i > 10) {
      break;
    }

    const directions: [Elf, Elf, number][] = []
    const elves = getElvesCoordinates(grid);

    // first half of round
    for (const elf of elves) {

      // get elf proposed moves
      const proposedMoves = getProposedMoves(elf);

      // get neighbours
      const neighbours = getNeighbours(proposedMoves, grid);

      // if no neighbours, skip this one
      if (!neighbours || neighbours.length === 0) {
        continue;
      }

      const proposedDirection = getDirection(elf, proposedMoves, grid, conditionsOrder);
      const visitedDirection = directions.find(dir => dir[1]?.x === proposedDirection?.x && dir[1]?.y === proposedDirection?.y);
      const index = directions.indexOf(visitedDirection);

      if (!visitedDirection) {
        directions.push([elf, proposedDirection, 1]);
      } else {
        directions[index] = [elf, proposedDirection, directions[index][2] + 1];
      }
    }

    // second half of the round
    const uniqueDirections = directions.filter(dir => dir[2] === 1);

    if (uniqueDirections.length === 0) {

      if (partTwo) {
        return i;
      }

      break;
    }

    // move elves
    grid = move(grid, uniqueDirections);

    // end of move
    conditionsOrder = rotateConditions(conditionsOrder);
    i++;
  }
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  let grid = initGrid(input);

  // simulate elf movements
  simulate(grid);

  const rectangle = getRectangle(grid);
  const emptySpaces = rectangle.flat(3).filter(spot => spot === '.').length;

  return emptySpaces;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  // let grid = initGrid(input);

  // // simulate elf movements
  // const n = simulate(grid, true);

  // console.log(n);

}
