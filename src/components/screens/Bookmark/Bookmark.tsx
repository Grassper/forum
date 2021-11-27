import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import {
  DrawerParamList_,
  StackParamList_,
} from "@/root/src/components/navigations/Navigation";
import { colors } from "@/root/src/constants";

import { Comments } from "./Comment";
import { Posts } from "./Post";

type TabParamList = {
  bookmarkedPosts: undefined;
  bookmarkedComments: undefined;
};
type RouteProp_ = RouteProp<StackParamList_, "Bookmark">;

type NavigationProp_ = CompositeNavigationProp<
  StackNavigationProp<StackParamList_, "Bookmark">,
  DrawerNavigationProp<DrawerParamList_>
>;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}
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
