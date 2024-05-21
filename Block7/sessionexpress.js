const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/name', (req, res) => {
  const name = req.body.name;
  if (name) {
    req.session.name = name;
    res.status(200).send(`Name saved: ${name}`);
  } else {
    res.status(400).send('Name parameter is required');
  }
});

app.get('/name', (req, res) => {
  if (req.session.name) {
    res.status(200).send(`Stored name: ${req.session.name}`);
  } else {
    res.status(404).send('No name found in session');
  }
});

app.delete('/name', (req, res) => {
  if (req.session.name) {
    delete req.session.name;
    res.status(200).send('Name deleted from session');
  } else {
    res.status(404).send('No name found in session to delete');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
