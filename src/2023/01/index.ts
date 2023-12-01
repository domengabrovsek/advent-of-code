export const solveOne = (input: string) => {

  const rows = input.split('\n');

  let sum = 0;

  for (let i = 0; i < rows.length; i++) {

    const digits = rows[i].match(/\d/g);

    let min = digits[0];
    let max = digits[digits.length - 1];

    if (min && max) {
      const number = Number(`${min}${max}`);
      sum += number;
    }
  }

  return sum; // 55017
}

export const solveTwo = (input: string) => {

  input = input.replaceAll('twone', 'twoone');
  input = input.replaceAll('eightwo', 'eighttwo');
  input = input.replaceAll('eightone', 'eightone');
  input = input.replaceAll('oneight', 'oneeight');
  
  const rows = input.split('\n');

  let sum = 0;

  const dict: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

  for (let i = 0; i < rows.length; i++) {

    let digits = rows[i].match(regex).map(digit => isNaN(Number(digit)) ? dict[digit] : Number(digit));

    let min = digits[0];
    let max = digits[digits.length - 1];

    if (!isNaN(min) && !isNaN(max)) {
      const number = Number(`${min}${max}`);
      sum += number;
    }
  }

  return sum; // 53539
};