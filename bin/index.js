const express = require('express');
var path = require('path');
var morgan = require('morgan');
const { celebrate, Joi, errors } = require('celebrate');

var app = express();

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', require('./routes'));

app.use(errors());

const port = process.env.PORT || 3333;

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running server at port ${port}!`)
  }
});
