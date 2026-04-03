const router = require("express").Router();

const controller = require("../controllers/heatmapController");

router.get("/", controller.getHeatmapData);

module.exports = router;
