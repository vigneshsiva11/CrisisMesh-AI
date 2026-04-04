import L from "leaflet";
import { CircleMarker, Marker, Tooltip } from "react-leaflet";

function createBaseIcon() {
  return L.divIcon({
    className: "cluster-marker",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:12px;background:rgba(56,189,248,0.24);border:1px solid rgba(56,189,248,0.8);box-shadow:0 0 28px rgba(56,189,248,0.35);color:#e0f2fe;font-weight:700;font-size:11px;">B</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export default function BaseLayer({ baseStation, enabled = true }) {
  if (!enabled || !baseStation) {
    return null;
  }

  return (
    <>
      <CircleMarker
        center={[baseStation.lat, baseStation.lng]}
        radius={28}
        pathOptions={{
          color: "#38bdf8",
          fillColor: "#38bdf8",
          fillOpacity: 0.08,
          opacity: 0.3,
          weight: 1,
        }}
      />
      <Marker position={[baseStation.lat, baseStation.lng]} icon={createBaseIcon()}>
        <Tooltip className="map-tooltip">
          <div className="space-y-1">
            <p className="font-semibold">{baseStation.label}</p>
            <p>ID: {baseStation.id}</p>
            <p>Drone uplink: active base relay</p>
          </div>
        </Tooltip>
      </Marker>
    </>
  );
}
