// app/next.tsx
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const images = [
  require("../assets/images/icon.png"),
  require("../assets/images/android-icon-background.png"),
  require("../assets/images/android-icon-background.png"),
];

export default function NextScreen() {
  const flatListRef = useRef(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/settings")}>
  <Text style={styles.icon}>⚙️</Text>
</TouchableOpacity>

        <Text style={styles.title}>SIXTH SErurhrjrjrjrNSE</Text>

        <TouchableOpacity>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* SLIDER */}
      <View style={styles.sliderBox}>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={item} style={styles.slideImage} />
          )}
        />
      </View>

      {/* START Button */}
      <TouchableOpacity style={styles.startBtn}>
        <Text style={styles.startText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },

  // HEADER
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 26,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  // SLIDER
  sliderBox: {
    width: "90%",
    height: 320,
    backgroundColor: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 40,
  },
  slideImage: {
    width: width * 0.9,
    height: 320,
    resizeMode: "cover",
  },

  // BUTTON
  startBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  startText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
