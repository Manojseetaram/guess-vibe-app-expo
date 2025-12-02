import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform } from "react-native";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDontAllow = () => {
    if (Platform.OS === "android") {
      BackHandler.exitApp(); // ✅ CLOSE APP
    } else {
      // ❗ iOS cannot force close app
      setShowPopup(false); // close popup instead
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIXTH SENSE</Text>

      {showPopup && (
        <View style={styles.popupCard}>
          <Text style={styles.icon}>🔔</Text>

          <Text style={styles.msg}>Allow Guessvibe to send you notifications?</Text>

          <TouchableOpacity
            style={styles.allowBtn}
            onPress={() => router.push("/next")}
          >
            <Text style={styles.allowText}>Allow</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDontAllow}>
            <Text style={styles.denyText}>Dont allow</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 40,
  },
  popupCard: {
    width: "80%",
    padding: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  msg: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
  },
  allowBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  allowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  denyText: {
    fontSize: 16,
    color: "#444",
  },
});
