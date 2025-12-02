import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useSound } from "./context/SoundContext"

export default function Settings() {
  const { soundEnabled, setSoundEnabled } = useSound();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>Sound</Text>
        <Switch
          value={soundEnabled}
          onValueChange={(v) => setSoundEnabled(v)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 40 },
  title: { fontSize: 22, fontWeight: "700" },
  item: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 18, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 18, fontWeight: "600" },
});
