export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || API_BASE_URL;

export const MAP_CENTER = [20.5937, 78.9629];

export const COMMAND_STATUS = {
  nominal: "Nominal",
  degraded: "Degraded",
  critical: "Critical",
};
