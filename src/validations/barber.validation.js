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

module.exports = {
  getBarbers,
  getBarber
};
