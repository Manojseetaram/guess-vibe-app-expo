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
import { useSound } from "./context/SoundContext";


const { width } = Dimensions.get("window");

export default function NextScreen() {
  const { soundEnabled, setSoundEnabled } = useSound();
  const flatListRef = useRef(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
  
      <Video
        source={require("../assets/video/Static_Video_Effects_Loop.mp4")} 
        style={styles.video}
        resizeMode={ResizeMode.COVER}

        shouldPlay
        isLooping
        isMuted={false}
      />

      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity
      onPress={() => setSoundEnabled(!soundEnabled)}
    >
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
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.8,
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
    bottom: 60,
    borderColor: "rgba(255,255,255,0.15)",
  borderWidth : 1,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startText: {
    fontSize: 20,
  
    fontFamily: "Rajdhani_700Bold",
    color: "#ffff",
  },
});
