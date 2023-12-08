/* eslint-disable complexity */
enum CardType {
  HighCard = 1,
  OnePair = 2,
  TwoPairs = 3,
  ThreeOfAKind = 4,
  FullHouse = 5,
  FourOfAKind = 6,
  FiveOfAKind = 7
}

type Card = [string, number];

export const compareHands = (hand1: string, hand2: string, partTwo?: boolean) => {

  const parsedHandOne = hand1.split('').map(card => mapRank(card, partTwo));
  const parsedHandTwo = hand2.split('').map(card => mapRank(card, partTwo));

  for (let i = 0; i < 5; i++) {
    if (parsedHandOne[i] > parsedHandTwo[i]) {
      return 1;
    }
    else if (parsedHandOne[i] < parsedHandTwo[i]) {
      return 2;
    }
  }
};

export const getCardTypeWithJokers = (hand: string): CardType => {

  const numberOfJokers = hand.match(/J/g)?.length || 0;
  const cardType = getCardType(hand);

  // no jokers, strength stays the same
  if (numberOfJokers === 0) return cardType;

  // five of a kind, strength is 7
  if (cardType === CardType.FiveOfAKind) return CardType.FiveOfAKind;

  // four of a kind with four jokers,  strength is 6 (four of a kind)
  if (numberOfJokers === 4 && cardType === CardType.FourOfAKind) return CardType.FiveOfAKind;

  // four of a kind with one joker, strength is 7 (five of a kind)
  if (numberOfJokers === 1 && cardType === CardType.FourOfAKind) return CardType.FiveOfAKind;

  // full house with two jokers, strength is 7 (five of a kind)
  if (numberOfJokers === 2 && cardType === CardType.FullHouse) return CardType.FiveOfAKind;

  // full house with three jokers, strength is 7 (five of a kind)
  if (numberOfJokers === 3 && cardType === CardType.FullHouse) return CardType.FiveOfAKind;

  // three of a kind with three jokers, strength is 6 (four of a kind)
  if (numberOfJokers === 3 && cardType === CardType.ThreeOfAKind) return CardType.FourOfAKind;

  // three of a kind with two jokers, strength is 7 (five of a kind)
  if (numberOfJokers === 2 && cardType === CardType.ThreeOfAKind) return CardType.FiveOfAKind;

  // three of a kind with one joker, strength is 6 (four of a kind)
  if (numberOfJokers === 1 && cardType === CardType.ThreeOfAKind) return CardType.FourOfAKind;

  // two pairs with one joker, strength is 5 (full house)
  if (numberOfJokers === 1 && cardType === CardType.TwoPairs) return CardType.FullHouse;

  // two pairs with two jokers, strength is 6 (four of a kind)
  if (numberOfJokers === 2 && cardType === CardType.TwoPairs) return CardType.FourOfAKind;

  // one pair with two jokers, strength is 4 (four of a kind)
  if (numberOfJokers === 2 && cardType === CardType.OnePair) return CardType.ThreeOfAKind;

  // one pair with one joker, strength is 4 (three of a kind)
  if (numberOfJokers === 1 && cardType === CardType.OnePair) return CardType.ThreeOfAKind;

  // one of kind with 1 joker, strength is 2 (one pair)
  if (numberOfJokers === 1 && cardType === CardType.HighCard) return CardType.OnePair;

  throw new Error('something went wrong');
};

const mapRank = (rank: string, partTwo?: boolean): number => {

  switch (rank) {
    case 'A': return 14;
    case 'K': return 13;
    case 'Q': return 12;
    case 'J': return partTwo ? 1 : 11;
    case 'T': return 10;
    default: return parseInt(rank);
  }
};

export const getCardType = (hand: string): CardType => {

  const cards: Card[] = [];

  let result;

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
    result = CardType.HighCard;
  }

  // one pair = 2
  else if (cards.length === 4 && highest.length === 1) {
    result = CardType.OnePair;
  }

  // two pair = 3
  else if (highest.length === 2 && highest[0][1] === 2 && highest[1][1] === 2) {
    result = CardType.TwoPairs;
  }

  // three of a kind = 4
  else if (cards.length === 3 && highest.length === 1 && highest[0][1] === 3) {
    result = CardType.ThreeOfAKind;
  }

  // full house = 5
  else if (highest.length === 1 && cards.length === 2 && highest[0][1] === 3) {
    result = CardType.FullHouse;
  }

  // four of a kind
  else if (highest[0][1] === 4) {
    result = CardType.FourOfAKind;
  }

  // five of a kind = 7
  else if (cards.length === 1 && highest.length === 1) {
    result = CardType.FiveOfAKind;
  }

  else {
    throw new Error('something went wrong');
  }

  return result;
};

export const solveOne = (input: string) => {

  const lines = input.split('\n');

  const hands: [string, number, number][] = lines
    .map(line => {
      const [hand, bid] = line.split(' ');
      return [hand, getCardType(hand), parseInt(bid)] as [string, number, number];
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
      return [hand, getCardTypeWithJokers(hand), parseInt(bid)] as [string, number, number];
    })
    .sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] - a[1];
      }

      const parsedHandOne = a[0].split('').map(card => mapRank(card, true));
      const parsedHandTwo = b[0].split('').map(card => mapRank(card, true));

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
      const bigger = compareHands(first[0], second[0], true);

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