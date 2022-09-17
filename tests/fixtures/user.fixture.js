const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const User = require('../../src/models/user.model');
const Barber = require('../../src/models/barber.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

ids = {
  userOne: mongoose.Types.ObjectId(),
  userTwo: mongoose.Types.ObjectId(),
  barberOne: mongoose.Types.ObjectId(),
  barberOneRoleDetail: mongoose.Types.ObjectId(),
  barberTwo: mongoose.Types.ObjectId(),
  barberTwoRoleDetail: mongoose.Types.ObjectId(),
  admin: mongoose.Types.ObjectId(),
};

const userOne = {
  _id: ids.userOne,
  name: faker.name.findName(),
  address: faker.address.streetAddress(true),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  _id: ids.userTwo,
  name: faker.name.findName(),
  address: faker.address.streetAddress(true),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const barberOneRoleDetail = {
  _id: ids.barberOneRoleDetail,
  user: ids.barberOne,
  detail: faker.lorem.lines(),
  workingHours: [
    {
      dayOfWeek: 0,
      close: true,
    },
    {
      dayOfWeek: 1,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 2,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 3,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 4,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 5,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 6,
      hourStart: '11:00',
      hourEnd: '17:00',
      close: false,
    },
  ],
};

const barberOne = {
  _id: ids.barberOne,
  name: faker.name.findName(),
  address: faker.address.streetAddress(true),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'barber',
  // roleDetail: barberOneRoleDetail._id,
  isEmailVerified: false,
};

const barberTwoRoleDetail = {
  _id: ids.barberOneRoleDetail,
  user: ids.barberOne,
  detail: faker.lorem.lines(),
  workingHours: [
    {
      dayOfWeek: 0,
      close: true,
    },
    {
      dayOfWeek: 1,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 2,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 3,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 4,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 5,
      hourStart: '11:00',
      hourEnd: '20:00',
      close: false,
    },
    {
      dayOfWeek: 6,
      hourStart: '11:00',
      hourEnd: '17:00',
      close: false,
    },
  ],
};

const barberTwo = {
  _id: ids.barberTwo,
  name: faker.name.findName(),
  address: faker.address.streetAddress(true),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'barber',
  roleDetail: barberTwoRoleDetail,
  isEmailVerified: false,
};

const admin = {
  _id: ids.admin,
  name: faker.name.findName(),
  address: faker.address.streetAddress(true),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

const insertBarbers = async (barbers) => {
  await Barber.insertMany(barbers.map((barber) => ({ ...barber, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  barberOne,
  barberTwo,
  barberOneRoleDetail,
  barberTwoRoleDetail,
  admin,
  insertUsers,
  insertBarbers,
};
