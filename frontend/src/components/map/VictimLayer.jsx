import L from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

function createVictimIcon(status) {
  const color = status === "Priority-1" ? "#ef4444" : status === "Priority-2" ? "#fbbf24" : "#22c55e";
  return L.divIcon({
    className: "victim-marker",
    html: `<div style="width:18px;height:18px;border-radius:999px;background:${color};box-shadow:0 0 0 6px rgba(255,255,255,0.08),0 0 20px ${color};border:2px solid rgba(255,255,255,0.8);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export default function VictimLayer({ victims = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return victims.map((victim) => (
    <Marker
      key={victim.id}
      position={[victim.coordinates.lat, victim.coordinates.lng]}
      icon={createVictimIcon(victim.status)}
    >
      <Tooltip className="map-tooltip" direction="top" offset={[0, -8]}>
        <div className="space-y-1">
          <p className="font-semibold">{victim.id}</p>
          <p>Status: {victim.status}</p>
          <p>Urgency: {victim.urgencyScore}</p>
          <p>Signal: {victim.signalStrength}%</p>
        </div>
      </Tooltip>
    </Marker>
  ));
}
