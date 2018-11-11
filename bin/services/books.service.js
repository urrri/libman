const getBooks = async filter => {
  return [];
};

const addBook = async book => {
  // add id
  book.id = '' + Date.now();
  //call DB
  return book;
};

const getBook = async id => {
  const book = {id};
  //call db
  return book;
};

const updateBook = async (id, book) => {
  const origBook = await getBook(id);
  book = {
    ...origBook,
    ...book
  };
  //call db
  return book;
};

const deleteBook = async (id) => {
  //call db
};

const borrowBook = async (id, customerId) => {
  const origBook = await getBook(id);
  const now = Date.now();
  book = {
    ...origBook,
    borrowed: true,
    lastBorrowedBy: customerId,
    lastBorrowTime: now,
    borrowCount: origBook.borrowCount + 1,
    borrowings: origBook.borrowings.push({
      by: customerId,
      time: now
    })
  };
  // call db
};

const returnBook = async (id)=> {
  const origBook = await getBook(id);

  book = {
    ...origBook,
    borrowed: false
  };
  // call db

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
