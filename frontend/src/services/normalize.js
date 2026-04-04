import {
  baseStation,
  mockClusters,
  mockDeadZones,
  mockDrones,
  mockMeshStats,
  mockPaths,
  mockVictims,
} from "./mockData";

function hashId(prefix, value) {
  return `${prefix}-${String(value).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8)}`;
}

function getPriorityStatus(score) {
  if (score >= 85) return "Priority-1";
  if (score >= 60) return "Priority-2";
  return "Priority-3";
}

export function parseCoordinates(coordinates, index = 0) {
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) };
  }

  if (coordinates && typeof coordinates === "object") {
    const lat = coordinates.lat ?? coordinates.latitude ?? coordinates.y;
    const lng = coordinates.lng ?? coordinates.lon ?? coordinates.longitude ?? coordinates.x;
    if (lat != null && lng != null) {
      return { lat: Number(lat), lng: Number(lng) };
    }
  }

  if (typeof coordinates === "string") {
    const parts = coordinates.split(",").map((part) => Number(part.trim()));
    if (parts.length >= 2 && parts.every((part) => Number.isFinite(part))) {
      return { lat: parts[0], lng: parts[1] };
    }
  }

  return mockVictims[index % mockVictims.length]?.coordinates || {
    lat: 20.5937,
    lng: 78.9629,
  };
}

export function normalizeVictims(payload) {
  const victims = Array.isArray(payload)
    ? payload
    : payload?.victims || payload?.heatmap || payload?.data || [];

  if (!victims.length) {
    return mockVictims;
  }

  return victims.map((victim, index) => {
    const coordinates = parseCoordinates(victim.coordinates, index);
    const urgencyScore =
      victim.urgencyScore ??
      victim.triageScore ??
      (victim.status === "Priority-1" ? 92 - index * 2 : 58 + index * 4);
    const signalStrength = victim.signalStrength ?? 50 + ((index * 13) % 45);
    const kmeansCluster = victim.kmeansCluster ?? index % 4;

    return {
      id: victim.id || victim._id || hashId("V", `${coordinates.lat}-${coordinates.lng}-${index}`),
      coordinates,
      status: victim.status || getPriorityStatus(urgencyScore),
      urgencyScore,
      signalStrength,
      kmeansCluster,
      detectedBy:
        victim.detectedBy ||
        mockDrones[kmeansCluster % mockDrones.length]?.label ||
        "Recon Unit",
      detectedAt:
        victim.detectedAt ||
        victim.timestamp ||
        new Date(Date.now() - (index + 5) * 600000).toISOString(),
    };
  });
}

export function buildClustersFromVictims(victims) {
  if (!victims.length) {
    return mockClusters;
  }

  const buckets = victims.reduce((accumulator, victim) => {
    const key = String(victim.kmeansCluster ?? 0);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(victim);
    return accumulator;
  }, {});

  return Object.entries(buckets).map(([clusterKey, members], index) => {
    const lat = members.reduce((sum, item) => sum + item.coordinates.lat, 0) / members.length;
    const lng = members.reduce((sum, item) => sum + item.coordinates.lng, 0) / members.length;
    const priorityScore = members.filter((item) => item.status === "Priority-1").length;

    return {
      id: `CL-${index + 1}`,
      center: { lat, lng },
      victimCount: members.length,
      priorityScore,
      densityScore: Number(Math.min(1, members.length / 4 + priorityScore / 5).toFixed(2)),
      kmeansCluster: Number(clusterKey),
    };
  });
}

export function normalizeClusters(payload, victims = []) {
  const clusters = Array.isArray(payload)
    ? payload
    : payload?.clusters || payload?.data || [];

  if (!clusters.length) {
    return buildClustersFromVictims(victims);
  }

  return clusters.map((cluster, index) => ({
    id: cluster.id || `CL-${index + 1}`,
    center: parseCoordinates(cluster.center || cluster.coordinates, index),
    victimCount: cluster.victimCount ?? cluster.size ?? cluster.total ?? 0,
    priorityScore: cluster.priorityScore ?? cluster.priority ?? 0,
    densityScore: Number(
      (
        cluster.densityScore ??
        cluster.density ??
        Math.min(1, (cluster.victimCount ?? cluster.size ?? 1) / 4)
      ).toFixed(2),
    ),
    kmeansCluster: cluster.kmeansCluster ?? index,
  }));
}

export function normalizeSwarmPath(payload) {
  if (Array.isArray(payload?.routes)) {
    return payload.routes;
  }

  if (Array.isArray(payload?.path) && payload.path.length) {
    return mockPaths.map((path, index) => ({
      ...path,
      route:
        index === 0
          ? payload.path.map((point, pointIndex) => {
              if (Array.isArray(point)) {
                return [Number(point[0]), Number(point[1])];
              }
              return [
                point.lat ?? point.y ?? mockPaths[0].route[pointIndex % mockPaths[0].route.length][0],
                point.lng ?? point.x ?? mockPaths[0].route[pointIndex % mockPaths[0].route.length][1],
              ];
            })
          : path.route,
    }));
  }

  return mockPaths;
}

export function normalizeMesh(payload, drones = mockDrones) {
  const stats = payload?.stats || payload || {};
  const allNodes = [baseStation, ...drones];
  const idLookup = new Map(allNodes.map((node) => [node.id, node]));

  const connections = Array.isArray(stats.connections)
    ? stats.connections
    : mockMeshStats.connections;

  return {
    nodes: stats.nodes ?? drones.length,
    connections,
    lines: connections
      .map(([fromId, toId]) => {
        const from = idLookup.get(fromId);
        const to = idLookup.get(toId);
        if (!from || !to) {
          return null;
        }
        return {
          id: `${fromId}-${toId}`,
          positions: [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          isBaseLink: fromId === baseStation.id || toId === baseStation.id,
        };
      })
      .filter(Boolean),
  };
}

export function normalizeDrones(paths = mockPaths) {
  const pathMap = new Map(paths.map((item) => [item.droneId, item.route]));
  return mockDrones.map((drone) => ({
    ...drone,
    route: pathMap.get(drone.id) || [[drone.lat, drone.lng]],
  }));
}

export function normalizeDeadZones(payload) {
  const zones = Array.isArray(payload)
    ? payload
    : payload?.zones || payload?.deadZones || [];

  if (!zones.length) {
    return mockDeadZones;
  }

  return zones.map((zone) =>
    zone.map((point) => {
      const coordinates = parseCoordinates(point);
      return [coordinates.lat, coordinates.lng];
    }),
  );
}
