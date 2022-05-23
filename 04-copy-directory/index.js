const fs = require('fs');
const path = require('path');
const Promises = fs.promises;

const sourceFolder = path.join(__dirname, 'files');
const destinationFolder = path.join(__dirname, 'files-copy');

async function copyFolder(src, dest){
  await Promises.rm(dest, {recursive:true, force:true});
  await fs.promises.mkdir(dest, {recursive: true}, (err) => {
    if (err) return console.log(err.message);
  });
  const srcFiles = await Promises.readdir(src);
  for (let file of srcFiles) {
        
    let srcPath = path.join(src, `${file}`);
    let destPath = path.join(dest, `${file}`);
    await Promises.copyFile(srcPath, destPath);
  }
  console.log('Ваши данные скопированы.');
}
try {
  copyFolder(sourceFolder, destinationFolder);
} catch (error) {
  console.log(error.message);
}