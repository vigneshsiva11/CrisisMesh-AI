const MAP_KEY = (x, y) => `${x},${y}`;

const MeshNetwork = (radius = 100) => {
  const nodes = new Map();
  const graph = new Map();

  const updateGraph = () => {
    graph.clear();
    for (const [id, node] of nodes) {
      if (!node.active) continue;
      graph.set(id, new Set());
      for (const [otherId, other] of nodes) {
        if (id === otherId || !other.active) continue;
        const dist = Math.hypot(node.x - other.x, node.y - other.y);
        if (dist <= radius) {
          graph.get(id).add(otherId);
        }
      }
    }
  };

  const addNode = (id, x, y) => {
    nodes.set(id, { x, y, active: true });
    updateGraph();
  };

  const removeNode = (id) => {
    nodes.delete(id);
    updateGraph();
    // Remove edges to this node from other nodes
    for (const neighbors of graph.values()) {
      neighbors.delete(id);
    }
  };

  const findPath = (startId, endId) => {
    if (!graph.has(startId) || !graph.has(endId)) return null;
    const queue = [[startId]];
    const visited = new Set([startId]);
    while (queue.length) {
      const path = queue.shift();
      const last = path[path.length - 1];
      if (last === endId) return path;
      for (const neighbor of graph.get(last) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
    return null;
  };

  const stats = () => ({
    nodes: nodes.size,
    connections: Array.from(graph.values()).reduce((a, b) => a + b.size, 0),
  });

  return {
    addDrone: addNode,
    removeDrone: removeNode,
    findPath,
    updateGraph,
    stats,
  };
};

const meshNetwork = MeshNetwork();
const controller = {
  addDrone: (req, res) => {
    const { id, x, y } = req.body;
    if (!id || x == null || y == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    meshNetwork.addDrone(id, x, y);
    res.json({ success: true, id });
  },
  removeDrone: (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }
    meshNetwork.removeDrone(id);
    res.json({ success: true, id });
  },
  findPath: (req, res) => {
    const { startId, endId } = req.body;
    if (!startId || !endId) {
      return res.status(400).json({ error: 'Missing startId or endId' });
    }
    const path = meshNetwork.findPath(startId, endId);
    res.json({ path: path || [], success: !!path });
  },
  stats: (req, res) => {
    const stats = meshNetwork.stats();
    res.json({ success: true, stats });
  },
};

module.exports = { meshNetwork };