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
 * Get user by id and populate
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getOrderByIdPopulate = async (id, populate) => {
  return Order.findById(id).populate(populate);
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

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
 const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderByIdPopulate,
  queryOrders,
  updateOrderById
};
