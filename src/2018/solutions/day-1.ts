/* This file contains solution for AoC puzzle day 1 */

import { getYear, getDay, getInput } from '../../utils/utils';

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  // parse input to get numbers
  const numbers = input.split('\n').map(row => row.includes('+') ? Number(row.split('+')[1]) : Number(row));

  // sum number
  const sum = numbers.reduce((sum, curr) => sum + curr, 0);

  return sum;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  // TODO: Implement part two
}
