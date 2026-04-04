import { useEffect, useState } from "react";
import L from "leaflet";
import { Marker, Polyline, Tooltip } from "react-leaflet";

function createDroneIcon() {
  return L.divIcon({
    className: "drone-marker",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:999px;background:rgba(34,197,94,0.18);border:1px solid rgba(34,197,94,0.55);box-shadow:0 0 24px rgba(34,197,94,0.35);color:#dcfce7;font-size:12px;">D</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function DroneLayer({ drones = [], paths = [], enabled = true, animate = true }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!animate || !enabled) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStep((current) => current + 1);
    }, 1200);

    return () => window.clearInterval(timer);
  }, [animate, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {paths.map((path) => (
        <Polyline
          key={`path-${path.droneId}`}
          positions={path.route}
          pathOptions={{
            color: "#38bdf8",
            weight: 3,
            opacity: 0.75,
            dashArray: "8 12",
          }}
        />
      ))}

      {drones.map((drone) => {
        const route = paths.find((path) => path.droneId === drone.id)?.route || drone.route || [];
        const position = route.length ? route[step % route.length] : [drone.lat, drone.lng];

        return (
          <Marker key={drone.id} position={position} icon={createDroneIcon()}>
            <Tooltip className="map-tooltip">
              <div className="space-y-1">
                <p className="font-semibold">{drone.label}</p>
                <p>ID: {drone.id}</p>
                <p>Battery: {drone.battery}%</p>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
