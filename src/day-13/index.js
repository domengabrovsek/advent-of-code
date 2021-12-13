const { parentPort } = require('worker_threads');

module.exports = class Day10 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;

    const rows = require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      .filter(Boolean)

    this.dots = rows.filter(row => !row.includes('fold'));
    this.folds = rows.filter(row => row.includes('fold')).map(row => row.split(' ')[2]);

  }

  createPaper(dots) {
    let x = Math.max(...dots.map(dot => parseInt(dot.split(',')[0])));
    let y = Math.max(...dots.map(dot => parseInt(dot.split(',')[1])));

    let paper = [];

    for (let i = 0; i <= y; i++) {
      paper.push([]);
      for (let j = 0; j <= x; j++) {
        paper[i].push('.');
      }
    }

    for (const dot of dots) {
      const [dotX, dotY] = dot.split(',');

      paper[dotY][dotX] = '#'
    }

    return paper;
  }

  countMarkedDots(paper) {
    return paper.flatMap(x => x).filter(x => x === '#').length;
  }

  flipY(paper, value) {

    let top = paper.filter((row, index) => index < value);
    let bottom = paper.filter((row, index) => index > value).reverse();

    let merged = [];

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
  }

  flipX(paper, value) {

    let left = paper.map(row => row.slice(0, value));
    let right = paper.map(row => row.slice(value + 1, row.length).reverse());

    let merged = [];

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
  }

  flip(paper, value, direction) {
    if (direction === 'x') return this.flipX(paper, value);
    if (direction === 'y') return this.flipY(paper, value);
  }

  solve(part) {
    // create initial paper
    let paper = this.createPaper(this.dots);

    const folds = this.folds.map(x => x.split('='));

    for (const [index, fold] of folds.entries()) {
      const [direction, value] = fold;

      paper = this.flip(paper, parseInt(value), direction);

      if (part === 1 && index === 0) {
        return this.countMarkedDots(paper)
      }
    }


    // make the output a bit more eye friendly
    for(let i = 0; i < paper.length; i++) {
      for(let j = 0; j < paper[0].length; j++) {
        if(paper[i][j] === '.') {
          paper[i][j] = '';
        } else {
          paper[i][j] = 'X';
        }
      }
    }

    // reads as ABKJFBGC
    console.table(paper);
  }
}

