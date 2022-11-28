
const { expect } = require('chai');

const { matchesCriteria, countNumberOfMatches, countAdjacentOccurences } = require('../day-4/index')

describe('day-4 tests', () => {

  let testCases = [
    { number: 123456, part: 1, expectedResult: false },
    { number: 123436, part: 1, expectedResult: false },
    { number: 113456, part: 1, expectedResult: true },
    { number: 122456, part: 1, expectedResult: true },
    { number: 123356, part: 1, expectedResult: true },
    { number: 123446, part: 1, expectedResult: true },
    { number: 123455, part: 1, expectedResult: true },
    { number: 111111, part: 1, expectedResult: true },
    { number: 223450, part: 1, expectedResult: false },
    { number: 123789, part: 1, expectedResult: false },
    { number: 12345, part: 1, expectedResult: false },

    { number: 112233, part: 2, expectedResult: true },
    { number: 123444, part: 2, expectedResult: false },
    { number: 124444, part: 2, expectedResult: false },
    { number: 122444, part: 2, expectedResult: true },
    { number: 111122, part: 2, expectedResult: true },
    { number: 111112, part: 2, expectedResult: false },
    { number: 113456, part: 2, expectedResult: true },
    { number: 122456, part: 2, expectedResult: true },
    { number: 123356, part: 2, expectedResult: true },
    { number: 123446, part: 2, expectedResult: true },
    { number: 123455, part: 2, expectedResult: true }
  ]

  testCases.forEach(tc => {
    it(`number ${tc.number} matches criteria - ${tc.expectedResult}`, () => {
      const result = matchesCriteria(tc.number, tc.part === 2)

      expect(result).to.be.equal(tc.expectedResult)
    })
  });

  testCases = [
    { number: 111456, digit: 1, expectedResult: 3 },
    { number: 112345, digit: 1, expectedResult: 2 },
    { number: 111111, digit: 1, expectedResult: 6 },
    { number: 222222, digit: 1, expectedResult: 0 }
  ]

  testCases.forEach(tc => {
    it(`digit ${tc.digit} occurs ${tc.expectedResult} times in ${tc.number}`, () => {
      const result = countAdjacentOccurences(tc.number, tc.digit)

      expect(result).to.be.equal(tc.expectedResult)
    })
  });


  testCases = [
    { min: 134792, max: 675810, part: 1, expectedResult: 1955 },
    { min: 134792, max: 675810, part: 2, expectedResult: 1319 }
  ]

  testCases.forEach(tc => {
    it(`${tc.expectedResult} numbers matches criteria`, () => {
      const result = countNumberOfMatches(tc.min, tc.max, tc.part === 2)

      expect(result).to.be.equal(tc.expectedResult)
    })
  });
})
