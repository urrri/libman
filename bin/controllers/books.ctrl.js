const { celebrate, Joi } = require('celebrate');
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

const verifyNewBook = celebrate({
  body: Joi.object().keys({
    book: Joi.object().keys({
      title: Joi.string().required(),
      author: Joi.string().required(),
      description: Joi.string(),
      published: Joi.number().integer(),
    })
  })
});

const verifyBook = celebrate({
  body: Joi.object().keys({
    book: Joi.object().keys({
      title: Joi.string(),
      author: Joi.string(),
      description: Joi.string(),
      published: Joi.number().integer(),
    })
  })
});

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
    if (!result) {
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
    if (!result) {
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
      res.status(200).json(result);
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
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    if (typeof e === 'number') {
      res.sendStatus(e) && next(e);
    }
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
      res.status(200).json(result);
    }
    //next()
  } catch (e) {
    if (typeof e === 'number') {
      res.sendStatus(e) && next(e);
    }
    res.sendStatus(500) && next(e)
  }
};

module.exports = {
  getBooks,
  verifyNewBook,
  verifyBook,
  postBook,
  getBook,
  putBook,
  deleteBook,
  borrowBook,
  returnBook
};
