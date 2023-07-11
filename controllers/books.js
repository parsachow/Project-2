const Book = require('../models/book');


module.exports = {
    index,
    newBook,
    create,
    show
}

async function show(req, res){

    try{

    const bookDetails = await Book.findById(req.params.id);
    res.render('books/show', { book: bookDetails });

    }catch(err){
        console.log(err)
    }
}

async function create(req, res){
    //the opposite of the opposite boolean value
    req.body.adaptation = !!req.body.adaptation;
    
    try{

    const addedBook = await Book.create(req.body);
    console.log(addedBook)
    res.redirect('/books/index');
    
    } catch(err){
        console.log(err)
    }

}

function newBook(req, res){
    //title must match new ejspage 'submit value'
    res.render('books/new', { title: 'Add Book' })
}

async function index(req, res){
    //find all the books that have been added to the DB
    const books = await Book.find({})
    console.log(books)
    res.render('books/index', { books })
}