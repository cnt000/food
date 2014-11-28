// Load required packages
var mongoose = require('mongoose');

var ItemSchema   = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  item_type: String,
  price: Number,
  userId: String,
  attributes: { type: mongoose.Schema.Types.ObjectId, ref: 'Attributes' },
  photo: String
});

module.exports = mongoose.model('Item', ItemSchema);
