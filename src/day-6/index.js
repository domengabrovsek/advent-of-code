module.exports = class Day6 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input = require('fs').readFileSync(fileName, { encoding: 'utf-8' })
  }

  solve(part) {

    const fishArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.input
      .split(',')
      .filter(Boolean)
      .map(x => parseInt(x)).forEach(fish => {
        if (!fishArray[fish]) {
          fishArray[fish] = 1;
        } else {
          fishArray[fish] += 1;
        }
      });

    const days = part === 1 ? 80 : 256;

    // simulate days
    for (let i = 1; i <= days; i++) {

      const newFish = fishArray[0];

      // remove level 0 fish
      if (fishArray[0]) {
        fishArray[0] = 0
      }

      // simulate fish reproduction
      for (let j = 1; j < fishArray.length; j++) {
        if (fishArray[j]) {
          fishArray[j - 1] += fishArray[j];
          fishArray[j] -= fishArray[j];
        }
      }

      // add newly born and reset fish
      fishArray[8] += newFish;
      fishArray[6] += newFish;
    }

    // sum all the fish
    return fishArray.reduce((x, y) => x + y, 0);
  }
}