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
import { ResizeMode } from 'expo-av';


const { width } = Dimensions.get("window");

export default function NextScreen() {
  const flatListRef = useRef(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
  
      <Video
        source={require("../assets/video/GIF_Request_with_Minimal_Animation.mp4")} 
        style={styles.video}
        resizeMode={ResizeMode.COVER}

        shouldPlay
        isLooping
        isMuted={false}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Image
              source={require("../assets/images/setting.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("../assets/images/user.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  video: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4, // 🔥 ADD THIS
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },

  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  startBtn: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "rgba(115, 117, 184, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
});
