const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books')

//get all the list of the books
router.get('/index', booksCtrl.index);
router.get('/new', booksCtrl.newBook);
router.post('/index', booksCtrl.create);


module.exports = router;