const { getData, saveData } = require("../utils/fileHelper");

const borrowBook = (req, res) => {
  const { bookId, memberId } = req.body;
  const books = getData("books");
  const members = getData("members");
  const borrows = getData("borrows");

  const book = books.find((b) => b.id === bookId);
  const member = members.find((m) => m.id === memberId);

  if (!book || !member) {
    return res.status(404).json({ message: "Book or member not found" });
  }
  if (!book.available) {
    return res.status(400).json({ message: "Book not available" });
  }

  const newBorrow = {
    id: `BR${borrows.length + 1}`,
    bookId,
    memberId,
    borrowDate: new Date().toISOString(),
    returnDate: null,
  };

  book.available = false;
  borrows.push(newBorrow);

  saveData("books", books);
  saveData("borrows", borrows);
  res.status(201).json(newBorrow);
};

const returnBook = (req, res) => {
  const { bookId } = req.body;
  const books = getData("books");
  const borrows = getData("borrows");

  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const activeBorrow = borrows.find(
    (b) => b.bookId === bookId && !b.returnDate
  );
  if (!activeBorrow)
    return res.status(400).json({ message: "Book not currently borrowed" });

  activeBorrow.returnDate = new Date().toISOString();
  book.available = true;

  saveData("books", books);
  saveData("borrows", borrows);
  res.json(activeBorrow);
};

module.exports = { borrowBook, returnBook };
