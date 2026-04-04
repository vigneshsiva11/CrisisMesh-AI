import { Polyline } from "react-leaflet";

export default function MeshLayer({ lines = [], enabled = true }) {
  if (!enabled) {
    return null;
  }

  return lines.map((line) => (
    <Polyline
      key={line.id}
      positions={line.positions}
      pathOptions={{
        color: "#22c55e",
        weight: 2,
        opacity: 0.45,
      }}
    />
  ));
}
