const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//review schema/Model 
const reviewSchema = new Schema({
    
    textForm: {
        type: String,
        required: true
    },
    rated: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String

}, {
    timestamps: true
})

//book schema/model
const bookSchema = new mongoose.Schema({
    authorName: { 
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        min: 1900,
        max: 2030
    },
    adaptation: {
        type: Boolean,
        default: true
    },
    genre: {
        type: String,
        enum: ['Mystery', 'Sci-Fi', 'Horror', 'Fantasy', 'Urban Fantasy', 'Crime', 'Suspense'],
        default: 'Urban Fantasy',
    },
    //embeded schema
    reviews: [reviewSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema)