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
  simulateSignal,
} from "../services/api";

const CrisisContext = createContext(null);

function calculateGoldenHour(victims) {
  const priorityVictim = victims
    .filter((victim) => victim.status === "Priority-1")
    .sort((a, b) => new Date(a.detectedAt) - new Date(b.detectedAt))[0];

  const detectedAt = priorityVictim?.detectedAt;
  if (!detectedAt) {
    return 60 * 60;
  }

  const expiresAt = new Date(detectedAt).getTime() + 60 * 60 * 1000;
  return Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
}

export function CrisisProvider({ children }) {
  const { isConnected, lastEvent } = useSocket();
  const [victims, setVictims] = useState([]);
  const [priorityVictims, setPriorityVictims] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [paths, setPaths] = useState([]);
  const [drones, setDrones] = useState([]);
  const [mesh, setMesh] = useState({ nodes: 0, connections: [], lines: [] });
  const [deadZones, setDeadZones] = useState([]);
  const [simulationRunning, setSimulationRunning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [countdown, setCountdown] = useState(60 * 60);

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
    setPriorityVictims(
      victimList.filter((victim) => victim.status === "Priority-1").slice(0, 6),
    );
    setClusters(clusterData);
    setPaths(pathData);
    setDrones(droneData);
    setMesh(meshData);
    setDeadZones(deadZoneData);
    setLastRefresh(new Date());
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
    const timer = window.setInterval(() => {
      setCountdown(calculateGoldenHour(victims));
    }, 1000);

    setCountdown(calculateGoldenHour(victims));
    return () => window.clearInterval(timer);
  }, [victims]);

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
        detectedAt: victim.detectedAt || new Date().toISOString(),
      }));

      return next.sort((a, b) => b.urgencyScore - a.urgencyScore).slice(0, 24);
    });
  }, [lastEvent]);

  useEffect(() => {
    setPriorityVictims(victims.filter((victim) => victim.status === "Priority-1").slice(0, 6));
  }, [victims]);

  const triggerSignalSimulation = async () => {
    const newVictim = await simulateSignal();
    setVictims((current) =>
      [newVictim, ...current]
        .filter(
          (victim, index, array) => array.findIndex((item) => item.id === victim.id) === index,
        )
        .sort((a, b) => b.urgencyScore - a.urgencyScore),
    );
  };

  const startSimulation = () => setSimulationRunning(true);
  const resetSimulation = async () => {
    setSimulationRunning(false);
    await refreshAll();
  };

  const stats = useMemo(
    () => ({
      totalVictims: victims.length,
      activeDrones: drones.length,
      priorityAlerts: priorityVictims.length,
      activeClusters: clusters.length,
      meshConnections: mesh.connections.length,
    }),
    [victims, drones, priorityVictims, clusters, mesh],
  );

  const value = useMemo(
    () => ({
      victims,
      priorityVictims,
      clusters,
      paths,
      drones,
      mesh,
      deadZones,
      stats,
      countdown,
      isConnected,
      isLoading,
      simulationRunning,
      lastRefresh,
      refreshAll,
      startSimulation,
      resetSimulation,
      triggerSignalSimulation,
    }),
    [
      victims,
      priorityVictims,
      clusters,
      paths,
      drones,
      mesh,
      deadZones,
      stats,
      countdown,
      isConnected,
      isLoading,
      simulationRunning,
      lastRefresh,
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
