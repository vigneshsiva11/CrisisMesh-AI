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
