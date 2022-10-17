const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/')
    .get(auth('getOrders'), validate(orderValidation.getOrders), orderController.getOrders)
    .post(auth('createOrder'), validate(orderValidation.createOrder), orderController.createOrder);

router
    .route('/:userId')
    .get(auth('getOrders'), validate(orderValidation.getOrder), orderController.getOrder);
    // .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
    // .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
// TODO: add swagger for order
