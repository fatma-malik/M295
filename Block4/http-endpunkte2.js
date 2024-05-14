const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Zeit
app.get("/now", (req, res) => {
  const timeZone = req.query.tz || "Europe/Zurich";
  const currentTime = new Date().toLocaleString("de-CH", { timeZone });
  res.status(200).send(currentTime);
});

// ZLI Weiterleitung
app.get("/zli", (req, res) => {
  res.redirect(301, "https://www.zli.ch");
});

// Namen Liste
let names = ["Ronaldo", "Hannah", "Fritz", "Emilia", "Olaf", "Mia", "Felix", "Sarah", "Tom", "Julia", "Tim", "Emma"];

// Neuer Name hinzufügen
app.post("/names", (req, res) => {
  const newName = req.body.name;
  if (newName) {
    names.push(newName);
    res.status(201).send("Name hinzugefügt: " + newName);
  } else {
    res.status(400).send("Bad Request: Name fehlt im Formular");
  }
});

// Name entfernen
app.delete("/names", (req, res) => {
  const nameToRemove = req.query.name;
  if (nameToRemove) {
    names = names.filter(name => name !== nameToRemove);
    res.status(204).end();
  } else {
    res.status(400).send("Bad Request: Name fehlt in der Abfrage");
  }
});

// User-Agent
app.get("/user-agent", (req, res) => {
  const userAgent = req.headers["user-agent"];
  res.status(200).send(userAgent);
});

// teapot 418
app.get("/teapot", (req, res) => {
  res.status(418).send("I'm a teapot");
});

// Geheimer Endpunkt
app.get("/secret2", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader === "Basic aGFja2VyOjEyMzQ=") {
    res.status(200).send("Authenticated");
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Chuck Norris Witz
app.get("/chuck", async (req, res) => {
  try {
    const { data } = await axios.get("https://api.chucknorris.io/jokes/random");
    let joke = data.value;
    const name = req.query.name;
    if (name) {
      joke = joke.replace(/Chuck Norris/g, name);
    }
    res.status(200).send(joke);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Mein Profil aktualisieren
app.patch("/me", (req, res) => {
  const updatedFields = req.body;
  Object.assign(me, updatedFields);
  res.status(200).json(me);
});

// Server starten
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
