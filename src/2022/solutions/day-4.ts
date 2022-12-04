/* This file contains solution for AoC puzzle day 4 */

import { getYear, getDay, getInput } from '../../utils/utils';

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  let overlaps = 0;

  for (let row of parsedInput) {
    let [a, b, c, d] = row.split(',').flatMap(x => x.split('-').map(x => parseInt(x)));

    if ((a >= c && b <= d) || (c >= a && d <= b)) {
      overlaps += 1;
    }
  }

  return overlaps;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  let overlaps = 0;

  for (let row of parsedInput) {
    let [a, b, c, d] = row.split(',').flatMap(x => x.split('-').map(x => parseInt(x)));

    if ((a >= c && a <= d) || (b >= c && b <= d) || (c >= a && c <= b) || (d >= a && d <= b)) {
      overlaps += 1;
    }
  }

  return overlaps;
}
