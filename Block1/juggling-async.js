const http = require('http');

const urls = process.argv.slice(2);

if (urls.length !== 3) {
  console.error('provide three URLs');
  process.exit(1);
}

let count = 0;
const contents = [];

urls.forEach((url, index) => {
  http.get(url, (response) => {
    let rawData = '';

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
      rawData += chunk;
    });

    response.on('end', () => {
      contents[index] = rawData;
      count++;

      if (count === 3) {
        contents.forEach((content) => {
          console.log(content);
        });
      }
    });
  }).on('error', (err) => {
    console.error(`Error fetching URL ${url}:`, err);
  });
});
