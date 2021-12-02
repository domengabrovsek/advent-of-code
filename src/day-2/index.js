module.exports = class Day1 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
    this.currentPosition = 0;
    this.currentDepth = 0;
    this.currentAim = 0;
  }

  readInput(fileName) {
    if (!fileName) return;
    return require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n')
  }

  reset() {
    this.currentAim = 0;
    this.currentPosition = 0;
    this.currentDepth = 0;
  }

  getPosition(part) {
    this.input.forEach(line => {
      const parts = line.split(' ');
      const command = parts[0];
      const value = parseInt(parts[1]);

      switch (command) {
        case 'forward': {
          this.currentPosition += value;

          if (part === 2) {
            this.currentDepth += (this.currentAim * value);
          }

          break;
        }
        case 'down': {
          part === 2
            ? this.currentAim += value
            : this.currentDepth += value;
          break;
        }
        case 'up': {
          part === 2
            ? this.currentAim -= value
            : this.currentDepth -= value;
          break;
        }
      }
    })

    return this.currentDepth * this.currentPosition;
  }
}