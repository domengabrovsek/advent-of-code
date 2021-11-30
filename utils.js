const fs = require('fs');

export const readFile = (file) =>
  fs.readFileSync(file, { encoding: 'utf8' })
    .split('\n')
    .map(row => row.replace('\r', ''));

export const sumItemsInArray = (array) => array.reduce((sum, item) => sum + item, 0);

export const multiplyItemsInArray = (array) => array.reduce((product, item) => product * item, 1);

export const countCharsInString = (string, char) => string.split('').filter(x => x === char).length;

