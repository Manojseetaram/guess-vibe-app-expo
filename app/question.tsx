// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
// } from "react-native";

// // MOCK DATA (Your backend later will replace this)
// const QUESTIONS = [
//   { id: 1, text: "Is your character male?" },
//   { id: 2, text: "Is your character real?" },
//   { id: 3, text: "Is your character from a movie?" },
//   { id: 4, text: "Does your character have powers?" },
// ];

// export default function Question() {
//   const [showExitPopup, setShowExitPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [finishPopup, setFinishPopup] = useState(false);

//   const [index, setIndex] = useState(0); // current question

//   const currentQuestion = QUESTIONS[index];

//   const handleAnswer = () => {
//     // Show loading bar like Akinator
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);

//       // NEXT QUESTION
//       if (index < QUESTIONS.length - 1) {
//         setIndex(index + 1);
//       } else {
//         // FINISH GAME
//         setFinishPopup(true);
//       }
//     }, 1200);
//   };

//   return (
//     <View style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.push("/settings")}>
//           <Text style={styles.icon}>⚙️</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setShowExitPopup(true)}>
//           <Text style={styles.icon}>🏠</Text>
//         </TouchableOpacity>
//       </View>

//       {/* EXIT POPUP */}
//       <Modal transparent visible={showExitPopup} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>
//               Do you want to exit the game?
//             </Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.yesBtn}
//                 onPress={() => {
//                   setShowExitPopup(false);
//                   router.push("/next");
//                 }}
//               >
//                 <Text style={styles.yesText}>YES</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.noBtn}
//                 onPress={() => setShowExitPopup(false)}
//               >
//                 <Text style={styles.noText}>NO</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* FINAL POPUP */}
//       <Modal transparent visible={finishPopup} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>Game Finished!</Text>
//             <Text style={{ marginTop: 10, fontSize: 16 }}>
//               Do you want to play again?
//             </Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.yesBtn}
//                 onPress={() => {
//                   setFinishPopup(false);
//                   setIndex(0);
//                 }}
//               >
//                 <Text style={styles.yesText}>YES</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.noBtn}
//                 onPress={() => router.push("/next")}
//               >
//                 <Text style={styles.noText}>NO</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* LOADING BAR */}
//       {loading && (
//         <View style={{ marginTop: 60, marginBottom: 20 }}>
//           <Text style={{ fontSize: 18 }}>Thinking...</Text>
//         </View>
//       )}

//       {/* IMAGE BOX */}
//       <View style={styles.imageBox}>
//         <View style={styles.crossLine1} />
//         <View style={styles.crossLine2} />
//       </View>

//       {/* QUESTION */}
//       <View style={styles.questionBox}>
//         <Text style={styles.questionText}>{currentQuestion.text}</Text>
//       </View>

//       {/* OPTIONS */}
//       <View style={styles.row}>
//         <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
//           <Text>Probably</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
//           <Text>Probably Not</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
//           <Text>Yes</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
//           <Text>No</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // -------------------- STYLES --------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingTop: 40,
//     alignItems: "center",
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "90%",
//     marginBottom: 30,
//   },
//   icon: { fontSize: 26 },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalBox: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 25,
//     alignItems: "center",
//   },
//   modalTitle: { fontSize: 18, fontWeight: "600", textAlign: "center" },

//   modalButtons: {
//     flexDirection: "row",
//     marginTop: 25,
//   },
//   yesBtn: {
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     marginRight: 15,
//   },
//   yesText: { color: "#fff", fontWeight: "700" },
//   noBtn: {
//     borderWidth: 2,
//     borderColor: "#333",
//     paddingVertical: 10,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//   },
//   noText: { color: "#333", fontWeight: "700" },

//   imageBox: {
//     width: 280,
//     height: 280,
//     borderWidth: 2,
//     borderColor: "#000",
//     marginBottom: 40,
//     position: "relative",
//   },
//   crossLine1: {
//     position: "absolute",
//     width: "100%",
//     height: 2,
//     backgroundColor: "#888",
//     transform: [{ rotate: "45deg" }],
//     top: "50%",
//   },
//   crossLine2: {
//     position: "absolute",
//     width: "100%",
//     height: 2,
//     backgroundColor: "#888",
//     transform: [{ rotate: "-45deg" }],
//     top: "50%",
//   },

//   questionBox: {
//     borderWidth: 2,
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginBottom: 40,
//   },

//   questionText: { fontSize: 20 },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginBottom: 20,
//   },

//   optionBtn: {
//     width: 130,
//     paddingVertical: 12,
//     alignItems: "center",
//     borderWidth: 2,
//     borderRadius: 6,
//   },
// });
// app/question.tsx
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
} from "react-native";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

/* ---------------------------
   Your 50 QUESTIONS (keep as-is)
   --------------------------- */
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
   Fake guess candidates (you can expand)
   --------------------------- */
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
   Genie image chooser
   Put your genie images in /assets/genie1..4.png
   --------------------------- */
const getGenieImage = (index: number) => {
  const percent = (index / QUESTIONS.length) * 100;
  if (percent < 25) return require("../assets/images/iamge1.png");
  if (percent < 50) return require("../assets/images/iamge2.png");
  if (percent < 75) return require("../assets/images/iamge3.png");
  return require("../assets/images/iamge4.png");
};

/* ---------------------------
   Component
   --------------------------- */
export default function QuestionPage() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0..100
  const [finalModal, setFinalModal] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);
  const [exitConfirm, setExitConfirm] = useState(false);

  // Animated values for genie (breathing + transition)
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Animate idle breathing
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(scale, { toValue: 1.0, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale]);

  // play tap sound safely (no crash if file missing)
  async function playTapSound() {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/music/tap.mp3")
    );

    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return; // ✅ FIX: avoids TypeScript error

      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (e) {
    // console.log("tap sound unavailable", e);
  }
}


  // Called when user answers (any option)
  const handleAnswer = async (answer: string) => {
    // play tap
    playTapSound();

    // small "thinking" animation: fade out genie, show loader, then fade in new genie
    setLoading(true);

    // brief "shake" effect
    Animated.sequence([
      Animated.timing(rotate, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();

    // Fade out
    Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }).start();

    // simulate thinking time (loading)
    setTimeout(() => {
      // update progress proportional to answered questions
      const nextIndex = index < QUESTIONS.length - 1 ? index + 1 : index;
      const newProgress = Math.min(100, Math.round(((nextIndex) / (QUESTIONS.length - 1)) * 100));
      setProgress(newProgress);

      // set new question or finish
      if (index < QUESTIONS.length - 1) {
        setIndex(nextIndex);
      } else {
        // finished -> show fake AI guess
        const randomGuess = GUESSES[Math.floor(Math.random() * GUESSES.length)];
        setGuess(randomGuess);
        setFinalModal(true);
      }

      // fade back in and stop loading
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
      setLoading(false);
    }, 900); // adjust thinking duration here
  };

  // previous question
  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      const newProgress = Math.max(0, Math.round(((index - 1) / (QUESTIONS.length - 1)) * 100));
      setProgress(newProgress);
    }
  };

  // on Play Again
  const handlePlayAgain = () => {
    setFinalModal(false);
    setIndex(0);
    setProgress(0);
    setGuess(null);
  };

  const rotateDeg = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-6deg", "0deg", "6deg"],
  });

  const currentImage = getGenieImage(index);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setExitConfirm(true)} style={{ marginRight: 14 }}>
            <Text style={styles.headerIcon}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.headerIcon}>⬅️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* GENIE IMAGE + Animated */}
      <Animated.View
        style={[
          styles.genieWrap,
          { transform: [{ scale }, { rotate: rotateDeg }], opacity: fade },
        ]}
      >
        <Image source={currentImage} style={styles.genieImage} />
      </Animated.View>

      {/* PROGRESS BAR */}


      {/* QUESTION */}
      <View style={styles.questionBox}>
        <Text style={styles.questionNumber}>Question #{index + 1}</Text>
        <Text style={styles.questionText}>{QUESTIONS[index].text}</Text>
      </View>

      {/* LOADING overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Thinking...</Text>
        </View>
      )}
            <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.optionsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.optionBtn} onPress={() => handleAnswer("probably")}>
            <Text style={styles.optionTxt}>Probably</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn} onPress={() => handleAnswer("probably_not")}>
            <Text style={styles.optionTxt}>Probably Not</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, { marginTop: 12 }]}>
          <TouchableOpacity style={styles.optionBtn} onPress={() => handleAnswer("yes")}>
            <Text style={styles.optionTxt}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn} onPress={() => handleAnswer("no")}>
            <Text style={styles.optionTxt}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* EXIT CONFIRM */}
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

      {/* FINAL GUESS MODAL */}
      <Modal transparent visible={finalModal} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>I think I found it!</Text>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "700" }}>{guess}</Text>
            <Text style={{ marginTop: 8, color: "#333" }}>Am I right?</Text>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  // user confirms — go to final /next page OR show more info
                  setFinalModal(false);
                  router.push("/next");
                }}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.noBtn} onPress={handlePlayAgain}>
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
   --------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 44 },

  header: {
    width: "94%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerIcon: { fontSize: 28 },

  genieWrap: {
    width: width * 0.85,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  genieImage: { width: 280, height: 260, resizeMode: "contain" },

  progressContainer: { width: "92%", alignItems: "center", marginBottom: 6 },
  progressBackground: {
    width: "100%",
    height: 14,
    backgroundColor: "#ddd",
    borderRadius: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffcc00",
  },
  progressText: { marginTop: 6, fontWeight: "700", color: "#333" },

  questionBox: {
    width: "92%",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  questionNumber: { fontSize: 14, color: "#666", marginBottom: 6 },
  questionText: { fontSize: 20, textAlign: "center" },

  loadingOverlay: {
    position: "absolute",
    top: "44%",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  optionsContainer: {
    marginTop: 18,
    width: "92%",
    alignItems: "center",
  },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  optionBtn: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionTxt: { fontSize: 16 },

  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalBox: { width: "85%", backgroundColor: "#fff", padding: 20, borderRadius: 14, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  yesBtn: { backgroundColor: "#1d7cff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginRight: 12 },
  yesText: { color: "#fff", fontWeight: "700" },
  noBtn: { borderWidth: 1, borderColor: "#1d7cff", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  noText: { color: "#1d7cff", fontWeight: "700" },
});
