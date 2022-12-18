/* This file contains solution for AoC puzzle day 15 */

import { getYear, getDay, getInput } from '../../utils/utils';

interface Device {
  sensor: [number, number],
  beacon: [number, number],
  distance: number
}

const getManhattanDistance = (a: [number, number], b: [number, number]) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const parseInput = (input: string) => {

  const rows = input.split('\n');
  const devices: Device[] = [];

  for (let row of rows) {
    const sensor = row.split(':')[0].split(' ').slice(2, 4).map(coordinate => coordinate.split('=')[1]).map(coordinate => coordinate.replace(',', '')).map(coordinate => parseInt(coordinate)) as [number, number];
    const beacon = row.split(':')[1].split(' ').slice(5, 7).map(coordinate => coordinate.split('=')[1]).map(coordinate => coordinate.replace(',', '')).map(coordinate => parseInt(coordinate)) as [number, number];
    const distance = getManhattanDistance(sensor, beacon);

    devices.push({ sensor, beacon, distance });
  }

  return devices;
}

const initGrid = () => {

  const grid: string[][] = []

  for (let i = 0; i < 50; i++) {
    grid[i] = [];
    for (let j = 0; j < 50; j++) {
      grid[i][j] = '.';
    }
  }

  return grid;
}

const drawLocations = (sensor: [number, number], sensorDistance: number, grid: string[][]) => {

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const point: [number, number] = [j, i];
      const distance = getManhattanDistance(sensor, point);

      // draw location
      if (distance <= sensorDistance) {
        grid[j][i] = '#';
      }
    }
  }
}

const drawDevices = (sensor: [number, number], beacon: [number, number], grid: string[][]) => {

  // draw beacon
  grid[beacon[1]][beacon[0]] = 'B'

  // draw sensor
  grid[sensor[1]][sensor[0]] = 'S'
}

const isOutOfRange = (x: number, y: number, devices: Device[]) => {

  const outOfRange = devices.every(device => {
    const { sensor, distance } = device;
    return Math.abs(sensor[0] - x) + Math.abs(sensor[1] - y) > distance;
  });

  return outOfRange;
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const devices = parseInput(input)
  const row = 2000000;

  let count = 1;

  const visited = new Set();
  for (const device of devices) {
    const { beacon, sensor, distance } = device;

    if (sensor[1] === row || beacon[1] === row) {
      visited.add(sensor[0]);
    }

    for (let i = sensor[0] - distance; i <= sensor[0] + distance; i++) {
      if (!visited.has(i) && Math.abs(sensor[0] - i) + Math.abs(sensor[1] - row) <= distance) {
        visited.add(i);
        count++
      }
    }
  }

  return count;
}

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const devices = parseInput(input);
  const coords = 4000000;

  for (let device of devices) {
    const { sensor, distance } = device;
    for (let xo of [-1, 1]) {
      for (let yo of [-1, 1]) {
        for (let i = 0; i <= distance + 1; i++) {
          const x = sensor[0] + i * xo;
          const y = sensor[1] + (distance + 1 - i) * yo;
          if (x >= 0 && y >= 0 && x <= coords && y <= coords && isOutOfRange(x, y, devices)) {
            return x * coords + y
          }
        }
      }
    }
  }
}