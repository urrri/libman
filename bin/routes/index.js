const router = require('express').Router();

router.use('/books', require('./books.route'));

module.exports = router;
