/* This file contains solution for AoC puzzle day 8 */

import { getYear, getDay, getInput } from '../../utils/utils';

const decodeDigit = (digit: any, instructions: any) => {

  if (digit.length === 7) { return 8; }
  if (digit.length === 4) { return 4; }
  if (digit.length === 3) { return 7; }
  if (digit.length === 2) { return 1; }

  const enabledParts = digit.split('').map((part: any) => instructions[part]).sort().join('');

  switch (enabledParts) {
    case '012356': return 9;
    case '012456': return 0;
    case '02346': return 2;
    case '02356': return 3;
    case '01356': return 5;
    case '013456': return 6;
  }
}

const decodeDigits = (digits: any, instructions: any) => {
  return digits.split(' ').map((digit: any) => decodeDigit(digit, instructions)).join('');
}

const getCommonElement = (arrays: any) => {
  return arrays.shift().filter((v: any) => arrays.every((a: any) => a.indexOf(v) !== -1));
}

const decodeInstructions = (input: any) => {
  //   0:      1:      2:      3:      4:
  //  aaaa    ....    aaaa    aaaa    ....
  // b    c  .    c  .    c  .    c  b    c
  // b    c  .    c  .    c  .    c  b    c
  //  ....    ....    dddd    dddd    dddd
  // e    f  .    f  e    .  .    f  .    f
  // e    f  .    f  e    .  .    f  .    f
  //  gggg    ....    gggg    gggg    ....

  //   5:      6:      7:      8:      9:
  //  aaaa    aaaa    aaaa    aaaa    aaaa
  // b    .  b    .  .    c  b    c  b    c
  // b    .  b    .  .    c  b    c  b    c
  //  dddd    dddd    ....    dddd    dddd
  // .    f  e    f  .    f  e    f  .    f
  // .    f  e    f  .    f  e    f  .    f
  //  gggg    gggg    ....    gggg    gggg

  const instructions = input.split(' ');
  const dict: any = {};

  let key: any;

  // 1, 3, 4, 7 can be decoded just by using the length

  const one = instructions
    .find((x: any) => x.length === 2)
    .split('')
    .sort()
    .join('');

  const seven = instructions
    .find((x: any) => x.length === 3)
    .split('')
    .sort()
    .join('');

  const four = instructions
    .find((x: any) => x.length === 4)
    .split('')
    .sort()
    .join('');

  const eight = instructions
    .find((x: any) => x.length === 7)
    .split('')
    .sort()
    .join('');

  // start the process of elimination to get all parts of the digits

  // 0
  key = seven.split('')
    .filter((x: any) => !one.includes(x))[0]; // exclude all from 1
  dict[key] = 0;

  // 6
  key = getCommonElement(instructions
    .filter((x: any) => x.length === 5) // 2, 3, 5
    .map((x: any) => x.split('')))
    .filter((x: any) => !four.includes(x)) // exclude all from 4
    .filter((x: any) => !seven.includes(x))[0]; // exclude all from 7
  dict[key] = 6;

  // 3
  key = getCommonElement(instructions
    .filter((x: any) => x.length === 5) // 2, 3, 5
    .map((x: any) => x.split('')))
    .filter((x: any) => ![key].includes(x)) // exclude all from 6
    .filter((x: any) => !seven.includes(x))[0]; // exclude all from 7
  dict[key] = 3;

  // 1
  key = four.split('')
    .filter((x: any) => !seven.includes(x)) // exclude all from 7
    .filter((x: any) => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 3, 6

  dict[key] = 1;

  // 5
  key = getCommonElement(instructions
    .filter((x: any) => x.length === 6) // 6, 9
    .map((x: any) => x.split('')))
    .filter((x: any) => !Object.keys(dict).includes(x))[0]; // exclude all from current dict

  dict[key] = 5;

  // 4
  key = eight.split('')
    .filter((x: any) => !four.includes(x)) // exclude all from 4
    .filter((x: any) => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 2, 3, 5, 6

  dict[key] = 4;

  // 2
  key = eight.split('')
    .filter((x: any) => !Object.keys(dict).includes(x))[0]; // exclude all from 0, 2, 3, 5, 6
  dict[key] = 2;

  return dict;
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input
    .split('\n')
    .map(line => line
      .split('|')
      .map(part => part.trim()));

  return parsedInput
    .map((line: any) => line[1].split(' '))
    .flatMap(digit => digit)
    .filter(digit => [2, 3, 4, 7].includes(digit.length))
    .length;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input
    .split('\n')
    .map(line => line
      .split('|')
      .map(part => part.trim()));

  let sum = 0;

  parsedInput.forEach((line: any) => {
    const [left, right] = line;

    // instructions to decode digits
    const instructions = decodeInstructions(left);

    // decode the digits and add it to sum
    sum += parseInt(decodeDigits(right, instructions));
  });

  return sum;
}
