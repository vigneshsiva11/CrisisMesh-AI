import { Circle } from "react-leaflet";

function getColor(intensity) {
  if (intensity >= 0.8) return "#ef4444";
  if (intensity >= 0.55) return "#f97316";
  if (intensity >= 0.3) return "#fbbf24";
  return "#38bdf8";
}

export default function HeatmapLayer({ victims = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return victims.map((victim) => {
    const intensity = Math.min(1, victim.urgencyScore / 100);
    return (
      <Circle
        key={`heat-${victim.id}`}
        center={[victim.coordinates.lat, victim.coordinates.lng]}
        radius={220 + intensity * 280}
        pathOptions={{
          color: getColor(intensity),
          fillColor: getColor(intensity),
          fillOpacity: 0.22,
          opacity: 0.25,
          weight: 1,
        }}
      />
    );
  });
}
