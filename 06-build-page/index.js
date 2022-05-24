const fs = require('fs');
const path = require('path');
const Promises = fs.promises;

const indexSource = path.join(__dirname, 'template.html');
const componentsSrc = path.join(__dirname, 'components');
const cssSource = path.join(__dirname, 'styles');
const assetsSource = path.join(__dirname, 'assets');

const destinationFolder = path.join(__dirname, 'project-dist');
const indexDestination = path.join(destinationFolder, 'index.html');
const cssDestination= path.join(destinationFolder, 'style.css');
const assetsDestination = path.join(destinationFolder, 'assets');
const cssWriteFile = fs.createWriteStream(cssDestination);

async function html () {
  await Promises.mkdir(destinationFolder, {recursive:true});
  let indexSrcData = await Promises.readFile(indexSource, 'utf-8');
  const components = await Promises.readdir(componentsSrc);
  for (let component of components) {
    let componentName = component.slice(0, component.lastIndexOf('.'));
    let componentPath = path.join(componentsSrc, `${component}`);
    let componentText = await Promises.readFile(componentPath, 'utf-8');
    indexSrcData = indexSrcData.replace(`{{${componentName}}}`, componentText);
  }
  await Promises.writeFile(indexDestination, indexSrcData);
  
}


async function cssAssemble(src){
  const cssSrcFiles = (await Promises.readdir(src, {withFileTypes: true})).reverse();
  [cssSrcFiles[0], cssSrcFiles[1]] = [cssSrcFiles[1], cssSrcFiles[0]];
  for (let file of cssSrcFiles) {
    let fileExtname = file.name.split('.').pop();
    let filePath = path.join(src, `${file.name}`);
    if (file.isFile() && fileExtname === 'css') {
      const cssReader = await fs.createReadStream(filePath);
      await cssReader.pipe(cssWriteFile);
    }
  }
} 
  
 
  
async function copyFolder (assetsSrc, assetsDist) {
  await Promises.rm(assetsDist, {recursive:true, force:true});
  await Promises.mkdir(assetsDist, {recursive:true});
  const assetsSrcFiles = await Promises.readdir(assetsSrc, {withFileTypes: true});

  for (let item of assetsSrcFiles) {
    if (item.isDirectory()) {
      let newAssetsSrc = path.join(assetsSrc, `${item.name}`);
      let newDestSrc = path.join(assetsDist, `${item.name}`);
      await copyFolder(newAssetsSrc, newDestSrc);
    } else {
      let srcFilePath = path.join(assetsSrc, `${item.name}`);
      let destFilePath = path.join(assetsDist, `${item.name}`);
      await Promises.copyFile(srcFilePath, destFilePath);
    }
  }
}

try {
  html ();
  console.log('Html файл готов.');
  copyFolder(assetsSource,assetsDestination);
  console.log('Папка assets скопирована.');
  cssAssemble(cssSource);
  console.log('CSS файл собран.');
  console.log('Проект собран. Убедитесь в правельной сборке запустив LiveServer.');
} catch (error) {
  console.log(error.message);
}
 