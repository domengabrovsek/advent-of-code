module.exports = class Day5 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;

    const rawInput = require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
      .map(line => {
        const [x1, y1, x2, y2] = line
          .split('->')
          .join(',')
          .replace(/\s/g, '')
          .split(',')
          .map(x => parseInt(x));

        return { x1, x2, y1, y2 };
      })

    this.input = rawInput;
  }

  isSameArray(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }

  getPointsFromEntry(line) {

    const { x1, x2, y1, y2 } = line;

    const points = [];

    // horizontal line
    if (this.isHorizontal(line)) {
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        points.push([x1, i]);
      }
    }

    // vertical line
    else if (this.isVertical(line)) {
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        points.push([i, y1]);
      }
    }

    else if (this.isDiagonal(line)) {

      // diagonal 1
      if (x1 > x2 && y1 > y2) {
        let i = x2, j = y2;
        while (i <= x1) {
          points.push([i, j])
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
          points.push([i, j])
          i--; j++;
        }
      }

      // diagonal 4
      else if (x1 > x2 && y1 < y2) {
        let i = x1, j = y1;
        while (i >= x2) {
          points.push([i, j])
          i--; j++;
        }
      }
    }

    return points;
  }

  isDiagonal({ x1, x2, y1, y2 }) {

    const dy = y2 - y1;
    const dx = x2 - x1;

    return dx === dy || dx === -dy;
  }

  isHorizontal(line) {
    return line.x1 === line.x2
  }

  isVertical(line) {
    return line.y1 === line.y2;
  }

  solve(part) {

    // get all horizontal, vertical or diagonal lines
    const filteredInput = part === 1
      ? this.input.filter(line => this.isHorizontal(line) || this.isVertical(line))
      : this.input.filter(line => this.isHorizontal(line) || this.isVertical(line) || this.isDiagonal(line));

    // flatten all arrays to one
    const points = filteredInput.map(line => this.getPointsFromEntry(line)).flatMap(x => x);

    let overlappingPoints = [];

    points.forEach(point => {
      const numberOfSamePoints = points.filter(x => this.isSameArray(x, point)).length;

      if (numberOfSamePoints > 1) {
        overlappingPoints.push(point);
      }
    })

    const result = new Set(overlappingPoints.map(x => x.toString())).size;

    return result;

    // 7267
    // 14677
  }
}