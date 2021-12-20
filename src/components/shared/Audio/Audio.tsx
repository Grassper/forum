import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Pressable } from "native-base";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

interface props {
  audioUri: string;
}
export const AudioComponent: React.FC<props> = ({ audioUri }) => {
  const [music, setMusic] = useState<Audio.Sound>();
  const [isplaying, setPlaying] = useState<"PLAYING" | "PAUSED" | "NOTSTARTED">(
    "NOTSTARTED"
  );

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setMusic(sound);
    await sound.playAsync();
    setPlaying("PLAYING");
  };

  const pause = async () => {
    if (music) {
      await music.pauseAsync();
      setPlaying("PAUSED");
    }
  };

  const resume = async () => {
    if (music) {
      await music.playAsync();
      setPlaying("PLAYING");
    }
  };

  const audioActionHandler = () => {
    if (isplaying === "NOTSTARTED") {
      playSound();
    } else if (isplaying === "PLAYING") {
      pause();
    } else if (isplaying === "PAUSED") {
      resume();
    }
  };

  React.useEffect(() => {
    return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
  }, [music]);

  return (
    <View style={styles.outerContainer}>
      <Pressable mr="1" onPress={audioActionHandler}>
        {isplaying === "PLAYING" ? (
          <Ionicons color="#17D7A0" name="ios-pause" size={50} />
        ) : (
          <Ionicons color="#17D7A0" name="ios-play" size={50} />
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
