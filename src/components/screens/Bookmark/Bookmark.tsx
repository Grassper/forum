import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Box, Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SvgUri } from "react-native-svg";

import { colors } from "@/root/src/constants";

import { Comments } from "./Comment";
import { Posts } from "./Post";

type TabParamList = {
  bookmarkedPosts: undefined;
  bookmarkedComments: undefined;
  Bookmarks: { title: "Bookmarks" };
};
type RouteProp_ = RouteProp<TabParamList, "Bookmarks">;

type NavigationProp_ = StackNavigationProp<TabParamList, "Bookmarks">;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}
const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Bookmark: React.FC<Props_> = ({ navigation, route }) => {
  var title = route.params?.title;
  navigation.setOptions({
    headerLeft: () =>
      title === "Bookmarks" ? (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          ml="3"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width="8"
            height="8"
            bg="amber.100"
            borderRadius="full"
            overflow="hidden"
          >
            <SvgUri
              uri="https://avatars.dicebear.com/api/micah/asdf.svg"
              width="100%"
              height="100%"
            />
          </Box>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.goBack()}
          ml="3"
          alignItems="center"
          justifyContent="center"
        >
          <AntDesign name="arrowleft" size={24} color="#17D7A0" />
        </Pressable>
      ),
  });
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
