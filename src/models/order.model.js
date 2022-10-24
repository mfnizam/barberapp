const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    barber: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: Number, // 0 waiting approval from barber, 1 active, 2 done, 3 cancel
      default: 0,
      required: true
    },
    orderAt: {
      type: Date,
      default: Date.now(),
      required: true
    },
    doneAt: {
      type: Date,
      required() {
        return this.status === 2;
      }
    },
    review: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Review',
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

orderSchema.pre('validate', async function (next) {
  const order = this;
  console.log(order)
  if (order.isModified('status')) {
    if(order.status > 1) order.doneAt = Date.now();
  }
  next();
});

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
