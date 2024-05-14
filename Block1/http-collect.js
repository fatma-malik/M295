const http = require('http');

const url = process.argv[2];

if (!url) {
  console.error('provide a URL');
  process.exit(1);
}

http.get(url, (response) => {
  let rawData = '';

  response.setEncoding('utf8');

  response.on('data', (chunk) => {
    rawData += chunk;
  });

  response.on('end', () => {
    console.log(rawData.length);
    console.log(rawData);
  });
}).on('error', (err) => {
  console.error('Error making HTTP request:', err);
});
