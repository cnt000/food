var frisby = require('frisby');

describe("/attributes client", function() {
  var attribute2 = { 
            "price": 7.99,
            "attribute_type": "primo piatto",
            "name": "tortellini con panna_"+parseInt(Math.random()*10000, 10),
            "attributes": [ "carne", "farina", "uova", "parmigiano" ]
          };

  var server = "http://localhost:3000/";
  var baseRoute = "api";
  var basePath = server+baseRoute;
  var addedMessage =  "Attribute added to the db!";
  var deletedMessage = "Attribute removed from the db!";

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

  //GET ITEMS
  frisby.create('Get Attributes')
    .get(basePath+'/attributes')
    // .auth('edo', 'edo')
    .expectStatus(401)
  .toss();

  //POST ITEM
  frisby.create('Post Attribute')
    .post(basePath+'/attributes', attribute2)
    .expectStatus(401)
      .toss();

  // GET ITEM
  frisby.create('Put Attribute')
    .put(basePath+'/attributes/arandomid')
    .expectStatus(401)
  .toss();

  // PUT ITEM
  frisby.create('Put Attribute')
    .put(basePath+'/attributes/arandomid', { "attribute_type": "ingrediente di base" })
    .expectStatus(401)
  .toss();

  // DELETE ITEM
  frisby.create('Delete Attribute')
    .delete(basePath+'/attributes/arandomid')
    .expectStatus(401)
  .toss();

});