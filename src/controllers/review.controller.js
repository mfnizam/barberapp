const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService, orderService } = require('../services');

const createReview = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.body.order);
  const review = await reviewService.createReview({ ...req.body, barber: order.barber, user: req.user.id });
  await orderService.updateOrderById(req.body.order, { review: review.id })
  res.status(httpStatus.CREATED).send(review);
});

const getReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['barber']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reviewService.queryReviews(filter, options);
  res.send(result);
});

// const getReview = catchAsync(async (req, res) => {
//   const review = await reviewService.getReviewByIdPopulate(req.params.reviewId, ['user', 'barber']);
//   if (!review) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
//   }
//   res.send(review);
// });

// const updateReview = catchAsync(async (req, res) => {
//   const review = await reviewService.updateReviewById(req.params.reviewId, req.body);
//   res.send(review);
// });

module.exports = {
  createReview,
  getReviews,
//   getReview,
//   updateReview
};
