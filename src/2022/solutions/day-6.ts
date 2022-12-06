/* This file contains solution for AoC puzzle day 6 */

import { getYear, getDay, getInput } from '../../utils/utils';

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  let packet: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (packet.length === 4) {
    
      if (new Set(packet).size === 4) {
        return i;
      }

      packet.shift();
    }
    packet.push(char);
  }
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  let packet: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (packet.length === 14) {
    
      if (new Set(packet).size === 14) {
        return i;
      }

      packet.shift();
    }

    packet.push(char);
  }
}
