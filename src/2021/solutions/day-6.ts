/* This file contains solution for AoC puzzle day 6 */

import { getYear, getDay, getInput } from '../../utils/utils';

const solve = (input: any, days: number) => {
  const fishArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  input
    .split(',')
    .filter(Boolean)
    .map((x: any) => parseInt(x)).forEach((fish: any) => {
      if (!fishArray[fish]) {
        fishArray[fish] = 1;
      } else {
        fishArray[fish] += 1;
      }
    });

  // simulate days
  for (let i = 1; i <= days; i++) {

    const newFish = fishArray[0];

    // remove level 0 fish
    if (fishArray[0]) {
      fishArray[0] = 0;
    }

    // simulate fish reproduction
    for (let j = 1; j < fishArray.length; j++) {
      if (fishArray[j]) {
        fishArray[j - 1] += fishArray[j];
        fishArray[j] -= fishArray[j];
      }
    }

    // add newly born and reset fish
    fishArray[8] += newFish;
    fishArray[6] += newFish;
  }

  // sum all the fish
  return fishArray.reduce((x, y) => x + y, 0);
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  return solve(input, 80);
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  return solve(input, 256);
};
