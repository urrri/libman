const express = require('express');
const path = require('path');
const { celebrate, Joi, errors } = require('celebrate');
const config = require('config');

const app = express();

app.use(config.get('api.public'), express.static(path.join(__dirname, '../public')));

if (config.get('logger.on')) {
  //add logger
  var morgan = require('morgan');
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
