var frisby = require('frisby');

describe("/attributes", function() {

  var attribute2 = { 
            name: "farina 00",
            attribute_type: "ingrediente"
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
        'Authorization': 'Bearer KzESxGzBK8oBHuu54dybD8WJ9SUaJsXolQ6N7Aggwo2w2TeqLZH9QufEHKbaBmbB5qaWWNghBx456WDm4VeAB66ibkvmD2nYi2KG4cL65ZeyDiO1qN4d5L0vlxlwZVEJhHdDzs7Lv9v2O1cb7EkMyKHrDzofMhtzSraCaLu8PVEbqW8GnJCdtB4duTIPWv2nhsW4Rusr11f8CVcMDVs1uLTw42J6LL148aJfQjDFeAqhekhX6rKkZd1pFldmaQzG'
      },
      inspectOnFailure: true
    }
  });

  //GET ITEMS
  frisby.create('Get Attributes')
    .get(basePath+'/attributes')
    // .auth('edo', 'edo')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('0', {
      name: String,
      attribute_type: String
    })
  .toss();

  //POST ITEM
  frisby.create('Post Attribute')
    .post(basePath+'/attributes', attribute2)
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
       message: addedMessage,
       data: attribute2
     })
    // .inspectJSON(function(json) {})
    .afterJSON(function(json) {

      //GET ITEM
      frisby.create('Get Attribute')
        .get(basePath+'/attributes/'+json.data._id)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSONTypes('0', {
          name: String,
          attribute_type: String
        })
        .expectJSON('0', attribute2)
      .toss();

      // PUT ITEM
      frisby.create('Put Attribute')
        .put(basePath+'/attributes/'+json.data._id, { "attribute_type": "ingrediente di base"})
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
      .toss();

      // DELETE ITEM
      frisby.create('Delete Attribute')
        .delete(basePath+'/attributes/'+json.data._id)
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
           message: deletedMessage
         })
      .toss();

      })
  .toss();
});