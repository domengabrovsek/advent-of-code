/* This file contains solution for AoC puzzle day 3 */

import { getYear, getDay, getInput } from '../../utils/utils';

const transposeArray = (array: any) => array[0].map((_: any, colIndex: any) => array.map((row: any) => row[colIndex]));

const getEpsilonRate = (gammaRate: any) => {
  const flippedBits = gammaRate.split('').map((bit: any) => {

    let res;

    if (bit === '1') { res = '0'; }
    else if (bit === '0') { res = '1'; }

    return res;
  })
    .join('');

  return flippedBits;
};

const getGammaRate = (input: any) => {
  let gammaRate = '';

  input.forEach((element: any) => {
    const ones = element.filter((bit: any) => bit === '1').length;
    const zeros = element.filter((bit: any) => bit === '0').length;

    gammaRate += ones > zeros
      ? '1'
      : '0';
  });

  return gammaRate;
};

const getLeastCommonBit = (input: any, column: any) => {
  const bits = transposeArray(input)[column];
  const ones = bits.filter((bit: any) => bit === '1').length;
  const zeros = bits.filter((bit: any) => bit === '0').length;

  if (ones > zeros) { return '0'; }
  if (zeros > ones) { return '1'; }
  return '0';
};

const getMostCommonBit = (input: any, column: any) => {
  const bits = transposeArray(input)[column];
  const ones = bits.filter((bit: any) => bit === '1').length;
  const zeros = bits.filter((bit: any) => bit === '0').length;

  if (ones > zeros) { return '1'; }
  if (zeros > ones) { return '0'; }
  return '1';
};

const getOxGenRate = (input: any) => {
  let numbers: any = Array.from(input);
  let currentBit = 0;

  while (numbers.length !== 1) {
    const mostCommonBit = getMostCommonBit(numbers, currentBit);
    numbers = numbers.filter((number: any) => number[currentBit] === mostCommonBit);
    currentBit++;
  }

  const oxGenRate = parseInt(numbers[0].join(''), 2);
  return oxGenRate;
};

const getCO2ScrubRate = (input: any) => {
  let numbers: any = Array.from(input);
  let currentBit = 0;

  while (numbers.length !== 1) {
    const leastCommonBit = getLeastCommonBit(numbers, currentBit);
    numbers = numbers.filter((number: any) => number[currentBit] === leastCommonBit);
    currentBit++;
  }

  return parseInt(numbers[0].join(''), 2);
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(x => x.split(''));

  const transposedInput = transposeArray(parsedInput);
  const gammaRate = getGammaRate(transposedInput);
  const epsilonRate = getEpsilonRate(gammaRate);
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input.split('\n').map(x => x.split(''));

  const oxGenRate = getOxGenRate(parsedInput);
  const CO2ScrubRate = getCO2ScrubRate(parsedInput);
  return oxGenRate * CO2ScrubRate;
};
