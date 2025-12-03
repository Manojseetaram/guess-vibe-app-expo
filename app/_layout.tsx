// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { SoundProvider } from "./context/SoundContext";
import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  // Load Anton font
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
  });

  // Show loading screen while font loads
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SoundProvider>
      <Stack initialRouteName="splash">
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="next" options={{ headerShown: false }} />

        <Stack.Screen
          name="question"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </SoundProvider>
  );
}
