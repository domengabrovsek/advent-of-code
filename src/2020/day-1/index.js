'use strict';

const { readFile, multiplyItemsInArray } = require('../helpers');

// read input file and parse entries as numbers
const input = readFile('./input.txt')
  .map(x => parseInt(x));

// part one
const findTwoEntries = (input, num) => {
  for (let i = 0; i < input.length; i++) {
    const a = input[i];
    for (let j = 0; j < input.length - i; j++) {
      const b = input[j];
      const sum = a + b;
      if (sum === num) {
        return [a, b];
      }
    }
  }
}

// part two
const findThreeEntries = (input, num) => {
  for (let i = 0; i < input.length; i++) {
    const a = input[i];
    const diff = num - a;
    const result = findTwoEntries(input, diff);
    if (result) {
      return [a, ...result];
    }
  }
}

const inputNumber = 2020;

const result = {
  partOne: multiplyItemsInArray(findTwoEntries(input, inputNumber)),
  partTwo: multiplyItemsInArray(findThreeEntries(input, inputNumber))
}

console.log(result) // { partOne: 1006875, partTwo: 165026160 }
