const BookModel = require('../models/book.model');
const pick = require('lodash/pick');

const updateParams = {
  new: true
};

const getBooks = async filter => {
  return BookModel.find(filter).exec();
};

const addBook = async book => {
  book = pick(book, ['title', 'author', 'description', 'published'])
  console.log("adding book", book);

  return BookModel.create(book);
};

const getBook = async id => {
  return BookModel.findById(id);
};

const updateBook = async (id, book) => {
  return BookModel.findByIdAndUpdate(id, pick(book, ['title', 'author', 'description', 'published']), updateParams);
};

const deleteBook = async (id) => {
  return BookModel.findByIdAndDelete(id);
};

const borrowBook = async (id, customerId) => {
  if (!await getBook(id)) {
    return;  //404
  }
  const updated = await BookModel.findOneAndUpdate({_id: id, borrowed: false}, {
    $set: {
      borrowed: true,
      lastBorrowedBy: customerId
    },
    $currentDate: {
      lastBorrowTime: true
    },
    $inc: {
      borrowCount: 1
    }
  }, updateParams);
  if (!updated) {
    throw 409; //conflict
  }
  return updated;
};

const returnBook = async (id) => {
  if (!await getBook(id)) {
    return;  //404
  }
  const updated = await BookModel.findOneAndUpdate({_id: id, borrowed: true}, {
    $set: {
      borrowed: false
    }
  }, updateParams);
  if (!updated) {
    throw 409; //conflict
  }
  return updated;
};

module.exports = {
  getBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
};
