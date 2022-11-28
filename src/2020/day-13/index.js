module.exports = class Day13 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
  }

  readInput(fileName) {
    if (!fileName) return;

    const input = require('fs').readFileSync(fileName, { encoding: 'utf-8' }).split('\n');
    const timeEstimate = input[0];
    const availableBuses = input[1].split(',');

    return { timeEstimate, availableBuses };
  }

  getFirstAvailableBus() {
    const options = [];

    const { availableBuses, timeEstimate } = this.input;

    availableBuses
      .filter(busId => busId !== 'x')
      .forEach(busId => {

        let time = timeEstimate;

        while (time > 0) {
          time -= busId;
        }

        options.push({ busId: busId, time: Math.abs(time) });
      })

    const minTime = Math.min(...options.map(bus => bus.time));
    const { busId, time } = options.find(bus => bus.time === minTime);

    const result = parseInt(busId) * parseInt(time);

    return result;

  }

  getEarliestTimeStamp() {

    const availableBuses = this.input.availableBuses
      .map((busId, index) => ({
        busId: parseInt(busId),
        t: index
      }))
      .filter(x => !isNaN(x.busId));

    let x = 1;
    let i = 0;

    for (let bus of availableBuses) {

      while (true) {
        const isValid = ((i + bus.t) % bus.busId === 0);

        if (isValid) {
          // this ensures that the space to search decreases by a lot every iteration
          x = x * bus.busId;
          break;
        }

        i += x
      }
    }

    return i;
  }
}