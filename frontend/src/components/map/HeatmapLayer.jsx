import { Circle } from "react-leaflet";

function getPriorityColor(status) {
  if (status === "Priority-1") return "#ef4444";
  if (status === "Priority-2") return "#fbbf24";
  return "#22c55e";
}

export default function HeatmapLayer({ victims = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return victims.map((victim) => {
    const intensity = Math.min(1, victim.urgencyScore / 100);
    const color = getPriorityColor(victim.status);
    return (
      <Circle
        key={`heat-${victim.id}`}
        center={[victim.coordinates.lat, victim.coordinates.lng]}
        radius={200 + intensity * 260 + (victim.kmeansCluster ?? 0) * 20}
        pathOptions={{
          color,
          fillColor: color,
          fillOpacity: 0.22,
          opacity: 0.3,
          weight: 1,
        }}
      />
    );
  });
}
