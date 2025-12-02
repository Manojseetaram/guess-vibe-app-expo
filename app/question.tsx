import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Question() {
  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
        <Text style={styles.icon}>🏠</Text>
      </View>

      {/* IMAGE BOX */}
      <View style={styles.imageBox}>
        <View style={styles.crossLine1} />
        <View style={styles.crossLine2} />
      </View>

      {/* QUESTION */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>Is Your Character is Male ?</Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.optionBtn}>
          <Text>Probably</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <Text>Probably Not</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.optionBtn}>
          <Text>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBtn}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 30,
  },
  icon: {
    fontSize: 26,
  },

  // IMAGE BOX
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

  // QUESTION BOX
  questionBox: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  questionText: {
    fontSize: 20,
  },

  // Buttons
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
