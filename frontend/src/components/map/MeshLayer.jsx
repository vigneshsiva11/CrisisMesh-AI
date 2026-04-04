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
        color: line.isBaseLink ? "#38bdf8" : "#22c55e",
        weight: line.isBaseLink ? 3 : 2,
        opacity: line.isBaseLink ? 0.72 : 0.45,
        dashArray: line.isBaseLink ? "6 8" : undefined,
      }}
    />
  ));
}
