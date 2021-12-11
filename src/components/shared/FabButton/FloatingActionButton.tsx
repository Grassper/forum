import { AntDesign, Entypo } from "@expo/vector-icons";
import { Icon, Pressable } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props_ {
  onPress: () => void;
  screen: "Home" | "ChatList";
}
export const FloatingActionButton: React.FC<Props_> = ({ onPress, screen }) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.touchableOpacityStyle}
      bgColor="eGreen.400"
    >
      <Icon
        as={
          screen === "Home" ? (
            <AntDesign name="form" />
          ) : (
            <Entypo name="feather" />
          )
        }
        size="sm"
        color="white"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    alignItems: "center",
    borderRadius: 50,
    bottom: 30,
    elevation: 100,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    right: 30,
    width: 50,
  },
});
