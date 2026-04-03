class TriageService {

calculateScore(signalStrength,timeGap,clusterSize){

const decayFactor = 0.05 * timeGap

const batteryRisk = Math.min(1,timeGap*0.02)

const clusterBoost = clusterSize*0.2

let score = 100 - (decayFactor*50 + batteryRisk*40)

score = score + clusterBoost

return Math.max(0,Math.min(100,score))
}

}

module.exports = new TriageService()
