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
  Image,
  Animated,
  Easing,
} from "react-native";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Slide from bottom

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
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Animated Popup */}
      {showPopup && (
        <Animated.View
          style={[
            styles.popupCard,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.iconBox}>
            <Image
              source={require("../assets/images/bell.png")}
            
              resizeMode="contain"
            />
          </View>

          <Text style={styles.msg}>
            Allow Guessvibe to send you notifications?
          </Text>

          <TouchableOpacity
            style={styles.allowBtn}
            onPress={() => router.push("/next")}
          >
            <Text style={styles.allowText}>Allow</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDontAllow}>
            <Text style={styles.denyText}>Dont allow</Text>
          </TouchableOpacity>
        </Animated.View>
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
    opacity: 0.2,
  },

  popupCard: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: "85%",
    padding: 15,
    borderRadius: 16,
    backgroundColor: "rgba(73, 92, 144, 0.55)",
    alignItems: "center",
    elevation: 10,
  },

  iconBox: {
    width: 60,
    height: 60,
   
    alignItems: "center"
  },

  

  msg: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
    color: "white",
  },

  allowBtn: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  allowText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },

  denyText: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});
