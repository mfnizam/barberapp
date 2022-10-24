const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    order: Joi.string().custom(objectId),
    user: Joi.string().custom(objectId),
    star: Joi.number().integer(),
    content: Joi.string()
  }),
};

const getReviews = {
  query: Joi.object().keys({
    barber: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

// const getReview = {
//   params: Joi.object().keys({
//     orderId: Joi.string().custom(objectId),
//   }),
// };

// const updateReview = {
//   params: Joi.object().keys({
//     orderId: Joi.required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       status: Joi.number().integer(),
//       user: Joi.string().custom(objectId),
//       barber: Joi.string().custom(objectId),
//       amount: Joi.number().integer(),
//       price: Joi.number().integer(),
//       orderAt: Joi.date(),
//       doneAt: Joi.date()
//     })
//     .min(1),
// };


module.exports = {
  createReview,
  getReviews,
//   getReview,
//   updateReview
};
