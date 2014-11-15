// Load required packages
var Cart = require('../models/cart');

// Create endpoint /api/carts for POST
exports.postCart = function(req, res) {
  // Create a new instance of the Cart model
  var cart = new Cart();

  // Set the cart properties that came from the POST data
  cart.cart_token = req.body.cart_token || uid(32);
  cart.generated = req.body.generated || new Date();
  cart.userId = req.user._id;

  // Save the cart and check for errors
  cart.save(function(err) {
    if (err)
      return res.json(err);


    res.json({ message: 'Cart added to the db!', data: cart });
  });
};

// Create endpoint /api/carts for GET
exports.getCarts = function(req, res) {
  // Use the Cart model to find all cart { userId: req.user._id },
  Cart.find(function(err, carts) {
    if (err)
      res.send(err);

    res.json(carts);
  });
};

// Create endpoint /api/carts/:cart_id for GET
exports.getCart = function(req, res) {
  // Use the Cart model to find a specific cart
  Cart.find({ _id: req.params.cart_id }, function(err, cart) {
    if (err)
      res.send(err);

    res.json(cart);
  });
};

// Create endpoint /api/carts/user/:cart_id for GET
exports.getUserCart = function(req, res) {
  // Use the Cart model to find a specific cart
  Cart.find({ _id: req.params.cart_id, userId: req.user._id }, function(err, cart) {
    if (err)
      res.send(err);

    res.json(cart);
  });
};

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
function uid (len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}