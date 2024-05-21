const express = require('express');
const basicAuth = require('basic-auth');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

const auth = (req, res, next) => {
  const user = basicAuth(req);
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (user && user.name === username && user.pass === password) {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Authentication required.');
  }
};

app.get('/public', (req, res) => {
  res.send('This is a public endpoint.');
});

app.get('/private', auth, (req, res) => {
  res.send('This is a private endpoint.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
