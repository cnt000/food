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
  },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Items' }
});

module.exports = mongoose.model('Attribute', AttributeSchema);