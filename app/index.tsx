// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform } from "react-native";

// export default function Home() {
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopup(true);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleDontAllow = () => {
//     if (Platform.OS === "android") {
//       BackHandler.exitApp(); // ✅ CLOSE APP
//     } else {
//       // ❗ iOS cannot force close app
//       setShowPopup(false); // close popup instead
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SIXTH SENSE</Text>

//       {showPopup && (
//         <View style={styles.popupCard}>
//           <Text style={styles.icon}>🔔</Text>

//           <Text style={styles.msg}>Allow Guessvibe to send you notifications?</Text>

//           <TouchableOpacity
//             style={styles.allowBtn}
//             onPress={() => router.push("/next")}
//           >
//             <Text style={styles.allowText}>Allow</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleDontAllow}>
//             <Text style={styles.denyText}>Dont allow</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     paddingTop: 80,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 40,
//   },
//   popupCard: {
//     width: "80%",
//     padding: 25,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 40,
//     marginBottom: 10,
//   },
//   msg: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 18,
//   },
//   allowBtn: {
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   allowText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   denyText: {
//     fontSize: 16,
//     color: "#444",
//   },
// });
import { router } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Platform,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // start below screen

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);

      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDontAllow = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    } else {
      setShowPopup(false);
    }
  };

  return (
   <ImageBackground
  source={require("../assets/images/char.png")}
  style={styles.bg}
  resizeMode="cover"
>
  {/* Overlay for opacity */}
  <View style={styles.overlay} />

  {/* --- Your Popup --- */}
  {showPopup && (
    <View style={styles.popupCard}>
      <Text style={styles.icon}>🔔</Text>
      <Text style={styles.msg}>Allow Guessvibe to send you notifications?</Text>

      <TouchableOpacity
        style={styles.allowBtn}
        onPress={() => router.push("/next")}
      >
        <Text style={styles.allowText}>Allow</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDontAllow}>
        <Text style={styles.denyText}>Dont allow</Text>
      </TouchableOpacity>
    </View>
  )}
</ImageBackground>

  );
}

const styles = StyleSheet.create({
 bg: {
  flex: 1,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
},

overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "black",
  opacity: 0.4,   // 👈 LOWER = more transparent
},


  popupCard: {
    position: "absolute",
    bottom: 30, // bottom popup
    alignSelf: "center",
    width: "85%",
    padding: 25,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    elevation: 10,
  },

  icon: {
    fontSize: 42,
    marginBottom: 10,
  },

  msg: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
    color: "#222",
  },

  allowBtn: {
    // backgroundColor: "#007bff",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  allowText: {
    color: "black",
    fontSize: 17,
    fontWeight: "700",
  },

  denyText: {
    fontSize: 16,
    color: "#444",
    marginTop: 5,
  },
});
