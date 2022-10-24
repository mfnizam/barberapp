const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { reviewValidation } = require('../../validations');
const { reviewController } = require('../../controllers');

const router = express.Router();

router.route('/')
    .get(auth('getReviews'), validate(reviewValidation.getReviews), reviewController.getReviews)
    .post(auth('createReview'), validate(reviewValidation.createReview), reviewController.createReview);

// router
    // .route('/:reviewId')
    // .get(auth('getReviews'), validate(reviewValidation.getReview), reviewController.getReview)
    // .patch(auth('updateReviews'), validate(reviewValidation.updateReview), reviewController.updateReview);
    // .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
// TODO: add swagger for review
