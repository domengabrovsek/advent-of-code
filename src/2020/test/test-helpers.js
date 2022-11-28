'use strict';

const { expect } = require('chai');
const { countCharsInString, sumItemsInArray, multiplyItemsInArray } = require('../helpers');
const { switchCommand } = require('../day-8/index');
const { getNumberCandidates } = require('../day-9/index');

describe('tests for helper functions', () => {

  describe('tests for multiplyItemsInArray()', () => {
    const testCases = [
      { array: [1], expectedResult: 1 },
      { array: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0], expectedResult: 0 },
      { array: [1, 2, 3, 4], expectedResult: 24 },
      { array: [1, -2, 3, 4], expectedResult: -24 },
      { array: [1, 2, 12312, 4], expectedResult: 98496 },
      { array: [1, 2, 3, 442142], expectedResult: 2652852 },
      { array: [1, 2, 3, -2, 0], expectedResult: 0 },
    ]

    testCases.forEach(tc => {
      it(`array: ${tc.array} ,expected result: ${tc.expectedResult} `, () => {
        const result = multiplyItemsInArray(tc.array);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  })

  describe('tests for sumItemsInArray()', () => {
    const testCases = [
      { array: [1], expectedResult: 1 },
      { array: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0], expectedResult: 6 },
      { array: [1, 2, 3, 4], expectedResult: 10 },
      { array: [1, 2, 3, 4], expectedResult: 10 },
      { array: [1, -2, 3, 4], expectedResult: 6 },
      { array: [1, 2, 12312, 4], expectedResult: 12319 },
      { array: [1, 2, 3, 442142], expectedResult: 442148 },
    ]

    testCases.forEach(tc => {
      it(`array: ${tc.array} ,expected result: ${tc.expectedResult} `, () => {
        const result = sumItemsInArray(tc.array);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  })

  describe('tests for countCharsInString() ', () => {

    const testCases = [
      { string: "", char: "a", expectedResult: 0 },
      { string: "a", char: "a", expectedResult: 1 },
      { string: "aa", char: "a", expectedResult: 2 },
      { string: "aa", char: "b", expectedResult: 0 },
      { string: "aasbdaisdbasiudbasida", char: "a", expectedResult: 6 },
      { string: "12312asfa1212gdsdgfh", char: "a", expectedResult: 2 },
    ]

    testCases.forEach(tc => {
      it(`string: ${tc.string} char: ${tc.char}, expected result: ${tc.expectedResult} `, () => {
        const result = countCharsInString(tc.string, tc.char);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  })

  describe('tests for switchCommand() - day 8', () => {

    const testCases = [
      { command: "jmp +123", expectedResult: "nop +123" },
      { command: "jmp -123", expectedResult: "nop -123" },
      { command: "nop +123", expectedResult: "jmp +123" },
      { command: "nop -123", expectedResult: "jmp -123" }
    ]

    testCases.forEach(tc => {
      it(`command: ${tc.command}, expected result: ${tc.expectedResult} `, () => {
        const result = switchCommand(tc.command);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  });

  describe('tests for getNumberCandidates() - day 9', () => {

    const testCases = [
      { numbers: [0], expectedResult: [0] },
      { numbers: [0, 1], expectedResult: [1] },
      { numbers: [0, 1, 2], expectedResult: [1, 2, 3] },
      { numbers: [0, 1, 2, 3], expectedResult: [1, 2, 3, 4, 5] },
      { numbers: [0, 1, 2, 3, 4], expectedResult: [1, 2, 3, 4, 5, 6, 7] },
      { numbers: [0, 1, 2, 3, 4, 5], expectedResult: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { numbers: [0, 1, 2, 3, 4, 5, 6], expectedResult: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
    ]

    testCases.forEach(tc => {
      it(`numbers: ${tc.numbers}, expected result: ${tc.expectedResult} `, () => {
        const result = getNumberCandidates(tc.numbers);
        expect(result).to.have.same.members(tc.expectedResult);
      })
    })
  });

});