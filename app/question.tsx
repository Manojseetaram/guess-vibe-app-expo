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
  ImageBackground,
} from "react-native";
import { useSound } from "./context/SoundContext";
import { LinearGradient } from "expo-linear-gradient";

import { connectSocket, getSocket, subscribeSocket, closeSocket } from "./utils/sockets";

const { width } = Dimensions.get("window");

/* ---------------------------
   NOTE: NO LOCAL QUESTIONS[] USED
   Questions come from backend via WebSocket:
   { type: "question", question: "...", sessionId: "..." }
   Final guess: { type: "final_guess", sessionId: "...", guess: "...", confidence: 0.92 }
   Session end: { type: "session_end" }
---------------------------- */

/* ---------------------------
   GENIE IMAGE (keeps same mapping as you had)
---------------------------- */
const getGenieImage = (count) => {
  // use count to vary image - same logic you had
  const QUESTIONS_TOTAL = 15; // used only for image stage mapping
  const percent = (count / QUESTIONS_TOTAL) * 100;
  if (percent < 25) return require("../assets/images/iamge4.png");
  if (percent < 50) return require("../assets/images/iamge1.png");
  if (percent < 75) return require("../assets/images/iamge3.png");
  return require("../assets/images/iamge2.png");
};

export default function QuestionPage() {
  const [questionText, setQuestionText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [questionCount, setQuestionCount] = useState(0); // increments when backend sends question
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finalModal, setFinalModal] = useState(false);
  const [finalGuess, setFinalGuess] = useState(null);
  const [exitConfirm, setExitConfirm] = useState(false);

  const { soundEnabled, setSoundEnabled } = useSound();

  // Animations
  const scale = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // total expected questions (backend might send less/more) — used only for progress calculation & images
  const TOTAL_QUESTIONS = 15;

  useEffect(() => {
    // breathing animation
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 1500, useNativeDriver: true }),
      ])
    );
    loop.start();

    // connect socket
    connectSocket();

    // subscribe to socket messages
    const unsub = subscribeSocket((msg: { data: string; }) => {
      try {
        const payload = JSON.parse(msg.data);
        console.log("QUESTION RECEIVED:", payload);

        if (payload.type === "question") {
          // set question text and session id
          setQuestionText(payload.question || "");
          if (payload.sessionId || payload.sessionid) {
            setSessionId(payload.sessionId || payload.sessionid);
          }
          // increment count and progress
          setQuestionCount((prev) => {
            const next = prev + 1;
            setProgress(Math.round((next / TOTAL_QUESTIONS) * 100));
            return next;
          });
          setLoading(false);
        } else if (payload.type === "final_guess" || payload.type === "final") {
          // show final modal with backend guess
          setFinalGuess({
            guess: payload.guess || payload.name || "",
            confidence: payload.confidence,
            sessionId: payload.sessionId || payload.sessionid,
          });
          setFinalModal(true);
        } else if (payload.type === "session_end") {
          // backend indicated session ended — you can close socket or reset UI
          console.log("Session ended by backend");
          // Keep final modal or reset depending on desired behaviour
          // closeSocket(); // uncomment if you want to close socket after session
        }
      } catch (e) {
        console.log("ws message parse error", e);
      }
    });

    return () => {
      // cleanup subscription on unmount (does not close socket globally)
      unsub();
      // optionally close socket if you want
      // closeSocket();
    };
  }, []);

  const rotateDeg = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-6deg", "0deg", "6deg"],
  });

  const currentImage = getGenieImage(questionCount);

  // send answer to backend using your required payload
  // note: backend sample used "userID" + "sessionid" keys — we're sending userID (capital D) and sessionid lower-case
  const sendAnswer = (answer) => {
    setLoading(true);

    // small shake + fade for button feedback
    Animated.sequence([
      Animated.timing(rotate, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: -1, duration: 80, useNativeDriver: true }),
      Animated.timing(rotate, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();

    Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }).start();

    const ws = getSocket();
    if (ws && ws.readyState === WebSocket.OPEN) {
      const payload = {
        type: "answer",
        userID: "12345", // TODO: replace with real user id
        answer: answer,
        sessionid: sessionId,
      };

      try {
        ws.send(JSON.stringify(payload));
        console.log("ANSWER SENT:", payload);
      } catch (e) {
        console.log("send error", e);
      }
    } else {
      console.log("Socket not ready; answer queued locally or lost");
    }

    // UI: show immediate transition to next (no mock questions)
    Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    setLoading(false);
  };

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
          <Image source={require("../assets/images/home.png")} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* GENIE */}
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

      {/* BOTTOM SECTION (bubble + answers + progress) */}
      <View style={styles.bottomSection}>
        <ImageBackground
          source={require("../assets/images/bg-q.png")}
          style={styles.questionBubble}
          resizeMode="stretch"
        >
          <Text style={styles.questionNumber}>
            Question #{questionCount > 0 ? questionCount : 1}
          </Text>
          <Text style={styles.questionText}>{questionText || (loading ? "Loading..." : "")}</Text>
        </ImageBackground>

        {/* LOADING overlay (optional) */}
        {loading && (
          <View style={{ marginTop: 12 }}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}

        {/* ANSWERS */}
        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => sendAnswer("probably")}
            >
              <Text style={styles.optionTxt}>Probably</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => sendAnswer("probably_not")}
            >
              <Text style={styles.optionTxt}>Probably Not</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.optionBtn} onPress={() => sendAnswer("yes")}>
              <Text style={styles.optionTxt}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionBtn} onPress={() => sendAnswer("no")}>
              <Text style={styles.optionTxt}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PROGRESS */}
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

      {/* FINAL GUESS MODAL (backend-driven) */}
      <Modal transparent visible={finalModal} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>I think I found it!</Text>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "700", color: "white" }}>
              {finalGuess?.guess || ""}
            </Text>
            {/* Optionally show confidence */}
            {finalGuess?.confidence != null && (
              <Text style={{ marginTop: 8, color: "white" }}>
                Confidence: {Math.round(finalGuess.confidence * 100)}%
              </Text>
            )}

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

              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => {
                  setFinalModal(false);
                  // send "play again" or reset session as you like
                  // optional: send a restart message to backend
                }}
              >
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
   STYLES (unchanged from your UI)
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
    alignItems: "center",
  },
  bottomSection: {
    position: "absolute",
    bottom: "10%", // 🔥 10% gap from bottom
    width: "100%",

    alignItems: "center",
  },
  genieCenterContainer: {
    position: "absolute",
    top: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  bgImage: { width: "100%", height: "100%", resizeMode: "cover" },

  header: {
    position: "absolute",
    top: 70,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  iconBtn: {
    padding: 6, // Makes touch area bigger
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
  genieImage: { width: 280, height: 360, resizeMode: "contain", alignItems: "center", justifyContent: "center" },

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

  optionsContainer: { width: "100%", alignItems: "center" },
  row: { flexDirection: "row", width: "100%", margin: 0, padding: 0 },
  optionBtn: {
    flex: 1,
    width: "50%",
    backgroundColor: "#142131",
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    padding: 0,
    margin: 0,
  },
  optionTxt: { fontSize: 16, color: "white" },

  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },

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
    borderWidth: 1,
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
    borderWidth: 1,
  },

  noText: {
    color: "#d1d1d1",
    fontSize: 15,
    fontWeight: "600",
  },
});
