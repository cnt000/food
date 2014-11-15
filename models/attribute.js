// Load required packages
var mongoose = require('mongoose');

var AttributeSchema   = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  attribute_type: {
    type: String
  }
});

module.exports = mongoose.model('Attribute', AttributeSchema);