import { LinearGradient } from "expo-linear-gradient";
import { Box, IBoxProps } from "native-base";
import React, { useEffect } from "react";
import { Animated, Dimensions, Easing, StyleSheet } from "react-native";

interface Props_ extends IBoxProps {}
const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
export const Skeleton: React.FC<Props_> = (props) => {
  const { width } = Dimensions.get("window");
  const animatedValue = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.cubic,
        useNativeDriver: true,
      })
    ).start();
  });
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });
  return (
    <Box bg="coolGray.100" {...props}>
      <AnimatedLG
        colors={["#b0b0b030", "#b0b0b030", "#b0b0b030", "#b0b0b030"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.absoluteFill,
          { transform: [{ translateX: translateX }] },
        ]}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  absoluteFill: {
    flex: 1,
  },
});
