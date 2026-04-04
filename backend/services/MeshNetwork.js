const { astar } = require('./AStarPathfinder');

class MeshNetwork {
  constructor(communicationRadius = 50) {
    this.nodes = new Map(); // droneId -> {x, y, active}
    this.graph = new Map(); // nodeId -> Set(neighbors)
    this.communicationRadius = communicationRadius;
  }

  addDrone(id, x, y) {
    if (this.nodes.has(id)) {
      console.warn(`Drone ${id} already exists`);
      return;
    }
    this.nodes.set(id, {x, y, active: true});
    this.updateConnections(id);
  }

  removeDrone(id) {
    if (!this.nodes.has(id)) return;
    this.nodes.delete(id);
    this.graph.delete(id);
    // Remove edges to this node from other nodes
    for (let neighbors of this.graph.values()) {
      neighbors.delete(id);
    }
  }

  deactivateDrone(id) {
    if (!this.nodes.has(id)) return;
    this.nodes.get(id).active = false;
    this.graph.delete(id);
    // Remove edges to this node
    for (let neighbors of this.graph.values()) {
      neighbors.delete(id);
    }
  }

  activateDrone(id) {
    if (!this.nodes.has(id)) return;
    this.nodes.get(id).active = true;
    this.updateConnections(id);
  }

  // Find shortest path (BFS for unweighted graph)
  findPath(startId, endId) {
    if (!this.graph.has(startId) || !this.graph.has(endId)) return null;

    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const lastNode = path[path.length - 1];
      if (lastNode === endId) return path;

      for (let neighbor of this.graph.get(lastNode) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return null; // No path found
  }

  // Update connections dynamically
  updateConnections(id) {
    if (!this.nodes.has(id)) return;
    const node = this.nodes.get(id);
    const neighbors = new Set();

    for (let [otherId, otherNode] of this.nodes.entries()) {
      if (otherId === id || !otherNode.active) continue;
      const distance = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
      if (distance <= this.communicationRadius) {
        neighbors.add(otherId);
      }
    }

    this.graph.set(id, neighbors);
  }

  // BATMAN-adv style self-healing simulation
  simulateSelfHealing(startId, endId) {
    const originalPath = this.findPath(startId, endId);
    if (!originalPath) return null;

    const results = [];
    for (let nodeId of originalPath) {
      // Simulate failure
      const backupNetwork = new MeshNetwork(this.communicationRadius);
      for (let [id, node] of this.nodes.entries()) {
        if (id !== nodeId) {
          backupNetwork.addDrone(id, node.x, node.y);
        }
      }

      const backupPath = backupNetwork.findPath(startId, endId);
      results.push({
        failedNode: nodeId,
        originalPath,
        backupPath,
        success: !!backupPath
      });
    }

    return results;
  }

  getActiveDrones() {
    return Array.from(this.nodes.values()).filter(n => n.active);
  }

  getNetworkStats() {
    const activeCount = this.getActiveDrones().length;
    const connections = Array.from(this.graph.values()).reduce((sum, neighbors) => sum + neighbors.size, 0) / 2;
    return {
      activeDrones: activeCount,
      totalDrones: this.nodes.size,
      connections,
      avgDegree: connections / activeCount || 0
    };
  }
}

module.exports = MeshNetwork;