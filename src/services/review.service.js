const httpStatus = require('http-status');
const { Review } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a review
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const createReview = async (reviewBody) => {
  // ganti dengan menggunakan data dari data barber asli
  return Review.create(reviewBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getReviewById = async (id) => {
  return Review.findById(id);
};

/**
 * Get user by id and populate
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getReviewByIdPopulate = async (id, populate) => {
  return Review.findById(id).populate(populate);
};

/**
 * Query for Reviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReviews = async (filter, options) => {
  options.populate = 'user'
  const reviews = await Review.paginate(filter, options);
  return reviews;
};

/**
 * Update review by id
 * @param {ObjectId} reviewId
 * @param {Object} updateBody
 * @returns {Promise<Review>}
 */
 const updateReviewById = async (reviewId, updateBody) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  Object.assign(review, updateBody);
  await review.save();
  return review;
};

module.exports = {
  createReview,
  getReviewById,
  getReviewByIdPopulate,
  queryReviews,
  updateReviewById
};
