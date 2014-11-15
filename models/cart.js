// Load required packages
var mongoose = require('mongoose');

var CartSchema   = new mongoose.Schema({
  cart_token: {
    type: String,
    unique: true,
    required: true
  },
  userId: String,
  generated: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Cart', CartSchema);