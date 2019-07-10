const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   name: {type: String, required: true},
   amount: {type: String, required: true}
}, {
   timestamps: true
});

const recipeSchema = new Schema({
   station: {type: String, required: true},
   ingredients: [ingredientSchema],
   technique: {type: String, required: true}
}, {
   timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);