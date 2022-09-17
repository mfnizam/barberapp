const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const barberValidation = require('../../validations/barber.validation');
const barberController = require('../../controllers/barber.controller');

const router = express.Router();

router.route('/').get(auth('getBarbers'), validate(barberValidation.getBarbers), barberController.getBarbers);

router.route('/:userId').get(auth('getBarbers'), validate(barberValidation.getBarber), barberController.getBarber);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Barbers
 *   description: Barber retrieval
 */

/**
 * @swagger
 * /barbers:
 *   get:
 *     summary: Get all barbers
 *     description: admins and non-admin can all barber. non-login user cannot retrive barber
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /barbers/{id}:
 *   get:
 *     summary: Get a barber
 *     description: admins and non-admin can fetch other users. non-login user cannot retrive barber
 *     tags: [Barbers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Barber id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
