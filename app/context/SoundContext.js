import React, { createContext, useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgSound, setBgSound] = useState(null);

  // Play music on app start
  useEffect(() => {
    loadSound();
    return () => {
      if (bgSound) bgSound.unloadAsync();
    };
  }, []);

  // Enable/Disable sound
  useEffect(() => {
    if (soundEnabled) {
      bgSound?.playAsync();
    } else {
      bgSound?.stopAsync();
    }
  }, [soundEnabled]);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/music/tap.mp3"),
      { isLooping: true }
    );
    setBgSound(sound);
    sound.playAsync();
  }

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
