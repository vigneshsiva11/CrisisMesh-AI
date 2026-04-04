
# create required folders (safe if already exist)
New-Item -ItemType Directory -Force -Path backend/services | Out-Null
New-Item -ItemType Directory -Force -Path backend/controllers | Out-Null
New-Item -ItemType Directory -Force -Path backend/routes | Out-Null
New-Item -ItemType Directory -Force -Path backend/utils | Out-Null

# SSID parser utility
@"
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

"@ | Set-Content backend/utils/sosParser.js

# SOS service
@"
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

"@ | Set-Content backend/services/sosService.js

# SOS controller
@"
const service = require('../services/sosService')

exports.receiveSOS = async(req,res)=>{

const { ssid } = req.body

const result = service.processBeacon(ssid)

res.json(result)

}

"@ | Set-Content backend/controllers/sosController.js

# SOS route
@"
const router = require('express').Router()

const controller = require('../controllers/sosController')

router.post('/',controller.receiveSOS)

module.exports = router

"@ | Set-Content backend/routes/sosRoutes.js

Write-Host 'SOS Beacon backend created successfully'
