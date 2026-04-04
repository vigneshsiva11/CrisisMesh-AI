import { useMemo, useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HeatmapLayer from "./HeatmapLayer";
import VictimLayer from "./VictimLayer";
import ClusterLayer from "./ClusterLayer";
import DroneLayer from "./DroneLayer";
import MeshLayer from "./MeshLayer";
import DeadZoneLayer from "./DeadZoneLayer";
import LayerToggle from "./LayerToggle";
import { MAP_CENTER } from "../../services/config";

export default function CrisisMapContainer({
  victims = [],
  clusters = [],
  drones = [],
  paths = [],
  meshLines = [],
  deadZones = [],
  height = "h-[32rem]",
  allowToggles = true,
  animateDrones = true,
}) {
  const [layers, setLayers] = useState({
    victims: true,
    heatmap: true,
    clusters: true,
    drones: true,
    mesh: true,
    deadZones: true,
  });

  const center = useMemo(() => {
    const priorityVictim = victims[0];
    return priorityVictim
      ? [priorityVictim.coordinates.lat, priorityVictim.coordinates.lng]
      : MAP_CENTER;
  }, [victims]);

  const options = [
    { key: "victims", label: "Victim Markers", enabled: layers.victims },
    { key: "heatmap", label: "Heatmap Overlay", enabled: layers.heatmap },
    { key: "clusters", label: "Cluster Centers", enabled: layers.clusters },
    { key: "drones", label: "Drone Routes", enabled: layers.drones },
    { key: "mesh", label: "Mesh Network", enabled: layers.mesh },
    { key: "deadZones", label: "Dead Zones", enabled: layers.deadZones },
  ];

  const toggleLayer = (key) =>
    setLayers((current) => ({
      ...current,
      [key]: !current[key],
    }));

  return (
    <div className={`glass-panel relative overflow-hidden rounded-[2rem] ${height}`}>
      {allowToggles ? <LayerToggle options={options} onChange={toggleLayer} /> : null}
      <LeafletMap center={center} zoom={14} scrollWheelZoom className="z-10">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer victims={victims} enabled={layers.heatmap} />
        <VictimLayer victims={victims} enabled={layers.victims} />
        <ClusterLayer clusters={clusters} enabled={layers.clusters} />
        <DroneLayer
          drones={drones}
          paths={paths}
          enabled={layers.drones}
          animate={animateDrones}
        />
        <MeshLayer lines={meshLines} enabled={layers.mesh} />
        <DeadZoneLayer zones={deadZones} enabled={layers.deadZones} />
      </LeafletMap>
    </div>
  );
}
