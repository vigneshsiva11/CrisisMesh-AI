const mongoose = require('mongoose');

const DisasterSchema = new mongoose.Schema({
location:String,
severity:String,
timestamp:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Disaster',DisasterSchema);
