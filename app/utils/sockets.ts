// // let socket: WebSocket | null = null;

// // export const connectSocket = () => {
// //   socket = new WebSocket("wss://unfearingly-heterozygous-brittny.ngrok-free.dev/ws");

// //   socket.onopen = () => {
// //     console.log("WebSocket Connected!");
// //   };

// //   socket.onmessage = (msg) => {
// //     console.log("Received:", msg.data);
// //   };

// //   socket.onerror = (err) => {
// //     console.log("Socket Error:", err);
// //   };

// //   socket.onclose = () => {
// //     console.log("Socket Closed!");
// //   };

// //   return socket;
// // };

// // export const getSocket = () => socket;
// // app/utils/sockets.js
// let socket = null;

// export const connectSocket = () => {
//   if (socket && socket.readyState === WebSocket.OPEN) return socket;

//   // ⬅️ UPDATE WITH YOUR BACKEND WS URL
//   socket = new WebSocket("wss://unfearingly-heterozygous-brittny.ngrok-free.dev/ws");

//   socket.onopen = () => {
//     console.log("WS Connected");
//   };

//   socket.onmessage = (msg) => {
//     console.log("WS MESSAGE:", msg.data);
//   };

//   socket.onerror = (err) => {
//     console.log("WS ERROR:", err);
//   };

//   socket.onclose = () => {
//     console.log("WS CLOSED");
//   };

//   return socket;
// };

// export const getSocket = () => socket;
// app/utils/sockets.js
let socket = null;
let listeners = [];

export const WS_URL = "wss://unfearingly-heterozygous-brittny.ngrok-free.dev/ws"; // <- put your wss ngrok url

export const connectSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) return socket;

  try {
    socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WS Connected");
    };

    socket.onmessage = (msg) => {
      // dispatch to listeners
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
      console.log("WS CLOSED", ev && ev.code);
      // keep socket reference but if you want auto-reconnect, implement here.
    };
  } catch (e) {
    console.log("connectSocket error", e);
  }

  return socket;
};

export const getSocket = () => socket;

export const subscribeSocket = (fn) => {
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
    }
  } catch (e) {
    console.log("closeSocket error", e);
  }
};
