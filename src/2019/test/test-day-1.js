const path = require('path');
const { expect } = require('chai');

const { calculateFuel, sumCalculatedValues, calculateFuelForFuel } = require('../day-1/index');
const { readFile } = require('../helpers/helpers');
const input = readFile(path.join(__dirname, '../', 'day-1', 'input.txt'));

describe('day-1 tests', () => {

  describe('calculate fuel from mass', () => {
    const testCases = [
      { mass: 12, fuel: 2 },
      { mass: 14, fuel: 2 },
      { mass: 1969, fuel: 654 },
      { mass: 100756, fuel: 33583 }
    ]

    testCases.forEach(tc => {
      it(`for mass ${tc.mass} fuel should be ${tc.fuel}`, () => {
        const result = calculateFuel(tc.mass)
        expect(result).to.be.equal(tc.fuel);
      })
    });
  })

  describe('calculate fuel for fuel from mass', () => {
    const testCases = [
      { mass: 14, fuel: 2 },
      { mass: 1969, fuel: 966 },
      { mass: 100756, fuel: 50346 }
    ]

    testCases.forEach(tc => {
      it(`for mass ${tc.mass} fuel should be ${tc.fuel}`, () => {
        const result = calculateFuelForFuel(tc.mass)
        expect(result).to.be.equal(tc.fuel);
      })
    });
  })

  describe('sum values', () => {
    const testCases = [
      { input: [12, 14], func: calculateFuel, expectedResult: 4 },
      { input: [1969, 1969], func: calculateFuel, expectedResult: 1308 },
      { input: input, func: calculateFuel, expectedResult: 3464735 }, // part 1
      { input: input, func: calculateFuelForFuel, expectedResult: 5194211 } // part 2
    ]

    testCases.forEach(tc => {
      it(`sum of ${tc.input} is ${tc.expectedResult}`, () => {
        const result = sumCalculatedValues(tc.input, tc.func);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  })
});