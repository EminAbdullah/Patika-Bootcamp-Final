


class WSClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = new Map();
  }

  connect(userId) {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(this.url);


      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({ type: "register", clientId: userId }));

        console.log("WebSocket connection established.");
      };

      this.socket.onmessage = (event) => {
        this.notifyListeners(event.data);
      };

      this.socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket is not connected.");
    }
  }

  addListener(key, callback) {
    this.listeners.set(key, callback);
  }

  removeListener(key) {
    this.listeners.delete(key);
  }

  notifyListeners(message) {
    this.listeners.forEach((callback) => callback(message));
  }
}

// Singleton instance to share across pages
const wsClientInstance = new WSClient("ws://host.docker.internal:5555");

export default wsClientInstance;