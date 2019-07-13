const express = require('express');
const router = express.Router();
const recipesController = require('../../controllers/recipes');

// router.get('/:id', recipesController.get);
router.post('/:id/recipes', recipesController.create);

module.exports = router;