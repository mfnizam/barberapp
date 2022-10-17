const allRoles = {
  user: ['getBarbers', 'getOrders', 'createOrder'],
  barber: [],
  admin: ['getUsers', 'manageUsers', 'getBarbers', 'manageBarbers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
