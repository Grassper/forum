import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";
// import Button from "./components/Button";
// export { default } from '../storybook';
import StorybookUIRoot from "./storybook";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import CommunityTile from "./components/Tiles/CommunityTile";
const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-italic": require("./assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });
};
const App = () => {
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
    // <StorybookUIRoot/>
    <View style={{ flex: 1 }}>
      <CommunityTile/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
