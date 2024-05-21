const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let books = [
    { isbn: "1234567890", title: "shatter me", year: 2005, author: "weiss nicht" },
    { isbn: "0987654321", title: "maze runner", year: 2024, author: "jemand" },
    { isbn: "2468101214", title: "throttled", year: 2005, author: "someone" },
    { isbn: "3579111315", title: "hunger games", year: 2024, author: "niemand" }
];

let lends = [];

const validateBook = (req, res, next) => {
    const { isbn } = req.body;
    const bookExists = books.some(book => book.isbn === isbn);
    if (!bookExists) {
        return res.status(404).json({ error: "Book not found" });
    }
    next();
};

const validateLend = (req, res, next) => {
    const { customer_id, isbn } = req.body;
    if (!customer_id || !isbn) {
        return res.status(422).json({ error: "Missing required fields" });
    }
    next();
};

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

app.post("/books", validateBook, (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:isbn", validateBook, (req, res) => {
    const { isbn } = req.params;
    const updatedBookIndex = books.findIndex(book => book.isbn === isbn);
    if (updatedBookIndex !== -1) {
        books[updatedBookIndex] = req.body;
        res.json(req.body);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

app.delete("/books/:isbn", (req, res) => {
    const { isbn } = req.params;
    books = books.filter(book => book.isbn !== isbn);
    res.sendStatus(204);
});

app.get("/lends", (req, res) => {
    res.json(lends);
});

app.get("/lends/:id", (req, res) => {
    const lend = lends.find(lend => lend.id === req.params.id);
    if (lend) {
        res.json(lend);
    } else {
        res.status(404).json({ error: "Lend not found" });
    }
});

app.post("/lends", validateLend, (req, res) => {
    const { customer_id, isbn } = req.body;
    const lend = {
        id: Date.now().toString(),
        customer_id,
        isbn,
        borrowed_at: new Date().toISOString(),
        returned_at: null
    };
    lends.push(lend);
    res.status(201).json(lend);
});

app.delete("/lends/:id", (req, res) => {
    const { id } = req.params;
    lends = lends.filter(lend => lend.id !== id);
    res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
