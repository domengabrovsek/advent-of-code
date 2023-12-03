import { describe, it, expect } from 'vitest';
import { getNeighbours, initGrid } from '../../src/utils/grid';

function comparePositions(a, b) {
  return a.y === b.y ? a.x - b.x : a.y - b.y;
}

describe('getNeighbours function', () => {
  const gridInput =
    `467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`;

  const testGrid = initGrid(gridInput);

  it('gets correct neighbours in the middle of the grid', () => {
    const neighbours = getNeighbours({ x: 5, y: 5 }, testGrid); // Central position
    expect(neighbours).toEqual([
      { x: 4, y: 5 }, { x: 6, y: 5 }, // Left, Right
      { x: 5, y: 4 }, { x: 5, y: 6 }, // Top, Bottom
      { x: 4, y: 4 }, { x: 6, y: 4 }, // Top Left, Top Right
      { x: 4, y: 6 }, { x: 6, y: 6 }  // Bottom Left, Bottom Right
    ]);
  });

  it('gets correct neighbours at the top-left corner', () => {
    const neighbours = getNeighbours({ x: 0, y: 0 }, testGrid);
    expect(neighbours).toEqual([
      { x: 1, y: 0 }, { x: 0, y: 1 }, // Right, Bottom
      { x: 1, y: 1 }  // Bottom Right
    ]);
  });

  it('gets correct neighbours at the bottom-right corner', () => {
    const neighbours = getNeighbours({ x: 9, y: 9 }, testGrid);
    expect(neighbours).toEqual([
      { x: 8, y: 9 }, { x: 9, y: 8 }, // Left, Top
      { x: 8, y: 8 }  // Top Left
    ]);
  });

  it('gets correct neighbours at the top-right corner', () => {
    const neighbours = getNeighbours({ x: 9, y: 0 }, testGrid);
    expect(neighbours).toEqual([
      { x: 8, y: 0 }, // Left
      { x: 9, y: 1 }, // Bottom
      { x: 8, y: 1 }  // Bottom Left
    ]);
  });

  it('gets correct neighbours at the bottom-left corner', () => {
    const neighbours = getNeighbours({ x: 0, y: 9 }, testGrid);
    const expectedNeighbours = [
      { x: 0, y: 8 }, // Top
      { x: 1, y: 9 }, // Right
      { x: 1, y: 8 }  // Top Right
    ];

    expect(neighbours.sort(comparePositions)).toEqual(expectedNeighbours.sort(comparePositions));
  });

  it('gets correct neighbours on the right border', () => {
    const neighbours = getNeighbours({ x: 9, y: 5 }, testGrid);
    expect(neighbours).toEqual([
      { x: 8, y: 5 }, // Left
      { x: 9, y: 4 }, { x: 9, y: 6 }, // Top, Bottom
      { x: 8, y: 4 }, { x: 8, y: 6 }  // Top Left, Bottom Left
    ]);
  });

  it('gets correct neighbours on the top border', () => {
    const neighbours = getNeighbours({ x: 5, y: 0 }, testGrid);
    expect(neighbours).toEqual([
      { x: 4, y: 0 }, { x: 6, y: 0 }, // Left, Right
      { x: 5, y: 1 }, // Bottom
      { x: 4, y: 1 }, { x: 6, y: 1 }  // Bottom Left, Bottom Right
    ]);
  });
});
