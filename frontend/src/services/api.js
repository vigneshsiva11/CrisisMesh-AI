import axios from "axios";
import { API_BASE_URL } from "./config";
import {
  normalizeClusters,
  normalizeDeadZones,
  normalizeDrones,
  normalizeMesh,
  normalizeSwarmPath,
  normalizeVictims,
} from "./normalize";
import { mockDeadZones } from "./mockData";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

async function safeRequest(request, fallback) {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    return fallback(error);
  }
}

export async function getVictims() {
  const data = await safeRequest(() => api.get("/api/victims"), () => []);
  return normalizeVictims(data);
}

export async function getHeatmapData() {
  const data = await safeRequest(() => api.get("/api/heatmaps"), () => ({}));
  const victims = normalizeVictims(data?.heatmap || data);
  const topPriority = normalizeVictims(data?.topPriority || victims).filter(
    (victim) => victim.status === "Priority-1",
  );

  return {
    victims,
    topPriority,
  };
}

export async function getClusters(victims = []) {
  const data = await safeRequest(
    () => api.get("/api/swarm/clusters"),
    async () => {
      const fallback = await safeRequest(() => api.get("/clusters"), () => ({}));
      return fallback;
    },
  );

  return normalizeClusters(data, victims);
}

export async function getSwarmPath(payload) {
  const data = await safeRequest(
    () =>
      api.post("/api/swarm/path", payload || {
        gridSize: [12, 12],
        start: [1, 1],
        goal: [9, 8],
        obstacles: [
          [3, 4],
          [3, 5],
          [4, 5],
        ],
      }),
    () => ({}),
  );

  return normalizeSwarmPath(data);
}

export async function getMeshStats(drones) {
  const data = await safeRequest(() => api.get("/api/swarm/mesh/stats"), () => ({}));
  return normalizeMesh(data, drones);
}

export async function simulateSignal(payload = {}) {
  const data = await safeRequest(
    () => api.post("/api/signals/simulate", payload),
    () => ({
      victim: {
        status: "Priority-1",
        signalStrength: 91,
        urgencyScore: 98,
        kmeansCluster: Math.floor(Math.random() * 4),
        detectedBy: "Rapid Response Drone",
        coordinates: {
          lat: 20.6037 + Math.random() * 0.01,
          lng: 78.9529 + Math.random() * 0.01,
        },
        detectedAt: new Date().toISOString(),
      },
    }),
  );

  const victims = normalizeVictims(data?.victims || data?.victim || [data?.victim].filter(Boolean));
  return victims[0];
}

export async function getDeadZones() {
  const data = await safeRequest(() => api.get("/api/dtn/zones"), () => mockDeadZones);
  return normalizeDeadZones(data);
}

export function getDerivedDrones(paths) {
  return normalizeDrones(paths);
}

export default api;
