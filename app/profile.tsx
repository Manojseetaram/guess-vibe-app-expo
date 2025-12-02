import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.profilePic} />
        ) : (
          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>Add Profile Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>SIGN IN</Text>
      </TouchableOpacity>

      {/* Sign Up link */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  uploadBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 12,
    color: "#555",
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
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
    color: "#007bff",
    fontSize: 16,
  },
});
