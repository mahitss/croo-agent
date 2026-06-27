import { useEffect } from 'react';

export function useWebSocket(url: string, onMessage: (event: MessageEvent) => void) {
  useEffect(() => {
    let socket: WebSocket | null = null;
    try {
      socket = new WebSocket(url);
      socket.onmessage = onMessage;
      socket.onopen = () => console.log(`WebSocket connected to: ${url}`);
      socket.onerror = (err) => console.error('WebSocket connection error:', err);
    } catch (e) {
      console.warn('Websockets not reachable in offline mode:', e);
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url, onMessage]);
}
