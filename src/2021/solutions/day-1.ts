/* This file contains solution for AoC puzzle day 1 */

import { getYear, getDay, getInput } from '../../utils/utils';

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(number => parseInt(number));

  let numberOfIncreases = 0;
  let previousNumber;

  for (let i = 0; i < parsedInput.length; i++) {
    const number = parsedInput[i]

    if (previousNumber) {
      if (previousNumber < number) {
        numberOfIncreases++;
      }
    }

    previousNumber = number;
  }

  return numberOfIncreases;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(number => parseInt(number));

  let numberOfIncreases = 0;
  let previousNumber;

  for (let i = 0; i < parsedInput.length; i++) {
    const number = parsedInput[i] + parsedInput[i + 1] + parsedInput[i + 2];

    if (previousNumber) {
      if (previousNumber < number) {
        numberOfIncreases++;
      }
    }

    previousNumber = number;
  }

  return numberOfIncreases;
}