const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   name: {type: String, required: true},
   amount: {type: String, required: true}
}, {
   timestamps: true
});

const revisionSchema = new Schema({
   author: {type: Schema.Types.ObjectId, ref: 'User'},
   admin: {type: Schema.Types.ObjectId, ref: 'User'},
   ingredients: [ingredientSchema],
   technique: [{type: String, required: true}],
   comments: {type: String, required: true},
   status: {type: String, required: true}
}, {
   timestamps: true
});

module.exports = mongoose.model('Revision', revisionSchema);