/* This file contains solution for AoC puzzle day 8 */

const transpose = (matrix: any) => {
  return matrix[0].map((col: any, i: any) => matrix.map((row: any) => row[i]));
}

const isOnEdge = (x: number, y: number, gridSize: number) => {
  return x === 0 || x === gridSize - 1 || y === 0 || y === gridSize - 1;
}

const visibleFromLeft = (y: number, row: string[]) => {

  let isHighest = true;
  const current = row[y];

  for (let i = y - 1; i >= 0; i--) {
    const next = row[i];
    if (next >= current) {
      isHighest = false;
    }
  }

  return isHighest;
}

const visibleFromRight = (y: number, row: string[]) => {

  let isHighest = true;
  const current = row[y];

  for (let i = y + 1; i < row.length; i++) {
    const next = row[i];
    if (next >= current) {
      isHighest = false;
    }
  }

  return isHighest;
}

const visibleFromTop = (y: number, row: string[]) => {

  let isHighest = true;
  const current = row[y];

  for (let i = y - 1; i >= 0; i--) {
    const next = row[i];

    if (next >= current) {
      isHighest = false;
    }
  }

  return isHighest;
}

const visibleFromBottom = (y: number, row: string[]) => {

  let isHighest = true;
  const current = row[y];

  for (let i = y + 1; i < row.length; i++) {
    const next = row[i];

    if (next >= current) {
      isHighest = false;
    }
  }

  return isHighest;
}

const isVisible = (x: number, y: number, grid: string[][], transposedGrid: string[][]) => {

  // all trees on edges are visible
  if (isOnEdge(x, y, grid.length)) {
    // console.log(`is on the edge:  [${x}, ${y}] ${grid[x][y]}`);
    return true;
  }

  // check rows
  if (visibleFromLeft(y, grid[x])) {
    // console.log(`visible from left:  [${x}, ${y}] ${grid[x][y]}`);
    return true;
  }

  if (visibleFromRight(y, grid[x])) {
    // console.log(`visible from right:  [${x}, ${y}] ${grid[x][y]}`);
    return true;
  }

  // check columns
  if (visibleFromTop(x, transposedGrid[y])) {
    // console.log(`visible from top:  [${x}, ${y}] ${transposedGrid[y][x]}`);
    return true;
  }

  if (visibleFromBottom(x, transposedGrid[y])) {
    // console.log(`visible from bottom:  [${x}, ${y}] ${transposedGrid[y][x]}`);
    return true;
  }

  return false;
}

const getScenicScoreLeft = (y: number, row: string[]) => {

  const current = row[y];

  let counter = 0;

  for (let i = y - 1; i >= 0; i--) {
    const next = row?.[i];
    counter++;
    if (next >= current) {
      return counter;
    }
  }

  return counter;
}

const getScenicScoreRight = (y: number, row: string[]) => {

  const current = row[y];

  let counter = 0;

  for (let i = y + 1; i < row.length; i++) {
    const next = row?.[i];
    counter++;
    if (next >= current) {
      return counter;
    }
  }

  return counter;
}

const getScenicScoreTop = (y: number, row: string[]) => {

  const current = row[y];

  let counter = 0;

  for (let i = y - 1; i >= 0; i--) {
    const next = row?.[i];
    counter++;
    if (next >= current) {
      return counter;
    }
  }

  return counter;
}

const getScenicScoreBottom = (y: number, row: string[]) => {

  const current = row[y];

  let counter = 0;

  for (let i = y + 1; i < row.length; i++) {
    const next = row?.[i];
    counter++;
    if (next >= current) {
      return counter;
    }
  }

  return counter;
}

const getScenicScore = (x: number, y: number, grid: string[][], transposedGrid: [][]) => {

  const left = getScenicScoreLeft(y, grid[x]);
  const right = getScenicScoreRight(y, grid[x]);
  const top = getScenicScoreTop(x, transposedGrid[y]);
  const bottom = getScenicScoreBottom(x, transposedGrid[y]);


  // console.log({ x, y, left, right, top, bottom });

  return left * right * top * bottom;
}


export const solveOne = (input: string) => {

  const visibleTrees = [];
  const trees = input.split('\n').map(x => x.split(''));
  const transposedTrees = transpose(trees);

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees.length; j++) {
      if (isVisible(i, j, trees, transposedTrees)) {
        visibleTrees.push(`${j}-${i}`);
      }
    }
  }

  return visibleTrees.length;
}

export const solveTwo = (input: string) => {

  const trees = input.split('\n').map(x => x.split(''));
  const transposedTrees = transpose(trees);
  const scenicScores = [];

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees.length; j++) {
      scenicScores.push(getScenicScore(i, j, trees, transposedTrees));
    }
  }

  return (Math.max(...scenicScores));
}