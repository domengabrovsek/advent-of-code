const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' }).split('\n').map(x => x.replace('\r', '').replace(/B|R/g, 1).replace(/F|L/g, 0));
const decode = (line) => ({ row: parseInt(line.slice(0, 7), 2), column: parseInt(line.slice(7, 10), 2) });
const seats = input.map(line => decode(line).row * 8 + decode(line).column).sort((a, b) => a - b);
const highestSeatId = Math.max(...seats);
const findMySeat = (seats) => {

  let start = seats[0];

  for (const seat of seats) {
    if (seat !== start) {
      return start;
    }
    start += 1;
  }

  return 0;
}

// part 1
console.log(highestSeatId);

// part 2
console.log(findMySeat(seats));