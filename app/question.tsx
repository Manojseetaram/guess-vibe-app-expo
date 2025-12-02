import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

// MOCK DATA (Your backend later will replace this)
const QUESTIONS = [
  { id: 1, text: "Is your character male?" },
  { id: 2, text: "Is your character real?" },
  { id: 3, text: "Is your character from a movie?" },
  { id: 4, text: "Does your character have powers?" },
];

export default function Question() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finishPopup, setFinishPopup] = useState(false);

  const [index, setIndex] = useState(0); // current question

  const currentQuestion = QUESTIONS[index];

  const handleAnswer = () => {
    // Show loading bar like Akinator
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // NEXT QUESTION
      if (index < QUESTIONS.length - 1) {
        setIndex(index + 1);
      } else {
        // FINISH GAME
        setFinishPopup(true);
      }
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowExitPopup(true)}>
          <Text style={styles.icon}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* EXIT POPUP */}
      <Modal transparent visible={showExitPopup} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Do you want to exit the game?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setShowExitPopup(false);
                  router.push("/next");
                }}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => setShowExitPopup(false)}
              >
                <Text style={styles.noText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FINAL POPUP */}
      <Modal transparent visible={finishPopup} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Game Finished!</Text>
            <Text style={{ marginTop: 10, fontSize: 16 }}>
              Do you want to play again?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.yesBtn}
                onPress={() => {
                  setFinishPopup(false);
                  setIndex(0);
                }}
              >
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noBtn}
                onPress={() => router.push("/next")}
              >
                <Text style={styles.noText}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* LOADING BAR */}
      {loading && (
        <View style={{ marginTop: 60, marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Thinking...</Text>
        </View>
      )}

      {/* IMAGE BOX */}
      <View style={styles.imageBox}>
        <View style={styles.crossLine1} />
        <View style={styles.crossLine2} />
      </View>

      {/* QUESTION */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{currentQuestion.text}</Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
          <Text>Probably</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
          <Text>Probably Not</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
          <Text>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn} onPress={handleAnswer}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  icon: { fontSize: 26 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", textAlign: "center" },

  modalButtons: {
    flexDirection: "row",
    marginTop: 25,
  },
  yesBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 15,
  },
  yesText: { color: "#fff", fontWeight: "700" },
  noBtn: {
    borderWidth: 2,
    borderColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  noText: { color: "#333", fontWeight: "700" },

  imageBox: {
    width: 280,
    height: 280,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 40,
    position: "relative",
  },
  crossLine1: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#888",
    transform: [{ rotate: "45deg" }],
    top: "50%",
  },
  crossLine2: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#888",
    transform: [{ rotate: "-45deg" }],
    top: "50%",
  },

  questionBox: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 40,
  },

  questionText: { fontSize: 20 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },

  optionBtn: {
    width: 130,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 6,
  },
});
