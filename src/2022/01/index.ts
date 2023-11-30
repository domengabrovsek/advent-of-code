const sumCalories = (input: string[]) => {
  const calories = [];

  let current = 0;

  for (let i = 0; i < input.length; i++) {

    let row = parseInt(input[i]);

    if (row) {
      current += row;
    } else {
      calories.push(current);
      current = 0;
    }
  }

  return calories;
}


export const solveOne = (input: string) => {
  const parsedInput = input.split('\n');
  const calories = sumCalories(parsedInput);
  return Math.max(...calories);
}

export const solveTwo = (input: string) => {
  const parsedInput = input.split('\n');
  const calories = sumCalories(parsedInput);
  const topThree = calories.sort();
  return (topThree.pop() + topThree.pop() + topThree.pop());
}
