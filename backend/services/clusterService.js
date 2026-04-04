const Victim = require('../models/Victim');

const clusterService = {
  async getClusters() {
    try {
      const victims = await Victim.find({}).lean();

      if (victims.length === 0) {
        return [];
      }

      const gridSize = 100;
      const clusters = {};

      victims.forEach(victim => {
        const coords = JSON.parse(victim.coordinates);
        const gridX = Math.floor(coords.x / gridSize);
        const gridY = Math.floor(coords.y / gridSize);
        const key = `${gridX},${gridY}`;

        if (!clusters[key]) {
          clusters[key] = {
            members: [],
            total: 0,
            priorityCount: 0
          };
        }

        clusters[key].members.push(coords);
        clusters[key].total++;
        if (victim.status === 'Priority-1') {
          clusters[key].priorityCount++;
        }
      });

      return Object.values(clusters).map(cluster => {
        const total = cluster.total;
        const members = cluster.members;

        const sumX = members.reduce((sum, p) => sum + p.x, 0);
        const sumY = members.reduce((sum, p) => sum + p.y, 0);

        const centerX = sumX / total;
        const centerY = sumY / total;

        const area = gridSize * gridSize;
        const density = total / area;

        return {
          center: { x: centerX, y: centerY },
          count: total,
          density: parseFloat(density.toFixed(4)),
          priority: cluster.priorityCount
        };
      });
    } catch (error) {
      console.error('Cluster service error:', error);
      return [];
    }
  }
};

module.exports = clusterService;
