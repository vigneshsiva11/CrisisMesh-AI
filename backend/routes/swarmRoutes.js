const router = require("express").Router();

const controller = require("../controllers/swarmController");

router.get("/clusters", controller.getClusters);
router.post("/path", controller.findPath);

module.exports = router;
