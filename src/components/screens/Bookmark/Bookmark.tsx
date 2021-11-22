import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { colors } from "@/root/src/constants";

import { Comments } from "./Comment";
import { Posts } from "./Post";

interface Props_ {}
type TabParamList = {
  bookmarkedPosts: undefined;
  bookmarkedComments: undefined;
};

const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Bookmark: React.FC<Props_> = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="bookmarkedPosts"
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
        <Tab.Screen
          name="bookmarkedPosts"
          component={Posts}
          options={() => ({
            title: "Posts",
          })}
        />
        <Tab.Screen
          name="bookmarkedComments"
          component={Comments}
          options={() => ({
            title: "Comments",
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
