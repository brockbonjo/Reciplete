const Recipe = require('../models/recipe');
const Restaurant = require('../models/restaurant');

module.exports = {
   create,
   edit,
   deleteRecipe,
};

async function create(req, res) {
   let recipe = new Recipe(req.body);
   let foundRestaurant = await Restaurant.findById(req.params.id);
   foundRestaurant.recipes.push(recipe._id);
   foundRestaurant.save();
   try {
      await recipe.save(req.body);
   } catch (err) {
      res.json({ err });
   }
}

async function edit(req, res) {
   await Recipe.findByIdAndUpdate(req.body._id, req.body)
   .exec((err, recipe) => {
      if (err) {
         console.log(err);
         res.status(500).send(err);
      } else {
         res.status(200).json(recipe);
      }
   });
}

async function deleteRecipe(req, res) {
   let foundRestaurant = await Restaurant.findById(req.params.id);
   await Recipe.findOneAndDelete(req.params.recipeid);
   foundRestaurant.recipes = foundRestaurant.recipes.filter(recipe => recipe._id !== req.params.recipeid);
   await foundRestaurant.save();
}