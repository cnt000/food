// Load required packages
var Item = require('../models/item');

// Create endpoint /api/items for POST
exports.postItem = function(req, res) {
  // Create a new instance of the Item model
  var item = new Item();

  // Set the item properties that came from the POST data
  item.name = req.body.name;
  item.item_type = req.body.item_type;
  item.price = parseInt(req.body.price, 10);
  item.userId = req.user._id || "";
  item.attributes = req.body.attributes;

  // Save the item and check for errors
  item.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'Item added to the db!', data: item });
  });
};

// Create endpoint /api/items for GET
exports.getItems = function(req, res) {
  // Use the Item model to find all item { userId: req.user._id },
  Item.find(function(err, items) {
    if (err)
      res.send(err);

    res.json(items);
  });
};

// Create endpoint /api/items/:item_id for GET
exports.getItem = function(req, res) {
  // Use the Item model to find a specific item
  Item.find({ _id: req.params.item_id }, function(err, item) {
    if (err)
      res.send(err);

    res.json(item);
  });
};

// Create endpoint /api/items/:item_id for PUT
exports.putItem = function(req, res) {
  // Use the Item model to find a specific item
  Item.update({ _id: req.params.item_id }, { price: req.body.price }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/items/:item_id for DELETE
exports.deleteItem = function(req, res) {
  // Use the Item model to find a specific item and remove it
  Item.remove({ _id: req.params.item_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Item removed from the db!' });
  });
};