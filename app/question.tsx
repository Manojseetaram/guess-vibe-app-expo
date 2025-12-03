import { router } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
  Modal,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSound } from "./context/SoundContext";
import { LinearGradient } from "expo-linear-gradient";



const { width } = Dimensions.get("window");

/* ---------------------------
   QUESTIONS
---------------------------- */
const QUESTIONS = [
  { id: 1, text: "Is your character a real person?" },
  { id: 2, text: "Is your character male?" },
  { id: 3, text: "Is your character female?" },
  { id: 4, text: "Is your character alive?" },
  { id: 5, text: "Is your character from a movie?" },
  { id: 6, text: "Is your character from a TV show?" },
  { id: 7, text: "Is your character animated?" },
  { id: 8, text: "Is your character a singer?" },
  { id: 9, text: "Is your character an actor?" },
  { id: 10, text: "Is your character a YouTuber?" },
  { id: 11, text: "Is your character a gamer?" },
  { id: 12, text: "Is your character a politician?" },
  { id: 13, text: "Is your character a sportsperson?" },
  { id: 14, text: "Does your character have superpowers?" },
  { id: 15, text: "Is your character from Marvel?" },
  { id: 16, text: "Is your character from DC?" },
  { id: 17, text: "Is your character an Indian?" },
  { id: 18, text: "Is your character American?" },
  { id: 19, text: "Is your character from a video game?" },
  { id: 20, text: "Is your character older than 30?" },
  { id: 21, text: "Is your character a teenager?" },
  { id: 22, text: "Is your character blonde?" },
  { id: 23, text: "Is your character funny?" },
  { id: 24, text: "Is your character rich?" },
  { id: 25, text: "Is your character part of a group?" },
  { id: 26, text: "Is your character an internet meme?" },
  { id: 27, text: "Is your character a robot?" },
  { id: 28, text: "Does your character wear glasses?" },
  { id: 29, text: "Does your character have a moustache?" },
  { id: 30, text: "Is your character a villain?" },
  { id: 31, text: "Is your character a hero?" },
  { id: 32, text: "Is your character from anime?" },
  { id: 33, text: "Is your character a dancer?" },
  { id: 34, text: "Is your character a comedian?" },
  { id: 35, text: "Is your character a scientist?" },
  { id: 36, text: "Is your character in a relationship?" },
  { id: 37, text: "Does your character wear a hat?" },
  { id: 38, text: "Is your character bald?" },
  { id: 39, text: "Is your character famous on TikTok?" },
  { id: 40, text: "Is your character a cartoon animal?" },
  { id: 41, text: "Is your character from a horror movie?" },
  { id: 42, text: "Is your character from a superhero movie?" },
  { id: 43, text: "Is your character from a kids show?" },
  { id: 44, text: "Does your character play an instrument?" },
  { id: 45, text: "Is your character a leader?" },
  { id: 46, text: "Does your character have a pet?" },
  { id: 47, text: "Does your character fight using weapons?" },
  { id: 48, text: "Does your character have magical powers?" },
  { id: 49, text: "Is your character from ancient history?" },
  { id: 50, text: "Is your character the main character in their story?" },
];

/* ---------------------------
   FAKE GUESSES
---------------------------- */
const GUESSES = [
  "Sherlock Holmes",
  "Harry Potter",
  "Iron Man",
  "Naruto Uzumaki",
  "Lionel Messi",
  "Taylor Swift",
  "Superman",
  "Gandalf",
  "Amitabh Bachchan",
  "Elon Musk",
];

/* ---------------------------
   GENIE IMAGE
---------------------------- */
const getGenieImage = (index) => {
  const percent = (index / QUESTIONS.length) * 100;
  if (percent < 25) return require("../assets/images/iamge4.png");
  if (percent < 50) return require("../assets/images/iamge1.png");
  if (percent < 75) return require("../assets/images/iamge3.png");
  return require("../assets/images/iamge2.png");
};

/* ---------------------------
   COMPONENT
---------------------------- */
export default function QuestionPage() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finalModal, setFinalModal] = useState(false);
  const [guess, setGuess] = useState(null);
  const [exitConfirm, setExitConfirm] = useState(false);

  const { soundEnabled, setSoundEnabled } = useSound(); // 🔥 USING YOUR GLOBAL SOUND

  // Animations
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  /* ---------------------------
     BREATHING ANIMATION
  ---------------------------- */
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 1500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  /* ---------------------------
     ON ANSWER CLICK
  ---------------------------- */
  const handleAnswer = () => {
    setLoading(true);

    // small shake
    Animated.sequence([
      Animated.timing(rotate, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();

    // fade out
    Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }).start();

    setTimeout(() => {
      const nextIndex = index < QUESTIONS.length - 1 ? index + 1 : index;
      const newProgress = Math.round((nextIndex / (QUESTIONS.length - 1)) * 100);

      setIndex(nextIndex);
      setProgress(newProgress);

      if (index === QUESTIONS.length - 1) {
        const randomGuess = GUESSES[Math.floor(Math.random() * GUESSES.length)];
        setGuess(randomGuess);
        setFinalModal(true);
      }

      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
      setLoading(false);
    }, 900);
  };

  /* ---------------------------
     BACK BUTTON
  ---------------------------- */
  const handleBack = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setProgress(Math.round((newIndex / (QUESTIONS.length - 1)) * 100));
    }
  };

  const rotateDeg = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-6deg", "0deg", "6deg"],
  });

  const currentImage = getGenieImage(index);

  return (
    <View style={styles.container}>
      {/* BG */}
      <View style={styles.bgWrap}>
        <Image source={require("../assets/images/bg.png")} style={styles.bgImage} />
      </View>

      {/* HEADER */}
<View style={styles.header}>
  
  {/* SOUND BUTTON */}
  <TouchableOpacity onPress={() => setSoundEnabled(!soundEnabled)} style={styles.iconBtn}>
    <Image
      source={
        soundEnabled
          ? require("../assets/images/volume.png")
          : require("../assets/images/mute.png")
      }
      style={styles.headerIcon}
    />
  </TouchableOpacity>

  {/* HOME BUTTON */}
  <TouchableOpacity onPress={() => setExitConfirm(true)} style={styles.iconBtn}>
    <Image
      source={require("../assets/images/home.png")}
      style={styles.headerIcon}
    />
  </TouchableOpacity>

</View>


 <View style={styles.genieCenterContainer}>
  <Animated.View
    style={[
      styles.genieWrap,
      { transform: [{ scale }, { rotate: rotateDeg }], opacity: fade },
    ]}
  >
    <Image source={currentImage} style={styles.genieImage} />
  </Animated.View>
</View>


    <View style={styles.bottomSection}>
      <ImageBackground
        source={require("../assets/images/bg-q.png")}
        style={styles.questionBubble}
        resizeMode="stretch"
      >
        <Text style={styles.questionNumber}>Question #{index + 1}</Text>
        <Text style={styles.questionText}>{QUESTIONS[index].text}</Text>
      </ImageBackground>

      {/* LOADING */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Thinking...</Text>
        </View>
      )}

     

      {/* ANSWERS */}
  <View style={styles.optionsContainer}>
  <View style={styles.row}>
    <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
      <Text style={styles.optionTxt}>Probably</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
      <Text style={styles.optionTxt}>Probably Not</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.row}>
    <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
      <Text style={styles.optionTxt}>Yes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
      <Text style={styles.optionTxt}>No</Text>
    </TouchableOpacity>
  </View>
</View>

      <View style={styles.progressContainer}>
  <View style={styles.progressBackground}>
    
    <Animated.View style={[styles.progressFill, { width: `${progress}%` }]}>
      <LinearGradient
        colors={["#6EC6FF", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientFill}
      />
    </Animated.View>

  </View>
</View>
</View>
      {/* EXIT MODAL */}
      <Modal transparent visible={exitConfirm} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Do you want to exit the game?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setExitConfirm(false);
                  router.push("/next");
                }}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.noBtn} onPress={() => setExitConfirm(false)}>
                <Text style={styles.noText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FINAL GUESS */}
      <Modal transparent visible={finalModal} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>I think I found it!</Text>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "700" , color : "white" }}>{guess}</Text>
            <Text style={{ marginTop: 8 , color : "white" }}>Am I right?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setFinalModal(false);
                  router.push("/next");
                }}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.noBtn} onPress={() => setFinalModal(false)}>
                <Text style={styles.noText}>PLAY AGAIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------------------------
   STYLES
---------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center" },

  bgWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    alignItems : "center"
  },
  bottomSection: {
  position: "absolute",
  bottom: "10%",       // 🔥 10% gap from bottom
  width: "100%",
  
  alignItems: "center",
},
genieCenterContainer: {
  position: "absolute",
  top: "20%",          // 👈 moves it vertically to screen center (adjust if needed)
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},


  bgImage: { width: "100%", height: "100%", resizeMode: "cover" },

 header: {
  position: "absolute",
  top: 70,                // ✨ Gives perfect top spacing
  width: "90%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
},

iconBtn: {
  padding: 6,             // Makes touch area bigger
},

headerIcon: {
  width: 32,
  height: 32,
  resizeMode: "contain",
},



  genieWrap: {
    width: width * 0.85,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  genieImage: { width: 280, height: 360, resizeMode: "contain" , alignItems : "center" , justifyContent : "center" },

  progressContainer: { width: "100%", alignItems: "center", marginBottom: 6 },
  progressBackground: {
    width: "100%",
    height: 14,
    backgroundColor: "#ddd",
  
    overflow: "hidden",
  },
  progressFill: {
  height: "100%",
  overflow: "hidden",
},

gradientFill: {
  width: "100%",
  height: "100%",
},
  // progressText: { marginTop: 6, fontWeight: "700", color: "#333" },

  questionBubble: {
    width: "110%",
    minHeight: 140,
    paddingVertical: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  questionNumber: { fontSize: 14, color: "#666", marginBottom: 6 },
  questionText: { fontSize: 20, textAlign: "center", color: "white" },

  loadingOverlay: {
    position: "absolute",
    top: "44%",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  optionsContainer: {  width: "100%", alignItems: "center" , },
  row: { flexDirection: "row", width: "100%" , margin : 0 , padding : 0   },
  optionBtn: {
    flex : 1,
    width: "50%",
    backgroundColor: "#142131",
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    padding : 0,
    margin : 0
  },
  optionTxt: { fontSize: 16 , color : "white" },

modalBg: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "center",
  alignItems: "center",
},

modalBox: {
  width: "75%",
  padding: 20,
  backgroundColor: "rgba(20, 30, 50, 0.85)",
  borderRadius: 18,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.15)",
  alignItems: "center",
},

modalTitle: {
  fontSize: 16,
  color: "white",
  textAlign: "center",
  lineHeight: 22,
},

yesBtn: {
  flex: 1,
  backgroundColor: "#142131",
  paddingVertical: 10,
  borderRadius: 10,
  marginRight: 8,
  alignItems: "center",
  borderColor: "rgba(255,255,255,0.15)",
  borderWidth : 1
  
},

yesText: {
  color: "white",
  fontSize: 16,
  fontWeight: "700",
},

noBtn: {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 10,
  marginLeft: 8,
  alignItems: "center",
  borderColor: "rgba(255,255,255,0.15)",
  borderWidth : 1
},

noText: {
  color: "#d1d1d1",
  fontSize: 15,
  fontWeight: "600",
},

});
