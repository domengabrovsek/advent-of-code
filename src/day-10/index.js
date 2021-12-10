module.exports = class Day10 {

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

  mapChar(char) {
    switch (char) {
      case '{': return '}';
      case '(': return ')';
      case '<': return '>';
      case '[': return ']';
    }
  }

  median(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }

  solve(part) {

    const scoringDict = part === 1
      ?
      {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
      }
      :
      {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
      }

    let illegalCharsFound = [];
    let corruptedLines = [];
    let missingPieces = [];

    for (const [index, line] of this.input.entries()) {
      let stack = [line[0]];

      for (const char of line.split('')) {
        let previous = stack?.[stack.length - 1];

        // add opening parenthesis to stack
        if (['{', '(', '[', '<'].includes(char)) {
          stack.push(char);
        }

        // logic for closing parenthesis
        else {

          // if opening doesn't match closing it's illegal
          // save illegal character and corrupted line and stop
          if ((previous === '{' && char !== '}') ||
            (previous === '<' && char !== '>') ||
            (previous === '(' && char !== ')') ||
            (previous === '[' && char !== ']')) {
            illegalCharsFound.push(char);
            corruptedLines.push(index);
            stack = [];
            break;
          } 
          // if opening and closing parenthesis match, just continue
          else {
            stack.pop();
          }
        }
      }

      // save the remaining elements of stack map them to 
      // get missing pieces for incomplete lines
      if (stack?.length > 0) {
        stack = stack.reverse();
        stack.pop()
        missingPieces.push(stack.map(x => this.mapChar(x)));
      }
    }

    // part 1
    if (part === 1) {
      return illegalCharsFound
        .map(x => scoringDict[x])
        .reduce((sum, curr) => sum + curr, 0);
    }

    // part 2
    else if (part === 2) {
      return this.median(missingPieces
        .map(line => line
          .reduce((sum, char) => (sum * 5) + scoringDict[char], 0)));
    };
  }
}
