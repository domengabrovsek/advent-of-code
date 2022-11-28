import { range } from 'lodash';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { getSourceTemplate, getIndexTemplate } from '../utils/utils';

// take year from CLI argument
const year = Number(process.argv[2]);

if (!year) {
  console.log('Please provide a year.');
  console.log('Example usage: npm run init 2022');
  process.exit(1);
}

const SOLUTIONS_FOLDER = `src/${year}/solutions`;

// create solutions folder if it doesn't exist yet
if (!existsSync(SOLUTIONS_FOLDER)) {
  console.log('Creating solutions folder...');
  mkdirSync(SOLUTIONS_FOLDER);
}

// generate initial source file for each day
console.log('Generating template source files...');
range(1, 26).forEach(day => {
  const sourceTemplate = getSourceTemplate(day);
  writeFileSync(`${SOLUTIONS_FOLDER}/day-${day}.ts`, sourceTemplate, { encoding: 'utf-8' });
})

// generate index file
console.log(`Generating index file for year '${year}'...`);
const indexTemplate = getIndexTemplate();
writeFileSync(`src/${year}/index.ts`, indexTemplate, { encoding: 'utf-8' });

console.log('Done');