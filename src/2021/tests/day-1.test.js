const { expect } = require('@jest/globals');
const Day1 = require('../index');

describe('tests for day 1 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 1502, expectedResult2: 1538 },
    { file: 'input-test.txt', expectedResult1: 7, expectedResult2: 5 },
  ];

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const day1 = new Day1(inputFile);
      const result1 = day1.countNumberOfIncreasedMeasurements(1);
      const result2 = day1.countNumberOfIncreasedMeasurements(2);

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    });
  });
});
