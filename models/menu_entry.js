// Load required packages
var mongoose = require('mongoose');

var MenuEntrySchema   = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  date: Date,
  meal: String,
  outofstock: Boolean,
  userId: String,
});

// Export the Mongoose model
module.exports = mongoose.model('MenuEntry', MenuEntrySchema);