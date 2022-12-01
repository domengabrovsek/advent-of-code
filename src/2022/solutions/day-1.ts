/* This file contains solution for AoC puzzle day 1 */

import { getYear, getDay, getInput } from '../../utils/utils';

const sumCalories = (input: string[]) => {
  const calories = [];

  let current = 0;

  for (let i = 0; i < input.length; i++) {

    let row = parseInt(input[i]);

    if (row) {
      current += row;
    } else {
      calories.push(current);
      current = 0;
    }
  }

  return calories;
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');
  const calories = sumCalories(parsedInput);
  return Math.max(...calories);
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');
  const calories = sumCalories(parsedInput);
  const topThree = calories.sort();
  return (topThree.pop() + topThree.pop() + topThree.pop());
}
