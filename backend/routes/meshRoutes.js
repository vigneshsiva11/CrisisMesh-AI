const router = require("express").Router();

const c = require("../controllers/meshController");

router.post("/drones", c.addDrone);

router.post("/path", c.findPath);

router.get("/stats", c.stats);

module.exports = router;
