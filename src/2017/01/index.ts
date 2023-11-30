/* This file contains solution for AoC puzzle day 1 */

export const solveOne = (input: string) => {

  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const digitOne = input[i];
    const digitTwo = input[(i + 1)] || input[0];

    // console.log(`comparing ${digitOne} and ${digitTwo}`)
    if (digitOne === digitTwo) {
      sum += Number(digitOne);
    }
  }

  return sum;
};

export const solveTwo = (input: string) => {

  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    const digitOne = input[i];
    const digitTwo = input[(i + (input.length / 2)) % input.length];

    // console.log(`comparing ${digitOne} and ${digitTwo}`)
    if (digitOne === digitTwo) {
      sum += Number(digitOne);
    }
  }

  return sum;
};