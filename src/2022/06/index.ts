/* This file contains solution for AoC puzzle day 6 */

const solve = (input: any, size: number) => {
  const packet: string[] = [];

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
};

export const solveOne = (input: string) => {
  return solve(input, 4);
};

export const solveTwo = (input: string) => {
  return solve(input, 14);
};