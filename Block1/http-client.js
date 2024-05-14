const http = require('http');

const url = process.argv[2];

if (!url) {
  console.error('provide a URL');
  process.exit(1);
}

http.get(url, (response) => {
  response.setEncoding('utf8');
  
  response.on('data', (data) => {
    console.log(data);
  });
  
  response.on('error', (err) => {
    console.error('Error receiving data:', err);
  });
}).on('error', (err) => {
  console.error('Error making HTTP request:', err);
});
