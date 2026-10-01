const { astar } = require("../services/astarService");
const clusterService = require("../services/clusterService");

exports.getClusters = async (_req, res) => {
  try {
    const clusters = await clusterService.getClusters();
    res.json({ clusters });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Failed to load swarm clusters",
    });
  }
};

exports.findPath = (req, res) => {
  const { gridSize, start, goal, obstacles = [] } = req.body;

  const result = astar(
    gridSize,

    { x: start[0], y: start[1] },

    { x: goal[0], y: goal[1] },

    obstacles.map((o) => ({ x: o[0], y: o[1] })),
  );

  res.json(result);
};
