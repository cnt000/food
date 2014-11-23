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
var addedMessage =  "MenuEntry added to the db!";
var deletedMessage = "MenuEntry removed from the db!";

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

//GET Menu Entries
frisby.create('Get Menu Entries')
  .get(basePath+'/menu_entries')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
    item: Object,
    date: String,
    meal: String,
    outofstock: Boolean,
    userId: String
  })
.toss();

//POST Menu Entries
frisby.create('Menu Entry Post, Get, Put, Delete')
  .post(basePath+'/menu_entries', menu_entry2)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
     message: addedMessage,
     data: menu_entry2
   })
  // .inspectJSON(function(json) {})
  .afterJSON(function(json) {
    //GET ITEM
    frisby.create('Get Menu Entry')
      .get(basePath+'/menu_entries/'+json.data._id)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSONTypes('0', {
        item: Object,
        date: String,
        meal: String,
        outofstock: Boolean,
        userId: String
      })
      .expectJSON('0', menu_entry2)
    .toss();

    // PUT ITEM
    frisby.create('Put Menu Entry')
      .put(basePath+'/menu_entries/'+json.data._id, { "meal": "cena" })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
    .toss();

    // DELETE ITEM
    frisby.create('Delete Menu Entry')
      .delete(basePath+'/menu_entries/'+json.data._id)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
         message: deletedMessage
       })
    .toss();
  })
.toss();

frisby.create('Menu Entry Post, GetByDate')
  .post(basePath+'/menu_entries', menu_entry2)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
     message: addedMessage,
     data: menu_entry2
   })
  // .inspectJSON(function(json) {})
  .afterJSON(function(json) {

    frisby.create('Menu Entry GetByDate')
      .get(basePath+'/menu_entries/day/'+menu_entry2.date)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSONTypes('0', {
        item: Object,
        date: String,
        meal: String,
        outofstock: Boolean,
        userId: String
      })
      .expectJSON('0', menu_entry2)
    .toss();

    // PUT ITEM
    frisby.create('Change meal')
      .put(basePath+'/menu_entries/'+json.data._id, { "meal": "cena" })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
    .toss();

    frisby.create('Check meal changed')
      .get(basePath+'/menu_entries/day/'+menu_entry2.date+'/cena')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSONTypes('0', {
        item: Object,
        date: String,
        meal: String,
        outofstock: Boolean,
        userId: String
      })
      .expectJSON('*', {
        meal: "cena"
      })
    .toss();

    // DELETE ITEM
    frisby.create('Delete Menu Entry')
      .delete(basePath+'/menu_entries/'+json.data._id)
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
         message: deletedMessage
       })
    .toss();

  })
.toss();