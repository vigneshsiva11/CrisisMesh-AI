const Victim=require('../models/Victim');

exports.getAll=()=>Victim.find();
exports.create=(data)=>new Victim(data).save();
