// Load required packages
var Order = require('../models/order');

// Create endpoint /api/orders for POST
exports.postOrder = function(req, res) {
  // Create a new instance of the Order model
  var order = new Order();

  // Set the order properties that came from the POST data
  order.cart_id = req.body.cart_id;
  order.date = new Date();
  order.orderDate = new Date(req.body.orderDate);
  order.items = req.body.items;
  order.valid = true;
  order.note = req.body.note;
  order.total = parseFloat(req.body.total);
  order.userId = req.user._id;
  order.confirmed = req.body.confirmed;
  order.closed = req.body.closed;

  // Save the order and check for errors
  order.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'Order added to the db!', data: order });
  });
};

// Create endpoint /api/orders for GET
exports.getOrders = function(req, res) {
  // Use the Order model to find all order
  Order.find(function(err, orders) {
    if (err)
      res.send(err);

    res.json(orders);
  });
};

// Create endpoint /api/orders/:order_id for GET
exports.getOrder = function(req, res) {
  // Use the Order model to find a specific order
  Order.find({ _id: req.params.order_id }, function(err, order) {
    if (err)
      res.send(err);

    res.json(order);
  });
};

// Create endpoint /api/orders/:order_id for PUT
exports.putOrder = function(req, res) {
  // Use the Order model to find a specific order
  Order.update({ _id: req.params.order_id }, { valid: req.body.valid }, function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/orders/user/:order_id for GET
exports.getUserOrder = function(req, res) {
  // Use the Order model to find a specific cart
  Order.find({ _id: req.params.order_id, userId: req.user._id }, function(err, cart) {
    if (err)
      res.send(err);

    res.json(cart);
  });
};
