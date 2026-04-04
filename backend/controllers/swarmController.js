const { astar } = require("../services/astarService");

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
