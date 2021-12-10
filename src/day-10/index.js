module.exports = class Day9 {

  constructor(fileName) {
    this.parseInput(fileName);
  }

  parseInput(fileName) {
    if (!fileName) return;
    this.input =
      require('fs')
        .readFileSync(fileName, { encoding: 'utf-8' })
        .split('\n');
  }

  solve(part) {

    const scoringDict = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137
    };

    let illegalCharsFound = [];

    for (const line of this.input) {
      let stack = [line[0]];

      for (const char of line.split('')) {
        let previous = stack?.[stack.length - 1];

        // add to stack
        if (['{', '(', '[', '<'].includes(char)) {
          stack.push(char);
        }

        // remove from stack
        else {
          if ((previous === '{' && char !== '}') ||
            (previous === '<' && char !== '>') ||
            (previous === '(' && char !== ')') ||
            (previous === '[' && char !== ']')) {
            illegalCharsFound.push(char);
            break;
          } else {
            stack.pop();
          }
        }
      }
    }

    return illegalCharsFound.map(x => scoringDict[x]).reduce((x, y) => x + y, 0);

  }
}

// {([(<{}[<>[]}>{[]{[(<()> - Expected ], but found } instead.
// [[<[([]))<([[{}[[()]]] - Expected ], but found ) instead.
// [{[{({}]{}}([{[{{{}}([] - Expected ), but found ] instead.
// [<(<(<(<{}))><([]([]() - Expected >, but found ) instead.
// <{([([[(<>()){}]>(<<{{ - Expected ], but found > instead.