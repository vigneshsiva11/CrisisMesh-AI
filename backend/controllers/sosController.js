const service = require('../services/sosService')

exports.receiveSOS = async(req,res)=>{

const { ssid } = req.body

const result = service.processBeacon(ssid)

res.json(result)

}

