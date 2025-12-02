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
    </Stack>
        </SoundProvider>

  );
}
