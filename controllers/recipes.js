const Recipe = require('../models/recipe');
const Restaurant = require('../models/restaurant');

module.exports = {
   create,
   stations,
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

async function stations(req, res) {
   return await Recipe.find().distinct('station', function(err, stations) {
      if (err) console.log(err);
      res.json(stations);
  });
}