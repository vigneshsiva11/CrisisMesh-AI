import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSocket from "../hooks/useSocket";
import {
  getClusters,
  getDeadZones,
  getDerivedDrones,
  getHeatmapData,
  getMeshStats,
  getSwarmPath,
  getVictims,
} from "../services/api";
import { baseStation } from "../services/mockData";

const CrisisContext = createContext(null);
const SIMULATION_QUEUE_SIZE = 4;

function getSimulationQueueCandidates(victims, limit = SIMULATION_QUEUE_SIZE) {
  const sortedVictims = [...victims].sort((a, b) => b.urgencyScore - a.urgencyScore);
  const priorityOneVictims = sortedVictims.filter((victim) => victim.status === "Priority-1");
  const fallbackVictims = sortedVictims.filter((victim) => victim.status !== "Priority-1");

  return [...priorityOneVictims, ...fallbackVictims].slice(0, limit);
}

export function CrisisProvider({ children }) {
  const { isConnected, lastEvent } = useSocket();
  const [victims, setVictims] = useState([]);
  const [priorityVictims, setPriorityVictims] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [availablePaths, setAvailablePaths] = useState([]);
  const [availableDrones, setAvailableDrones] = useState([]);
  const [availableMesh, setAvailableMesh] = useState({ nodes: 0, connections: [], lines: [] });
  const [deadZones, setDeadZones] = useState([]);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedVictimIds, setDetectedVictimIds] = useState([]);

  const refreshAll = async () => {
    setIsLoading(true);

    const [heatmapData, victimsData, pathData, deadZoneData] = await Promise.all([
      getHeatmapData(),
      getVictims(),
      getSwarmPath(),
      getDeadZones(),
    ]);

    const mergedVictims = [...heatmapData.victims, ...victimsData].reduce((accumulator, victim) => {
      accumulator.set(victim.id, victim);
      return accumulator;
    }, new Map());

    const victimList = Array.from(mergedVictims.values()).sort(
      (a, b) => b.urgencyScore - a.urgencyScore,
    );
    const clusterData = await getClusters(victimList);
    const droneData = getDerivedDrones(pathData);
    const meshData = await getMeshStats(droneData);

    setVictims(victimList);
    setClusters(clusterData);
    setAvailablePaths(pathData);
    setAvailableDrones(droneData);
    setAvailableMesh(meshData);
    setDeadZones(deadZoneData);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (simulationRunning) {
        refreshAll();
      }
    }, 15000);

    return () => window.clearInterval(timer);
  }, [simulationRunning]);

  useEffect(() => {
    if (!lastEvent?.payload) {
      return;
    }

    const incomingVictim =
      lastEvent.payload.victim ||
      lastEvent.payload.alert ||
      lastEvent.payload.data ||
      null;

    if (!incomingVictim?.coordinates) {
      return;
    }

    setVictims((current) => {
      const next = [incomingVictim, ...current].map((victim, index) => ({
        id: victim.id || victim._id || `SOCKET-${lastEvent.receivedAt}-${index}`,
        coordinates: victim.coordinates,
        status: victim.status || "Priority-1",
        urgencyScore: victim.urgencyScore || 95,
        signalStrength: victim.signalStrength || 90,
        kmeansCluster: victim.kmeansCluster ?? index % 4,
        detectedBy: victim.detectedBy || "Rapid Response Drone",
        detectedAt: victim.detectedAt || new Date().toISOString(),
      }));

      return next.sort((a, b) => b.urgencyScore - a.urgencyScore).slice(0, 24);
    });
  }, [lastEvent]);

  useEffect(() => {
    const queue = victims
      .filter((victim) => detectedVictimIds.includes(victim.id))
      .sort((a, b) => b.urgencyScore - a.urgencyScore);
    setPriorityVictims(queue);
  }, [victims, detectedVictimIds]);

  useEffect(() => {
    if (!simulationRunning || !victims.length) {
      return undefined;
    }

    const queueCandidates = getSimulationQueueCandidates(victims);
    if (!queueCandidates.length) {
      return undefined;
    }

    setDetectedVictimIds((current) => {
      if (current.length >= SIMULATION_QUEUE_SIZE) {
        return current;
      }

      const currentIds = new Set(current);
      const nextIds = [...current];

      queueCandidates.forEach((victim) => {
        if (nextIds.length < SIMULATION_QUEUE_SIZE && !currentIds.has(victim.id)) {
          nextIds.push(victim.id);
          currentIds.add(victim.id);
        }
      });

      return nextIds;
    });

    return undefined;
  }, [simulationRunning, victims]);

  const startSimulation = () => {
    const initialQueue = getSimulationQueueCandidates(victims).map((victim) => victim.id);
    setDetectedVictimIds(initialQueue);
    setSimulationRunning(true);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
    setDetectedVictimIds([]);
  };

  const activeDrones = simulationRunning ? availableDrones : [];
  const activePaths = simulationRunning ? availablePaths : [];
  const activeMesh = simulationRunning
    ? availableMesh
    : { nodes: 0, connections: [], lines: [] };

  const stats = useMemo(
    () => ({
      totalVictims: victims.length,
      activeDrones: activeDrones.length,
      priorityAlerts: priorityVictims.length,
      activeClusters: clusters.length,
      meshConnections: activeMesh.connections.length,
    }),
    [victims, activeDrones, priorityVictims, clusters, activeMesh],
  );

  const value = useMemo(
    () => ({
      victims,
      priorityVictims,
      clusters,
      paths: activePaths,
      drones: activeDrones,
      availableDrones,
      mesh: activeMesh,
      deadZones,
      stats,
      isConnected,
      isLoading,
      simulationRunning,
      baseStation,
      refreshAll,
      startSimulation,
      resetSimulation,
    }),
    [
      victims,
      priorityVictims,
      clusters,
      activePaths,
      activeDrones,
      availableDrones,
      activeMesh,
      deadZones,
      stats,
      isConnected,
      isLoading,
      simulationRunning,
    ],
  );

  return <CrisisContext.Provider value={value}>{children}</CrisisContext.Provider>;
}

export function useCrisis() {
  const context = useContext(CrisisContext);
  if (!context) {
    throw new Error("useCrisis must be used within a CrisisProvider");
  }
  return context;
}
