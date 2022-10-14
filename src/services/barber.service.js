const httpStatus = require('http-status');
const { Barber } = require('../models');
const ApiError = require('../utils/ApiError');
const UserService = require('./user.service');

/**
 * Create a barber
 * @param {Object} barberBody
 * @returns {Promise<Barber>}
 */
const createBarber = async (userBody) => {
  const user = await UserService.createUser(userBody);
  const barber = await Barber.create({ 
    user: user.id, 
    workingHours: [{
      dayOfWeek: 0,
      close: true
    }, {
      dayOfWeek: 1,
      close: true
    }, {
      dayOfWeek: 2,
      close: true
    }, {
      dayOfWeek: 3,
      close: true
    }, {
      dayOfWeek: 4,
      close: true
    }, {
      dayOfWeek: 5,
      close: true
    }, {
      dayOfWeek: 6,
      close: true
    }] 
  });
  Object.assign(user, { barber: barber.id });
  await user.save();
  return await UserService.getUserByIdPopulate(user.id, ['barber']);
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
 * Update barber by user id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateBarberByUserId = async (userId, updateBody) => {
  const barber = await getBarberByUserId(userId);
  if (!barber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
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
  updateBarberByUserId,
  deleteBarberById,
};
