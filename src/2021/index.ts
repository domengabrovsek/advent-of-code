 /* This file is autogenerated */
import * as Day1 from './solutions/day-1';
import * as Day2 from './solutions/day-2';
import * as Day3 from './solutions/day-3';
import * as Day4 from './solutions/day-4';
import * as Day5 from './solutions/day-5';
import * as Day6 from './solutions/day-6';
import * as Day7 from './solutions/day-7';
import * as Day8 from './solutions/day-8';
import * as Day9 from './solutions/day-9';
import * as Day10 from './solutions/day-10';
import * as Day11 from './solutions/day-11';
import * as Day12 from './solutions/day-12';
import * as Day13 from './solutions/day-13';
import * as Day14 from './solutions/day-14';
import * as Day15 from './solutions/day-15';
import * as Day16 from './solutions/day-16';
import * as Day17 from './solutions/day-17';
import * as Day18 from './solutions/day-18';
import * as Day19 from './solutions/day-19';
import * as Day20 from './solutions/day-20';
import * as Day21 from './solutions/day-21';
import * as Day22 from './solutions/day-22';
import * as Day23 from './solutions/day-23';
import * as Day24 from './solutions/day-24';
import * as Day25 from './solutions/day-25';

const dict: any = {
  1: Day1,
  2: Day2,
  3: Day3,
  4: Day4,
  5: Day5,
  6: Day6,
  7: Day7,
  8: Day8,
  9: Day9,
  10: Day10,
  11: Day11,
  12: Day12,
  13: Day13,
  14: Day14,
  15: Day15,
  16: Day16,
  17: Day17,
  18: Day18,
  19: Day19,
  20: Day20,
  21: Day21,
  22: Day22,
  23: Day23,
  24: Day24,
  25: Day25
};

// read day from CLI argument
const day = Number(process.argv[2]);

// day has to be a number between 1 and 25
if (!day || day < 1 || day > 25) {
  console.log('Please provide a valid day (1-25)');
  console.log('Example usage: npm run 2018 1');
  process.exit(1);
}

(async () => {
  const resultOne = await dict[day].solveOne();
  const resultTwo = await dict[day].solveTwo();

  console.log(`Results for day ${day}:`);
  console.log(`Part 1: '${resultOne}'`);
  console.log(`Part 2: '${resultTwo}'`);
})();
