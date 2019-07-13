const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   name: {type: String, required: true},
   amount: {type: String, required: true}
}, {
   timestamps: true
});

const techniqueSchema = new Schema({
   content: {type: String, required: true}
}, {
   timestamps: true
});

const recipeSchema = new Schema({
   name: {type: String, required: true},
   station: {type: String, required: true},
   ingredients: [ingredientSchema],
   technique: [techniqueSchema],
   revisions: [{type: Schema.Types.ObjectId, ref: 'Revision'}]
}, {
   timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);