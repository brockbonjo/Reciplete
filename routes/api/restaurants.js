const express = require('express');
const router = express.Router();
const restaurantsController = require('../../controllers/restaurants');

router.get('/:id', restaurantsController.get);
router.post('/', restaurantsController.create);

module.exports = router;