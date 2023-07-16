const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', reviewsCtrl.create);
router.get('/books/:bookId/reviews/:id/edit', reviewsCtrl.edit)
router.put('/books/:bookId/reviews/:id', reviewsCtrl.update)
router.delete('/reviews/:id', reviewsCtrl.deleteReview)


module.exports = router