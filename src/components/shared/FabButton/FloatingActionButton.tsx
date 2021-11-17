import { AntDesign } from "@expo/vector-icons";
import { Box, Icon, Pressable, Text } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// interface Props_ {
//   isOpen: boolean;
//   HandleBottomSheet: () => void;
// }
// export const FloatingActionButton: React.FC<Props_> = ({
//   isOpen,
//   HandleBottomSheet,
// }) => {
//   // const clickHandler = () => {
//   //   console.log("action trigger");
//   //   // setIsOpen(!isOpen);
//   //   HandleBottomSheet();
//   // };

interface Props_ {
  onPress: () => void;
}
export const FloatingActionButton: React.FC<Props_> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.touchableOpacityStyle}
      bgColor="eGreen.400"
    >
      <Icon as={<AntDesign name="plus" />} size="sm" color="white" />
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
