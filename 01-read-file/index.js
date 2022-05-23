const fs = require('fs');
const path = require('path');
const fileRead = path.join(__dirname, 'text.txt');
const readFile = fs.createReadStream(fileRead, 'utf-8');
let file = '';
readFile.on('data', chunk => file += chunk);
readFile.on('end', () => console.log(file));
readFile.on('error', error => console.log('Error', error.message));