import { Polygon } from "react-leaflet";

export default function DeadZoneLayer({ zones = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return zones.map((zone, index) => (
    <Polygon
      key={`dead-zone-${index}`}
      positions={zone}
      pathOptions={{
        color: "#ef4444",
        fillColor: "#ef4444",
        fillOpacity: 0.15,
        opacity: 0.5,
        dashArray: "10 10",
      }}
    />
  ));
}
