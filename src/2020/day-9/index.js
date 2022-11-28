'use strict';

const { readFile } = require('../helpers');

// read file and parse all rows as numbers
const input = readFile(`${__dirname}\\input.txt`)
  .map(row => parseInt(row));

const { sumItemsInArray } = require('../helpers');



const getNumberCandidates = (numbers) => {

  if (numbers.length === 1) {
    return numbers;
  }

  let candidates = new Set();

  // create a unique array of all possible sums of numbers in the array
  // this is to be used later to compare if next number is one of the sums in this array (valid number)

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      candidates.add(numbers[i] + numbers[j]);
    }
  }

  return Array.from(candidates);
}

const getSequenceCandidates = (numbers) => {

  let sequences = [];

  // find all possible sequences of at least two numbers
  // between all the numbers in the list
  for (let i = 0; i < numbers.length; i++) {
    let group = [];
    for (let number of numbers) {
      group.push(number);
      sequences.push([...group]);
    }
    numbers.shift();
  }

  return sequences;
}

const findInvalidNumber = (input) => {

  // n is the number of how many previous numbers are considered when creating candidates
  const n = 25;

  // preamble is first n items
  let preamble = input.slice(0, n);

  // all next numbers to be checked if they are valid (all numbers - preamble)
  let numbers = input.slice(n, input.length)


  // go through the list and create a list of candidates
  // check if next number is valid (is included in the candidates)
  // if number is not valid return it
  for (let number of numbers) {

    const candidates = getNumberCandidates(preamble);

    if (candidates.includes(number)) {
      preamble.shift();
      preamble.push(number);
    } else {
      return number;
    }
  }
}

const findSequence = (input, result) => {

  // find a sequence of numbers whish if summed up is equal to the invalid number we found in part one (result)
  const sequenceCandidates = getSequenceCandidates(input);

  for (let candidate of sequenceCandidates) {
    const arraySum = sumItemsInArray(candidate);
    if (arraySum === result) {
      return candidate;
    }
  }
}

const findEncryptionWeakness = (sequence) => {

  // find min and max number in the sequence, add them together and return the sum
  const sortedSequence = sequence.sort((a, b) => a - b);
  const encryptionWeakness = sortedSequence[0] + sortedSequence[sortedSequence.length - 1];

  return encryptionWeakness;
}

const result = {
  partOne: findInvalidNumber(input),
  partTwo: findEncryptionWeakness(findSequence(input, findInvalidNumber(input)))
}

console.log(result); // { partOne: 41682220, partTwo: 5388976 }

module.exports = {
  getNumberCandidates
}
