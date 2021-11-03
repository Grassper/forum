import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { RootStackParamList } from "@/root/src/components/navigations/StackNavigator";
import { colors } from "@/root/src/constants";

import { About } from "./About";
import { Comments } from "./Comment";
import { Posts } from "./Post";
import { ProfileCard } from "./ProfileCard";

type NavigationProp_ = StackNavigationProp<RootStackParamList, "Profile">;

interface Props_ {
  navigation: NavigationProp_;
}

const Tab = createMaterialTopTabNavigator();

const windowWidth = Dimensions.get("window").width;

export const Profile: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <ProfileCard />
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
