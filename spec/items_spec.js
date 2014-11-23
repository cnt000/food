var frisby = require('frisby');

var item2 = { 
          "price": 7.99,
          "item_type": "primo piatto",
          "name": "tortellini con panna_"+parseInt(Math.random()*10000, 10),
          "attributes": [ "carne", "farina", "uova", "parmigiano" ]
        };

var server = "http://localhost:3000/";
var baseRoute = "api";
var basePath = server+baseRoute;
var addedMessage =  "Item added to the db!";
var deletedMessage = "Item removed from the db!";

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{
      'Accept': 'application/json',
      'Authorization': 'Bearer KzESxGzBK8oBHuu54dybD8WJ9SUaJsXolQ6N7Aggwo2w2TeqLZH9QufEHKbaBmbB5qaWWNghBx456WDm4VeAB66ibkvmD2nYi2KG4cL65ZeyDiO1qN4d5L0vlxlwZVEJhHdDzs7Lv9v2O1cb7EkMyKHrDzofMhtzSraCaLu8PVEbqW8GnJCdtB4duTIPWv2nhsW4Rusr11f8CVcMDVs1uLTw42J6LL148aJfQjDFeAqhekhX6rKkZd1pFldmaQzG'
    },
    inspectOnFailure: true
  }
});

//GET ITEMS
frisby.create('Get Items')
  .get(basePath+'/items')
  // .auth('edo', 'edo')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
    name: String,
    item_type: String,
    price: Number,
    attributes: function(val) { expect(val).toBeTypeOrNull(Array); }, // Custom matcher callback
    userId: String
  })
.toss();

//POST ITEM
frisby.create('Post Item')
  .post(basePath+'/items', item2)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
     message: addedMessage,
     data: item2
   })
  // .inspectJSON(function(json) {})
  .afterJSON(function(json) {

    //GET ITEM
    frisby.create('Get Item')
      .get(basePath+'/items/'+json.data._id)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSONTypes('0', {
        name: String,
        item_type: String,
        price: Number,
        attributes: function(val) { expect(val).toBeTypeOrNull(Array); }, // Custom matcher callback
        userId: String
      })
      .expectJSON('0', item2)
    .toss();

    // PUT ITEM
    frisby.create('Put Item')
      .put(basePath+'/items/'+json.data._id, { "price": 12.99 })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
    .toss();

    // DELETE ITEM
    frisby.create('Delete Item')
      .delete(basePath+'/items/'+json.data._id)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
         message: deletedMessage
       })
    .toss();

    })
.toss();