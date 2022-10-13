const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getBarbers = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBarber = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateBarber = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      detail: Joi.string(),
      price: Joi.number().integer(),
      workingHours: Joi.array().items(
        Joi.object({
          dayOfWeek: Joi.number().integer().required(),
          hourStart: Joi.number().integer().allow(null),
          hourEnd: Joi.number().integer().allow(null),
          close: Joi.boolean().required()
        })
      )
    })
    .min(1),
};

module.exports = {
  getBarbers,
  getBarber,
  updateBarber
};
