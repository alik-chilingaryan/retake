const { getData, saveData } = require("../utils/fileHelper");

const getAllBooks = (req, res) => {
  const books = getData("books");
  res.json(books);
};

const createBook = (req, res) => {
  const books = getData("books");
  const newBook = { id: `B${books.length + 1}`, ...req.body, available: true };
  books.push(newBook);
  saveData("books", books);
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const books = getData("books");
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[bookIndex] = { ...books[bookIndex], ...req.body };
  saveData("books", books);
  res.json(books[bookIndex]);
};

const deleteBook = (req, res) => {
  const books = getData("books");
  const filteredBooks = books.filter((b) => b.id !== req.params.id);
  saveData("books", filteredBooks);
  res.status(204).send();
};

module.exports = { getAllBooks, createBook, updateBook, deleteBook };
