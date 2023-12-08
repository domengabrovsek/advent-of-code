export const solveOne = (input: string) => {

  const lines = input.split('\n');

  let sum = 0;

  for (const line of lines) {
    let points = 0;
    const [winners, cards] = line.split(':')[1].split('|').map(x => x.trim().split(' ').filter(x => x));

    cards.forEach(card => {
      if (winners.includes(card)) {
        // console.log('winners include: ', { card });

        if (points === 0) {
          points += 1;
        } else {
          points *= 2;
        }
      }
    });

    sum += points;
  }

  return sum;
};

export const solveTwo = (input: string) => {

  // remove multiple spaces
  input = input.replace(/[^\S\r\n]+/g, ' ');

  const lines = input.split('\n');

  // Map<line, copies>
  const copies = new Map<number, number>();

  // init values 
  lines.forEach((line, index) => copies.set(index + 1, 1));

  for (const line of lines) {
    let matches = 0;
    const cardNumber = Number(line.split(':')[0].split(' ')[1]);
    const [winners, cards] = line.split(':')[1].split('|').map(x => x.trim().split(' ').filter(x => x));

    cards.forEach(card => {
      if (winners.includes(card)) {
        matches++;
      }
    });

    for (let i = 1; i <= matches; i++) {
      const cardNumberCurrentValue = copies.get(cardNumber);
      const currentValue = copies.get(cardNumber + i);
      copies.set(cardNumber + i, cardNumberCurrentValue + currentValue);
    }
  }

  return Array.from(copies.values()).reduce((acc, curr) => acc + curr, 0);
};
