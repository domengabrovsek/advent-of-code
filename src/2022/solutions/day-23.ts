/* This file contains solution for AoC puzzle day 23 */

import { getYear, getDay, getInput } from '../../utils/utils';
import { initGrid, Direction, Grid, getNeighbours, getCoordinate, extractCoordinates } from '../../utils/grid';

const getElvesCoordinates = (input: string) => initGrid(input, '#');

const getNumberOfEmptySpaces = (grid: Grid) => {

  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;

  grid.forEach((val, key) => {
    const { x, y } = extractCoordinates(key);
    if (minX > x) { minX = x };
    if (maxX < x) { maxX = x };
    if (minY > y) { minY = y };
    if (maxY < y) { maxY = y };
  })

  const x = maxX - minX;
  const y = maxY - minY;

  const result = ((x + 1) * (y + 1)) - grid.size;
  return result;
}

const rotateConditions = (conditions: Direction[]) => { conditions.push(conditions.shift()); return conditions };

const getDirection = (neighbours: Grid, conditionOrder: Direction[]) => {
  const north = !neighbours.has('N') && !neighbours.has('NE') && !neighbours.has('NW');
  const south = !neighbours.has('S') && !neighbours.has('SE') && !neighbours.has('SW');
  const west = !neighbours.has('W') && !neighbours.has('NW') && !neighbours.has('SW');
  const east = !neighbours.has('E') && !neighbours.has('NE') && !neighbours.has('SE');

  const conditions: Record<string, any> = {
    'N': { condition: north },
    'S': { condition: south },
    'W': { condition: west },
    'E': { condition: east }
  };

  if (conditions[conditionOrder[0]].condition) return conditionOrder[0];
  else if (conditions[conditionOrder[1]].condition) return conditionOrder[1];
  else if (conditions[conditionOrder[2]].condition) return conditionOrder[2];
  else if (conditions[conditionOrder[3]].condition) return conditionOrder[3];
}

const move = (grid: Grid, directions: [string, string, number][]) => {

  for (const [elf, direction] of directions) {
    grid.delete(elf);
    grid.set(direction, '#');
  }

  return grid;
}

const simulate = (elves: Grid, partTwo = false) => {
  let i = 1;
  let conditionsOrder: Direction[] = ['N', 'S', 'W', 'E'];

  while (true) {

    // end after 10 rounds
    if (!partTwo && i > 10) {
      break;
    }

    const directions: [string, string, number][] = [];
    let elvesList = elves.entries();

    // first half of round
    for (const [elf] of elvesList) {

      // get neighbours
      const neighbours = getNeighbours(elves, elf);

      // if no neighbours, skip this one
      if (!neighbours || neighbours.size === 0) {
        continue;
      }

      const proposedDirection = getDirection(neighbours, conditionsOrder);

      // if elf cannot move N|S|E|W then skip 
      if (!proposedDirection) {
        continue
      }

      const proposedMove = getCoordinate(elf, proposedDirection);
      const visitedDirection = directions.find(move => move[1] === proposedMove);
      const index = directions.indexOf(visitedDirection);


      if (!visitedDirection) {
        directions.push([elf, proposedMove, 1]);
      } else {
        directions[index] = [elf, proposedMove, directions[index][2] + 1];
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
    elves = move(elves, uniqueDirections);

    // end of move
    conditionsOrder = rotateConditions(conditionsOrder);
    i++;
  }

  return elves;
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const elves = getElvesCoordinates(input);

  // simulate elf movements
  const endGrid = simulate(elves) as Grid;

  return getNumberOfEmptySpaces(endGrid);
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const elves = getElvesCoordinates(input);

  // simulate elf movements
  return simulate(elves, true);
}
