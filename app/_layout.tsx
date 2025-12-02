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

      </Stack>
    </SoundProvider>
  );
}
