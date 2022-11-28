'use strict';

const { readFile } = require('../helpers');

// read file and parse all rows as numbers
const input = readFile(`${__dirname}\\input.txt`)
  .map(row => parseInt(row))
  .sort((a, b) => a - b);


const partOne = (input) => {
  const diffs = {
    1: 0,
    2: 0,
    3: 1
  };

  let current = 0

  for (let number of input) {
    const diff = number - current;
    diffs[diff] += 1;
    current = number;
  }

  return diffs;
}

const isArrangementValid = (numbers) => {
  let current = 0

  for (let number of numbers) {
    const diff = number - current;
    if (diff > 3) {
      return false;
    }
    current = number;
  }

  return true;
}

const getNumbersToRemove = (input) => input.filter(number => input.includes(number - 1) && input.includes(number + 1));

const getCombinationsToRemove = (input) => {

  const combinations = [];

  for (let i = 0; i < input.length; i++) {
    const combination = [];
    for (let j = i; j < input.length; j++) {
      combination.push(input[j])
      combinations.push([...combination])
    }
  }
  // 5      X
  // 5 6    X
  // 5 6 11 X
  // 5   11 
  //   6
  //   6 11
  //     11 

  return combinations;
}

const getArrangements = (input) => {

  const combinations = getCombinationsToRemove(getNumbersToRemove(input));

  let candidates = input.map(x => [...input]);

  combinations.forEach((combination, i) => {
    combination.forEach(number => {
      console.log(i, number)
      candidates[i].splice(candidates[i].indexOf(number), 1)
    })
  })

  return candidates;

}

// // part one
// const diffs = partOne(input)
// console.log(diffs);
// console.log(diffs[1] * diffs[3])

// part two

console.log(getNumbersToRemove(input).length)
console.log(Math.pow(2, getNumbersToRemove(input).length))
// console.log(getCombinationsToRemove(getNumbersToRemove(input)));
// console.table(getArrangements(input))
// console.log(isArrangementValid([1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19]))


