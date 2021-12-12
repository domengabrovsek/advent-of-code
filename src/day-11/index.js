module.exports = class Day10 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split('\n')
        .map(row => row.split('')
          .map(value => parseInt(value)));
  }

  getAdjacentOctopuses(x, y) {
    const adjacentOctopuses = [];

    // top
    adjacentOctopuses.push([x, y - 1]);

    // bottom
    adjacentOctopuses.push([x, y + 1]);

    // left
    adjacentOctopuses.push([x - 1, y]);

    // right
    adjacentOctopuses.push([x + 1, y]);

    // left top
    adjacentOctopuses.push([x - 1, y - 1]);

    // left bottom
    adjacentOctopuses.push([x - 1, y + 1]);

    // right top
    adjacentOctopuses.push([x + 1, y - 1]);

    // right bottom
    adjacentOctopuses.push([x + 1, y + 1]);

    return adjacentOctopuses.filter(x => this.input?.[x[0]]?.[x[1]]);
  }

  flashAndCount() {
    let sum = 0;

    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[i].length; j++) {
        if (this.input[i][j] > 9) {
          sum += 1;
          this.input[i][j] = 0;
        }
      }
    }

    return sum;
  }

  allFlashed() {
    let totalFlashes = 0;

    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[i].length; j++) {
        if (this.input[i][j] > 9) {
          totalFlashes++;
          this.input[i][j] = 0;
        }
      }
    }

    const totalOctopuses = this.input.length * this.input[0].length;

    return totalFlashes === totalOctopuses;
  }

  solve(part) {

    if (part === 1) {
      let totalSteps = 100;
      let totalFlashes = 0;

      // iterate through steps
      for (let step = 1; step <= totalSteps; step++) {

        let stack = [];

        for (let i = 0; i < this.input.length; i++) {
          for (let j = 0; j < this.input[i].length; j++) {

            // increase all by 1
            this.input[i][j] += 1;

            // push octopuses which should flash to stack
            if (this.input[i][j] > 9) {
              stack.push([i, j])
            }
          }
        }

        // iterate until all that should flashed have flashed
        while (stack.length > 0) {

          const [x, y] = stack.shift();

          // get all adjacent
          const adjacentOctopuses = this.getAdjacentOctopuses(x, y);

          // increase all adjacent by 1 and push the ones to flash to stack
          for (const oct of adjacentOctopuses) {
            this.input[oct[0]][oct[1]] += 1;
            if (this.input[oct[0]][oct[1]] === 10) {
              stack.push([oct[0], oct[1]]);
            }
          }
        }

        // flash the ones who have energy over 9 and count them
        totalFlashes += this.flashAndCount();
      }

      return totalFlashes;
    }

    if (part === 2) {
      let totalSteps = 0;

      // iterate until all octopuses flash
      while (true) {
        let stack = [];

        for (let i = 0; i < this.input.length; i++) {
          for (let j = 0; j < this.input[i].length; j++) {

            // increase all by 1
            this.input[i][j] += 1;

            // push octopuses which should flash to stack
            if (this.input[i][j] > 9) {
              stack.push([i, j])
            }
          }
        }

        // iterate until all that should flashed have flashed
        while (stack.length > 0) {

          const [x, y] = stack.shift();

          // get all adjacent
          const adjacentOctopuses = this.getAdjacentOctopuses(x, y);

          // increase all adjacent by 1 and push the ones to flash to stack
          for (const oct of adjacentOctopuses) {
            this.input[oct[0]][oct[1]] += 1;
            if (this.input[oct[0]][oct[1]] === 10) {
              stack.push([oct[0], oct[1]]);
            }
          }
        }

        totalSteps += 1;
        if (this.allFlashed()) {
          return totalSteps;
        }
      }
    }
  }
}

