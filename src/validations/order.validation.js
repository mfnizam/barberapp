const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createOrder = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    barber: Joi.string().custom(objectId),
    amount: Joi.number().integer(),
    price: Joi.number().integer(),
    orderAt: Joi.date(),
    doneAt: Joi.date()
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

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.number().integer(),
      user: Joi.string().custom(objectId),
      barber: Joi.string().custom(objectId),
      amount: Joi.number().integer(),
      price: Joi.number().integer(),
      orderAt: Joi.date(),
      doneAt: Joi.date()
    })
    .min(1),
};


module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder
};
