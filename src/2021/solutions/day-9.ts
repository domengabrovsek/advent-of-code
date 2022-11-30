/* This file contains solution for AoC puzzle day 9 */

import { getYear, getDay, getInput } from '../../utils/utils';

const getLowPoints = (input: any) => {
  const lowPoints = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {

      const current = input[i][j];
      const upper = input?.[i]?.[j - 1];
      const lower = input?.[i]?.[j + 1];
      const left = input?.[i - 1]?.[j];
      const right = input?.[i + 1]?.[j];

      const points = [upper, lower, left, right].filter(x => x !== undefined);

      if (current < Math.min(...points)) {
        lowPoints.push({ value: current, i, j });
      }
    }
  }

  return lowPoints;
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(x => x.split('').map(Number));

  const lowPoints = getLowPoints(parsedInput);
  return lowPoints.map(x => x.value).reduce((x, y) => x + y, 0) + lowPoints.length;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(x => x.split('').map(Number));

  const lowPoints = getLowPoints(parsedInput);

  const basins = lowPoints.map(() => []);
  lowPoints.forEach((lowPoint, basin) => {

    const stack = [[lowPoint.i, lowPoint.j]];

    while (true) {

      // take next item from stack
      const current = stack.pop();

      // when stack is empty we're done
      if (!current) {
        break;
      }

      // get current value from coordinates
      const currentValue = parsedInput[current[0]][current[1]];

      // add all numbers except 9 to the basin
      if (currentValue !== 9) {
        if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1])) {
          basins[basin].push([current[0], current[1]]);
        }

        // push adjacent values to the stack

        // left
        const left = parsedInput?.[current[0]]?.[current[1] - 1];
        if (left && left !== 9) {
          if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1] - 1)) {
            stack.push([current[0], current[1] - 1]);
          }
        }

        // right
        const right = parsedInput?.[current[0]]?.[current[1] + 1];
        if (right && right !== 9) {

          // add only if it doesnt exist yet
          if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1] + 1)) {
            stack.push([current[0], current[1] + 1]);
          }
        }

        // top
        const top = parsedInput?.[current[0] - 1]?.[current[1]];
        if (top && top !== 9) {

          // add only if it doesnt exist yet
          if (!basins[basin].find(x => x[0] === current[0] - 1 && x[1] === current[1])) {
            stack.push([current[0] - 1, current[1]]);
          }
        }

        // bottom
        const bottom = parsedInput?.[current[0] + 1]?.[current[1]];
        if (bottom && bottom !== 9) {

          // add only if it doesnt exist yet
          if (!basins[basin].find(x => x[0] === current[0] + 1 && x[1] === current[1])) {
            stack.push([current[0] + 1, current[1]]);
          }
        }
      }
    }
  });

  const basinSizes = basins
    .map((x:any) => parseInt(x.length))
    .sort((a, b) => a - b);

  const basinsLength = basinSizes.length;

  return basinSizes[basinsLength - 1] * basinSizes[basinsLength - 2] * basinSizes[basinsLength - 3];
}
