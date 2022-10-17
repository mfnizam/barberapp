const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody) => {
  // ganti dengan menggunakan data dari data barber asli
  return Order.create(orderBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Query for Orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  options.populate = 'user,barber.barber'
  const orders = await Order.paginate(filter, options);
  return orders;
};

module.exports = {
  createOrder,
  getOrderById,
  queryOrders,
};
