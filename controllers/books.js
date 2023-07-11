const Book = require('../models/book');


module.exports = {
    index,
    newBook
}

function newBook(req, res){
    res.render('books/new', { title: 'Add Book' })
}

async function index(req, res){
    const books = await Book.find({})
    console.log(books)
    res.render('books/index', { books })
}