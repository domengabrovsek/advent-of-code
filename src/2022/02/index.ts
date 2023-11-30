/* This file contains solution for AoC puzzle day 2 */

// A X 1 ROCK
// B Y 2 PAPER
// C Z 3 SCISSOR
const score: any = {
  'AY': 8,
  'AX': 4,
  'AZ': 3,
  'BY': 5,
  'BX': 1,
  'BZ': 9,
  'CY': 2,
  'CX': 7,
  'CZ': 6,
};

// X LOSE
// Y DRAW
// Z WIN
const nextMove: any = {
  'AY': 'X',
  'AX': 'Z',
  'AZ': 'Y',
  'BY': 'Y',
  'BX': 'X',
  'BZ': 'Z',
  'CY': 'Z',
  'CX': 'Y',
  'CZ': 'X',
};

export const solveOne = (input: string) => {
  return input.split('\n').reduce((sum, row) => sum + score[row.split(' ').join('')], 0);
};

export const solveTwo = (input: string) => {
  return input.split('\n').reduce((sum, row) => {
    const myMove = nextMove[row.split(' ').join('')];
    const play = `${row[0]}${myMove}`;
    return sum + score[play];
  }, 0);
};