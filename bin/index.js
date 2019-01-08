const express = require('express');
const path = require('path');
const {errors} = require('celebrate');
const config = require('config');

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION || config.get('db.connectionUri'), {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function (err) {
  console.error('connection error:', err.message);
});
db.once('open', function callback() {
  console.info("Connected to DB!");
});


const app = express();

app.use(config.get('api.public'), express.static(path.join(__dirname, '../public')));

if (config.get('logger.on')) {
  //add logger
  const morgan = require('morgan');
  app.use(morgan('combined'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(config.get('api.rootPath'), require('./routes'));

app.use(errors());

const port = process.env.PORT || config.get('api.port') || 3333;

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running server at port ${port}!`)
  }
});
