const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.error('provide the path');
  process.exit(1);
}

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const numLines = data.split('\n').length - 1;
  console.log(numLines);
} catch (err) {
  console.error('Error reading file:', err);
  process.exit(1);
}