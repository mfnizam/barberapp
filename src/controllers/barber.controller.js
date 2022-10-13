const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, barberService } = require('../services');

const getBarbers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  filter.role = 'barber';
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'barber';
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

const updateBarber = catchAsync(async (req, res) => {
  await barberService.updateBarberByUserId(req.params.userId, req.body);
  const user =  await userService.getUserByIdPopulate(req.params.userId, 'barber');
  res.send(user);
});

module.exports = {
  getBarbers,
  getBarber,
  updateBarber
};
