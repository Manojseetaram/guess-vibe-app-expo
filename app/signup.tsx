import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
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

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}  // SAME background as profile
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>Create Account</Text>

      {/* Profile Photo */}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profilePic} />
        ) : (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>Add Profile Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* INPUTS */}
      <TextInput style={styles.input} placeholder="Enter your Name" placeholderTextColor="#333" />
      <TextInput style={styles.input} placeholder="Enter your Email" placeholderTextColor="#333" />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#333"
        secureTextEntry
      />

      {/* SIGN UP BUTTON */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/next")}
      >
        <Text style={styles.btnText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* BACK */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
  },
  uploadBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 12,
    color: "#333",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "#142131",
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "rgba(255,255,255,0.15)",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});
