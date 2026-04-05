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

module.exports = MeshNetwork();
