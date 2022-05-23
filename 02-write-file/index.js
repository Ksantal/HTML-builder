const fs = require('fs');
const path = require('path');
const newFile = fs.createWriteStream(path.join(__dirname, 'NewList.txt'));
const readline = require('readline');
const fileInput = readline.createInterface({input: process.stdin});
// function list (content) {
//   const json = JSON.stringify(content);
//   fs.createWriteStream('NewList.txt', json, (error) => {
//     if (error) return console.error(error.message);
//     console.log('Здраствуйте. Что желаете записать?');});
// }
// readFile.on('error', error => console.log('Error', error.message));
//fs.createWriteStream(way);

fileInput.on('SIGINT', () => {
  console.log('Данные находятся в файле NewList.txt');
  fileInput.close();
});
fileInput.on('beforeExit',() =>{
  console.log('Данные находятся в файле NewList.txt');
});
fileInput.on('error', error => console.log(error.message));
console.log('Здраствуйте. Что желаете записать?\nВы можете выйти написав exit или нажав Ctl+C');
fileInput.on('line', (content) =>{
  if(content === 'exit') {
    fileInput.emit('SIGINT');
  } else{
    newFile.write(content + '\n');
  }
});