const Day11 = require('../index');

describe('tests for day 11 challenge', () => {

  test(`simulate 1 time`, () => {

    // arrange
    const inputFile = `${__dirname}/input-1.txt`;
    const outputFile = `${__dirname}/after-1-step.txt`;

    // act
    const day11 = new Day11(inputFile);

    day11.simulateOnce();

    const output = day11.constructGrid(day11.readInput(outputFile));

    // assert
    expect(JSON.stringify(day11.grid)).toBe(JSON.stringify(output));
  })

  test(`simulate 2 times`, () => {

    // arrange
    const inputFile = `${__dirname}/input-1.txt`;
    const outputFile = `${__dirname}/after-2-step.txt`;

    // act
    const day11 = new Day11(inputFile);

    day11.simulateOnce();
    day11.simulateOnce();

    const output = day11.constructGrid(day11.readInput(outputFile));

    // assert
    expect(JSON.stringify(day11.grid)).toBe(JSON.stringify(output));
  })

  test(`simulate 3 times`, () => {

    // arrange
    const inputFile = `${__dirname}/input-1.txt`;
    const outputFile = `${__dirname}/after-3-step.txt`;

    // act
    const day11 = new Day11(inputFile);
    const output = day11.constructGrid(day11.readInput(outputFile));

    day11.simulateOnce();
    day11.simulateOnce();
    day11.simulateOnce();

    // assert
    expect(JSON.stringify(day11.grid)).toBe(JSON.stringify(output));
  })

  test(`part 2 diagonal test 1`, () => {

    // arrange
    const inputFile = `${__dirname}/part2-diagonal-1.txt`;
    const sit = { rowIndex: 4, colIndex: 3 }

    // act
    const day11 = new Day11(inputFile);
    const result = day11.numberOfVisibleSitsOccupied(sit);

    // assert
    expect(result).toBe(8);
  })

  test(`part 2 diagonal test 1`, () => {

    // arrange
    const inputFile = `${__dirname}/part2-diagonal-2.txt`;
    const sit = { rowIndex: 3, colIndex: 3 }

    // act
    const day11 = new Day11(inputFile);
    const result = day11.numberOfVisibleSitsOccupied(sit);

    // assert
    expect(result).toBe(0);
  })

  const testCases = [
    { file: 'input.txt', expectedResult1: 2263, expectedResult2: 2002 },
    { file: 'input-1.txt', expectedResult1: 37, expectedResult2: 26 },
  ]

  testCases.forEach(tc => {
    test(`input: ${tc.file}`, () => {

      // arrange
      const inputFile = `${__dirname}/${tc.file}`;

      // act
      const part1 = new Day11(inputFile);
      const part2 = new Day11(inputFile);

      part1.simulate(1);
      part2.simulate(2);

      const result1 = part1.countOccupiedSits();
      const result2 = part2.countOccupiedSits();

      // assert
      expect(result1).toBe(tc.expectedResult1);
      expect(result2).toBe(tc.expectedResult2);
    })
  })
});