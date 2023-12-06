export const solveOne = (input: string) => {

  const [lineOne, lineTwo] = input.split('\n').map(x => x.split(':')[1].trim().split(' ').filter(x => x !== '').map(Number));
  const races = [];

  for (let i = 0; i < lineOne.length; i++) {
    races.push([lineOne[i], lineTwo[i]]);
  }

  const result = [];
  for (const race of races) {
    const [time, record] = race;

    let traveled = 0;
    let wins = 0;
    for (let i = 1; i <= time; i++) {

      const speed = i;
      traveled = speed * (time - i);

      if (traveled > record) {
        wins++;
      }
    }

    result.push(wins);
  }

  return result.reduce((a, b) => a * b, 1);

};

export const solveTwo = (input: string) => {
  const race = input.split('\n').map(x => x.split(':')[1].replaceAll(/\s/g, '')).map(Number);
  const [time, record] = race;

  let traveled = 0;
  let wins = 0;

  for (let i = 1; i <= time; i++) {

    const speed = i;
    traveled = speed * (time - i);

    if (traveled > record) {
      wins++;
    }
  }

  return wins;
};