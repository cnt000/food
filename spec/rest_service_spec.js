var frisby = require('frisby');

// frisby.create('GET JSON data from an endpoint')
//   .get('http://httpbin.org/get')
//   .expectStatus(200)
//   .expectHeader('Content-Type', 'application/json')
//   .expectJSON({ 'url': 'http://httpbin.org/get' })
// .toss();

frisby.create('Get Items')
  .get('http://localhost:3000/api/items')
  .addHeader('Authorization', 'Bearer lRn1zpV6ueMZLGrqqr2d7CmlJYr5WSV5jQhf0PpyARaEfGLxm6xsCC52iGhqjaA3XDLfeWbd8HQlAx1HYiO6tV3foBLNygUv4wFYufEQ6TJQPo5mYskhfyaXVLfTgZ7gyxpyjAS7V8yP9lwnNZ5ljcEt6sjgISHhtRUjwc20XpdepRKJn3PdnyfKWKGWMqyBc8kBqRiIZZQQtfiKqlCXaeR5mc8Xba6pCG24LgTPSfUa42Lf6IHTCAiHkU7YxQTD')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  // .expectJSON('0', {
  //   place: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); }, // Custom matcher callback
  //   user: {
  //     verified: false,
  //     location: "Oklahoma City, OK",
  //     url: "http://brightb.it"
  //   }
  // })
  .expectJSONTypes('0', {
    name: String,
    item_type: String,
    price: Number,
    attributes: function(val) { expect(val).toBeTypeOrNull(Array); }, // Custom matcher callback
    userId: String
  })
.toss();