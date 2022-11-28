'use strict';

const { readFile, countCharsInString } = require('../helpers');
const input = readFile('./input.txt');

const getValidPasswords = (input) => {
  let validPasswords = {
    partOne: [],
    partTwo: []
  }

  for (const row of input) {

    // parse row to get separate parts (example row: 6-8 w: wpwwhxnv)
    const [occurence, letter, password] = row.replace('\r', '').replace(':', '').split(' ');
    const [x, y] = occurence.split('-');

    // first part of assignment
    // check if number of occurences of specific letter is between min and max as specified in input
    const noOfOccurences = countCharsInString(password, letter);

    if (noOfOccurences >= x && noOfOccurences <= y) {
      validPasswords.partOne.push(row);
    }

    // second part of assignment
    // check if position x or y contains the letter (using XOR)
    if ((password[x - 1] === letter && password[y - 1] !== letter) || (password[x - 1] !== letter && password[y - 1] === letter)) {
      validPasswords.partTwo.push(row);
    }
  }

  return validPasswords
}

const result = getValidPasswords(input)
console.log(result.partOne.length); // 469
console.log(result.partTwo.length); // 267
