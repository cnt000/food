// Load required packages
var Item = require('../models/item');
var Item = require('../models/attribute');


// Create endpoint /api/items for POST
exports.postItem = function(req, res) {
  // Create a new instance of the Item model
  var item = new Item(req.body);

  item.photo = req.body.photo || "";
  item.userId = req.user._id || "";

  // Save the item and check for errors
  item.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'Item added to the db!', data: item });
  });
};

exports.postItemAttribute = function(req, res, next) {

  var attribute = new Attribute(req.body);
  attribute.item = req.item_id;

  attribute.save(function(err, attribute){

    if(err){ return next(err); }

    req.item.attributes.push(attribute);
    req.item.save(function(err, attribute) {

      if(err){ return next(err); }

      res.json(attribute);
    });
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
  Item.update({ _id: req.params.item_id }, 
    { 
      price: req.body.price 
    }, function(err, num, raw) {
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