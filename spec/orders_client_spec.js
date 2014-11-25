var frisby = require('frisby');

describe("/orders client", function() {

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
        'Authorization': 'Bearer lRn1zpV6ueMZLGrqqr2d7CmlJYr5WSV5jQhf0PpyARaEfGLxm6xsCC52iGhqjaA3XDLfeWbd8HQlAx1HYiO6tV3foBLNygUv4wFYufEQ6TJQPo5mYskhfyaXVLfTgZ7gyxpyjAS7V8yP9lwnNZ5ljcEt6sjgISHhtRUjwc20XpdepRKJn3PdnyfKWKGWMqyBc8kBqRiIZZQQtfiKqlCXaeR5mc8Xba6pCG24LgTPSfUa42Lf6IHTCAiHkU7YxQTD'
      },
      inspectOnFailure: true
    }
  });

  //GET ORDERS
  frisby.create('Get Orders')
    .get(basePath+'/orders')
    // .auth('edo', 'edo')
    .expectStatus(401)
  .toss();

  //POST ORDER
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

      //GET ORDER
      frisby.create('Get Order')
        .get(basePath+'/orders/'+json.data._id)
        .expectStatus(401)
      .toss();

      //GET USER ORDER
      frisby.create('Get Order')
        .get(basePath+'/orders/user/'+json.data._id)
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

      // PUT ORDER
      frisby.create('Put Order')
        .put(basePath+'/orders/'+json.data._id, { "valid": false })
        .expectStatus(401)
      .toss();

      })
  .toss();

});