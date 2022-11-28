const Day13 = require('../index');

describe('tests for day 13 challenge', () => {

  const testCases = [
    { file: 'input.txt', expectedResult1: 2165, expectedResult2: 534035653563227 },
    { file: 'test-min.txt', expectedResult1: 295, expectedResult2: 1068781 },
    { file: 'test-1.txt', expectedResult1: 156, expectedResult2: 3417 },
    { file: 'test-2.txt', expectedResult1: 42, expectedResult2: 754018 },
    { file: 'test-3.txt', expectedResult1: 42, expectedResult2: 779210 },
    { file: 'test-4.txt', expectedResult1: 42, expectedResult2: 1261476 },
    { file: 'test-5.txt', expectedResult1: 1332, expectedResult2: 1202161486 }
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const part1 = new Day13(inputFile);

      const result1 = part1.getFirstAvailableBus();
      const result2 = part1.getEarliestTimeStamp();

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});