const mesh = require("../services/meshNetworkService");

exports.addDrone = (req, res) => {
  const { id, x, y } = req.body;

  mesh.addDrone(id, x, y);

  res.json({ success: true });
};

exports.findPath = (req, res) => {
  const { start, end } = req.body;

  res.json({
    path: mesh.findPath(start, end),
  });
};

exports.stats = (req, res) => {
  try {
    res.json(mesh.stats());
  } catch (error) {
    res.status(500).json({
      error: error.message || "Failed to load mesh stats",
    });
  }
};
