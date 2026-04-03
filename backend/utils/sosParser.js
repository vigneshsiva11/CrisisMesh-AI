class SOSParser {

parseSSID(ssid){

if(!ssid.startsWith('SOS')) return null

const parts = ssid.split('_')

let data = {
priority:1,
timestamp:new Date()
}

if(parts.length >=3){

data.lat = parts[1]
data.lng = parts[2]

}

if(ssid.includes('MEDICAL')){

data.type='MEDICAL'
data.priority=1

}

if(ssid.includes('HELP')){

data.type='HELP'

}

return data

}

}

module.exports = new SOSParser()

