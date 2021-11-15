import { AntDesign } from "@expo/vector-icons";
import { Box, Icon, Pressable, Text } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface Props_ {
  isOpen: boolean;
  HandleBottomSheet: () => void;
}
export const FloatingActionButton: React.FC<Props_> = ({
  isOpen,
  HandleBottomSheet,
}) => {
  const clickHandler = () => {
    console.log("action trigger");
    // setIsOpen(!isOpen);
    HandleBottomSheet();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.container}>
        <Pressable
          onPress={clickHandler}
          style={styles.touchableOpacityStyle}
          bgColor="eGreen.400"
        >
          <Icon
            as={<AntDesign name="plus" size={24} color="white" />}
            size="lg"
            color="white"
          />
        </Pressable>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
  },

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
