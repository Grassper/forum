import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { colors } from "@/root/src/constants";

import { About } from "./About";
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

const Posts = () => {
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
            fontSize: 16,
            fontFamily: "mr",
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
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Comments" component={Comments} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white, flex: 1 },
});
