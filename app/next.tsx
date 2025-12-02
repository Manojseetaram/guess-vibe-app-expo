import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");



export default function NextScreen() {
  const flatListRef = useRef(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
  
      <Video
        source={require("../assets/video/GIF_Request_with_Minimal_Animation.mp4")} 
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted={false} // if you want sound → change to false
      />

      {/* 🔥 ALL CONTENT ABOVE VIDEO */}
      <View style={styles.overlay}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Text style={styles.icon}>
                <Image
                        source={require("../assets/images/gear.png")} // ✅ just logo
                        style={styles.logo}
                        resizeMode="contain"
                      />
            </Text>
          </TouchableOpacity>

        

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Text style={styles.icon}>👤</Text>
          </TouchableOpacity>
        </View>

     

        {/* START BUTTON → bottom */}
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.push("/question")}
        >
          <Text style={styles.startText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---------------------------
//     STYLES
// ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // BACKGROUND VIDEO
  video: {
    ...StyleSheet.absoluteFillObject,
  },

  // CONTENT OVER VIDEO
  overlay: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },

  // HEADER
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 26,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },

  // SLIDER
  sliderBox: {
    width: "90%",
    height: 320,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 40,
  },
  slideImage: {
    width: width * 0.9,
    height: 320,
    resizeMode: "cover",
  },

  // START BUTTON AT BOTTOM
  startBtn: {
    position: "absolute",
    bottom: 40, // <-- moved to bottom
    backgroundColor: "rgba(115, 117, 184, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffff",
  },
});
