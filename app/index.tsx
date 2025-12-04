import { router } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Easing,
  
} from "react-native";

import { wp, hp } from "./utils/responsive";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const slideAnim = useRef(new Animated.Value(hp(30))).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, [slideAnim]);

  const closePopup = () => {
    Animated.timing(slideAnim, {
      toValue: hp(30),
      duration: 350,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowPopup(false));
  };

  return (
    <ImageBackground
      source={require("../assets/images/char.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* POPUP */}
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
              style={{ width: wp(8), height: wp(8) }}
            />
          </View>

          <Text style={styles.msg}>
            Allow GuessVibe to send you notifications?
          </Text>

          {/* Allow button */}
          <TouchableOpacity style={styles.allowBtn} onPress={closePopup}>
            <Text style={styles.allowText}>Allow</Text>
          </TouchableOpacity>

          {/* Deny button */}
          <TouchableOpacity
            onPress={() => {
              closePopup();
              router.replace("/");
            }}
          >
            <Text style={styles.denyText}>Don’t allow</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* BOTTOM BUTTON */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => router.push("/next")}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.bigText}>Challenge Me</Text>
          <Text style={styles.smallText}>I will read your mind</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  /* ---------- BOTTOM BUTTON ---------- */

  bottomButton: {
    position: "absolute",
    bottom: hp(10),
    alignSelf: "center",
    width: wp(60),
    height: hp(8),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  bigText: {
    color: "white",
    fontSize: hp(2.8),
    fontWeight: "800",
    fontFamily: "Anton_400Regular",
  },

  smallText: {
    color: "white",
    fontSize: hp(1.8),
    marginTop: hp(0.5),
  },

  /* ---------- POPUP ---------- */

  popupCard: {
    position: "absolute",
    top: hp(35),
    alignSelf: "center",
    width: wp(75),
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: "rgba(20, 30, 50, 0.85)",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  iconBox: {
    width: wp(12),
    height: wp(12),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(1),
  },

  msg: {
    fontSize: hp(2),
    color: "white",
    textAlign: "center",
    marginBottom: hp(2),
    lineHeight: hp(2.5),
  },

  allowBtn: {
    width: "100%",
    paddingVertical: hp(1.8),
    borderRadius: wp(3),
    backgroundColor: "#1d7cff",
    marginBottom: hp(1),
    alignItems: "center",
  },

  allowText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "700",
  },

  denyText: {
    fontSize: hp(1.9),
    color: "#d1d1d1",
    marginTop: hp(0.5),
  },
});
