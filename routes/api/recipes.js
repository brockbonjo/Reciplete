const express = require('express');
const router = express.Router();
const recipesController = require('../../controllers/recipes');

router.post('/:id/newrecipe', recipesController.create);
router.put('/:id/editrecipe', recipesController.edit);
router.delete('/:id/deleterecipe/:recipeid', recipesController.deleteRecipe);

module.exports = router;