const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', reviewsCtrl.create);
//router.update
router.delete('/reviews/:id', reviewsCtrl.deleteReview)

module.exports = router