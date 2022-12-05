/* This file contains solution for AoC puzzle day 5 */

import { getYear, getDay, getInput } from '../../utils/utils';

const prepareStacks = (rows: any) => {
  const startingPosition = rows.slice(0, 9);
  const stacks: any = {};

  for (let i = 1; i < startingPosition.length * 4; i += 4) {
    let stack = []
    for (let j = 0; j < startingPosition[0].length; j++) {
      const value = startingPosition?.[j]?.[i];
      if (value && value !== ' ') {
        stack.unshift(value);
      }
    }
    const index = stack.shift();
    stacks[index] = stack;
    stack = [];

  }

  return stacks;
}

const prepareMoves = (rows: any) => rows.slice(10, rows.length).map((x: any) => x.match(/\d{1,2}/gm));

const moveCargo = (stacks: any, quantity: number, from: number, to: number) => {
  const fromStack = stacks[from];
  const toStack = stacks[to];

  for (let i = 0; i < quantity; i++) {
    const value = fromStack.pop();
    toStack.push(value)
  }
}

const moveCargo2 = (stacks: any, quantity: number, from: number, to: number) => {
  const fromStack = stacks[from];
  const toStack = stacks[to];

  const value = fromStack.splice(fromStack.length - quantity, quantity);
  toStack.push(...value)
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const rows = input.split('\n');

  const stacks = prepareStacks(rows);
  const moves = prepareMoves(rows);

  for (let move of moves) {
    const [quantity, from, to] = move;
    moveCargo(stacks, quantity, from, to);
  }

  const tops = Object.keys(stacks).map((key: any) => stacks[key].pop()).join('');

  return tops;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const rows = input.split('\n');

  const stacks = prepareStacks(rows);
  const moves = prepareMoves(rows);

  for (let move of moves) {
    const [quantity, from, to] = move;
    moveCargo2(stacks, quantity, from, to);
  }

  const tops = Object.keys(stacks).map((key: any) => stacks[key].pop()).join('');

  return tops;
}
