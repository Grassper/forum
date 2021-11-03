import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { colors } from "@/root/src/constants";

import { Comments } from "./Comment";
import { Posts } from "./Post";

interface Props_ {}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Saved: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: "mr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white, elevation: 0 },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            width: windowWidth / 4,
            left: windowWidth / 8,
            height: 2,
          },
        }}
      >
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Comments" component={Comments} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
