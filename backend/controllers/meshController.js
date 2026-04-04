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
  res.json(mesh.stats());
};
