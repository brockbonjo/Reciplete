const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
   name: {type: String, required: true},
   users: [{type: Schema.Types.ObjectId, ref: 'User'}],
   recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);