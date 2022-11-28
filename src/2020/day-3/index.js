const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' }).split('\n').map(row => row.replace('\r', ''));

const prepareTable = (input) => {

  let table = [];

  input.forEach((row, index) => {
    table[index] = [];
    row.split('').forEach(char => table[index].push(char));
  })

  return table;
};

const getPathCoordinates = (table, rows, columns) => {
  let coordinates = [];

  let j = 0;
  for (let i = 0; i < table.length; i += rows) {
    coordinates.push({ i, j, tree: table[i][j] === '#' })
    j += 1;

    if (i === table.length - 1) {
      break;
    }

    for (let rs = 0; rs < columns; rs++) {
      if (j === 31) {
        j = 0;
      }

      if (rs !== columns - 1 && columns !== 1) {
        j += 1;
      }
    }
  }

  return coordinates;
}

const table = prepareTable(input);

// test

let inputs = [
  {
    rows: 1, columns: 1
  },
  {
    rows: 1, columns: 3
  },
  {
    rows: 1, columns: 5
  }
  , {
    rows: 1, columns: 7
  },
  {
    rows: 2, columns: 1
  }
]

let result = 1;

inputs.forEach(input => {
  const coordinates = getPathCoordinates(table, input.rows, input.columns);
  const encounteredTrees = coordinates.filter(c => table[c.i][c.j] === '#').length;
  result *= encounteredTrees;
  console.log(`Input: ${input.rows}, ${input.columns}, encountered tress: ${encounteredTrees}`);
})

console.log(`Result: ${result}`)