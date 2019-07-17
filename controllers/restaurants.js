const Restaurant = require('../models/restaurant');
const Users = require('../models/user');

module.exports = {
   create,
   get,
   addOrUpdateUser,
   removeUser
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
      .find({ users: { $in: req.user._id } })
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

async function addOrUpdateUser(req, res) {
   let foundUser = await Users.findOneAndUpdate({ email: req.body.email }, req.body, { new: true });
   let foundRestaurant = await Restaurant.findById(req.params.id);
   console.log(foundRestaurant.users);
   if (foundUser && !foundRestaurant.users.includes(foundUser._id)) foundRestaurant.users.push(foundUser._id);
   console.log(foundRestaurant.users);
   
   foundRestaurant.save()
      .then((savedRestaurant) => {
         res.status(200).json(savedRestaurant);
      })
      .catch((err) => {
         res.status(500).json(err);
      })
}

async function removeUser(req, res) {
   console.log(req.body);
   let foundRestaurant = await Restaurant.findById(req.params.id);
   let users = foundRestaurant.users.filter(userId => userId != req.body.userId);
   console.log(foundRestaurant.users);
   foundRestaurant.users = users;
   console.log(foundRestaurant.users);
   foundRestaurant.save(err => {
      if (err) return res.json(err);
      res.json(foundRestaurant);
   });
}