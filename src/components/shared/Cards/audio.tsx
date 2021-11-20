import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface props {
  audioUri: string;
}
export const AudioComponent: React.FC<props> = ({ audioUri }) => {
  const [music, setMusic] = useState();
  // useEffect(() => {
  //   setInterval(function () {
  //     if (music) {
  //       console.log("called", music);
  //     }
  //   }, 1000000);
  // });

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

    setMusic(sound);

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
  async function status() {
    const val = await music.getStatusAsync();
    console.log("mus", val);
  }
  //   <TouchableOpacity style={styles.touchableOpacity} onPress={playSound}>
  //   <Text>Play Sound</Text>
  // </TouchableOpacity>
  // <TouchableOpacity style={styles.touchableOpacity} onPress={pause}>
  //   <Text>Pause</Text>
  // </TouchableOpacity>
  // <TouchableOpacity style={styles.touchableOpacity} onPress={resume}>
  //   <Text>Resume</Text>
  // </TouchableOpacity>
  // <TouchableOpacity style={styles.touchableOpacity} onPress={status}>
  //   <Text>status</Text>
  // </TouchableOpacity>

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text>guru</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: "gray", width: "90%" },
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  touchableOpacity: {
    borderRadius: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
