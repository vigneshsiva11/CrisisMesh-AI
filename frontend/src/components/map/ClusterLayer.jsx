import L from "leaflet";
import { CircleMarker, Marker, Tooltip } from "react-leaflet";

function createClusterIcon(cluster) {
  return L.divIcon({
    className: "cluster-marker",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:999px;background:rgba(56,189,248,0.18);border:1px solid rgba(56,189,248,0.55);color:#e0f2fe;font-weight:600;box-shadow:0 0 24px rgba(56,189,248,0.32);">${cluster.victimCount}</div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
  });
}

export default function ClusterLayer({ clusters = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return clusters.flatMap((cluster) => [
    <CircleMarker
      key={`pulse-${cluster.id}`}
      center={[cluster.center.lat, cluster.center.lng]}
      radius={28 + cluster.densityScore * 18}
      pathOptions={{
        color: "#38bdf8",
        fillColor: "#38bdf8",
        fillOpacity: 0.08,
        opacity: 0.35,
        weight: 1,
      }}
    />,
    <Marker
      key={cluster.id}
      position={[cluster.center.lat, cluster.center.lng]}
      icon={createClusterIcon(cluster)}
    >
      <Tooltip className="map-tooltip">
        <div className="space-y-1">
          <p className="font-semibold">{cluster.id}</p>
          <p>Cluster size: {cluster.victimCount}</p>
          <p>Priority score: {cluster.priorityScore}</p>
          <p>Density score: {cluster.densityScore}</p>
        </div>
      </Tooltip>
    </Marker>,
  ]);
}
