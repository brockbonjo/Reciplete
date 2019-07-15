const express = require('express');
const router = express.Router();
const recipesController = require('../../controllers/recipes');

router.get('/', recipesController.stations);
router.post('/:id/recipes', recipesController.create);

module.exports = router;