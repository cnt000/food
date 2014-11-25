// Load required packages
var mongoose = require('mongoose');

var OrderSchema   = new mongoose.Schema({
  cart_id: {
    type: String,
    unique: true,
    required: true
  },
  date: Date,
  orderDate: Date,
  items: Array,
  userId: String,
  note: String,
  confirmed: Boolean,
  closed: Boolean,
  valid: Boolean,
  total: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Order', OrderSchema);