/* This file contains solution for AoC puzzle day 10 */

import { getYear, getDay, getInput } from '../../utils/utils';

const mapChar = (char: any) => {
  switch (char) {
    case '{': return '}';
    case '(': return ')';
    case '<': return '>';
    case '[': return ']';
  }
};

const median = (numbers: any) => {
  const sorted = numbers.slice().sort((a: any, b: any) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  const scoringDict: any = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };

  const illegalCharsFound = [];
  const corruptedLines = [];
  const missingPieces = [];

  for (const [index, line] of parsedInput.entries()) {
    let stack = [line[0]];

    for (const char of line.split('')) {
      const previous = stack?.[stack.length - 1];

      // add opening parenthesis to stack
      if (['{', '(', '[', '<'].includes(char)) {
        stack.push(char);
      }

      // logic for closing parenthesis
      // if opening doesn't match closing it's illegal
      // save illegal character and corrupted line and stop
      else if ((previous === '{' && char !== '}') ||
        (previous === '<' && char !== '>') ||
        (previous === '(' && char !== ')') ||
        (previous === '[' && char !== ']')) {

        illegalCharsFound.push(char);
        corruptedLines.push(index);
        stack = [];
        break;
      }
      // if opening and closing parenthesis match, just continue
      else {
        stack.pop();
      }
    }

    // save the remaining elements of stack map them to
    // get missing pieces for incomplete lines
    if (stack?.length > 0) {
      stack = stack.reverse();
      stack.pop();
      missingPieces.push(stack.map((x: any) => mapChar(x)));
    }
  }

  return illegalCharsFound
    .map(x => scoringDict[x])
    .reduce((sum, curr) => sum + curr, 0);
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n');

  const scoringDict: any = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  };

  const illegalCharsFound = [];
  const corruptedLines = [];
  const missingPieces = [];

  for (const [index, line] of parsedInput.entries()) {
    let stack = [line[0]];

    for (const char of line.split('')) {
      const previous = stack?.[stack.length - 1];

      // add opening parenthesis to stack
      if (['{', '(', '[', '<'].includes(char)) {
        stack.push(char);
      }

      // logic for closing parenthesis
      // if opening doesn't match closing it's illegal
      // save illegal character and corrupted line and stop
      else if ((previous === '{' && char !== '}') ||
        (previous === '<' && char !== '>') ||
        (previous === '(' && char !== ')') ||
        (previous === '[' && char !== ']')) {

        illegalCharsFound.push(char);
        corruptedLines.push(index);
        stack = [];
        break;
      }
      // if opening and closing parenthesis match, just continue
      else {
        stack.pop();
      }
    }

    // save the remaining elements of stack map them to
    // get missing pieces for incomplete lines
    if (stack?.length > 0) {
      stack = stack.reverse();
      stack.pop();
      missingPieces.push(stack.map((x: any) => mapChar(x)));
    }
  }

  return median(missingPieces
    .map((line: any) => line
      .reduce((sum: any, char: any) => (sum * 5) + scoringDict[char], 0)));
};
