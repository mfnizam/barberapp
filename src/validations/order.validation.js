const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createOrder = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    barber: Joi.string().custom(objectId),
    amount: Joi.number().integer(),
    price:  Joi.number().integer(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    status: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder
};
