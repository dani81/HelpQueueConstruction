var mongoose = require('mongoose');
var HelpQSchema = new mongoose.Schema({
  name: String,
  helpCount: {type: Number, default: 0}
});


HelpQSchema.methods.incHelpCount = function(cb) {
  this.helpCount += 1;
  this.save(cb);
};


mongoose.model('HelpQ', HelpQSchema);
