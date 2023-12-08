/* eslint-disable complexity */

type Card = [string, number];

const compareHands = (hand1: string, hand2: string) => {

  const parsedHandOne = hand1.split('').map(card => mapRank(card));
  const parsedHandTwo = hand2.split('').map(card => mapRank(card));

  for (let i = 0; i < 5; i++) {
    if (parsedHandOne[i] > parsedHandTwo[i]) {
      return 1;
    }
    else if (parsedHandOne[i] < parsedHandTwo[i]) {
      return 2;
    }
  }
};

const mapRank = (rank: string): number => {

  switch (rank) {
    case 'A': return 14;
    case 'K': return 13;
    case 'Q': return 12;
    case 'J': return 11;
    case 'T': return 10;
    default: return parseInt(rank);
  }
};

const getStrengthWithJokers = (hand: string) => {

  const numberOfJokers = hand.match(/J/g)?.length || 0;
  const strength = getStrength(hand);

  // no jokers, strength stays the same
  if (numberOfJokers === 0) return strength;

  // five of a kind, strength is 7
  if (strength === 7) return 7;

  // four of a kind with four jokers,  strength is 6 (four of a kind)
  if (numberOfJokers === 4 || strength === 6) return 6;

  // four of a kind with one joker, strength is 7 (five of a kind)
  if (numberOfJokers === 1 && strength === 6) return 7;

  // three of a kind with three jokers, strength is 6 (four of a kind)
  if (numberOfJokers === 3 && strength === 4) return 6;

  // three of a kind with two jokers, strength is 7 (five of a kind)
  if (numberOfJokers === 2 && strength === 4) return 7;

  // three of a kind with one joker, strength is 6 (four of a kind)
  if (numberOfJokers === 1 && strength === 4) return 6;

  // two pairs with one joker, strength is 5 (full house)
  if (numberOfJokers === 1 && strength === 3) return 5;

  // two pairs with two jokers, strength is 6 (four of a kind)
  if (numberOfJokers === 2 && strength === 3) return 6;

  // one pair with two jokers, strength is 6 (four of a kind)
  if (numberOfJokers === 2 && strength === 2) return 6;

  // one pair with one joker, strength is 4 (three of a kind)
  if (numberOfJokers === 1 && strength === 2) return 4;

  // one of kind with 1 joker, strength is 2 (one pair)
  if (numberOfJokers === 1 && strength === 1) return 2;

  throw new Error('something went wrong');
};

export const getStrength = (hand: string): number => {
  const cards: Card[] = [];

  for (const card of hand.split('')) {
    const current = cards.find(c => c[0] === card);
    current ? current[1]++ : cards.push([card, 1]);
  }

  const highest: Card[] = [];

  for (const card of cards) {
    if (Math.max(...cards.map(c => c[1])) === card[1]) {
      highest.push(card);
    }
  }

  // high card = 1
  if (highest.length === 5) {
    return 1;
  }

  // one pair = 2
  if (cards.length === 4 && highest.length === 1) {
    return 2;
  }

  // two pair = 3
  else if (highest.length === 2 && highest[0][1] === 2 && highest[1][1] === 2) {
    return 3;
  }

  // three of a kind = 4
  if (highest.length === 1 && highest[0][1] === 3) {
    return 4;
  }

  // full house = 5
  if (highest.length === 2 && highest[1][1] === 2 && highest[0][1] === 3) {
    return 5;
  }

  // four of a kind
  if (highest[0][1] === 4) {
    return 6;
  }

  // five of a kind
  if (highest[0][1] === 5) {
    return 7;
  }

  else {
    console.log('something went wrong');
  }
};

export const solveOne = (input: string) => {

  const lines = input.split('\n');

  const hands: [string, number, number][] = lines
    .map(line => {
      const [hand, bid] = line.split(' ');
      return [hand, getStrength(hand), parseInt(bid)] as [string, number, number];
    })
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1];
      }

      const parsedHandOne = a[0].split('').map(card => mapRank(card));
      const parsedHandTwo = b[0].split('').map(card => mapRank(card));

      for (let i = 0; i < parsedHandOne.length; i++) {
        if (parsedHandOne[i] !== parsedHandTwo[i]) {
          return parsedHandTwo[i] - parsedHandOne[i];
        }
      }
    });

  const sorted = [];

  while (hands.length > 0) {

    if (hands.length === 1) {
      sorted.push(hands[0]);
      break;
    }

    const first = hands[0];
    const second = hands[1];

    if (first[1] > second[1]) {
      sorted.push(first);
      hands.shift();
    }
    else if (first[1] === second[1]) {
      const bigger = compareHands(first[0], second[0]);

      if (bigger === 1) {
        sorted.push(first);
        hands.shift();
      }
      else {
        sorted.push(second);
        hands.splice(1, 1);
      }
    }
    else {
      console.log('something went wrong');
    }
  }

  return sorted
    .map((hand, index) => hand[2] * (sorted.length - index))
    .reduce((acc, curr) => acc + curr, 0);
};

export const solveTwo = (input: string) => {

  const lines = input.split('\n');

  const hands: [string, number, number][] = lines
    .map(line => {
      const [hand, bid] = line.split(' ');
      return [hand, getStrengthWithJokers(hand), parseInt(bid)] as [string, number, number];
    })
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1];
      }

      const parsedHandOne = a[0].split('').map(card => mapRank(card));
      const parsedHandTwo = b[0].split('').map(card => mapRank(card));

      for (let i = 0; i < parsedHandOne.length; i++) {
        if (parsedHandOne[i] !== parsedHandTwo[i]) {
          return parsedHandTwo[i] - parsedHandOne[i];
        }
      }
    });

  const sorted = [];

  while (hands.length > 0) {

    if (hands.length === 1) {
      sorted.push(hands[0]);
      break;
    }

    const first = hands[0];
    const second = hands[1];

    if (first[1] > second[1]) {
      sorted.push(first);
      hands.shift();
    }
    else if (first[1] === second[1]) {
      const bigger = compareHands(first[0], second[0]);

      if (bigger === 1) {
        sorted.push(first);
        hands.shift();
      }
      else {
        sorted.push(second);
        hands.splice(1, 1);
      }
    }
    else {
      console.log('something went wrong');
    }
  }

  // 254412181 right

  // 254052049

  // 255803527 too high
  // 254908906 too high

  // 253865059 too low

  // 253853413 not right
  // 254052049 not right

  return sorted
    .map((hand, index) => hand[2] * (sorted.length - index))
    .reduce((acc, curr) => acc + curr, 0);
};