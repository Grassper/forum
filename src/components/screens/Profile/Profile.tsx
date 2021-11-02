import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

import { ProfileCard } from "./ProfileCard";

interface Props_ {}

const Tab = createMaterialTopTabNavigator();

const Comments = () => {
  return (
    <View style={styles.container}>
      <Text>HI</Text>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "rr",
            textTransform: "capitalize",
          },
          tabBarStyle: { backgroundColor: colors.white },
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.gray,
          tabBarIndicatorStyle: {
            backgroundColor: colors.green,
            width: windowWidth / 6,
            left: windowWidth / 12,
            height: 2,
          },
        }}
      >
        <Tab.Screen name="Posts" component={Comments} />
        <Tab.Screen name="Comments" component={Comments} />
        <Tab.Screen name="About" component={Comments} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
