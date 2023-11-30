/* This file contains solution for AoC puzzle day 4 */

export const solveOne = (input: string) => {

  const parsedInput = input.split('\n');

  let overlaps = 0;

  for (const row of parsedInput) {
    const [a, b, c, d] = row.split(',').flatMap(x => x.split('-').map(x => parseInt(x)));

    if ((a >= c && b <= d) || (c >= a && d <= b)) {
      overlaps += 1;
    }
  }

  return overlaps;
};

export const solveTwo = (input: string) => {

  const parsedInput = input.split('\n');

  let overlaps = 0;

  for (const row of parsedInput) {
    const [a, b, c, d] = row.split(',').flatMap(x => x.split('-').map(x => parseInt(x)));

    if ((a >= c && a <= d) || (b >= c && b <= d) || (c >= a && c <= b) || (d >= a && d <= b)) {
      overlaps += 1;
    }
  }

  return overlaps;
};