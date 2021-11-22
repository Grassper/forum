import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Box, Flex, Pressable, Text as Tex } from "native-base";
import React, { useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { colors } from "@/root/src/constants";

interface props {
  audioUri: string;
}
export const AudioComponent: React.FC<props> = ({ audioUri }) => {
  const [music, setMusic] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [play, setPlay] = useState(false);
  var pos = 0;
  // const counter = useRef(new Animated.Value(0)).current;
  // const countInterval = useRef(null);
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
  //   // return () => {
  //   //   clearInterval(countInterval);
  //   // };
  // }, []);
  // useEffect(() => {
  //   load(count);
  //   if (count >= 100) {
  //     setCount(100);
  //     clearInterval(countInterval);
  //   }
  // }, [count]);
  // const load = (count) => {
  //   Animated.timing(counter, {
  //     toValue: count,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const width = counter.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: ["0%", "100%"],
  //   extrapolate: "clamp",
  // });
  // useEffect(() => {
  //   setInterval(function () {
  //     if (music) {
  //       status();
  //     }
  //   }, 1000);
  // });
  var timer = setInterval(function () {
    if (music) {
      status();
    }
  }, 1000);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });

    setMusic(sound);
    setPlay(true);
    await sound.playAsync();
  }

  async function pause() {
    clearInterval(timer);
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

    setPosition(
      100 -
        ((val.playableDurationMillis - val.positionMillis) /
          val.playableDurationMillis) *
          100
    );
  }
  const ProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.absoluteFill,
              { width: `${parseInt(position) ? parseInt(position) : 45}%` },
            ]}
          />
        </View>
      </View>
    );
  };
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
      <View style={[styles.container, { backgroundColor: colors.black }]}>
        <Box pt="3" pb="3">
          <Flex direction="row" pl="3" pr="3">
            <Pressable onPress={() => setPlay(!play)} mr="1">
              {play ? (
                <Ionicons name="ios-pause" size={24} color={colors.white} />
              ) : (
                <Ionicons name="ios-play" size={24} color={colors.white} />
              )}
            </Pressable>
            <Box mr="2" alignItems="center" justifyContent="center">
              <Tex color={colors.white}>00:04</Tex>
            </Box>

            <ProgressBar />
            <Box mr="2" ml="2" alignItems="center" justifyContent="center">
              <Tex color={colors.white}>00:18</Tex>
            </Box>
            <Pressable onPress={pause}>
              <Ionicons
                name="volume-high-sharp"
                size={24}
                color={colors.white}
              />
            </Pressable>
          </Flex>
        </Box>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  absoluteFill: {
    backgroundColor: "#17D7A0",
  },
  container: {
    backgroundColor: "gray",
    borderRadius: 20,
    width: "90%",
  },
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  progressBar: {
    backgroundColor: "white",
    borderColor: "#000",
    borderRadius: 1,
    borderWidth: 0.5,
    flexDirection: "row",
    height: 7,
    width: "100%",
  },
  progressContainer: {
    justifyContent: "center",
    width: "50%",
  },
  touchableOpacity: {
    borderRadius: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
