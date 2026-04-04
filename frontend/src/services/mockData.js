import { MAP_CENTER } from "./config";

const now = Date.now();

export const baseStation = {
  id: "BASE-01",
  label: "Forward Command Base",
  lat: MAP_CENTER[0] + 0.002,
  lng: MAP_CENTER[1] - 0.003,
};

export const mockVictims = [
  {
    id: "V-104",
    coordinates: { lat: MAP_CENTER[0] + 0.016, lng: MAP_CENTER[1] + 0.018 },
    status: "Priority-1",
    urgencyScore: 96,
    signalStrength: 88,
    kmeansCluster: 0,
    detectedBy: "Recon Alpha",
    detectedAt: new Date(now - 12 * 60 * 1000).toISOString(),
  },
  {
    id: "V-106",
    coordinates: { lat: MAP_CENTER[0] - 0.009, lng: MAP_CENTER[1] + 0.017 },
    status: "Priority-2",
    urgencyScore: 72,
    signalStrength: 65,
    kmeansCluster: 1,
    detectedBy: "Recon Beta",
    detectedAt: new Date(now - 20 * 60 * 1000).toISOString(),
  },
  {
    id: "V-108",
    coordinates: { lat: MAP_CENTER[0] - 0.016, lng: MAP_CENTER[1] - 0.013 },
    status: "Priority-3",
    urgencyScore: 44,
    signalStrength: 49,
    kmeansCluster: 2,
    detectedBy: "Relay Gamma",
    detectedAt: new Date(now - 35 * 60 * 1000).toISOString(),
  },
  {
    id: "V-110",
    coordinates: { lat: MAP_CENTER[0] + 0.014, lng: MAP_CENTER[1] - 0.019 },
    status: "Priority-2",
    urgencyScore: 77,
    signalStrength: 69,
    kmeansCluster: 3,
    detectedBy: "Scout Delta",
    detectedAt: new Date(now - 18 * 60 * 1000).toISOString(),
  },
  {
    id: "V-111",
    coordinates: { lat: MAP_CENTER[0] + 0.009, lng: MAP_CENTER[1] - 0.013 },
    status: "Priority-1",
    urgencyScore: 89,
    signalStrength: 81,
    kmeansCluster: 3,
    detectedBy: "Scout Delta",
    detectedAt: new Date(now - 15 * 60 * 1000).toISOString(),
  },
];

export const mockClusters = [
  {
    id: "CL-1",
    center: { lat: MAP_CENTER[0] + 0.016, lng: MAP_CENTER[1] + 0.018 },
    victimCount: 1,
    priorityScore: 1,
    densityScore: 0.92,
    kmeansCluster: 0,
  },
  {
    id: "CL-2",
    center: { lat: MAP_CENTER[0] - 0.009, lng: MAP_CENTER[1] + 0.017 },
    victimCount: 1,
    priorityScore: 0,
    densityScore: 0.64,
    kmeansCluster: 1,
  },
  {
    id: "CL-3",
    center: { lat: MAP_CENTER[0] - 0.016, lng: MAP_CENTER[1] - 0.013 },
    victimCount: 1,
    priorityScore: 0,
    densityScore: 0.38,
    kmeansCluster: 2,
  },
  {
    id: "CL-4",
    center: { lat: MAP_CENTER[0] + 0.014, lng: MAP_CENTER[1] - 0.019 },
    victimCount: 1,
    priorityScore: 0,
    densityScore: 0.73,
    kmeansCluster: 3,
  },
];

export const mockDrones = [
  {
    id: "DR-01",
    label: "Recon Alpha",
    battery: 91,
    lat: MAP_CENTER[0] + 0.016,
    lng: MAP_CENTER[1] - 0.01,
  },
  {
    id: "DR-02",
    label: "Recon Beta",
    battery: 85,
    lat: MAP_CENTER[0] - 0.002,
    lng: MAP_CENTER[1] + 0.016,
  },
  {
    id: "DR-03",
    label: "Relay Gamma",
    battery: 78,
    lat: MAP_CENTER[0] - 0.015,
    lng: MAP_CENTER[1] + 0.002,
  },
  {
    id: "DR-04",
    label: "Scout Delta",
    battery: 88,
    lat: MAP_CENTER[0] + 0.01,
    lng: MAP_CENTER[1] + 0.025,
  },
];

export const mockPaths = [
  {
    droneId: "DR-01",
    route: [
      [baseStation.lat, baseStation.lng],
      [MAP_CENTER[0] + 0.011, MAP_CENTER[1] + 0.002],
      [MAP_CENTER[0] + 0.013, MAP_CENTER[1] + 0.011],
      [MAP_CENTER[0] + 0.016, MAP_CENTER[1] + 0.018],
    ],
  },
  {
    droneId: "DR-02",
    route: [
      [baseStation.lat, baseStation.lng],
      [MAP_CENTER[0] + 0.002, MAP_CENTER[1] + 0.006],
      [MAP_CENTER[0] - 0.003, MAP_CENTER[1] + 0.011],
      [MAP_CENTER[0] - 0.011, MAP_CENTER[1] + 0.017],
    ],
  },
  {
    droneId: "DR-03",
    route: [
      [baseStation.lat, baseStation.lng],
      [MAP_CENTER[0] - 0.004, MAP_CENTER[1] - 0.002],
      [MAP_CENTER[0] - 0.01, MAP_CENTER[1] - 0.01],
      [MAP_CENTER[0] - 0.016, MAP_CENTER[1] - 0.013],
    ],
  },
  {
    droneId: "DR-04",
    route: [
      [baseStation.lat, baseStation.lng],
      [MAP_CENTER[0] + 0.006, MAP_CENTER[1] - 0.005],
      [MAP_CENTER[0] + 0.011, MAP_CENTER[1] - 0.012],
      [MAP_CENTER[0] + 0.014, MAP_CENTER[1] - 0.019],
    ],
  },
];

export const mockMeshStats = {
  nodes: mockDrones.length,
  connections: [
    ["BASE-01", "DR-01"],
    ["BASE-01", "DR-02"],
    ["BASE-01", "DR-03"],
    ["BASE-01", "DR-04"],
    ["DR-01", "DR-02"],
    ["DR-02", "DR-03"],
    ["DR-03", "DR-04"],
  ],
};

export const mockDeadZones = [
  [
    [MAP_CENTER[0] - 0.02, MAP_CENTER[1] - 0.025],
    [MAP_CENTER[0] - 0.008, MAP_CENTER[1] - 0.022],
    [MAP_CENTER[0] - 0.004, MAP_CENTER[1] - 0.01],
    [MAP_CENTER[0] - 0.018, MAP_CENTER[1] - 0.005],
  ],
];
