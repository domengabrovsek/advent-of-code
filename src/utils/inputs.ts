// setup env variables
import * as dotenv from 'dotenv';
dotenv.config();

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

export const getInput = async (year: number, day: number) => {

  const INPUTS_FOLDER = `./src/${year}/inputs`;

  console.log('Fetching input ...');

  // create inputs folder if it doesn't exist yet
  if (!existsSync(INPUTS_FOLDER)) {
    mkdirSync(INPUTS_FOLDER);
  }

  console.log(`${INPUTS_FOLDER}/day-${day}.txt`);

  // read input from file if it exists
  if (existsSync(`${INPUTS_FOLDER}/day-${day}.txt`)) {
    console.log('Found cached input! Returning it.');
    return readFileSync(`${INPUTS_FOLDER}/day-${day}.txt`, { encoding: 'utf-8' });
  }

  console.log('No cached input found, fetching it from AoC API ...')

  const token = process.env.TOKEN;
  const uri = `https://adventofcode.com/${year}/day/${day}/input`;
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

    const input = await result.text();

    // save it to file for future use
    console.log('Saving input to file ...');
    writeFileSync(`src/${year}/inputs/day-${day}.txt`, input, { encoding: 'utf-8' });
    console.log('Input saved to file. Returning it.');

    return input;
  }

  throw new Error(JSON.stringify({ status: result.status, error: result.statusText }));
};

export const getAllInputs = async (year: number) => {

  const promises = [];

  for (let day = 1; day <= 25; day++) {
    promises.push(getInput(year, day));
  }

  await Promise.all(promises);
};
