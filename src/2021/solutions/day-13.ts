/* This file contains solution for AoC puzzle day 13 */

import { getYear, getDay, getInput } from '../../utils/utils';

const createPaper = (dots: any): any => {
  const x = Math.max(...dots.map((dot: any) => parseInt(dot.split(',')[0])));
  const y = Math.max(...dots.map((dot: any) => parseInt(dot.split(',')[1])));

  const paper = [];

  for (let i = 0; i <= y; i++) {
    paper.push([]);
    for (let j = 0; j <= x; j++) {
      paper[i].push('.');
    }
  }

  for (const dot of dots) {
    const [dotX, dotY] = dot.split(',');

    paper[dotY][dotX] = '#';
  }

  return paper;
};

const countMarkedDots = (paper: any) => paper.flatMap((x: any) => x).filter((x: any) => x === '#').length;

const flipY = (paper: any, value: any): any => {

  const top = paper.filter((row: any, index: any) => index < value);
  const bottom = paper.filter((row: any, index: any) => index > value).reverse();

  const merged = [];

  for (let i = 0; i < top.length; i++) {
    merged.push([]);
    for (let j = 0; j < top[0].length; j++) {
      if (top[i][j] === '#' || bottom[i][j] === '#') {
        merged[i].push('#');
      } else {
        merged[i].push('.');
      }
    }
  }

  return merged;
};

const flipX = (paper: any, value: any): any => {

  const left = paper.map((row: any) => row.slice(0, value));
  const right = paper.map((row: any) => row.slice(value + 1, row.length).reverse());

  const merged = [];

  for (let i = 0; i < left.length; i++) {
    merged.push([]);
    for (let j = 0; j < left[0].length; j++) {
      if (left[i][j] === '#' || right[i][j] === '#') {
        merged[i].push('#');
      } else {
        merged[i].push('.');
      }
    }
  }

  return merged;
};

const flip = (paper: any, value: any, direction: any) => {
  if (direction === 'x') { return flipX(paper, value); }
  if (direction === 'y') { return flipY(paper, value); }
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const rows = input.split('\n').filter(Boolean);
  const dots = rows.filter(row => !row.includes('fold'));
  const folds = rows.filter(row => row.includes('fold')).map(row => row.split(' ')[2]);

  // create initial paper
  let paper = createPaper(dots);

  const parsedFolds = folds.map(x => x.split('='));

  for (const [index, fold] of parsedFolds.entries()) {
    const [direction, value] = fold;

    paper = flip(paper, parseInt(value), direction);

    if (index === 0) {
      return countMarkedDots(paper);
    }
  }
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const rows = input.split('\n').filter(Boolean);
  const dots = rows.filter(row => !row.includes('fold'));
  const folds = rows.filter(row => row.includes('fold')).map(row => row.split(' ')[2]);

  // create initial paper
  let paper = createPaper(dots);

  const parsedFolds = folds.map(x => x.split('='));

  for (const [index, fold] of parsedFolds.entries()) {
    const [direction, value] = fold;
    paper = flip(paper, parseInt(value), direction);
  }

  // make the output a bit more eye friendly
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper[0].length; j++) {
      if (paper[i][j] === '.') {
        paper[i][j] = '';
      } else {
        paper[i][j] = 'X';
      }
    }
  }

  // reads as ABKJFBGC
  console.table(paper);
};
