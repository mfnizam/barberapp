const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getBarbers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  filter.role = 'barber';
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'roleDetail';
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getBarber = catchAsync(async (req, res) => {
  const barber = await userService.getUserById(req.params.userId);
  if (!barber) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Barber not found');
  }
  res.send(barber);
});

module.exports = {
  getBarbers,
  getBarber
};
