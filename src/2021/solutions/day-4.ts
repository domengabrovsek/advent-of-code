/* This file contains solution for AoC puzzle day 4 */

import { deepCopy, getYear, getDay, getInput } from '../../utils/utils';

const prepareBoards = (input: any) => {
  let boards = [];
  let board = [];
  for (let i = 0; i < input.length; i++) {

    // transform current line to array of numbers
    const currentLine = input[i].split(' ').filter(Boolean).map((x: any) => parseInt(x));

    // if current line has numbers
    if (currentLine.length === 5) {
      board.push(currentLine.map((x: any) => ({ number: x, marked: false })));
    }

    // if board is full add it to boards array
    if (board.length === 5) {
      boards.push(board);
      board = [];
    }
  }
  return boards;
}

const isBingo = (board: any) => {
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

export const solveOne = async () => {

  // raw input
  const input = await getInput(getYear(__filename), getDay(__filename));
  const rawInput = input.split('\n');
  const parsedInput = input.split('\n').shift().split(',').map(number => parseInt(number));
  const boards = prepareBoards(rawInput);

  const winningBoards: any = [];

  // go through all numbers to guess and check if bingo
  for (const guess of parsedInput) {

    // go through all boards and mark numbers as already guessed
    for (const [index, board] of boards.entries()) {
      for (const line of board) {
        for (const entry of line) {
          if (entry.number === guess) {
            // console.log('Marking', guess, 'on board', index);
            entry.marked = true;
          }
        }
      }

      if (isBingo(board)) {
        // console.log('BINGO on board', index, 'with', guess);

        // only add board to winning boards if not there yet
        if (!winningBoards.find((x: any) => x.index === index)) {
          winningBoards.push({ board: deepCopy(board), guess, index });
        }
      }
    }
  }

  const { board, guess } = winningBoards[0];

  const sumOfUnmarkedNumbers =
    board
      .flatMap((x: any) => x)
      .filter((x: any) => !x.marked)
      .map((x: any) => x.number)
      .reduce((x: any, y: any) => x + y, 0);

  return sumOfUnmarkedNumbers * guess;
}


export const solveTwo = async () => {

 // raw input
 const input = await getInput(getYear(__filename), getDay(__filename));
 const rawInput = input.split('\n');
 const parsedInput = input.split('\n').shift().split(',').map(number => parseInt(number));
 const boards = prepareBoards(rawInput);

 const winningBoards: any = [];

 // go through all numbers to guess and check if bingo
 for (const guess of parsedInput) {

   // go through all boards and mark numbers as already guessed
   for (const [index, board] of boards.entries()) {
     for (const line of board) {
       for (const entry of line) {
         if (entry.number === guess) {
           // console.log('Marking', guess, 'on board', index);
           entry.marked = true;
         }
       }
     }

     if (isBingo(board)) {
       // console.log('BINGO on board', index, 'with', guess);

       // only add board to winning boards if not there yet
       if (!winningBoards.find((x: any) => x.index === index)) {
         winningBoards.push({ board: deepCopy(board), guess, index });
       }
     }
   }
 }

 const { board, guess } = winningBoards[winningBoards.length - 1];

 const sumOfUnmarkedNumbers =
   board
     .flatMap((x: any) => x)
     .filter((x: any) => !x.marked)
     .map((x: any) => x.number)
     .reduce((x: any, y: any) => x + y, 0);

 return sumOfUnmarkedNumbers * guess;
}
