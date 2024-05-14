const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2];
const fileExtension = process.argv[3];

if (!directoryPath || !fileExtension) {
  console.error('provide a directory path');
  process.exit(1);
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    process.exit(1);
  }

  const filteredFiles = files.filter(file => path.extname(file) === `.${fileExtension}`);
  
  filteredFiles.forEach(file => {
    console.log(file);
  });
});
