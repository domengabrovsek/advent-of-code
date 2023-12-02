const solve = (input: string) => {

  // restictions for part 1
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  const possibleGames: number[] = [];
  const powers: number[] = [];

  input.split('\n').forEach(line => {

    const reds: number[] = [];
    const greens: number[] = [];
    const blues: number[] = [];

    const [game, cubeSubsets] = line.split(':');
    const gameId = game.split(' ')[1];
    cubeSubsets.split(';').forEach(subset => {
      const cubes = subset.split(',').map(cube => cube.trim());

      cubes.forEach(cube => {
        const [value, color] = cube.split(' ');
        if (color === 'red') {
          reds.push(parseInt(value));
        } else if (color === 'green') {
          greens.push(parseInt(value));
        } else if (color === 'blue') {
          blues.push(parseInt(value));
        }
      });
    });

    // for part 1
    if (Math.max(...reds) <= maxRed && Math.max(...greens) <= maxGreen && Math.max(...blues) <= maxBlue) {
      possibleGames.push(Number(gameId));
    }

    // for part 2
    powers.push((Math.max(...reds) * Math.max(...greens) * Math.max(...blues)));
  });

  return {
    partOne: possibleGames.reduce((acc: number, curr: number) => acc + curr, 0),
    partTwo: powers.reduce((acc: number, curr: number) => acc + curr, 0)
  };
};

export const solveOne = (input: string) => {
  return solve(input).partOne;
};

export const solveTwo = (input: string) => {
  return solve(input).partTwo;
};
