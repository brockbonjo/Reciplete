const Restaurant = require('../models/restaurant');

module.exports = {
   create,
   get
};

async function create(req, res) {
   try {
      await Restaurant.create(req.body);
   } catch (err) {
      res.json({ err });
   }
}

async function get(req, res) {
   await Restaurant
      .find({users: {$in: req.params.id}})
      .populate('recipes')
      .exec((err, restaurant) => {
         if (err) console.log(err);
         res.status(200).json(restaurant[0]);
      });
}
