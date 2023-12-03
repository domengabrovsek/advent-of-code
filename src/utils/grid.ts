export const getLeftNeighbor = (position: Position, grid: Grid) => {
  const leftX = position.x - 1;
  if (leftX >= 0 && leftX < grid[0].length) {
    return grid[position.y][leftX];
  }
};

export const getRightNeighbor = (position: Position, grid: Grid) => {
  const rightX = position.x + 1;
  if (rightX >= 0 && rightX < grid[0].length) {
    return grid[position.y][rightX];
  }
};

export const extractCoordinates = (coords: string): Position => {
  const [x, y] = coords.split(':').map(str => parseInt(str));
  return { x, y };
};

const getNeighborPositions = (x: number, y: number): Position[] => [
  { x: x - 1, y }, // Left
  { x: x + 1, y }, // Right
  { x, y: y - 1 }, // Top
  { x, y: y + 1 }, // Bottom
  { x: x - 1, y: y - 1 }, // Top Left
  { x: x + 1, y: y - 1 }, // Top Right
  { x: x - 1, y: y + 1 }, // Bottom Left
  { x: x + 1, y: y + 1 }  // Bottom Right
];

export const isNeighbour = (positionOne: Position, positionTwo: Position): boolean => {
  return getNeighborPositions(positionOne.x, positionOne.y)
    .some(pos => pos.x === positionTwo.x && pos.y === positionTwo.y);
};

export const getNeighbours = (position: Position, grid: Grid): Position[] => {
  return getNeighborPositions(position.x, position.y)
    .filter(pos => pos.x >= 0 && pos.y >= 0 && pos.y < grid.length && pos.x < grid[0].length);
};

export const initGrid = (input: string): Grid => {
  const rows = input.split('\n');
  const grid: Grid = [];

  rows.forEach((row, y) => {
    grid[y] = row.split('');
  });

  return grid;
};
