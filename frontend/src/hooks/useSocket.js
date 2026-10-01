import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../services/config";

let sharedSocket = null;

export default function useSocket() {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    if (!sharedSocket) {
      sharedSocket = io(SOCKET_URL, {
        transports: ["polling", "websocket"],
        autoConnect: true,
        reconnection: true,
      });
    }

    const socket = sharedSocket;

    socketRef.current = socket;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onAny = (event, payload) => {
      setLastEvent({
        event,
        payload,
        receivedAt: Date.now(),
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.onAny(onAny);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.offAny(onAny);
    };
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    lastEvent,
  };
}
