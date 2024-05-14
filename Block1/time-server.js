const net = require('net');

const port = process.argv[2];

if (!port) {
  console.error('provide a port number');
  process.exit(1);
}

const server = net.createServer((socket) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = zeroPad(date.getMonth() + 1);
  const day = zeroPad(date.getDate());
  const hours = zeroPad(date.getHours());
  const minutes = zeroPad(date.getMinutes());

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}\n`;

  socket.write(formattedDate);
  socket.end();
});

server.listen(port);

function zeroPad(num) {
  return (num < 10 ? '0' : '') + num;
}
