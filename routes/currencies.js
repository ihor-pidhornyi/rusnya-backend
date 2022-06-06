const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const currenciesController = require('../controllers/currencies');

router.post('/', auth, currenciesController.create);

router.patch('/:id', auth, currenciesController.update);

router.delete('/:id', auth, currenciesController.delete);

router.get('/', currenciesController.get);

module.exports = router;
