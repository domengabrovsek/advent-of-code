
const countNumberOfMatches = (min, max, checkNumberOfAdjacentDigits) => {

  let matches = 0;

  for (let i = min; i <= max; i++) {
    if (matchesCriteria(i, checkNumberOfAdjacentDigits)) {
      matches++;
    }
  }

  return matches;
}

const countAdjacentOccurences = (number, digit) => {

  const numberAsString = String(number);
  let length = numberAsString.includes(digit) ? 1 : 0;

  for (let i = 0; i < numberAsString.length; i++) {
    const a = parseInt(numberAsString[i]);
    const b = parseInt(numberAsString[i + 1]);

    if (a === b && a == digit) {
      length++;
    }
  }

  return length;
}

const areDigitsNotDecreasing = (number) => {

  for (let i = 0; i < number.length; i++) {

    const a = parseInt(number[i]);
    const b = parseInt(number[i + 1]);

    // previous digit should not decrease
    if (a > b) {
      return false
    }
  }

  return true;
}

const lengthMatches = (number, length) => String(number).length === length;

const matchesCriteria = (number, checkNumberOfAdjacentDigits) => {

  const numberAsString = String(number);
  const noDecreasingDigits = areDigitsNotDecreasing(numberAsString);
  const lengthIsSix = lengthMatches(number, 6);
  const occurences = {};

  numberAsString.split('').forEach(digit => {
    occurences[digit] = countAdjacentOccurences(numberAsString, digit);
  })

  const sameAdjacentDigits =
    Object.keys(occurences)
      .some(digit => occurences[digit] > 1);

  const groupsWithAtLeastTwoAdjacentDigits =
    Object.keys(occurences)
      .filter(digit => occurences[digit] >= 2)
      .map(digit => occurences[digit]);

  const partOfLargerGroup =
    (groupsWithAtLeastTwoAdjacentDigits.length === 1 && groupsWithAtLeastTwoAdjacentDigits[0] === 2) ||
    (groupsWithAtLeastTwoAdjacentDigits.length > 1 && groupsWithAtLeastTwoAdjacentDigits.some(group => group % 2 === 0))

  const result =
    lengthIsSix &&
    sameAdjacentDigits &&
    noDecreasingDigits;

  if (checkNumberOfAdjacentDigits) {
    return result && partOfLargerGroup;
  }

  return result
}

module.exports = {
  matchesCriteria,
  countNumberOfMatches,
  countAdjacentOccurences
}