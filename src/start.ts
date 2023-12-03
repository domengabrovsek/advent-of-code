/// <reference types="./utils/types/global" />

import { existsSync, readFileSync, writeFileSync } from 'fs';

// load env variables
import * as dotenv from 'dotenv';
dotenv.config();

import { parse } from 'node-html-parser';

// generate solution template
const generateSolutionTemplate = () => `

export const solveOne = (input: string) => {
  // TODO: Implement part one
}

export const solveTwo = (input: string) => {
  // TODO: Implement part two
}
`;

// fetch instructions from AoC website and save them to file
const fetchInstructions = async (year: string, day: string) => {

  const inputPath = `${__dirname}/${year}/${day}/instructions.txt`;

  // read input from file if it exists
  if (existsSync(inputPath)) {
    console.log('Instructions already exist.');
    return;
  }

  const token = process.env.TOKEN;
  const url = `https://adventofcode.com/${year}/day/${Number(day)}`;
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${token}`
    }
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const text = await response.text();

    // Parsing the HTML content
    const root = parse(text);
    const articles = root.querySelectorAll('.day-desc');
    if (articles.length) {

      // save instrucitons to file
      console.log('Saving instructions to file.');
      writeFileSync(inputPath, articles.map(article => article.text.trim()).join('\n\n'), { encoding: 'utf-8' });
      console.log('Instructions saved to file.');

    } else {
      return 'Day description articles not found in the page content.';
    }

  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// fetch input from AoC API and save it to file
const fetchInput = async (year: string, day: string) => {

  const inputPath = `${__dirname}/${year}/${day}/input.txt`;

  // read input from file if it exists
  if (existsSync(inputPath)) {
    console.log('Input already exists.');
    return readFileSync(inputPath, { encoding: 'utf-8' });
  }

  console.log(`No cached input found for day ${day} year ${year} fetching it from AoC API.`);

  const token = process.env.TOKEN;
  const uri = `https://adventofcode.com/${year}/day/${Number(day)}/input`;
  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'text/plain',
      Cookie: `session=${token}`
    }
  };

  // fetch input from AoC API
  const result = await fetch(uri, options);

  // no errors
  if (result.status === 200) {

    console.log(`Got input for day ${day} from AoC API!`);

    // remove empty line at the end of the input
    const input = await result.text().then(text => text.trim());

    // save input to file
    console.log('Saving input to file ...');
    writeFileSync(inputPath, input, { encoding: 'utf-8' });
    console.log('Input saved to file.');

    return input;
  }

  throw new Error(JSON.stringify({ status: result.status, error: result.statusText }));
};

// read year and day from CLI argument
const readInputFromCLI = () => {

  // console.log('Reading input from CLI...')
  const currentYear = new Date().getFullYear();
  const year = process.argv[2];
  const day = process.argv[3];

  if (!year || !day) {
    console.log('Please provide a year and day.');
    console.log('Example usage: npm run init 2022 1');
    process.exit(1);
  }

  // add leading zero to day if not provided
  const formattedDay = day.padStart(2, '0');
  const formattedYear = year;

  if (Number(formattedDay) > 25 || Number(formattedDay) < 1) {
    console.log('Day must be between 1 and 25');
    process.exit(1);
  }

  if (Number(formattedYear) > currentYear || Number(formattedYear) < 2015) {
    console.log('Year must be between 2015 and 2023');
    process.exit(1);
  }

  return { year: formattedYear, day: formattedDay };
};

// start the program
const start = async () => {

  // read year and day from CLI argument
  const { year, day } = readInputFromCLI();
  const filePath = `${__dirname}/${year}/${day}/index.ts`;

  console.log(`Running solution for day ${day} year ${year}.`);

  // if no solution file exists, create it
  if (!existsSync(filePath)) {
    console.log('No solution file found, creating it.');
    writeFileSync(filePath, generateSolutionTemplate(), { encoding: 'utf-8' });
  }

  // import solution file
  const module = await import(filePath);

  // exit if no solution found
  if (!module) {
    console.log('No solution found for this day');
    process.exit(1);
  }

  // fetch input
  const input = await fetchInput(year, day);

  // fetch instructions
  await fetchInstructions(year, day);

  // run solution
  const { solveOne, solveTwo } = module;

  console.log(`Solving day ${day} year ${year} part one.`);
  const resultOne = solveOne(input);
  console.log('Result:', resultOne);

  console.log(`Solving day ${day} year ${year} part two.`);
  const resultTwo = solveTwo(input);
  console.log('Result:', resultTwo);
};

(async () => {
  await start();
})();