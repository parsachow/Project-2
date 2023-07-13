const book = require('../models/book');
const Book = require('../models/book');

module.exports = {
    create,
    deleteReview,
    updateReview
}

async function updateReview(req, res){
    try{
        //findOneAndUpdate()???
        const book = await Book.findOne({
            'reviews._id': req.params.id,
            'reviews.user': req.user._id
        })
        if(!book) return res.redirect('/books/index');
        book.reviews.text = req.body.text;
        await book.save();
        res.redirect(`/books/${book._id}`)
    }catch(err){
        res.send(err);
    }
}


async function deleteReview(req, res){
    try{
        const book = await Book.findOne ({
            'reviews._id': req.params.id,
            'reviews.user': req.user._id
        })

        if(!book) return res.redirect('/books/index');
        book.reviews.remove(req.params.id);
        await book.save();
        res.redirect(`/books/${book._id}`)
    }catch(err){
        res.send(err);
    }
}

async function create(req, res){

    console.log(req.body)

    try{

        const bookReview = await Book.findById(req.params.id)

        // Add the user info to req.body 
            req.body.user = req.user._id;
            req.body.userName = req.user.name;
            req.body.userAvatar = req.user.avatar;
        
        //add the review (req.body) to the book (bookReview) by pushing and then save
        bookReview.reviews.push(req.body);

        await bookReview.save();
        res.redirect(`/books/${req.params.id}`)

    }catch(err){
        console.log(err)
    }
}