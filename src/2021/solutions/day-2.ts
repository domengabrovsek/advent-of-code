/* This file contains solution for AoC puzzle day 2 */

import { getYear, getDay, getInput } from '../../utils/utils';

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  let currentPosition = 0;
  let currentDepth = 0;

  parsedInput.forEach(line => {
    const parts = line.split(' ');
    const command = parts[0];
    const value = parseInt(parts[1]);

    switch (command) {
      case 'forward': {
        currentPosition += value;
        break;
      }
      case 'down': {
        currentDepth += value;
        break;
      }
      case 'up': {
        currentDepth -= value;
        break;
      }
    }
  });

  return currentDepth * currentPosition;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  let currentPosition = 0;
  let currentDepth = 0;
  let currentAim = 0;

  parsedInput.forEach(line => {
    const parts = line.split(' ');
    const command = parts[0];
    const value = parseInt(parts[1]);

    switch (command) {
      case 'forward': {
        currentPosition += value;
        currentDepth += (currentAim * value);
        break;
      }
      case 'down': {
        currentAim += value
        break;
      }
      case 'up': {
        currentAim -= value
        break;
      }
    }
  });

  return currentDepth * currentPosition;
}
