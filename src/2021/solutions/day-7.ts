/* This file contains solution for AoC puzzle day 7 */

import { getYear, getDay, getInput } from '../../utils/utils';

const stepCost = (position: any, number: any, part: any) => {
  const cost = Math.abs(position - number);

  if (part === 1) { return cost; }

  let sum = 0;

  for (let i = 0; i < cost; i++) {
    sum += i;
  }

  return cost + sum;
};

const getPositionsToCheck = (input: any) => {
  const inputNumbers: any = Array.from(new Set(input));
  const max = Math.max(...inputNumbers);
  const min = Math.min(...inputNumbers);

  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split(',').map(Number);

  return Math
    .min(...getPositionsToCheck(parsedInput)
      .map(position => parsedInput
        .map(crab => stepCost(position, crab, 1))
        .reduce((x, y) => x + y, 0))
    );
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split(',').map(Number);

  return Math
    .min(...getPositionsToCheck(parsedInput)
      .map(position => parsedInput
        .map(crab => stepCost(position, crab, 2))
        .reduce((x, y) => x + y, 0))
    );
};
