const Restaurant = require('../models/restaurant');
const Users = require('../models/user');

module.exports = {
   create,
   get,
   addUser,
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
      .find({users: {$in: req.user._id}})
      .populate('recipes')
      .populate('users')
      .exec((err, restaurant) => {
         if (err) console.log(err);
         if (restaurant.length) {
            res.status(200).json(restaurant[0]);
         } else {
            res.status(200).json({
               name: "Ask your manager to add you",
               recipes: [],
               users: [],
            });
         }
      });
}

async function addUser(req, res) {
   let foundUser = await Users.find({ email: req.body.email });
   let foundRestaurant = await Restaurant.findById(req.params.id);

   if (foundUser) foundRestaurant.users.push(foundUser[0]._id);
   
   foundRestaurant.save()
      .then((savedRestaurant) => {
         res.status(200).json(savedRestaurant);
      })
      .catch((err) => {
         res.status(500).json(err);
      })
}