/* This file contains solution for AoC puzzle day 22 */

const parseInstructions = (instructions: string) => {

  const result: [string, string][] = [];
  let i = 0;
  let current = '';

  while (true) {
    if (i === instructions.length) break;

    // if current char is a number
    if (!Number.isNaN(parseInt(instructions[i]))) {
      current = `${current}${instructions[i]}`;
    } else {
      result.push([current, instructions[i]]);
      current = '';
    }

    if (i === instructions.length - 1) {
      result.push([current, '']);
    }

    i++;
  }

  return result;
};

const isWall = (map: string[][], position: [number, number]) => map?.[position[0]]?.[position[1]] === '#';

const isEmpty = (map: string[][], position: [number, number]) => map?.[position[0]]?.[position[1]] === '.';

function getNextPosition(map: string[][], currentPosition: [number, number], currentDirection: string): [number, number] {
  let dx = 0;
  let dy = 0;

  switch (currentDirection) {
    case 'R': { dx = 1; break; }
    case 'L': { dx = -1; break; }
    case 'U': { dy = -1; break; }
    case 'D': { dy = 1; break; }
  }

  let xOffset = 0;
  let yOffset = 0;
  const [x, y] = currentPosition;

  while (true) {
    xOffset = ((x + xOffset + dx + map[0].length) % map[0].length) - x;
    yOffset = ((y + yOffset + dy + map.length) % map.length) - y;

    const position: [number, number] = [y + yOffset, x + xOffset];

    if (isWall(map, position)) {
      return currentPosition;
    }

    if (isEmpty(map, position)) {
      return [x + xOffset, y + yOffset];
    }
  }
}

const getNextDirection = (currentDirection: string, nextDirection: string) => {

  if (nextDirection === '') return currentDirection;

  const direction = `${currentDirection}${nextDirection}`;

  switch (direction) {
    case 'RR': return 'D';
    case 'LR': return 'U';
    case 'DR': return 'L';
    case 'UR': return 'R';

    case 'RL': return 'U';
    case 'LL': return 'D';
    case 'DL': return 'R';
    case 'UL': return 'L';
  }
};

const getFacing = (currentDirection: string) => {
  switch (currentDirection) {
    case 'R': return 0;
    case 'D': return 1;
    case 'L': return 2;
    case 'U': return 3;
  }
};

const getStart = (map: string[][]): [number, number] => [map[0].findIndex(el => el === '.'), 0];

export const solveOne = (input: string) => {

  const rows = input.split('\n');
  const instructions = parseInstructions(rows.pop());
  const map = rows.filter(Boolean).map(row => row.split(''));
  const start = getStart(map);

  let currentPosition = start;
  let currentDirection = 'R';

  for (const instruction of instructions) {

    // move
    for (let i = 0; i < parseInt(instruction[0]); i++) {
      currentPosition = getNextPosition(map, currentPosition, currentDirection);
    }

    // turn
    currentDirection = getNextDirection(currentDirection, instruction[1]);
  }

  const result = (currentPosition[1] + 1) * 1000 + (currentPosition[0] + 1) * 4 + getFacing(currentDirection);
  return result;
};

export const solveTwo = (input: string) => {

  // TODO: Implement part two
};