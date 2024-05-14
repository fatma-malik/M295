const express = require("express");
const fs = require("fs");

const app = express();

// zeit
app.get("/now", (req, res) => {
  res.status(200).send(new Date().toLocaleString());
});

// zli seitw
app.get("/zli", (req, res) => {
  res.redirect(301, "https://www.zli.ch");
});

// namen liste
const names = ["Ronaldo", "Hannah", "Fritz", "Emilia", "Olaf", "Mia", "Felix", "Sarah", "Tom", "Julia", "Tim", "Emma"];

// rndm name auswahl
app.get("/name", (req, res) => {
  const randomIndex = Math.floor(Math.random() * names.length);
  res.status(200).send(names[randomIndex]);
});

// html aus datei
app.get("/html", (req, res) => {
  fs.readFile("static.html", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.set("Content-Type", "text/html");
      res.status(200).send(data);
    }
  });
});

// bild
app.get("/image", (req, res) => {
  const imagePath = "image.jpg";
  res.sendFile(imagePath, { root: __dirname });
});

// 418 teapot
app.get("/teapot", (req, res) => {
  res.status(418).send("I'm a teapot");
});

// user agent
app.get("/user-agent", (req, res) => {
  const userAgent = req.headers["user-agent"];
  res.status(200).send(userAgent);
});

// 403 forbidden
app.get("/secret", (req, res) => {
  res.status(403).send("Forbidden");
});

// xml
app.get("/xml", (req, res) => {
  fs.readFile("data.xml", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.set("Content-Type", "application/xml");
      res.status(200).send(data);
    }
  });
});

// json
app.get("/me", (req, res) => {
  const me = {
    Vorname: "f",
    Nachname: "arif",
    Alter: 18,
    Wohnort: "zuerich",
    Augenfarbe: "schwarz"
  };
  res.status(200).json(me);
});

// server strat
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port ${port}");
});
