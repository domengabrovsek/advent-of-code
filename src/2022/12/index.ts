/* This file contains solution for AoC puzzle day 12 */

const BFS = (grid: number[][], end: [number, number], ...start: [number, number][]) => {
  const queue = start.map(start => ({ coordinate: start, cost: 0 }))
  const visited = new Map<number, Set<number>>()

  while (queue[0].coordinate[0] !== end[0] || queue[0].coordinate[1] !== end[1]) {
    const { coordinate: [x, y], cost } = queue.shift();

    if (visited.get(x)?.has(y)) {
      continue;
    }

    if (!visited.has(x)) {
      visited.set(x, new Set());
    }

    visited.get(x).add(y);

    const adjacents = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];

    for (const adjacent of adjacents) {
      if (!(adjacent[0] < 0 || adjacent[0] >= grid.length || adjacent[1] < 0 || adjacent[1] >= grid[0].length || grid[adjacent[0]][adjacent[1]] > grid[x][y] + 1)) {
        queue.push({ coordinate: [adjacent[0], adjacent[1]], cost: cost + 1 })
      }
    }
  }

  return queue.shift().cost;
}

const initGrid = (input: string) => {
  const rows = input.split('\n');
  let grid: number[][] = [];
  let start: [number, number];
  let end: [number, number];

  for (let i = 0; i < rows.length; i++) {
    grid[i] = [];
    for (let j = 0; j < rows[0].length; j++) {

      const char = rows[i][j];

      if (char === 'S') {
        start = [i, j];
        grid[i][j] = 1
      } else if (char === 'E') {
        end = [i, j];
        grid[i][j] = 26
      } else {
        grid[i][j] = char.charCodeAt(0) - 96;
      }
    }
  }

  return { grid, start, end };
}


export const solveOne = (input: string) => {

  const { grid, start, end } = initGrid(input);
  const result = BFS(grid, end, start);

  return result;
}

export const solveTwo = (input: string) => {

  const { grid, start, end } = initGrid(input);

  const starts: [number, number][] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        starts.push([i, j]);
      }
    }
  }

  const result = BFS(grid, end, ...starts);

  return result;
}