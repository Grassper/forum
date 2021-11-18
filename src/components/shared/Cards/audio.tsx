import { Audio } from "expo-av";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface props {
  audioUri: string;
}
export const AudioComponent: React.FC<props> = ({ audioUri }) => {
  const [music, setMusic] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setMusic(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function pause() {
    await music.pauseAsync();
  }
  async function resume() {
    await music.playAsync();
  }

  React.useEffect(() => {
    return music
      ? () => {
          console.log("Unloading Sound");
          music.unloadAsync();
        }
      : undefined;
  }, [music]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={playSound}>
        <Text>Play Sound</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableOpacity} onPress={pause}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchableOpacity} onPress={resume}>
        <Text>Resume</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-evenly" },
  touchableOpacity: {
    borderRadius: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
