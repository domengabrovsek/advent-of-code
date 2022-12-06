/* This file contains solution for AoC puzzle day 6 */

import { getYear, getDay, getInput } from '../../utils/utils';

const solve = (input: any, size: number) => {
  let packet: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (packet.length === size) {

      if (new Set(packet).size === size) {
        return i;
      }

      packet.shift();
    }
    packet.push(char);
  }
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  return solve(input, 4);
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  return solve(input, 14);
}
