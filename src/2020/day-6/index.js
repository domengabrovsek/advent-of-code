//  6490 < 5 < 23640 

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' }).split('\n').map(x => x.replace('\r', ''));

const partOne = (input) => {
  const groups = [];
  let currentGroup = new Set();
  for (const [index, row] of input.entries()) {
    const answers = row.split('');
    for (const answer of answers) {
      currentGroup.add(answer);
    }

    if (row === '' || index === input.length - 1) {
      groups.push(Array.from(currentGroup));
      currentGroup = new Set();
    }
  }

  return groups.reduce((sum, group) => (sum + group.length), 0);
}

const partTwo = (input) => {

  let groups = [];
  let currentGroup = [];

  for (const [index, row] of input.entries()) {

    currentGroup.push(row.split('').sort().join(''));

    if (row === '' || index === input.length - 1) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }

  groups = groups.map(group => group.filter(row => row !== ''));

  // we have groups

  const isLetterInAllRows = (rows, letter) => rows.every(row => row.includes(letter));
  const groupsEveryoneYes = [];

  for (let group of groups) {
    const lettersToCheck = group[0];
    for (let letter of lettersToCheck) {
      if (isLetterInAllRows(group, letter)) {
        groupsEveryoneYes.push(letter);
      }
    }
  }

  return groupsEveryoneYes.length;

}

// part one
const resultOne = partOne(input);
console.log(resultOne)

// part two
const resultTwo = partTwo(input);
console.log(resultTwo)