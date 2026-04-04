import { useCrisis } from "../context/CrisisContext";
import AlertPanel from "../components/ui/AlertPanel";
import SectionHeader from "../components/ui/SectionHeader";
import StatCard from "../components/ui/StatCard";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import CrisisMapContainer from "../components/map/MapContainer";

export default function Dashboard() {
  const {
    stats,
    victims,
    priorityVictims,
    clusters,
    drones,
    paths,
    mesh,
    deadZones,
    baseStation,
    isLoading,
  } = useCrisis();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Mission Dashboard"
        title="Disaster Response Operations"
        description="Unified view of swarm telemetry, victim density, cluster prioritization, and mesh stability."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <>
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
            <LoadingSkeleton className="h-40" />
          </>
        ) : (
          <>
            <StatCard
              label="Total Victims Detected"
              value={stats.totalVictims}
              hint="Live feed from signal detection, heatmap aggregation, and victim logs."
              tone="danger"
            />
            <StatCard
              label="Active Drones"
              value={stats.activeDrones}
              hint="Airborne swarm units actively scanning and relaying telemetry."
              tone="safe"
            />
            <StatCard
              label="Priority Alerts"
              value={stats.priorityAlerts}
              hint="Victims requiring immediate intervention inside golden hour."
              tone="alert"
            />
            <StatCard
              label="Active Clusters"
              value={stats.activeClusters}
              hint="Spatial hotspots inferred from victim density and triage severity."
              tone="electric"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <div className="space-y-6">
          <CrisisMapContainer
            victims={victims}
            clusters={clusters}
            drones={drones}
            paths={paths}
            meshLines={mesh.lines}
            deadZones={deadZones}
            baseStation={baseStation}
            height="h-[34rem]"
          />
        </div>
        <AlertPanel victims={priorityVictims} />
      </div>
    </div>
  );
}
