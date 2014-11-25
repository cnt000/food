var frisby = require('frisby');

describe("/carts", function() {

  var cart2 = { 
            generated: "2014-10-24T22:00:00.000Z"
          };

  var server = "http://localhost:3000/";
  var baseRoute = "api";
  var basePath = server+baseRoute;
  var addedMessage =  "Cart added to the db!";
  var deletedMessage = "Cart removed from the db!";

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

  //GET CartS
  frisby.create('Get Carts')
    .get(basePath+'/carts')
    // .auth('edo', 'edo')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('0', {
        cart_token: String,
        userId: String,
        generated: String
    })
  .toss();

  //POST Cart
  frisby.create('Post Cart')
    .post(basePath+'/carts', cart2)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
       message: addedMessage,
       data: cart2
     })
    // .inspectJSON(function(json) {})
    .afterJSON(function(json) {

      //GET Cart
      frisby.create('Get Cart')
        .get(basePath+'/carts/'+json.data._id)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSONTypes('0', {
            cart_token: String,
            userId: String,
            generated: String
        })
       .expectJSON('0', { generated: cart2.generated })
      .toss();

    })
  .toss();

});