"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the WebSocket
const WebSocketContext = createContext(null);

// Create a provider component
export function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = new WebSocket("ws://localhost:8080/api/ws");
    setSocket(newSocket);

    newSocket.addEventListener("open", () => {
      console.log("WebSocket connected");
    });

    newSocket.addEventListener("close", () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Custom hook to access the WebSocket context
export function useWebSocket() {
  return useContext(WebSocketContext);
}