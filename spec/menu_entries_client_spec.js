var frisby = require('frisby');

var menu_entry2 = { 
        "outofstock" : false,
        "meal" : "pranzo",
        "date" : "2014-10-24T22:00:00.000Z",
        "item" : { 
          "price": 7.99,
          "item_type": "primo piatto",
          "name": "tortellini con panna",
          "attributes": [ "carne", "farina", "uova", "parmigiano" ]
        }
      };

var server = "http://localhost:3000/";
var baseRoute = "api";
var basePath = server+baseRoute;

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

frisby.create('Menu Entry Post failed (Auth check)')
  .post(basePath+'/menu_entries', menu_entry2)
  .expectStatus(401)
.toss();

//GET Menu Entries
frisby.create('Get Menu Entries, check put and delete failed (Auth check)')
  .get(basePath+'/menu_entries')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  // .inspectJSON(function(json) {})
  .afterJSON(function(json) {

	frisby.create('Menu Entry Put from Client (Auth check)')
	  .put(basePath+'/menu_entries/'+json[0]._id, { "meal": "cena" })
	  .expectStatus(401)
	.toss();

	frisby.create('Menu Entry Put from Client (Auth check)')
	  .delete(basePath+'/menu_entries/'+json[0]._id)
	  .expectStatus(401)
	.toss();

  })
.toss();