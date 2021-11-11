import "react-native-gesture-handler";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";

import { BottomTabNavigator } from "@/root/src/components/navigations/BottomTabNavigator";
import { NativeBaseTheme as Theme } from "@/root/src/config";

enableScreens();

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
    <NativeBaseProvider theme={Theme}>
      <BottomTabNavigator />
    </NativeBaseProvider>
  );
};

export default App;
