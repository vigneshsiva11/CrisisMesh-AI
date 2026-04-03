const Disaster=require('../models/Disaster');

exports.getAll=()=>Disaster.find();
exports.create=(data)=>new Disaster(data).save();
