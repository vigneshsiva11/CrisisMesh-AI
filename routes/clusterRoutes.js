const router = require("express").Router()

const controller =
require("../controllers/clusterController")

router.get("/",controller.getClusters)

module.exports = router
