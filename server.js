// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var itemController = require('./controllers/item');
var attributeController = require('./controllers/attribute');
var menuEntryController = require('./controllers/menu_entry');
var cartController = require('./controllers/cart');
var orderController = require('./controllers/order');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');

// Connect to the itemlocker MongoDB
mongoose.connect('mongodb://localhost:27017/food');

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Use express session support since OAuth2orize requires it
app.use(session({ 
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /orders
router.route('/api/orders')
  .post(authController.isAuthenticated, orderController.postOrder)
  .get(authController.isAuthenticated, authController.needsGroup('operator'), orderController.getOrders);

// Create endpoint handlers for /orders/:order_id'
router.route('/api/orders/:order_id')
  .get(authController.isAuthenticated, authController.needsGroup('operator'), orderController.getOrder)
  .put(authController.isAuthenticated, authController.needsGroup('operator'), orderController.putOrder);

router.route('/api/orders/user/:order_id')
  .get(authController.isAuthenticated, orderController.getUserOrder);

// Create endpoint handlers for /carts
router.route('/api/carts')
  .post(authController.isAuthenticated, cartController.postCart)
  .get(authController.isAuthenticated, authController.needsGroup('operator'), cartController.getCarts);

// Create endpoint handlers for /carts/:cart_id
router.route('/api/carts/:cart_id')
  .get(authController.isAuthenticated, authController.needsGroup('operator'), cartController.getCart);

router.route('/api/carts/user/:cart_id')
  .get(authController.isAuthenticated, cartController.getUserCart);

// Create endpoint handlers for /attributes
router.route('/api/menu_entries')
  .post(authController.isAuthenticated, authController.needsGroup('operator'), menuEntryController.postMenuEntry)
  .get(authController.isAuthenticated, menuEntryController.getMenuEntries);

// Create endpoint handlers for /attributes/:attribute_id
router.route('/api/menu_entries/:menu_entry_id')
  .get(authController.isAuthenticated, menuEntryController.getMenuEntry)
  .put(authController.isAuthenticated, authController.needsGroup('operator'), menuEntryController.putMenuEntry)
  .delete(authController.isAuthenticated, authController.needsGroup('operator'), menuEntryController.deleteMenuEntry);


// Create endpoint handlers for /attributes
router.route('/api/attributes')
  .post(authController.isAuthenticated, authController.needsGroup('operator'), attributeController.postAttribute)
  .get(authController.isAuthenticated, authController.needsGroup('operator'), attributeController.getAttributes);

// Create endpoint handlers for /attributes/:attribute_id
router.route('/api/attributes/:attribute_id')
  .get(authController.isAuthenticated, authController.needsGroup('operator'), attributeController.getAttribute)
  .put(authController.isAuthenticated, authController.needsGroup('operator'), attributeController.putAttribute)
  .delete(authController.isAuthenticated, authController.needsGroup('operator'), attributeController.deleteAttribute);

// Create endpoint handlers for /items
router.route('/api/items')
  .post(authController.isAuthenticated, authController.needsGroup('operator'), itemController.postItem)
  .get(authController.isAuthenticated, authController.needsGroup('operator'), itemController.getItems);

// Create endpoint handlers for /items/:item_id
router.route('/api/items/:item_id')
  .get(authController.isAuthenticated, authController.needsGroup('operator'), itemController.getItem)
  .put(authController.isAuthenticated, authController.needsGroup('operator'), itemController.putItem)
  .delete(authController.isAuthenticated, authController.needsGroup('operator'), itemController.deleteItem);


// Create endpoint handlers for /users
router.route('/api/users')
  //.post(userController.postUser)
  .get(authController.isAuthenticated, authController.needsGroup('operator'), userController.getUsers);

// Create endpoint handlers for /clients
router.route('/api/clients')
  .post(authController.isAuthenticated, clientController.postClient)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/api/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes
app.use(router);

// Start the server
app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});

