const express = require("express");
const router = express.Router();
const { borrowBook, returnBook } = require("../controllers/borrowController");
const protected = require("../middlewares/protected");

// es erku endpoit@ protected klini John jan
router.post("/borrow", protected, borrowBook);
router.post("/return", protected, returnBook);

module.exports = router;
