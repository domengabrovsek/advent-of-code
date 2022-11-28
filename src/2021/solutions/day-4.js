const { deepCopy } = require('../../utils');

module.exports = class Day3 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) { return; }

    const rawInput = require('fs')
      .readFileSync(fileName, { encoding: 'utf-8' })
      .split('\n');

    // input with numbers to guess
    this.input = rawInput.shift().split(',').map(number => parseInt(number));
    this.boards = [];

    let board = [];
    for (let i = 0; i < rawInput.length; i++) {

      // transform current line to array of numbers
      const currentLine = rawInput[i].split(' ').filter(Boolean).map(x => parseInt(x));

      // if current line has numbers
      if (currentLine.length === 5) {
        board.push(currentLine.map(x => ({ number: x, marked: false })));
      }

      // if board is full add it to boards array
      if (board.length === 5) {
        this.boards.push(board);
        board = [];
      }
    }
  }

  isBingo(board) {
    // check rows
    for (let i = 0; i < board.length; i++) {
      let isBingo = true;
      for (let j = 0; j < board[0].length; j++) {
        isBingo = isBingo && board[i][j].marked;
      }

      if (isBingo) {
        return true;
      }
    }

    // check columns
    for (let i = 0; i < board.length; i++) {
      let isBingo = true;
      for (let j = 0; j < board[0].length; j++) {
        isBingo = isBingo && board[j][i].marked;
      }

      if (isBingo) {
        return true;
      }
    }

    return false;
  }

  solve(part) {

    const winningBoards = [];

    // go through all numbers to guess and check if bingo
    for (const guess of this.input) {

      // go through all boards and mark numbers as already guessed
      for (const [index, board] of this.boards.entries()) {
        for (const line of board) {
          for (const entry of line) {
            if (entry.number === guess) {
              // console.log('Marking', guess, 'on board', index);
              entry.marked = true;
            }
          }
        }

        if (this.isBingo(board)) {
          // console.log('BINGO on board', index, 'with', guess);

          // only add board to winning boards if not there yet
          if (!winningBoards.find(x => x.index === index)) {
            winningBoards.push({ board: deepCopy(board), guess, index });
          }
        }
      }
    }

    // for part 1 take first winning board
    // for part 2 take last winnning board
    const { board, guess } = part === 1 ? winningBoards[0] : winningBoards[winningBoards.length - 1];

    const sumOfUnmarkedNumbers =
      board
        .flatMap(x => x)
        .filter(x => !x.marked)
        .map(x => x.number)
        .reduce((x, y) => x + y, 0);

    return sumOfUnmarkedNumbers * guess;
  }
};
