const service=require('../services/victimService');

exports.getAll=async(req,res)=>res.json(await service.getAll());
exports.create=async(req,res)=>res.json(await service.create(req.body));
