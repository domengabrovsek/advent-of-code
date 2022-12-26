export type Grid = Map<string, string>;
export type Position = { x: number, y: number };
export type Direction = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

export const getCoordinate = (position: string, direction: Direction) => {
  const { x, y } = extractCoordinates(position);
  switch (direction) {
    case 'N': return formatCoordinates(x, y - 1);
    case 'S': return formatCoordinates(x, y + 1);
    case 'E': return formatCoordinates(x + 1, y);
    case 'W': return formatCoordinates(x - 1, y);
    case 'NE': return formatCoordinates(x + 1, y - 1);
    case 'NW': return formatCoordinates(x - 1, y - 1);
    case 'SE': return formatCoordinates(x + 1, y + 1);
    case 'SW': return formatCoordinates(x - 1, y + 1);
  }

}

export const getNeighbour = (grid: Grid, position: string, direction: Direction) => {
  switch (direction) {
    case 'N': return grid.get(getCoordinate(position, 'N'))
    case 'S': return grid.get(getCoordinate(position, 'S'));
    case 'E': return grid.get(getCoordinate(position, 'E'));
    case 'W': return grid.get(getCoordinate(position, 'W'));
    case 'NE': return grid.get(getCoordinate(position, 'NE'));
    case 'NW': return grid.get(getCoordinate(position, 'NW'));
    case 'SE': return grid.get(getCoordinate(position, 'SE'));
    case 'SW': return grid.get(getCoordinate(position, 'SW'));
  }
}

export const getNeighbours = (grid: Grid, position: string): Grid => {

  const neighbours = new Map<Direction, string>();

  try {
    ['N', 'S', 'E', 'W', 'NW', 'NE', 'SW', 'SE'].forEach((direction: Direction) => {
      const neighbour = getNeighbour(grid, position, direction);
      if (neighbour) {
        neighbours.set(direction, neighbour);
      }
    })
  } catch (error) {
    console.log({ error, position })
  }

  return neighbours;
}

export const formatCoordinates = (x: number, y: number): string => `${x}:${y}`;

export const extractCoordinates = (coords: string): Position => {
  const [x, y] = coords.split(':').map(str => parseInt(str));
  return { x, y };
}

export const printGrid = (grid: Grid) => {

  const table: string[][] = []
  const size = 40;

  // empty grid
  for (let i = 0; i < size; i++) {
    table[i] = [];
    for (let j = 0; j < size; j++) {
      table[i][j] = '.';
    }
  }


  for (let i = -10; i < size; i++) {
    for (let j = -10; j < size; j++) {

      const val = grid.get(formatCoordinates(j, i));

      if (val) {
        table[i + size / 2][j + size / 2] = val
      }
    }
  }

  console.table(table);


}

export const initGrid = (input: string, char?: string) => {

  const rows = input.split('\n');
  const grid: Grid = new Map<string, string>();

  rows.forEach((row, y) => {
    row.split('').forEach((col, x) => {

      // if char is provided, only save positions which match char
      if (char) {
        if (char === col) {
          grid.set(formatCoordinates(x, y), col);
        }
      } else {
        grid.set(formatCoordinates(x, y), col);
      }
    });
  });

  return grid;
};
