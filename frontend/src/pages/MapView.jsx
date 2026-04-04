import { useCrisis } from "../context/CrisisContext";
import CrisisMapContainer from "../components/map/MapContainer";
import SectionHeader from "../components/ui/SectionHeader";
import StatCard from "../components/ui/StatCard";

export default function MapView() {
  const { victims, clusters, drones, paths, mesh, deadZones, stats } = useCrisis();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Live Map"
        title="Operational Terrain View"
        description="Interactive incident map with layered victim markers, density heat signatures, drone flight paths, mesh links, and dead zone boundaries."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <StatCard
          label="Mesh Links"
          value={stats.meshConnections}
          hint="Active peer-to-peer relay lines sustaining drone-to-drone coverage."
          tone="safe"
        />
        <StatCard
          label="Tracked Clusters"
          value={clusters.length}
          hint="Cluster centers reflect converging priority scores and density estimates."
          tone="electric"
        />
        <StatCard
          label="Dead Zones"
          value={deadZones.length}
          hint="Areas with degraded communication reliability or pathing instability."
          tone="danger"
        />
      </div>

      <CrisisMapContainer
        victims={victims}
        clusters={clusters}
        drones={drones}
        paths={paths}
        meshLines={mesh.lines}
        deadZones={deadZones}
        height="h-[42rem]"
      />
    </div>
  );
}
