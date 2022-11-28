module.exports = class Day12 {

  constructor(fileName, part) {
    this.part = part;
    this.input = this.readInput(fileName);
    this.ship = [0, 0]; // ship start position
    this.waypoint = [10, -1]; // waypoint start position
    this.rotation = [1, 0]; // east
    this.objToMove = part === 1 ? this.ship : this.waypoint;
    this.rotateBasedOn = part === 1 ? this.rotation : this.waypoint;
    this.forwardBasedOn = part === 1 ? this.rotation : this.waypoint;
  }

  readInput(fileName) {
    if (!fileName) return;
    return require('fs').readFileSync(fileName, { encoding: 'utf-8' }).split('\n');
  }

  moveObject(value, instruction) {
    const moveDirections = {
      N: [0, -1],
      E: [1, 0],
      S: [0, 1],
      W: [-1, 0]
    }

    const coordinates = instruction === 'F' ? this.ship : this.objToMove;
    const [x, y] = instruction === 'F' ? this.forwardBasedOn : moveDirections[instruction];
    coordinates[0] += (value * x);
    coordinates[1] += (value * y);
  }

  rotateObject(degrees, instruction, coordinates) {
    const timesToRotate = degrees / 90;
    for (let i = 0; i < timesToRotate; i++) {
      const direction = instruction === 'L' ? 1 : -1;
      let tmp = coordinates[1];
      coordinates[1] = -1 * direction * coordinates[0];
      coordinates[0] = direction * tmp;
    }
  }

  navigate() {
    this.input.forEach(line => {
      const instruction = line[0];
      const value = parseInt(line.split('').slice(1).join(''));

      if (['W', 'E', 'S', 'N', 'F'].includes(instruction)) {
        this.moveObject(value, instruction);
      }
      else if (['R', 'L'].includes(instruction)) {
        this.rotateObject(value, instruction, this.rotateBasedOn);
      }
    });
  }

  getManhattanDistance() {
    return Math.abs(0 - this.ship[0]) + Math.abs(0 - this.ship[1]);
  }
}