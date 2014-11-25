var frisby = require('frisby');

describe("/orders", function() {

  var order2 = { 
            cart_id: "54675e8cccabc69141ca2903"+Math.random()*1000,
            orderDate: "2014-10-24T22:00:00.000Z",
            items: [
              {
                  "price" : "7.99",
                  "item_type" : "secondo piatto",
                  "name" : "polpettono di tonno in scatola_6431",
                  "attributes" : [ 
                      "tonno", 
                      "pangrattato", 
                      "uova", 
                      "parmigiano"
                  ]
              },

              {
                  "price" : "9.99",
                  "item_type" : "secondo piatto",
                  "name" : "polpettono di tonno in scatola_2533",
                  "attributes" : [ 
                      "tonno", 
                      "pangrattato", 
                      "uova", 
                      "parmigiano"
                  ]
              },

              {
                  "price" : "8.99",
                  "item_type" : "secondo piatto",
                  "name" : "polpettono di tonno in scatola_3712",
                  "attributes" : [ 
                      "tonno", 
                      "pangrattato", 
                      "uova", 
                      "parmigiano"
                  ]
              }
            ],
            note: "Questa è una nota",
            confirmed: false,
            closed: false,
            valid: true,
            total: 32.99
          };

  var server = "http://localhost:3000/";
  var baseRoute = "api";
  var basePath = server+baseRoute;
  var addedMessage =  "Order added to the db!";
  var deletedMessage = "Order removed from the db!";

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
  frisby.create('Get Orders')
    .get(basePath+'/orders')
    // .auth('edo', 'edo')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('0', {
        cart_id: String,
        date: String,
        orderDate: String,
        items: function(val) { expect(val).toBeTypeOrNull(Array); },
        userId: String,
        note: String,
        confirmed: Boolean,
        closed: Boolean,
        valid: Boolean
    })
  .toss();

  //POST ITEM
  frisby.create('Post Order')
    .post(basePath+'/orders', order2)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
       message: addedMessage,
       data: order2
     })
    // .inspectJSON(function(json) {})
    .afterJSON(function(json) {

      //GET ITEM
      frisby.create('Get Order')
        .get(basePath+'/orders/'+json.data._id)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSONTypes('0', {
            cart_id: String,
            date: String,
            orderDate: String,
            items: function(val) { expect(val).toBeTypeOrNull(Array); },
            userId: String,
            note: String,
            confirmed: Boolean,
            closed: Boolean,
            valid: Boolean
        })
        .expectJSON('0', order2)
      .toss();

      // PUT ITEM
      frisby.create('Put Order')
        .put(basePath+'/orders/'+json.data._id, { "valid": false })
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
      .toss();

      })
  .toss();

});