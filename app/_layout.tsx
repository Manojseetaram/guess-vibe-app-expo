// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { SoundProvider } from "./context/SoundContext";


export default function Layout() {
  

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
