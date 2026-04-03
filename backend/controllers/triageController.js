const triageService = require('../services/triageService')

exports.getPriorityVictims = async(req,res)=>{

const sampleSignals=[
{signal:70,timeGap:5,cluster:3},
{signal:40,timeGap:20,cluster:1},
{signal:30,timeGap:30,cluster:4}
]

const ranked = sampleSignals.map(v=>({

score: triageService.calculateScore(v.signal,v.timeGap,v.cluster)

})).sort((a,b)=>b.score-a.score)

res.json(ranked)

}
