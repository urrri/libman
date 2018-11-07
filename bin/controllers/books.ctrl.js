const getBooks = (req, res, next) => {
  res.send('all books');
};

const verifyBook = (req, res, next) => {
  console.log('verify book');
  next();
};

const postBook = (req, res, next) => {
  res.send('add new book');
};

const getBook = (req, res, next) => {
  res.send('get book');
};

const putBook = (req, res, next) => {
  res.send('update book');
};

const deleteBook = (req, res, next) => {
  res.send('delete book');
};

const borrowBook = (req, res, next) => {
  res.send('borrow book');
};

const returnBook = (req, res, next) => {
  res.send('return book');
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
