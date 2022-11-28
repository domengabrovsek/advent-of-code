const fs = require('fs');
const folders = fs.readdirSync('./src/2021').filter(name => name.includes('day'));
const root = './src/2021';

folders.forEach(folderName => {
  // copy source files
  fs.copyFileSync(`${root}/${folderName}/index.js`, `${root}/solutions/${folderName}.js`);

  // copy inputs
  fs.copyFileSync(`${root}/${folderName}/tests/input.txt`, `${root}/inputs/${folderName}.txt`);

  // copy tests
  fs.copyFileSync(`${root}/${folderName}/tests/${folderName}.test.js`, `${root}/tests/${folderName}.test.js`);
})
