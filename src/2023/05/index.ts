/* eslint-disable complexity */

const getValue = (map: Map<string, string[]>, name: string, key: string): string => {

  const values = map.get(name);

  for (const value of values) {
    const [desinationStart, sourceStart, length] = value.split('-').map(Number);

    if (Number(key) >= sourceStart && Number(key) < sourceStart + length) {
      return String(desinationStart + Number(key) - sourceStart);
    }
  }

  return key;
};

const seedToLocation = (map: Map<string, string[]>, seed: string) => {

  const soil = getValue(map, 'seed-to-soil', seed);
  const fertilizer = getValue(map, 'soil-to-fertilizer', soil);
  const water = getValue(map, 'fertilizer-to-water', fertilizer);
  const light = getValue(map, 'water-to-light', water);
  const temperature = getValue(map, 'light-to-temperature', light);
  const humidity = getValue(map, 'temperature-to-humidity', temperature);
  const location = getValue(map, 'humidity-to-location', humidity);

  return location;
};

const initMap = (lines: string[]) => {
  const map = new Map<string, string[]>();

  let name = '';
  let values = [];

  for (const line of lines) {

    if (line === '') {

      if (name) {
        map.set(name, values.map(value => value.split(' ').join('-')));
      }

      name = '';
      values = [];
      continue;
    }
    else {
      // take name
      if (line.includes(':')) {
        name = line.split(' ')[0];
        continue;
      }
      else {
        // take values
        values.push(line);
      }
    }
  }

  return map;
};

export const solveOne = (input: string) => {

  const lines = input.split('\n');
  const seeds = lines.shift().split(':')[1].trim().split(' ');
  const map = initMap(lines);

  return Math.min(...seeds.map(seed => Number(seedToLocation(map, seed))));
};

// part 2 takes forever to run
export const solveTwo = (input: string) => {
  const lines = input.split('\n');
  const map = initMap(lines);
  const range = lines.shift().split(':')[1].trim().split(' ');

  let location = Infinity;

  for (let i = 0; i < range.length; i += 2) {
    const start = Number(range[i]);
    const length = Number(range[i + 1]);

    for (let i = 0; i < length; i++) {

      if (Number(seedToLocation(map, String(i + start))) < location) {
        location = Number(seedToLocation(map, String(i + start)));
      }
    }
  }

  return location;
};
