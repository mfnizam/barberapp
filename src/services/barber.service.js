const httpStatus = require('http-status');
const { Barber } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a barber
 * @param {Object} barberBody
 * @returns {Promise<Barber>}
 */
const createBarber = async (barberBody) => {
  if (await Barber.isUserAlreadyBarber(barberBody.user)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already register as barber');
  }
  return Barber.create(barberBody);
};

/**
 * Query for Barbers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBarbers = async (filter, options) => {
  const barbers = await Barber.paginate(filter, options);
  return barbers;
};

/**
 * Get barber by id
 * @param {ObjectId} id
 * @returns {Promise<Barber>}
 */
const getBarberById = async (id) => {
  return Barber.findById(id);
};

/**
 * Get barber by user id
 * @param {string} userId
 * @returns {Promise<Barber>}
 */
const getBarberByUserId = async (userId) => {
  return Barber.findOne({ user: userId });
};

/**
 * Update barber by id
 * @param {ObjectId} barberId
 * @param {Object} updateBody
 * @returns {Promise<Barber>}
 */
const updateBarberById = async (barberId, updateBody) => {
  const barber = await getBarberById(barberId);
  if (!barber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barber not found');
  }
  if (updateBody.user && (await Barber.isUserAlreadyBarber(updateBody.user, barberId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already register as barber');
  }
  Object.assign(barber, updateBody);
  await barber.save();
  return barber;
};

/**
 * Delete barber by id
 * @param {ObjectId} barberId
 * @returns {Promise<Barber>}
 */
const deleteBarberById = async (barberId) => {
  const barber = await getBarberById(barberId);
  if (!barber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barber not found');
  }
  await barber.remove();
  return barber;
};

module.exports = {
  createBarber,
  queryBarbers,
  getBarberById,
  getBarberByUserId,
  updateBarberById,
  deleteBarberById,
};
