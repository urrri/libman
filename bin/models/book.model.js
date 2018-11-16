var mongoose = require('mongoose');

var Book = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, default: ''},
  published: {type: Number, required: true},
  borrowed: {type: Boolean, default: false},
  lastBorrowedBy: {type: String, default: ''},
  lastBorrowTime: {type: Date, default: Date.now},
  borrowCount: {type: Number, default: 0},

});

// validation
Book.path('title').validate(function (v) {
  return v.length > 4 && v.length < 70;
});

Book.path('description').validate(function (v) {
  return v.length < 400;
});

var BookModel = mongoose.model('Book', Book);

module.exports = BookModel;