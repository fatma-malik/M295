const express = require('express');
const request = require('request');

const app = express();

app.get('/temperatur', (req, res) => {
  const plz = req.query.plz;
  if (!plz || plz.length !== 4 || isNaN(plz)) {
    return res.status(400).json({ error: 'Ungültige Postleitzahl' });
  }

  const apiUrl = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}`;

  request.get({
    url: apiUrl,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, response, data) => {
    if (err) {
      return res.status(500).json({ error: 'Serverfehler' });
    } else if (response.statusCode !== 200) {
      return res.status(response.statusCode).json({ error: 'Fehler beim Abrufen der Daten' });
    } else {
      const temperatur = data.temperature;
      return res.json({ temperatur });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
