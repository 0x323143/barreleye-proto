'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var SingleScenario = require('../models/model_single_scenario');
/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  addSingleScenario: addSingleScenario,
  getSingleScenarioById: getSingleScenarioById,
  setSingleScenarioById: setSingleScenarioById
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function addSingleScenario(req, res) {
  var scenario = new SingleScenario();
  scenario.s_name = req.body.s_name;
  scenario.s_type = req.body.s_type;
  scenario.s_pattern = req.body.s_pattern;
  scenario.s_apply_type = req.body.s_apply_type;
  scenario.s_created_time = (new Date).getTime();

  scenario.save(function (err, scen) {
    if (err) {
      res.send(err);
      return;
    } else {
      res.json(scen);
    }
  });
}

function getSingleScenarioById(req, res) {
  SingleScenario.findOne({ "s_id": req.swagger.params.s_id.value }, function(err, scen) {
    if (err) {
      console.log(typeof req.swagger.params.s_id.value);
      console.log(err);
      res.send(err);
      return;
    } else {
      res.json(scen);
    }
  });
}

function setSingleScenarioById(req, res) {
  SingleScenario.findOne({ "s_id": req.swagger.params.s_id.value }, function(err, scen) {
    if (err) {
      res.send(err);
      return;
    } else {
      scen.s_name = req.body.s_name;
      scen.s_type = req.body.s_type;
      scen.s_pattern = req.body.s_pattern;
      scen.s_apply_type = req.body.s_apply_type;
      scen.s_created_time = (new Date).getTime();
      scen.save(function (err, _scen){
        if (err) {
          res.send(err);
          return;
        } else {
          res.json(scen);
        }
      });
    }
  });
}
