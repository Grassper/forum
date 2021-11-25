import { AntDesign } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { Pressable } from "native-base";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { RootDrawerParamList } from "@/root/src/components/navigations/SideDrawerNavigator";
import { HeaderProfileIcon } from "@/root/src/components/shared/HeaderProfileIcon";
import { colors } from "@/root/src/constants";

import { Comments } from "./Comment";
import { Posts } from "./Post";

type TabParamList = {
  bookmarkedPosts: undefined;
  bookmarkedComments: undefined;
};
type RouteProp_ = RouteProp<RootDrawerParamList, "drawerBookmarks">;

type NavigationProp_ = DrawerNavigationProp<
  RootDrawerParamList,
  "drawerBookmarks"
>;
interface Props_ {
  navigation: NavigationProp_;
  route: RouteProp_;
}
const Tab = createMaterialTopTabNavigator<TabParamList>();

const windowWidth = Dimensions.get("window").width;

export const Bookmark: React.FC<Props_> = ({ navigation, route }) => {
  const { title } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        title === "Bookmarks" ? (
          <HeaderProfileIcon />
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
  }, [navigation, title]);
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
