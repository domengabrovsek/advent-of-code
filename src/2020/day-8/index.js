'use strict';

const { readFile } = require('../helpers');
const input = readFile(`${__dirname}\\input.txt`);

const runCommands = (input, commandToSwitch) => {
  let alreadyExecutedCommands = {};
  let accumulator = 0;
  let index = 0;
  let success = false;

  while (true) {

    // if program wants to run next instruction after last one in the file
    // this means it terminated successfully
    if (index === input.length) {
      success = true;
      break;
    }

    // if command was not executed yet add it to the already executed commands dictionary
    // if command was already executed, increase its counter of executions by 1
    alreadyExecutedCommands[index] = !alreadyExecutedCommands[index]
      ? 1
      : alreadyExecutedCommands[index] += 1

    // if command is about to be executed for the second time stop the program
    if (alreadyExecutedCommands[index] > 1) {
      break;
    }

    let commandToExecute = input[index];

    // if command to switch is provided (part 2) and index is matching
    // then switch it before execution
    if (commandToSwitch && index === commandToSwitch.index) {
      commandToExecute = switchCommand(commandToSwitch.item);
    }

    // split row by whitespace to get command and number
    // remove + sign from number and parse it as integer
    const parts = commandToExecute.split(' ');
    const command = parts[0];
    const number = parseInt(parts[1].replace('+', ''));

    switch (command) {
      case 'acc': {
        accumulator += parseInt(number);
        index += 1;
        break;
      }
      case 'jmp': {
        index += number;
        break;
      }
      default: {
        index += 1;
        break;
      }
    }

    // for debugging
    // console.log(`command: ${command} ${number}, acc: ${accumulator}`);
  }

  return { accumulator, success };
}

const switchCommand = (command) => {
  return command.includes('jmp')
    ? command.replace('jmp', 'nop')
    : command.replace('nop', 'jmp');
}

const repairProgram = (input) => {

  // find all commands which are candidates to be switched in order to repair the program
  // candidates are all 'jmp' and 'nop' commands
  const commandsToSwitch = input
    .map((item, index) => ({ index, item }))
    .filter(row => !row.item.includes('acc'));

  // run and switch commands one by one and return if successful
  for (let command of commandsToSwitch) {
    const result = runCommands(input, command);
    if (result.success) {
      return result;
    }
  }
}

const result = {
  partOne: runCommands(input), // 1217
  partTwo: repairProgram(input) // 501
}

console.log(result);

module.exports = {
  switchCommand
}