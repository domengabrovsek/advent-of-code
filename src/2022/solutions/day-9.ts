/* This file contains solution for AoC puzzle day 9 */

import { getYear, getDay, getInput } from '../../utils/utils';

interface Point {
  x: number,
  y: number
}

const visualize = (points: Point[]) => {

  let gridSize = 20;
  let grid: string[][] = [];

  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = '.'
    }
  }

  grid[gridSize / 2][gridSize / 2] = 'S';

  for (let i = points.length - 1; i >= 0; i--) {
    const point = points[i];

    grid[point.y][point.x] = i === 0 ? 'H' : String(i);
  }

  console.table(grid);
}

const visualizeVisited = (points: Point[]) => {
  let gridSize = 20000;
  let grid: string[][] = [];

  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = '.'
    }
  }

  for (const point of points) {
    grid[point.y][point.x] = '#';
  }

  grid[gridSize / 2][gridSize / 2] = 'S';
  console.table(grid);
}

const step = (prev: Point, curr: Point) => {

  // ------------------------------------------------------ //

  // 2 to the right
  if (prev.x === curr.x + 2 && prev.y === curr.y) {
    curr.x++;
  }

  // 2 to the left
  else if (prev.x === curr.x - 2 && prev.y === curr.y) {
    curr.x--;
  }

  // 2 to the top
  else if (prev.y === curr.y + 2 && prev.x === curr.x) {
    curr.y++;
  }

  // 2 to the bottom
  else if (prev.y === curr.y - 2 && prev.x === curr.x) {
    curr.y--;
  }

  // ------------------------------------------------------ //

  // 2 diagonally left down

  /*
      T
    H
  */

  else if (prev.x === curr.x - 1 && prev.y === curr.y + 2) {
    curr.y++;
    curr.x--;
  }

  else if (prev.x === curr.x - 2 && prev.y === curr.y + 1) {
    curr.y++;
    curr.x--;
  }

  else if (prev.x === curr.x - 2 && prev.y === curr.y + 2) {
    curr.y++;
    curr.x--;
  }


  // ------------------------------------------------------ //

  // 2 diagonally left up

  /*
    H
      T
  */

  else if (prev.x === curr.x - 1 && prev.y === curr.y - 2) {
    curr.y--;
    curr.x--;
  }

  else if (prev.x === curr.x - 2 && prev.y === curr.y - 1) {
    curr.y--;
    curr.x--;
  }

  else if (prev.x === curr.x - 2 && prev.y === curr.y - 2) {
    curr.y--;
    curr.x--;
  }

  // ------------------------------------------------------ //

  // 2 diagonally right down

  /*
    T
      H
  */

  else if (prev.x === curr.x + 1 && prev.y === curr.y + 2) {
    curr.x++;
    curr.y++;
  }

  else if (prev.x === curr.x + 2 && prev.y === curr.y + 1) {
    curr.x++;
    curr.y++;
  }

  else if (prev.x === curr.x + 2 && prev.y === curr.y + 2) {
    curr.x++;
    curr.y++;
  }

  // ------------------------------------------------------ //

  // 2 diagonally right up

  /*
      H
    T 
  */

  else if (prev.x === curr.x + 1 && prev.y === curr.y - 2) {
    curr.x++;
    curr.y--;
  }

  else if (prev.x === curr.x + 2 && prev.y === curr.y - 1) {
    curr.x++;
    curr.y--;
  }

  // part 2
  else if (prev.x === curr.x + 2 && prev.y === curr.y - 2) {
    curr.x++;
    curr.y--;
  }

  // ------------------------------------------------------ //

  return { x: curr.x, y: curr.y };
}

const stepHead = (head: Point, direction: string) => {
  switch (direction) {
    case 'L': {
      head.x--;
      break;
    }
    case 'R': {
      head.x++;
      break;
    }
    case 'U': {
      head.y--;
      break;
    }
    case 'D': {
      head.y++;
      break;
    }
    default:
      break;
  }
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const moves = input.split('\n');
  const visitedPositions: Point[] = [];

  let head: Point = { x: 10000, y: 10000 };
  let tail: Point = { x: 10000, y: 10000 };

  for (const move of moves) {
    const [direction, length] = move.split(' ');

    for (let i = 0; i < parseInt(length); i++) {

      // move head
      stepHead(head, direction);

      // move tails
      visitedPositions.push(step(head, tail));
    }
  }

  const unique = new Set(visitedPositions.map(position => `${position.x}${position.y}`));
  return unique.size;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const moves = input.split('\n');
  const visitedPositions: Point[] = [];

  let head: Point = { x: 10000, y: 10000 };
  let knot1: Point = { x: 10000, y: 10000 };
  let knot2: Point = { x: 10000, y: 10000 };
  let knot3: Point = { x: 10000, y: 10000 };
  let knot4: Point = { x: 10000, y: 10000 };
  let knot5: Point = { x: 10000, y: 10000 };
  let knot6: Point = { x: 10000, y: 10000 };
  let knot7: Point = { x: 10000, y: 10000 };
  let knot8: Point = { x: 10000, y: 10000 };
  let knot9: Point = { x: 10000, y: 10000 };

  for (const move of moves) {

    const [direction, length] = move.split(' ');

    for (let i = 0; i < parseInt(length); i++) {

      // move head
      stepHead(head, direction);

      // move all knots
      step(head, knot1);
      step(knot1, knot2);
      step(knot2, knot3);
      step(knot3, knot4);
      step(knot4, knot5);
      step(knot5, knot6);
      step(knot6, knot7);
      step(knot7, knot8);
      visitedPositions.push(step(knot8, knot9));
    }
  }

  const unique = new Set(visitedPositions.map(position => `${position.x}${position.y}`));
  return unique.size;
}
