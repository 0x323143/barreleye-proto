var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://node:node@jello.modulusmongo.net:27017/emEvu7go');

autoIncrement.initialize(connection);


/******************************************************************************
 * SCHEMA
******************************************************************************/
var SingleScenarioSchema   = new Schema({
  s_id: {type: Number},
  s_name: String,
  s_type: String,
  s_pattern: String,
  s_apply_type: String,
  s_run_period: String,
  s_detect_action_policy: String,
  s_profile_period: String,
  s_datetime: String,
  s_created_time: Number
});

SingleScenarioSchema.plugin(autoIncrement.plugin, {
  model: 'SingleScenario',
  field: 's_id',
  startAt: 1
});
module.exports = connection.model('SingleScenario', SingleScenarioSchema);
