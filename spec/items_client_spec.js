var frisby = require('frisby');

describe("/items client", function() {
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
        'Authorization': 'Bearer lRn1zpV6ueMZLGrqqr2d7CmlJYr5WSV5jQhf0PpyARaEfGLxm6xsCC52iGhqjaA3XDLfeWbd8HQlAx1HYiO6tV3foBLNygUv4wFYufEQ6TJQPo5mYskhfyaXVLfTgZ7gyxpyjAS7V8yP9lwnNZ5ljcEt6sjgISHhtRUjwc20XpdepRKJn3PdnyfKWKGWMqyBc8kBqRiIZZQQtfiKqlCXaeR5mc8Xba6pCG24LgTPSfUa42Lf6IHTCAiHkU7YxQTD'
      },
      inspectOnFailure: true
    }
  });

  //GET ITEMS
  frisby.create('Get Items')
    .get(basePath+'/items')
    // .auth('edo', 'edo')
    .expectStatus(401)
  .toss();

  //POST ITEM
  frisby.create('Post Item')
    .post(basePath+'/items', item2)
    .expectStatus(401)
      .toss();

  // GET ITEM
  frisby.create('Put Item')
    .put(basePath+'/items/arandomid')
    .expectStatus(401)
  .toss();

  // PUT ITEM
  frisby.create('Put Item')
    .put(basePath+'/items/arandomid', { "price": 12.99 })
    .expectStatus(401)
  .toss();

  // DELETE ITEM
  frisby.create('Delete Item')
    .delete(basePath+'/items/arandomid')
    .expectStatus(401)
  .toss();

});