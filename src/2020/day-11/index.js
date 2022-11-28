module.exports = class Day11 {

  constructor(fileName) {
    this.input = this.readInput(fileName);
    this.grid = this.constructGrid(this.input);
  }

  readInput(fileName) {
    return require('fs').readFileSync(fileName, { encoding: 'utf-8' });
  }

  constructGrid(input) {

    const grid = [];

    input.split('\n').forEach((row, rowIndex) => {
      grid.push([]);
      row.split('').forEach((col, colIndex) => {
        grid[rowIndex][colIndex] = col
      })
    })

    return grid;
  }

  // this method is just for testing the algorithm steps
  simulateOnce() {

    // this will be the new grid to apply changes to
    this.newGrid = JSON.parse(JSON.stringify(this.grid));

    // simulate until there is no change between old and new grid
    this.grid.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const sit = { colIndex, rowIndex };

        // if empty occupy it
        if (this.isEmptySeat(sit) && this.numberOfAdjacentSitsOccupied(sit) === 0) {
          this.occupySit(sit);
        }

        // if occupied, check if should be emptied
        else if (this.isOccupied(sit) && this.numberOfAdjacentSitsOccupied(sit) >= 4) {
          this.emptySit(sit);
        }
      })
    })

    // apply changes to old grid
    this.grid = JSON.parse(JSON.stringify(this.newGrid));
  }

  simulate(part) {

    // simulate until there is no change between old and new grid
    while (true) {

      // this will be the new grid to apply changes to
      this.newGrid = JSON.parse(JSON.stringify(this.grid));

      this.grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          const sit = { colIndex, rowIndex };

          // if empty occupy it
          if (this.isEmptySeat(sit)) {
            if (part === 1 && this.numberOfSitsOccupied(sit, part) === 0) {
              this.occupySit(sit);
            }
            else if (part === 2 && this.numberOfSitsOccupied(sit, part) === 0) {
              this.occupySit(sit);
            }
          }

          // if occupied, check if should be emptied
          else if (this.isOccupied(sit)) {
            if (part === 1 && this.numberOfSitsOccupied(sit, part) >= 4) {
              this.emptySit(sit);
            }
            else if (part === 2 && this.numberOfSitsOccupied(sit, part) >= 5) {
              this.emptySit(sit);
            }
          }
        })
      })

      // if the new and the old grid are the same, break
      if (JSON.stringify(this.grid) === JSON.stringify(this.newGrid)) {
        break;
      }

      // apply changes to old grid
      this.grid = JSON.parse(JSON.stringify(this.newGrid));
    }
  }

  numberOfSitsOccupied(sit, part) {
    if (part === 1) return this.numberOfAdjacentSitsOccupied(sit);
    if (part === 2) return this.numberOfVisibleSitsOccupied(sit);
  }

  numberOfVisibleSitsOccupied(sit) {

    const gridY = this.grid.length;
    const gridX = this.grid[0].length;

    // go in each direction and find first occupied sit if there is any

    // up
    const getUpper = () => {
      for (let i = sit.rowIndex - 1; i >= 0; i--) {
        const seat = { rowIndex: [i], colIndex: [sit.colIndex] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
      }
      return false;
    }

    // down
    const getBottom = () => {
      for (let i = sit.rowIndex + 1; i < gridY; i++) {
        const seat = { rowIndex: [i], colIndex: [sit.colIndex] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
      }
      return false;
    }

    // left
    const getLeft = () => {
      for (let j = sit.colIndex - 1; j >= 0; j--) {
        const seat = { rowIndex: [sit.rowIndex], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
      }
      return false;
    }

    // right
    const getRight = () => {
      for (let j = sit.colIndex + 1; j < gridX; j++) {
        const seat = { rowIndex: [sit.rowIndex], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
      }
      return false;
    }

    // left upper
    const getLeftUpper = () => {
      let i = sit.rowIndex - 1;
      let j = sit.colIndex - 1;

      while (i >= 0) {
        const seat = { rowIndex: [i], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
        i--;
        j--;
      }
      return false;
    }

    // right upper
    const getRightUpper = () => {
      let i = sit.rowIndex - 1;
      let j = sit.colIndex + 1;

      while (i >= 0) {
        const seat = { rowIndex: [i], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
        i--;
        j++;
      }
      return false;
    }

    // left bottom
    const getLeftBottom = () => {
      let i = sit.rowIndex + 1;
      let j = sit.colIndex - 1;

      while (i < gridY) {
        const seat = { rowIndex: [i], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
        i++;
        j--;
      }
      return false;
    }

    // right bottom
    const getRightBottom = () => {
      let i = sit.rowIndex + 1;
      let j = sit.colIndex + 1;

      while (i < gridY) {
        const seat = { rowIndex: [i], colIndex: [j] };
        if (this.isOccupied(seat)) { return true; }
        else if (this.isEmptySeat(seat)) { return false; }
        i++;
        j++;
      }
      return false;
    }

    const directions = {
      up: getUpper(),
      down: getBottom(),
      left: getLeft(),
      right: getRight(),
      leftUpper: getLeftUpper(),
      rightUpper: getRightUpper(),
      leftBottom: getLeftBottom(),
      rightBottom: getRightBottom()
    };

    return Object.values(directions).filter(x => x).length;
  }

  numberOfAdjacentSitsOccupied(sit) {
    let numberOfAdjacentOccupied = 0;

    // left one
    if (this.grid?.[sit.rowIndex]?.[sit.colIndex - 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    // right one
    if (this.grid?.[sit.rowIndex]?.[sit.colIndex + 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    // upper one
    if (this.grid?.[sit.rowIndex - 1]?.[sit.colIndex] === '#') {
      numberOfAdjacentOccupied++;
    }

    // bottom one
    if (this.grid?.[sit.rowIndex + 1]?.[sit.colIndex] === '#') {
      numberOfAdjacentOccupied++;
    }

    // bottom left one
    if (this.grid?.[sit.rowIndex + 1]?.[sit.colIndex - 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    // bottom right one
    if (this.grid?.[sit.rowIndex + 1]?.[sit.colIndex + 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    // top left one
    if (this.grid?.[sit.rowIndex - 1]?.[sit.colIndex - 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    // top right one
    if (this.grid?.[sit.rowIndex - 1]?.[sit.colIndex + 1] === '#') {
      numberOfAdjacentOccupied++;
    }

    return numberOfAdjacentOccupied;
  }

  emptySit(sit) {
    this.newGrid[sit.rowIndex][sit.colIndex] = 'L';
  }

  occupySit(sit) {
    this.newGrid[sit.rowIndex][sit.colIndex] = '#';
  }

  isEmptySeat(sit) {
    return this.grid?.[sit?.rowIndex]?.[sit?.colIndex] === 'L';
  }

  isOccupied(sit) {
    return this.grid?.[sit?.rowIndex]?.[sit?.colIndex] === '#';
  }

  countOccupiedSits() {
    return this.newGrid.flatMap(sit => sit).filter(sit => sit === '#').length;
  }
}