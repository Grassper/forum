import { Audio } from "expo-av";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface props {}
export const AudioComponent: React.FC<props> = () => {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/root/assets/audio/sample.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function pause() {
    await sound.pauseAsync();
  }
  async function resume() {
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={playSound}>
        <Text style={styles.text}>Play Sound</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableOpacity} onPress={pause}>
        <Text style={styles.text}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableOpacity} onPress={resume}>
        <Text style={styles.text}>Resume</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-evenly" },
  text: {
    color: "white",
  },
  touchableOpacity: {
    backgroundColor: "gray",
    borderRadius: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
