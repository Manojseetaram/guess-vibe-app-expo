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
  const slideAnim = useRef(new Animated.Value(200)).current;

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
  }, []);

  const closePopup = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
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
        style={{ width: 35, height: 35 }}   // SMALLER ICON
      />
    </View>

    <Text style={styles.msg}>
      Allow GuessVibe to send you notifications?
    </Text>

    {/* Allow = only close popup */}
    <TouchableOpacity style={styles.allowBtn} onPress={closePopup}>
      <Text style={styles.allowText}>Allow</Text>
    </TouchableOpacity>

    {/* Don’t allow = restart to splash/home */}
    <TouchableOpacity
      onPress={() => {
        closePopup();
        router.replace("/");  // restart app to first screen
      }}
    >
      <Text style={styles.denyText}>Don’t allow</Text>
    </TouchableOpacity>
  </Animated.View>
)}


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


 

 



bottomButton: {
  position: "absolute",
  bottom: 40,
  alignSelf: "center",
  width: "55%",
  height: 70,
 alignItems: "center",
  borderColor: "rgba(255,255,255,0.15)",
  borderWidth : 1,
  borderRadius: 14,
  justifyContent: "center",
  
},

bigText: {
  color: "white",
  fontFamily : "Rajdhani_700Bold",
  fontSize: 20,       // BIG text
  fontWeight: "800",
},

smallText: {
  color: "white",
  fontSize: 14,       // SMALL text
  fontWeight: "400",
  marginTop: 2,
},

  bottomButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  
  popupCard: {
  position: "absolute",
  top: "32%",
  alignSelf: "center",
  width: "75%",            // smaller popup
  padding: 18,
  borderRadius: 18,
  backgroundColor: "rgba(20, 30, 50, 0.85)", // cleaner dark
  alignItems: "center",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
},

iconBox: {
  width: 45,
  height: 45,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
},

msg: {
  fontSize: 15,
  textAlign: "center",
  marginBottom: 16,
  color: "white",
  lineHeight: 20,
},

allowBtn: {
  width: "100%",
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#1d7cff",
  marginBottom: 10,
  alignItems: "center",
},

allowText: {
  color: "white",
  fontSize: 16,
  fontWeight: "700",
},

denyText: {
  fontSize: 15,
  color: "#d1d1d1",
  marginTop: 4,
},

});
