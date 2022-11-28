const { readFileSync } = require('fs');

const readFile = (file) =>
  readFileSync(file, { encoding: 'utf8' })
    .split('\n')
    .map(row => row.replace('\r', ''));

const readFileAndSplitByComma = (file) => readFileSync(file, { encoding: 'utf8' }).split(',');

const mapToInteger = (array) => array.map(x => parseInt(x));

const deepCopy = (obj) => obj && JSON.parse(JSON.stringify(obj));

module.exports = {
  readFile,
  readFileAndSplitByComma,
  mapToInteger,
  deepCopy
}