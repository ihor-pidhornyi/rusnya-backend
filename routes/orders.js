const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const ordersController = require('../controllers/orders');

router.post('/', ordersController.create);

router.patch('/:id', auth, ordersController.update);

router.delete('/:id', ordersController.delete);

router.get('/:id', ordersController.getById);

router.get('/', auth, ordersController.get);

module.exports = router;
