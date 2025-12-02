import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();
const [image, setImage] = useState<string | null>(null);

  // Pick Profile Image
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  console.log(result); // <-- Debug what you actually get

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setImage(result.assets[0].uri);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Profile Photo */}
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageBox}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text style={{ color: "#777" }}>Add Profile Photo</Text>
          )}
        </View>
      </TouchableOpacity>

      {/* INPUTS */}
      <TextInput style={styles.input} placeholder="Enter your Name" />
      <TextInput style={styles.input} placeholder="Enter your Email" />
      <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry />

      {/* SIGN UP BUTTON */}
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => {
          // After sign up -> go DIRECT to next.tsx
          router.replace("/next");
        }}
      >
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  imageBox: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  input: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  signupBtn: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 20,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  backText: {
    marginTop: 25,
    color: "#444",
    fontSize: 16,
  },
});
