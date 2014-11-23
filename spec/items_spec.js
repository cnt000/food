var frisby = require('frisby');

var item2 = { 
          "price": 7.99,
          "item_type": "primo piatto",
          "name": "tortellini con panna_"+parseInt(Math.random()*10000, 10),
          "attributes": [ "carne", "farina", "uova", "parmigiano" ]
        };

var addedMessage =  "Item added to the db!";
var deletedMessage = "Item removed from the db!";

var testId = "5470befb8b70a6301de03e79";

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'Accept': 'application/json'},
    inspectOnFailure: true
  }
});

//GET ITEMS
frisby.create('Get Items')
  .get('http://localhost:3000/api/items')
  .auth('edo', 'edo')
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
  .post('http://localhost:3000/api/items',
        item2,
        {
            json: true,
            headers: {
                "content-type": "application/json"
            }
        })
  .auth('edo', 'edo')
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
      .get('http://localhost:3000/api/items/'+json.data._id)
      .auth('edo', 'edo')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSONTypes('0', {
        name: String,
        item_type: String,
        price: Number,
        attributes: function(val) { expect(val).toBeTypeOrNull(Array); }, // Custom matcher callback
        userId: String
      })
      .expectJSON('0', {
        name: item2.name,
        item_type: item2.item_type,
        price: item2.price,
        attributes: item2.attributes
      })
      // PUT ITEM
      frisby.create('Put Item')
        .put('http://localhost:3000/api/items/'+json.data._id,
              { "price": 12.99 },
              {
                  json: true,
                  headers: {
                      "content-type": "application/json"
                  }
              })
        .auth('edo', 'edo')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
      .toss();

      // DELETE ITEM
      frisby.create('Delete Item')
        .delete('http://localhost:3000/api/items/'+json.data._id)
        .auth('edo', 'edo')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
           message: deletedMessage
         })
      .toss();

    })
.toss();