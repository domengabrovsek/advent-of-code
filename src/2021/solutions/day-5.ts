/* This file contains solution for AoC puzzle day 5 */

import { getYear, getDay, getInput } from '../../utils/utils';

const isSameArray = (arr1: any, arr2: any) => {
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

const getPointsFromEntry = (line: any) => {

  const { x1, x2, y1, y2 } = line;

  const points = [];

  // horizontal line
  if (isHorizontal(line)) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      points.push([x1, i]);
    }
  }

  // vertical line
  else if (isVertical(line)) {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
      points.push([i, y1]);
    }
  }

  else if (isDiagonal(line)) {

    // diagonal 1
    if (x1 > x2 && y1 > y2) {
      let i = x2, j = y2;
      while (i <= x1) {
        points.push([i, j]);
        i++; j++;
      }
    }

    // diagonal 2
    else if (x1 < x2 && y1 < y2) {
      let i = x1, j = y1;
      while (i <= x2) {
        points.push([i, j]);
        i++; j++;
      }
    }

    // diagonal 3
    else if (x1 < x2 && y1 > y2) {
      let i = x2, j = y2;
      while (i >= x1) {
        points.push([i, j]);
        i--; j++;
      }
    }

    // diagonal 4
    else if (x1 > x2 && y1 < y2) {
      let i = x1, j = y1;
      while (i >= x2) {
        points.push([i, j]);
        i--; j++;
      }
    }
  }

  return points;
}

const isDiagonal = ({ x1, x2, y1, y2 }: any) => {

  const dy = y2 - y1;
  const dx = x2 - x1;

  return dx === dy || dx === -dy;
}

const isHorizontal = (line: any) => {
  return line.x1 === line.x2;
}

const isVertical = (line: any) => {
  return line.y1 === line.y2;
}

const intersects = (line1: any, line2: any) => {
  const det = (line1.x2 - line1.x1) * (line2.y2 - line2.y1) - (line2.x2 - line2.x1) * (line1.y2 - line1.y1);

  if (det !== 0) {
    return false;
  }

  const lambda = ((line2.y2 - line2.y1) * (line2.x2 - line1.x1) + (line2.x1 - line2.x2) * (line2.y2 - line1.y1)) / det;
  const gamma = ((line1.y1 - line1.y2) * (line2.x2 - line1.x1) + (line1.x2 - line1.x1) * (line2.y2 - line1.y1)) / det;

  if ((0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)) {
    return [line1.index, line2.index].sort();
  }

  return false;
}

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input
    .split('\n')
    .map((line: any, index: any) => {
      const [x1, y1, x2, y2] = line
        .split('->')
        .join(',')
        .replace(/\s/g, '')
        .split(',')
        .map((x: any) => parseInt(x));

      return { x1, x2, y1, y2, index };
    });

  // get all horizontal, vertical or diagonal lines
  const filteredInput = parsedInput.filter(line => isHorizontal(line) || isVertical(line))

  // flatten all arrays to one
  const points = filteredInput.map(line => getPointsFromEntry(line)).flatMap(x => x);

  const overlappingPoints: any = [];

  points.forEach(point => {
    const numberOfSamePoints = points.filter(x => isSameArray(x, point)).length;

    if (numberOfSamePoints > 1) {
      overlappingPoints.push(point);
    }
  });

  const result = new Set(overlappingPoints.map((x: any) => x.toString())).size;

  return result;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const parsedInput = input
    .split('\n')
    .map((line: any, index: any) => {
      const [x1, y1, x2, y2] = line
        .split('->')
        .join(',')
        .replace(/\s/g, '')
        .split(',')
        .map((x: any) => parseInt(x));

      return { x1, x2, y1, y2, index };
    });

  // get all horizontal, vertical or diagonal lines
  const filteredInput = parsedInput.filter(line => isHorizontal(line) || isVertical(line) || isDiagonal(line));

  // flatten all arrays to one
  const points = filteredInput.map(line => getPointsFromEntry(line)).flatMap(x => x);

  const overlappingPoints: any = [];

  points.forEach(point => {
    const numberOfSamePoints = points.filter(x => isSameArray(x, point)).length;

    if (numberOfSamePoints > 1) {
      overlappingPoints.push(point);
    }
  });

  const result = new Set(overlappingPoints.map((x: any) => x.toString())).size;

  return result;
}
