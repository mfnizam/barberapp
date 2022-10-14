const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const barberSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    active: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      required() {
        return this.active === true;
      }
    },
    detail: {
      type: String,
      trim: true,
    },
    workingHours: [
      {
        dayOfWeek: {
          type: Number,
          required: true,
        },
        hourStart: {
          type: Number,
          required() {
            return this.close === false;
          },
        },
        hourEnd: {
          type: Number,
          required() {
            return this.close === false;
          },
        },
        close: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
barberSchema.plugin(toJSON);
barberSchema.plugin(paginate);

/**
 * Check if user already barber
 * @param {string} user - The user's id
 * @param {ObjectId} [excludeBarberId] - The id of the barber to be excluded
 * @returns {Promise<boolean>}
 */
barberSchema.statics.isUserAlreadyBarber = async function (user, excludeBarberId) {
  const barber = await this.findOne({ user, _id: { $ne: excludeBarberId } });
  return !!barber;
};

/**
 * Check if password matches the barber's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
barberSchema.methods.isPasswordMatch = async function (password) {
  const barber = this;
  return bcrypt.compare(password, barber.password);
};

barberSchema.pre('save', async function (next) {
  const barber = this;
  if (barber.isModified('password')) {
    barber.password = await bcrypt.hash(barber.password, 8);
  }
  next();
});

/**
 * @typedef Barber
 */
const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;
