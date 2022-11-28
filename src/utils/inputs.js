// setup env variables
require('dotenv').config();

const fs = require('fs');

const getInput = async (year, day) => {

  console.log('Fetching input ...');

  // create inputs folder if it doesn't exist yet
  if (!fs.existsSync(`src/${year}/inputs`)) {
    fs.mkdirSync(`src/${year}/inputs`);
  }

  // read input from file if it exists
  if (fs.existsSync(`src/${year}/inputs/day-${day}.txt`)) {
    console.log('Found cached input! Returning it.');
    return fs.readFileSync(`src/${year}/inputs/day-${day}.txt`);
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
    fs.writeFileSync(`src/${year}/inputs/day-${day}.txt`, input, { encoding: 'utf-8' });
    console.log('Input saved to file. Returning it.');

    return input;
  }

  throw new Error(JSON.stringify({ status: result.status, error: result.statusText }));
};

const getAllInputs = async (year) => {

  const promises = [];

  for (let day = 1; day <= 25; day++) {
    promises.push(getInput(year, day));
  }

  await Promise.all(promises);
};

module.exports = { getInput, getAllInputs };
