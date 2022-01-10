import React from "react";
import { StatusBar, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const DEFAULT_COLOR = "#0CBF76";

export const CustomAppStatusBar: React.FC = () => (
  <View
    style={{ backgroundColor: DEFAULT_COLOR, height: getStatusBarHeight() }}
  >
    <StatusBar backgroundColor={DEFAULT_COLOR} translucent />
  </View>
);
