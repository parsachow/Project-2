const Book = require('../models/book');

module.exports = {
    create,
    deleteReview
}

async function deleteReview(req, res){
    
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