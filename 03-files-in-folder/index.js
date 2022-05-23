const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');


async function readFolder (folderPathWay) {
  const data = await fs.promises.readdir(folderPathWay, {withFileTypes: true});
  for(let file of data){
    if(file.isFile()){
      const nameFile = file.name;
      const pathFile = path.join(folderPathWay, nameFile);
      fs.stat(pathFile, function(err, stats) {
        if (err){
          return err.message;
        } else{
          const nameFileResult = path.basename(pathFile);
          const extFileResult = path.extname(pathFile);
          const fileSize = (stats.size/ 1024);
          console.log(`${nameFileResult.split('.')[0]} - ${extFileResult.slice(1)} - ${fileSize.toFixed(3)}kb`);
        }
                
      });
    }
  }
}
try {
  readFolder(folder);
} catch (error) {
  console.log(error.message);
}

