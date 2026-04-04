import { MAP_CENTER } from "./config";

const now = Date.now();

export const mockVictims = [
  {
    id: "V-104",
    coordinates: { lat: MAP_CENTER[0] + 0.012, lng: MAP_CENTER[1] + 0.019 },
    status: "Priority-1",
    urgencyScore: 96,
    signalStrength: 88,
    detectedAt: new Date(now - 12 * 60 * 1000).toISOString(),
  },
  {
    id: "V-105",
    coordinates: { lat: MAP_CENTER[0] - 0.008, lng: MAP_CENTER[1] + 0.011 },
    status: "Priority-2",
    urgencyScore: 74,
    signalStrength: 62,
    detectedAt: new Date(now - 21 * 60 * 1000).toISOString(),
  },
  {
    id: "V-106",
    coordinates: { lat: MAP_CENTER[0] + 0.004, lng: MAP_CENTER[1] - 0.016 },
    status: "Priority-1",
    urgencyScore: 92,
    signalStrength: 79,
    detectedAt: new Date(now - 17 * 60 * 1000).toISOString(),
  },
  {
    id: "V-107",
    coordinates: { lat: MAP_CENTER[0] - 0.015, lng: MAP_CENTER[1] - 0.012 },
    status: "Priority-3",
    urgencyScore: 48,
    signalStrength: 51,
    detectedAt: new Date(now - 34 * 60 * 1000).toISOString(),
  },
];

export const mockClusters = [
  {
    id: "CL-1",
    center: { lat: MAP_CENTER[0] + 0.007, lng: MAP_CENTER[1] + 0.012 },
    victimCount: 8,
    priorityScore: 5,
    densityScore: 0.92,
  },
  {
    id: "CL-2",
    center: { lat: MAP_CENTER[0] - 0.011, lng: MAP_CENTER[1] - 0.008 },
    victimCount: 5,
    priorityScore: 2,
    densityScore: 0.67,
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
      [MAP_CENTER[0] + 0.016, MAP_CENTER[1] - 0.01],
      [MAP_CENTER[0] + 0.012, MAP_CENTER[1] - 0.004],
      [MAP_CENTER[0] + 0.007, MAP_CENTER[1] + 0.002],
      [MAP_CENTER[0] + 0.004, MAP_CENTER[1] + 0.011],
    ],
  },
  {
    droneId: "DR-02",
    route: [
      [MAP_CENTER[0] - 0.002, MAP_CENTER[1] + 0.016],
      [MAP_CENTER[0] + 0.003, MAP_CENTER[1] + 0.01],
      [MAP_CENTER[0] + 0.008, MAP_CENTER[1] + 0.004],
      [MAP_CENTER[0] + 0.012, MAP_CENTER[1] - 0.002],
    ],
  },
];

export const mockMeshStats = {
  nodes: mockDrones.length,
  connections: [
    ["DR-01", "DR-02"],
    ["DR-01", "DR-04"],
    ["DR-02", "DR-03"],
    ["DR-02", "DR-04"],
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
