"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for the WebSocket
const WebSocketContext = createContext(null);

// Create a provider component
export function WebSocketProvider({ children }) {
  const path = usePathname()
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      if (path === "/login" || path ==="/register") {
        socket.close()
        
      }
} else {
  if (path === "/login" || path==="/register") {
return    
  }


  // Initialize WebSocket connection
  const newSocket = new WebSocket("/api/ws");

  newSocket.addEventListener("open", () => {
    console.log("WebSocket connected");
  });

  newSocket.addEventListener("close", () => {
    console.log("WebSocket disconnected");
    setSocket(null);
  });
  setSocket(newSocket);

  // Cleanup on unmount
}

  }, [path]);

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