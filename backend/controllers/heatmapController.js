const Victim = require("../models/Victim");

exports.getHeatmapData = async (req, res) => {
  try {
    const victims = await Victim.find();

    // highest priority victims first
    const priorityVictims = await Victim.find({
      status: "Priority-1",
    })
      .sort({ triageScore: -1 })
      .limit(5);

    res.json({
      heatmap: victims,

      topPriority: priorityVictims,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
