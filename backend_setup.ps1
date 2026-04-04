Write-Host "Setting up AI Clustering feature..."

$backendRoot = "."

# create folders if missing
New-Item -ItemType Directory -Force -Path "$backendRoot/services" | Out-Null
New-Item -ItemType Directory -Force -Path "$backendRoot/controllers" | Out-Null
New-Item -ItemType Directory -Force -Path "$backendRoot/routes" | Out-Null


########################################
# Cluster Service
########################################

$clusterServicePath = Join-Path $backendRoot "services/clusterService.js"

@'
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
'@ | Set-Content $clusterServicePath



########################################
# Cluster Controller
########################################

$controllerPath = Join-Path $backendRoot "controllers/clusterController.js"

@'
const Victim = require("../models/Victim")
const clusterService = require("../services/clusterService")

exports.getClusters = async (req,res) => {

    const victims = await Victim.find({})

    const clusters =
        clusterService.clusterVictims(victims)

    res.json({

        clusters

    })

}
'@ | Set-Content $controllerPath



########################################
# Cluster Route
########################################

$routePath = Join-Path $backendRoot "routes/clusterRoutes.js"

@'
const router = require("express").Router()

const controller =
require("../controllers/clusterController")

router.get("/",controller.getClusters)

module.exports = router
'@ | Set-Content $routePath



########################################
# connect route to swarmRoutes
########################################

$swarmRoutePath = Join-Path $backendRoot "routes/swarmRoutes.js"

if(Test-Path $swarmRoutePath){

$content = Get-Content $swarmRoutePath -Raw

if($content -notmatch "clusterRoutes"){

$content += "`nconst clusterRoutes = require('./clusterRoutes')"

$content += "`nrouter.use('/clusters', clusterRoutes)"

Set-Content $swarmRoutePath $content

}

}



Write-Host "Clustering feature installed successfully"