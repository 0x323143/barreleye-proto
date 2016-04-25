'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();
module.exports = app; // for testing

// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://node:node@jello.modulusmongo.net:27017/emEvu7go', function(err) {
//     if (err) { console.log(err) }
// });

var config = {
  appRoot: __dirname // required config
};

// install securityHandlers
// security code
// sha-256 : http://www.xorbin.com/tools/sha256-hash-calculator
// data: "This is my design"
config.swaggerSecurityHandlers = {
  api_key: function securityHandler(req, authOrSecDef, scopesOrApiKey, callback) {
    if ('43a06ad9b5293d41d53b57a1430d032782f126101967a14e0c2c61314f85eb0c' == scopesOrApiKey) {
      callback();
    } else {
      callback(new Error('access denied!'));
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }


  // install swagger-ui
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  // install middleware
  swaggerExpress.register(app);


  var port = process.env.PORT || 8088;
  app.listen(port);
});
