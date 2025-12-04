
// let socket: WebSocket | null = null;
// let listeners: any[] = [];

// export const WS_URL = "wss://unfearingly-heterozygous-brittny.ngrok-free.dev/ws"; 

// export const connectSocket = () => {
//   if (socket && socket.readyState === WebSocket.OPEN) return socket;

//   try {
//     socket = new WebSocket(WS_URL);

//     socket.onopen = () => {
//       console.log("WS Connected");
//     };

//     socket.onmessage = (msg) => {
//       // dispatch to listeners
//       listeners.forEach((fn) => {
//         try {
//           fn(msg);
//         } catch (e) {
//           console.warn("listener error", e);
//         }
//       });
//     };

//     socket.onerror = (err) => {
//       console.log("WS ERROR:", err);
//     };

//     socket.onclose = (ev) => {
//       console.log("WS CLOSED", ev && ev.code);
      
//     };
//   } catch (e) {
//     console.log("connectSocket error", e);
//   }

//   return socket;
// };

// export const getSocket = () => socket;

// export const subscribeSocket = (fn: (msg: { data: string; }) => void) => {
//   listeners.push(fn);
//   return () => {
//     listeners = listeners.filter((l) => l !== fn);
//   };
// };

// export const closeSocket = () => {
//   try {
//     if (socket) {
//       socket.close();
//       socket = null;
//       listeners = [];
//     }
//   } catch (e) {
//     console.log("closeSocket error", e);
//   }
// };
let socket: WebSocket | null = null;
let listeners: any[] = [];
let pendingMessages: any[] = [];

export const WS_URL = "wss://unfearingly-heterozygous-brittny.ngrok-free.dev/ws";

export const connectSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) return socket;

  try {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WS Connected");

      // Send all pending messages after connection
      pendingMessages.forEach((msg) => {
        console.log("SENDING PENDING:", msg);
        socket?.send(JSON.stringify(msg));
      });
      pendingMessages = [];
    };

    socket.onmessage = (msg) => {
      listeners.forEach((fn) => {
        try {
          fn(msg);
        } catch (e) {
          console.warn("listener error", e);
        }
      });
    };

    socket.onerror = (err) => {
      console.log("WS ERROR:", err);
    };

    socket.onclose = (ev) => {
      console.log("WS CLOSED", ev.code);
    };

  } catch (e) {
    console.log("connectSocket error", e);
  }

  return socket;
};

// Updated send wrapper
export const sendWSMessage = (payload: any) => {
  const ws = socket;

  if (ws && ws.readyState === WebSocket.OPEN) {
    console.log("DIRECT SEND:", payload);
    ws.send(JSON.stringify(payload));
  } else {
    console.log("QUEUEING PENDING MESSAGE:", payload);
    pendingMessages.push(payload);
    connectSocket();
  }
};

export const getSocket = () => socket;

export const subscribeSocket = (fn: (msg: { data: string }) => void) => {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
};

export const closeSocket = () => {
  try {
    if (socket) {
      socket.close();
      socket = null;
      listeners = [];
      pendingMessages = [];
    }
  } catch (e) {
    console.log("closeSocket error", e);
  }
};
