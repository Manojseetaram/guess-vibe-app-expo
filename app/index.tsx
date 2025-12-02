import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true); // Show pop-up after 1 second
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* TOP TITLE */}
      <Text style={styles.title}>SIXTH SENSE</Text>

      {/* POPUP CARD */}
      {showPopup && (
        <View style={styles.popupCard}>
          {/* Icon */}
          <Text style={styles.icon}>🔔</Text>

          {/* Message */}
          <Text style={styles.msg}>
            Allow Guessvibe to send you notifications?
          </Text>

          <TouchableOpacity
  style={styles.allowBtn}
  onPress={() => router.push("/next")}   // 👈 go to next page
>
  <Text style={styles.allowText}>Allow</Text>
</TouchableOpacity>

          {/* Don't allow */}
          <TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  msg: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 18,
    color: "#444",
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
