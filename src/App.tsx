import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    ml: require("@/root/assets/fonts/Montserrat-Light.ttf"),
    mr: require("@/root/assets/fonts/Montserrat-Regular.ttf"),
    mm: require("@/root/assets/fonts/Montserrat-Medium.ttf"),
    ms: require("@/root/assets/fonts/Montserrat-SemiBold.ttf"),
    mb: require("@/root/assets/fonts/Montserrat-Bold.ttf"),
    rl: require("@/root/assets/fonts/RobotoSlab-Light.ttf"),
    rr: require("@/root/assets/fonts/RobotoSlab-Regular.ttf"),
    rm: require("@/root/assets/fonts/RobotoSlab-Medium.ttf"),
    rs: require("@/root/assets/fonts/RobotoSlab-SemiBold.ttf"),
    rb: require("@/root/assets/fonts/RobotoSlab-Bold.ttf"),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hi from react native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
});

export default App;
