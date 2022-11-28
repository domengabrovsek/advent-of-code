// https://adventofcode.com/2019/day/1

// function for calculation of fuel for part 1
const calculateFuel = (mass) => Math.floor(mass / 3) - 2;

// function for calculation of fuel for part 2
const calculateFuelForFuel = (mass) => {

  let sum = 0;

  while (mass > 0) {
    let fuel = Math.max(calculateFuel(mass), 0);
    sum += fuel;
    mass = fuel;
  }

  return sum;
}

// function to sum calculated values
const sumCalculatedValues = (input, func) => input.reduce((sum, curr) => func(curr) + sum, 0);

module.exports = { calculateFuel, sumCalculatedValues, calculateFuelForFuel }