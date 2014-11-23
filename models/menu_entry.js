// Load required packages
var mongoose = require('mongoose');

var MenuEntrySchema   = new mongoose.Schema({
  item: {
    name: {
      type: String,
      unique: true,
      required: true
    },
	item_type: String,
	price: Number,
	userId: String,
	attributes: Array,
	photo: String
  },
  date: Date,
  meal: String,
  outofstock: Boolean,
  userId: String,
});

// Export the Mongoose model
module.exports = mongoose.model('MenuEntry', MenuEntrySchema);