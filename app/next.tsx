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
import { wp, hp } from "./utils/responsive";

export default function NextScreen() {
  const { soundEnabled, setSoundEnabled } = useSound();
  const router = useRouter();

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
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSoundEnabled(!soundEnabled)}>
            <Image
              source={
                soundEnabled
                  ? require("../assets/images/volume.png")
                  : require("../assets/images/mute.png")
              }
              style={styles.headerIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image
              source={require("../assets/images/user.png")}
              resizeMode="contain"
              style={styles.profileIcon}
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
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  video: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    paddingTop: hp(6),
  },

  /* ---------- HEADER ---------- */
  header: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(3),
  },

  headerIcon: {
    width: wp(8),
    height: wp(8),
  },

  profileIcon: {
    width: wp(9),
    height: wp(9),
  },

  /* ---------- START BUTTON ---------- */
  startBtn: {
    position: "absolute",
    bottom: hp(10),
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(15),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  startText: {
    fontSize: hp(2.6),
    fontWeight: "bold",
    color: "#fff",
  },
});

