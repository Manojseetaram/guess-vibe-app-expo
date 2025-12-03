// import React, { useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { Video, ResizeMode } from "expo-av";
// import { useSound } from "./context/SoundContext";
// import { connectSocket, getSocket } from "./utils/sockets";

// const { width } = Dimensions.get("window");

// export default function NextScreen() {
//   const { soundEnabled, setSoundEnabled } = useSound();
//   const flatListRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     connectSocket(); // connect on screen open
//   }, []);

//   const handleStart = () => {
//     const ws = getSocket();

//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(
//         JSON.stringify({
//           type: "init",
//           userID: "12345",
//         })
//       );
//       console.log("Init Message Sent!");
//     } else {
//       console.log("Socket not ready!");
//     }

//     router.push("/question");
//   };

//   return (
//     <View style={styles.container}>
//       <Video
//         source={require("../assets/video/Static_Video_Effects_Loop.mp4")}
//         style={styles.video}
//         resizeMode={ResizeMode.COVER}
//         shouldPlay
//         isLooping
//         isMuted={false}
//       />

//       <View style={styles.overlay}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => setSoundEnabled(!soundEnabled)}>
//             <Image
//               source={
//                 soundEnabled
//                   ? require("../assets/images/volume.png")
//                   : require("../assets/images/mute.png")
//               }
//               style={{ width: 32, height: 32 }}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => router.push("/profile")}>
//             <Image
//               source={require("../assets/images/user.png")}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
//           <Text style={styles.startText}>START</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#000" },

//   video: {
//     ...StyleSheet.absoluteFillObject,
//     width: "100%",
//     height: "100%",
//     opacity: 0.8,
//   },

//   overlay: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 40,
//   },

//   header: {
//     width: "90%",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   startBtn: {
//     position: "absolute",
//     bottom: 60,
//     borderColor: "rgba(255,255,255,0.15)",
//     borderWidth: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 10,
//   },

//   startText: {
//     fontSize: 20,
//     fontFamily: "Rajdhani_700Bold",
//     color: "#fff",
//   },
// });
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Video, ResizeMode } from "expo-av";
import { useSound } from "./context/SoundContext";

import { connectSocket, getSocket } from "./utils/sockets";

export default function NextScreen() {
  const { soundEnabled, setSoundEnabled } = useSound();
  const router = useRouter();

  // CONNECT WEBSOCKET
  useEffect(() => {
    connectSocket();
  }, []);

  const handleStart = () => {
    const ws = getSocket();

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "init",
          userID: "12345",
        })
      );

      console.log("INIT SENT");
    }

    router.push("/question");
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={require("../assets/video/Static_Video_Effects_Loop.mp4")}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />

      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSoundEnabled(!soundEnabled)}>
            <Image
              source={
                soundEnabled
                  ? require("../assets/images/volume.png")
                  : require("../assets/images/mute.png")
              }
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("../assets/images/user.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* START BUTTON */}
        <TouchableOpacity style={styles.startBtn} onPress={handleStart}>
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  video: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },

  overlay: { flex: 1, alignItems: "center", paddingTop: 40 },

  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  startBtn: {
    position: "absolute",
    bottom: 60,
    borderColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
});
