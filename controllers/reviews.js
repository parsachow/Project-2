const book = require('../models/book');
const Book = require('../models/book');

module.exports = {
    create,
    update,
    edit,
    deleteReview
    
    
}

async function edit(req, res){
    console.log("edit()", req.params.bookId)
    try{
    const book = await Book.findById(req.params.bookId);
    
    const review = book.reviews.id(req.params.id)
        console.log(review)
    res.render('reviews/edit', { review, bookId:req.params.bookId });

    }catch(err){
        res.send(err)
    }
}


async function update(req, res){
    
    try{
        //findOneAndUpdate()???

        //not going to work for embeded schema, will work for ref
        const book = await Book.findById(req.params.bookId);
        console.log(book, "book")
        
        
        console.log(book, "book", req.params.id)
        const review = book.reviews.id(req.params.id);
        console.log(review);
        if(!review.user._id.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        review.textForm = req.body.textForm;
        
        

        
        //book.text = req.body.text;
        //book.reviews.push(req.params.id);

        await book.save();
        
        res.redirect(`/books/${book._id}`)
        
        
    }catch(err){
        res.send(err);
    }

    //console.log(req.body)
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