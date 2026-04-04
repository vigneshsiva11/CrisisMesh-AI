const Victim = require("../models/Victim")

class ClusterService {

    clusterVictims(victims){

        const grid = {}

        victims.forEach(v => {

            if(!v.coordinates) return

            const x = Math.floor(v.coordinates.x / 50)
            const y = Math.floor(v.coordinates.y / 50)

            const key = `${x}-${y}`

            if(!grid[key]) grid[key] = []

            grid[key].push(v)

        })

        const clusters = Object.values(grid).map(group => {

            const centerX = group.reduce((s,v)=>s+v.coordinates.x,0)/group.length
            const centerY = group.reduce((s,v)=>s+v.coordinates.y,0)/group.length

            const priorityScore =
                group.filter(v => v.status === "Priority-1").length

            return {

                center:{x:centerX,y:centerY},

                victimCount:group.length,

                density:group.length,

                priorityScore

            }

        })

        return clusters
    }

}

module.exports = new ClusterService()
