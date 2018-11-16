const express = require('express');
const books = require('../controllers/books.ctrl');
const router = express.Router();
router.route('/')
  .get(books.getBooks)
  .post(books.verifyNewBook, books.postBook);

router.route('/:id')
  .get(books.getBook)
  .put(books.verifyBook, books.putBook)
  .delete(books.deleteBook);

router.patch('/:id/borrow/:customerId', books.borrowBook);
router.patch('/:id/return', books.returnBook);

module.exports = router;
