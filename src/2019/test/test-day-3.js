
const path = require('path');
const { expect } = require('chai');
const {
  calculateIntersectionPoints,
  calculateDistanceFromCenter,
  calculateClosestIntersectionDistance,
  calculateLines,
  findLinesOfIntersection,
  findDistanceToClosestIntersectionBySteps,
  calculatePointDistance
} = require('../day-3/index');

const { readFile } = require('../helpers/helpers');
const input = readFile(path.join(__dirname, '../', 'day-3', 'input.txt')).map(line => line.split(','));

describe('day-3 tests', () => {

  describe('calculate all intersections on wires', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]],
        expectedResult: [{ x: 3, y: 3 }, { x: 6, y: 5 }]
      }
    ]

    testCases.forEach(tc => {
      it(`calculate intersections between ${tc.input[0]} and ${tc.input[1]}`, () => {

        const result = calculateIntersectionPoints(tc.input);

        expect(result).to.deep.have.same.members(tc.expectedResult);

      })
    })
  })

  describe('calculate distance between points', () => {

    const testCases = [
      { a: { x: 1, y: 1 }, b: { x: 1, y: 1 }, expectedResult: 0 },
      { a: { x: 0, y: 0 }, b: { x: 8, y: 0 }, expectedResult: 8 },
      { a: { x: 8, y: 5 }, b: { x: 6, y: 5 }, expectedResult: 2 },
      { a: { x: 6, y: 5 }, b: { x: 8, y: 5 }, expectedResult: 2 },
      { a: { x: 3, y: 3 }, b: { x: 6, y: 3 }, expectedResult: 3 },
    ]

    testCases.forEach(tc => {
      it(`distance`, () => {
        const result = calculatePointDistance(tc.a, tc.b);

        expect(result).to.be.equal(tc.expectedResult)
      })
    })

  })

  describe('calculate distance from center', () => {

    const testCases = [
      { input: { x: 1, y: 1 }, expectedResult: 2 },
      { input: { x: 5, y: 3 }, expectedResult: 8 },
      { input: { x: -5, y: 2 }, expectedResult: 7 },
      { input: { x: 0, y: 0 }, expectedResult: 0 },
      { input: { x: -9, y: -11 }, expectedResult: 20 }
    ]

    testCases.forEach(tc => {
      it(`distance between center and (${tc.input.x}, ${tc.input.y}) should be ${tc.expectedResult}`, () => {
        const result = calculateDistanceFromCenter(tc.input);

        expect(result).to.be.equal(tc.expectedResult)
      })
    })

  })

  describe('calculate manhattan distance from center to closest intersection', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]],
        expectedResult: 6
      },
      {
        input: [
          ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
          ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
        ],
        expectedResult: 159
      },
      {
        input: [
          ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"],
          ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
        ],
        expectedResult: 135
      },
      {
        input: input,
        expectedResult: 266
      }
    ]

    testCases.forEach(tc => {
      it(`first wire: ${tc.input[0]}, second wire: ${tc.input[1]}, distance: ${tc.expectedResult}`, () => {

        const intersections = calculateIntersectionPoints(tc.input);
        const result = calculateClosestIntersectionDistance(intersections);

        expect(result).to.be.equal(tc.expectedResult);

      })
    })
  })

  describe('calculate all lines on wire', () => {
    const testCases = [
      {
        input: ["R8", "U5", "L5", "D3"], expectedResult: [
          { x1: 0, y1: 0, x2: 8, y2: 0 },
          { x1: 8, y1: 0, x2: 8, y2: 5 },
          { x1: 8, y1: 5, x2: 3, y2: 5 },
          { x1: 3, y1: 5, x2: 3, y2: 2 }
        ]
      },
      {
        input: ["U7", "R6", "D4", "L4"], expectedResult: [
          { x1: 0, y1: 0, x2: 0, y2: 7 },
          { x1: 0, y1: 7, x2: 6, y2: 7 },
          { x1: 6, y1: 7, x2: 6, y2: 3 },
          { x1: 6, y1: 3, x2: 2, y2: 3 }
        ]
      }
    ]

    testCases.forEach(tc => {
      it(`wire: ${tc.input}`, () => {

        const result = calculateLines(tc.input);
        expect(result).to.be.deep.equal(tc.expectedResult)

      })
    })
  })

  describe('find line of intersection', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]], point: { x: 3, y: 3 },
        expectedResult: [{ x1: 3, y1: 5, x2: 3, y2: 2 }, { x1: 6, y1: 3, x2: 2, y2: 3 }]
      }
    ]

    testCases.forEach(tc => {
      const { x, y } = tc.point;

      it(`point ${x, y} is on lines: TODO} `, () => {
        const result = findLinesOfIntersection(tc.input, tc.point)
        expect(result.map(x => x.line)).to.deep.have.members(tc.expectedResult)
      })
    })
  })

  describe('findDistanceToClosestIntersectionBySteps', () => {

    const testCases = [
      {
        input: [["R8", "U5", "L5", "D3"], ["U7", "R6", "D4", "L4"]],
        expectedResult: 30
      },
      {
        input: [["R8", "U5", "L5", "D3", "R2", "U1", "L5"], ["U7", "R6", "D4", "L4"]],
        expectedResult: 30
      },
      {
        input: [
          ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
          ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
        ],
        expectedResult: 610
      },
      {
        input: [
          ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"],
          ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
        ],
        expectedResult: 410
      },
      {
        input: input,
        expectedResult: 19242 // 19686 is too high, 532 too low, 19242 is correct
      }
    ]

    testCases.forEach(tc => {
      it(`closest intersection should have distance: ${tc.expectedResult}`, () => {
        const result = findDistanceToClosestIntersectionBySteps(tc.input);
        expect(result).to.be.equal(tc.expectedResult);
      })
    })
  })
});