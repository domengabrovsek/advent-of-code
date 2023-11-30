/* This file contains solution for AoC puzzle day 11 */

import { getYear, getDay, getInput } from '../../utils/utils';

const getAdjacentOctopuses = (x: any, y: any, input: any) => {
  const adjacentOctopuses = [];

  // top
  adjacentOctopuses.push([x, y - 1]);

  // bottom
  adjacentOctopuses.push([x, y + 1]);

  // left
  adjacentOctopuses.push([x - 1, y]);

  // right
  adjacentOctopuses.push([x + 1, y]);

  // left top
  adjacentOctopuses.push([x - 1, y - 1]);

  // left bottom
  adjacentOctopuses.push([x - 1, y + 1]);

  // right top
  adjacentOctopuses.push([x + 1, y - 1]);

  // right bottom
  adjacentOctopuses.push([x + 1, y + 1]);

  return adjacentOctopuses.filter(x => input?.[x[0]]?.[x[1]]);
};

const flashAndCount = (input: any) => {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) {
        sum += 1;
        input[i][j] = 0;
      }
    }
  }

  return { sum, input };
};

const allFlashed = (input: any) => {
  let totalFlashes = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] > 9) {
        totalFlashes++;
        input[i][j] = 0;
      }
    }
  }

  const totalOctopuses = input.length * input[0].length;

  return totalFlashes === totalOctopuses;
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  let parsedInput: any = input.split('\n')
    .map(row => row.split('')
      .map(value => parseInt(value)));

  const totalSteps = 100;
  let totalFlashes = 0;

  // iterate through steps
  for (let step = 1; step <= totalSteps; step++) {

    const stack = [];

    for (let i = 0; i < parsedInput.length; i++) {
      for (let j = 0; j < parsedInput[i].length; j++) {

        // increase all by 1
        parsedInput[i][j] += 1;

        // push octopuses which should flash to stack
        if (parsedInput[i][j] > 9) {
          stack.push([i, j]);
        }
      }
    }

    // iterate until all that should flashed have flashed
    while (stack.length > 0) {

      const [x, y] = stack.shift();

      // get all adjacent
      const adjacentOctopuses = getAdjacentOctopuses(x, y, parsedInput);

      // increase all adjacent by 1 and push the ones to flash to stack
      for (const oct of adjacentOctopuses) {
        parsedInput[oct[0]][oct[1]] += 1;
        if (parsedInput[oct[0]][oct[1]] === 10) {
          stack.push([oct[0], oct[1]]);
        }
      }
    }

    // flash the ones who have energy over 9 and count them

    const result = flashAndCount(parsedInput);
    totalFlashes += result.sum;

    parsedInput = result.input;
  }

  return totalFlashes;
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n')
    .map(row => row.split('')
      .map(value => parseInt(value)));

  let totalSteps = 0;

  // iterate until all octopuses flash
  while (!allFlashed(parsedInput)) {
    const stack = [];

    for (let i = 0; i < parsedInput.length; i++) {
      for (let j = 0; j < parsedInput[i].length; j++) {

        // increase all by 1
        parsedInput[i][j] += 1;

        // push octopuses which should flash to stack
        if (parsedInput[i][j] > 9) {
          stack.push([i, j]);
        }
      }
    }

    // iterate until all that should flashed have flashed
    while (stack.length > 0) {

      const [x, y] = stack.shift();

      // get all adjacent
      const adjacentOctopuses = getAdjacentOctopuses(x, y, parsedInput);

      // increase all adjacent by 1 and push the ones to flash to stack
      for (const oct of adjacentOctopuses) {
        parsedInput[oct[0]][oct[1]] += 1;
        if (parsedInput[oct[0]][oct[1]] === 10) {
          stack.push([oct[0], oct[1]]);
        }
      }
    }

    totalSteps += 1;
    if (allFlashed(parsedInput)) {
      return totalSteps;
    }
  }
};
