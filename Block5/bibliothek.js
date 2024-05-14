const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [
    { isbn: '1234567890', title: 'Harry Potter and the Philosopher\'s Stone', year: 1997, author: 'J.K. Rowling' },
    { isbn: '0987654321', title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald' }
];

const validateBook = (req, res, next) => {
    const { isbn, title, year, author } = req.body;
    if (!isbn || !title || !year || !author) {
        return res.status(422).json({ error: 'Missing required fields' });
    }
    next();
};

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.post('/books', validateBook, (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:isbn', validateBook, (req, res) => {
    const { isbn } = req.params;
    const updatedBookIndex = books.findIndex(book => book.isbn === isbn);
    if (updatedBookIndex !== -1) {
        books[updatedBookIndex] = req.body;
        res.json(req.body);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    books = books.filter(book => book.isbn !== isbn);
    res.sendStatus(204);
});

app.patch('/books/:isbn', validateBook, (req, res) => {
    const { isbn } = req.params;
    const updatedBookIndex = books.findIndex(book => book.isbn === isbn);
    if (updatedBookIndex !== -1) {
        books[updatedBookIndex] = { ...books[updatedBookIndex], ...req.body };
        res.json(books[updatedBookIndex]);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
