const router = require("express").Router();

const controller = require("../controllers/swarmController");

router.post("/path", controller.findPath);

module.exports = router;
