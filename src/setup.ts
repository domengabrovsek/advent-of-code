import { existsSync, mkdirSync } from 'fs';

// read year from CLI argument
const readYearFromCLI = () => {
  const year = Number(process.argv[2]);

  if (!year) {
    console.log('Please provide a year.');
    console.log('Example usage: npm run init 2022');
    process.exit(1);
  }

  return year;
}

// setup the initial structure for a year
const setup = (year: number) => {

  // create year folder if it doesn't exist yet
  if (!existsSync(`src/${year}`)) {
    mkdirSync(`src/${year}`);
  }

  // create folders for all days
  console.log('Creating folders for all days...');
  for (let i = 1; i <= 25; i++) {
    const day = i < 10 ? `0${i}` : i;

    // create day folder if it doesn't exist yet
    if (!existsSync(`src/${year}/${day}`)) {
      mkdirSync(`src/${year}/${day}`);
    }
  }
}

// read year from CLI argument
const year = readYearFromCLI();

// setup year folder
setup(year);