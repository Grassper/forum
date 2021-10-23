import React, { useState } from "react";
import Amplify from "aws-amplify";
import config from "./aws-exports";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

Amplify.configure(config);

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
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

export default withAuthenticator(App);
