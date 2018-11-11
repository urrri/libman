const books = require('../services/books.service');

const getBooks = async (req, res, next) => {
  const filter = req.query;
  try {
    const result = await books.getBooks(filter);
    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const verifyBook = async (req, res, next) => {
  console.log('verify book');
  next();
};

const postBook = async (req, res, next) => {
  const {book} = req.body;
  try {
    const result = await books.addBook(book);
    res.status(200).json(result);
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const getBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const result = await books.getBook(bookId);
    if (result === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const putBook = async (req, res, next) => {
  const bookId = req.params.id;
  const {book} = req.body;
  try {
    const result = await books.updateBook(bookId, book);
    if (result === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const result = await books.deleteBook(bookId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const borrowBook = async (req, res, next) => {
  const {id:bookId, customerId} = req.params;
  try {
    const result = await books.borrowBook(bookId, customerId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

const returnBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    const result = await books.returnBook(bookId);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
    //next()
  } catch (e) {
    res.sendStatus(500) && next(e)
  }
};

module.exports = {
  getBooks,
  verifyBook,
  postBook,
  getBook,
  putBook,
  deleteBook,
  borrowBook,
  returnBook
};
