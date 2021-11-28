import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Pressable } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface props {
  audioUri: string;
}
export const AudioComponent: React.FC<props> = ({ audioUri }) => {
  const [music, setMusic] = useState();
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);

  React.useEffect(() => {
    if (play && duration === 0) {
      playSound();
    } else {
      if (play && duration !== 0) {
        resume();
      } else {
        pause();
      }
    }
  }, [play]);

  async function playSound() {
    console.log("Loading Sound", sound);
    setDuration(duration + 1);
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

    setMusic(sound);
    setPlay(true);
    await sound.playAsync();
  }

  async function pause() {
    if (music) {
      await music.pauseAsync();
    }
  }
  async function resume() {
    if (music) {
      await music.playAsync();
    }
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
    <View style={styles.outerContainer}>
      <Pressable onPress={() => setPlay(!play)} mr="1">
        {play ? (
          <Ionicons name="ios-pause" size={50} color="#17D7A0" />
        ) : (
          <Ionicons name="ios-play" size={50} color="#17D7A0" />
        )}
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
