const mongoose = require('mongoose');

const VictimSchema = new mongoose.Schema({
coordinates:String,
status:String,
timestamp:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Victim',VictimSchema);
