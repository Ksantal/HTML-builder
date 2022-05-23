const fs = require('fs');
const path = require('path');
const Promises = fs.promises;

const sourceFolder = path.join(__dirname, 'styles');
const destinationFolder = path.join(__dirname, 'project-dist', 'bundle.css');

const writeFile = fs.createWriteStream(destinationFolder);


async function cssAssemble (src){
  
  const srcFiles = await Promises.readdir(src, {withFileTypes:true});
  for (let file of srcFiles){
    let fileExtname = file.name.split('.').pop();
    let filePath = path.join(src, `${file.name}`);

    if (file.isFile() && fileExtname === 'css') {
      const readFile = await fs.createReadStream(filePath);
      readFile.pipe(writeFile);
    }

  }
}

try {
  cssAssemble(sourceFolder);
  console.log('Ваш CSS файл создан. Убедитесь в правельной сборке запустив LiveServer.');
} catch (error) {
  console.log(error.message);
}