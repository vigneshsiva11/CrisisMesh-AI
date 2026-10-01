const router = require("express").Router();

router.get("/zones", (_req, res) => {
  res.json({
    zones: [
      [
        [20.5737, 78.9379],
        [20.5857, 78.9409],
        [20.5897, 78.9529],
        [20.5757, 78.9579],
      ],
    ],
  });
});

module.exports = router;
