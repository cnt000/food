// Load required packages
var Attribute = require('../models/attribute');

// Create endpoint /api/attributes for POST
exports.postAttribute = function(req, res) {
  // Create a new instance of the Attribute model
  var attribute = new Attribute();

  // Set the attribute properties that came from the POST data
  attribute.name = req.body.name;
  attribute.attribute_type = req.body.attribute_type;
  attribute.userId = req.user._id || "";

  // Save the attribute and check for errors
  attribute.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'Attribute added to the db!', data: attribute });
  });
};

// Create endpoint /api/attributes for GET
exports.getAttributes = function(req, res) {
  // Use the Attribute model to find all attribute { userId: req.user._id },
  Attribute.find(function(err, attributes) {
    if (err)
      res.send(err);

    res.json(attributes);
  });
};

// Create endpoint /api/attributes/:attribute_id for GET
exports.getAttribute = function(req, res) {
  // Use the Attribute model to find a specific attribute
  Attribute.find({ _id: req.params.attribute_id }, function(err, attribute) {
    if (err)
      res.send(err);

    res.json(attribute);
  });
};

// Create endpoint /api/attributes/:attribute_id for PUT
exports.putAttribute = function(req, res) {
  // Use the Attribute model to find a specific attribute
  Attribute.update({ _id: req.params.attribute_id }, { attribute_type: req.body.attribute_type }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/attributes/:attribute_id for DELETE
exports.deleteAttribute = function(req, res) {
  // Use the Attribute model to find a specific attribute and remove it
  Attribute.remove({ _id: req.params.attribute_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Attribute removed from the db!' });
  });
};