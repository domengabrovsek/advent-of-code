module.exports = class Day9 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split('\n')
        .map(x => x.split('').map(Number))
  }

  getLowPoints() {
    const lowPoints = [];

    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[0].length; j++) {

        const current = this.input[i][j];
        const upper = this.input?.[i]?.[j - 1];
        const lower = this.input?.[i]?.[j + 1];
        const left = this.input?.[i - 1]?.[j];
        const right = this.input?.[i + 1]?.[j];

        const points = [upper, lower, left, right].filter(x => x !== undefined);

        if (current < Math.min(...points)) {
          lowPoints.push({ value: current, i, j });
        }

      }
    }

    return lowPoints;
  }

  solve(part) {

    const lowPoints = this.getLowPoints();

    if (part === 1) {
      return lowPoints.map(x => x.value).reduce((x, y) => x + y, 0) + lowPoints.length;
    }

    if (part === 2) {
      let basins = lowPoints.map(x => []);
      lowPoints.forEach((lowPoint, basin) => {

        let stack = [[lowPoint.i, lowPoint.j]];

        while (true) {

          // take next item from stack
          const current = stack.pop();

          // when stack is empty we're done
          if (!current) {
            break;
          }

          // get current value from coordinates
          const currentValue = this.input[current[0]][current[1]];

          // add all numbers except 9 to the basin
          if (currentValue !== 9) {
            if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1])) {
              basins[basin].push([current[0], current[1]]);
            }

            // push adjacent values to the stack

            // left
            const left = this.input?.[current[0]]?.[current[1] - 1];
            if (left && left !== 9) {
              if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1] - 1)) {
                stack.push([current[0], current[1] - 1]);
              }
            }

            // right
            const right = this.input?.[current[0]]?.[current[1] + 1]
            if (right && right !== 9) {

              // add only if it doesnt exist yet
              if (!basins[basin].find(x => x[0] === current[0] && x[1] === current[1] + 1)) {
                stack.push([current[0], current[1] + 1]);
              }
            }

            // top
            const top = this.input?.[current[0] - 1]?.[current[1]]
            if (top && top !== 9) {

              // add only if it doesnt exist yet
              if (!basins[basin].find(x => x[0] === current[0] - 1 && x[1] === current[1])) {
                stack.push([current[0] - 1, current[1]]);
              }
            }

            // bottom
            const bottom = this.input?.[current[0] + 1]?.[current[1]]
            if (bottom && bottom !== 9) {

              // add only if it doesnt exist yet
              if (!basins[basin].find(x => x[0] === current[0] + 1 && x[1] === current[1])) {
                stack.push([current[0] + 1, current[1]]);
              }
            }
          }
        }
      })

      const basinSizes = basins
        .map(x => parseInt(x.length))
        .sort((a, b) => a - b);

      const basinsLength = basinSizes.length;

      return basinSizes[basinsLength - 1] * basinSizes[basinsLength - 2] * basinSizes[basinsLength - 3];
    }
  }
}