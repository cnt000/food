var frisby = require('frisby');

describe("/carts client", function() {

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
        'Authorization': 'Bearer lRn1zpV6ueMZLGrqqr2d7CmlJYr5WSV5jQhf0PpyARaEfGLxm6xsCC52iGhqjaA3XDLfeWbd8HQlAx1HYiO6tV3foBLNygUv4wFYufEQ6TJQPo5mYskhfyaXVLfTgZ7gyxpyjAS7V8yP9lwnNZ5ljcEt6sjgISHhtRUjwc20XpdepRKJn3PdnyfKWKGWMqyBc8kBqRiIZZQQtfiKqlCXaeR5mc8Xba6pCG24LgTPSfUa42Lf6IHTCAiHkU7YxQTD'
      },
      inspectOnFailure: true
    }
  });

  //GET CartS
  frisby.create('Get Carts')
    .get(basePath+'/carts')
    // .auth('edo', 'edo')
    .expectStatus(401)
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
        .expectStatus(401)
      .toss();

      //GET User Cart
      frisby.create('Get User Cart')
        .get(basePath+'/carts/user/'+json.data._id)
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