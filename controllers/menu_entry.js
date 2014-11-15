// Load required packages
var MenuEntry = require('../models/menu_entry');

// Create endpoint /api/menu_entries for POST
exports.postMenuEntry = function(req, res) {
  // Create a new instance of the MenuEntry model
  var menuEntry = new MenuEntry();

  // Set the menuEntry properties that came from the POST data
  menuEntry.item = req.body.item;
  menuEntry.date = req.body.date;
  menuEntry.meal = req.body.meal || "";
  menuEntry.userId = req.user._id || "";
  menuEntry.outofstock = req.body.outofstock || false;

  // Save the menu_entry and check for errors
  menuEntry.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'MenuEntry added to the db!', data: menuEntry });
  });
};

// Create endpoint /api/menu_entries for GET
exports.getMenuEntries = function(req, res) {
  // Use the MenuEntry model to find all menu_entry { userId: req.user._id },
  MenuEntry.find(function(err, menuEntries) {
    if (err)
      res.send(err);

    res.json(menuEntries);
  });
};

// Create endpoint /api/menu_entries/:menu_entry_id for GET
exports.getMenuEntry = function(req, res) {
  // Use the MenuEntry model to find a specific menu_entry
  MenuEntry.find({ _id: req.params.menu_entry_id }, function(err, menuEntries) {
    if (err)
      res.send(err);

    res.json(menuEntries);
  });
};

// Create endpoint /api/menu_entries/:menu_entry_id for PUT
exports.putMenuEntry = function(req, res) {
  // Use the MenuEntry model to find a specific menu_entry
  MenuEntry.update({ _id: req.params.menu_entry_id }, { meal: req.body.meal }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/menu_entries/:menu_entry_id for DELETE
exports.deleteMenuEntry = function(req, res) {
  // Use the MenuEntry model to find a specific menu_entry and remove it
  MenuEntry.remove({ _id: req.params.menu_entry_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'MenuEntry removed from the db!' });
  });
};