const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' }).split('\n').map(x => x.replace('\r', ''));

const preparePassports = (input) => {

  const passports = [];
  let currentPassport = {};

  for (const row of input) {
    const chunks = row.split(' ');
    for (const chunk of chunks) {
      const [key, value] = chunk.split(':');
      currentPassport[key] = value;
      if (chunk === '') {
        passports.push(currentPassport)
        currentPassport = {};
      }
    }
  }

  return passports;
}

const isByrValid = byr => byr && byr.length === 4 && byr >= 1920 && byr <= 2002;
const isIyrValid = iyr => iyr && iyr.length === 4 && iyr >= 2010 && iyr <= 2020;
const isEyrValid = eyr => eyr && eyr.length === 4 && eyr >= 2020 && eyr <= 2030;
const isHgtValid = hgt => {

  const number = hgt && hgt.match(/\d{1,9}/);
  const unit = hgt && hgt.match(/cm|in/);

  if (!number || !unit) {
    return false;
  }

  switch (unit[0]) {
    case 'in': return number >= 59 && number <= 76;
    case 'cm': return number >= 150 && number <= 193;
  }

};
const isHclValid = hcl => hcl && hcl.match(/#(\d|[a-f]){6}/);
const isEclValid = ecl => ecl && ecl.match(/amb|blu|brn|gry|grn|hzl|oth/);
const isPidValid = pid => pid && pid.match(/\d{9}/) && pid.length === 9;

const isValidPassport = (passport, part) => {

  const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  if (part === 1) {
    return fields.every(field => Object.keys(passport).includes(field));
  }
  else if (part === 2) {
    return fields.every(field => {
      return Object.keys(passport).includes(field) &&
        isByrValid(passport.byr) &&
        isIyrValid(passport.iyr) &&
        isEyrValid(passport.eyr) &&
        isHgtValid(passport.hgt) &&
        isHclValid(passport.hcl) &&
        isEclValid(passport.ecl) &&
        isPidValid(passport.pid);
    });
  }
}

const countValidPassports = (input, part) => preparePassports(input).filter(p => isValidPassport(p, part)).length;

// test

// part 1
const noOfValidPassports1 = countValidPassports(input, 1);
console.log(noOfValidPassports1);

// part 2
const noOfValidPassports2 = countValidPassports(input, 2);
console.log(noOfValidPassports2);
