// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { SoundProvider } from "./context/SoundContext";

export default function Layout() {
  return (
    <SoundProvider>
      <Stack initialRouteName="splash">

        {/* Splash screen */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />

        {/* Home */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Next screen - NO HEADER, NO ARROW */}
        <Stack.Screen
          name="next"
          options={{
            headerShown: false, // completely removes header + back arrow
          }}
        />
        <Stack.Screen
  name="settings"
  options={{
    headerShown: true,
    title: "",                 // ❌ NO TITLE
    headerTransparent: false,
    headerStyle: {
      backgroundColor:"rgba(5, 12, 30, 0.98)", // ⭐ SAME BG COLOR
    },
    headerTintColor: "#fff",
        // ⭐ ARROW WHITE COLOR
  }}
/>


      </Stack>
    </SoundProvider>
  );
}
