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

  hasFlashed(octopus, flashedOctopuses) {
    return !!flashedOctopuses.find(flaOct => flaOct[0] === octopus[0] && flaOct[1] === octopus[1]);
  }

  solve(part) {

    let steps = 2;
    let totalFlashes = 0;

    console.table(this.input)

    // simulate 100 steps
    for (let step = 1; step <= steps; step++) {

      const flashedOctopuses = [];

      for (let i = 0; i < this.input.length; i++) {
        for (let j = 0; j < this.input[i].length; j++) {

          // First, the energy level of each octopus increases by 1.
          if (!this.hasFlashed([i, j], flashedOctopuses)) {
            this.input[i][j] += 1;
          }

          const toCheck = [[i, j]];

          while (true) {

            if (toCheck.length === 0) {
              break;
            }

            const [x, y] = toCheck.pop();
            const value = this.input[x][y];

            // if energy level higher than 9
            if (value > 9) {

              // reset energy level to 0
              this.input[x][y] = 0;

              // mark it as already flashed
              flashedOctopuses.push([x, y]);

              // increase number of total flashes
              totalFlashes++;

              // increase energy level by 1 for all adjacent ones
              this.getAdjacentOctopuses(x, y).forEach(adjOct => {
                const [a, b] = adjOct;

                if (!this.hasFlashed(adjOct, flashedOctopuses)) {
                  this.input[a][b] += 1

                  if(this.input[a][b] > 9) {
                    toCheck.push(adjOct);
                  }
                }
              })

            } else {
              break;
            }
          }
        }
      }

      // Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
      // Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.
      console.table(this.input)
    }

    console.log(totalFlashes);

  }
}
