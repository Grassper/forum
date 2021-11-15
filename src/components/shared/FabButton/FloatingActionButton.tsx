import { AntDesign } from "@expo/vector-icons";
import { Box, Icon, Pressable } from "native-base";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

interface Props_ {}
export const FloatingActionButton: React.FC<Props_> = () => {
  const clickHandler = () => {
    console.log("action trigger");
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
    //     padding: 10,
  },

  touchableOpacityStyle: {
    alignItems: "center",

    borderRadius: 50,
    bottom: 30,
    height: 50,
    justifyContent: "center",
    position: "absolute",
    right: 30,
    width: 50,
  },
});
