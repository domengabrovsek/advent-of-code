const Day12 = require('../index');

describe('tests for day 12 challenge', () => {


  // 3386, 3618, 13708 is too low

  describe('main tests', () => {
    const testCases = [
      { file: 'input.txt', expectedResult1: 938, expectedResult2: 54404 },
      { file: 'test-min.txt', expectedResult1: 25, expectedResult2: 286 }
    ]

    testCases.forEach(tc => {
      test(`input: ${tc.file}`, () => {

        // arrange
        const inputFile = `${__dirname}/${tc.file}`;

        // act
        const part1 = new Day12(inputFile, 1);
        const part2 = new Day12(inputFile, 2);

        part1.navigate();
        part2.navigate();

        const result1 = part1.getManhattanDistance();
        const result2 = part2.getManhattanDistance();

        // assert
        expect(result1).toBe(tc.expectedResult1);
        expect(result2).toBe(tc.expectedResult2);
      })
    })
  });

});