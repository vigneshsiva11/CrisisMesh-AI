const parser = require('../utils/sosParser')

class SOSService{

processBeacon(ssid){

const parsed = parser.parseSSID(ssid)

return {

status:'Priority-1',

coordinates:{
lat:parsed?.lat,
lng:parsed?.lng
},

type:parsed?.type || 'SOS',

timestamp:new Date()

}

}

}

module.exports = new SOSService()

