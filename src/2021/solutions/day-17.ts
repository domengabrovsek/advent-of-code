/* This file contains solution for AoC puzzle day 17 */

import { getYear, getDay, getInput } from '../../utils/utils';

interface Probe {
  x: number,
  y: number
}

interface Velocity {
  x: number,
  y: number
}

interface TargetArea {
  x1: number,
  x2: number,
  y1: number,
  y2: number
}

const getTargetArea = (input: string): TargetArea => {
  const [x1, x2, y1, y2] = input
    .split(': ')[1]
    .split(',')
    .map(part => part.split('=')[1])
    .flatMap(part => part.split('..'))
    .map(Number);

  return { x1, x2, y1, y2 };
};

const isInTargetArea = (targetArea: TargetArea, probe: Probe): boolean => {
  return probe.x >= targetArea.x1 &&
    probe.x <= targetArea.x2 &&
    probe.y >= targetArea.y1 &&
    probe.y <= targetArea.y2;
};

const isTooFar = (targetArea: TargetArea, probe: Probe): boolean => {

  // console.log(`is probe (${probe.x}, ${probe.y}) too far from (${targetArea.x1} ${targetArea.x2}, ${targetArea.y1} ${targetArea.y2})`);

  if ((probe.x > targetArea.x2) || (probe.y < targetArea.y1)) {
    // console.log('yes');
    return true;
  }

  // console.log('no');

  return false;
};

const applySpeedModifier = (speed: number) => {
  if (speed > 0) return speed - 1;
  if (speed < 0) return speed + 1;
  if (speed === 0) return speed;
};

const shootProbe = (velocityX: number, velocityY: number, targetArea: TargetArea) => {
  const probe: Probe = { x: 0, y: 0 };
  const velocity: Velocity = { x: velocityX, y: velocityY };

  let maxHeight = 0;

  // move until the probe hits the target or is too far
  while (true) {

    // move into X direction
    probe.x += velocity.x;

    // move into Y direction
    probe.y += velocity.y;

    // save max height
    if (probe.y > maxHeight) {
      maxHeight = probe.y;
    }

    // apply drag
    velocity.x = applySpeedModifier(velocity.x);

    // apply gravity
    velocity.y -= 1;

    if (isInTargetArea(targetArea, probe)) {
      return maxHeight;
    }

    if (isTooFar(targetArea, probe)) {
      return;
    }
  }
};

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const targetArea = getTargetArea(input);

  let maxHeight = 0;

  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      const result = shootProbe(x, y, targetArea);
      if (result) {
        maxHeight = result;
      }
    }
  }

  return maxHeight;
};

export const solveTwo = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));

  const targetArea = getTargetArea(input);

  const results = [];

  for (let x = 0; x < 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
      const result = shootProbe(x, y, targetArea);
      if (result !== undefined) {
        results.push({ height: result, x, y });
      }
    }
  }

  return results.length;
};
