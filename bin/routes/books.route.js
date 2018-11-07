const express = require('express');
const books = require('../controllers/books.ctrl');
const router = express.Router();
router.route('/')
  .get(books.getBooks)
  .post(books.postBook);

router.route('/:id')
  .get(books.getBook)
  .put(books.verifyBook, books.putBook)
  .delete(books.deleteBook)
  .patch(books.borrowBook)
  .patch(books.returnBook);

module.exports = router;
