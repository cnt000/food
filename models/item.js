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
  attributes: Array
});

module.exports = mongoose.model('Item', ItemSchema);
